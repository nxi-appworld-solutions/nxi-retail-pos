import React from "react";
import BaseModal from "../../../../core/common/modal/baseModal";

const CartWarningModal = ({
  showConfirmClear,
  setShowConfirmClear,
  confirmMessage,
  handleConfirmClear,
  onClose,
}) => {
  if (!showConfirmClear) return null;

  return (
    <BaseModal
      title="Cart Already Has Items"
      size="md"
      onClose={() => {
        setShowConfirmClear(false);
        onClose?.();
      }}
      footer={
        <div className="d-flex align-items-center justify-content-between w-100 gap-2 flex-wrap">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleConfirmClear("clear")}
          >
            <i className="ti ti-trash me-1"></i>
            Clear Cart
          </button>

          <button
            type="button"
            className="btn btn-success"
            onClick={() => handleConfirmClear("keep")}
          >
            <i className="ti ti-shopping-cart me-1"></i>
            Keep Cart
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setShowConfirmClear(false);
              onClose?.();
            }}
          >
            Cancel
          </button>
        </div>
      }
    >
      <div className="new-employee-field">
        {/* WARNING ICON */}
        <div className="text-center mb-3">
          <div
            className="mx-auto d-flex align-items-center justify-content-center rounded-circle"
            style={{
              width: "70px",
              height: "70px",
              background: "#fff3cd",
              color: "#ff9800",
              fontSize: "32px",
            }}
          >
            <i className="ti ti-alert-triangle"></i>
          </div>
        </div>

        {/* MESSAGE */}
        <div className="text-center">
          <h5 className="fw-semibold mb-2">
            Cart Contains Existing Items
          </h5>

          <p className="text-muted mb-2">
            {confirmMessage}
          </p>

          <small className="text-muted">
            You can clear current cart items or
            continue with existing products.
          </small>
        </div>
      </div>
    </BaseModal>
  );
};

export default CartWarningModal;