import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPosOrderState } from "../../core/redux/store/posOrderSlice";
import usePos from "./usePos";
import useOrderValidation from "./useOrderFlow/useOrderValidation";
import usePaymentFlow from "./useOrderFlow/usePaymentFlow";
import useReceipt from "./useOrderFlow/useReceipt";
import { buildOrderPayload } from "../../utils/buildOrderPayload";
import { openModal } from "../../core/redux/store/modalSlice";

export default function useOrderFlow(cart) {
  const dispatch = useDispatch();
  const { saveFinalOrder, loading: posLoading } = usePos();

  const selectedCustomer = useSelector((state) => state?.posOrder?.selectedCustomer);
  const selectedPayment = useSelector((state) => state?.posOrder?.selectedPayment);

  const payload = useMemo(() => {
    if (!selectedPayment) return null;
    return buildOrderPayload(
      selectedCustomer,
      Object.values(cart.items),
      cart.totalPayable,
      selectedPayment
    );
  }, [selectedCustomer, cart?.items, cart?.totalPayable, selectedPayment]);

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
