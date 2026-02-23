import React from "react";
import { Link } from "react-router-dom";

const PosHeader = ({ greeting, today, onSearch }) => {
  return (
    <div className="tab-content-wrap pb-0">
      <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
        {/* Left Side — Greeting */}
        <div className="mb-3">
          <h5 className="mb-1">{greeting}, Revergent</h5>
          <p>{today}</p>
        </div>

        {/* Right Side — Search & Filters */}
        <div className="d-flex align-items-center flex-wrap mb-2">
          <div className="input-icon-start search-pos position-relative mb-2 me-3">
            <span className="input-icon-addon">
              <i className="ti ti-search" />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search Product"
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>

          <Link to="#" className="btn btn-sm btn-dark mb-2 me-2">
            <i className="ti ti-tag me-1" />
            View All Brands
          </Link>

          <Link to="#" className="btn btn-sm btn-primary mb-2">
            <i className="ti ti-star me-1" />
            Featured
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PosHeader;
