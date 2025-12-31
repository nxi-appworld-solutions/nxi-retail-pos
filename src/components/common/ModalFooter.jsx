import React from "react";
import { Spinner } from "react-bootstrap";

const ModalFooter = ({ isLoading, isEditMode, onReset, onClose, formId }) => {
  return (
    <div className="modal-footer">
      <button
        type="button"
        className="btn btn-secondary me-2"
        onClick={() => {
          onReset();
          onClose();
        }}
      >
        Cancel
      </button>
      <button
        type="submit"
        form={formId}
        className="btn btn-primary"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Spinner animation="border" size="sm" className="me-2" />
            {isEditMode ? "Updating..." : "Submit..."}
          </>
        ) : isEditMode ? (
          "Update"
        ) : (
          "Submit"
        )}
      </button>
    </div>
  );
};

export default ModalFooter;
