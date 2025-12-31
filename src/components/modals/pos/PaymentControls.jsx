// PaymentControls.jsx
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import OnlinePaymentModal from "./OnlinePaymentModal";
import OrderConfirmationModal from "./OrderConfirmationModal";
import useOrderFlow from "../hooks/useOrderFlow"; // path to your hook

export default function PaymentControls({ cart }) {
  // The hook must expose loaderMessage, iframeUrl, etc.
  const {
    selectedCustomer,
    setSelectedCustomer,
    selectedPayment,
    setSelectedPayment,
    isPaymentModalOpen,
    setPaymentModalOpen,
    iframeUrl,
    loadingInit,
    loaderMessage,
    placeOrder,
    confirmCashPayment,
    startOnlinePayment,
    isConfirmationOpen,
    confirmationStatus,
    confirmationData,
    setConfirmationOpen,
    cashReceived,
    setCashReceived,
    payload,
  } = useOrderFlow(cart);

  // Start the payment flow when user clicks "Pay"
  async function onPayNow() {
    // show modal
    placeOrder();
  }

  // Called by OnlinePaymentModal when pressing "Pay Now" inside modal
  async function handleStartPayment() {
    // startOnlinePayment will set loaderMessage at each connection event
    startOnlinePayment();
  }

  // Close modal UI only; finalize() will close iframe and show confirmation
  function handleClosePaymentModal() {
    setPaymentModalOpen(false);
    // Do NOT clear loaderMessage here; let finalize() clear it.
  }

  return (
    <>
      <div className="d-flex gap-2">
        <Button variant="success" onClick={onPayNow}>Checkout</Button>
        <Button variant="outline-primary" onClick={() => setSelectedPayment("cash")}>Cash</Button>
        <Button variant="outline-primary" onClick={() => setSelectedPayment("online")}>Online</Button>
      </div>

      <OnlinePaymentModal
        isOpen={isPaymentModalOpen}
        onClose={handleClosePaymentModal}
        onStartPayment={handleStartPayment}
        orderPayload={payload}
        iframeUrl={iframeUrl}
        loadingInit={loadingInit}
        loaderMessage={loaderMessage}
      />

      <OrderConfirmationModal
        show={isConfirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        status={confirmationStatus}
        data={confirmationData}
      />
    </>
  );
}
