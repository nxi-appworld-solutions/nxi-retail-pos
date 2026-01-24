import React from "react";
import {
  Percent,
  FileText,
  Shield,
  CheckCircle,
  Layers,
  HelpCircle,
} from "react-feather";

const TaxInfo = ({
  formData,
  handleChange,
  gstList = [],     // from GST Master
  taxControlled = true, // pricing section controls inclusive/exclusive
}) => {
  const isTaxable = formData.taxCategory === "Taxable";

  const handleBool = (e) => {
    handleChange({
      target: { name: e.target.name, value: e.target.checked },
    });
  };

  return (
    <div className="row g-4 animate__animated animate__fadeIn">

      {/* ================================================= */}
      {/* TAX HEADER                                       */}
      {/* ================================================= */}
      <div className="col-12">
        <div className="p-4 bg-white rounded-4 shadow-sm border-start border-4 border-warning">
          <div className="d-flex align-items-center">
            <div className="p-3 bg-warning bg-opacity-10 rounded-3 me-3">
              <Shield size={26} className="text-warning" />
            </div>
            <div>
              <h6 className="fw-bold mb-1">Tax & Compliance</h6>
              <small className="text-muted">
                GST, HSN/SAC and tax calculation rules
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* TAX CLASSIFICATION                               */}
      {/* ================================================= */}
      <div className="col-md-6">
        <label className="form-label fw-bold small">
          Tax Category
        </label>
        <select
          name="taxCategory"
          className="form-select shadow-sm"
          value={formData.taxCategory}
          onChange={handleChange}
        >
          <option value="Taxable">Taxable (GST Applicable)</option>
          <option value="Exempt">Exempted</option>
          <option value="Nil">Nil Rated</option>
          <option value="Zero">Zero Rated (Export)</option>
        </select>
        <small className="text-muted">
          Determines whether GST will be applied
        </small>
      </div>

      <div className="col-md-6">
        <label className="form-label fw-bold small">
          GST Slab
        </label>
        <select
          name="gstId"
          className="form-select shadow-sm fw-bold"
          value={formData.gstId || ""}
          onChange={handleChange}
          disabled={!isTaxable}
        >
          <option value="">Select GST slab</option>
          {gstList.map((g) => (
            <option key={g.id} value={g.id}>
              {g.gstName} ({g.gstPercent}%)
            </option>
          ))}
        </select>
        <small className="text-muted">
          {isTaxable
            ? "GST applied during billing"
            : "GST not applicable for this category"}
        </small>
      </div>

      {/* ================================================= */}
      {/* HSN / SAC & SUPPLY                               */}
      {/* ================================================= */}
      <div className="col-md-4">
        <label className="form-label fw-bold small">
          HSN / SAC Code
        </label>
        <input
          type="text"
          name="hsn"
          className="form-control shadow-sm font-monospace"
          placeholder="e.g. 8471 / 9983"
          value={formData.hsn}
          onChange={handleChange}
          disabled={!isTaxable}
        />
        <small className="text-muted">
          Mandatory for taxable items
        </small>
      </div>

      <div className="col-md-4">
        <label className="form-label fw-bold small">
          Additional CESS (%)
        </label>
        <input
          type="number"
          min="0"
          name="cess"
          className="form-control shadow-sm"
          placeholder="e.g. 1.5"
          value={formData.cess}
          onChange={handleChange}
          disabled={!isTaxable}
        />
        <small className="text-muted">
          Applicable only for specific goods
        </small>
      </div>

      <div className="col-md-4">
        <label className="form-label fw-bold small">
          Supply Type
        </label>
        <select
          name="supplyType"
          className="form-select shadow-sm"
          value={formData.supplyType}
          onChange={handleChange}
        >
          <option value="Goods">Goods</option>
          <option value="Services">Services</option>
        </select>
      </div>

      {/* ================================================= */}
      {/* TAX MODE                                         */}
      {/* ================================================= */}
      <div className="col-md-6 mt-3">
        <div className="p-3 bg-light border rounded-4 d-flex justify-content-between align-items-center shadow-sm">
          <div>
            <h6 className="fw-bold small mb-0">
              Tax Mode
            </h6>
            <small className="text-muted">
              Inclusive or Exclusive pricing
            </small>
          </div>
          <div className="btn-group">
            <button
              type="button"
              className={`btn btn-sm ${
                formData.taxMode === "Inclusive"
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              disabled={taxControlled}
              onClick={() =>
                handleChange({
                  target: {
                    name: "taxMode",
                    value: "Inclusive",
                  },
                })
              }
            >
              Inclusive
            </button>
            <button
              type="button"
              className={`btn btn-sm ${
                formData.taxMode === "Exclusive"
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              disabled={taxControlled}
              onClick={() =>
                handleChange({
                  target: {
                    name: "taxMode",
                    value: "Exclusive",
                  },
                })
              }
            >
              Exclusive
            </button>
          </div>
        </div>
        {taxControlled && (
          <small className="text-muted d-block mt-1">
            Controlled from Pricing section
          </small>
        )}
      </div>

      {/* ================================================= */}
      {/* ADVANCED CONTROL                                 */}
      {/* ================================================= */}
      <div className="col-md-6 mt-3">
        <div className="p-3 bg-light border rounded-4 d-flex justify-content-between align-items-center shadow-sm">
          <div className="d-flex align-items-center">
            <Shield size={18} className="text-warning me-2" />
            <div>
              <h6 className="fw-bold small mb-0">
                Allow POS Tax Override
              </h6>
              <small className="text-muted">
                Restrict for compliance safety
              </small>
            </div>
          </div>
          <input
            type="checkbox"
            name="allowTaxOverride"
            className="form-check-input"
            checked={formData.allowTaxOverride}
            onChange={handleBool}
          />
        </div>
      </div>

      {/* ================================================= */}
      {/* SYSTEM NOTE                                      */}
      {/* ================================================= */}
      <div className="col-12 mt-2">
        <div
          className={`p-3 rounded-4 border ${
            isTaxable
              ? "bg-soft-success border-success"
              : "bg-light"
          }`}
        >
          <CheckCircle
            size={18}
            className="text-success me-2"
          />
          <span className="small text-muted">
            {isTaxable
              ? "GST will be calculated automatically based on customer & warehouse location (CGST/SGST or IGST)."
              : "Tax calculation is disabled for this product."}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaxInfo;
