import PrintManager from "../../../utils/services/printManager";

export default function useReceipt() {
  function printReceipt(orderData) {
    PrintManager.printReceipt(orderData, {
      printer: "receipt",
      transport: "auto",
    });
  }

  return {
    printReceipt,
  };
}
