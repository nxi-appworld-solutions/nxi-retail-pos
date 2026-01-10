import React from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../core/img/imagewithbasebath";
import { all_routes } from "../../../Router/all_routes";
import { Clock } from "react-feather";
import DataTable from "../../../components/data-table/DataTable";
import { Table } from "antd";

const RecentTransactions = ({ columns, dataSource }) => {
  return (
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
            <Table columns={columns} dataSource={dataSource} />
            {/* <table className="table table-borderless recent-transactions">
              <thead>
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
                          <Link to={route.productlist} className="fw-bold">
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
                  <td className="fs-16 fw-bold text-gray-9">₹1,099.00</td>
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
                          <Link to={route.productlist} className="fw-bold">
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
                          <Link to={route.productlist} className="fw-bold">
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
                  <td className="fs-16 fw-bold text-gray-9">₹1,099.00</td>
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
                          <Link to={route.productlist} className="fw-bold">
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
                  <td className="fs-16 fw-bold text-gray-9">₹1,569.00</td>
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
                          <Link to={route.productlist} className="fw-bold">
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
                  <td className="fs-16 fw-bold text-gray-9">₹1,478.00</td>
                </tr>
              </tbody>
            </table> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions;
