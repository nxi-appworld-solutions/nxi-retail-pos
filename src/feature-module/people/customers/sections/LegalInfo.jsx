/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Shield, FileText, AlertCircle, CheckCircle } from "react-feather";

const GST_TYPES = {
  REGULAR: "REGULAR",
  COMPOSITION: "COMPOSITION",
  UNREGISTERED: "UNREGISTERED",
};

const STATES = [
  { code: "09", name: "Uttar Pradesh" },
  { code: "07", name: "Delhi" },
  { code: "27", name: "Maharashtra" },
  { code: "33", name: "Tamil Nadu" },
];

const LegalInfo = ({ formData, handleChange }) => {
  const isGSTApplicable = formData.gstType !== GST_TYPES.UNREGISTERED;

  useEffect(() => {
    if (formData.gstType === GST_TYPES.UNREGISTERED) {
      handleChange("gstin", "");
    }
  }, [formData.gstType]);

  return (
    <div className="row g-4 animate__animated animate__fadeIn">
      {/* ---------- GST REGISTRATION ---------- */}
      <div className="col-md-6">
        <label className="form-label fw-bold small d-flex align-items-center">
          <Shield size={16} className="me-2 text-primary" />
          GST Registration Type
        </label>

        <select
          name="gstType"
          className="form-select shadow-sm fw-semibold"
          value={formData.gstType}
          onChange={handleChange}
        >
          <option value={GST_TYPES.REGULAR}>Regular (B2B)</option>
          <option value={GST_TYPES.COMPOSITION}>Composition</option>
          <option value={GST_TYPES.UNREGISTERED}>Unregistered / B2C</option>
        </select>

        <small className="text-muted">
          Determines GST calculation on invoices
        </small>
      </div>

      {/* ---------- GSTIN ---------- */}
      <div className="col-md-6">
        <label className="form-label fw-bold small">GSTIN Number</label>

        <div className="input-group shadow-sm border rounded-3 overflow-hidden">
          <span className="input-group-text bg-light border-0 text-danger">
            <FileText size={16} />
          </span>
          <input
            type="text"
            name="gstin"
            className="form-control border-0 text-uppercase fw-semibold"
            placeholder="22AAAAA0000A1Z5"
            value={formData.gstin}
            onChange={handleChange}
            disabled={!isGSTApplicable}
            maxLength={15}
            inputMode="text"
          />
        </div>

        {!isGSTApplicable && (
          <small className="text-muted">
            GSTIN not required for unregistered customers
          </small>
        )}
      </div>

      {/* ---------- PAN ---------- */}
      <div className="col-md-6">
        <label className="form-label fw-bold small">PAN Number</label>

        <div className="input-group shadow-sm border rounded-3 overflow-hidden">
          <span className="input-group-text bg-light border-0 fw-bold small">
            PAN
          </span>
          <input
            type="text"
            name="pan"
            className="form-control border-0 text-uppercase"
            placeholder="ABCDE1234F"
            value={formData.pan}
            onChange={(e) =>
              handleChange({
                target: { name: "pan", value: e.target.value.toUpperCase() },
              })
            }
          />
        </div>
      </div>

      {/* ---------- PLACE OF SUPPLY ---------- */}
      <div className="col-md-6">
        <label className="form-label fw-bold small d-flex align-items-center">
          <AlertCircle size={16} className="me-2 text-warning" />
          Place of Supply (State)
        </label>

        <select
          name="stateCode"
          className="form-select shadow-sm fw-semibold"
          value={formData.stateCode || formData.billingStateCode || ""}
          onChange={handleChange}
        >
          {STATES.map((s) => (
            <option key={s.code} value={s.code}>
              {s.code} - {s.name}
            </option>
          ))}
        </select>

        <small className="text-muted">
          Used to determine IGST or SGST on billing
        </small>
      </div>

      {/* ---------- COMPLIANCE NOTE ---------- */}
      <div className="col-12">
        <div className="alert alert-light border shadow-sm d-flex align-items-center mb-0">
          <CheckCircle size={18} className="text-success me-2" />
          <span className="small text-muted">
            Legal details are used for GST returns, e-invoicing and compliance.
            Please ensure accuracy.
          </span>
        </div>
      </div>
    </div>
  );
};

export default LegalInfo;
