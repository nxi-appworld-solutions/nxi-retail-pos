import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CommonFooter from "../../components/footer/commonFooter";
import PrimeDataTable from "../../components/data-table";
import TableTopHead from "../../components/table-top-head";
import CommonSelect from "../../components/select/common-select";
import DeleteModal from "../../components/delete-modal";
import SearchFromApi from "../../components/data-table/search";
import useAppModal from "../../core/common/modal/useAppModal";
import { MODAL_TYPES } from "../../routes/modal_root/modalTypes";
import toast from "react-hot-toast";
import { api_url } from "../../environment";
import Loader from "../../components/loader/Loader";

const Warranty = () => {
  const { open } = useAppModal();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, _setTotalRecords] = useState(5);
  const [rows, setRows] = useState(10);
  const [_searchQuery, setSearchQuery] = useState(undefined);
  const [selectedWarranties, setSelectedWarranties] = useState([]);
  const [warranties, setWarehouses] = useState([]);

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const dataSource = useSelector((state) => state.rootReducer.warranty_data);

  const columns = [
    {
      field: "name",
      header: "Name",
      key: "name",
      sortable: true,
    },
    {
      field: "description",
      header: "Description",
      key: "description",
      sortable: true,
    },
    {
      field: "duration",
      header: "Duration",
      key: "duration",
      sortable: true,
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
              open(MODAL_TYPES.WARRANTY, {
                data: _row,
                onSuccess: fetchWarranty,
              })
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

  useEffect(() => {
    fetchWarranty();
  }, []);

  const fetchWarranty = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${api_url}/GetMaster?masterType=12`);
      const json = await res.json();

      // console.log("Warehouse data:", json);

      const formattedData = json?.data?.map((row) => ({
        code: row.code,
        name: row.name,
        contactPerson: row.c1,
        createdOn: row.createdOn,
        status: row.deactive === 1 ? "Inactive" : "Active",
      }));

      console.log("Formatted Warranty data:", formattedData);

      setWarehouses(formattedData);
    } catch (error) {
      toast.error("Error fetching warranties:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader loading />}
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4 className="fw-bold">Warranties</h4>
                <h6>Manage your warranties</h6>
              </div>
            </div>
            <TableTopHead />
            <div className="page-btn">
              <Link
                to="#"
                className="btn btn-primary"
                onClick={() =>
                  open(MODAL_TYPES.WARRANTY, {
                    data: null,
                    onSuccess: () => {},
                  })
                }
              >
                <i className="ti ti-circle-plus me-1"></i> Add Warranty
              </Link>
            </div>
          </div>
          {/* /product list */}
          <div className="card table-list-card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
              <SearchFromApi
                callback={handleSearch}
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
                  data={dataSource}
                  rows={rows}
                  setRows={setRows}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalRecords={totalRecords}
                  selectionMode="checkbox"
                  selection={selectedWarranties}
                  onSelectionChange={(e) => setSelectedWarranties(e.value)}
                  dataKey="id"
                />
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
        <CommonFooter />
      </div>
      {/* /Edit Warranty */}
      <DeleteModal />
    </>
  );
};

export default Warranty;

