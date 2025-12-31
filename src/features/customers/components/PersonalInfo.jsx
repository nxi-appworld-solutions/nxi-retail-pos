import React from "react";
import { Users } from "react-feather";

const PersonalInfo = ({ formData, handleChange }) => (
  <div className="accordion-item border mb-3">
    <h2 className="accordion-header">
      <button
        className="accordion-button collapsed bg-white"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#personalInfo"
      >
        <Users className="me-2 text-info" /> Personal / Demographic Info
      </button>
    </h2>
    <div id="personalInfo" className="accordion-collapse collapse">
      <div className="border-top"></div>
      <div className="accordion-body row">
        <div className="col-md-4 mb-3">
          <label className="form-label">Gender</label>
          <select
            className="form-select"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            name="dob"
            className="form-control"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Anniversary</label>
          <input
            type="date"
            name="anniversary"
            className="form-control"
            value={formData.anniversary}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Occupation / Industry</label>
          <input
            type="text"
            name="occupation"
            className="form-control"
            value={formData.occupation}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Customer Segment</label>
          <select
            className="form-select"
            name="segment"
            value={formData.segment}
            onChange={handleChange}
          >
            <option>Retail</option>
            <option>Wholesale</option>
            <option>Corporate</option>
            <option>Online</option>
          </select>
        </div>
      </div>
    </div>
  </div>
);

export default PersonalInfo;
