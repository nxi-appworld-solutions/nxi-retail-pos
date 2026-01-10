import React from "react";
import {
  BarChart2,
  TrendingUp,
  TrendingDown,
  Calendar,
  ShoppingBag,
  Percent,
  Activity,
  PieChart,
  ArrowUpRight,
  Info
} from "react-feather";

const AnalyticsInfo = ({ formData }) => {
  // Pro Logic: Calculate Margin Percentage on total sales
  const marginPercentage = formData.totalRevenue > 0 
    ? ((formData.totalProfit / formData.totalRevenue) * 100).toFixed(1) 
    : 0;

  return (
    <div className="row g-4 animate__animated animate__fadeIn">
      {/* --- STRATEGIC HEADER --- */}
      <div className="col-12">
        <div className="p-4 bg-white rounded-4 shadow-sm d-flex align-items-center justify-content-between border-start border-4 border-primary">
          <div className="d-flex align-items-center">
            <div className="p-3 bg-primary bg-opacity-10 rounded-3 me-3 text-primary">
              <BarChart2 size={28} />
            </div>
            <div>
              <h6 className="fw-bold mb-1">Performance Intelligence</h6>
              <small className="text-muted">Real-time sales velocity and profitability insights</small>
            </div>
          </div>
          <div className="text-end d-none d-md-block">
             <span className="badge bg-soft-primary text-primary px-3 py-2 rounded-pill fw-bold">
               Last Sync: Just Now
             </span>
          </div>
        </div>
      </div>

      {/* --- TOP METRICS ROW --- */}
      <div className="col-md-4">
        <div className="p-4 bg-white border border-light rounded-4 shadow-sm h-100 transition-hover">
          <div className="d-flex justify-content-between mb-3">
            <div className="p-2 bg-soft-success rounded-3"><TrendingUp size={20} className="text-success" /></div>
            <span className="text-success small fw-bold">+12.5% <ArrowUpRight size={14}/></span>
          </div>
          <p className="small text-muted fw-bold text-uppercase mb-1 ls-1">Quantity Sold</p>
          <h3 className="fw-bold mb-0">{formData.totalSoldQty || 0} <span className="fs-6 text-muted fw-normal">{formData.unit || 'Units'}</span></h3>
        </div>
      </div>

      <div className="col-md-4">
        <div className="p-4 bg-white border border-light rounded-4 shadow-sm h-100 transition-hover">
          <div className="d-flex justify-content-between mb-3">
            <div className="p-2 bg-soft-primary rounded-3"><ShoppingBag size={20} className="text-primary" /></div>
          </div>
          <p className="small text-muted fw-bold text-uppercase mb-1 ls-1">Total Revenue</p>
          <h3 className="fw-bold mb-0">₹ {formData.totalRevenue?.toLocaleString() || "0.00"}</h3>
          <small className="text-muted">Gross sales value</small>
        </div>
      </div>

      <div className="col-md-4">
        <div className="p-4 bg-white border border-light rounded-4 shadow-sm h-100 transition-hover">
          <div className="d-flex justify-content-between mb-3">
            <div className="p-2 bg-soft-info rounded-3"><Percent size={20} className="text-info" /></div>
            <span className="badge bg-info text-white rounded-pill">{marginPercentage}%</span>
          </div>
          <p className="small text-muted fw-bold text-uppercase mb-1 ls-1">Net Profit</p>
          <h3 className="fw-bold mb-0">₹ {formData.totalProfit?.toLocaleString() || "0.00"}</h3>
          <small className="text-muted">After tax & cost deduction</small>
        </div>
      </div>

      {/* --- ADVANCED ANALYTICS SECTION --- */}
      <div className="col-md-6">
        <div className="p-4 bg-light rounded-4 border-0 h-100 shadow-sm">
          <h6 className="fw-bold mb-3 d-flex align-items-center">
            <Activity size={18} className="me-2 text-warning"/> Stock Velocity
          </h6>
          <div className="d-flex justify-content-between align-items-center p-3 bg-white rounded-3 mb-2 shadow-xs">
            <span className="small text-muted fw-bold text-uppercase">Turnover Status</span>
            {formData.fastMoving ? (
              <span className="badge bg-success px-3 py-2"><TrendingUp size={12} className="me-1" /> FAST MOVING</span>
            ) : (
              <span className="badge bg-warning text-dark px-3 py-2"><TrendingDown size={12} className="me-1" /> SLOW MOVING</span>
            )}
          </div>
          <div className="d-flex justify-content-between align-items-center p-3 bg-white rounded-3 shadow-xs">
            <span className="small text-muted fw-bold text-uppercase">Average Daily Sales</span>
            <span className="fw-bold">{(formData.totalSoldQty / 30 || 0).toFixed(1)} Units/Day</span>
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="p-4 bg-light rounded-4 border-0 h-100 shadow-sm">
          <h6 className="fw-bold mb-3 d-flex align-items-center">
            <PieChart size={18} className="me-2 text-info"/> History & Timing
          </h6>
          <div className="d-flex justify-content-between align-items-center p-3 bg-white rounded-3 mb-2 shadow-xs">
            <span className="small text-muted fw-bold text-uppercase">First Sale Date</span>
            <span className="fw-bold">{formData.firstSoldDate || "—"}</span>
          </div>
          <div className="d-flex justify-content-between align-items-center p-3 bg-white rounded-3 shadow-xs">
            <span className="small text-muted fw-bold text-uppercase">Last Order On</span>
            <span className="fw-bold text-primary">
              <Calendar size={14} className="me-1"/> {formData.lastSoldDate || "No Sales"}
            </span>
          </div>
        </div>
      </div>

      {/* --- PRO TIP: READ ONLY ALERT --- */}
      <div className="col-12">
        <div className="p-3 bg-soft-info border-0 rounded-3 d-flex align-items-center shadow-xs">
          <Info size={18} className="text-info me-3" />
          <span className="small text-muted">
            <b>Analytics Note:</b> These metrics are automatically calculated from POS transactions and cannot be edited manually.
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsInfo;