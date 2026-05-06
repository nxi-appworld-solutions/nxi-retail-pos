/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Tooltip } from "antd";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Edit, Eye, Trash2 } from "lucide-react";
import usePos from "../../../../hooks/usePos";
import { closeModal } from "../../../../core/redux/store/modalSlice";
import ImageWithBasePath from "../../../../core/img/imagewithbasebath";
import TooltipIcons from "../../../../core/common/tooltip-content/tooltipIcons";

const RecentTransactionsModal = ({ isOpen = true }) => {
  const dispatch = useDispatch();
  const { fetchTransactions } = usePos();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   load();
  // }, []);

  // const load = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await fetchTransactions();
  //     setTransactions(res || []);
  //   } catch (err) {
  //     toast.error("Failed to load transactions");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-backdrop fade show" />
      <div
        className="modal fade show d-block"
        role="dialog"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header bg-secondary text-white">
              <h5 className="modal-title text-white">Recent Transactions</h5>
              <button
                type="button"
                className="modal-close-btnx"
                aria-label="Close"
                onClick={() => dispatch(closeModal("recentTransactions"))}
              >
                ✖
              </button>
            </div>
            <div className="modal-body">
              <div className="tabs-sets">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="purchase-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#purchase"
                      type="button"
                      aria-controls="purchase"
                      aria-selected="true"
                      role="tab"
                    >
                      Purchase
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="payment-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#payment"
                      type="button"
                      aria-controls="payment"
                      aria-selected="false"
                      role="tab"
                    >
                      Payment
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="return-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#return"
                      type="button"
                      aria-controls="return"
                      aria-selected="false"
                      role="tab"
                    >
                      Return
                    </button>
                  </li>
                </ul>
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="purchase"
                    role="tabpanel"
                    aria-labelledby="purchase-tab"
                  >
                    <div className="card table-list-card mb-0">
                      <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                        <div className="search-set">
                          <div className="search-input">
                            <Link to="#" className="btn btn-searchset">
                              <i className="ti ti-search fs-14 feather-search" />
                            </Link>
                            <div
                              id="DataTables_Table_0_filter"
                              className="dataTables_filter"
                            >
                              <label>
                                {" "}
                                <input
                                  type="search"
                                  className="form-control form-control-sm"
                                  placeholder="Search"
                                  aria-controls="DataTables_Table_0"
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                        <ul className="table-top-head">
                          <TooltipIcons />
                          <li>
                            <Tooltip title="Print">
                              <Link
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Print"
                              >
                                <i className="ti ti-printer" />
                              </Link>
                            </Tooltip>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body">
                        <div className="custom-datatable-filter table-responsive">
                          <table className="table datatable">
                            <thead>
                              <tr>
                                <th className="no-sort">
                                  <label className="checkboxs">
                                    <input
                                      type="checkbox"
                                      className="select-all"
                                    />
                                    <span className="checkmarks" />
                                  </label>
                                </th>
                                <th>Customer</th>
                                <th>Reference</th>
                                <th>Date</th>
                                <th>Amount </th>
                                <th className="no-sort">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                  </label>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <Link
                                      to="#"
                                      className="avatar avatar-md me-2"
                                    >
                                      <ImageWithBasePath
                                        src="assets/img/users/user-27.jpg"
                                        alt="product"
                                      />
                                    </Link>
                                    <Link to="#">Carl Evans</Link>
                                  </div>
                                </td>
                                <td>INV/SL0101</td>
                                <td>24 Dec 2024</td>
                                <td>$1000</td>
                                <td className="action-table-data">
                                  <div className="edit-delete-action">
                                    <Link className="me-2 edit-icon p-2" to="#">
                                      <Eye className="feather-eye" />
                                    </Link>
                                    <Link className="me-2 p-2" to="#">
                                      <Edit className="feather-edit" />
                                    </Link>
                                    <Link className="p-2" to="#">
                                      <Trash2 className="feather-trash-2" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                  </label>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <Link
                                      to="#"
                                      className="avatar avatar-md me-2"
                                    >
                                      <ImageWithBasePath
                                        src="assets/img/users/user-02.jpg"
                                        alt="product"
                                      />
                                    </Link>
                                    <Link to="#">Minerva Rameriz</Link>
                                  </div>
                                </td>
                                <td>INV/SL0102</td>
                                <td>10 Dec 2024</td>
                                <td>$1500</td>
                                <td className="action-table-data">
                                  <div className="edit-delete-action">
                                    <Link className="me-2 edit-icon p-2" to="#">
                                      <Eye className="feather-eye" />
                                    </Link>
                                    <Link className="me-2 p-2" to="#">
                                      <Edit className="feather-edit" />
                                    </Link>
                                    <Link className="p-2" to="#">
                                      <Trash2 className="feather-trash-2" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                  </label>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <Link
                                      to="#"
                                      className="avatar avatar-md me-2"
                                    >
                                      <ImageWithBasePath
                                        src="assets/img/users/user-05.jpg"
                                        alt="product"
                                      />
                                    </Link>
                                    <Link to="#">Robert Lamon</Link>
                                  </div>
                                </td>
                                <td>INV/SL0103</td>
                                <td>27 Nov 2024</td>
                                <td>$1500</td>
                                <td className="action-table-data">
                                  <div className="edit-delete-action">
                                    <Link className="me-2 edit-icon p-2" to="#">
                                      <Eye className="feather-eye" />
                                    </Link>
                                    <Link className="me-2 p-2" to="#">
                                      <Edit className="feather-edit" />
                                    </Link>
                                    <Link className="p-2" to="#">
                                      <Trash2 className="feather-trash-2" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                  </label>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <Link
                                      to="#"
                                      className="avatar avatar-md me-2"
                                    >
                                      <ImageWithBasePath
                                        src="assets/img/users/user-22.jpg"
                                        alt="product"
                                      />
                                    </Link>
                                    <Link to="#">Patricia Lewis</Link>
                                  </div>
                                </td>
                                <td>INV/SL0104</td>
                                <td>18 Nov 2024</td>
                                <td>$2000</td>
                                <td className="action-table-data">
                                  <div className="edit-delete-action">
                                    <Link className="me-2 edit-icon p-2" to="#">
                                      <Eye className="feather-eye" />
                                    </Link>
                                    <Link className="me-2 p-2" to="#">
                                      <Edit className="feather-edit" />
                                    </Link>
                                    <Link className="p-2" to="#">
                                      <Trash2 className="feather-trash-2" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                  </label>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <Link
                                      to="#"
                                      className="avatar avatar-md me-2"
                                    >
                                      <ImageWithBasePath
                                        src="assets/img/users/user-03.jpg"
                                        alt="product"
                                      />
                                    </Link>
                                    <Link to="#">Mark Joslyn</Link>
                                  </div>
                                </td>
                                <td>INV/SL0105</td>
                                <td>06 Nov 2024</td>
                                <td>$800</td>
                                <td className="action-table-data">
                                  <div className="edit-delete-action">
                                    <Link className="me-2 edit-icon p-2" to="#">
                                      <Eye className="feather-eye" />
                                    </Link>
                                    <Link className="me-2 p-2" to="#">
                                      <Edit className="feather-edit" />
                                    </Link>
                                    <Link className="p-2" to="#">
                                      <Trash2 className="feather-trash-2" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                  </label>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <Link
                                      to="#"
                                      className="avatar avatar-md me-2"
                                    >
                                      <ImageWithBasePath
                                        src="assets/img/users/user-12.jpg"
                                        alt="product"
                                      />
                                    </Link>
                                    <Link to="#">Marsha Betts</Link>
                                  </div>
                                </td>
                                <td>INV/SL0106</td>
                                <td>25 Oct 2024</td>
                                <td>$750</td>
                                <td className="action-table-data">
                                  <div className="edit-delete-action">
                                    <Link className="me-2 edit-icon p-2" to="#">
                                      <Eye className="feather-eye" />
                                    </Link>
                                    <Link className="me-2 p-2" to="#">
                                      <Edit className="feather-edit" />
                                    </Link>
                                    <Link className="p-2" to="#">
                                      <Trash2 className="feather-trash-2" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                  </label>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <Link
                                      to="#"
                                      className="avatar avatar-md me-2"
                                    >
                                      <ImageWithBasePath
                                        src="assets/img/users/user-06.jpg"
                                        alt="product"
                                      />
                                    </Link>
                                    <Link to="#">Daniel Jude</Link>
                                  </div>
                                </td>
                                <td>INV/SL0107</td>
                                <td>14 Oct 2024</td>
                                <td>$1300</td>
                                <td className="action-table-data">
                                  <div className="edit-delete-action">
                                    <Link className="me-2 edit-icon p-2" to="#">
                                      <Eye className="feather-eye" />
                                    </Link>
                                    <Link className="me-2 p-2" to="#">
                                      <Edit className="feather-edit" />
                                    </Link>
                                    <Link className="p-2" to="#">
                                      <Trash2 className="feather-trash-2" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="payment" role="tabpanel">
                    <div className="card table-list-card mb-0">
                      <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                        <div className="search-set">
                          <div className="search-input">
                            <Link to="#" className="btn btn-searchset">
                              <i className="ti ti-search fs-14 feather-search" />
                            </Link>
                            <div
                              id="DataTables_Table_0_filter"
                              className="dataTables_filter"
                            >
                              <label>
                                {" "}
                                <input
                                  type="search"
                                  className="form-control form-control-sm"
                                  placeholder="Search"
                                  aria-controls="DataTables_Table_0"
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                        <ul className="table-top-head">
                          <TooltipIcons />
                          <li>
                            <Tooltip title="Print">
                              <Link
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Print"
                              >
                                <i className="ti ti-printer" />
                              </Link>
                            </Tooltip>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body">
                        <div className="custom-datatable-filter table-responsive">
                          <table className="table datatable">
                            <thead>
                              <tr>
                                <th className="no-sort">
                                  <label className="checkboxs">
                                    <input
                                      type="checkbox"
                                      className="select-all"
                                    />
                                    <span className="checkmarks" />
                                  </label>
                                </th>
                                <th>Customer</th>
                                <th>Reference</th>
                                <th>Date</th>
                                <th>Amount </th>
                                <th className="no-sort">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                  </label>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <Link
                                      to="#"
                                      className="avatar avatar-md me-2"
                                    >
                                      <ImageWithBasePath
                                        src="assets/img/users/user-27.jpg"
                                        alt="product"
                                      />
                                    </Link>
                                    <Link to="#">Carl Evans</Link>
                                  </div>
                                </td>
                                <td>INV/SL0101</td>
                                <td>24 Dec 2024</td>
                                <td>$1000</td>
                                <td className="action-table-data">
                                  <div className="edit-delete-action">
                                    <Link className="me-2 edit-icon p-2" to="#">
                                      <Eye className="feather-eye" />
                                    </Link>
                                    <Link className="me-2 p-2" to="#">
                                      <Edit className="feather-edit" />
                                    </Link>
                                    <Link className="p-2" to="#">
                                      <Trash2 className="feather-trash-2" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                  </label>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <Link
                                      to="#"
                                      className="avatar avatar-md me-2"
                                    >
                                      <ImageWithBasePath
                                        src="assets/img/users/user-02.jpg"
                                        alt="product"
                                      />
                                    </Link>
                                    <Link to="#">Minerva Rameriz</Link>
                                  </div>
                                </td>
                                <td>INV/SL0102</td>
                                <td>10 Dec 2024</td>
                                <td>$1500</td>
                                <td className="action-table-data">
                                  <div className="edit-delete-action">
                                    <Link className="me-2 edit-icon p-2" to="#">
                                      <Eye className="feather-eye" />
                                    </Link>
                                    <Link className="me-2 p-2" to="#">
                                      <Edit className="feather-edit" />
                                    </Link>
                                    <Link className="p-2" to="#">
                                      <Trash2 className="feather-trash-2" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                  </label>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <Link
                                      to="#"
                                      className="avatar avatar-md me-2"
                                    >
                                      <ImageWithBasePath
                                        src="assets/img/users/user-05.jpg"
                                        alt="product"
                                      />
                                    </Link>
                                    <Link to="#">Robert Lamon</Link>
                                  </div>
                                </td>
                                <td>INV/SL0103</td>
                                <td>27 Nov 2024</td>
                                <td>$1500</td>
                                <td className="action-table-data">
                                  <div className="edit-delete-action">
                                    <Link className="me-2 edit-icon p-2" to="#">
                                      <Eye className="feather-eye" />
                                    </Link>
                                    <Link className="me-2 p-2" to="#">
                                      <Edit className="feather-edit" />
                                    </Link>
                                    <Link className="p-2" to="#">
                                      <Trash2 className="feather-trash-2" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                  </label>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <Link
                                      to="#"
                                      className="avatar avatar-md me-2"
                                    >
                                      <ImageWithBasePath
                                        src="assets/img/users/user-22.jpg"
                                        alt="product"
                                      />
                                    </Link>
                                    <Link to="#">Patricia Lewis</Link>
                                  </div>
                                </td>
                                <td>INV/SL0104</td>
                                <td>18 Nov 2024</td>
                                <td>$2000</td>
                                <td className="action-table-data">
                                  <div className="edit-delete-action">
                                    <Link className="me-2 edit-icon p-2" to="#">
                                      <Eye className="feather-eye" />
                                    </Link>
                                    <Link className="me-2 p-2" to="#">
                                      <Edit className="feather-edit" />
                                    </Link>
                                    <Link className="p-2" to="#">
                                      <Trash2 className="feather-trash-2" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                  </label>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <Link
                                      to="#"
                                      className="avatar avatar-md me-2"
                                    >
                                      <ImageWithBasePath
                                        src="assets/img/users/user-03.jpg"
                                        alt="product"
                                      />
                                    </Link>
                                    <Link to="#">Mark Joslyn</Link>
                                  </div>
                                </td>
                                <td>INV/SL0105</td>
                                <td>06 Nov 2024</td>
                                <td>$800</td>
                                <td className="action-table-data">
                                  <div className="edit-delete-action">
                                    <Link className="me-2 edit-icon p-2" to="#">
                                      <Eye className="feather-eye" />
                                    </Link>
                                    <Link className="me-2 p-2" to="#">
                                      <Edit className="feather-edit" />
                                    </Link>
                                    <Link className="p-2" to="#">
                                      <Trash2 className="feather-trash-2" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                  </label>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <Link
                                      to="#"
                                      className="avatar avatar-md me-2"
                                    >
                                      <ImageWithBasePath
                                        src="assets/img/users/user-12.jpg"
                                        alt="product"
                                      />
                                    </Link>
                                    <Link to="#">Marsha Betts</Link>
                                  </div>
                                </td>
                                <td>INV/SL0106</td>
                                <td>25 Oct 2024</td>
                                <td>$750</td>
                                <td className="action-table-data">
                                  <div className="edit-delete-action">
                                    <Link className="me-2 edit-icon p-2" to="#">
                                      <Eye className="feather-eye" />
                                    </Link>
                                    <Link className="me-2 p-2" to="#">
                                      <Edit className="feather-edit" />
                                    </Link>
                                    <Link className="p-2" to="#">
                                      <Trash2 className="feather-trash-2" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                  </label>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <Link
                                      to="#"
                                      className="avatar avatar-md me-2"
                                    >
                                      <ImageWithBasePath
                                        src="assets/img/users/user-06.jpg"
                                        alt="product"
                                      />
                                    </Link>
                                    <Link to="#">Daniel Jude</Link>
                                  </div>
                                </td>
                                <td>INV/SL0107</td>
                                <td>14 Oct 2024</td>
                                <td>$1300</td>
                                <td className="action-table-data">
                                  <div className="edit-delete-action">
                                    <Link className="me-2 edit-icon p-2" to="#">
                                      <Eye className="feather-eye" />
                                    </Link>
                                    <Link className="me-2 p-2" to="#">
                                      <Edit className="feather-edit" />
                                    </Link>
                                    <Link className="p-2" to="#">
                                      <Trash2 className="feather-trash-2" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="return" role="tabpanel">
                    <div className="card table-list-card mb-0">
                      <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                        <div className="search-set">
                          <div className="search-input">
                            <Link to="#" className="btn btn-searchset">
                              <i className="ti ti-search fs-14 feather-search" />
                            </Link>
                            <div
                              id="DataTables_Table_0_filter"
                              className="dataTables_filter"
                            >
                              <label>
                                {" "}
                                <input
                                  type="search"
                                  className="form-control form-control-sm"
                                  placeholder="Search"
                                  aria-controls="DataTables_Table_0"
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                        <ul className="table-top-head">
                          <TooltipIcons />
                          <li>
                            <Tooltip title="Print">
                              <Link
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Print"
                              >
                                <i className="ti ti-printer" />
                              </Link>
                            </Tooltip>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body">
                        <div className="custom-datatable-filter table-responsive">
                          <table className="table datatable">
                            <thead>
                              <tr>
                                <th className="no-sort">
                                  <label className="checkboxs">
                                    <input
                                      type="checkbox"
                                      className="select-all"
                                    />
                                    <span className="checkmarks" />
                                  </label>
                                </th>
                                <th>Customer</th>
                                <th>Reference</th>
                                <th>Date</th>
                                <th>Amount </th>
                                <th className="no-sort">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                  </label>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <Link
                                      to="#"
                                      className="avatar avatar-md me-2"
                                    >
                                      <ImageWithBasePath
                                        src="assets/img/users/user-27.jpg"
                                        alt="product"
                                      />
                                    </Link>
                                    <Link to="#">Carl Evans</Link>
                                  </div>
                                </td>
                                <td>INV/SL0101</td>
                                <td>24 Dec 2024</td>
                                <td>$1000</td>
                                <td className="action-table-data">
                                  <div className="edit-delete-action">
                                    <Link className="me-2 edit-icon p-2" to="#">
                                      <Eye className="feather-eye" />
                                    </Link>
                                    <Link className="me-2 p-2" to="#">
                                      <Edit className="feather-edit" />
                                    </Link>
                                    <Link className="p-2" to="#">
                                      <Trash2 className="feather-trash-2" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                  </label>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <Link
                                      to="#"
                                      className="avatar avatar-md me-2"
                                    >
                                      <ImageWithBasePath
                                        src="assets/img/users/user-02.jpg"
                                        alt="product"
                                      />
                                    </Link>
                                    <Link to="#">Minerva Rameriz</Link>
                                  </div>
                                </td>
                                <td>INV/SL0102</td>
                                <td>10 Dec 2024</td>
                                <td>$1500</td>
                                <td className="action-table-data">
                                  <div className="edit-delete-action">
                                    <Link className="me-2 edit-icon p-2" to="#">
                                      <Eye className="feather-eye" />
                                    </Link>
                                    <Link className="me-2 p-2" to="#">
                                      <Edit className="feather-edit" />
                                    </Link>
                                    <Link className="p-2" to="#">
                                      <Trash2 className="feather-trash-2" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                  </label>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <Link
                                      to="#"
                                      className="avatar avatar-md me-2"
                                    >
                                      <ImageWithBasePath
                                        src="assets/img/users/user-05.jpg"
                                        alt="product"
                                      />
                                    </Link>
                                    <Link to="#">Robert Lamon</Link>
                                  </div>
                                </td>
                                <td>INV/SL0103</td>
                                <td>27 Nov 2024</td>
                                <td>$1500</td>
                                <td className="action-table-data">
                                  <div className="edit-delete-action">
                                    <Link className="me-2 edit-icon p-2" to="#">
                                      <Eye className="feather-eye" />
                                    </Link>
                                    <Link className="me-2 p-2" to="#">
                                      <Edit className="feather-edit" />
                                    </Link>
                                    <Link className="p-2" to="#">
                                      <Trash2 className="feather-trash-2" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                  </label>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <Link
                                      to="#"
                                      className="avatar avatar-md me-2"
                                    >
                                      <ImageWithBasePath
                                        src="assets/img/users/user-22.jpg"
                                        alt="product"
                                      />
                                    </Link>
                                    <Link to="#">Patricia Lewis</Link>
                                  </div>
                                </td>
                                <td>INV/SL0104</td>
                                <td>18 Nov 2024</td>
                                <td>$2000</td>
                                <td className="action-table-data">
                                  <div className="edit-delete-action">
                                    <Link className="me-2 edit-icon p-2" to="#">
                                      <Eye className="feather-eye" />
                                    </Link>
                                    <Link className="me-2 p-2" to="#">
                                      <Edit className="feather-edit" />
                                    </Link>
                                    <Link className="p-2" to="#">
                                      <Trash2 className="feather-trash-2" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                  </label>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <Link
                                      to="#"
                                      className="avatar avatar-md me-2"
                                    >
                                      <ImageWithBasePath
                                        src="assets/img/users/user-03.jpg"
                                        alt="product"
                                      />
                                    </Link>
                                    <Link to="#">Mark Joslyn</Link>
                                  </div>
                                </td>
                                <td>INV/SL0105</td>
                                <td>06 Nov 2024</td>
                                <td>$800</td>
                                <td className="action-table-data">
                                  <div className="edit-delete-action">
                                    <Link className="me-2 edit-icon p-2" to="#">
                                      <Eye className="feather-eye" />
                                    </Link>
                                    <Link className="me-2 p-2" to="#">
                                      <Edit className="feather-edit" />
                                    </Link>
                                    <Link className="p-2" to="#">
                                      <Trash2 className="feather-trash-2" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                  </label>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <Link
                                      to="#"
                                      className="avatar avatar-md me-2"
                                    >
                                      <ImageWithBasePath
                                        src="assets/img/users/user-12.jpg"
                                        alt="product"
                                      />
                                    </Link>
                                    <Link to="#">Marsha Betts</Link>
                                  </div>
                                </td>
                                <td>INV/SL0106</td>
                                <td>25 Oct 2024</td>
                                <td>$750</td>
                                <td className="action-table-data">
                                  <div className="edit-delete-action">
                                    <Link className="me-2 edit-icon p-2" to="#">
                                      <Eye className="feather-eye" />
                                    </Link>
                                    <Link className="me-2 p-2" to="#">
                                      <Edit className="feather-edit" />
                                    </Link>
                                    <Link className="p-2" to="#">
                                      <Trash2 className="feather-trash-2" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label className="checkboxs">
                                    <input type="checkbox" />
                                    <span className="checkmarks" />
                                  </label>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <Link
                                      to="#"
                                      className="avatar avatar-md me-2"
                                    >
                                      <ImageWithBasePath
                                        src="assets/img/users/user-06.jpg"
                                        alt="product"
                                      />
                                    </Link>
                                    <Link to="#">Daniel Jude</Link>
                                  </div>
                                </td>
                                <td>INV/SL0107</td>
                                <td>14 Oct 2024</td>
                                <td>$1300</td>
                                <td className="action-table-data">
                                  <div className="edit-delete-action">
                                    <Link className="me-2 edit-icon p-2" to="#">
                                      <Eye className="feather-eye" />
                                    </Link>
                                    <Link className="me-2 p-2" to="#">
                                      <Edit className="feather-edit" />
                                    </Link>
                                    <Link className="p-2" to="#">
                                      <Trash2 className="feather-trash-2" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentTransactionsModal;
