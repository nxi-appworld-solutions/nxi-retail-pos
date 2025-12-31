import { ShieldCheck } from "lucide-react";
import React from "react";
import {
  Mail,
  Phone,
  Globe,
  MessageCircle,
  Bell,
  Smartphone,
} from "react-feather";

const ContactInfo = ({ formData, handleChange }) => {
  // Helper for checkbox/switch handling
  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    handleChange({ target: { name, value: checked } });
  };

  return (
    <div className="row g-4 animate__animated animate__fadeIn">
      {/* --- PRIMARY CONTACT SECTION --- */}
      <div className="col-md-6">
        <label className="form-label fw-bold small d-flex align-items-center">
          <Smartphone size={14} className="me-1" /> Primary Mobile (POS Login
          ID) *
        </label>
        <div className="input-group shadow-sm border rounded-3 overflow-hidden">
          <span className="input-group-text bg-primary-light border-0">
            <select className="form-select form-select-sm border-0 bg-transparent fw-bold">
              <option>+91</option>
              <option>+1</option>
              <option>+44</option>
            </select>
          </span>
          <input
            type="text"
            name="mobile"
            className="form-control border-0"
            placeholder="9876543210"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
          <span className="input-group-text bg-white border-0 text-success">
            <ShieldCheck size={18} />
          </span>
        </div>
        <small className="text-muted">
          Used for customer lookup and SMS receipts.
        </small>
      </div>

      <div className="col-md-6">
        <label className="form-label fw-bold small d-flex align-items-center">
          <MessageCircle size={14} className="me-1" /> WhatsApp Number
        </label>
        <div className="input-group shadow-sm border rounded-3 overflow-hidden">
          <span className="input-group-text bg-success-light border-0 text-success">
            <MessageCircle size={18} />
          </span>
          <input
            type="text"
            name="whatsapp"
            className="form-control border-0"
            placeholder="Leave blank if same as mobile"
            value={formData.whatsapp}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* --- NOTIFICATION PREFERENCE (PRO FIELD) --- */}
      <div className="col-md-12">
        <div className="p-3 bg-light rounded-4 border border-dashed d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <Bell size={20} className="text-warning me-3" />
            <div>
              <h6 className="mb-0 fw-bold small text-uppercase">
                Digital Receipt Preference
              </h6>
              <small className="text-muted">
                How should the customer receive invoices?
              </small>
            </div>
          </div>
          <div className="d-flex gap-3">
            {["SMS", "WhatsApp", "Email"].map((method) => (
              <div className="form-check form-check-inline m-0 text-secondary" key={method}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name={`pref_${method}`}
                  checked={formData[`pref_${method}`]}
                  onChange={handleCheckbox}
                />
                <label className="form-check-label small fw-bold">
                  {method}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- SECONDARY CONTACTS --- */}
      <div className="col-md-6">
        <label className="form-label fw-bold small">
          Official Email Address
        </label>
        <div className="input-group shadow-sm border rounded-3 overflow-hidden">
          <span className="input-group-text bg-white border-0 text-muted">
            <Mail size={18} />
          </span>
          <input
            type="email"
            name="email"
            className="form-control border-0"
            placeholder="customer@business.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="col-md-6">
        <label className="form-label fw-bold small">
          Alternate Contact Name / Number
        </label>
        <input
          type="text"
          name="alternateMobile"
          className="form-control shadow-sm"
          placeholder="Emergency contact or manager"
          value={formData.alternateMobile}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-12">
        <label className="form-label fw-bold small">
          Web Presence (Social/Website)
        </label>
        <div className="input-group shadow-sm border rounded-3 overflow-hidden">
          <span className="input-group-text bg-light border-0 text-muted">
            <Globe size={18} />
          </span>
          <input
            type="text"
            name="website"
            className="form-control border-0"
            placeholder="www.customerlink.com"
            value={formData.website}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
