import { ShieldCheck } from "lucide-react";
import React from "react";
import {
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Percent,
  Truck,
  Globe,
  Settings,
  Gift,
  Lock
} from "react-feather";

const PricingInfo = ({ formData, handleChange }) => {
  // Logic: Margin calculation based on Sale Price and Purchase Price
  const margin =
    formData.salePrice && formData.purchasePrice
      ? (((formData.salePrice - formData.purchasePrice) / formData.salePrice) * 100).toFixed(2)
      : 0;

  const loss = Number(formData.salePrice) < Number(formData.purchasePrice);

  return (
    <div className="row g-4 animate__animated animate__fadeIn">
      {/* --- PROFITABILITY INDICATOR --- */}
      <div className="col-12">
        <div className={`p-4 rounded-4 border-start border-4 shadow-sm d-flex align-items-center justify-content-between ${loss ? 'bg-soft-danger border-danger' : 'bg-soft-success border-success'}`}>
          <div className="d-flex align-items-center">
            <div className={`p-3 rounded-circle me-3 ${loss ? 'bg-danger text-white' : 'bg-success text-white'}`}>
              {loss ? <AlertTriangle size={24} /> : <TrendingUp size={24} />}
            </div>
            <div>
              <h5 className="fw-bold mb-0">
                Gross Margin Analysis: <span className={loss ? 'text-danger' : 'text-success'}>{margin}%</span>
              </h5>
              <small className="text-muted">
                {loss ? "CRITICAL: Selling price is below cost!" : "Healthy margin for this product category."}
              </small>
            </div>
          </div>
          <div className="text-end d-none d-md-block">
             <h6 className="mb-0 fw-bold">₹ {(formData.salePrice - formData.purchasePrice || 0).toFixed(2)}</h6>
             <small className="text-muted">Profit Per Unit</small>
          </div>
        </div>
      </div>

      {/* --- MAIN PRICING FIELDS --- */}
      <div className="col-md-4">
        <label className="form-label fw-bold small">MRP (Maximum Retail Price)</label>
        <div className="input-group shadow-sm">
          <span className="input-group-text bg-light fw-bold small">MRP</span>
          <input type="number" name="mrp" className="form-control fw-bold" value={formData.mrp} onChange={handleChange} />
        </div>
      </div>

      <div className="col-md-4">
        <label className="form-label fw-bold small">Standard Sale Price *</label>
        <div className="input-group shadow-sm border border-primary border-opacity-25 rounded-3">
          <span className="input-group-text text-muted border-0">₹</span>
          <input type="number" name="salePrice" className="form-control fw-bold" value={formData.salePrice} onChange={handleChange} placeholder="0.00" required />
        </div>
      </div>

      <div className="col-md-4">
        <label className="form-label fw-bold small">Purchase Price (Cost)</label>
        <div className="input-group shadow-sm">
          <span className="input-group-text">₹</span>
          <input type="number" name="purchasePrice" className="form-control text-danger fw-bold" value={formData.purchasePrice} placeholder="0.00" onChange={handleChange} />
        </div>
      </div>

      {/* --- DISCOUNT CONTROL SECTION (NEW) --- */}
      <div className="col-12 mt-4">
        <h6 className="fw-bold text-uppercase small text-warning border-bottom pb-2 d-flex align-items-center">
          <Gift size={16} className="me-2"/> Discount & Promotion Rules
        </h6>
      </div>

      <div className="col-md-6">
        <label className="form-label fw-bold small">Default Auto-Discount (%)</label>
        <div className="input-group shadow-sm">
          <span className="input-group-text bg-success-light text-success"><Percent size={14}/></span>
          <input type="number" name="defaultDiscount" className="form-control fw-bold text-success" 
                 placeholder="Applied automatically at POS" value={formData.defaultDiscount} onChange={handleChange} />
        </div>
        <small className="text-muted mt-1 d-block">This % will be deducted automatically from Sale Price.</small>
      </div>

      <div className="col-md-6">
        <label className="form-label fw-bold small">Maximum Allowed Discount (%)</label>
        <div className="input-group shadow-sm">
          <span className="input-group-text bg-danger-light text-danger"><Lock size={14}/></span>
          <input type="number" name="maxDiscount" className="form-control fw-bold text-danger" 
                 placeholder="Cashier limit" value={formData.maxDiscount} onChange={handleChange} />
        </div>
        <small className="text-muted mt-1 d-block">Prevents cashier from giving excess discount.</small>
      </div>

      {/* --- TIERED & ONLINE PRICING --- */}
      <div className="col-12 mt-4">
        <h6 className="fw-bold text-uppercase small text-muted border-bottom pb-2">Multi-Channel & Tier Pricing</h6>
      </div>

      <div className="col-md-3">
        <label className="form-label fw-bold small">Wholesale Price</label>
        <input type="number" name="wholesalePrice" className="form-control shadow-sm" value={formData.wholesalePrice} onChange={handleChange} />
      </div>

      <div className="col-md-3">
        <label className="form-label fw-bold small">VIP Price</label>
        <input type="number" name="vipPrice" className="form-control shadow-sm border-warning border-opacity-25" value={formData.vipPrice} onChange={handleChange} />
      </div>

      <div className="col-md-3">
        <label className="form-label fw-bold small"><Globe size={14} className="me-1"/> Online Price</label>
        <input type="number" name="onlinePrice" className="form-control shadow-sm border-info border-opacity-25" value={formData.onlinePrice} onChange={handleChange} />
      </div>

      <div className="col-md-3">
        <label className="form-label fw-bold small"><Truck size={14} className="me-1"/> Landing Cost</label>
        <input type="number" name="landingCost" className="form-control shadow-sm" placeholder="Incl. Freight" value={formData.landingCost} onChange={handleChange} />
      </div>

      {/* --- SETTINGS & RULES --- */}
      <div className="col-md-6">
        <div className="p-3 bg-light border rounded-4 d-flex justify-content-between align-items-center shadow-sm h-100">
          <div className="d-flex align-items-center">
            <ShieldCheck size={20} className="text-primary me-2" />
            <div>
              <h6 className="mb-0 fw-bold small">MSP Protection</h6>
              <small className="text-muted">Restrict sale below Min. Price</small>
            </div>
          </div>
          <div className="form-check form-switch m-0">
            <input type="checkbox" name="protectMinPrice" className="form-check-input p-2" checked={formData.protectMinPrice} onChange={handleChange} />
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="p-3 bg-light border rounded-4 d-flex justify-content-between align-items-center shadow-sm h-100">
          <div className="d-flex align-items-center">
            <Settings size={20} className="text-secondary me-2" />
            <div>
              <h6 className="mb-0 fw-bold small">Tax Inclusive Price</h6>
              <small className="text-muted">Sale price includes GST</small>
            </div>
          </div>
          <div className="form-check form-switch m-0">
            <input type="checkbox" name="isTaxInclusive" className="form-check-input p-2" checked={formData.isTaxInclusive} onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingInfo;