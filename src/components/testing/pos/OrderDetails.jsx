// import React, { useEffect, useMemo } from "react";
// import { useDispatch } from "react-redux";
// import { clearCart } from "../../core/redux/cartSlice";

// import AlertModal from "../../components/modals/pos/alertModal";
// import CashPaymentModal from "../../components/modals/pos/cashPaymentModal";
// import OnlinePaymentModal from "../../components/modals/pos/onlinePaymentModal";
// import OrderConfirmationModal from "../../components/modals/pos/orderConfirmationModal";

// import { toast } from "react-toastify";
// import { useSelector } from "react-redux";
// import CustomerSelect from "../../components/pos/CustomerSelect";
// import useOrderFlow from "../../hooks/useOrderFlow";
// import OrderHeader from "../../components/pos/OrderHeader";
// import CustomerLoyality from "../../components/pos/CustomerLoyality";
// import OrderTable from "../../components/pos/OrderTable";
// import DiscountSummary from "../../components/pos/DiscountSummary";
// import PaymentSummary from "../../components/pos/PaymentSummary";
// import PaymentMethods from "../../components/pos/PaymentMethods";
// import OrderPlaceButton from "../../components/pos/OrderPlaceButton";
// import EmptyCart from "../../components/pos/emptyCart";

// const OrderDetails = ({ onLoadingChange, onLoaderMessageChange }) => {
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart);
//   const products = useMemo(() => Object.values(cart.items), [cart.items]);

  // 🔥 Centralized POS order logic
//   const {
//     selectedCustomer,
//     setSelectedCustomer,
//     selectedPayment,
//     setSelectedPayment,

//     isPaymentModalOpen,
//     setPaymentModalOpen,

//     isConfirmationOpen,
//     setConfirmationOpen,

//     confirmationStatus,
//     confirmationData,

//     cashReceived,
//     setCashReceived,

//     payload,
//     iframeUrl,

//     posLoading,
//     loadingInit,
//     loaderMessage,

//     placeOrder,
//     confirmCashPayment,
//     startOnlinePayment,
//     resetOrderFlow,
//     printReceipt,
//   } = useOrderFlow(cart);

//   useEffect(() => {
//     onLoadingChange(posLoading || loadingInit);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [posLoading, loadingInit, onLoadingChange]);

//   useEffect(() => {
//     onLoaderMessageChange?.(loaderMessage);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [loaderMessage, onLoaderMessageChange]);

//   // GLOBAL LISTENER FOR REDIRECT
//   useEffect(() => {
//     function handlePaymentMessage(event) {
//       if (!event.data?.paymentStatus) return;

//       if (event.data.paymentStatus === "success") {
//         window.dispatchEvent(new CustomEvent("PaymentSuccess"));
//       } else {
//         window.dispatchEvent(new CustomEvent("PaymentFailed"));
//       }
//     }

//     window.addEventListener("message", handlePaymentMessage);
//     return () => window.removeEventListener("message", handlePaymentMessage);
//   }, []);

//   if (products.length == 0) return <EmptyCart />;

//   console.log("OrderDetails Rendered", isPaymentModalOpen, selectedPayment);

//   return (
//     <aside className="product-order-list bg-secondary-transparent flex-fill">
//       <div className="card">
//         <div className="card-body">
//           <OrderHeader />
//           <div className="customer-info block-section">
//             <CustomerSelect onCustomerSelect={setSelectedCustomer} />
//             <CustomerLoyality customer={selectedCustomer} />
//           </div>
//           <div className="product-added block-section">
//             <OrderTable />
//             <DiscountSummary onRemove={() => toast.info("Discount removed")} />
//           </div>
//           <PaymentSummary />
//         </div>
//       </div>

//       {/* Payment Footer Area */}
//       <PaymentMethods
//         selectedPayment={selectedPayment}
//         onSelect={setSelectedPayment}
//       />
//       <OrderPlaceButton onPlaceOrder={placeOrder} disabled={posLoading} />

//       {/* CASH MODAL */}
//       <CashPaymentModal
//         isOpen={isPaymentModalOpen && selectedPayment === "cash"}
//         onClose={() => setPaymentModalOpen(false)}
//         cashReceived={cashReceived}
//         setCashReceived={setCashReceived}
//         total={cart.totalPayable}
//         change={(Number(cashReceived) - Number(cart.totalPayable)).toFixed(2)}
//         onConfirm={confirmCashPayment}
//         loading={posLoading}
//       />

//       {/* ONLINE MODAL */}
//       <OnlinePaymentModal
//         isOpen={isPaymentModalOpen && selectedPayment === "online"}
//         onClose={() => setPaymentModalOpen(false)}
//         orderPayload={payload}
//         iframeUrl={iframeUrl}
//         loading={loadingInit}
//         onStartPayment={startOnlinePayment}
//         loaderMessage={loaderMessage}
//       />

//       {/* FINAL ORDER STATUS MODAL */}
//       <OrderConfirmationModal
//         isOpen={isConfirmationOpen}
//         onClose={() => setConfirmationOpen(false)}
//         orderStatus={confirmationStatus}
//         orderData={confirmationData}
//         onResetCart={() => dispatch(clearCart())}
//         onResetFlow={resetOrderFlow}
//         onPrintReceipt={() => printReceipt(payload)}
//       />
//     </aside>
//   );
// };

// export default OrderDetails;


import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../core/redux/cartSlice";

import CashPaymentModal from "../../components/modals/pos/cashPaymentModal";
import OnlinePaymentModal from "../../components/modals/pos/onlinePaymentModal";
import OrderConfirmationModal from "../../components/modals/pos/orderConfirmationModal";

import CustomerSelect from "../../components/pos/CustomerSelect";
import OrderHeader from "../../components/pos/OrderHeader";
import CustomerLoyality from "../../components/pos/CustomerLoyality";
import OrderTable from "../../components/pos/OrderTable";
import DiscountSummary from "../../components/pos/DiscountSummary";
import PaymentSummary from "../../components/pos/PaymentSummary";
import PaymentMethods from "../../components/pos/PaymentMethods";
import OrderPlaceButton from "../../components/pos/OrderPlaceButton";
import EmptyCart from "../../components/pos/emptyCart";

import PaymentSuccessScreen from "./PaymentSuccessScreen";
import useOrderFlow from "../../hooks/useOrderFlow";

const OrderDetails = ({ onLoadingChange, onLoaderMessageChange }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const {
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
        event.data?.paymentStatus ||
        event.data?.status ||
        event.data;

      if (!status) return;

      handleGatewayMessage(status.toString());
    }

    window.addEventListener("message", gatewayHandler);
    return () => window.removeEventListener("message", gatewayHandler);
  }, [handleGatewayMessage]);

  // LOADING STATE
  useEffect(() => {
    onLoadingChange(posLoading || loadingInit);
  }, [posLoading, loadingInit]);

  // LOADER MESSAGE
  useEffect(() => {
    onLoaderMessageChange?.(loaderMessage);
  }, [loaderMessage]);

  const products = useMemo(() => Object.values(cart.items), [cart.items]);
  if (products.length === 0) return <EmptyCart />;

  return (
    <>
      {/* PAYMENT SUCCESS ANIMATION */}
      {showSuccessScreen && <PaymentSuccessScreen />}

      <aside className="product-order-list bg-secondary-transparent flex-fill">
        <div className="card">
          <div className="card-body">

            <OrderHeader />

            <div className="customer-info block-section">
              <CustomerSelect onCustomerSelect={setSelectedCustomer} />
              <CustomerLoyality customer={selectedCustomer} />
            </div>

            <div className="product-added block-section">
              <OrderTable />
              <DiscountSummary />
            </div>

            {products.length > 0 && <PaymentSummary />}

          </div>
        </div>

        <PaymentMethods
          selectedPayment={selectedPayment}
          onSelect={setSelectedPayment}
        />

        <OrderPlaceButton
          onPlaceOrder={placeOrder}
          disabled={posLoading}
        />

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
      </aside>
    </>
  );
};

export default OrderDetails;
