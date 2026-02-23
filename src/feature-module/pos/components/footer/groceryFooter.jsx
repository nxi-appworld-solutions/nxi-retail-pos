// components/pos/footers/GroceryFooter.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../../../core/redux/store/modalSlice";

const GroceryFooter = () => {
  const dispatch = useDispatch();

  return (
    <div className="pos-footer bg-white p-3 border-top">
      <div className="d-flex align-items-center justify-content-center flex-wrap gap-2">
        <button className="btn btn-primary" onClick={() => dispatch(openModal("scanMode"))}>
          <i className="ti ti-barcode me-2" /> Scan Mode
        </button>

        <button className="btn btn-primary" onClick={() => dispatch(openModal("weightScale"))}>
          <i className="ti ti-scale me-2" /> Weight Scale
        </button>

        <button className="btn btn-primary" onClick={() => dispatch(openModal("payment"))}>
          <i className="ti ti-cash me-2" /> Payment
        </button>

        <button className="btn btn-primary" onClick={() => dispatch(openModal("discountPopup"))}>
          <i className="ti ti-discount-2 me-2" /> Discount
        </button>

        <button className="btn btn-outline-secondary" onClick={() => dispatch(openModal("reset"))}>
          <i className="ti ti-refresh me-2" /> Reset
        </button>

        <button className="btn btn-outline-secondary" onClick={() => dispatch(openModal("refund"))}>
          <i className="ti ti-arrow-back me-2" /> Return
        </button>
      </div>
    </div>
  );
};

export default GroceryFooter;
