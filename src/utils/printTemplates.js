// src/utils/printTemplates.js
export function renderReceiptHtml(payload) {
  // Minimal 80mm receipt CSS, simple and printable
  return `
  <html>
  <head>
    <style>
      @media print {
        @page { margin: 5mm; }
        body { font-family: Arial, sans-serif; font-size: 12px; }
      }
      body { margin:0; padding:8px; color:#000; }
      .center { text-align:center; }
      .items { width:100%; border-collapse: collapse; }
      .items td { padding:4px 0; }
      .total { font-weight:700; margin-top:8px; }
    </style>
  </head>
  <body>
    <div class="center">
      <h3>${payload.merchantName || "Store"}</h3>
      <div>${payload.merchantAddress || ""}</div>
      <div>Bill No: ${payload.orderNo}</div>
      <div>${payload.date}</div>
      <hr/>
    </div>

    <table class="items">
      ${payload.items.map(i => `
        <tr>
          <td>${i.name}</td>
          <td style="text-align:right">${i.qty} x ${i.price}</td>
        </tr>
      `).join('')}
    </table>

    <div class="total center">
      Total: ₹${payload.totals.grandTotal.toFixed(2)}
    </div>

    <div class="center">
      Thank you!
    </div>
  </body>
  </html>
  `;
}

// ESC/POS rendering (very simple text + newlines). For production, use a library.
export function renderEscPosBuffer(payload) {
  // simplified — produce plain text with newline markers; convert to Uint8Array
  let text = `${payload.merchantName}\n${payload.merchantAddress}\n\n`;
  text += `Bill No: ${payload.orderNo}\n${payload.date}\n\n`;
  for (const it of payload.items) {
    text += `${it.name} ${it.qty}x${it.price} ${ (it.qty*it.price).toFixed(2) }\n`;
  }
  text += `\nTotal: ₹${payload.totals.grandTotal.toFixed(2)}\n\n`;
  text += `\n\n\n`; // feed
  // convert to Uint8Array (UTF-8)
  const encoder = new TextEncoder();
  return encoder.encode(text).buffer;
}
