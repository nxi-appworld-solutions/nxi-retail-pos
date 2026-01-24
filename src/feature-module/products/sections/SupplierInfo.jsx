import React from "react";
import {
  Truck,
  DollarSign,
  Clock,
  Hash,
  TrendingUp,
  Repeat,
  Shield,
  Briefcase,
  ExternalLink,
} from "react-feather";

const SupplierInfo = ({
  formData,
  handleChange,
  suppliers = [],
  units = [],
}) => {
  const onBoolChange = (e) => {
    handleChange({
      target: { name: e.target.name, value: e.target.checked },
    });
  };

  return (
    <div className="row g-4 animate__animated animate__fadeIn">
      <div className="col-12">
        <div className="p-4 bg-white rounded-4 shadow-sm border-start border-4 border-primary d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div className="p-3 bg-primary bg-opacity-10 rounded-3 me-3">
              <Truck size={26} className="text-primary" />
            </div>
            <div>
              <h6 className="fw-bold mb-1">Supplier & Procurement</h6>
              <small className="text-muted">
                Vendor selection, purchase terms and replenishment rules
              </small>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-sm btn-outline-primary d-none d-md-flex align-items-center"
          >
            <ExternalLink size={14} className="me-1" />
            Supplier Ledger
          </button>
        </div>
      </div>

      <div className="col-md-6">
        <label className="form-label fw-bold small">Preferred Supplier</label>
        <div className="input-group shadow-sm">
          <select
            name="preferredSupplier"
            className="form-select"
            value={formData.preferredSupplier}
            onChange={handleChange}
          >
            <option value="">Select supplier</option>
            {suppliers.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <small className="text-muted">Default vendor for purchase orders</small>
      </div>

      <div className="col-md-6">
        <label className="form-label fw-bold small">
          Supplier Item Code / SKU
        </label>
        <div className="input-group shadow-sm">
          <input
            type="text"
            name="supplierSku"
            className="form-control font-monospace"
            placeholder="e.g. SUP-SKU-1023"
            value={formData.supplierSku}
            onChange={handleChange}
          />
        </div>
        <small className="text-muted">Vendor’s internal reference code</small>
      </div>
      <div className="col-md-4">
        <label className="form-label fw-bold small">
          Standard Purchase Cost
        </label>
        <div className="input-group shadow-sm">
          <input
            type="number"
            min="0"
            name="lastPurchaseRate"
            className="form-control fw-bold"
            placeholder="e.g. 720.00"
            value={formData.lastPurchaseRate}
            onChange={handleChange}
          />
        </div>
        <small className="text-muted">
          Typical buying cost from this supplier
        </small>
      </div>

      <div className="col-md-4">
        <label className="form-label fw-bold small">Purchase Tax Type</label>
        <select
          name="purchaseTaxType"
          className="form-select shadow-sm"
          value={formData.purchaseTaxType || "Exclusive"}
          onChange={handleChange}
        >
          <option value="Exclusive">Tax Exclusive</option>
          <option value="Inclusive">Tax Inclusive</option>
        </select>
        <small className="text-muted">
          How tax appears on supplier invoice
        </small>
      </div>

      <div className="col-md-4">
        <label className="form-label fw-bold small">Purchase Unit</label>
        <select
          name="purchaseUnit"
          className="form-select shadow-sm"
          value={formData.purchaseUnit}
          onChange={handleChange}
        >
          <option value="">Select unit</option>
          {units.map((u) => (
            <option key={u.code} value={u.code}>
              {u.name}
            </option>
          ))}
        </select>
        <small className="text-muted">
          Unit used while purchasing from vendor
        </small>
      </div>

      {/* ================================================= */}
      {/* LOGISTICS & LEAD                                 */}
      {/* ================================================= */}
      <div className="col-12 mt-3">
        <h6 className="fw-bold small text-muted border-bottom pb-2">
          Logistics & Lead Time
        </h6>
      </div>

      <div className="col-md-6">
        <label className="form-label fw-bold small d-flex align-items-center">
          <Clock size={14} className="me-2 text-warning" />
          Expected Lead Time (Days)
        </label>
        <input
          type="number"
          min="0"
          name="leadTime"
          className="form-control shadow-sm"
          placeholder="e.g. 5 days"
          value={formData.leadTime}
          onChange={handleChange}
        />
        <small className="text-muted">Time taken after PO approval</small>
      </div>

      <div className="col-md-6">
        <label className="form-label fw-bold small d-flex align-items-center">
          <TrendingUp size={14} className="me-2 text-success" />
          Minimum Order Quantity (MOQ)
        </label>
        <input
          type="number"
          min="0"
          name="minOrderQty"
          className="form-control shadow-sm"
          placeholder="e.g. 50 units"
          value={formData.minOrderQty}
          onChange={handleChange}
        />
        <small className="text-muted">Minimum quantity supplier accepts</small>
      </div>

      {/* ================================================= */}
      {/* AUTOMATION                                       */}
      {/* ================================================= */}
      <div className="col-12">
        <div className="p-3 bg-soft-success border border-success border-opacity-10 rounded-4 d-flex justify-content-between align-items-center shadow-sm">
          <div className="d-flex align-items-center">
            <div className="p-2 bg-white rounded-3 shadow-sm me-3">
              <Repeat size={18} className="text-success" />
            </div>
            <div>
              <h6 className="fw-bold mb-0 small">Auto Purchase Suggestion</h6>
              <small className="text-muted">
                Draft PO when stock hits reorder level
              </small>
            </div>
          </div>
          <input
            type="checkbox"
            name="autoPurchase"
            className="form-check-input"
            checked={formData.autoPurchase}
            onChange={onBoolChange}
          />
        </div>
      </div>

      {/* ================================================= */}
      {/* WARRANTY / NOTE                                  */}
      {/* ================================================= */}
      <div className="col-12">
        <div className="p-3 bg-light border rounded-4 d-flex align-items-center">
          <Shield size={16} className="text-muted me-2" />
          <span className="small text-muted">
            Manufacturer warranty & supplier terms apply as per agreement.
          </span>
        </div>
      </div>
    </div>
  );
};

export default SupplierInfo;
