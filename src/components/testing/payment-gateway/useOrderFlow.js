/* eslint-disable no-empty */
// import { useState, useMemo, useRef, useCallback } from "react";
// import { toast } from "react-toastify";

// import useOnlinePayment from "./useOnlinePayment";
// import usePos from "./usePos";
// import { buildOrderPayload } from "../utils/buildOrderPayload";
// import PrintManager from "../services/printManager";
// import { getEasebuzzPaymentStatus } from "../services/easebuzzService";
// import { useSelector } from "react-redux";
// import { resetPosOrderState } from "../core/redux/posOrderSlice";
// import { useDispatch } from "react-redux";
// import { openModal } from "../core/redux/modalSlice";
// import { validatePosOrder } from "../utils/pos";

// export default function useOrderFlow(cart) {
//   const dispatch = useDispatch();
//   const { saveFinalOrder, loading: posLoading } = usePos();
//   const {
//     loadingInit,
//     beginPayment,
//     close: closePaymentHub,
//   } = useOnlinePayment();

//   const selectedCustomer = useSelector(
//     (state) => state.posOrder.selectedCustomer
//   );
//   const selectedPayment = useSelector(
//     (state) => state.posOrder.selectedPayment
//   );

//   const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);

//   const [isConfirmationOpen, setConfirmationOpen] = useState(false);
//   const [confirmationStatus, setConfirmationStatus] = useState("success");
//   const [confirmationData, setConfirmationData] = useState(null);

//   const [cashReceived, setCashReceived] = useState("");
//   const [loaderMessage, setLoaderMessage] = useState("");
//   const [showSuccessScreen, setShowSuccessScreen] = useState(false);

//   const pollTimerRef = useRef(null);
//   const paymentActive = useRef(false);

//   // -----------------------------------------------------------
//   // BUILD ORDER PAYLOAD
//   // -----------------------------------------------------------
//   const payload = useMemo(() => {
//     if (!selectedPayment) return null;

//     return buildOrderPayload(
//       selectedCustomer,
//       Object.values(cart.items),
//       cart.totalPayable,
//       selectedPayment
//     );
//   }, [selectedCustomer, cart.items, cart.totalPayable, selectedPayment]);

//   // -----------------------------------------------------------
//   // CLEAR POLLING
//   // -----------------------------------------------------------
//   const clearPoll = () => {
//     if (pollTimerRef.current) {
//       clearInterval(pollTimerRef.current);
//       pollTimerRef.current = null;
//     }
//   };

//   // -----------------------------------------------------------
//   // PLACE ORDER
//   // -----------------------------------------------------------
//   function placeOrder( type = "" ) {
//     const { valid, msg } = validatePosOrder(cart, selectedPayment, selectedCustomer, payload);
//     if (!valid) return toast.warning(msg);

//     if (type === "hold") dispatch(openModal("holdOrder"));
//     if (type === "place") setPaymentModalOpen(true);
//   }

//   // -----------------------------------------------------------
//   // CASH PAYMENT
//   // -----------------------------------------------------------
//   async function confirmCashPayment() {
//     const remaining =
//       Number(cashReceived || 0) - Number(cart.totalPayable || 0);

//     if (remaining < 0) return toast.warning("Received amount less than total");

//     setLoaderMessage("Saving Order...");
//     const res = await saveFinalOrder(payload);

//     const formatted = {
//       orderNo: res?.data?.orderId || res?.orderId,
//       payment: "Cash",
//       customer: payload.customer?.name || "Walk-in Customer",
//       totals: { grandTotal: cart.totalPayable },
//       status: res?.status === 1 ? "SUCCESS" : "FAILED",
//     };

//     finalize({
//       success: res?.status === 1,
//       data: formatted,
//     });

//     setPaymentModalOpen(false);
//   }

//   // -----------------------------------------------------------
//   // PAYMENT STATUS EXTRACTOR
//   // -----------------------------------------------------------
//   function extractPaymentStatus(resp) {
//     const root = resp || {};
//     const data =
//       root.data || root.Data || (root.data?.Data ? root.data.Data : undefined);

//     return (
//       data?.paymentStatus || data?.PaymentStatus || data?.Paymentstatus || ""
//     );
//   }

//   // -----------------------------------------------------------
//   // POLLING
//   // -----------------------------------------------------------
//   function startPolling(orderId, intervalMs = 2000) {
//     clearPoll();

//     pollTimerRef.current = setInterval(async () => {
//       try {
//         const res = await getEasebuzzPaymentStatus(orderId);
//         if (!res || (res.status !== 1 && res.Status !== 1)) return;

//         const status = extractPaymentStatus(res).toUpperCase();
//         if (!status || status === "PENDING") return;

//         clearPoll();

//         finalize({
//           success: status === "SUCCESS",
//           data: {
//             orderNo:
//               res.data?.vchCode ||
//               res.data?.VchCode ||
//               (res.Data && res.Data.vchCode),
//             status,
//             payment: "Online",
//             totals: { grandTotal: cart.totalPayable },
//             customer: payload.customer?.name,
//           },
//         });
//       } catch (err) {
//         console.error("[useOrderFlow] Poll error:", err);
//       }
//     }, intervalMs);
//   }

//   // -----------------------------------------------------------
//   // REDIRECT POSTMESSAGE HANDLER
//   // -----------------------------------------------------------
//   const handleGatewayMessage = useCallback((status) => {
//     if (!status) return;

//     console.log("GATEWAY -> POS:", status);

//     // IMPORTANT:
//     // Do NOT trigger success screen here.
//     // finalize() will handle full success flow.
//   }, []);

//   // -----------------------------------------------------------
//   // START ONLINE PAYMENT
//   // -----------------------------------------------------------
//   async function startOnlinePayment() {
//     if (!payload) return toast.error("Payload missing");
//     paymentActive.current = true;

//     setLoaderMessage("Creating order...");

//     const resp = await beginPayment(
//       payload,

//       // SIGNALR REALTIME CALLBACK
//       (signalData) => {
//         const status = (signalData?.status || "").toLowerCase();
//         const isSuccess = status === "success";

//         finalize({
//           success: isSuccess,
//           data: {
//             orderNo: signalData.orderId,
//             payment: "Online",
//             customer: payload.customer?.name,
//             totals: { grandTotal: cart.totalPayable },
//             raw: signalData,
//           },
//         });
//       },

//       // CONNECTION CALLBACK
//       (connEvent) => {
//         if (connEvent === "realtime-connected") {
//           setLoaderMessage("Waiting for payment...");
//         }
//       }
//     );

//     if (!resp?.success) {
//       toast.error("Could not start payment");
//       return;
//     }

//     // OPEN PAYMENT WINDOW
//     if (resp.paymentUrl) {
//       const win = window.open(
//         resp.paymentUrl,
//         "easebuzzWindow",
//         "popup=yes,noopener=no,noreferrer=no"
//       );

//       if (!win) {
//         toast.info(
//           "Popup blocked — please open payment manually: " + resp.paymentUrl
//         );
//       }
//     }

//     if (resp.orderId) startPolling(resp.orderId);
//   }

//   // -----------------------------------------------------------
//   // FINALIZE PAYMENT (Common flow)
//   // -----------------------------------------------------------
//   function finalize(result) {
//     clearPoll();

//     try {
//       closePaymentHub();
//     } catch {}

//     setPaymentModalOpen(false);

//     if (result.success) {
//       // STEP 1: Show success animation
//       setShowSuccessScreen(true);

//       // STEP 2: Delay for testing (5 seconds)
//       setTimeout(() => {
//         setShowSuccessScreen(false);

//         setConfirmationStatus("success");
//         setConfirmationData(result.data);
//         setConfirmationOpen(true);
//       }, 5000); // ← SUCCESS SCREEN DELAY (test mode)
//     } else {
//       setConfirmationStatus("failed");
//       setConfirmationData(result.data);
//       setConfirmationOpen(true);
//     }
//   }

//   // -----------------------------------------------------------
//   // RESET FLOW
//   // -----------------------------------------------------------
//   function resetOrderFlow() {
//     clearPoll();
//     try {
//       closePaymentHub();
//     } catch {}

//     dispatch(resetPosOrderState());
//     setCashReceived("");
//     setPaymentModalOpen(false);
//     setConfirmationOpen(false);
//     setLoaderMessage("");
//   }

//   // -----------------------------------------------------------
//   // PRINT RECEIPT
//   // -----------------------------------------------------------
//   function printReceipt(orderData) {
//     PrintManager.printReceipt(orderData, {
//       printer: "receipt",
//       transport: "auto",
//     });
//   }

//   return {
//     isPaymentModalOpen,
//     setPaymentModalOpen,

//     isConfirmationOpen,
//     setConfirmationOpen,

//     confirmationStatus,
//     confirmationData,

//     showSuccessScreen,

//     cashReceived,
//     setCashReceived,

//     payload,

//     posLoading,
//     loadingInit,
//     loaderMessage,

//     placeOrder,
//     confirmCashPayment,
//     startOnlinePayment,

//     handleGatewayMessage,
//     resetOrderFlow,
//     printReceipt,
//   };
// }

import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../core/redux/modalSlice";
import { resetPosOrderState } from "../core/redux/posOrderSlice";
import usePos from "./usePos";

import useOrderValidation from "./useOrderFlow/useOrderValidation";
import usePaymentFlow from "./useOrderFlow/usePaymentFlow";
import useReceipt from "./useOrderFlow/useReceipt";
import { buildOrderPayload } from "../utils/buildOrderPayload";

export default function useOrderFlow(cart) {
  const dispatch = useDispatch();
  const { saveFinalOrder, loading: posLoading } = usePos();

  const selectedCustomer = useSelector(
    (state) => state.posOrder.selectedCustomer
  );
  const selectedPayment = useSelector(
    (state) => state.posOrder.selectedPayment
  );

  const payload = useMemo(() => {
    if (!selectedPayment) return null;
    return buildOrderPayload(
      selectedCustomer,
      Object.values(cart.items),
      cart.totalPayable,
      selectedPayment
    );
  }, [selectedCustomer, cart.items, cart.totalPayable, selectedPayment]);

  const { validateAndProceed } = useOrderValidation({
    cart,
    selectedPayment,
    selectedCustomer,
    payload,
    dispatch,
    openHoldModal: () => openModal("holdOrder"),
  });

  const payment = usePaymentFlow({
    cart,
    payload,
    saveFinalOrder,
    closePaymentHub: () => {},
  });

  const { printReceipt } = useReceipt();

  function placeOrder(type = "place") {
    const ok = validateAndProceed(type);
    if (!ok) return;
    payment.setPaymentModalOpen(true);
  }

  function resetOrderFlow() {
    dispatch(resetPosOrderState());
    payment.resetPaymentFlow();
  }

  const isGlobalLoading = posLoading || payment.loadingInit;

  return {
    ...payment,

    payload,
    posLoading,
    isGlobalLoading,

    placeOrder,
    resetOrderFlow,
    printReceipt,
  };
}
