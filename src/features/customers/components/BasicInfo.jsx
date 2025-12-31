import React from "react";
import { User, Tag, Layers, Calendar, UserPlus, Search } from "react-feather";

const BasicInfo = ({ formData, handleChange }) => {
  return (
    <div className="row g-4 animate__animated animate__fadeIn">
      {/* --- TOP IDENTITY STRIP --- */}
      <div className="col-md-12">
        <div className="p-4 bg-white border border-primary border-opacity-10 rounded-4 d-flex align-items-center shadow-sm">
          <div className="avatar-upload me-4 position-relative">
            <div
              className="avatar-preview border-2 border-dashed border-primary border-opacity-25 rounded-circle d-flex align-items-center justify-content-center bg-light"
              style={{ width: "100px", height: "100px" }}
            >
              {formData.photo ? (
                <img
                  src={formData.photo}
                  className="rounded-circle w-100 h-100 object-fit-cover"
                  alt="Profile"
                />
              ) : (
                <User className="text-primary opacity-50" size={40} />
              )}
            </div>
            <input
              type="file"
              name="photo"
              className="form-control form-control-sm mt-2 shadow-sm"
              style={{ maxWidth: "100px" }}
              onChange={handleChange}
            />
          </div>
          <div className="flex-grow-1">
            <div className="d-flex align-items-center mb-1">
              <h5 className="fw-bold mb-0 me-3 text-dark">
                {formData.name || "New Customer / Supplier"}
              </h5>
              <span className="badge bg-primary px-3 py-2 rounded-pill shadow-sm">
                ID: {formData.code || "AUTO-GEN"}
              </span>
            </div>
            <p className="text-muted small mb-0">
              Unified Identity management for all Business Contacts.
            </p>
          </div>
        </div>
      </div>

      {/* --- CORE DATA GRID --- */}
      <div className="col-md-8">
        <label className="form-label fw-bold small text-secondary">
          Full Name / Business Name <span className="text-danger">*</span>
        </label>
        <div className="input-group shadow-sm border rounded-3 overflow-hidden">
          <span className="input-group-text bg-white border-0">
            <User size={18} className="text-muted" />
          </span>
          <input
            type="text"
            name="name"
            className="form-control form-control-lg border-0"
            placeholder="Enter name (e.g. Rahul Sharma / ABC Corp)"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="col-md-4">
        <label className="form-label fw-bold small text-secondary">
          Alias / Display Name
        </label>
        <input
          type="text"
          name="alias"
          className="form-control form-control-lg shadow-sm"
          placeholder="Nickname for bills"
          value={formData.alias}
          onChange={handleChange}
        />
      </div>

      {/* CATEGORY FIELD: Sundry Debtors & Creditors Included */}
      <div className="col-md-6">
        <label className="form-label fw-bold small display-flex align-items-center text-secondary">
          <Layers size={14} className="me-1" /> Category (Ledger Group){" "}
          <span className="text-danger">*</span>
        </label>
        <select
          name="type"
          className="form-select shadow-sm py-2 fw-bold"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="">-- Select Category --</option>
          <optgroup label="Customers (Receivables)">
            <option value="Sundry Debtors">Sundry Debtors (General)</option>
            <option value="Local Customer">Sundry Debtors - Local</option>
            <option value="Interstate Customer">
              Sundry Debtors - Interstate
            </option>
          </optgroup>
          <optgroup label="Suppliers (Payables)">
            <option value="Sundry Creditors">Sundry Creditors (General)</option>
            <option value="Raw Material Supplier">
              Sundry Creditors - Raw Materials
            </option>
            <option value="Expense Vendor">Sundry Creditors - Services</option>
          </optgroup>
          <optgroup label="Other">
            <option value="Walk-in">Walk-in Customer</option>
            <option value="Employee">Internal Staff / Employee</option>
          </optgroup>
        </select>
        <small className="text-muted">
          This categorizes the account for balance sheet and reports.
        </small>
      </div>

      <div className="col-md-3">
        <label className="form-label fw-bold small text-secondary">
          <Tag size={14} className="me-1" /> Pricing Tier
        </label>
        <select
          name="group"
          className="form-select shadow-sm py-2"
          value={formData.group}
          onChange={handleChange}
        >
          <option value="General">Retail (MRP)</option>
          <option value="Wholesale">Wholesale Rate</option>
          <option value="VIP">VIP Rate</option>
        </select>
      </div>

      <div className="col-md-3">
        <label className="form-label fw-bold small text-secondary">
          <Search size={14} className="me-1" /> Search Tag
        </label>
        <input
          type="text"
          name="tags"
          className="form-control shadow-sm bg-light"
          placeholder="Keyword"
          value={formData.tags}
          onChange={handleChange}
        />
      </div>

      {/* --- CRM & ACQUISITION --- */}
      <div className="col-md-6">
        <div className="p-4 border border-dashed rounded-4 bg-white h-100 shadow-sm">
          <label className="form-label fw-bold small d-flex align-items-center text-secondary mb-3">
            <Calendar size={18} className="me-2" /> Important Dates
          </label>
          <div className="row g-3">
            <div className="col-6">
              <label className="text-muted small mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                className="form-control border-0 bg-light"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            <div className="col-6">
              <label className="text-muted small mb-1">Anniversary</label>
              <input
                type="date"
                name="anniversary"
                className="form-control border-0 bg-light"
                value={formData.anniversary}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="p-4 border border-dashed rounded-4 bg-white h-100 shadow-sm">
          <label className="form-label fw-bold small d-flex align-items-center text-secondary mb-3">
            <UserPlus size={18} className="me-2" /> Marketing Source
          </label>
          <div className="row g-3">
            <div className="col-6">
              <label className="text-muted small mb-1">
                How they found us?
              </label>
              <select
                name="source"
                className="form-select border-0 bg-light"
                value={formData.source}
                onChange={handleChange}
              >
                <option value="Walking">Direct / Walking</option>
                <option value="SocialMedia">Social Media</option>
                <option value="Referral">Reference</option>
                <option value="Google">Google / Web</option>
              </select>
            </div>
            <div className="col-6">
              <label className="text-muted small mb-1">Language</label>
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
