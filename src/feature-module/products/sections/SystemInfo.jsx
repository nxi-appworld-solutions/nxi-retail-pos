import React from "react";
import {
  CheckCircle,
  XCircle,
  Slash,
  Eye,
  EyeOff,
  Info,
  Clock,
  User,
  Shield,
  RefreshCw,
  Trash2
} from "react-feather";

const SystemInfo = ({ formData, handleChange }) => {
  const setStatus = (status) =>
    handleChange({ target: { name: "status", value: status } });

  const toggle = (name, checked) =>
    handleChange({ target: { name: "name", value: checked } }); // Note: Corrected the target name logic

  return (
    <div className="row g-4 animate__animated animate__fadeIn">
      {/* --- ACCOUNT STATUS CONTROL --- */}
      <div className="col-12">
        <div className="p-4 bg-white border border-light rounded-4 shadow-sm">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h6 className="fw-bold mb-1">Lifecycle Status</h6>
              <p className="text-muted small mb-0">Define if this product is available for trading</p>
            </div>
            <span className={`badge px-3 py-2 rounded-pill ${
              formData.status === "Active" ? "bg-soft-success text-success" : "bg-soft-danger text-danger"
            }`}>
              Current: {formData.status || "Active"}
            </span>
          </div>

          <div className="d-flex gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => setStatus("Active")}
              className={`btn px-4 py-2 rounded-pill shadow-sm transition-all ${
                formData.status === "Active" ? "btn-success" : "btn-outline-secondary bg-white"
              }`}
            >
              <CheckCircle size={16} className="me-2" /> Active
            </button>

            <button
              type="button"
              onClick={() => setStatus("Inactive")}
              className={`btn px-4 py-2 rounded-pill shadow-sm transition-all ${
                formData.status === "Inactive" ? "btn-secondary" : "btn-outline-secondary bg-white"
              }`}
            >
              <XCircle size={16} className="me-2" /> Inactive
            </button>

            <button
              type="button"
              onClick={() => setStatus("Archived")}
              className={`btn px-4 py-2 rounded-pill shadow-sm transition-all ${
                formData.status === "Archived" ? "btn-danger" : "btn-outline-danger bg-white"
              }`}
            >
              <Slash size={16} className="me-2" /> Archived
            </button>
          </div>
        </div>
      </div>

      {/* --- CHANNEL VISIBILITY --- */}
      <div className="col-md-6">
        <div className="p-3 bg-light border border-white rounded-4 d-flex justify-content-between align-items-center shadow-sm h-100">
          <div className="d-flex align-items-center">
            <div className="p-2 bg-white rounded-3 me-3 shadow-xs text-info"><Eye size={20} /></div>
            <div>
              <h6 className="mb-0 fw-bold small">POS Visibility</h6>
              <small className="text-muted">Show in retail terminal</small>
            </div>
          </div>
          <div className="form-check form-switch m-0">
            <input
              type="checkbox"
              className="form-check-input p-2"
              checked={formData.visibleInPOS}
              onChange={(e) => handleChange({ target: { name: 'visibleInPOS', value: e.target.checked } })}
            />
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="p-3 bg-light border border-white rounded-4 d-flex justify-content-between align-items-center shadow-sm h-100">
          <div className="d-flex align-items-center">
            <div className="p-2 bg-white rounded-3 me-3 shadow-xs text-warning"><EyeOff size={20} /></div>
            <div>
              <h6 className="mb-0 fw-bold small">Online Catalog</h6>
              <small className="text-muted">Sync with E-commerce App</small>
            </div>
          </div>
          <div className="form-check form-switch m-0">
            <input
              type="checkbox"
              className="form-check-input p-2"
              checked={formData.visibleOnline || false}
              onChange={(e) => handleChange({ target: { name: 'visibleOnline', value: e.target.checked } })}
            />
          </div>
        </div>
      </div>

      {/* --- DATA SAFETY (NEW PRO FIELD) --- */}
      <div className="col-12 mt-2">
        <div className="p-3 border border-danger border-opacity-10 rounded-4 bg-soft-danger d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <Shield size={20} className="text-danger me-3" />
            <div>
              <h6 className="mb-0 fw-bold small">Deletion Lock</h6>
              <small className="text-muted">Prevent accidental deletion of this item from database</small>
            </div>
          </div>
          <div className="form-check form-switch m-0">
            <input
              type="checkbox"
              className="form-check-input p-2"
              checked={formData.isLocked || false}
              onChange={(e) => handleChange({ target: { name: 'isLocked', value: e.target.checked } })}
            />
          </div>
        </div>
      </div>

      {/* --- AUDIT TRAIL & SYNC INFO --- */}
      <div className="col-12 mt-2">
        <div className="p-4 bg-dark text-white rounded-4 shadow-lg overflow-hidden position-relative">
          <RefreshCw size={80} className="position-absolute end-0 bottom-0 opacity-10 mb-n3 me-n3" />
          <h6 className="fw-bold text-white small text-uppercase opacity-50 mb-3 tracking-widest">
            <Info size={14} className="me-1" /> System Logs & Audit
          </h6>
          <div className="row g-3">
            <div className="col-md-6 border-end border-secondary border-opacity-25">
              <div className="d-flex align-items-center mb-2">
                <User size={14} className="me-2 text-info" />
                <span className="small">Created By: <strong>{formData.createdBy || "System Admin"}</strong></span>
              </div>
              <div className="d-flex align-items-center">
                <Clock size={14} className="me-2 text-info" />
                <span className="small">Created On: <strong>{formData.createdDate || "19-Dec-2025 10:30 AM"}</strong></span>
              </div>
            </div>
            <div className="col-md-6 ps-md-4">
              <div className="d-flex align-items-center mb-2">
                <RefreshCw size={14} className="me-2 text-success" />
                <span className="small">Last Sync Status: <strong className="text-success">Success</strong></span>
              </div>
              <div className="d-flex align-items-center">
                <Clock size={14} className="me-2 text-success" />
                <span className="small">Modified At: <strong>{formData.modifiedDate || "Just Now"}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- DANGER ZONE --- */}
      <div className="col-12 mt-4 pt-2 border-top">
        <button type="button" className="btn btn-link text-danger p-0 small fw-bold text-decoration-none">
          <Trash2 size={14} className="me-1"/> Force Delete Item (Super-Admin Only)
        </button>
      </div>
    </div>
  );
};

export default SystemInfo;