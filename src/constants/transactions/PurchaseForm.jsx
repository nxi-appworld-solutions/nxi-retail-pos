// constants/purchaseForm.js
import dayjs from "dayjs";

export const initialPurchaseState = {
  vchCode: 0,
  vchType: 2,
  date: dayjs().format("DD-MMM-YYYY"), // backend save format,
  vchNo: "",
  refNo: "",
  accCode: 0,
  mcCode: 0,
  stType: 0,
  subTot: 0,
  taxAmt: 0,
  discount: 0,
  shipping: 0,
  totAmt: 0,
  remark: "",
  tranType: 1, // 1 for purchase
  payMethod: "",
  OrderId: "",
  createdBy: "Admin",
};
