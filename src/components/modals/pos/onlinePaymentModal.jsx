import React from "react";
import { Modal, Button } from "react-bootstrap";
import GlobalLoaderOverlay from "../../loader/pos/globalLoaderOverlay";

const OnlinePaymentModal = ({
  isOpen,
  onClose,
  onStartPayment,
  orderPayload,
  loading,
  loaderMessage,
}) => {
  if (!isOpen) return null;

  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      centered
      backdrop="static"
      keyboard={false}
      size="md"
      dialogClassName="payment-modal"
    >
      {/* HEADER */}
      <Modal.Header
        style={{
          background: "linear-gradient(135deg, #C52031, #ED1A3B)",
          color: "white",
        }}
      >
        <Modal.Title className="text-white">Online Payment</Modal.Title>
        <button className="modal-close-btnx" onClick={onClose}>
          ✖
        </button>
      </Modal.Header>

      {/* BODY */}
      <Modal.Body className="text-center" style={{ padding: "30px" }}>
        <GlobalLoaderOverlay
          visible={loading || !!loaderMessage}
          message={loaderMessage || (loading ? "Initializing payment..." : "")}
        />

        {!loading && (
          <>
            <h5 className="fw-semibold mb-2">Proceed to Online Payment</h5>
            <p className="text-muted">
              You will be redirected to the secure payment gateway.
            </p>

            <div className="d-flex justify-content-center gap-3">
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>

              <Button
                variant="primary"
                onClick={onStartPayment}
                disabled={!orderPayload}
              >
                Pay Now
              </Button>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default OnlinePaymentModal;
