import React from "react";

const ReportSummaryCard = ({
  borderColor = "orange",
  bgColor = "orange",
  iconClass = "ti ti-moneybag",
  title = "Total Unpaid",
  value = "₹1,52,45",
}) => (
  <div className="col-xl-3 col-sm-6 col-12 d-flex">
    <div className={`card border border-${borderColor} sale-widget flex-fill`}>
      <div className="card-body d-flex align-items-center">
        <span className={`sale-icon bg-${bgColor} text-white`}>
          <i className={`${iconClass} fs-24`} />
        </span>
        <div className="ms-2">
          <p className="fw-medium mb-1">{title}</p>
          <div>
            <h3>{value}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ReportSummaryCard;
