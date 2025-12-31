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
  ExternalLink
} from "react-feather";

const SupplierInfo = ({ formData, handleChange }) => {
  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    handleChange({ target: { name, value: checked } });
  };

  return (
    <div className="row g-4 animate__animated animate__fadeIn">
      {/* --- STRATEGIC SOURCING HEADER --- */}
      <div className="col-12">
        <div className="p-4 bg-white rounded-4 shadow-sm d-flex align-items-center justify-content-between border-start border-4 border-primary">
          <div className="d-flex align-items-center">
            <div className="p-3 bg-primary bg-opacity-10 rounded-3 me-3 text-primary">
              <Truck size={28} />
            </div>
            <div>
              <h6 className="fw-bold mb-1">Procurement & Sourcing Strategy</h6>
              <small className="text-muted">Manage primary vendors, purchase terms, and supply reliability</small>
            </div>
          </div>
          <button className="btn btn-sm btn-soft-primary d-none d-md-block">
             <ExternalLink size={14} className="me-1"/> View Supplier Ledger
          </button>
        </div>
      </div>

      {/* --- PREFERRED SUPPLIER & CONTRACTS --- */}
      <div className="col-md-6">
        <label className="form-label fw-bold small">Primary Preferred Supplier</label>
        <div className="input-group shadow-sm">
          <span className="input-group-text bg-white border-end-0"><Briefcase size={16} className="text-muted"/></span>
          <select
            name="preferredSupplier"
            className="form-select border-start-0"
            value={formData.preferredSupplier}
            onChange={handleChange}
          >
            <option value="">-- Select Registered Vendor --</option>
            <option value="Supplier-A">Global Trading Co.</option>
            <option value="Supplier-B">Modern Infotech Pvt Ltd</option>
            <option value="Local-Vendor">Local Wholesale Market</option>
          </select>
        </div>
      </div>

      <div className="col-md-6">
        <label className="form-label fw-bold small">Supplier Item Ref / SKU</label>
        <div className="input-group shadow-sm">
          <span className="input-group-text bg-light border-end-0"><Hash size={16} /></span>
          <input
            type="text"
            name="supplierSku"
            className="form-control border-start-0 font-monospace"
            placeholder="Vendor's internal code"
            value={formData.supplierSku}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* --- FINANCIAL TERMS --- */}
      <div className="col-md-4">
        <label className="form-label fw-bold small">Standard Purchase Cost</label>
        <div className="input-group shadow-sm">
          <span className="input-group-text bg-danger bg-opacity-10 text-danger">₹</span>
          <input
            type="number"
            name="lastPurchaseRate"
            className="form-control fw-bold text-danger"
            placeholder="0.00"
            value={formData.lastPurchaseRate}
            onChange={handleChange}
          />
        </div>
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
      </div>

      <div className="col-md-4">
        <label className="form-label fw-bold small">Purchase UOM</label>
        <select
          name="purchaseUnit"
          className="form-select shadow-sm bg-light"
          value={formData.purchaseUnit || "PCS"}
          onChange={handleChange}
        >
          <option value="PCS">Pieces (Pcs)</option>
          <option value="BOX">Box / Carton</option>
          <option value="KG">Kilogram (Kg)</option>
        </select>
      </div>

      {/* --- LOGISTICS & REPLENISHMENT --- */}
      <div className="col-12 mt-4">
        <h6 className="fw-bold text-uppercase small text-muted border-bottom pb-2">Logistics & Lead Management</h6>
      </div>

      <div className="col-md-6">
        <label className="form-label fw-bold small d-flex align-items-center">
          <Clock size={14} className="me-2 text-warning" /> 
          Expected Lead Time (Days)
        </label>
        <input
          type="number"
          name="leadTime"
          className="form-control shadow-sm"
          placeholder="Days to deliver after PO"
          value={formData.leadTime}
          onChange={handleChange}
        />
        <small className="text-muted">Used for auto-replenishment calculations.</small>
      </div>

      <div className="col-md-6">
        <label className="form-label fw-bold small d-flex align-items-center">
          <TrendingUp size={14} className="me-2 text-success" /> 
          Minimum Order Quantity (MOQ)
        </label>
        <input
          type="number"
          name="minOrderQty"
          className="form-control shadow-sm"
          placeholder="Min qty to order from vendor"
          value={formData.minOrderQty}
          onChange={handleChange}
        />
      </div>

      {/* --- AUTOMATION & PROTECTION --- */}
      <div className="col-md-12">
        <div className="p-3 bg-soft-success border border-success border-opacity-10 rounded-4 d-flex align-items-center justify-content-between shadow-sm">
          <div className="d-flex align-items-center">
            <div className="p-2 bg-white rounded-3 shadow-sm me-3">
               <Repeat size={20} className="text-success" />
            </div>
            <div>
              <h6 className="mb-0 fw-bold">Smart Auto-Procurement Suggestion</h6>
              <small className="text-muted">Auto-generate Draft PO when stock hits reorder level</small>
            </div>
          </div>
          <div className="form-check form-switch m-0">
            <input
              type="checkbox"
              name="autoPurchase"
              className="form-check-input p-2 cursor-pointer"
              checked={formData.autoPurchase}
              onChange={handleCheckbox}
            />
          </div>
        </div>
      </div>

      <div className="col-md-12">
        <div className="p-3 bg-light border rounded-4 d-flex align-items-center">
           <Shield size={18} className="text-muted me-2" />
           <span className="small text-muted">
             <strong>Warranty Clause:</strong> Standard manufacturer warranty applies to purchases from this vendor.
           </span>
        </div>
      </div>
    </div>
  );
};

export default SupplierInfo;