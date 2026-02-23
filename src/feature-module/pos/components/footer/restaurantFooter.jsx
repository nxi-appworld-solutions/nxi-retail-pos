// components/pos/footers/RestaurantFooter.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../../../core/redux/store/modalSlice";

const RestaurantFooter = () => {
  const dispatch = useDispatch();

  // mapping: KOT -> orders modal (or create kot modal later)
  return (
    <div className="pos-footer bg-white p-3 border-top">
      <div className="d-flex align-items-center justify-content-center flex-wrap gap-2">
        <button className="btn btn-primary" onClick={() => dispatch(openModal("orders"))}>
          <i className="ti ti-file-text me-2" /> KOT
        </button>

        <button className="btn btn-primary" onClick={() => dispatch(openModal("holdOrderList"))}>
          <i className="ti ti-player-pause me-2" /> Hold
        </button>

        <button className="btn btn-primary" onClick={() => dispatch(openModal("splitPayment"))}>
          <i className="ti ti-arrows-split me-2" /> Split Bill
        </button>

        <button className="btn btn-primary" onClick={() => dispatch(openModal("payment"))}>
          <i className="ti ti-cash me-2" /> Payment
        </button>

        <button className="btn btn-primary" onClick={() => dispatch(openModal("orders"))}>
          <i className="ti ti-printer me-2" /> Print
        </button>

        <button className="btn btn-primary" onClick={() => dispatch(openModal("cancelOrder"))}>
          <i className="ti ti-trash me-2" /> Void
        </button>

        <button className="btn btn-outline-secondary" onClick={() => dispatch(openModal("reset"))}>
          <i className="ti ti-refresh me-2" /> Reset
        </button>
      </div>
    </div>
  );
};

export default RestaurantFooter;
