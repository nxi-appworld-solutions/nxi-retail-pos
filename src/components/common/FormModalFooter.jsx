// components/FormModalFooter.jsx
import React from "react";
import { Modal, Button, Spinner } from "react-bootstrap";

const FormModalFooter = ({
  title,
  onClose,
  isLoading,
  isEditMode,
}) => {
  return (
    <Modal.Footer className="d-flex gap-2 pb-0 justify-content-end">
      <Button variant="secondary" onClick={onClose}>
        Cancel
      </Button>
      <Button type="submit" variant="primary" disabled={isLoading}>
        {isLoading ? (
          <>
            <Spinner animation="border" size="sm" className="me-2" />
            {isEditMode ? "Updating..." : "Adding..."}
          </>
        ) : isEditMode ? (
          `Update ${title}`
        ) : (
          `Add ${title}`
        )}
      </Button>
    </Modal.Footer>
  );
};

export default FormModalFooter;
