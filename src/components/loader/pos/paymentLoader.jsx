import React from "react";

const PaymentLoader = ({ isLoading, message = "Processing Payment..." }) => {
  if (!isLoading) return null;

  return (
    <div className="pos-loader-overlay">
      <div className="pos-loader-card">
        {/* Animated Ring */}
        <div className="pos-loader-ring"></div>

        {/* Message */}
        <h5 className="pos-loader-title">{message}</h5>

        {/* Animated dots */}
        <div className="pos-loader-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default PaymentLoader;
