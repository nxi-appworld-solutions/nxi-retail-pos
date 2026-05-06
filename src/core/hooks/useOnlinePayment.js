/* eslint-disable no-undef */
import { useState, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import { initiateEasebuzzPayment } from "../../utils/services/easebuzzService";
import toast from "react-hot-toast";

// const HUB_URL = process.env.REACT_APP_PAYMENT_HUB_URL;
const HUB_URL = import.meta.env.VITE_APP_PAYMENT_HUB_URL;

export default function useOnlinePayment() {
  const [loadingInit, setLoadingInit] = useState(false);

  const connectionRef = useRef(null);
  const orderIdRef = useRef(null);

  async function ensureConnection(onConnEvent) {
    let conn = connectionRef.current;

    if (conn && conn.state === signalR.HubConnectionState.Connected) {
      onConnEvent?.("realtime-already-connected");
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

      conn.on("PaymentStatusUpdated", (data) => {
        console.log("[SignalR] PaymentStatusUpdated:", data);
      });

      connectionRef.current = conn;
      onConnEvent?.("realtime-created");
    }

    if (conn.state !== signalR.HubConnectionState.Connected) {
      onConnEvent?.("realtime-connecting");
      await conn.start();
      onConnEvent?.("realtime-connected");
    }

    return conn;
  }

  async function beginPayment(orderPayload, onUpdate, onConnEvent) {
    setLoadingInit(true);

    try {
      const initResp = await initiateEasebuzzPayment(orderPayload);

      if (initResp?.status !== 1) {
        toast.error(initResp?.msg || "Payment initiation failed");
        return { success: false };
      }

      const orderId = initResp.data.order.orderId;
      const paymentUrl = initResp.data.transaction.paymentUrl;

      orderIdRef.current = orderId;

      const conn = await ensureConnection(onConnEvent);

      conn.off("PaymentStatusUpdated");

      conn.on("PaymentStatusUpdated", (data) => {
        if (Number(data.orderId) === Number(orderIdRef.current)) {
          onUpdate?.(data);
        }
      });

      try {
        await conn.invoke("JoinOrderGroup", orderId.toString());
        onConnEvent?.("joined-group");
      } catch {
        onConnEvent?.("joined-group-failed");
      }

      setLoadingInit(false);

      return { success: true, orderId, paymentUrl };
    } catch (err) {
      setLoadingInit(false);
      toast.error(err?.message || "Payment error");
      return { success: false };
    }
  }

  function close() {
    const conn = connectionRef.current;

    if (conn) {
      conn.off("PaymentStatusUpdated");
      conn.stop();
    }

    orderIdRef.current = null;
    connectionRef.current = null;
  }

  return { loadingInit, beginPayment, close };
}
