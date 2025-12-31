import React from "react";
import { Modal, Button } from "react-bootstrap";

const CommonDeleteModal = ({ onShow, onClose, onConfirm, title, message }) => {
  return (
    <Modal centered show={onShow} onHide={onClose}>
      <Modal.Body className="text-center p-4">
        <span className="rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2">
          <i className="ti ti-trash fs-24 text-danger" />
        </span>
        <h4 className="fs-20 fw-bold mb-2">{title || "Confirm Delete"}</h4>
        <p className="fs-16">
          {message || "Are you sure you want to delete this item?"}
        </p>
        <div className="d-flex justify-content-center mt-3">
          <Button variant="secondary" className="me-2" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Yes, Delete
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CommonDeleteModal;
