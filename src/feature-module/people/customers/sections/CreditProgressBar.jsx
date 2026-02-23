import React from "react";
import { AlertTriangle, TrendingUp } from "react-feather";

const CreditProgressBar = ({ limit, used }) => {
  // Percentage Calculation
  const percentage = limit > 0 ? Math.min((used / limit) * 100, 100).toFixed(1) : 0;
  
  // Color Logic based on usage
  const getProgressColor = () => {
    if (percentage < 50) return "bg-success"; // Safe
    if (percentage < 85) return "bg-warning"; // Warning
    return "bg-danger"; // Critical
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <h6 className="fw-bold mb-0 d-flex align-items-center">
              {percentage >= 90 ? (
                <AlertTriangle size={18} className="text-danger me-2 animate__animated animate__flash animate__infinite" />
              ) : (
                <TrendingUp size={18} className="text-success me-2" />
              )}
              Credit Utilization
            </h6>
            <small className="text-muted small">Current usage against total limit</small>
          </div>
          <div className="text-end">
            <span className={`badge ${getProgressColor()} fs-6`}>{percentage}% Used</span>
          </div>
        </div>

        {/* --- PROGRESS BAR --- */}
        <div className="progress rounded-pill shadow-inner" style={{ height: "12px", background: "#f0f0f0" }}>
          <div 
            className={`progress-bar progress-bar-striped progress-bar-animated ${getProgressColor()}`} 
            role="progressbar" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        {/* --- LIMIT DETAILS --- */}
        <div className="row mt-3 text-center g-2">
          <div className="col-4 border-end">
            <small className="text-muted d-block small text-uppercase">Total Limit</small>
            <span className="fw-bold">₹{limit.toLocaleString()}</span>
          </div>
          <div className="col-4 border-end">
            <small className="text-muted d-block small text-uppercase">Used Amount</small>
            <span className="fw-bold text-danger">₹{used.toLocaleString()}</span>
          </div>
          <div className="col-4">
            <small className="text-muted d-block small text-uppercase">Available</small>
            <span className="fw-bold text-success">₹{(limit - used).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditProgressBar;