/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../../core/redux/store/cartSlice";
import useOrderFlow from "../../../core/hooks/useOrderFlow";

// import CashPaymentModal from "../../../components/modals/pos/cashPaymentModal";
// import OnlinePaymentModal from "../../../components/modals/pos/onlinePaymentModal";
// import OrderConfirmationModal from "../../../components/modals/pos/orderConfirmationModal";

import CustomerSelect from "../components/CustomerSelect";
import OrderHeader from "../components/OrderHeader";
import CustomerLoyality from "../components/CustomerLoyality";
import OrderTable from "../components/OrderTable";
import DiscountSummary from "../components/DiscountSummary";
import PaymentSummary from "../components/PaymentSummary";
import PaymentMethods from "../components/PaymentMethods";
import EmptyCart from "../components/emptyCart";
// import HoldOrderModal from "../../../components/modals/pos/HoldOrderModal";
import PosActionButtons from "../components/posActionButtons";
import { closeModal } from "../../../core/redux/store/modalSlice";
import { MODAL_TYPES } from "../../../routes/modal_root/modalTypes";
import useModal from "../../../routes/modal_root/useModal";
import useAppModal from "../../../core/common/modal/useAppModal";

const PosOrder = ({
  onLoadingChange,
  onLoaderMessageChange,
  onShowProcessing,
}) => {
  const dispatch = useDispatch();
  const { open } = useAppModal();
  const cart = useSelector((state) => state.cart);
  const modal = useSelector((state) => state.modals);
  const selectedCustomer = useSelector(
    (state) => state?.posOrder?.selectedCustomer,
  );
  const selectedPayment = useSelector(
    (state) => state?.posOrder?.selectedPayment,
  );

  const {
    posLoading,
    loadingInit,
    loaderMessage,

    placeOrder,
    confirmCashPayment,
    startOnlinePayment,
    resetOrderFlow,
    printReceipt,
    payload,

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

  // const products = useMemo(() => Object?.values(cart?.items), [cart?.items]);
  const products = Object.values(cart?.items || {});

  if (products.length === 0) return <EmptyCart />;

  const handleCashPayment = () => {
    open(MODAL_TYPES.POS_CASH_PAYMENT, {
      total: cart.totalPayable,
    });
  };

  const handleOnlinePayment = () => {
    open(MODAL_TYPES.POS_ONLINE_PAYMENT, {
      orderPayload: payload,
    });
  };

  const handleOrderConfirm = () => {
    open(MODAL_TYPES.ORDER_CONFIRMATION, {
      payload: {
        orderData: payload,
        onResetCart: () => dispatch(clearCart()),
        onPrint: () => printReceipt(payload),
        onResetFlow: resetOrderFlow,
      },
    });
  };

  const handleHoldOrder = () => {
    dispatch(
      openModal({
        name: MODAL_TYPES.HOLD_ORDER,
      }),
    );
  };

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

        <PaymentMethods
          onCash={handleCashPayment}
          onOnline={handleOnlinePayment}
        />

        <PosActionButtons
          onPlaceOrder={(type) => {
            if (type === "hold") {
              handleHoldOrder();
              return;
            }

            if (!selectedPayment) {
              alert("Please select payment method");
              return;
            }

            console.log("Selected Payment Method:123", selectedPayment);

            if (selectedPayment === "cash") {
              handleCashPayment();
            } else if (selectedPayment === "online") {
              handleOnlinePayment();
            }
          }}
          disabled={posLoading}
        />

        {/* {modal.holdOrder && (
          <HoldOrderModal onClose={() => dispatch(closeModal("holdOrder"))} />
        )} */}
      </aside>
    </>
  );
};

export default PosOrder;
