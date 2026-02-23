import React, { useEffect } from "react";
import {
  Mail,
  Phone,
  Globe,
  MessageCircle,
  Bell,
} from "react-feather";

const ContactInfo = ({ formData, handleChange }) => {
  /* ---------- AUTO COPY MOBILE → WHATSAPP ---------- */
  useEffect(() => {
    if (!formData.whatsapp && formData.mobile?.length >= 10) {
      handleChange({
        target: { name: "whatsapp", value: formData.mobile },
      });
    }
  }, [formData.mobile, formData.whatsapp, handleChange]);

  return (
    <div className="row g-4 animate__animated animate__fadeIn">

      {/* ---------- PRIMARY CONTACT ---------- */}
      <div className="col-12">
        <div className="p-4 bg-white border rounded-4 shadow-sm">
          <h6 className="fw-bold mb-3 text-primary d-flex align-items-center">
            <Phone size={18} className="me-2" />
            Primary Contact
          </h6>

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-bold small">
                Mobile Number <span className="text-danger">*</span>
              </label>
              <div className="input-group shadow-sm border rounded-3 overflow-hidden">
                <span className="input-group-text bg-light border-0 fw-bold">
                  +91
                </span>
                <input
                  type="tel"
                  name="mobile"
                  className="form-control border-0"
                  placeholder="9876543210"
                  value={formData.mobile || ""}
                  onChange={handleChange}
                />
              </div>
              <small className="text-muted">
                Used for customer lookup & receipts
              </small>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold small">
                WhatsApp Number
              </label>
              <div className="input-group shadow-sm border rounded-3 overflow-hidden">
                <span className="input-group-text bg-light border-0 text-success">
                  <MessageCircle size={16} />
                </span>
                <input
                  type="tel"
                  name="whatsapp"
                  className="form-control border-0"
                  placeholder="Same as mobile by default"
                  value={formData.whatsapp || ""}
                  onChange={handleChange}
                />
              </div>
              <small className="text-muted">
                Used for invoice sharing
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- INVOICE DELIVERY PREFERENCE (CUSTOMER CHOICE) ---------- */}
      <div className="col-12">
        <div className="p-4 bg-light rounded-4 border border-dashed">
          <h6 className="fw-bold mb-2 text-uppercase d-flex align-items-center">
            <Bell size={16} className="me-2 text-warning" />
            Invoice Delivery Preference
          </h6>
          <small className="text-muted d-block mb-3">
            Choose how invoices will be sent automatically
          </small>

          <div className="d-flex gap-4">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={formData.invoiceViaWhatsapp ?? true}
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: "invoiceViaWhatsapp",
                      value: e.target.checked,
                    },
                  })
                }
              />
              <label className="form-check-label fw-semibold">
                WhatsApp Invoice
              </label>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={formData.invoiceViaEmail || false}
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: "invoiceViaEmail",
                      value: e.target.checked,
                    },
                  })
                }
              />
              <label className="form-check-label fw-semibold">
                Email Invoice
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- SECONDARY CONTACT ---------- */}
      <div className="col-md-6">
        <label className="form-label fw-bold small">
          Email Address
        </label>
        <div className="input-group shadow-sm border rounded-3 overflow-hidden">
          <span className="input-group-text bg-light border-0 text-muted">
            <Mail size={16} />
          </span>
          <input
            type="email"
            name="email"
            className="form-control border-0"
            placeholder="customer@email.com"
            value={formData.email || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="col-md-6">
        <label className="form-label fw-bold small">
          Alternate Contact
        </label>
        <input
          type="text"
          name="alternateMobile"
          className="form-control shadow-sm"
          placeholder="Manager / Emergency contact"
          value={formData.alternateMobile || ""}
          onChange={handleChange}
        />
      </div>

      {/* ---------- WEB ---------- */}
      <div className="col-12">
        <label className="form-label fw-bold small">
          Website / Social Link
        </label>
        <div className="input-group shadow-sm border rounded-3 overflow-hidden">
          <span className="input-group-text bg-light border-0 text-muted">
            <Globe size={16} />
          </span>
          <input
            type="text"
            name="website"
            className="form-control border-0"
            placeholder="www.example.com"
            value={formData.website || ""}
            onChange={handleChange}
          />
        </div>
      </div>

    </div>
  );
};

export default ContactInfo;
