import React from "react";

const PaymentLoader = ({ isLoading, message = "Processing Request..." }) => {
  if (!isLoading) return null;

  return (
    <div className="pos-loader-overlay">
      <div className="pos-loader-box">
        <div className="pos-loader-dots">
          <span className="dot dot1"></span>
          <span className="dot dot2"></span>
          <span className="dot dot3"></span>
        </div>

        <p className="pos-loader-message">{message}</p>
        <p className="pos-loader-sub">
          Please wait, do not refresh or navigate away.
        </p>
      </div>
    </div>
  );
};

export default PaymentLoader;
