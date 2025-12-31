import dayjs from "dayjs";

export const buildOrderPayload = (customer, products, totalPayable, paymentMethod) => ({
  vchType: 9,
  date: dayjs().format("YYYY-MM-DD"),

  accCode: customer?.code || 0,
  accName: customer?.name || "Walk-in Customer",

  subTot: products?.reduce((sum, p) => sum + p.price * p.quantity, 0),
  totAmt: totalPayable,
  payAmt: totalPayable,

  createdBy: localStorage.getItem("username") || "POSUser",
  createdOn: dayjs().format("YYYY-MM-DD HH:mm:ss"),

  paymentMethod,
  paymentStatus: "Pending",
  paymentGateway: paymentMethod === "Online" ? "Easebuzz" : "Cash",

  tProductDets: products.map((p) => ({
    itemCode: p.code,
    itemName: p.name,
    qty: p.quantity,
    price: p.price,
    amount: p.price * p.quantity,
    unitCost: p.price,
    image: p.image || "",
  })),
});
