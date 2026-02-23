import React from "react";
import { Star, CreditCard, Gift, Calendar, RefreshCw, Settings, UserCheck } from "react-feather";

const LoyaltyInfo = ({ formData, handleChange }) => {
  // Checkbox handler
  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    handleChange({ target: { name, value: checked } });
  };

  return (
    <div className="row g-4 animate__animated animate__fadeIn">
      {/* --- TOP HIGHLIGHT: POINTS & LEVEL --- */}
      <div className="col-md-12">
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="d-flex flex-column flex-md-row">
            <div className="p-4 flex-grow-1" style={{ background: "linear-gradient(135deg, #FFF9E6 0%, #FFF 100%)" }}>
              <div className="d-flex align-items-center mb-2">
                <div className="p-2 bg-warning rounded-3 me-3">
                  <Gift className="text-white" size={20} />
                </div>
                <h6 className="mb-0 fw-bold">Loyalty Wallet balance</h6>
              </div>
              <h2 className="fw-extrabold text-warning mb-0">{formData.pointsBalance || 0} <small className="fs-6 text-muted fw-normal">Pts</small></h2>
              <p className="small text-muted mb-0 mt-1">Estimated Value: <b>₹ {(formData.pointsBalance || 0) * (formData.pointValue || 1)}</b></p>
            </div>
            
            <div className="p-4 bg-white border-start d-flex align-items-center justify-content-md-center" style={{ minWidth: '250px' }}>
              <div className="text-md-center">
                <span className={`badge rounded-pill mb-2 px-3 py-2 ${
                  formData.membershipLevel === 'Platinum' ? 'bg-dark' : 
                  formData.membershipLevel === 'Gold' ? 'bg-warning text-dark' : 'bg-secondary'
                }`}>
                  <Star size={12} className="me-1"/> {formData.membershipLevel || 'Silver'} Member
                </span>
                <p className="small text-muted mb-0">Member Since: {formData.createdDate || 'Today'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- CONFIGURATION SECTION (PRO FIELDS) --- */}
      <div className="col-12 mt-4">
        <h6 className="fw-bold text-uppercase small text-muted border-bottom pb-2 d-flex align-items-center">
          <Settings size={14} className="me-2"/> Redemption Rules & Settings
        </h6>
      </div>

      <div className="col-md-4">
        <label className="form-label fw-bold small">Point Value (1 Pt = ?)</label>
        <div className="input-group shadow-sm">
          <span className="input-group-text bg-white">₹</span>
          <input type="number" name="pointValue" className="form-control" placeholder="1.0" 
                 value={formData.pointValue} onChange={handleChange} />
        </div>
        <small className="text-muted">Value in currency per point</small>
      </div>

      <div className="col-md-4">
        <label className="form-label fw-bold small">Min Points to Redeem</label>
        <div className="input-group shadow-sm">
          <span className="input-group-text bg-white"><RefreshCw size={16}/></span>
          <input type="number" name="minRedeemPoints" className="form-control" placeholder="100" 
                 value={formData.minRedeemPoints} onChange={handleChange} />
        </div>
      </div>

      <div className="col-md-4">
        <label className="form-label fw-bold small">Membership Tier</label>
        <select name="membershipLevel" className="form-select shadow-sm fw-bold" 
                value={formData.membershipLevel} onChange={handleChange}>
          <option value="Silver">Silver (Standard)</option>
          <option value="Gold">Gold (5% Extra Pts)</option>
          <option value="Platinum">Platinum (10% Extra Pts)</option>
        </select>
      </div>

      {/* --- IDENTIFIERS --- */}
      <div className="col-md-6">
        <label className="form-label fw-bold small">Membership / Loyalty Card ID</label>
        <div className="input-group shadow-sm">
          <span className="input-group-text bg-white"><CreditCard size={16}/></span>
          <input type="text" name="membershipId" className="form-control font-monospace" 
                 placeholder="Scan or enter Card ID" value={formData.membershipId} onChange={handleChange} />
        </div>
      </div>

      <div className="col-md-6">
        <label className="form-label fw-bold small">Last Redemption</label>
        <div className="input-group shadow-sm">
          <span className="input-group-text bg-white"><Calendar size={16}/></span>
          <input type="date" name="lastRedemption" className="form-control text-muted" 
                 value={formData.lastRedemption} onChange={handleChange} disabled />
        </div>
      </div>

      {/* --- AUTOMATION TOGGLE --- */}
      <div className="col-12">
        <div className="p-3 border rounded-4 bg-light d-flex align-items-center justify-content-between shadow-sm">
          <div className="d-flex align-items-center">
            <UserCheck className="text-primary me-3" size={24} />
            <div>
              <h6 className="mb-0 fw-bold">Auto-Enroll in Loyalty Program</h6>
              <small className="text-muted">Automatically earn points on every future POS invoice</small>
            </div>
          </div>
          <div className="form-check form-switch">
            <input className="form-check-input p-2" type="checkbox" name="autoEnroll" 
                   checked={formData.autoEnroll} onChange={handleCheckbox} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyInfo;