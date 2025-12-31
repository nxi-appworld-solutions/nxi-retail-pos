// TransactionFooterInputs.jsx
import React from "react";

const TransactionFooterInputs = () => (
  <div className="row">
    {["Order Tax", "Discount", "Shipping"].map((label) => (
      <div key={label} className="col-lg-3 col-md-6 col-sm-12">
        <div className="input-blocks">
          <label>{label}</label>
          <input type="text" defaultValue={0} />
        </div>
      </div>
    ))}
  </div>
);

export default TransactionFooterInputs;
