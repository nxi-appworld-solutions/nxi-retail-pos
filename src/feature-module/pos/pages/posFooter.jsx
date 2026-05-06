import React from "react";
import { useSelector, useDispatch } from "react-redux";
import UniversalPosFooter from "../components/universalPosFooter";

// Import all your modals
// import HoldOrderListModal from "../../../components/modals/pos/footer/holdOrderListModal";
// import CancelOrderModal from "../../../components/modals/pos/footer/cancelOrderModal";
// import PaymentModal from "../../../components/modals/pos/footer/paymentModal";
// import SplitPaymentModal from "../../../components/modals/pos/footer/splitPaymentModal";
// import OrdersModal from "../../../components/modals/pos/footer/ordersModal";
// import RecentTransactionsModal from "../../../components/modals/pos/footer/recentTransactionsModal";
// import ResetModal from "../../../components/modals/pos/footer/resetModal";
// import DiscountModal from "../../../components/modals/pos/footer/discountModal";
// import UniversalPosFooter from "../components/universalPosFooter";
// import { closeModal } from "../../../core/redux/store/modalSlice";

const PosFooter = () => {
  const modal = useSelector((state) => state.modals);
  const dispatch = useDispatch();

  return (
    <>
      <UniversalPosFooter />

      {/* {modal.holdOrderList && (
        <HoldOrderListModal
          onClose={() => dispatch(closeModal("holdOrderList"))}
        />
      )}

      {modal.cancelOrder && (
        <CancelOrderModal onClose={() => dispatch(closeModal("cancelOrder"))} />
      )}

      {modal.payment && (
        <PaymentModal onClose={() => dispatch(closeModal("payment"))} />
      )}

      {modal.splitPayment && (
        <SplitPaymentModal
          onClose={() => dispatch(closeModal("splitPayment"))}
        />
      )}

      {modal.discountPopup && (
        <DiscountModal onClose={() => dispatch(closeModal("discountPopup"))} />
      )}

      {modal.orders && (
        <OrdersModal onClose={() => dispatch(closeModal("orders"))} />
      )}

      {modal.recentTransactions && (
        <RecentTransactionsModal
          onClose={() => dispatch(closeModal("recentTransactions"))}
        />
      )}

      {modal.reset && (
        <ResetModal onClose={() => dispatch(closeModal("reset"))} />
      )} */}
    </>
  );
};

export default PosFooter;
