import React from "react";
import { X, Hash, Shield, CheckCircle, RefreshCw } from "react-feather";
import useModal from "../useModal";
import useHSN from "../../../hooks/masters/useHSN";

const HSNMasterModal = () => {
  const { close } = useModal();
  const { formData, handleChange, onSubmit, loading } = useHSN();
  const gstList = [
    { id: 1, gstName: "GST 0%", gstPercent: 0 },
    { id: 2, gstName: "GST 5%", gstPercent: 5 },
    { id: 3, gstName: "GST 12%", gstPercent: 12 },
    { id: 4, gstName: "GST 18%", gstPercent: 18 },
    { id: 5, gstName: "GST 28%", gstPercent: 28 },
  ];

  return (
    <div className="modal-content border-0 rounded-3 shadow-2xl overflow-hidden">
      {/* HEADER */}
      <div className="modal-header bg-white px-4 py-3 border-bottom d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <div className="p-2 bg-soft-primary rounded-3 me-3 text-primary">
            <Hash size={22} />
          </div>
          <div>
            <h5 className="fw-bold mb-0">HSN Master</h5>
            <p className="text-muted small mb-0">
              Government defined classification for items
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
          <div className="col-md-4">
            <label className="form-label small fw-bold">
              HSN Code <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="hsnCode"
              className="form-control shadow-sm font-monospace"
              placeholder="9405"
              value={formData.hsnCode}
              onChange={handleChange}
              disabled={formData.isLocked}
            />
            <small className="text-muted">
              4 / 6 / 8 digit government code
            </small>
          </div>

          <div className="col-md-8">
            <label className="form-label small fw-bold">HSN Description</label>
            <input
              type="text"
              name="hsnDescription"
              className="form-control shadow-sm"
              placeholder="Lighting fittings and fixtures"
              value={formData.hsnDescription}
              onChange={handleChange}
              disabled={formData.isLocked}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label small fw-bold">Default GST %</label>
            <select
              name="defaultGSTId"
              className="form-select shadow-sm"
              value={formData.defaultGSTId}
              onChange={handleChange}
              disabled={formData.isLocked}
            >
              <option value="">Select GST Slab</option>
              {gstList.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.gstName} ({g.gstPercent}%)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* STATUS */}
        <div className="mt-3 p-3 bg-soft-warning rounded-3 border border-warning border-opacity-10 d-flex justify-content-between align-items-center">
          <div>
            <h6 className="mb-0 fw-bold small">HSN Status</h6>
            <small className="text-muted">
              Inactive HSN will not appear in Item Master
            </small>
          </div>
          <div className="form-check form-switch">
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

        {/* LOCK */}
        <div className="mt-3 p-3 bg-soft-danger rounded-3 border border-danger border-opacity-10 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Shield size={18} className="text-danger me-2" />
            <div>
              <h6 className="mb-0 fw-bold small">Administrative Lock</h6>
              <small className="text-muted">
                Locked HSN cannot be modified after usage
              </small>
            </div>
          </div>
          <div className="form-check form-switch">
            <input
              type="checkbox"
              className="form-check-input"
              checked={formData.isLocked}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "isLocked",
                    value: e.target.checked,
                  },
                })
              }
            />
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="modal-footer bg-light px-4 py-3">
        <button className="btn btn-outline-secondary" onClick={close}>
          Cancel
        </button>
        <button
          className="btn btn-success ms-2 d-flex align-items-center"
          onClick={onSubmit}
          disabled={loading}
        >
          {loading ? (
            <RefreshCw size={18} className="me-2 animate-spin" />
          ) : (
            <CheckCircle size={18} className="me-2" />
          )}
          Save HSN
        </button>
      </div>
    </div>
  );
};

export default HSNMasterModal;
