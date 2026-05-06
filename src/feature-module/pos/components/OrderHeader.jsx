import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import usePos from "../../../core/hooks/usePos";
import { clearCart } from "../../../core/redux/store/cartSlice";
import { resetPosOrderState } from "../../../core/redux/store/posOrderSlice";

const OrderHeader = () => {
  const dispatch = useDispatch();
  const { voucherNumber } = usePos();

  return (
    <div className="order-head d-flex align-items-center justify-content-between w-100">
      <div>
        <h3>Order List</h3>
      </div>
      <div className="d-flex align-items-center gap-2">
        {/* <Link
          className="btn btn-outline-secondary"
        >
          <i className="ti ti-search" /> Find Customer
        </Link> */}
        <span className="badge badge-dark fs-10 fw-medium badge-xs">
          #{voucherNumber}
        </span>
        <Link
          className="link-danger fs-16"
          onClick={() => {
            dispatch(clearCart());
            dispatch(resetPosOrderState());
          }}
        >
          <i className="ti ti-trash-x-filled" />
        </Link>
      </div>
    </div>
  );
};

export default OrderHeader;
