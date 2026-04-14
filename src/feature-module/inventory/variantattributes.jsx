import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CommonFooter from "../../components/footer/commonFooter";
import PrimeDataTable from "../../components/data-table";
import TableTopHead from "../../components/table-top-head";
import DeleteModal from "../../components/delete-modal";
import SearchFromApi from "../../components/data-table/search";
import useAppModal from "../../core/common/modal/useAppModal";
import { MODAL_TYPES } from "../../routes/modal_root/modalTypes";
import { api_url } from "../../environment";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import { formatDate } from "../../utils/common";

const VariantAttributes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, _setTotalRecords] = useState(5);
  const [rows, setRows] = useState(10);
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [Variants, setVariants] = useState([]);
  const [_searchQuery, setSearchQuery] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const { open } = useAppModal();

  useEffect(() => {
    fetchVariant();
  }, []);

  const fetchVariant = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${api_url}/GetMaster?masterType=10`);
      const json = await res.json();

      console.log("json", json);

      const formattedData = json?.data?.map((row) => ({
        code: row.code,
        name: row.name,
        alias: row.alias,
        values: row.values,
        createdon: row.createdOn,
        status: row.status ? "Inactive" : "Active",
      }));

      setVariants(formattedData);
    } catch (error) {
      toast.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    // {
    //   header: (
    //     <label className="checkboxs">
    //       <input type="checkbox" id="select-all" />
    //       <span className="checkmarks" />
    //     </label>
    //   ),

    //   body: () => (
    //     <label className="checkboxs">
    //       <input type="checkbox" />
    //       <span className="checkmarks" />
    //     </label>
    //   ),

    //   sortable: false,
    //   key: "checked",
    // },
    {
      field: "name",
      header: "Variant",
      key: "name",
      sortable: true,
    },
    {
      field: "alias",
      header: "Variant Alias",
      key: "alias",
      sortable: true,
    },
    {
      field: "values",
      header: "Values",
      key: "values",
      sortable: true,
    },
    {
      field: "createdon",
      header: "Created On",
      key: "createdon",
      sortable: true,
      body: (_row) => <span>{formatDate(_row.createdon)}</span>,
    },
    {
      field: "status",
      header: "Status",
      key: "status",
      sortable: true,
      body: (rowData) => (
        <span className="badge table-badge bg-success fw-medium fs-10">
          {rowData.status}
        </span>
      ),
    },
    {
      header: "",
      field: "actions",
      key: "actions",
      sortable: false,
      body: (_row) => (
        <div className="edit-delete-action d-flex align-items-center">
          <Link
            className="me-2 p-2 d-flex align-items-center border rounded"
            to="#"
            onClick={() =>
              open(MODAL_TYPES.VARIANT, { data: _row, onSuccess: fetchVariant })
            }
          >
            <i className="feather icon-edit"></i>
          </Link>
          <Link
            className="p-2 d-flex align-items-center border rounded"
            to="#"
            data-bs-toggle="modal"
            data-bs-target="#delete-modal"
          >
            <i className="feather icon-trash-2"></i>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <>
      {loading && <Loader loader />}
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4 className="fw-bold">Variant Attributes</h4>
                <h6>Manage your variant attributes</h6>
              </div>
            </div>
            <TableTopHead />
            <div className="page-btn">
              <Link
                to="#"
                className="btn btn-primary"
                onClick={() =>
                  open(MODAL_TYPES.VARIANT, {
                    data: null,
                    onSuccess: fetchVariant,
                  })
                }
              >
                <i className="ti ti-circle-plus me-1"></i> Add Variant
              </Link>
            </div>
          </div>
          <div className="card table-list-card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
              <SearchFromApi
                callback={(e) => setSearchQuery(e)}
                rows={rows}
                setRows={setRows}
              />

              <div className="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                <div className="dropdown me-2">
                  <Link
                    to="#"
                    className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
                    data-bs-toggle="dropdown"
                  >
                    Status
                  </Link>
                  <ul className="dropdown-menu  dropdown-menu-end p-3">
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Active
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Inactive
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <PrimeDataTable
                  column={columns}
                  data={Variants}
                  searchQuery={_searchQuery}
                  rows={rows}
                  setRows={setRows}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalRecords={totalRecords}
                  selectionMode="checkbox"
                  selection={selectedVariants}
                  onSelectionChange={(e) => setSelectedVariants(e.value)}
                  dataKey="id"
                />
              </div>
            </div>
          </div>
        </div>
        <CommonFooter />
      </div>

      {/* Add Unit */}
      <div className="modal fade" id="add-units">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header">
                  <div className="page-title">
                    <h4>Add Variant</h4>
                  </div>
                  <button
                    type="button"
                    className="close bg-danger text-white fs-16"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body custom-modal-bodys">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">
                        Variant<span className="text-danger ms-1">*</span>
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        Values<span className="text-danger ms-1">*</span>
                      </label>
                      {/* <ReactTagsInput /> */}
                      <span className="tag-text mt-2 d-flex">
                        Enter value separated by comma
                      </span>
                    </div>
                    <div className="mb-0 mt-4">
                      <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                        <span className="status-label">Status</span>
                        <input
                          type="checkbox"
                          id="user2"
                          className="check"
                          defaultChecked
                        />

                        <label htmlFor="user2" className="checktoggle" />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn me-2 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <Link
                    to="#"
                    className="btn btn-primary fs-13 fw-medium p-2 px-3"
                    data-bs-dismiss="modal"
                  >
                    Add Variant
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Unit */}
      <div className="modal fade" id="edit-units">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header">
                  <div className="page-title">
                    <h4>Edit Variant </h4>
                  </div>
                  <button
                    type="button"
                    className="close bg-danger text-white fs-16"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">
                        Variant<span className="text-danger ms-1">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="Size"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        Values<span className="text-danger ms-1">*</span>
                      </label>
                      {/* <ReactTagsInput /> */}
                      <span className="tag-text mt-2 d-flex">
                        Enter value separated by comma
                      </span>
                    </div>
                    <div className="mb-0 mt-3">
                      <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                        <span className="status-label">Status</span>
                        <input
                          type="checkbox"
                          id="user3"
                          className="check"
                          defaultChecked
                        />

                        <label htmlFor="user3" className="checktoggle" />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn me-2 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <Link
                    to="#"
                    className="btn btn-primary fs-13 fw-medium p-2 px-3"
                    data-bs-dismiss="modal"
                  >
                    Save Changes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeleteModal />
    </>
  );
};

export default VariantAttributes;
