/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import {
  Database,
  AlertTriangle,
  Package,
  ShieldOff,
  MapPin,
  Truck,
  Archive,
  Layers,
  Cpu,
  Slash,
  TrendingUp,
} from "react-feather";

const InventoryInfo = ({
  formData,
  handleChange,
  warehouses = [],
}) => {
  /* ================= DERIVED MODES ================= */
  const isSimple = formData.stockTracking === "None";
  const isBatch = formData.stockTracking === "Batch";
  const isSerial = formData.stockTracking === "Serial";

  /* ================= HELPERS ================= */
  const onBoolChange = (e) => {
    handleChange({
      target: { name: e.target.name, value: e.target.checked },
    });
  };

  const setTracking = (mode) => {
    handleChange({
      target: { name: "stockTracking", value: mode },
    });
  };

  /* ================= AUTO CORRECTIONS ================= */
  useEffect(() => {
    if (isBatch) {
      handleChange({
        target: { name: "expiryTracking", value: true },
      });
    }

    if (isSerial) {
      handleChange({
        target: { name: "expiryTracking", value: false },
      });
    }
  }, [formData.stockTracking]);

  return (
    <div className="row g-4 animate__animated animate__fadeIn">

      {/* ================================================= */}
      {/* INVENTORY HEADER                                 */}
      {/* ================================================= */}
      <div className="col-12">
        <div className="p-4 bg-white rounded-4 shadow-sm border-start border-4 border-info">
          <div className="d-flex align-items-center">
            <div className="p-3 bg-info bg-opacity-10 rounded-3 me-3">
              <Database size={26} className="text-info" />
            </div>
            <div>
              <h6 className="fw-bold mb-1">Inventory Management</h6>
              <small className="text-muted">
                Configure how stock is tracked, stored and controlled
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* STOCK TRACKING MODE                               */}
      {/* ================================================= */}
      <div className="col-12">
        <label className="form-label fw-bold small text-uppercase text-muted mb-2">
          Stock Tracking Method <span className="text-danger">*</span>
        </label>

        <div className="row g-3">
          {[
            {
              id: "None",
              icon: <Slash />,
              title: "Simple Quantity",
              desc: "Only total quantity (garments, grocery)",
            },
            {
              id: "Batch",
              icon: <Layers />,
              title: "Batch / Lot",
              desc: "Expiry & manufacturing date (FMCG, medicine)",
            },
            {
              id: "Serial",
              icon: <Cpu />,
              title: "Serial Number",
              desc: "Unique items (IMEI, electronics)",
            },
          ].map((m) => (
            <div className="col-md-4" key={m.id}>
              <div
                onClick={() => setTracking(m.id)}
                className={`p-3 rounded-4 h-100 cursor-pointer border transition-all ${
                  formData.stockTracking === m.id
                    ? "border-primary bg-primary bg-opacity-10"
                    : "bg-light border-light"
                }`}
              >
                <div
                  className={`mb-2 ${
                    formData.stockTracking === m.id
                      ? "text-primary"
                      : "text-muted"
                  }`}
                >
                  {React.cloneElement(m.icon, { size: 22 })}
                </div>
                <h6 className="fw-bold small mb-1">{m.title}</h6>
                <small className="text-muted">{m.desc}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= CONTEXTUAL INFO ================= */}
      {isBatch && (
        <div className="col-12">
          <div className="p-3 bg-soft-warning rounded-4 border border-warning border-opacity-25">
            <strong>Batch Tracking Enabled</strong>
            <p className="mb-0 small text-muted">
              Each purchase batch will be tracked separately with expiry dates.
            </p>
          </div>
        </div>
      )}

      {isSerial && (
        <div className="col-12">
          <div className="p-3 bg-soft-info rounded-4 border border-info border-opacity-25">
            <strong>Serial Tracking Enabled</strong>
            <p className="mb-0 small text-muted">
              Stock quantity is derived from individual serial numbers.
            </p>
          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* STOCK QUANTITY                                    */}
      {/* ================================================= */}
      <div className="col-md-4">
        <label className="form-label fw-bold small">
          Opening Stock
        </label>
        <input
          type="number"
          name="openingStock"
          className="form-control shadow-sm fw-bold"
          placeholder={
            isSerial ? "Auto from serials" : "e.g. 100"
          }
          value={formData.openingStock}
          onChange={handleChange}
          disabled={isSerial}
        />
        <small className="text-muted">
          {isSerial
            ? "Calculated automatically"
            : "Initial stock at setup"}
        </small>
      </div>

      <div className="col-md-4">
        <label className="form-label fw-bold small">
          Current Stock
        </label>
        <input
          type="number"
          disabled
          className="form-control bg-light fw-bold text-info"
          value={
            formData.currentStock ??
            formData.openingStock ??
            0
          }
        />
        <small className="text-muted">
          Updated automatically
        </small>
      </div>

      <div className="col-md-4">
        <label className="form-label fw-bold small text-danger">
          Reorder Level
        </label>
        <input
          type="number"
          name="reorderLevel"
          className="form-control shadow-sm fw-bold text-danger"
          placeholder={
            isSerial
              ? "Optional for serial items"
              : "e.g. 10"
          }
          value={formData.reorderLevel}
          onChange={handleChange}
        />
        <small className="text-muted">
          Stock alert threshold
        </small>
      </div>

      {/* ================================================= */}
      {/* WAREHOUSE                                        */}
      {/* ================================================= */}
      <div className="col-12 mt-3">
        <h6 className="fw-bold small text-muted border-bottom pb-2">
          Storage & Location
        </h6>
      </div>

      <div className="col-md-4">
        <label className="form-label fw-bold small">
          Warehouse
        </label>
        <select
          name="warehouse"
          className="form-select shadow-sm"
          value={formData.warehouse}
          onChange={handleChange}
        >
          <option value="">Select warehouse</option>
          {warehouses.map((w) => (
            <option key={w.id} value={w.id}>
              {w.name}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-4">
        <label className="form-label fw-bold small">
          <MapPin size={14} className="me-1" />
          Rack / Bin
        </label>
        <input
          type="text"
          name="rackLocation"
          className="form-control shadow-sm"
          placeholder="e.g. Rack-A / Shelf-3"
          value={formData.rackLocation}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-4">
        <label className="form-label fw-bold small">
          Valuation Method
        </label>
        <select
          name="valuationMethod"
          className="form-select shadow-sm"
          value={formData.valuationMethod}
          onChange={handleChange}
        >
          <option value="FIFO">FIFO (Recommended)</option>
          <option value="Average">Weighted Average</option>
          <option value="LIFO">LIFO</option>
        </select>
      </div>

      {/* ================================================= */}
      {/* AUTOMATION & CONTROL                              */}
      {/* ================================================= */}
      <div className="col-md-6 mt-3">
        <div className="p-3 bg-light rounded-4 border d-flex justify-content-between align-items-center h-100">
          <div className="d-flex align-items-center">
            <TrendingUp size={18} className="text-warning me-2" />
            <div>
              <h6 className="fw-bold small mb-0">
                Expiry Tracking
              </h6>
              <small className="text-muted">
                Mandatory for batch items
              </small>
            </div>
          </div>
          <input
            type="checkbox"
            name="expiryTracking"
            className="form-check-input"
            checked={isBatch ? true : formData.expiryTracking}
            disabled={isBatch}
            onChange={onBoolChange}
          />
        </div>
      </div>

      <div className="col-md-6 mt-3">
        <div className="p-3 bg-soft-primary rounded-4 border d-flex justify-content-between align-items-center h-100">
          <div className="d-flex align-items-center">
            <Truck size={18} className="text-primary me-2" />
            <div>
              <h6 className="fw-bold small mb-0">
                Auto Purchase Suggestion
              </h6>
              <small className="text-muted">
                Suggest PO on low stock
              </small>
            </div>
          </div>
          <input
            type="checkbox"
            name="autoReorder"
            className="form-check-input"
            checked={formData.autoReorder}
            onChange={onBoolChange}
          />
        </div>
      </div>

      <div className="col-12">
        <div className="p-3 bg-soft-danger rounded-4 border d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <ShieldOff size={18} className="text-danger me-2" />
            <div>
              <h6 className="fw-bold small mb-0">
                Allow Negative Stock
              </h6>
              <small className="text-muted">
                Allow billing even if stock is zero
              </small>
            </div>
          </div>
          <input
            type="checkbox"
            name="allowNegativeStock"
            className="form-check-input"
            checked={formData.allowNegativeStock}
            onChange={onBoolChange}
          />
        </div>
      </div>
    </div>
  );
};

export default InventoryInfo;
