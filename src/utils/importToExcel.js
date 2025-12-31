import * as XLSX from "xlsx";
import { toast } from "react-toastify";

/**
 * Reads and parses an Excel file (.xlsx/.xls/.csv)
 *
 * @param {File} file - File object from input
 * @param {Function} onSuccess - Callback with parsed data (array of arrays)
 * @param {Function} [onError] - Optional callback if error occurs
 */
export const readExcelFile = (file, onSuccess, onError) => {
  if (!file) {
    toast.warning("No file selected");
    return;
  }

  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      console.log("jsonData", jsonData);

      if (jsonData.length > 0) {
        onSuccess(jsonData); // send parsed data to callback
      } else {
        toast.error("Excel file is empty");
        if (onError) onError("Empty file");
      }
    } catch (err) {
      console.error("Error reading Excel:", err);
      toast.error("Failed to read Excel file");
      if (onError) onError(err);
    }
  };

  reader.readAsArrayBuffer(file);
};

export const normalizeExcelHeader = (header) => {
  if (typeof header !== "string") return header;

  const cleaned = header
    .replace(/\u00A0/g, " ") // Non-breaking space
    .replace(/\r?\n|\r/g, "") // Remove newlines
    .trim();

  // Convert "Print Name" → "PrintName"
  const parts = cleaned.split(/\s+/);
  return parts
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
};

// export const filterEmptyRows = (rows) =>
//   rows.filter((row) =>
//     Object.values(row).some(
//       (val) => val !== undefined && val !== null && String(val).trim() !== ""
//     )
//   );

export const filterEmptyRows = (rows) =>
  rows.filter((row) => row?.Name && String(row.Name).trim().length > 0);
