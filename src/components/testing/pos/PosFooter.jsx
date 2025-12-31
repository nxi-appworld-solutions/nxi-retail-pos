import React from "react";
import { Link } from "react-router-dom";

const PosFooter = () => {
  return (
    // <div className="pos-footer bg-white p-3 border-top">
    //   <div className="d-flex align-items-center justify-content-center flex-wrap gap-2">
    //     <Link
    //       to="#"
    //       className="btn btn-primary d-inline-flex align-items-center justify-content-center"
    //       data-bs-toggle="modal"
    //       data-bs-target="#hold-order"
    //     >
    //       <i className="ti ti-player-pause me-2" />
    //       Hold
    //     </Link>
    //     <Link
    //       to="#"
    //       className="btn btn-primary d-inline-flex align-items-center justify-content-center"
    //     >
    //       <i className="ti ti-trash me-2" />
    //       Void
    //     </Link>
    //     <Link
    //       to="#"
    //       className="btn btn-primary d-flex align-items-center justify-content-center"
    //       data-bs-toggle="modal"
    //       data-bs-target="#payment-completed"
    //     >
    //       <i className="ti ti-cash-banknote me-2" />
    //       Payment
    //     </Link>
    //     <Link
    //       to="#"
    //       className="btn btn-primary d-inline-flex align-items-center justify-content-center"
    //       data-bs-toggle="modal"
    //       data-bs-target="#orders"
    //     >
    //       <i className="ti ti-shopping-cart me-2" />
    //       View Orders
    //     </Link>
    //     <Link
    //       to="#"
    //       className="btn btn-primary d-inline-flex align-items-center justify-content-center"
    //       data-bs-toggle="modal"
    //       data-bs-target="#reset"
    //     >
    //       <i className="ti ti-reload me-2" />
    //       Reset
    //     </Link>
    //     <Link
    //       to="#"
    //       className="btn btn-primary d-inline-flex align-items-center justify-content-center"
    //       data-bs-toggle="modal"
    //       data-bs-target="#recents"
    //     >
    //       <i className="ti ti-refresh-dot me-2" />
    //       Transaction
    //     </Link>
    //   </div>
    // </div>

    <div className="pos-footer bg-white p-3 border-top">
      <div className="d-flex align-items-center justify-content-center flex-wrap gap-2">
        {/* Hold Order */}
        <Link
          to="#"
          className="btn btn-secondary d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#hold-order"
        >
          <i className="ti ti-player-pause me-2" />
          Hold
        </Link>

        {/* Cancel Order */}
        <Link
          to="#"
          className="btn btn-danger d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#cancel-order"
        >
          <i className="ti ti-trash me-2" />
          Cancel
        </Link>

        {/* Payment */}
        <Link
          to="#"
          className="btn btn-primary d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#payment-completed"
        >
          <i className="ti ti-cash me-2" />
          Pay
        </Link>

        {/* Split Payment */}
        <Link
          to="#"
          className="btn btn-warning d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#split-payment"
        >
          <i className="ti ti-arrows-split me-2" />
          Split
        </Link>

        {/* Discount */}
        <Link
          to="#"
          className="btn btn-info d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#discount-popup"
        >
          <i className="ti ti-discount-2 me-2" />
          Discount
        </Link>

        {/* View Orders */}
        <Link
          to="#"
          className="btn btn-dark d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#orders"
        >
          <i className="ti ti-shopping-cart me-2" />
          Orders
        </Link>

        {/* Recent Transactions */}
        <Link
          to="#"
          className="btn btn-outline-dark d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#transactions"
        >
          <i className="ti ti-history me-2" />
          Recent
        </Link>

        {/* Reset */}
        <Link
          to="#"
          className="btn btn-outline-secondary d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#reset"
        >
          <i className="ti ti-refresh me-2" />
          Reset
        </Link>
      </div>
    </div>
  );
};

export default PosFooter;
