import React from "react";
import { Shield, FileText, Hash, CheckCircle, AlertCircle, Bookmark } from "react-feather";

const LegalInfo = ({ formData, handleChange }) => {
  // Custom helper for checkbox handling
  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    handleChange({ target: { name, value: checked } });
  };

  return (
    <div className="row g-4 animate__animated animate__fadeIn">
      {/* --- TAX REGISTRATION STATUS --- */}
      <div className="col-md-6">
        <label className="form-label fw-bold small d-flex align-items-center">
          <Bookmark size={14} className="me-2"/> Tax Registration Type
        </label>
        <select name="taxType" className="form-select shadow-sm fw-semibold" value={formData.taxType} onChange={handleChange}>
          <option value="Regular">GST Regular / B2B</option>
          <option value="Composition">GST Composition</option>
          <option value="Unregistered">Unregistered Business</option>
          <option value="Consumer">Consumer / B2C</option>
          <option value="Overseas">Overseas / Export</option>
        </select>
        <small className="text-muted">Determines tax calculation logic for invoices.</small>
      </div>

      <div className="col-md-6 d-flex align-items-center mt-md-5">
        <div className="p-2 px-3 border border-dashed rounded-3 bg-light w-100">
          <div className="form-check form-switch m-0 d-flex align-items-center justify-content-between">
            <div>
              <label className="form-check-label fw-bold small text-muted" htmlFor="isTaxExempt">Is Tax Exempt? (SEZ/NGO)</label>
              <br/><small className="text-xs text-danger">Zero-rated tax will be applied</small>
            </div>
            <input className="form-check-input p-2" type="checkbox" name="isTaxExempt" id="isTaxExempt"
                   checked={formData.isTaxExempt} onChange={handleCheckbox} />
          </div>
        </div>
      </div>

      {/* --- TAX IDENTIFIERS --- */}
      <div className="col-md-6">
        <label className="form-label fw-bold small">GSTIN / VAT Number</label>
        <div className="input-group shadow-sm border border-danger border-opacity-25 rounded-3 overflow-hidden">
          <span className="input-group-text bg-danger bg-opacity-10 border-0 text-danger"><FileText size={18}/></span>
          <input type="text" name="gstin" className="form-control border-0 text-uppercase fw-bold" 
                 placeholder="e.g. 22AAAAA0000A1Z5" value={formData.gstin} onChange={handleChange} />
        </div>
      </div>

      <div className="col-md-6">
        <label className="form-label fw-bold small">Permanent Account Number (PAN)</label>
        <div className="input-group shadow-sm border rounded-3 overflow-hidden">
          <span className="input-group-text bg-light border-0 text-dark font-monospace fw-bold small">PAN</span>
          <input type="text" name="pan" className="form-control border-0 text-uppercase" 
                 placeholder="ABCDE1234F" value={formData.pan} onChange={handleChange} />
        </div>
      </div>

      {/* --- OTHER LEGAL IDs --- */}
      <div className="col-md-6">
        <label className="form-label fw-bold small d-flex align-items-center">
          <Shield size={16} className="me-2 text-primary"/> National ID / Aadhar / Trade License
        </label>
        <input type="text" name="aadhar" className="form-control shadow-sm" 
               placeholder="Enter Unique ID Number" value={formData.aadhar} onChange={handleChange} />
      </div>

      <div className="col-md-6">
        <label className="form-label fw-bold small d-flex align-items-center">
          <Hash size={16} className="me-2 text-secondary"/> Corporate Identity (CIN) / Registration #
        </label>
        <input type="text" name="cin" className="form-control shadow-sm" 
               placeholder="U12345MH2023PTC123456" value={formData.cin} onChange={handleChange} />
      </div>

      {/* --- PRO FIELD: PLACE OF SUPPLY --- */}
      <div className="col-md-12">
        <div className="p-3 bg-soft-warning rounded-4 border border-warning border-opacity-10 d-flex align-items-center">
          <AlertCircle className="text-warning me-3" size={24} />
          <div className="flex-grow-1">
            <h6 className="mb-0 fw-bold">Place of Supply (State Code)</h6>
            <small className="text-muted">Required for correct SGST/IGST mapping based on GST laws.</small>
          </div>
          <div className="w-25">
            <select name="stateCode" className="form-select form-select-sm fw-bold border-warning border-opacity-25" value={formData.stateCode} onChange={handleChange}>
              <option value="09">09 - Uttar Pradesh</option>
              <option value="07">07 - Delhi</option>
              <option value="27">27 - Maharashtra</option>
              <option value="33">33 - Tamil Nadu</option>
              {/* Add more states as per your country's codes */}
            </select>
          </div>
        </div>
      </div>

      {/* Verification Footer */}
      <div className="col-md-12">
        <div className="alert alert-light border d-flex align-items-center mb-0 mt-2 shadow-sm">
          <CheckCircle className="text-success me-2" size={18} />
          <span className="small text-muted">Legal data is used for tax filings and e-invoicing. Please ensure details match with government records.</span>
        </div>
      </div>
    </div>
  );
};

export default LegalInfo;