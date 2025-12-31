import React, { useEffect, useState } from "react";
import {
  Calendar,
  ChevronUp,
  Clock,
  RotateCcw,
} from "feather-icons-react/build/IconComponents";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import Chart from "react-apexcharts";
import { all_routes } from "../../Router/all_routes";
import PredefinedDateRanges from "../../core/common/range-picker/datePicker";
import RefreshIcon from "../../core/common/tooltip-content/refresh";
import CollapesIcon from "../../core/common/tooltip-content/collapes";
import DashboardSummary from "../../pages/SalesDashboard/sections/DashboardSummary";
import { dashboardCardSummary } from "../../services/service";
import { toast } from "react-toastify";
import Loader from "../../components/loader/loader";

const SalesDashbaord = () => {
  const [loading, setLoading] = useState(false);
  const [cardSummary, setCardSummary] = useState(null);
  const route = all_routes;
  const options = {
    series: [
      {
        name: "Sales Analysis",
        data: [25, 30, 18, 15, 22, 20, 30, 20, 22, 18, 15, 20],
      },
    ],
    chart: {
      height: 273,
      type: "area",
      zoom: {
        enabled: false,
      },
    },
    colors: ["#FF9F43"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "",
      align: "left",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      min: 10,
      max: 60,
      tickAmount: 5,
      labels: {
        formatter: (val) => {
          return val / 1 + "K";
        },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
  };

  useEffect(() => {
    getDashboardCardSummary();
  }, []);

  const getDashboardCardSummary = async (e) => {
    if (e) e.preventDefault();

    setLoading(true);
    try {
      const resp = await dashboardCardSummary();
      const row = resp?.data[0] || [];
      const summary = {
        totalSale: row?.totalSale || 0,
        totalPurchase: row?.totalPurchase || 0,
        totalPaid: row?.totalPaid || 0,
        totalUnpaid: row?.totalUnpaid || 0,
      };
      setCardSummary(summary);
    } catch (err) {
      toast.error(`API error: ${err?.message}`);
    } finally {
      setLoading(false);
    }
  };

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

  const customerChart = {
    chart: {
      type: "radialBar",
      height: 130,
      width: "100%",
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 10,
          size: "30%",
        },
        track: {
          background: "#E6EAED",
          strokeWidth: "100%",
          margin: 5,
        },
        dataLabels: {
          name: {
            offsetY: -5,
          },
          value: {
            offsetY: 5,
          },
        },
      },
    },
    grid: {
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
    stroke: {
      lineCap: "round",
    },
    colors: ["#E04F16", "#0E9384"],
    labels: ["First Time", "Return"],
  };

  const series = [70, 70];

  return (
    <>
      {loading && <Loader />}
      <div className="page-wrapper">
        <div className="content">
          <div className="welcome d-lg-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center welcome-text">
              <h3 className="d-flex align-items-center">
                <ImageWithBasePath src="assets/img/icons/hi.svg" alt="img" />
                &nbsp;Hi Symbiosis Canteen,
              </h3>
              &nbsp;
              <h6>here&apos;s what&apos;s happening with your store today.</h6>
            </div>
            <div className="d-flex align-items-center">
              <div className="input-icon-start position-relative me-2">
                <span className="input-icon-addon fs-16 text-gray-9">
                  <i className="ti ti-calendar" />
                </span>
                <PredefinedDateRanges />
              </div>
              <ul className="table-top-head">
                <RefreshIcon />
                <CollapesIcon />
              </ul>
            </div>
          </div>
          <div className="row sales-cards">
            <DashboardSummary
              summary={cardSummary}
              onRefresh={getDashboardCardSummary}
            />
          </div>
          <div className="row">
            <>
              {/* Sales & Purchase */}
              <div className="col-xxl-8 col-xl-7 col-sm-12 col-12 d-flex">
                <div className="card flex-fill">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <div className="d-inline-flex align-items-center">
                      <span className="title-icon bg-soft-primary fs-16 me-2">
                        <i className="ti ti-shopping-cart" />
                      </span>
                      <h5 className="card-title mb-0">Sales &amp; Purchase</h5>
                    </div>
                    <ul className="nav btn-group custom-btn-group">
                      <Link className="btn btn-outline-light" to="#">
                        1D
                      </Link>
                      <Link className="btn btn-outline-light" to="#">
                        1W
                      </Link>
                      <Link className="btn btn-outline-light" to="#">
                        1M
                      </Link>
                      <Link className="btn btn-outline-light" to="#">
                        3M
                      </Link>
                      <Link className="btn btn-outline-light" to="#">
                        6M
                      </Link>
                      <Link className="btn btn-outline-light active" to="#">
                        1Y
                      </Link>
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
                          <h4>3K</h4>
                        </div>
                        <div className="border p-2 br-8">
                          <p className="d-inline-flex align-items-center mb-1">
                            <i className="ti ti-circle-filled fs-8 text-primary me-1" />
                            Total Sales
                          </p>
                          <h4>1K</h4>
                        </div>
                      </div>
                      <div id="sales-daychart">
                        <Chart
                          options={salesDayChart}
                          series={salesDayChart.series}
                          type="bar"
                          height={245}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>

            {/* Top Selling Products */}
            <div className="col-xxl-4 col-xl-5 d-flex">
              <div className="card flex-fill">
                <div className="card-header">
                  <div className="d-inline-flex align-items-center">
                    <span className="title-icon bg-soft-info fs-16 me-2">
                      <i className="ti ti-info-circle" />
                    </span>
                    <h5 className="card-title mb-0">Overall Information</h5>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-4">
                      <div className="info-item border bg-light p-3 text-center">
                        <div className="mb-3 text-info fs-24">
                          <i className="ti ti-user-check" />
                        </div>
                        <p className="mb-1">Suppliers</p>
                        <h5>6987</h5>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="info-item border bg-light p-3 text-center">
                        <div className="mb-3 text-orange fs-24">
                          <i className="ti ti-users" />
                        </div>
                        <p className="mb-1">Customer</p>
                        <h5>4896</h5>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="info-item border bg-light p-3 text-center">
                        <div className="mb-3 text-teal fs-24">
                          <i className="ti ti-shopping-cart" />
                        </div>
                        <p className="mb-1">Orders</p>
                        <h5>487</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer pb-sm-0">
                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                    <h6>Customers Overview</h6>
                    <div className="dropdown dropdown-wraper">
                      <Link
                        to="#"
                        className="dropdown-toggle btn btn-sm"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="ti ti-calendar me-1" />
                        Today
                      </Link>
                      <ul className="dropdown-menu p-3">
                        <li>
                          <Link to="#" className="dropdown-item">
                            Today
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item">
                            Weekly
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item">
                            Monthly
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-sm-5">
                      <div id="customer-chart">
                        <Chart
                          options={customerChart}
                          series={series}
                          type="radialBar"
                          height={130}
                        />
                      </div>
                    </div>
                    <div className="col-sm-7">
                      <div className="row gx-0">
                        <div className="col-sm-6">
                          <div className="text-center border-end">
                            <h2 className="mb-1">5.5K</h2>
                            <p className="text-orange mb-2">First Time</p>
                            <span className="badge badge-success badge-xs d-inline-flex align-items-center">
                              <i className="ti ti-arrow-up-left me-1" />
                              25%
                            </span>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="text-center">
                            <h2 className="mb-1">3.5K</h2>
                            <p className="text-teal mb-2">Return</p>
                            <span className="badge badge-success badge-xs d-inline-flex align-items-center">
                              <i className="ti ti-arrow-up-left me-1" />
                              21%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-12 d-flex">
              <div className="card flex-fill w-100 mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h4 className="card-title mb-0">Recent Transactions</h4>
                  <Link
                    to="purchase-transaction.html"
                    className="btn btn-outline-light btn-sm"
                  >
                    View All
                  </Link>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-borderless recent-transactions">
                      <thead className="thead-light">
                        <tr>
                          <th>#</th>
                          <th>Order Details</th>
                          <th>Payment</th>
                          <th>Status</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                to={route.productlist}
                                className="avatar avatar-lg me-2"
                              >
                                <ImageWithBasePath
                                  src="assets/img/products/stock-img-05.png"
                                  alt="img"
                                />
                              </Link>
                              <div>
                                <h6 className="fw-bold">
                                  <Link
                                    to={route.productlist}
                                    className="fw-bold"
                                  >
                                    Lobar Handy
                                  </Link>
                                </h6>
                                <span className="d-flex align-items-center">
                                  <Clock className="feather-14" />
                                  15 Mins
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="d-block head-text">Paypal</span>
                            <span className="text-blue">#416645453773</span>
                          </td>
                          <td>
                            <span className="badge badge-success badge-xs d-inline-flex align-items-center">
                              <i className="ti ti-circle-filled fs-5 me-1" />
                              Success
                            </span>
                          </td>
                          <td className="fs-16 fw-bold text-gray-9">
                            ₹1,099.00
                          </td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                to={route.productlist}
                                className="avatar avatar-lg me-2"
                              >
                                <ImageWithBasePath
                                  src="assets/img/products/expire-product-01.png"
                                  alt="img"
                                />
                              </Link>
                              <div>
                                <h6 className="fw-medium">
                                  <Link
                                    to={route.productlist}
                                    className="fw-bold"
                                  >
                                    Red Premium Handy
                                  </Link>
                                </h6>
                                <span className="d-flex align-items-center">
                                  <Clock className="feather-14" />
                                  15 Mins
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="d-block head-text">Apple Pay</span>
                            <span className="text-blue">#147784454554</span>
                          </td>
                          <td>
                            <span className="badge badge-danger badge-xs d-inline-flex align-items-center">
                              <i className="ti ti-circle-filled fs-5 me-1" />
                              Cancelled
                            </span>
                          </td>
                          <td className="fs-16 fw-bold text-gray-9">₹600.55</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                to={route.productlist}
                                className="avatar avatar-lg me-2"
                              >
                                <ImageWithBasePath
                                  src="assets/img/products/expire-product-02.png"
                                  alt="img"
                                />
                              </Link>
                              <div>
                                <h6 className="fw-bold">
                                  <Link
                                    to={route.productlist}
                                    className="fw-bold"
                                  >
                                    Iphone 14 Pro
                                  </Link>
                                </h6>
                                <span className="d-flex align-items-center">
                                  <Clock className="feather-14" />
                                  15 Mins
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="d-block head-text">Stripe</span>
                            <span className="text-blue">#147784454554</span>
                          </td>
                          <td>
                            <span className="badge badge-cyan badge-xs d-inline-flex align-items-center">
                              <i className="ti ti-circle-filled fs-5 me-1" />
                              Completed
                            </span>
                          </td>
                          <td className="fs-16 fw-bold text-gray-9">
                            ₹1,099.00
                          </td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                to={route.productlist}
                                className="avatar avatar-lg me-2"
                              >
                                <ImageWithBasePath
                                  src="assets/img/products/expire-product-03.png"
                                  alt="img"
                                />
                              </Link>
                              <div>
                                <h6 className="fw-bold">
                                  <Link
                                    to={route.productlist}
                                    className="fw-bold"
                                  >
                                    Black Slim 200
                                  </Link>
                                </h6>
                                <span className="d-flex align-items-center">
                                  <Clock className="feather-14" />
                                  15 Mins
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="d-block head-text">PayU</span>
                            <span className="text-blue">#147784454554</span>
                          </td>
                          <td>
                            <span className="badge badge-success badge-xs d-inline-flex align-items-center">
                              <i className="ti ti-circle-filled fs-5 me-1" />
                              Success
                            </span>
                          </td>
                          <td className="fs-16 fw-bold text-gray-9">
                            ₹1,569.00
                          </td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Link
                                to={route.productlist}
                                className="avatar avatar-lg me-2"
                              >
                                <ImageWithBasePath
                                  src="assets/img/products/expire-product-04.png"
                                  alt="img"
                                />
                              </Link>
                              <div>
                                <h6 className="fw-bold">
                                  <Link
                                    to={route.productlist}
                                    className="fw-bold"
                                  >
                                    Woodcraft Sandal
                                  </Link>
                                </h6>
                                <span className="d-flex align-items-center">
                                  <Clock className="feather-14" />
                                  15 Mins
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="d-block head-text">Paytm</span>
                            <span className="text-blue">#147784454554</span>
                          </td>
                          <td>
                            <span className="badge badge-success badge-xs d-inline-flex align-items-center">
                              <i className="ti ti-circle-filled fs-5 me-1" />
                              Success
                            </span>
                          </td>
                          <td className="fs-16 fw-bold text-gray-9">
                            ₹1,478.00
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Button trigger modal */}
          <div className="row sales-board">
            <div className="col-md-12 col-lg-7 col-sm-12 col-12 d-flex">
              <div className="card flex-fill flex-fill">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">Sales Analytics</h5>
                  <div className="graph-sets">
                    <div className="dropdown dropdown-wraper">
                      <button
                        className="btn btn-white btn-sm dropdown-toggle d-flex align-items-center"
                        type="button"
                        id="dropdown-sales"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <Calendar className="feather-14" />
                        2023
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdown-sales"
                      >
                        <li>
                          <Link to="#" className="dropdown-item">
                            2023
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item">
                            2022
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item">
                            2021
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card-body pt-1 pb-0">
                  <Chart
                    options={options}
                    series={options.series}
                    type="area"
                    height={273}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-5 col-sm-12 col-12 d-flex">
              {/* World Map */}
              <div className="card flex-fill">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">Sales by Countries</h5>
                  <div className="graph-sets">
                    <div className="dropdown dropdown-wraper">
                      <button
                        className="btn btn-white btn-sm dropdown-toggle d-flex align-items-center"
                        type="button"
                        id="dropdown-country-sales"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        This Week
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdown-country-sales"
                      >
                        <li>
                          <Link to="#" className="dropdown-item">
                            This Month
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item">
                            This Year
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div id="sales_db_world_map" style={{ height: "265px" }}>
                    <iframe
                      src="https://www.google.com/maps/embed"
                      style={{ border: "0", height: "265px", width: "364px" }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="contact-map"
                    />
                  </div>
                  <p className="sales-range">
                    <span className="text-success">
                      <ChevronUp className="feather-16" />
                      48%&nbsp;
                    </span>
                    increase compare to last week
                  </p>
                </div>
              </div>
              {/* /World Map */}
            </div>
          </div>
        </div>
        <div className="copyright-footer d-flex align-items-center justify-content-between border-top bg-white gap-3 flex-wrap">
          <p className="fs-13 text-gray-9 mb-0">
            2014-2025 © DreamsPOS. All Right Reserved
          </p>
          <p>
            Designed &amp; Developed By Dreams{" "}
            <Link to="#" className="link-primary">
              Dreams
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SalesDashbaord;
