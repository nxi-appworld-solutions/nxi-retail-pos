import React from "react";
import {
  Percent,
  FileText,
  Shield,
  AlertCircle,
  CheckCircle,
  Briefcase,
  Layers,
  HelpCircle
} from "react-feather";

const TaxInfo = ({ formData, handleChange }) => {
  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    handleChange({ target: { name, value: checked } });
  };

  return (
    <div className="row g-4 animate__animated animate__fadeIn">
      {/* --- TAX COMPLIANCE HEADER --- */}
      <div className="col-12">
        <div className="p-4 bg-white rounded-4 shadow-sm d-flex align-items-center justify-content-between border-start border-4 border-warning">
          <div className="d-flex align-items-center">
            <div className="p-3 bg-warning bg-opacity-10 rounded-3 me-3 text-warning">
              <Shield size={28} />
            </div>
            <div>
              <h6 className="fw-bold mb-1">Taxation & Compliance</h6>
              <small className="text-muted">GST slabs, HSN codes, and calculation rules</small>
            </div>
          </div>
        </div>
      </div>

      {/* --- CORE TAX SETTINGS --- */}
      <div className="col-md-6">
        <label className="form-label fw-bold small">Tax Category</label>
        <div className="input-group shadow-sm">
          <span className="input-group-text bg-white border-end-0"><Layers size={16} className="text-muted"/></span>
          <select
            name="taxCategory"
            className="form-select border-start-0"
            value={formData.taxCategory || "Taxable"}
            onChange={handleChange}
          >
            <option value="Taxable">Standard Taxable</option>
            <option value="Exempt">Exempted Goods</option>
            <option value="Zero">Zero Rated (Export)</option>
            <option value="Nil">Nil Rated</option>
          </select>
        </div>
      </div>

      <div className="col-md-6">
        <label className="form-label fw-bold small">GST Rate (%)</label>
        <div className="input-group shadow-sm">
          <span className="input-group-text bg-white border-end-0 text-success"><Percent size={16} /></span>
          <select
            name="gstRate"
            className="form-select border-start-0 fw-bold"
            value={formData.gstRate}
            onChange={handleChange}
          >
            <option value="0">GST @ 0%</option>
            <option value="5">GST @ 5%</option>
            <option value="12">GST @ 12%</option>
            <option value="18">GST @ 18%</option>
            <option value="28">GST @ 28%</option>
          </select>
        </div>
      </div>

      {/* --- MISSING FIELD 1: HSN/SAC & CESS --- */}
      <div className="col-md-4">
        <label className="form-label fw-bold small">HSN / SAC Code</label>
        <div className="input-group shadow-sm">
          <span className="input-group-text bg-light border-end-0"><FileText size={16} /></span>
          <input
            type="text"
            name="hsn"
            className="form-control border-start-0 font-monospace"
            placeholder="e.g. 8471"
            value={formData.hsn}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="col-md-4">
        <label className="form-label fw-bold small">Additional CESS (%)</label>
        <input
          type="number"
          name="cess"
          className="form-control shadow-sm"
          placeholder="e.g. 1.5"
          value={formData.cess}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-4">
        <label className="form-label fw-bold small">Supply Type</label>
        <select
          name="supplyType"
          className="form-select shadow-sm"
          value={formData.supplyType || "Goods"}
          onChange={handleChange}
        >
          <option value="Goods">Goods (Inventory)</option>
          <option value="Services">Services (Labor/AMC)</option>
        </select>
      </div>

      {/* --- MISSING FIELD 2: TAX CALCULATION RULES --- */}
      <div className="col-12 mt-4">
        <h6 className="fw-bold text-uppercase small text-muted border-bottom pb-2">Calculation Logic</h6>
      </div>

      <div className="col-md-6">
        <div className="p-3 bg-light border rounded-4 d-flex align-items-center justify-content-between shadow-sm">
          <div>
            <h6 className="mb-0 fw-bold small">Tax Mode</h6>
            <small className="text-muted">Is tax included in Price?</small>
          </div>
          <div className="btn-group shadow-sm">
            <button 
              type="button" 
              className={`btn btn-sm ${formData.taxMode === 'Inclusive' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleChange({ target: { name: 'taxMode', value: 'Inclusive' } })}
            >Inclusive</button>
            <button 
              type="button" 
              className={`btn btn-sm ${formData.taxMode !== 'Inclusive' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleChange({ target: { name: 'taxMode', value: 'Exclusive' } })}
            >Exclusive</button>
          </div>
        </div>
      </div>

      {/* --- ADVANCED COMPLIANCE TOGGLES --- */}
      <div className="col-md-6">
        <div className="p-3 bg-light border rounded-4 d-flex align-items-center justify-content-between shadow-sm">
          <div className="d-flex align-items-center">
            <Shield size={20} className="text-warning me-3" />
            <div>
              <h6 className="mb-0 fw-bold small">POS Override</h6>
              <small className="text-muted">Cashier can edit tax rate</small>
            </div>
          </div>
          <div className="form-check form-switch m-0">
            <input
              type="checkbox"
              name="allowTaxOverride"
              className="form-check-input p-2"
              checked={formData.allowTaxOverride}
              onChange={handleCheckbox}
            />
          </div>
        </div>
      </div>

      <div className="col-12 mt-3">
        <div className={`p-3 rounded-4 border-dashed d-flex align-items-center shadow-sm ${formData.taxCategory === 'Taxable' ? 'bg-soft-success border-success' : 'bg-light'}`}>
          <CheckCircle size={20} className="text-success me-3" />
          <div className="small text-muted">
            {formData.taxCategory === 'Taxable' 
              ? `Note: System will apply ${formData.gstRate}% GST. Intra-state (CGST+SGST) or Inter-state (IGST) will be determined by Warehouse and Customer location.`
              : "Tax configuration is disabled for non-taxable categories."}
          </div>
        </div>
      </div>

    </div>
  );
};

export default TaxInfo;