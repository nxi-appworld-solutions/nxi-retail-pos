import toast from "react-hot-toast";
import { validatePosOrder } from "../../../utils/pos";

export default function useOrderValidation({
  cart,
  selectedPayment,
  selectedCustomer,
  payload,
  dispatch,
  openHoldModal,
}) {
  function validateAndProceed(type = "") {
    const { valid, msg } = validatePosOrder(
      cart,
      selectedPayment,
      selectedCustomer,
      payload
    );

    if (!valid) {
      toast.warning(msg);
      return false;
    }

    if (type === "hold") {
      dispatch(openHoldModal());
      return false;
    }

    return true;
  }

  return {
    validateAndProceed,
  };
}
