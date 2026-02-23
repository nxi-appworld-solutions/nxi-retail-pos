/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { MapPin, Truck, Globe, Map } from "react-feather";

const AddressInfo = ({ formData, handleChange }) => {
  const [syncShipping, setSyncShipping] = useState(false);

  /* ---------- COPY BILLING → SHIPPING (ONE TIME) ---------- */
  useEffect(() => {
    if (syncShipping) {
      handleChange("shippingAddress", formData.billingAddress || "");
      handleChange("shippingCity", formData.city || "");
      handleChange("shippingPincode", formData.pincode || "");
      handleChange("shippingState", formData.state || "");
      handleChange("shippingCountry", formData.country || "");
    }
  }, [syncShipping]);

  return (
    <div className="row g-4 animate__animated animate__fadeIn">
      {/* ================= BILLING ADDRESS ================= */}
      <div className="col-md-6">
        <div className="p-4 bg-white rounded-4 shadow-sm border border-primary border-opacity-25">
          <h6 className="fw-bold text-primary mb-3 d-flex align-items-center">
            <MapPin size={18} className="me-2" />
            Billing Address
            <span className="badge bg-primary bg-opacity-10 text-primary ms-2">
              Used for GST & Bills
            </span>
          </h6>

          <textarea
            rows={3}
            className="form-control bg-light border-0 mb-3"
            name="billingAddress"
            placeholder="House / Shop No, Street, Area"
            value={formData.billingAddress || ""}
            onChange={handleChange}
          />

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label small fw-bold">City</label>
              <input
                className="form-control"
                name="city"
                value={formData.city || ""}
                placeholder="Enter city name (e.g. New Delhi)"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-bold">Pincode</label>
              <input
                className="form-control"
                name="pincode"
                value={formData.pincode || ""}
                placeholder="e.g. 110001"
                onChange={handleChange}
                inputMode="number"
                pattern="[0-9]*"
                maxLength={6}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-bold">State</label>
              <input
                className="form-control"
                placeholder="Enter state name (e.g. Delhi)"
                name="state"
                value={formData.state || ""}
                onChange={handleChange}
              />
              <small className="text-muted">Required for GST calculation</small>
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-bold">Country</label>
              <input
                className="form-control"
                placeholder="Enter country name (e.g. India)"
                name="country"
                value={formData.country || "India"}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ================= SHIPPING ADDRESS ================= */}
      <div className="col-md-6">
        <div className="p-4 bg-light rounded-4 shadow-sm border border-success border-opacity-25">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="fw-bold text-success d-flex align-items-center mb-0">
              <Truck size={18} className="me-2" />
              Shipping Address
            </h6>

            <div className="form-check form-switch m-0">
              <input
                className="form-check-input"
                type="checkbox"
                checked={syncShipping}
                onChange={(e) => setSyncShipping(e.target.checked)}
              />
              <label className="form-check-label small text-muted">
                Same as billing
              </label>
            </div>
          </div>

          <textarea
            rows={3}
            className="form-control border-0 mb-3"
            name="shippingAddress"
            placeholder="Delivery address"
            value={formData.shippingAddress || ""}
            onChange={handleChange}
            disabled={syncShipping}
          />

          <label className="form-label small fw-bold">
            Delivery Zone / Route
          </label>
          <select
            className="form-select"
            name="deliveryZone"
            value={formData.deliveryZone || ""}
            onChange={handleChange}
          >
            <option value="">Select delivery zone</option>
            <option value="Zone-A">Zone A – Express</option>
            <option value="Zone-B">Zone B – Standard</option>
            <option value="Outskirts">Outskirts</option>
          </select>
        </div>
      </div>

      {/* ================= GEO ================= */}
      <div className="col-12">
        <div className="p-4 bg-white rounded-4 shadow-sm border">
          <h6 className="fw-bold small text-uppercase text-muted mb-3 d-flex align-items-center">
            <Globe size={14} className="me-2" />
            Geo Location (Optional)
          </h6>

          <div className="col-md-8">
            <label className="form-label small fw-bold">
              Latitude, Longitude
            </label>
            <div className="input-group">
              <input
                className="form-control"
                name="latlong"
                placeholder="28.6139, 77.2090"
                value={formData.latlong || ""}
                onChange={handleChange}
              />
              <button type="button" className="btn btn-outline-secondary">
                <Map size={16} className="me-1" />
                Locate
              </button>
            </div>
            <small className="text-muted">
              Used for delivery optimization & reports
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressInfo;
