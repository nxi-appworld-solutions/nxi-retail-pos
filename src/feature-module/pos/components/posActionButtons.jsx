import React from "react";

const PosActionButtons = ({ onPlaceOrder, disabled }) => {
  return (
    <>
      <div className="btn-row d-flex align-items-center justify-content-between gap-3">
        <button
          className="btn bg-orange d-flex align-items-center justify-content-center flex-fill m-0"
          onClick={()=> onPlaceOrder("hold")}
          disabled={disabled}
        >
          {/* <i className="ti ti-printer me-2" /> */}
          <i className="ti ti-player-pause me-2" />
          Hold Order
        </button>
        <button
          className={`btn btn-success d-flex align-items-center justify-content-center flex-fill m-0 ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={()=> onPlaceOrder("place")}
          disabled={disabled}
        >
          <i className="ti ti-shopping-cart me-2" />
          Proceed
        </button>
      </div>
    </>
  );
};

export default PosActionButtons;
