import React, { useEffect } from "react";
import { User, Calendar, UserPlus } from "react-feather";

const BasicInfo = ({ formData, handleChange }) => {
  /* ---------- IMAGE HANDLER ---------- */
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    handleChange("image", file);
  };

  useEffect(() => {
    return () => {
      if (formData.image instanceof File) {
        URL.revokeObjectURL(formData.image);
      }
    };
  }, [formData.image]);

  return (
    <div className="row g-4 animate__animated animate__fadeIn">
      {/* ---------- CUSTOMER HEADER ---------- */}
      <div className="col-12">
        <div
          className="p-4 rounded-4 shadow-sm d-flex align-items-center gap-4"
          style={{
            background: "linear-gradient(135deg, #f8f9ff, #ffffff)",
            border: "1px solid rgba(78,115,223,0.15)",
          }}
        >
          {/* AVATAR */}
          <div className="position-relative">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center bg-white shadow-sm"
              style={{
                width: 88,
                height: 88,
                border: "2px dashed rgba(78,115,223,0.3)",
              }}
            >
              {formData.image ? (
                <img
                  src={
                    typeof formData.image === "string"
                      ? formData.image
                      : URL.createObjectURL(formData.image)
                  }
                  alt="Customer"
                  className="rounded-circle w-100 h-100 object-fit-cover"
                />
              ) : (
                <User size={36} className="text-primary opacity-50" />
              )}
            </div>

            {/* UPLOAD */}
            {/* <input
              type="file"
              accept="image/*"
              className="form-control form-control-sm mt-2"
              onChange={handleImageChange}
              title="Upload customer photo / logo"
            /> */}
          </div>

          {/* CUSTOMER IDENTITY */}
          <div className="flex-grow-1">
            <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
              <h4 className="fw-bold mb-0 text-dark">
                {formData.name || "New Customer"}
              </h4>

              {formData.code && (
                <span className="badge bg-light text-primary border fw-semibold">
                  #{formData.code}
                </span>
              )}
            </div>

            <div className="d-flex align-items-center gap-3 text-muted small">
              <span>Customer Profile</span>
              <span className="opacity-50">•</span>
              <span>Used for billing, GST & reports</span>
            </div>
          </div>

          {/* STATUS / MODE INDICATOR */}
          <div className="text-end d-none d-md-block">
            <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-semibold">
              {formData.code ? "Editing Customer" : "New Customer"}
            </span>
          </div>
        </div>
      </div>

      {/* ---------- NAME ---------- */}
      <div className="col-md-8">
        <label className="form-label fw-bold small text-secondary">
          Customer / Business Name <span className="text-danger">*</span>
        </label>
        <div className="input-group shadow-sm border rounded-3 overflow-hidden">
          <span className="input-group-text bg-white border-0">
            <User size={18} className="text-muted" />
          </span>
          <input
            type="text"
            name="name"
            className="form-control form-control-lg border-0"
            placeholder="e.g. Rahul Sharma / ABC Traders"
            value={formData.name}
            onChange={handleChange}
            autoFocus
          />
        </div>
      </div>

      {/* ---------- ALIAS ---------- */}
      <div className="col-md-4">
        <label className="form-label fw-bold small text-secondary">
          Display Name
        </label>
        <input
          type="text"
          name="alias"
          className="form-control form-control-lg shadow-sm"
          placeholder="Name on invoice"
          value={formData.alias}
          onChange={handleChange}
        />
      </div>

      {/* ---------- CUSTOMER TYPE ---------- */}
      <div className="col-md-6">
        <label className="form-label fw-bold small text-secondary">
          Customer Type <span className="text-danger">*</span>
        </label>
        <select
          name="customerType"
          className="form-select shadow-sm py-2 fw-semibold"
          value={formData.customerType}
          onChange={handleChange}
          disabled={formData.customerType === "WALK_IN"}
        >
          <option value="RETAIL">Retail Customer</option>
          <option value="WHOLESALE">Wholesale Customer</option>
          <option value="WALK_IN">Walk-in Customer</option>
        </select>
        <small className="text-muted">
          Used for pricing, GST and credit rules
        </small>
      </div>

      {/* ---------- PRICE LIST ---------- */}
      <div className="col-md-3">
        <label className="form-label fw-bold small text-secondary">
          Price List
        </label>
        <select
          name="priceList"
          className="form-select shadow-sm py-2"
          value={formData.priceList}
          onChange={handleChange}
        >
          <option value="STANDARD">Standard</option>
          <option value="WHOLESALE">Wholesale</option>
          <option value="VIP">VIP</option>
        </select>
      </div>

      {/* ---------- TAGS ---------- */}
      <div className="col-md-3">
        <label className="form-label fw-bold small text-secondary">
          Search Tags
        </label>
        <input
          type="text"
          name="tags"
          className="form-control shadow-sm bg-light"
          placeholder="Keyword for search"
          value={formData.tags}
          onChange={handleChange}
        />
      </div>

      {/* ---------- IMPORTANT DATES ---------- */}
      <div className="col-md-6">
        <div className="p-4 border border-dashed rounded-4 bg-white h-100 shadow-sm">
          <label className="form-label fw-bold small d-flex align-items-center text-secondary mb-3">
            <Calendar size={18} className="me-2" />
            Important Dates
          </label>

          <div className="row g-3">
            <div className="col-6">
              <label className="text-muted small mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                className="form-control border-0 bg-light"
                value={formData.dob || ""}
                onChange={handleChange}
              />
            </div>

            <div className="col-6">
              <label className="text-muted small mb-1">Anniversary</label>
              <input
                type="date"
                name="anniversary"
                className="form-control border-0 bg-light"
                value={formData.anniversary || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ---------- MARKETING SOURCE ---------- */}
      <div className="col-md-6">
        <div className="p-4 border border-dashed rounded-4 bg-white h-100 shadow-sm">
          <label className="form-label fw-bold small d-flex align-items-center text-secondary mb-3">
            <UserPlus size={18} className="me-2" />
            Customer Preferences
          </label>

          <div className="row g-3">
            <div className="col-6">
              <label className="text-muted small mb-1">Source</label>
              <select
                name="source"
                className="form-select border-0 bg-light"
                value={formData.source}
                onChange={handleChange}
              >
                <option value="WALK_IN">Direct / Walk-in</option>
                <option value="SOCIAL">Social Media</option>
                <option value="REFERRAL">Referral</option>
                <option value="GOOGLE">Google / Web</option>
              </select>
            </div>

            <div className="col-6">
              <label className="text-muted small mb-1">
                Preferred Language
              </label>
              <select
                name="language"
                className="form-select border-0 bg-light"
                value={formData.language}
                onChange={handleChange}
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
