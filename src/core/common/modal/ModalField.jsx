import React from "react";

const ModalField = ({ field, value, onChange, modalId }) => {
  const { name, label, type, required } = field;
  const id = `${modalId}-${name}`;

  if (type === "checkbox") {
    return (
      <div className="mb-3 form-check form-switch">
        <input
          id={id}
          type="checkbox"
          className="form-check-input"
          checked={!!value}
          onChange={(e) => onChange(name, e.target.checked)}
        />
        <label className="form-check-label" htmlFor={id}>
          {label}
        </label>
      </div>
    );
  }

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="form-control"
        value={value}
        required={required}
        onChange={(e) => onChange(name, e.target.value)}
      />
    </div>
  );
};

export default ModalField;
