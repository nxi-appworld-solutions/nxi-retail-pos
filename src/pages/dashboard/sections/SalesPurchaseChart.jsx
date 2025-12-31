import React, { useState } from "react";
import { Link } from "react-router-dom";
import Chart from "react-apexcharts";
import { formatNumber } from "../../../utils/common";

const SalesPurchaseChart = ({ chartConfig, totals, onRangeChange }) => {
  const salesDayChart = {
    chart: {
      height: 245,
      type: "bar",
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    colors: ["#FE9F43", "#FFE3CB"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        borderRadius: 8,
        borderRadiusWhenStacked: "all",
        horizontal: false,
        endingShape: "rounded",
      },
    },
    series: [
      {
        name: "Sales",
        data: [18, 20, 10, 18, 25, 18, 10, 20, 40, 8, 30, 20],
      },
      {
        name: "Purchase",
        data: [40, 30, 30, 50, 40, 50, 30, 30, 50, 30, 40, 30],
      },
    ],
    xaxis: {
      categories: [
        "2 am",
        "4 am",
        "6 am",
        "8 am",
        "10 am",
        "12 am",
        "14 pm",
        "16 pm",
        "18 pm",
        "20 pm",
        "22 pm",
        "24 pm",
      ],
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "13px",
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (val) => `${val}K`,
        offsetX: -15,
        style: {
          colors: "#6B7280",
          fontSize: "13px",
        },
      },
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 5,
      padding: {
        left: -16,
        top: 0,
        bottom: 0,
        right: 0,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
    },
  };

  const [range, setRange] = useState("1Y");

  const handleRangeChange = (r) => {
    setRange(r);
    if (onRangeChange) onRangeChange(r);
  };

  return (
    <>
      {/* <div className="card flex-fill">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">Sales &amp; Purchase</h5>
          <ul className="nav btn-group custom-btn-group">
            {["1D", "1W", "1M", "3M", "6M", "1Y"].map((v) => (
              <Link
                key={v}
                className={`btn btn-outline-light ${
                  v === "1Y" ? "active" : ""
                }`}
                to="#"
              >
                {v}
              </Link>
            ))}
          </ul>
        </div>
        <div className="card-body">
          <Chart
            options={chartData}
            series={chartData.series}
            type="bar"
            height={245}
          />
        </div>
      </div> */}
      <div className="card flex-fill">
        <div className="card-header d-flex justify-content-between align-items-center">
          <div className="d-inline-flex align-items-center">
            <span className="title-icon bg-soft-primary fs-16 me-2">
              <i className="ti ti-shopping-cart" />
            </span>
            <h5 className="card-title mb-0">Sales &amp; Purchase</h5>
          </div>
          <ul className="nav btn-group custom-btn-group">
            <ul className="nav btn-group custom-btn-group">
              {["1D", "1W", "1M", "3M", "6M", "1Y"].map((v) => (
                <Link
                  key={v}
                  to="#"
                  onClick={() => handleRangeChange(v)}
                  className={`btn btn-outline-light ${
                    v === range ? "active" : ""
                  }`}
                >
                  {v}
                </Link>
              ))}
            </ul>
          </ul>
        </div>
        <div className="card-body pb-0">
          <div>
            <div className="d-flex align-items-center gap-2">
              <div className="border p-2 br-8">
                <p className="d-inline-flex align-items-center mb-1">
                  <i className="ti ti-circle-filled fs-8 text-primary-300 me-1" />
                  Total Purchase
                </p>
                <h4>{formatNumber(totals?.purchase)}</h4>
              </div>
              <div className="border p-2 br-8">
                <p className="d-inline-flex align-items-center mb-1">
                  <i className="ti ti-circle-filled fs-8 text-primary me-1" />
                  Total Sales
                </p>
                <h4>{formatNumber(totals?.sales)}</h4>
              </div>
            </div>
            <div id="sales-daychart">
              <Chart
                options={chartConfig}
                series={chartConfig?.series}
                type="bar"
                height={245}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesPurchaseChart;
