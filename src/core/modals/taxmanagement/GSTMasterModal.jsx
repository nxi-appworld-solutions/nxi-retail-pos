import React from "react";
import { X, Percent, Shield, CheckCircle, RefreshCw } from "react-feather";
import useModal from "../useModal";
import useGST from "../../../hooks/masters/useGST";
// import useGST from "../../hooks/masters/useGST";

const GSTMasterModal = () => {
  const { close } = useModal();
  const { formData, handleChange, onSubmit, loading } = useGST();

  return (
    <div className="modal-content border-0 rounded-3 shadow-2xl overflow-hidden">
      {/* HEADER */}
      <div className="modal-header bg-white px-4 py-3 border-bottom d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <div className="p-2 bg-soft-success rounded-3 me-3 text-success">
            <Percent size={22} />
          </div>
          <div>
            <h5 className="fw-bold mb-0">GST Master</h5>
            <p className="text-muted small mb-0">
              Configure GST slabs & tax behavior
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
              GST Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="gstName"
              className="form-control shadow-sm fw-bold"
              placeholder="Sales GST 18%"
              value={formData.gstName}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-bold">GST Code</label>
            <input
              type="text"
              name="gstCode"
              className="form-control shadow-sm text-uppercase"
              placeholder="GST18"
              value={formData.gstCode}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-bold">GST %</label>
            <input
              type="number"
              name="gstPercent"
              className="form-control shadow-sm fw-bold text-success"
              value={formData.gstPercent}
              onChange={handleChange}
            />
            <small className="text-muted d-block mt-1">
              GST calculation behavior is controlled from <b>GST Settings</b>
            </small>
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-bold">Price Type</label>
            <select
              name="isInclusive"
              className="form-select shadow-sm"
              value={formData.isInclusive}
              onChange={handleChange}
            >
              <option value={false}>Exclusive</option>
              <option value={true}>Inclusive</option>
            </select>
          </div>

          {/* AUTO SPLIT */}
          <div className="col-md-4">
            <label className="form-label small fw-bold">CGST %</label>
            <input
              type="number"
              className="form-control shadow-sm"
              value={formData.cgstPercent}
              disabled
            />
          </div>

          <div className="col-md-4">
            <label className="form-label small fw-bold">SGST %</label>
            <input
              type="number"
              className="form-control shadow-sm"
              value={formData.sgstPercent}
              disabled
            />
          </div>

          <div className="col-md-4">
            <label className="form-label small fw-bold">IGST %</label>
            <input
              type="number"
              className="form-control shadow-sm"
              value={formData.igstPercent}
              disabled
            />
          </div>
        </div>

        {/* ADMIN LOCK */}
        <div className="mt-3 p-3 bg-soft-danger rounded-3 border border-danger border-opacity-10 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Shield size={18} className="text-danger me-2" />
            <div>
              <h6 className="mb-0 fw-bold small">Administrative Lock</h6>
              <small className="text-muted">
                Locked GST cannot be edited once used in billing
              </small>

              {/* OPTIONAL helper */}
              {formData.isLocked && (
                <div className="small text-danger mt-1">
                  🔒 This GST slab is currently locked
                </div>
              )}
            </div>
          </div>

          <div className="form-check form-switch m-0">
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

        {/* STATUS CONTROL */}
        <div className="mt-3 p-3 bg-soft-warning rounded-3 border border-warning border-opacity-10 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Percent size={18} className="text-warning me-2" />
            <div>
              <h6 className="mb-0 fw-bold small">GST Status</h6>
              <small className="text-muted">
                Inactive GST will not appear in Item or POS billing
              </small>

              {/* OPTIONAL helper */}
              {formData.status === "Inactive" && (
                <div className="small text-warning mt-1">
                  ⚠️ This GST slab is inactive for future transactions
                </div>
              )}
            </div>
          </div>

          <div className="form-check form-switch m-0">
            <input
              type="checkbox"
              className="form-check-input"
              checked={formData.status === "Active"}
              onChange={(e) => {
                if (!e.target.checked) {
                  const ok = window.confirm(
                    "This GST will be hidden from future billing. Continue?",
                  );
                  if (!ok) return;
                }

                handleChange({
                  target: {
                    name: "status",
                    value: e.target.checked ? "Active" : "Inactive",
                  },
                });
              }}
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
          Save GST
        </button>
      </div>
    </div>
  );
};

export default GSTMasterModal;
