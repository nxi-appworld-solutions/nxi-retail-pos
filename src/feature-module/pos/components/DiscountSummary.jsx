// src/components/pos/DiscountSummary.jsx
import React from "react";
import { Link } from "react-router-dom";

const DiscountSummary = ({ discountAmount = 0, onRemove }) => {
  if (!discountAmount) return <div className="pos-border-bottom p-2" />;

  return (
    <div className="discount-item d-flex align-items-center justify-content-between bg-primary-transparent mt-3 flex-wrap gap-2">
      <div className="d-flex align-items-center">
        <span className="bg-primary discount-icon br-5 flex-shrink-0 me-2">
          <img src="assets/img/icons/discount-icon.svg" alt="img" />
        </span>
        <div>
          <h6 className="fs-14 fw-bold text-primary mb-1">Discount 5%</h6>
          <p className="mb-0">For ₹200 Minimum Purchase, all Items</p>
        </div>
      </div>
      {onRemove && (
        <Link
          to="#"
          className="close-icon"
          onClick={(e) => {
            e.preventDefault();
            onRemove();
          }}
        >
          <i className="ti ti-trash" />
        </Link>
      )}
    </div>
  );
};

export default DiscountSummary;
