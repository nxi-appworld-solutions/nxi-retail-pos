import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generatePDF = (row, options = {}) => {
  const {
    title = "Invoice",
    fileName = `Invoice_${row.orderNo || row.vchNo}.pdf`,
    company = {
      name: "Xcel Technologies",
      address: "123 Business Street, Pune, India",
      phone: "+91 9876543210",
      email: "info@xceltechnologies.com",
      logo: null, // yaha base64 ya image url de sakte ho
    },
    includeProducts = true,
  } = options;

  const doc = new jsPDF();

  // ===== Header Section =====
  if (company.logo) {
    doc.addImage(company.logo, "PNG", 14, 10, 30, 30); // Logo
  }

  doc.setFontSize(18);
  doc.text(company.name, 105, 20, { align: "center" });
  doc.setFontSize(11);
  doc.text(company.address, 105, 26, { align: "center" });
  doc.text(`Phone: ${company.phone} | Email: ${company.email}`, 105, 32, {
    align: "center",
  });

  doc.setFontSize(16);
  doc.text(title, 105, 45, { align: "center" });
  doc.line(14, 48, 195, 48);

  // ===== Customer / Invoice Details =====
  let y = 55;
  doc.setFontSize(12);
  doc.text("Invoice Details", 14, y);
  doc.text("Customer Details", 120, y);

  y += 6;
  doc.setFontSize(10);

  // Invoice info
  doc.text(`Order No: ${row.orderNo}`, 14, y);
  doc.text(`Invoice No: ${row.vchNo}`, 14, y + 5);
  doc.text(`Date: ${row.date}`, 14, y + 10);
  doc.text(`Payment Status: ${row.paymentStatus}`, 14, y + 15);

  // Customer info
  doc.text(`Name: ${row.name}`, 120, y);
  doc.text(`Payment Method: ${row.paymentMethod}`, 120, y + 5);
  doc.text(`Mode: ${row.paymentMode}`, 120, y + 10);
  doc.text(`Created By: ${row.createdBy}`, 120, y + 15);

  // ===== Products Table =====
  if (includeProducts && row.products?.length) {
    const products = row.products.map((p, i) => [
      i + 1,
      p.itemName,
      p.qty,
      p.price,
      p.amount,
    ]);

    autoTable(doc, {
      startY: y + 25,
      head: [["#", "Item", "Qty", "Price", "Amount"]],
      body: products,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [40, 116, 166] }, // blue header
    });
  }

  // ===== Totals =====
  let finalY = doc.lastAutoTable?.finalY || y + 40;

  doc.setFontSize(12);
  doc.text("Total Summary", 150, finalY + 10);

  autoTable(doc, {
    startY: finalY + 15,
    margin: { left: 120 },
    body: [
      ["Sub Total", `₹${row.totAmt - (row.taxAmt || 0)}`],
      ["Tax", `₹${row.taxAmt || 0}`],
      ["Grand Total", `₹${row.totAmt}`],
    ],
    styles: { fontSize: 10 },
    theme: "plain",
    bodyStyles: { halign: "right" },
  });

  // ===== Footer =====
  doc.setFontSize(10);
  doc.text("Thank you for your business!", 105, 285, { align: "center" });
  doc.text("Authorized Signatory", 170, 285);

  // Save
  doc.save(fileName);
};
