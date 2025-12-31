import React from "react";
import { MapPin, Navigation, Truck, Globe, Map } from "react-feather";

const AddressInfo = ({ formData, handleChange }) => {
  // Logic to copy billing to shipping
  const handleSameAsBilling = (e) => {
    if (e.target.checked) {
      handleChange({ target: { name: "shippingAddress", value: formData.billingAddress } });
    }
  };

  return (
    <div className="row g-4 animate__animated animate__fadeIn">
      {/* --- BILLING SECTION --- */}
      <div className="col-md-6">
        <div className="card border-0 shadow-sm bg-light p-3 rounded-4">
          <label className="form-label fw-bold text-primary mb-2 d-flex align-items-center justify-content-between">
            <span><MapPin size={18} className="me-2"/> Billing Address</span>
            <span className="badge bg-primary-light text-primary small">Primary</span>
          </label>
          <textarea name="billingAddress" className="form-control border-0 shadow-inner mb-2" rows="3"
                    placeholder="Shop/House No, Building, Street..."
                    value={formData.billingAddress} onChange={handleChange} />
          
          <div className="row g-2">
            <div className="col-6">
              <input type="text" name="city" className="form-control form-control-sm" placeholder="City" value={formData.city} onChange={handleChange} />
            </div>
            <div className="col-6">
              <input type="text" name="pincode" className="form-control form-control-sm" placeholder="Pincode" value={formData.pincode} onChange={handleChange} />
            </div>
          </div>
        </div>
      </div>

      {/* --- SHIPPING SECTION --- */}
      <div className="col-md-6">
        <div className="card border-0 shadow-sm bg-white p-3 rounded-4 border-start border-4 border-success">
          <label className="form-label fw-bold text-success mb-2 d-flex align-items-center justify-content-between">
            <span><Truck size={18} className="me-2"/> Shipping Address</span>
            <div className="form-check form-switch m-0">
               <input className="form-check-input" type="checkbox" id="sameAsBilling" onChange={handleSameAsBilling} />
               <label className="form-check-label small text-muted" htmlFor="sameAsBilling">Same as billing</label>
            </div>
          </label>
          <textarea name="shippingAddress" className="form-control border-dashed mb-2" rows="3"
                    placeholder="Delivery destination details..."
                    value={formData.shippingAddress} onChange={handleChange} />
          
          <div className="row g-2">
            <div className="col-12">
               {/* PRO FIELD: Delivery Zone */}
               <select name="deliveryZone" className="form-select form-select-sm" value={formData.deliveryZone} onChange={handleChange}>
                  <option value="">Select Delivery Zone / Route</option>
                  <option value="Zone-A">Zone A (Express Delivery)</option>
                  <option value="Zone-B">Zone B (Standard)</option>
                  <option value="Outskirts">Outskirts (Additional Charges)</option>
               </select>
            </div>
          </div>
        </div>
      </div>

      {/* --- GLOBAL / GEO DATA --- */}
      <div className="col-12">
        <div className="p-3 bg-white border rounded-4 shadow-sm">
          <h6 className="fw-bold small text-muted text-uppercase mb-3"><Globe size={14} className="me-1"/> Regional & Geo-tagging</h6>
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label small fw-bold">State</label>
              <input type="text" name="state" className="form-control" value={formData.state} onChange={handleChange} />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold">Country</label>
              <input type="text" name="country" className="form-control" value={formData.country} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-bold"><Map size={14} className="me-1"/> GPS Coordinates (Latitude, Longitude)</label>
              <div className="input-group">
                <input type="text" name="latlong" className="form-control" placeholder="28.6139, 77.2090" value={formData.latlong} onChange={handleChange} />
                <button className="btn btn-outline-secondary" type="button">Locate on Map</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressInfo;