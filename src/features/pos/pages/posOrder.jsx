/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../../core/redux/cartSlice";

import CashPaymentModal from "../../../components/modals/pos/cashPaymentModal";
import OnlinePaymentModal from "../../../components/modals/pos/onlinePaymentModal";
import OrderConfirmationModal from "../../../components/modals/pos/orderConfirmationModal";

import CustomerSelect from "../components/CustomerSelect";
import OrderHeader from "../components/OrderHeader";
import CustomerLoyality from "../components/CustomerLoyality";
import OrderTable from "../components/OrderTable";
import DiscountSummary from "../components/DiscountSummary";
import PaymentSummary from "../components/PaymentSummary";
import PaymentMethods from "../components/PaymentMethods";
import EmptyCart from "../components/emptyCart";
import useOrderFlow from "../../../hooks/useOrderFlow";
import HoldOrderModal from "../../../components/modals/pos/HoldOrderModal";
import { closeModal } from "../../../core/redux/modalSlice";
import PosActionButtons from "../components/posActionButtons";

const PosOrder = ({
  onLoadingChange,
  onLoaderMessageChange,
  onShowProcessing,
}) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const modal = useSelector((state) => state.modals);
  const selectedCustomer = useSelector(
    (state) => state.posOrder.selectedCustomer
  );
  const selectedPayment = useSelector(
    (state) => state.posOrder.selectedPayment
  );

  const {
    isPaymentModalOpen,
    setPaymentModalOpen,

    isConfirmationOpen,
    setConfirmationOpen,

    confirmationStatus,
    confirmationData,

    showSuccessScreen,

    cashReceived,
    setCashReceived,

    payload,

    posLoading,
    loadingInit,
    loaderMessage,

    placeOrder,
    confirmCashPayment,
    startOnlinePayment,
    resetOrderFlow,
    printReceipt,

    handleGatewayMessage,
  } = useOrderFlow(cart);

  // LISTEN FOR postMessage FROM redirect pages
  useEffect(() => {
    function gatewayHandler(event) {
      if (!event || !event.data) return;
      const status =
        event.data?.paymentStatus || event.data?.status || event.data;
      if (!status) return;
      handleGatewayMessage(status.toString());
    }
    window.addEventListener("message", gatewayHandler);
    return () => window.removeEventListener("message", gatewayHandler);
  }, [handleGatewayMessage]);

  // Sync global loader
  useEffect(() => {
    onLoadingChange(posLoading || loadingInit);
    onLoaderMessageChange?.(loaderMessage);
  }, [posLoading, loadingInit, loaderMessage]);

  // Control processing overlay
  useEffect(() => {
    if (showSuccessScreen) onShowProcessing(true);
    if (isConfirmationOpen) onShowProcessing(false);
  }, [showSuccessScreen, isConfirmationOpen]);

  const products = useMemo(() => Object.values(cart.items), [cart.items]);

  if (products.length === 0) return <EmptyCart />;

  return (
    <>
      <aside className="product-order-list bg-secondary-transparent flex-fill">
        <div className="card">
          <div className="card-body">
            <OrderHeader />

            <div className="customer-info block-section">
              <CustomerSelect />
              <CustomerLoyality customer={selectedCustomer} />
            </div>

            <div className="product-added block-section">
              <OrderTable />
              <DiscountSummary />
            </div>

            {products.length > 0 && <PaymentSummary />}
          </div>
        </div>

        <PaymentMethods />

        <PosActionButtons onPlaceOrder={placeOrder} disabled={posLoading} />

        {/* CASH MODAL */}
        <CashPaymentModal
          isOpen={isPaymentModalOpen && selectedPayment === "cash"}
          onClose={() => setPaymentModalOpen(false)}
          cashReceived={cashReceived}
          setCashReceived={setCashReceived}
          total={cart.totalPayable}
          change={(Number(cashReceived) - Number(cart.totalPayable)).toFixed(2)}
          onConfirm={confirmCashPayment}
          loading={posLoading}
        />

        {/* ONLINE PAYMENT MODAL */}
        <OnlinePaymentModal
          isOpen={isPaymentModalOpen && selectedPayment === "online"}
          onClose={() => setPaymentModalOpen(false)}
          orderPayload={payload}
          loading={loadingInit}
          onStartPayment={startOnlinePayment}
          loaderMessage={loaderMessage}
        />

        {/* ORDER CONFIRMATION */}
        <OrderConfirmationModal
          isOpen={isConfirmationOpen}
          onClose={() => setConfirmationOpen(false)}
          orderStatus={confirmationStatus}
          orderData={confirmationData}
          onResetCart={() => dispatch(clearCart())}
          onResetFlow={resetOrderFlow}
          onPrintReceipt={() => printReceipt(payload)}
        />
        {modal.holdOrder && (
          <HoldOrderModal onClose={() => dispatch(closeModal("holdOrder"))} />
        )}
      </aside>
    </>
  );
};

export default PosOrder;
