import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../core/redux/modalSlice";

const PosFooterButtons = () => {
  const dispatch = useDispatch();

  return (
    <div className="pos-footer bg-white p-3 border-top">
      <div className="d-flex align-items-center justify-content-center flex-wrap gap-2">
        <button
          className="btn btn-primary d-flex align-items-center"
          onClick={() => dispatch(openModal("holdOrderList"))}
        >
          <i className="ti ti-player-pause me-2" />
          Hold
        </button>

        <button
          className="btn btn-primary d-flex align-items-center"
          onClick={() => dispatch(openModal("cancelOrder"))}
        >
          <i className="ti ti-trash me-2" />
          Cancel
        </button>

        <button
          className="btn btn-primary d-flex align-items-center"
          onClick={() => dispatch(openModal("payment"))}
        >
          <i className="ti ti-cash me-2" />
          Payment
        </button>

        <button
          className="btn btn-primary d-flex align-items-center"
          onClick={() => dispatch(openModal("splitPayment"))}
        >
          <i className="ti ti-arrows-split me-2" />
          Split
        </button>

        <button
          className="btn btn-primary d-flex align-items-center"
          onClick={() => dispatch(openModal("discountPopup"))}
        >
          <i className="ti ti-discount-2 me-2" />
          Discount
        </button>

        <button
          className="btn btn-primary d-flex align-items-center"
          onClick={() => dispatch(openModal("orders"))}
        >
          <i className="ti ti-shopping-cart me-2" />
          Orders
        </button>

        <button
          className="btn btn-primary d-flex align-items-center"
          onClick={() => dispatch(openModal("recentTransactions"))}
        >
          <i className="ti ti-history me-2" />
          Recent
        </button>

        <button
          className="btn btn-primary d-flex align-items-center"
          onClick={() => dispatch(openModal("reset"))}
        >
          <i className="ti ti-refresh me-2" />
          Reset
        </button>
      </div>
    </div>
  );
};

export default PosFooterButtons;
