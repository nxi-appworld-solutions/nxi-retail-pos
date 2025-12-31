import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCharges } from "../core/redux/cartSlice";

export default function useDiscounts(products = []) {
  const [discount, setDiscount] = useState({ discountAmount: 0, discountText: "" });
  const dispatch = useDispatch();

  useEffect(() => {
    let total = 0;
    products.forEach((item) => {
      total += item.price * item.quantity;
    });

    // Compute discount locally
    let newDiscount = { discountAmount: 0, discountText: "" };
    if (total >= 200) {
      const amount = +(total * 0.005).toFixed(2);
      newDiscount = { discountAmount: amount, discountText: "Discount 0.5% ₹200+" };
    }

    // Update state
    setDiscount(newDiscount);

    // Update Redux store
    dispatch(updateCharges({ key: "discount", value: newDiscount.discountAmount }));
  }, [products, dispatch]);

  return discount;
}
