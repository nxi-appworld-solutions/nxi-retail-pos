import React from "react";
import { Activity, Shield, Info, Clock, CheckCircle, XCircle, Slash, Key, Lock } from "react-feather";

const SystemInfo = ({ formData, handleChange }) => {
  const updateStatus = (newStatus) => {
    handleChange({ target: { name: "status", value: newStatus } });
  };

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    handleChange({ target: { name, value: checked } });
  };

  return (
    <div className="row g-4 animate__animated animate__fadeIn">
      {/* --- STATUS MANAGEMENT --- */}
      <div className="col-md-12">
        <div className="card border-0 bg-light p-4 rounded-4 shadow-sm">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <label className="form-label fw-bold text-uppercase small text-muted mb-0">
              Customer Account Status
            </label>
            <span className="badge bg-white text-dark border shadow-sm px-3 py-2">
              Current: {formData.status || 'Active'}
            </span>
          </div>
          
          <div className="d-flex gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => updateStatus("Active")}
              className={`btn d-flex align-items-center px-4 py-2 rounded-pill shadow-sm transition-all ${
                formData.status === "Active" ? "btn-success shadow" : "btn-outline-secondary bg-white"
              }`}
            >
              <CheckCircle size={18} className="me-2" /> Active
            </button>

            <button
              type="button"
              onClick={() => updateStatus("Inactive")}
              className={`btn d-flex align-items-center px-4 py-2 rounded-pill shadow-sm transition-all ${
                formData.status === "Inactive" ? "btn-secondary shadow" : "btn-outline-secondary bg-white"
              }`}
            >
              <XCircle size={18} className="me-2" /> Inactive
            </button>

            <button
              type="button"
              onClick={() => updateStatus("Blacklisted")}
              className={`btn d-flex align-items-center px-4 py-2 rounded-pill shadow-sm transition-all ${
                formData.status === "Blacklisted" ? "btn-danger shadow" : "btn-outline-danger bg-white"
              }`}
            >
              <Slash size={18} className="me-2" /> Blacklisted
            </button>
          </div>
          
          {formData.status === "Blacklisted" && (
            <div className="mt-3 alert alert-danger border-0 py-2 small fw-bold animate__animated animate__headShake">
              <Shield size={14} className="me-1"/> CRITICAL: Transactions blocked for this entity.
            </div>
          )}
        </div>
      </div>

      {/* --- ACCESS CONTROL (PRO FIELD) --- */}
      <div className="col-12">
        <div className="p-3 border rounded-4 bg-white d-flex align-items-center justify-content-between shadow-sm">
          <div className="d-flex align-items-center">
            <div className="p-2 bg-soft-info rounded-3 me-3 text-info">
              <Key size={20} />
            </div>
            <div>
              <h6 className="mb-0 fw-bold">Customer Portal Access</h6>
              <small className="text-muted">Allow customer to login to mobile app/web portal</small>
            </div>
          </div>
          <div className="form-check form-switch">
            <input className="form-check-input p-2" type="checkbox" name="hasPortalAccess" 
                   checked={formData.hasPortalAccess} onChange={handleCheckbox} />
          </div>
        </div>
      </div>

      {/* --- STATS CARDS --- */}
      <div className="col-md-6 col-lg-4">
        <div className="p-3 bg-white border rounded-4 shadow-sm h-100 border-start border-primary border-4">
          <p className="text-muted small mb-1 text-uppercase fw-bold">Total Sales (LTV)</p>
          <h4 className="fw-extrabold mb-0 text-primary">₹ {formData.lifetimeValue || "0.00"}</h4>
          <small className="text-success fw-bold">↑ Healthy Growth</small>
        </div>
      </div>

      <div className="col-md-6 col-lg-4">
        <div className="p-3 bg-white border rounded-4 shadow-sm h-100 border-start border-primary border-4">
          <p className="text-muted small mb-1 text-uppercase fw-bold">Last Purchase</p>
          <h4 className="fw-extrabold mb-0 text-primary">₹ {formData.lifetimeValue || "0.00"}</h4>
        </div>
      </div>

      <div className="col-md-6 col-lg-4">
        <div className="p-3 bg-white border rounded-4 shadow-sm h-100 border-start border-warning border-4">
          <p className="text-muted small mb-1 text-uppercase fw-bold">Last Active</p>
          <h5 className="fw-bold mb-0">
            <Clock size={16} className="me-2 text-warning"/> 
            {formData.lastPurchaseDate || "No History"}
          </h5>
          <small className="text-muted small">Via POS Terminal 01</small>
        </div>
      </div>

      {/* --- AUDIT LOG --- */}
      <div className="col-12">
        <div className="p-3 bg-light border border-dashed rounded-4">
          <h6 className="small fw-bold text-muted text-uppercase mb-2"><Info size={14} className="me-1"/> Audit Trail</h6>
          <div className="row small text-muted">
            <div className="col-sm-6">
               <p className="mb-1"><strong>Registered By:</strong> {formData.createdBy || "Admin"}</p>
               <p className="mb-0"><strong>Timestamp:</strong> {formData.createdDate || "18-12-2025"}</p>
            </div>
            <div className="col-sm-6 text-sm-end">
               <p className="mb-1"><strong>Modifier:</strong> {formData.modifiedBy || "Self"}</p>
               <p className="mb-0"><strong>Last Change:</strong> {formData.modifiedDate || "Just now"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemInfo;