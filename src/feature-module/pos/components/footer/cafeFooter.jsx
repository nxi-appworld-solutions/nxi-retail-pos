// components/pos/footers/CafeFooter.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../../../core/redux/store/modalSlice";

const CafeFooter = () => {
  const dispatch = useDispatch();

  return (
    <div className="pos-footer bg-white p-3 border-top">
      <div className="d-flex align-items-center justify-content-center flex-wrap gap-2">
        <button className="btn btn-primary" onClick={() => dispatch(openModal("holdOrderList"))}>
          <i className="ti ti-player-pause me-2" /> Hold
        </button>

        <button className="btn btn-primary" onClick={() => dispatch(openModal("orders"))}>
          <i className="ti ti-repeat me-2" /> Repeat
        </button>

        <button className="btn btn-primary" onClick={() => dispatch(openModal("payment"))}>
          <i className="ti ti-cash me-2" /> Payment
        </button>

        <button className="btn btn-primary" onClick={() => window.open("#", "_blank")}>
          <i className="ti ti-device-mobile me-2" /> UPI QR
        </button>

        <button className="btn btn-primary" onClick={() => dispatch(openModal("discountPopup"))}>
          <i className="ti ti-discount-2 me-2" /> Offers
        </button>

        <button className="btn btn-outline-secondary" onClick={() => dispatch(openModal("reset"))}>
          <i className="ti ti-refresh me-2" /> Reset
        </button>
      </div>
    </div>
  );
};

export default CafeFooter;
