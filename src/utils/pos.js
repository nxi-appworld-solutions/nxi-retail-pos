// posValidation.js

export function validatePosOrder(cart, selectedPayment, selectedCustomer, payload, type = "place") {
  const itemCount = Object.keys(cart.items || {}).length;
  const total = Number(cart.totalPayable || 0);

  if (itemCount === 0) 
    return { valid: false, msg: "Cart is empty. Please add items to the cart." };

  if (!selectedPayment) 
    return { valid: false, msg: "Please select a payment method." };

  // if (!selectedCustomer) return { valid: false, msg: "Please select a customer." };

  if (total <= 0) 
    return { valid: false, msg: "Total payable must be greater than zero." };

    if (type === "place" && !payload)
    return { valid: false, msg: "Order payload not ready." };
  
  return { valid: true };
}
