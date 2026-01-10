import React from "react";
import {
  Database,
  AlertTriangle,
  Package,
  Repeat,
  ShieldOff,
  MapPin,
  Truck,
  Archive,
  Layers,
  Cpu,
  Slash,
  TrendingUp
} from "react-feather";

const InventoryInfo = ({ formData, handleChange }) => {
  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    handleChange({ target: { name, value: checked } });
  };

  const handleModeChange = (mode) => {
    handleChange({ target: { name: "stockTracking", value: mode } });
  };

  return (
    <div className="row g-4 animate__animated animate__fadeIn">
      {/* --- INVENTORY COMMAND CENTER --- */}
      <div className="col-12">
        <div className="p-4 bg-white rounded-4 shadow-sm d-flex align-items-center justify-content-between border-start border-4 border-info">
          <div className="d-flex align-items-center">
            <div className="p-3 bg-info bg-opacity-10 rounded-3 me-3 text-info">
              <Database size={28} />
            </div>
            <div>
              <h6 className="fw-bold mb-1">Advanced Stock Intelligence</h6>
              <small className="text-muted">Manage tracking modes, storage bins, and replenishment rules</small>
            </div>
          </div>
          <div className="text-end d-none d-md-block">
             <span className="badge bg-soft-info text-info px-3 py-2 rounded-pill fw-bold">Method: FIFO</span>
          </div>
        </div>
      </div>

      {/* --- MISSING FIELD 1: STOCK TRACKING MODE (VISUAL SELECTION) --- */}
      <div className="col-12">
        <label className="form-label fw-bold small text-muted mb-3 text-uppercase ls-1">Tracking Intelligence *</label>
        <div className="row g-3">
          {[
            { id: 'None', label: 'Simple Stock', icon: <Slash />, desc: 'Count only' },
            { id: 'Batch', label: 'Batch/Lot', icon: <Layers />, desc: 'Expiry & Manufacturing' },
            { id: 'Serial', label: 'Unique Serial', icon: <Cpu />, desc: 'IMEI & Electronics' }
          ].map((mode) => (
            <div className="col-md-4" key={mode.id}>
              <div 
                onClick={() => handleModeChange(mode.id)}
                className={`p-3 rounded-4 border-2 cursor-pointer transition-all h-100 ${
                  formData.stockTracking === mode.id 
                  ? "border-primary bg-primary bg-opacity-10 shadow-sm" 
                  : "border-light bg-light bg-opacity-50"
                }`}
              >
                <div className={`mb-2 ${formData.stockTracking === mode.id ? 'text-primary' : 'text-muted'}`}>
                  {React.cloneElement(mode.icon, { size: 22 })}
                </div>
                <h6 className="fw-bold mb-1 small">{mode.label}</h6>
                <p className="mb-0 text-muted" style={{ fontSize: '11px' }}>{mode.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- STOCK QUANTITIES --- */}
      <div className="col-md-4">
        <label className="form-label fw-bold small">Opening Quantity</label>
        <div className="input-group shadow-sm border rounded-3 overflow-hidden">
          <span className="input-group-text bg-white border-0"><Package size={16} className="text-muted"/></span>
          <input type="number" name="openingStock" className="form-control border-0 fw-bold" 
                 value={formData.openingStock} onChange={handleChange} />
        </div>
      </div>

      <div className="col-md-4">
        <label className="form-label fw-bold small">Current On-Hand</label>
        <div className="input-group shadow-sm border rounded-3 overflow-hidden">
          <span className="input-group-text bg-light border-0"><Archive size={16} className="text-info"/></span>
          <input type="number" className="form-control border-0 bg-light fw-bold text-info shadow-none" 
                 value={formData.currentStock || formData.openingStock || 0} disabled />
        </div>
      </div>

      <div className="col-md-4">
        <label className="form-label fw-bold small text-danger">Reorder Threshold (Safety)</label>
        <div className="input-group shadow-sm border border-danger border-opacity-25 rounded-3 overflow-hidden">
          <span className="input-group-text bg-danger text-white border-0"><AlertTriangle size={16} /></span>
          <input type="number" name="reorderLevel" className="form-control border-0 fw-bold text-danger shadow-none" 
                 value={formData.reorderLevel} onChange={handleChange} />
        </div>
      </div>

      {/* --- MISSING FIELD 2: STORAGE DEPTH (WAREHOUSING) --- */}
      <div className="col-12 mt-4">
        <h6 className="fw-bold text-uppercase small text-muted border-bottom pb-2">Warehousing & Storage Location</h6>
      </div>

      <div className="col-md-4">
        <label className="form-label fw-bold small">Primary Store/Warehouse</label>
        <select name="warehouse" className="form-select shadow-sm border-0 bg-light" value={formData.warehouse} onChange={handleChange}>
          <option value="Main">Main Showroom</option>
          <option value="Warehouse-A">Central Godown (Zone A)</option>
          <option value="Cold-Storage">Cold Storage Unit</option>
        </select>
      </div>

      <div className="col-md-4">
        <label className="form-label fw-bold small"><MapPin size={14} className="me-1"/> Rack / Bin Number</label>
        <input type="text" name="rackLocation" className="form-control shadow-sm" 
               placeholder="e.g. Rack-05 / Shelf-B" value={formData.rackLocation} onChange={handleChange} />
      </div>

      <div className="col-md-4">
        <label className="form-label fw-bold small">Inventory Valuation</label>
        <select name="valuationMethod" className="form-select shadow-sm bg-light border-0" value={formData.valuationMethod} onChange={handleChange}>
          <option value="FIFO">First In, First Out (FIFO)</option>
          <option value="Average">Weighted Average</option>
          <option value="LIFO">Last In, First Out (LIFO)</option>
        </select>
      </div>

      {/* --- MISSING FIELD 3: EXPIRY & AUTOMATION --- */}
      <div className="col-md-6 mt-4">
        <div className="p-3 bg-light border border-dashed rounded-4 d-flex align-items-center justify-content-between shadow-sm h-100">
          <div className="d-flex align-items-center">
            <div className="p-2 bg-white rounded-3 shadow-sm me-3">
              <TrendingUp size={18} className="text-warning" />
            </div>
            <div>
              <h6 className="mb-0 fw-bold small text-dark">Expiry Tracking</h6>
              <small className="text-muted">Required for FMCG/Medicine</small>
            </div>
          </div>
          <div className="form-check form-switch m-0">
            <input className="form-check-input p-2 cursor-pointer" type="checkbox" name="expiryTracking" 
                   checked={formData.expiryTracking === "Yes"} 
                   onChange={(e) => handleChange({ target: { name: 'expiryTracking', value: e.target.checked ? "Yes" : "No" } })} />
          </div>
        </div>
      </div>

      {/* REORDER AUTOMATION */}
      <div className="col-md-6 mt-4">
        <div className="p-3 bg-soft-primary border border-primary border-opacity-10 rounded-4 d-flex align-items-center justify-content-between shadow-sm h-100">
          <div className="d-flex align-items-center">
            <div className="p-2 bg-white rounded-3 shadow-sm me-3">
               <Truck size={18} className="text-primary" />
            </div>
            <div>
              <h6 className="mb-0 fw-bold small text-dark">Auto-PO Suggestion</h6>
              <small className="text-muted">Generate PO at reorder level</small>
            </div>
          </div>
          <div className="form-check form-switch m-0">
            <input className="form-check-input p-2 cursor-pointer" type="checkbox" name="autoReorder" 
                   checked={formData.autoReorder} onChange={handleCheckbox} />
          </div>
        </div>
      </div>

      {/* NEGATIVE STOCK PROTECTION */}
      <div className="col-12">
        <div className="p-3 bg-soft-danger border border-danger border-opacity-10 rounded-4 d-flex align-items-center justify-content-between shadow-sm">
          <div className="d-flex align-items-center">
            <div className="p-2 bg-white rounded-3 shadow-sm me-3">
               <ShieldOff size={18} className="text-danger" />
            </div>
            <div>
              <h6 className="mb-0 fw-bold small text-dark">Negative Stock Control</h6>
              <small className="text-muted">Restrict billing if item is out of stock</small>
            </div>
          </div>
          <div className="form-check form-switch m-0">
            <input className="form-check-input p-2 cursor-pointer" type="checkbox" name="allowNegativeStock" 
                   checked={formData.allowNegativeStock} onChange={handleCheckbox} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryInfo;