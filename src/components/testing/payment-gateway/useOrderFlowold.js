import { useState, useMemo, useRef } from "react";
import { toast } from "react-toastify";
import useOnlinePayment from "./useOnlinePayment";
import usePos from "./usePos";
import { buildOrderPayload } from "../utils/buildOrderPayload";
import PrintManager from "../services/printManager";
import { getEasebuzzPaymentStatus } from "../services/easebuzzService";

export default function useOrderFlow(cart) {
  const { saveFinalOrder, enqueueOrderForSync, loading: posLoading } = usePos();
  const {
    iframeUrl,
    loadingInit,
    beginPayment,
    close: closePaymentIframe,
  } = useOnlinePayment();

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationStatus, setConfirmationStatus] = useState("success");
  const [confirmationData, setConfirmationData] = useState(null);

  const [cashReceived, setCashReceived] = useState("");
  const [loaderMessage, setLoaderMessage] = useState("");

  const pollTimerRef = useRef(null);
  const paymentActive = useRef(false);

  const payload = useMemo(() => {
    if (!selectedPayment) return null;
    return buildOrderPayload(
      selectedCustomer,
      Object.values(cart.items),
      cart.totalPayable,
      selectedPayment
    );
  }, [selectedCustomer, cart.items, cart.totalPayable, selectedPayment]);

  function clearPoll() {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
  }

  async function placeOrder() {
    if (!selectedPayment) return toast.warning("Choose a payment method");
    if (!payload) return toast.error("Payload not ready");

    setLoaderMessage("");
    setPaymentModalOpen(true);
  }

  async function confirmCashPayment() {
    const remaining =
      Number(cashReceived || 0) - Number(cart.totalPayable || 0);
    if (remaining < 0) return toast.warning("Received amount less than total");

    setLoaderMessage("Saving Order...");
    const res = await saveFinalOrder(payload);
    setLoaderMessage("Finalizing Order...");

    setPaymentModalOpen(false);

    // format to unified model
    const formatted = {
      orderNo: res?.data?.orderId || res?.orderId || "",
      customer: payload.customer?.name || "Walk-in Customer",
      payment: "Cash",
      totals: {
        grandTotal: res?.data?.totals?.grandTotal || cart.totalPayable,
      },
      status: res?.status === 1 ? "SUCCESS" : "FAILED",
    };

    finalize({ success: res?.status === 1, data: formatted });
  }

  // wait helper: resolves when iframeUrl becomes non-null or timeout ms elapses
  function waitForIframeOpen(timeout = 2500) {
    return new Promise((resolve) => {
      const start = Date.now();
      if (iframeUrl) return resolve(true);
      const iv = setInterval(() => {
        if (iframeUrl) {
          clearInterval(iv);
          return resolve(true);
        }
        if (Date.now() - start >= timeout) {
          clearInterval(iv);
          return resolve(false);
        }
      }, 100);
    });
  }

  function startPolling(orderId, intervalMs = 2500) {
    clearPoll();
    pollTimerRef.current = setInterval(async () => {
      try {
        const res = await getEasebuzzPaymentStatus(orderId);

        console.log("[useOrderFlow] Polling payment status:", res);

        if (!res || (res.status !== 1 && res.Status !== 1)) return;

        const paymentStatus = (res.data?.paymentStatus ?? "")
          .toString()
          .toUpperCase();
        if (!paymentStatus || paymentStatus === "PENDING") return; // continue

        clearPoll();
        paymentActive.current = false;

        const isSuccess = paymentStatus === "SUCCESS";
        finalize({
          success: isSuccess,
          data: {
            orderNo: res.data?.vchCode,
            status: paymentStatus,
            txnId: res.data?.gatewayTxnId,
            bankRef: res.data?.bankRefNo,
            payment: "Online",
            customer: payload.customer?.name || "Walk-in Customer",
            totals: {
              grandTotal: cart.totalPayable || 0,
            },
            raw: res.data,
          },
        });
      } catch (e) {
        console.error("[useOrderFlow] Poll error:", e);
      }
    }, intervalMs);
  }

  async function startOnlinePayment() {
    if (!payload) return toast.error("Payload missing");
    paymentActive.current = true;
    setLoaderMessage("Creating order and opening payment gateway...");

    console.log(
      "[useOrderFlow] Starting online payment with payload:",
      payload
    );

    // beginPayment sets iframeUrl inside useOnlinePayment
    const resp = await beginPayment(
      payload,
      // onUpdate callback (SignalR real-time)
      (statusObj) => {
        console.log(
          "[useOrderFlow] PAYMENT CALLBACK RECEIVED via SignalR:",
          statusObj
        );
        setLoaderMessage("Verifying payment...");

        const isSuccess = ["success", "completed"].includes(
          String(statusObj?.status || "").toLowerCase()
        );

        finalize({
          success: isSuccess,
          data: {
            orderNo: statusObj.orderId || resp?.orderId,
            txnId: statusObj.txnId,
            status: statusObj.status,
            raw: statusObj,
            payment: "Online",
            customer: payload.customer?.name || "Walk-in Customer",
            totals: {
              grandTotal: cart.totalPayable || 0,
            },
          },
        });
      },
      // connection life-cycle events
      (connEvent) => {
        // show user-friendly messages
        switch (connEvent) {
          case "realtime-created":
            setLoaderMessage("Preparing real-time connection...");
            break;
          case "realtime-connecting":
            setLoaderMessage("Connecting to real-time updates...");
            break;
          case "realtime-connected":
            setLoaderMessage("Waiting for customer to complete payment...");
            break;
          case "joined-group":
            setLoaderMessage("Waiting for customer to complete payment...");
            break;
          case "joined-group-failed":
            setLoaderMessage(
              "Realtime join failed — will fallback to polling."
            );
            break;
          case "realtime-reconnecting":
            setLoaderMessage("Reconnecting to real-time updates...");
            break;
          case "realtime-reconnected":
            setLoaderMessage("Reconnected to real-time updates.");
            break;
          case "realtime-disconnected":
            setLoaderMessage("Real-time disconnected. Fallback to polling...");
            break;
          default:
            console.debug("[useOrderFlow] connEvent:", connEvent);
        }
      }
    );

    if (!resp?.success) {
      toast.error("Could not start online payment");
      setLoaderMessage("Unable to open payment gateway.");
      return;
    }

    // Ensure iframe opened (wait small moment). If iframe didn't open, still safe to poll.
    const iframeOpened = await waitForIframeOpen(2500);
    if (!iframeOpened) {
      // sometimes popup blockers or target issues prevent iframe — still start polling
      console.warn(
        "[useOrderFlow] iframe not visible after wait, starting polling fallback"
      );
      setLoaderMessage(
        "Opening payment gateway failed — monitoring payment status..."
      );
    } else {
      // give a brief grace so the customer sees the gateway UI
      await new Promise((r) => setTimeout(r, 500));
    }

    // start polling fallback (safe): use resp.orderId
    if (resp.orderId) {
      setLoaderMessage("Waiting for customer to complete payment...");
      startPolling(resp.orderId, 2500);
    } else {
      console.error(
        "[useOrderFlow] beginPayment did not return orderId — cannot poll"
      );
      setLoaderMessage("Payment initiated but order id missing.");
    }
  }

  function finalize(res) {
    console.log("[useOrderFlow] FINALIZE CALLED | RESULT:", res);

    paymentActive.current = false;
    clearPoll();

    // hide payment iframe but keep loader active
    setPaymentModalOpen(false);
    closePaymentIframe();

    if (res.success || res.status === 1) {
      setConfirmationStatus("success");
      setConfirmationData(res.data);
    } else {
      setConfirmationStatus("failed");
      setConfirmationData(
        res.data || {
          error: res.error?.message || res.error || res.msg || "Failed",
        }
      );
    }
    setLoaderMessage("");
    setConfirmationOpen(true);
  }

  function resetOrderFlow() {
    paymentActive.current = false;
    clearPoll();
    closePaymentIframe();

    setSelectedCustomer(null);
    setSelectedPayment(null);
    setCashReceived("");
    setPaymentModalOpen(false);
    setConfirmationOpen(false);
    setLoaderMessage("");
    closePaymentIframe();
  }

  function printReceipt(orderData) {
    console.log("Printing receipt for order:", orderData);
    PrintManager.printReceipt(orderData, {
      printer: "receipt",
      transport: "auto",
    });
  }

  return {
    // state
    selectedCustomer,
    setSelectedCustomer,
    selectedPayment,
    setSelectedPayment,

    isPaymentModalOpen,
    setPaymentModalOpen,
    isConfirmationOpen,
    setConfirmationOpen,
    confirmationStatus,
    confirmationData,
    cashReceived,
    setCashReceived,

    payload,
    iframeUrl,

    // loaders
    posLoading,
    loadingInit,
    loaderMessage,

    // actions
    placeOrder,
    confirmCashPayment,
    startOnlinePayment,
    finalize,
    resetOrderFlow,
    closePaymentIframe,
    printReceipt,
  };
}

// import { useState, useMemo, useRef } from "react";
// import { toast } from "react-toastify";
// import useOnlinePayment from "./useOnlinePayment";
// import usePos from "./usePos";
// import { buildOrderPayload } from "../utils/buildOrderPayload";
// import { getEasebuzzPaymentStatus } from "../services/easebuzzService";
// import PrintManager from "../services/printManager";

// export default function useOrderFlow(cart) {
//   const { saveFinalOrder, loading: posLoading } = usePos();
//   const { loadingInit, beginPayment, close: closePayment } = useOnlinePayment();

//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [selectedPayment, setSelectedPayment] = useState(null);
//   const [cashReceived, setCashReceived] = useState("");

//   const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
//   const [orderConfirmation, setOrderConfirmation] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);

//   const pollRef = useRef(null);
//   const paymentActive = useRef(false);

//   const payload = useMemo(() => {
//     if (!selectedPayment) return null;
//     return buildOrderPayload(
//       selectedCustomer,
//       Object.values(cart.items),
//       cart.totalPayable,
//       selectedPayment
//     );
//   }, [selectedCustomer, cart.items, cart.totalPayable, selectedPayment]);

//   /* ---------------------------------------------------
//       CLEAR POLLING
//   --------------------------------------------------- */
//   function clearPoll() {
//     if (pollRef.current) clearInterval(pollRef.current);
//     pollRef.current = null;
//   }

//   /* ---------------------------------------------------
//       FINALIZE ORDER (COMMON FOR CASH + ONLINE)
//   --------------------------------------------------- */
//   function finalizePayment(data, success) {
//     paymentActive.current = false;
//     clearPoll();
//     closePayment();

//     setOrderConfirmation({
//       success,
//       data,
//     });

//     setModalOpen(true);
//     setPaymentModalOpen(false);
//   }

//   /* ---------------------------------------------------
//       CASH PAYMENT HANDLER (RESTORED)
//   --------------------------------------------------- */
//   async function confirmCashPayment() {
//     const due = Number(cart.totalPayable || 0);
//     const received = Number(cashReceived || 0);

//     if (received < due)
//       return toast.warning("Received amount is less than total");

//     const res = await saveFinalOrder(payload);

//     const success = res?.status === 1;

//     finalizePayment(
//       {
//         orderNo: res?.data?.orderId || res?.orderId || "",
//         customer: payload.customer?.name || "Walk-in Customer",
//         payment: "Cash",
//         totals: {
//           grandTotal: res?.data?.totals?.grandTotal || due,
//         },
//       },
//       success
//     );
//   }

//   /* ---------------------------------------------------
//       OPEN MODAL (BEFORE PAYMENT START)
//   --------------------------------------------------- */
//   function placeOrder() {
//     if (!selectedPayment) return toast.warning("Choose a payment method");
//     if (!payload) return toast.error("Payload not ready");

//     setPaymentModalOpen(true);
//   }

//   /* ---------------------------------------------------
//       START ONLINE PAYMENT
//   --------------------------------------------------- */
//   async function startOnlinePayment() {
//     if (!payload) return toast.error("Invalid payload");

//     paymentActive.current = true;

//     const start = await beginPayment(
//       payload,
//       // REALTIME CALLBACK
//       (liveStatus) => {
//         const isSuccess =
//           liveStatus.status?.toLowerCase() === "success" ||
//           liveStatus.status?.toLowerCase() === "completed";

//         finalizePayment(liveStatus, isSuccess);
//       },
//       () => {} // connection events (optional)
//     );

//     if (!start?.success) return;

//     startPolling(start.orderId);
//   }

//   /* ---------------------------------------------------
//       POLLING FALLBACK
//   --------------------------------------------------- */
//   function startPolling(orderId) {
//     clearPoll();

//     pollRef.current = setInterval(async () => {
//       try {
//         const res = await getEasebuzzPaymentStatus(orderId);
//         if (!res || res.status !== 1) return;

//         const status = res.data?.paymentStatus?.toUpperCase();
//         if (!status || status === "PENDING") return;

//         clearPoll();

//         const isSuccess = status === "SUCCESS";

//         finalizePayment(
//           {
//             orderNo: res.data.vchCode,
//             status,
//             raw: res.data,
//             payment: "Online",
//             customer: payload.customer?.name,
//             totals: {
//               grandTotal: cart.totalPayable,
//             },
//           },
//           isSuccess
//         );

//       // eslint-disable-next-line no-empty
//       } catch {}
//     }, 2000);
//   }

//   /* ---------------------------------------------------
//       RESET ORDER FLOW
//   --------------------------------------------------- */
//   function resetOrderFlow() {
//     paymentActive.current = false;
//     clearPoll();
//     closePayment();

//     setSelectedCustomer(null);
//     setSelectedPayment(null);
//     setCashReceived("");
//     setPaymentModalOpen(false);
//     setModalOpen(false);
//     setOrderConfirmation(null);
//   }

//   /* ---------------------------------------------------
//       PRINT RECEIPT
//   --------------------------------------------------- */
//   function printReceipt(orderData) {
//     PrintManager.printReceipt(orderData, {
//       printer: "receipt",
//       transport: "auto",
//     });
//   }

//   return {
//     // States
//     selectedCustomer,
//     setSelectedCustomer,
//     selectedPayment,
//     setSelectedPayment,

//     cashReceived,
//     setCashReceived,

//     isPaymentModalOpen,
//     setPaymentModalOpen,

//     orderConfirmation,
//     modalOpen,
//     setModalOpen,

//     payload,

//     // Loaders
//     posLoading,
//     loadingInit,

//     // Actions
//     placeOrder,
//     confirmCashPayment,
//     startOnlinePayment,
//     resetOrderFlow,
//     printReceipt,
//   };
// }
