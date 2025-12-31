import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";

/** * Exports data to an Excel file (.xlsx)
 * @param {Array} data - Array of objects to export
 * @param {string} fileName - Name of the output file
 *  @param {Array} headers - Array of column headers
 *  @param {string} sheetName - Name of the sheet
 * @param {Function} onSuccess - Callback when export is successful
 * @param {Function} onError - Optional callback if error occurs
 * */

export const exportToExcel = (
  data,
  fileName,
  headers,
  sheetName,
  onSuccess,
  onError
) => {
  if (!data || data.length === 0) {
    toast.warning("No data to export");
    return;
  }

  try {
    // Create a new workbook and add a worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data, { header: headers });

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    // Generate buffer and save as file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(blob, `${fileName}.xlsx`);

    if (onSuccess) onSuccess();
  } catch (error) {
    console.error("Error exporting to Excel:", error);
    toast.error("Failed to export to Excel");
    if (onError) onError(error);
  }
};

export const handleExportToExcel = (tableData) => {
  // 1️⃣ तय कीजिये कौन‑कौन से कॉलम एक्सपोर्ट करने हैं
  const headers = [
    // { key: "Id", title: "ID" },
    // { key: "Name", title: "Product Name" },
    // { key: "Qty", title: "Quantity" },
    // { key: "Price", title: "Unit Price" },
  ];

  // eslint-disable-next-line no-irregular-whitespace
  // 2️⃣ Title row में company / report date वग़ैरह add करना हो तो rows को पहले mutate कर सकते हैं
  exportToExcel(
    tableData,
    `${"xyz"}_Stock_${new Date().toISOString().slice(0, 10)}`,
    headers,
    "Stock Data",
    () => toast.success("Excel downloaded 🙂")
  );
};

export const handleExportToExcelTransaction = (tableData) => {
  if (!tableData || tableData.length === 0) {
    toast.warning("No data to export");
    return;
  }
  console.log("tableData", tableData);

  // 1️⃣ Flatten data: Parent order + each product
  const flattenedData = tableData.flatMap((order) =>
    order.products?.length
      ? order.products.map((p, idx) => ({
          OrderNo: order.orderNo,
          InvoiceNo: order.vchNo,
          OrderDate: order.date,
          Customer: order.name,
          PaymentMethod: order.paymentMethod,
          PaymentMode: order.paymentMode,
          PaymentStatus: order.paymentStatus,
          GrandTotal: order.totAmt,
          // 🔹 Product details
          ItemSR: idx + 1,
          ItemName: p.itemName,
          Qty: p.qty,
          Price: p.price,
          Amount: p.amount,
          Tax: p.taxAmt,
        }))
      : [
          {
            OrderNo: order.orderNo,
            InvoiceNo: order.vchNo,
            OrderDate: order.date,
            Customer: order.name,
            PaymentMethod: order.paymentMethod,
            PaymentMode: order.paymentMode,
            PaymentStatus: order.paymentStatus,
            GrandTotal: order.totAmt,
            ItemSR: "-",
            ItemName: "-",
            Qty: "-",
            Price: "-",
            Amount: "-",
            Tax: "-",
          },
        ]
  );

  // 2️⃣ Define headers in same order
  const headers = [
    "OrderNo",
    "InvoiceNo",
    "OrderDate",
    "Customer",
    "PaymentMethod",
    "PaymentMode",
    "PaymentStatus",
    "GrandTotal",
    "ItemSR",
    "ItemName",
    "Qty",
    "Price",
    "Amount",
    "Tax",
  ];

  // 3️⃣ Export to Excel
  exportToExcel(
    flattenedData,
    `Sales_${new Date().toISOString().slice(0, 10)}`,
    headers,
    "Sales Data",
    () => toast.success("Excel downloaded 🙂")
  );
};

// export const exportToExcel = ({
//   data,
//   fileName = "Report",
//   sheetName = "Sheet1",
//   reportTitle = "",
//   companyName = "",
// }) => {
//   if (!data || data.length === 0) {
//     console.warn("No data to export");
//     return;
//   }

//   // Create worksheet from JSON
//   const ws = XLSX.utils.json_to_sheet(data, { origin: "A4" }); // Leave first few rows for title/header

//   // Create workbook and append worksheet
//   const wb = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(wb, ws, sheetName);

//   // Add custom header rows (title/company etc.)
//   const header = [
//     [companyName],
//     [reportTitle],
//     [""], // empty row
//   ];
//   XLSX.utils.sheet_add_aoa(ws, header, { origin: "A1" });

//   // Auto-width for columns
//   const colWidths = Object.keys(data[0]).map((key) => ({
//     wch: Math.max(key.length, ...data.map((row) => (row[key] ? row[key].toString().length : 10))) + 2,
//   }));
//   ws["!cols"] = colWidths;

//   // Export
//   const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//   const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });
//   saveAs(fileData, `${fileName}.xlsx`);
// };
