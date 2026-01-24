import React, { useState, useMemo } from "react";
import { X, Layers, Plus, Trash2, CheckCircle, RefreshCw } from "react-feather";
import useModal from "../useModal";

/* -------------------- CONSTANTS -------------------- */

const ATTRIBUTE_TYPES = [
  { value: "SELECT", label: "Single Select" },
  { value: "MULTI", label: "Multi Select" },
  { value: "TEXT", label: "Text" },
  { value: "NUMBER", label: "Number" },
  { value: "COLOR", label: "Color Picker" },
];

const VALUE_BASE = { valueName: "", valueCode: "", status: "Active" };

/* -------------------- COMPONENT -------------------- */

const VariantAttributesModal = () => {
  const { close, payload } = useModal();
  const mode = payload?.mode || "ADD";
  const record = payload?.record || null;

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [attribute, setAttribute] = useState({
    attributeName: record?.attributeName || "",
    attributeCode: record?.attributeCode || "",
    attributeType: record?.attributeType || "SELECT",
    isRequired: record?.isRequired || false,
    status: record?.status || "Active",
  });

  const [values, setValues] = useState(
    record?.values?.length ? record.values : [{ ...VALUE_BASE }],
  );

  /* -------------------- DERIVED -------------------- */

  const showValues = useMemo(
    () => ["SELECT", "MULTI", "COLOR"].includes(attribute.attributeType),
    [attribute.attributeType],
  );

  /* -------------------- HELPERS -------------------- */

  const isDuplicateValue = (name, index) =>
    values.some(
      (v, i) =>
        i !== index &&
        v.valueName.trim().toLowerCase() === name.trim().toLowerCase(),
    );

  /* -------------------- HANDLERS -------------------- */

  const handleAttributeChange = (e) => {
    const { name, value } = e.target;

    if (name === "attributeType" && values.length > 0 && showValues) {
      const ok = window.confirm(
        "Changing attribute type will reset values. Continue?",
      );
      if (!ok) return;
      setValues([{ ...VALUE_BASE }]);
    }

    setAttribute((p) => ({ ...p, [name]: value }));
  };

  const handleValueChange = (i, field, value) => {
    const updated = [...values];
    updated[i][field] = value;
    setValues(updated);
  };

  const addValue = () => setValues((p) => [...p, { ...VALUE_BASE }]);

  const removeValue = (i) => {
    if (values.length === 1) return;
    setValues((p) => p.filter((_, idx) => idx !== i));
  };

  /* -------------------- VALIDATION -------------------- */

  const validate = () => {
    const e = {};

    if (!attribute.attributeName.trim())
      e.attributeName = "Attribute name is required";

    if (showValues) {
      if (values.some((v) => !v.valueName.trim()))
        e.values = "All values must be filled";

      if (values.some((v, i) => isDuplicateValue(v.valueName, i)))
        e.values = "Duplicate values are not allowed";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* -------------------- SUBMIT -------------------- */

  const onSubmit = () => {
    if (!validate()) return;

    setLoading(true);

    const finalPayload = {
      ...attribute,
      values: showValues ? values : [],
    };

    console.log("FINAL ATTRIBUTE PAYLOAD", finalPayload);

    // API CALL HERE
    setTimeout(() => {
      setLoading(false);
      close();
    }, 1000);
  };

  /* -------------------- UI -------------------- */

  return (
    <div className="modal-content border-0 rounded-3 shadow-2xl overflow-hidden">
      {/* HEADER */}
      <div className="modal-header bg-white px-4 py-3 border-bottom d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <div className="p-2 bg-soft-primary rounded-3 me-3 text-primary">
            <Layers size={22} />
          </div>
          <div>
            <h5 className="fw-bold mb-0">
              {mode === "ADD"
                ? "Create Variant Attribute"
                : "Edit Variant Attribute"}
              <span className="badge bg-primary-subtle text-primary ms-2">
                {attribute.attributeType}
              </span>
            </h5>
            <p className="text-muted small mb-0">
              Attribute definition & value management
            </p>
          </div>
        </div>
        <button className="btn btn-light rounded-circle" onClick={close}>
          <X size={18} />
        </button>
      </div>

      {/* BODY */}
      <div className="modal-body bg-white px-4 py-4">
        {/* ATTRIBUTE DEFINITION */}
        <div className="mb-4">
          <h6 className="fw-bold mb-3">Attribute Definition</h6>

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label small fw-bold">
                Attribute Name *
              </label>
              <input
                className={`form-control fw-bold ${
                  errors.attributeName ? "is-invalid" : ""
                }`}
                value={attribute.attributeName}
                placeholder="Size / Color / RAM"
                onChange={(e) =>
                  setAttribute((p) => ({
                    ...p,
                    attributeName: e.target.value,
                  }))
                }
              />
              <div className="invalid-feedback">{errors.attributeName}</div>
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-bold">Attribute Code</label>
              <input
                className="form-control text-uppercase"
                value={attribute.attributeCode}
                placeholder="SIZE, COLOR"
                onChange={(e) =>
                  setAttribute((p) => ({
                    ...p,
                    attributeCode: e.target.value,
                  }))
                }
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-bold">Attribute Type</label>
              <select
                className="form-select"
                name="attributeType"
                value={attribute.attributeType}
                onChange={handleAttributeChange}
              >
                {ATTRIBUTE_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3 d-flex align-items-center">
              <div className="form-check form-switch mt-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={attribute.isRequired}
                  onChange={(e) =>
                    setAttribute((p) => ({
                      ...p,
                      isRequired: e.target.checked,
                    }))
                  }
                />
                <label className="form-check-label small fw-bold">
                  Mandatory
                </label>
              </div>
            </div>

            <div className="col-md-3 d-flex align-items-center">
              <div className="form-check form-switch mt-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={attribute.status === "Active"}
                  onChange={(e) =>
                    setAttribute((p) => ({
                      ...p,
                      status: e.target.checked ? "Active" : "Inactive",
                    }))
                  }
                />
                <label className="form-check-label small fw-bold">Active</label>
              </div>
            </div>
          </div>
        </div>

        {/* VALUES */}
        {showValues ? (
          <>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="fw-bold mb-0">Attribute Values</h6>
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={addValue}
              >
                <Plus size={14} className="me-1" />
                Add Value
              </button>
            </div>

            {errors.values && (
              <div className="alert alert-danger py-2 small">
                {errors.values}
              </div>
            )}

            <div className="table-responsive border rounded-3">
              <table className="table table-sm align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Value</th>
                    <th>Code</th>
                    <th>Status</th>
                    <th width="40"></th>
                  </tr>
                </thead>
                <tbody>
                  {values.map((v, i) => (
                    <tr key={i}>
                      <td>
                        <input
                          className={`form-control form-control-sm fw-bold ${
                            isDuplicateValue(v.valueName, i) ? "is-invalid" : ""
                          }`}
                          value={v.valueName}
                          placeholder="Value Name (e.g., Red, Large)"
                          onChange={(e) =>
                            handleValueChange(i, "valueName", e.target.value)
                          }
                        />
                        <div className="invalid-feedback">Duplicate value</div>
                      </td>

                      <td>
                        {attribute.attributeType === "COLOR" ? (
                          <input
                            type="color"
                            className="form-control form-control-color"
                            value={v.valueCode || "#000000"}
                            placeholder="Code"
                            onChange={(e) =>
                              handleValueChange(i, "valueCode", e.target.value)
                            }
                          />
                        ) : (
                          <input
                            className="form-control form-control-sm text-uppercase"
                            value={v.valueCode}
                            placeholder="Code"
                            onChange={(e) =>
                              handleValueChange(i, "valueCode", e.target.value)
                            }
                          />
                        )}
                      </td>

                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={v.status}
                          onChange={(e) =>
                            handleValueChange(i, "status", e.target.value)
                          }
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </td>

                      <td className="text-end">
                        <Trash2
                          size={14}
                          className="text-danger cursor-pointer"
                          onClick={() => removeValue(i)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="alert alert-info small">
            This attribute type does not require predefined values.
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="modal-footer bg-light px-4 py-3 sticky-bottom">
        <button className="btn btn-outline-secondary me-2" onClick={close}>
          Cancel
        </button>
        <button
          className="btn btn-primary d-flex align-items-center"
          onClick={onSubmit}
          disabled={loading}
        >
          {loading ? (
            <RefreshCw size={18} className="me-2 animate-spin" />
          ) : (
            <CheckCircle size={18} className="me-2" />
          )}
          Save
        </button>
      </div>
    </div>
  );
};

export default VariantAttributesModal;
