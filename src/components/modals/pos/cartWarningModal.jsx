import React from "react";
import { Button, Modal } from "react-bootstrap";

const CartWarningModal = ({
  showConfirmClear,
  setShowConfirmClear,
  confirmMessage,
  handleConfirmClear,
  onClose,
}) => {
  return (
    <Modal
      show={showConfirmClear}
      onHide={() => setShowConfirmClear(false)}
      centered
      backdrop="static"
    >
      <Modal.Header
        style={{
          background: "#ffeeba",
          borderBottom: "1px solid #ffc107",
        }}
      >
        <Modal.Title className="fw-bold text-dark">
          ⚠️ Cart Already Has Items
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="text-dark mb-0">{confirmMessage}</p>
        <small className="text-muted">
          You can clear existing items or keep them and continue scanning.
        </small>
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-between">
        <Button
          variant="danger"
          onClick={() => handleConfirmClear("clear")}
          className="fw-semibold"
        >
          🗑️ Clear Cart
        </Button>

        <Button
          variant="success"
          onClick={() => handleConfirmClear("keep")}
          className="fw-semibold"
        >
          🛒 Keep Cart
        </Button>

        <Button
          variant="outline-secondary"
          onClick={() => {
            setShowConfirmClear(false);
            onClose();
          }}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CartWarningModal;
