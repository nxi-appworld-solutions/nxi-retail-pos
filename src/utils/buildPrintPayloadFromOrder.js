// src/utils/buildPrintPayloadFromOrder.js

export function buildPrintPayloadFromOrder(order) {
  if (!order) throw new Error("Order missing");

  return {
    orderNo: order.orderNo || order.orderId || "—",
    orderDate: order.orderDate || new Date().toLocaleString(),
    customer: order.customer || "Walk-in Customer",

    items: (order.items || order.tProductDets || []).map((i) => ({
      itemName: i.itemName || i.name || "Item",
      qty: Number(i.qty || i.quantity || 1),
      price: Number(i.price || i.unitCost || 0),
      amount: Number(i.amount || i.total || i.price * i.qty || 0),
    })),

    totals: {
      subTotal: Number(order.totals?.subTotal || order.subTot || 0),
      grandTotal: Number(order.totals?.grandTotal || order.totAmt || order.payAmt || 0),
    },

    merchant: order.merchant || "Revergent POS",
    merchantAddress: order.merchantAddress || "",
  };
}
