import React, { useEffect, useState } from "react";
import ModalField from "./ModalField";

const CommonModal = ({
  modalId,
  title,
  fields = [],
  mode = "create",
  defaultData = {},
  onSubmit,
}) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const modalEl = document.getElementById(modalId);

    const handleShown = () => {
      const initialData = Object.fromEntries(
        fields.map(({ name, type }) => [
          name,
          type === "checkbox" ? !!defaultData[name] : defaultData[name] ?? "",
        ])
      );
      setFormData(initialData);
    };

    modalEl?.addEventListener("shown.bs.modal", handleShown);
    return () => modalEl?.removeEventListener("shown.bs.modal", handleShown);
  }, [modalId, defaultData, fields]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <div className="modal fade" id={modalId}>
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="modal-header custom-modal-header">
            <h4>{mode === "edit" ? `Edit ${title}` : `Create ${title}`}</h4>
            <button
              type="button"
              className="close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form
            className="modal-body custom-modal-body"
            onSubmit={handleSubmit}
          >
            {fields.map((field, index) => (
              <ModalField
                key={index}
                field={field}
                value={formData[field.name]}
                onChange={handleChange}
                modalId={modalId}
              />
            ))}

            <div className="modal-footer mt-3">
              <button
                type="button"
                className="btn me-2 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary fs-13 fw-medium p-2 px-3"
              >
                {mode === "edit" ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommonModal;
