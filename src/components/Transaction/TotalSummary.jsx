export default function TotalSummary({ totals }) {
  const labels = [
    { key: "subTotal", label: "Sub Total" },
    { key: "tax", label: "Order Tax" },
    { key: "discount", label: "Discount" },
    { key: "shipping", label: "Shipping" },
    { key: "grandTotal", label: "Grand Total" },
  ];

  return (
    <div className="total-order w-100 max-widthauto m-auto mb-4">
      <ul className="border-1 rounded-2">
        {labels.map(({ key, label }) => (
          <li key={key} className="border-bottom">
            <h4 className="border-end">{label}</h4>
            {/* <h5>₹ {totals[label] || "0.00"}</h5> */}
            <h5>₹ {totals[key]?.toFixed(2) || "0.00"}</h5>
          </li>
        ))}
      </ul>
    </div>
  );
}
