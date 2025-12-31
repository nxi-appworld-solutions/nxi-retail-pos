import React from "react";
import ImageWithBasePath from "../../../core/img/imagewithbasebath";
import { RotateCcw } from "react-feather";

const DashboardSummaryCard = ({
  bgColor = "bg-primary",
  iconImg,
  title = "No of Total Sales",
  count = "₹1,52,45",
  onRefresh,
}) => (
  <>
    <div className="col-xl-3 col-sm-6 col-12 d-flex">
      <div className={`card color-info ${bgColor} flex-fill mb-4 mb-4`}>
        <div className="mb-2">
          <ImageWithBasePath src={iconImg} alt="icon" />
        </div>
        <h3 className="counters" data-count={count}>
          {count}
        </h3>
        <p>{title}</p>
        <RotateCcw
          className="feather feather-rotate-ccw feather-16"
          onClick={onRefresh}
        />
      </div>
    </div>
  </>
);

export default DashboardSummaryCard;
