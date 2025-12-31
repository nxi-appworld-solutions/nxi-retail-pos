import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";

const CashPaymentModal = ({
  isOpen,
  onClose,
  cashReceived,
  setCashReceived,
  total,
  change,
  onConfirm,
  loading,
}) => {
  return (
    <Modal show={isOpen} onHide={onClose} centered backdrop="static">
      {/* Header */}
      <Modal.Header
        style={{
          // background: "#d1e7dd",
          background: "linear-gradient(135deg, #C52031 0%, #ED1A3B 100%)",
          borderBottom: "1px solid #198754",
        }}
      >
        <Modal.Title className="fw-bold text-white">Cash Payment</Modal.Title>
        <button className="modal-close-btnx" onClick={onClose}>
          ✖
        </button>
      </Modal.Header>

      {/* Body */}
      <Modal.Body className="px-4">
        <div className="text-center mb-3">
          <h5 className="fw-semibold text-dark mb-1">
            Total Amount: <span className="text-success">₹{total}</span>
          </h5>
          <small className="text-muted">
            Please enter the amount received from customer
          </small>
        </div>

        <Form.Group className="mb-3">
          <Form.Label className="fw-medium">Cash Received</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter received amount"
            value={cashReceived}
            onChange={(e) => setCashReceived(e.target.value)}
            autoFocus
          />
        </Form.Group>

        <div
          className="d-flex justify-content-between align-items-center mt-3 p-2 rounded bg-light"
          // style={{ border: "1px dashed #198754" }}
          style={{ border: "1px dashed #871d19" }}
        >
          <span className="fw-medium text-dark">Change to Return:</span>
          <span
            className={`fw-bold ${
              change < 0 ? "text-danger" : "text-success"
            } `}
          >
            ₹{change}
          </span>
        </div>
      </Modal.Body>

      {/* Footer */}
      <Modal.Footer className="d-flex justify-content-between">
        <button className="btn btn-outline-secondary px-4" onClick={onClose}>
          Cancel
        </button>
        <button
          className="btn btn-primary fw-semibold"
          disabled={loading}
          onClick={onConfirm}
        >
          Confirm Payment
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default CashPaymentModal;
