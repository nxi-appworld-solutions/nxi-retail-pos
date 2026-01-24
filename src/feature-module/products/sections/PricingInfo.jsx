import React from "react";
import {
  TrendingUp,
  AlertTriangle,
  Globe,
  Truck,
  Settings,
  Gift,
} from "react-feather";
import { ShieldCheck } from "lucide-react";

const num = (v) => (isNaN(Number(v)) ? 0 : Number(v));

const PricingInfo = ({ formData, handleChange, taxControlled = true }) => {
  const sale = num(formData.salePrice);
  const cost = num(formData.purchasePrice);

  const profit = sale - cost;
  const margin = cost > 0 ? ((profit / cost) * 100).toFixed(2) : 0;
  const isLoss = sale > 0 && sale < cost;

  return (
    <div className="row g-4 animate__animated animate__fadeIn">
      {/* ================= PROFIT SUMMARY ================= */}
      <div className="col-12">
        <div
          className={`p-4 rounded-4 border-start border-4 shadow-sm d-flex justify-content-between align-items-center ${
            isLoss
              ? "bg-soft-danger border-danger"
              : "bg-soft-success border-success"
          }`}
        >
          <div className="d-flex align-items-center">
            <div
              className={`p-3 rounded-circle me-3 ${
                isLoss ? "bg-danger text-white" : "bg-success text-white"
              }`}
            >
              {isLoss ? <AlertTriangle size={22} /> : <TrendingUp size={22} />}
            </div>
            <div>
              <h5 className="fw-bold mb-0">
                Profit Margin:{" "}
                <span className={isLoss ? "text-danger" : "text-success"}>
                  {margin}%
                </span>
              </h5>
              <small className="text-muted">
                {isLoss
                  ? "Warning: Selling price is lower than buying price"
                  : "Good profit on each sale"}
              </small>
            </div>
          </div>

          <div className="text-end d-none d-md-block">
            <h6 className="mb-0 fw-bold">₹ {profit.toFixed(2)}</h6>
            <small className="text-muted">Profit per item</small>
          </div>
        </div>
      </div>

      {/* ================= BASIC PRICES ================= */}
      <div className="col-md-4">
        <label className="form-label fw-bold small">MRP (Printed Price)</label>
        <input
          type="number"
          min="0"
          name="mrp"
          className="form-control shadow-sm"
          placeholder="Price printed on product (optional)"
          value={formData.mrp}
          onChange={handleChange}
        />
        <small className="text-muted">Customer may see this price on box</small>
      </div>

      <div className="col-md-4">
        <label className="form-label fw-bold small">
          Sale Price <span className="text-danger">*</span>
        </label>
        <input
          type="number"
          min="0"
          name="salePrice"
          className="form-control shadow-sm fw-bold"
          placeholder="Final billing price at counter"
          value={formData.salePrice}
          onChange={handleChange}
        />
        <small className="text-muted">
          This price will be used during billing
        </small>
      </div>

      <div className="col-md-4">
        <label className="form-label fw-bold small">Buying Price (Cost)</label>
        <input
          type="number"
          min="0"
          name="purchasePrice"
          className="form-control shadow-sm fw-bold text-danger"
          placeholder="How much you pay to supplier"
          value={formData.purchasePrice}
          onChange={handleChange}
        />
        <small className="text-muted">
          Used to calculate profit automatically
        </small>
      </div>

      {/* ================= DISCOUNTS ================= */}
      <div className="col-12 mt-3">
        <h6 className="fw-bold small text-warning border-bottom pb-2 d-flex align-items-center">
          <Gift size={14} className="me-2" />
          Discount Rules
        </h6>
      </div>

      <div className="col-md-6">
        <label className="form-label fw-bold small">Default Discount (%)</label>
        <input
          type="number"
          min="0"
          max="100"
          name="defaultDiscount"
          className="form-control shadow-sm text-success fw-bold"
          placeholder="Discount auto-applied at billing"
          value={formData.defaultDiscount}
          onChange={handleChange}
        />
        <small className="text-muted">Automatically applied during sale</small>
      </div>

      <div className="col-md-6">
        <label className="form-label fw-bold small">
          Maximum Discount Allowed (%)
        </label>
        <input
          type="number"
          min="0"
          max="100"
          name="maxDiscount"
          className="form-control shadow-sm text-danger fw-bold"
          placeholder="Cashier cannot exceed this"
          value={formData.maxDiscount}
          onChange={handleChange}
        />
        <small className="text-muted">
          Protects against heavy discount misuse
        </small>
      </div>

      {/* ================= CHANNEL PRICING ================= */}
      <div className="col-12 mt-3">
        <h6 className="fw-bold small text-muted border-bottom pb-2">
          Different Prices for Different Customers
        </h6>
      </div>

      <div className="col-md-3">
        <label className="form-label fw-bold small">Wholesale Price</label>
        <input
          type="number"
          min="0"
          name="wholesalePrice"
          className="form-control shadow-sm"
          placeholder="For bulk buyers"
          value={formData.wholesalePrice}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-3">
        <label className="form-label fw-bold small">
          VIP / Special Customer Price
        </label>
        <input
          type="number"
          min="0"
          name="vipPrice"
          className="form-control shadow-sm border-warning"
          placeholder="Special trusted customers"
          value={formData.vipPrice}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-3">
        <label className="form-label fw-bold small">
          <Globe size={13} className="me-1" />
          Online Selling Price
        </label>
        <input
          type="number"
          min="0"
          name="onlinePrice"
          className="form-control shadow-sm border-info"
          placeholder="Website / app price"
          value={formData.onlinePrice}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-3">
        <label className="form-label fw-bold small">
          <Truck size={13} className="me-1" />
          Extra Cost (Transport etc.)
        </label>
        <input
          type="number"
          min="0"
          name="landingCost"
          className="form-control shadow-sm"
          placeholder="Loading, transport, packing"
          value={formData.landingCost}
          onChange={handleChange}
        />
      </div>

      {/* ================= SAFETY CONTROLS ================= */}
      <div className="col-md-6">
        <div className="p-3 bg-light rounded-4 border d-flex justify-content-between align-items-center h-100">
          <div className="d-flex align-items-center">
            <ShieldCheck size={18} className="text-primary me-2" />
            <div>
              <h6 className="mb-0 fw-bold small">Prevent Loss Selling</h6>
              <small className="text-muted">
                Block billing below buying price
              </small>
            </div>
          </div>
          <input
            type="checkbox"
            name="protectMinPrice"
            className="form-check-input"
            checked={formData.protectMinPrice}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="col-md-6">
        <div className="p-3 bg-light rounded-4 border d-flex justify-content-between align-items-center h-100">
          <div className="d-flex align-items-center">
            <Settings size={18} className="text-secondary me-2" />
            <div>
              <h6 className="mb-0 fw-bold small">Price Includes GST</h6>
              <small className="text-muted">Controlled from GST settings</small>
            </div>
          </div>
          <input
            type="checkbox"
            disabled={taxControlled}
            checked={formData.isTaxInclusive}
            className="form-check-input"
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default PricingInfo;
