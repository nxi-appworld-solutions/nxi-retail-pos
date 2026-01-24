import React, { useState } from "react";
import { X, CheckCircle, RefreshCw, } from "react-feather";
import useModal from "../useModal";
import { Scale } from "lucide-react";

const UnitMasterModal = () => {
  const { close, payload } = useModal();
  const mode = payload?.mode || "ADD";
  const record = payload?.record || null;

  const [formData, setFormData] = useState({
    unitName: record?.unitName || "",
    unitCode: record?.unitCode || "",
    baseUnit: record?.baseUnit || "",
    conversionFactor: record?.conversionFactor || 1,
    status: record?.status || "Active",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = () => {
    if (!formData.unitName.trim()) return;
    if (!formData.unitCode.trim()) return;

    setLoading(true);

    const payloadToSave = {
      ...formData,
      conversionFactor: Number(formData.conversionFactor),
    };

    console.log("SAVE UNIT", payloadToSave);

    // API CALL HERE
    setTimeout(() => {
      setLoading(false);
      close();
    }, 800);
  };

  return (
    <div className="modal-content border-0 rounded-3 shadow-2xl overflow-hidden">
      {/* HEADER */}
      <div className="modal-header bg-white px-4 py-3 border-bottom d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <div className="p-2 bg-soft-primary rounded-3 me-3 text-primary">
            <Scale size={22} />
          </div>
          <div>
            <h5 className="fw-bold mb-0">
              {mode === "ADD" ? "Add Unit" : "Edit Unit"}
            </h5>
            <p className="text-muted small mb-0">
              Define stock & quantity measurement units
            </p>
          </div>
        </div>
        <button className="btn btn-light rounded-circle p-2" onClick={close}>
          <X size={18} />
        </button>
      </div>

      {/* BODY */}
      <div className="modal-body px-4 py-4 bg-white">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label small fw-bold">
              Unit Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="unitName"
              className="form-control shadow-sm fw-bold"
              placeholder="Kilogram / Piece"
              value={formData.unitName}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-bold">
              Unit Code <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="unitCode"
              className="form-control shadow-sm text-uppercase fw-bold"
              placeholder="KG / PCS"
              value={formData.unitCode}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-bold">
              Base Unit
            </label>
            <input
              type="text"
              name="baseUnit"
              className="form-control shadow-sm"
              placeholder="KG / PCS"
              value={formData.baseUnit}
              onChange={handleChange}
            />
            <small className="text-muted">
              Leave empty if this is a base unit
            </small>
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-bold">
              Conversion Factor
            </label>
            <input
              type="number"
              name="conversionFactor"
              className="form-control shadow-sm"
              step="0.0001"
              value={formData.conversionFactor}
              onChange={handleChange}
            />
            <small className="text-muted">
              Example: 1 BOX = 12 PCS → factor = 12
            </small>
          </div>
        </div>

        {/* STATUS */}
        <div className="mt-3 p-3 bg-soft-warning rounded-3 border border-warning border-opacity-10 d-flex justify-content-between align-items-center">
          <div>
            <h6 className="mb-0 fw-bold small">Unit Status</h6>
            <small className="text-muted">
              Inactive units won’t appear in Product & Purchase
            </small>
          </div>
          <div className="form-check form-switch m-0">
            <input
              type="checkbox"
              className="form-check-input"
              checked={formData.status === "Active"}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "status",
                    value: e.target.checked ? "Active" : "Inactive",
                  },
                })
              }
            />
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="modal-footer bg-light px-4 py-3">
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

export default UnitMasterModal;
