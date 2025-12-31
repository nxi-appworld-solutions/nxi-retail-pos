import { useState, useRef, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import { toast } from "react-toastify";
import { initiateEasebuzzPayment } from "../services/easebuzzService";

// eslint-disable-next-line no-undef
const HUB_URL = process.env.REACT_APP_PAYMENT_HUB_URL;

export default function useOnlinePayment() {
  const [iframeUrl, setIframeUrl] = useState(null);
  const [loadingInit, setLoadingInit] = useState(false);

  const connectionRef = useRef(null);
  const orderIdRef = useRef(null);

  async function ensureConnection(onConnEvent) {
    let conn = connectionRef.current;

    if (conn && conn.state === signalR.HubConnectionState.Connected) {
      onConnEvent && onConnEvent("realtime-already-connected");
      return conn;
    }

    if (!conn) {
      conn = new signalR.HubConnectionBuilder()
        .withUrl(HUB_URL, {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets,
          withCredentials: true,
        })
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();

      // generic debug listener
      conn.on("PaymentStatusUpdated", (data) => {
        console.log("[useOnlinePayment] SIGNALR raw update:", data);
      });

      // lifecycle hooks for logging / UI
      conn.onreconnecting((err) => onConnEvent?.("realtime-reconnecting"));
      conn.onreconnected((connId) => onConnEvent?.("realtime-reconnected"));
      conn.onclose((err) => onConnEvent?.("realtime-disconnected"));

      connectionRef.current = conn;
      onConnEvent?.("realtime-created");
    } else {
      onConnEvent?.("realtime-reusing");
    }

    if (connectionRef.current.state !== signalR.HubConnectionState.Connected) {
      onConnEvent?.("realtime-connecting");
      await connectionRef.current.start();
      onConnEvent?.("realtime-connected");
    }

    return connectionRef.current;
  }

  async function beginPayment(orderPayload, onUpdate, onConnEvent) {
    if (!orderPayload) throw new Error("Missing order payload");

    setLoadingInit(true);
    try {
      const initResp = await initiateEasebuzzPayment(orderPayload);
      if (initResp?.status !== 1) {
        toast.error(initResp?.msg || "Payment initiation failed");
        setLoadingInit(false);
        return { success: false, error: initResp?.msg || "Initiation failed" };
      }

      const orderId = initResp.data.order.orderId;
      orderIdRef.current = orderId;
      const paymentUrl = String(initResp.data.transaction.paymentUrl || "");

      console.log("RAW PAYMENT URL:", paymentUrl);

      // Show gateway iframe
      setIframeUrl(paymentUrl);
      // Start real-time connection
      const conn = await ensureConnection(onConnEvent);

      // remove previous ORDER handler ONLY
      conn.off("PaymentStatusUpdated");

      // add new handler
      conn.on("PaymentStatusUpdated", (data) => {
        if (Number(data.orderId) === Number(orderIdRef.current)) {
          setIframeUrl(null); // Close iframe immediately
          onUpdate?.(data); // Trigger handler in useOrderFlow
        }
      });

      // Join group
      try {
        await conn.invoke("JoinOrderGroup", orderId.toString());
        onConnEvent?.("joined-group");
      } catch {
        onConnEvent?.("joined-group-failed");
      }

      setLoadingInit(false);
      return { success: true, orderId };
    } catch (err) {
      setLoadingInit(false);
      toast.error(err?.message || "Payment error");
      return { success: false, error: err };
    }
  }

  function close() {
    setIframeUrl(null);

    const conn = connectionRef.current;
    if (conn) {
      try {
        // Remove the order-specific handler before stopping
        conn.off("PaymentStatusUpdated");
        conn.stop();
        orderIdRef.current = null;
        connectionRef.current = null;
      } catch (e) {
        console.warn("[useOnlinePayment] error stopping hub:", e);
      }
    }
  }

  return { iframeUrl, loadingInit, beginPayment, close };
}

// import { useState, useRef } from "react";
// import * as signalR from "@microsoft/signalr";
// import { toast } from "react-toastify";
// import { initiateEasebuzzPayment } from "../services/easebuzzService";

// const HUB_URL =
//   process.env.REACT_APP_PAYMENT_HUB_URL ||
//   "http://localhost:7128/hubs/payments";

// export default function useOnlinePayment() {
//   const [loadingInit, setLoadingInit] = useState(false);

//   const connectionRef = useRef(null);
//   const orderIdRef = useRef(null);

//   // Ensure SignalR connection
//   async function ensureConnection(onConnEvent) {
//     let conn = connectionRef.current;

//     if (!conn) {
//       conn = new signalR.HubConnectionBuilder()
//         .withUrl(HUB_URL, {
//           skipNegotiation: true,
//           transport: signalR.HttpTransportType.WebSockets,
//         })
//         .withAutomaticReconnect()
//         .configureLogging(signalR.LogLevel.Information)
//         .build();

//       conn.onclose(() => onConnEvent?.("disconnected"));
//       conn.onreconnected(() => onConnEvent?.("reconnected"));
//       conn.onreconnecting(() => onConnEvent?.("reconnecting"));

//       connectionRef.current = conn;
//       onConnEvent?.("created");
//     }

//     if (conn.state !== signalR.HubConnectionState.Connected) {
//       onConnEvent?.("connecting");
//       await conn.start();
//       onConnEvent?.("connected");
//     }

//     return conn;
//   }

//   // Begin payment
//   async function beginPayment(payload, onRealtime, onConnEvent) {
//     try {
//       setLoadingInit(true);

//       const init = await initiateEasebuzzPayment(payload);

//       if (init?.status !== 1) {
//         toast.error(init?.msg || "Unable to initiate payment");
//         setLoadingInit(false);
//         return { success: false };
//       }

//       const orderId = init.data.order.orderId;
//       orderIdRef.current = orderId;

//       const paymentUrl = init.data.transaction.paymentUrl;

//       // SAME TAB REDIRECT (recommended)
//       window.location.href = paymentUrl;

//       // Prepare SignalR
//       const conn = await ensureConnection(onConnEvent);

//       conn.off("PaymentStatusUpdated");
//       conn.on("PaymentStatusUpdated", (data) => {
//         if (String(data.orderId) === String(orderIdRef.current)) {
//           onRealtime?.(data);
//         }
//       });

//       // Join order group
//       try {
//         await conn.invoke("JoinOrderGroup", orderId.toString());
//         onConnEvent?.("joined");
//       } catch {
//         onConnEvent?.("join-failed");
//       }

//       setLoadingInit(false);
//       return { success: true, orderId };
//     } catch (err) {
//       toast.error(err?.message);
//       setLoadingInit(false);
//       return { success: false };
//     }
//   }

//   function close() {
//     try {
//       connectionRef.current?.stop();
//     // eslint-disable-next-line no-empty
//     } catch {}
//     connectionRef.current = null;
//     orderIdRef.current = null;
//   }

//   return {
//     loadingInit,
//     beginPayment,
//     close,
//   };
// }
