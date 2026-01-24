import React from "react";
import { X, Percent, Shield, CheckCircle, RefreshCw } from "react-feather";
import useModal from "../useModal";
import useTaxGroup from "../../../hooks/masters/useTaxGroup";

const TaxGroupModal = () => {
  const { close } = useModal();
  const { formData, handleChange, onSubmit, loading } = useTaxGroup();

  return (
    <div className="modal-content border-0 rounded-3 shadow-2xl overflow-hidden">
      {/* HEADER */}
      <div className="modal-header bg-white px-4 py-3 border-bottom d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <div className="p-2 bg-soft-success rounded-3 me-3 text-success">
            <Percent size={22} />
          </div>
          <div>
            <h5 className="fw-bold mb-0">Tax Group</h5>
            <p className="text-muted small mb-0">
              Structure and grouping of tax components
            </p>
          </div>
        </div>
        <button className="btn btn-light rounded-circle p-2" onClick={close}>
          <X size={18} />
        </button>
      </div>

      {/* BODY */}
      <div className="modal-body px-4 py-4 bg-white">
        {/* BASIC INFO */}
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label small fw-bold">
              Tax Group Name *
            </label>
            <input
              type="text"
              name="taxGroupName"
              className="form-control shadow-sm fw-bold"
              placeholder="GST 18%"
              value={formData.taxGroupName}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-bold">
              Tax Group Code
            </label>
            <input
              type="text"
              name="taxGroupCode"
              className="form-control shadow-sm text-uppercase"
              placeholder="GST18"
              value={formData.taxGroupCode}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* TAX COMPONENTS */}
        <div className="mt-3 p-3 bg-soft-light rounded-3 border">
          <h6 className="fw-bold small mb-2">Tax Components</h6>

          <div className="row g-2">
            <div className="col-md-4">
              <label className="small fw-bold">CGST %</label>
              <input
                type="number"
                className="form-control"
                value={formData.cgstPercent}
                disabled
              />
            </div>

            <div className="col-md-4">
              <label className="small fw-bold">SGST %</label>
              <input
                type="number"
                className="form-control"
                value={formData.sgstPercent}
                disabled
              />
            </div>

            <div className="col-md-4">
              <label className="small fw-bold">IGST %</label>
              <input
                type="number"
                className="form-control"
                value={formData.igstPercent}
                disabled
              />
            </div>
          </div>

          <small className="text-muted">
            Components are auto-calculated for GST-based tax groups
          </small>
        </div>

        {/* STATUS */}
        <div className="mt-3 p-3 bg-soft-warning rounded-3 border border-warning border-opacity-10 d-flex justify-content-between">
          <div>
            <h6 className="fw-bold small mb-0">Tax Group Status</h6>
            <small className="text-muted">
              Inactive groups will not appear in HSN or Item master
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
        <div className="mt-3 p-3 bg-soft-danger rounded-3 border border-danger border-opacity-10 d-flex justify-content-between">
          <div>
            <h6 className="fw-bold small mb-0">Administrative Lock</h6>
            <small className="text-muted">
              Locked tax groups cannot be modified once used in billing
            </small>
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
          Save Tax Group
        </button>
      </div>
    </div>
  );
};

export default TaxGroupModal;
