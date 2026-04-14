import { useEffect, useState } from "react";
import { Link } from "react-router";
import CommonFooter from "../../components/footer/commonFooter";
import PrimeDataTable from "../../components/data-table";
import TableTopHead from "../../components/table-top-head";
import SearchFromApi from "../../components/data-table/search";
import DeleteModal from "../../components/delete-modal";
import useAppModal from "../../core/common/modal/useAppModal";
import { api_url } from "../../environment";
import toast from "react-hot-toast";
import { MODAL_TYPES } from "../../routes/modal_root/modalTypes";
import Loader from "../../components/loader/Loader";
import { formatDate } from "../../utils/common";

const Warehouse = () => {
  const { open } = useAppModal();
  const [loading, setLoading] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, _setTotalRecords] = useState(5);
  const [rows, setRows] = useState(10);
  const [_searchQuery, setSearchQuery] = useState(undefined);
  const [selectedWarehouses, setSelectedWarehouses] = useState([]);

  const columns = [
    { header: "Warehouse", field: "name", key: "warehouse" },
    {
      header: "Contact Person",
      field: "contactPerson",
      key: "contactPerson",
      body: (data) => (
        <div className="d-flex align-items-center">
          {/* <Link to="#" className="avatar avatar-md">
            <img src={data.avatar} className="img-fluid rounded-2" alt="img" />
          </Link> */}
          <div className="ms-2">
            <p className="mb-0">
              <Link to="#" className="text-default">
                {data.contactPerson}
              </Link>
            </p>
          </div>
        </div>
      ),
    },
    { header: "Phone", field: "phone", key: "phone" },
    {
      header: "Total Products",
      field: "totalProducts",
      key: "totalProducts",
      body: (data) => <div>{data.totalProducts || 0}</div>,
    },
    {
      header: "Stock",
      field: "stock",
      key: "stock",
      body: (data) => <div>{data.stock || 0}</div>,
    },
    {
      header: "Qty",
      field: "qty",
      key: "qty",
      body: (data) => <div>{data.qty || 0}</div>,
    },
    {
      header: "Created On",
      field: "createdOn",
      key: "createdOn",
      body: (data) => <div>{formatDate(data.createdOn)}</div>,
    },
    {
      header: "Status",
      field: "status",
      key: "status",
      body: (data) => (
        <span className="badge badge-success d-inline-flex align-items-center badge-xs">
          <i className="ti ti-point-filled me-1"></i>
          {data.status}
        </span>
      ),
    },
    {
      header: "",
      field: "actions",
      key: "actions",
      sortable: false,
      body: (_row) => (
        <div className="edit-delete-action">
          <Link
            className="me-2 p-2 d-flex align-items-center border rounded"
            to="#"
          >
            <i className="feather icon-eye"></i>
          </Link>
          <Link
            className="me-2 p-2 d-flex align-items-center border rounded"
            to="#"
            onClick={() =>
              open(MODAL_TYPES.WAREHOUSE, {
                data: _row,
                onSuccess: () => fetchWarehouse(),
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
    fetchWarehouse();
  }, []);

  const fetchWarehouse = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${api_url}/GetMaster?masterType=12`);
      const json = await res.json();

      console.log("Warehouse data:", json);

      const formattedData = json?.data?.map((row) => ({
        code: row.code,
        name: row.name,
        contactPerson: row.c1,
        email: row.c3,
        phone: row.c4,
        address: row.c5,
        city: row.cM1,
        state: row.cM2,
        country: row.cM3,
        postalcode: row.cM4,
        createdOn: row.createdOn,
        status: row.deactive === 1 ? "Inactive" : "Active",
      }));

      console.log("Formatted Warehouse data:", formattedData);

      setWarehouses(formattedData);
    } catch (error) {
      toast.error("Error fetching categories:", error);
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
                <h4>Warehouses</h4>
                <h6>Manage your warehouses</h6>
              </div>
            </div>
            <TableTopHead />
            <div className="page-btn">
              <Link
                to="#"
                className="btn btn-primary"
                onClick={() =>
                  open(MODAL_TYPES.WAREHOUSE, {
                    data: null,
                    onSuccess: () => fetchWarehouse(),
                  })
                }
              >
                <i className="ti ti-circle-plus me-1" />
                Add Warehouse
              </Link>
            </div>
          </div>
          {/* /product list */}
          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
              <SearchFromApi
                callback={(e) => setSearchQuery(e)}
                rows={rows}
                setRows={setRows}
              />

              <div className="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                <div className="dropdown">
                  <Link
                    to="#"
                    className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
                    data-bs-toggle="dropdown"
                  >
                    Status
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-end p-3">
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
            <div className="card-body p-0">
              <div className="table-responsive">
                <PrimeDataTable
                  column={columns}
                  data={warehouses}
                  searchQuery={_searchQuery}
                  rows={rows}
                  setRows={setRows}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalRecords={totalRecords}
                  selectionMode="checkbox"
                  selection={selectedWarehouses}
                  onSelectionChange={(e) => setSelectedWarehouses(e.value)}
                  dataKey="id"
                />
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
        <CommonFooter />
      </div>
      {/* /Edit Warehouse */}
      <DeleteModal />
    </>
  );
};

export default Warehouse;
