import React from "react";
import { MessageSquare, Heart, Bell, Star, ShoppingBag, Calendar } from "react-feather";

const CRMInfo = ({ formData, handleChange }) => (
  <div className="row g-4 animate__animated animate__fadeIn">
    {/* --- INTERNAL NOTES --- */}
    <div className="col-md-12">
      <label className="form-label fw-bold small d-flex align-items-center">
        <MessageSquare size={16} className="me-2 text-primary"/> Internal Staff Remarks
      </label>
      <textarea 
        name="notes" 
        className="form-control shadow-sm border-2" 
        rows="3" 
        placeholder="E.g. Customer prefers early morning delivery, or always asks for discounts..."
        value={formData.notes} 
        onChange={handleChange}
      ></textarea>
    </div>

    {/* --- PREFERENCES (PRO FIELDS) --- */}
    <div className="col-md-6">
      <div className="p-3 border rounded-4 bg-light shadow-sm">
        <label className="form-label fw-bold small d-flex align-items-center">
          <Heart size={16} className="me-2 text-primary"/> Customer Interests / Tags
        </label>
        <input 
          type="text" 
          name="interests" 
          className="form-control form-control-sm mb-2" 
          placeholder="E.g. Electronics, Organic Food, Luxury" 
          value={formData.interests} 
          onChange={handleChange} 
        />
        <small className="text-muted">Use tags to filter customers for WhatsApp marketing campaigns.</small>
      </div>
    </div>

    <div className="col-md-6">
      <div className="p-3 border rounded-4 bg-light shadow-sm">
        <label className="form-label fw-bold small d-flex align-items-center">
          <Calendar size={16} className="me-2 text-primary"/> Follow-up Reminder
        </label>
        <input 
          type="date" 
          name="nextFollowUp" 
          className="form-control form-control-sm mb-2" 
          value={formData.nextFollowUp} 
          onChange={handleChange} 
        />
        <small className="text-muted">Set a date to call this customer for their next order.</small>
      </div>
    </div>

    {/* --- CHANNELS & RATINGS --- */}
    <div className="col-md-6">
      <label className="form-label fw-bold small"><Bell size={16} className="me-2 text-warning"/> Marketing Communication</label>
      <div className="card p-2 border-dashed">
        <div className="d-flex justify-content-around">
          {['SMS', 'Email', 'WhatsApp', 'None'].map(mode => (
            <div className="form-check" key={mode}>
              <input 
                className="form-check-input" 
                type="radio" 
                name="communication" 
                value={mode} 
                checked={formData.communication === mode} 
                onChange={handleChange} 
              />
              <label className="form-check-label small fw-semibold">{mode}</label>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="col-md-6">
      <label className="form-label fw-bold small"><Star size={16} className="me-2 text-warning"/> Customer Satisfaction Rating</label>
      <select 
        name="rating" 
        className="form-select shadow-sm fw-bold text-warning" 
        value={formData.rating} 
        onChange={handleChange}
      >
        <option value="5">⭐⭐⭐⭐⭐ (VIP / High Priority)</option>
        <option value="4">⭐⭐⭐⭐ (Premium / Loyal)</option>
        <option value="3">⭐⭐⭐ (Standard / Frequent)</option>
        <option value="2">⭐⭐ (Needs Attention)</option>
        <option value="1">⭐ (At Risk / Complainant)</option>
      </select>
    </div>

    {/* --- SALES TARGETS (PRO FIELD) --- */}
    <div className="col-md-12">
      <div className="p-3 bg-soft-primary rounded-4 border border-primary border-opacity-10 d-flex align-items-center">
        <ShoppingBag className="text-primary me-3" size={24} />
        <div className="flex-grow-1">
          <h6 className="mb-0 fw-bold">Sales Target / Potential</h6>
          <small className="text-muted">Estimate monthly business volume from this customer</small>
        </div>
        <div className="w-25">
          <input 
            type="number" 
            name="potentialVolume" 
            className="form-control form-control-sm fw-bold border-primary border-opacity-25" 
            placeholder="₹ 0.00"
            value={formData.potentialVolume}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  </div>
);

export default CRMInfo;