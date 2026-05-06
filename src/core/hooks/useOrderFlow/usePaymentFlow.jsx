/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
import { useState, useRef, useCallback, useEffect } from "react";
import useOnlinePayment from "../useOnlinePayment";
import { getEasebuzzPaymentStatus } from "../../../utils/services/easebuzzService";
import toast from "react-hot-toast";

const PAYMENT_TIMEOUT_MS = 3 * 60 * 1000; // 3 minutes

export default function usePaymentFlow({
  cart,
  payload,
  saveFinalOrder,
  closePaymentHub,
}) {
  // ---------------- STATE ----------------
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationStatus, setConfirmationStatus] = useState("success");
  const [confirmationData, setConfirmationData] = useState(null);

  const [cashReceived, setCashReceived] = useState("");
  const [loaderMessage, setLoaderMessage] = useState("");
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);

  const pollRef = useRef(null);
  const timeoutRef = useRef(null);
  const paymentActive = useRef(false);

  const {
    loadingInit,
    beginPayment,
    close: closePaymentHubInternal,
  } = useOnlinePayment();

  // ---------------- UTILITIES ----------------
  const clearTimers = () => {
    if (pollRef.current) clearInterval(pollRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    pollRef.current = null;
    timeoutRef.current = null;
  };

  const resetState = () => {
    clearTimers();
    paymentActive.current = false;
    setLoaderMessage("");
    setPaymentModalOpen(false);
  };

  // ---------------- FINALIZE ----------------
  // const finalize = useCallback(
  //   (result) => {
  //     resetState();

  //     try {
  //       closePaymentHubInternal();
  //       closePaymentHub?.();
  //     } catch {}

  //     if (result.success) {
  //       setShowSuccessScreen(true);

  //       setTimeout(() => {
  //         setShowSuccessScreen(false);
  //         setConfirmationStatus("success");
  //         setConfirmationData(result.data);
  //         setConfirmationOpen(true);
  //       }, 3000);
  //     } else {
  //       setConfirmationStatus("failed");
  //       setConfirmationData(result.data);
  //       setConfirmationOpen(true);
  //     }
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [closePaymentHub, closePaymentHubInternal]
  // );

  // const finalize = useCallback(
  //   (result) => {
  //     try {
  //       closePaymentHubInternal();
  //       closePaymentHub?.();
  //     } catch {}

  //     if (result.success) {
  //       setShowSuccessScreen(true);

  //       setTimeout(() => {
  //         setShowSuccessScreen(false);

  //         setConfirmationStatus("success");
  //         setConfirmationData(result.data);
  //         setConfirmationOpen(true);

  //         resetState(); // ✅ move here
  //       }, 3000);
  //     } else {
  //       setConfirmationStatus("failed");
  //       setConfirmationData(result.data);
  //       setConfirmationOpen(true);

  //       resetState(); // ✅ move here
  //     }
  //   },
  //   [closePaymentHub, closePaymentHubInternal]
  // );

  const finalize = useCallback(
    (result) => {
      try {
        closePaymentHubInternal();
        closePaymentHub?.();
      } catch {}

      // Close payment modal ONLY
      setPaymentModalOpen(false);

      if (result.success) {
        // 1️⃣ SHOW PROCESSING MODAL
        setLoaderMessage("Processing payment...");
        setShowSuccessScreen(true);

        // 2️⃣ DELAY FOR UX
        setTimeout(() => {
          // hide processing
          setShowSuccessScreen(false);
          setLoaderMessage("");

          // 3️⃣ OPEN CONFIRMATION
          setConfirmationStatus("success");
          setConfirmationData(result.data);
          setConfirmationOpen(true);

          // 4️⃣ CLEANUP (AFTER confirmation is visible)
          clearTimers();
          paymentActive.current = false;
        }, 5000);
      } else {
        // FAILURE → NO PROCESSING
        setConfirmationStatus("failed");
        setConfirmationData(result.data);
        setConfirmationOpen(true);

        clearTimers();
        paymentActive.current = false;
      }
    },
    [closePaymentHub, closePaymentHubInternal]
  );

  // ---------------- CASH PAYMENT ----------------
  async function confirmCashPayment() {
    const remaining =
      Number(cashReceived || 0) - Number(cart?.totalPayable || 0);

    if (remaining < 0) {
      toast.warning("Received amount is less than bill total");
      return;
    }

    setLoaderMessage("Saving order...");
    const res = await saveFinalOrder(payload);

    finalize({
      success: res?.status === 1,
      data: {
        orderNo: res?.data?.orderId || res?.orderId,
        payment: "Cash",
        customer: payload.customer?.name || "Walk-in",
        totals: { grandTotal: cart?.totalPayable },
        status: res?.status === 1 ? "SUCCESS" : "FAILED",
      },
    });
  }

  // ---------------- ONLINE PAYMENT ----------------
  async function startOnlinePayment() {
    if (!payload) return toast.error("Order data missing");

    paymentActive.current = true;
    setLoaderMessage("Please complete payment on terminal");

    // OFFLINE SAFE CHECK
    if (!navigator.onLine) {
      finalize({
        success: false,
        data: { status: "OFFLINE", payment: "Online" },
      });
      toast.error("Internet connection lost");
      return;
    }

    const resp = await beginPayment(payload, (signalData) => {
      if (!paymentActive.current) return;

      const status = (signalData?.status || "").toUpperCase();
      finalize({
        success: status === "SUCCESS",
        data: {
          orderNo: signalData.orderId,
          payment: "Online",
          customer: payload.customer?.name,
          totals: { grandTotal: cart?.totalPayable },
          raw: signalData,
        },
      });
    });

    if (!resp?.success) {
      toast.error("Unable to start payment");
      resetState();
      return;
    }

    if (resp.paymentUrl) {
      window.open(resp.paymentUrl, "paymentWindow");
    }

    // POLLING FALLBACK
    if (resp.orderId) {
      pollRef.current = setInterval(async () => {
        const res = await getEasebuzzPaymentStatus(resp.orderId);
        if (!res || res.status !== 1) return;

        const status = res.data?.paymentStatus?.toUpperCase() || "PENDING";

        if (status !== "PENDING") {
          finalize({
            success: status === "SUCCESS",
            data: {
              orderNo: resp.orderId,
              payment: "Online",
              totals: { grandTotal: cart?.totalPayable },
              status,
            },
          });
        }
      }, 2000);
    }

    // TIMEOUT SAFETY
    timeoutRef.current = setTimeout(() => {
      if (!paymentActive.current) return;

      finalize({
        success: false,
        data: {
          status: "TIMEOUT",
          payment: "Online",
        },
      });

      toast.warning("Payment timed out. Please try again.");
    }, PAYMENT_TIMEOUT_MS);
  }

  // ---------------- CANCEL PAYMENT ----------------
  function cancelPayment() {
    if (!paymentActive.current) return;

    finalize({
      success: false,
      data: {
        status: "CANCELLED",
        payment: "Online",
      },
    });

    toast.info("Payment cancelled");
  }

  // ---------------- POSTMESSAGE HANDLER ----------------
  const handleGatewayMessage = useCallback(
    (status) => {
      if (!paymentActive.current || !status) return;

      const normalized = status.toString().toUpperCase();
      if (normalized === "PENDING") return;

      finalize({
        success: normalized === "SUCCESS",
        data: {
          payment: "Online",
          status: normalized,
          totals: { grandTotal: cart?.totalPayable },
        },
      });
    },
    [cart?.totalPayable, finalize]
  );

  // ---------------- CLEANUP ----------------
  useEffect(() => {
    return () => clearTimers();
  }, []);

  function resetPaymentFlow() {
    clearTimers();
    paymentActive.current = false;

    setCashReceived("");
    setLoaderMessage("");
    setPaymentModalOpen(false);
    setConfirmationOpen(false);
    setShowSuccessScreen(false);
  }

  return {
    // state
    isPaymentModalOpen,
    isConfirmationOpen,
    confirmationStatus,
    confirmationData,
    cashReceived,
    loaderMessage,
    showSuccessScreen,
    loadingInit,

    // setters
    setPaymentModalOpen,
    setCashReceived,
    setConfirmationOpen,

    // actions
    confirmCashPayment,
    startOnlinePayment,
    cancelPayment,
    handleGatewayMessage,
    resetPaymentFlow,
  };
}
