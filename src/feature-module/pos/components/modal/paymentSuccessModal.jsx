import React from "react";
import { Modal, Button } from "react-bootstrap";

const PaymentSuccessModal = ({
  show,
  setShow,
  orderId,
  paymentType,
  change,
}) => {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      centered
      backdrop="static"
      className="payment-success-unique-modal"
    >
      <Modal.Header
        style={{
          background: "#d1e7dd",
          borderBottom: "2px solid #198754",
        }}
      >
        <Modal.Title className="fw-bold text-success d-flex align-items-center gap-2">
          🎉 Payment Successful
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center py-4">
        <div className="mb-3">
          <div
            className="rounded-circle mx-auto d-flex align-items-center justify-content-center"
            style={{
              background: "#198754",
              color: "#fff",
              width: "70px",
              height: "70px",
              fontSize: "32px",
            }}
          >
            ✅
          </div>
        </div>

        <h5 className="fw-semibold text-success mb-2">
          Order Placed Successfully!
        </h5>
        {orderId && <p className="text-muted mb-1">Order ID: #{orderId}</p>}
        <p className="mb-2">
          Payment Method: <strong className="text-dark">{paymentType}</strong>
        </p>
        {paymentType === "cash" && (
          <p className="mb-0">
            Change to Return:{" "}
            <strong className="text-success">₹{change}</strong>
          </p>
        )}
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-center gap-3">
        <Button
          variant="outline-success"
          className="fw-semibold"
          onClick={() => console.log("🖨️ Print receipt")}
        >
          🖨️ Print Bill
        </Button>
        <Button
          variant="success"
          className="fw-semibold"
          onClick={() => {
            setShow(false);
            window.location.reload(); // or reset cart + go to new order
          }}
        >
          🆕 New Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentSuccessModal;
