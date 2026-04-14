import { storeListData } from "../../core/json/store-list";
import PrimeDataTable from "../../components/data-table";
import SearchFromApi from "../../components/data-table/search";
import DeleteModal from "../../components/delete-modal";
import TableTopHead from "../../components/table-top-head";
import CommonFooter from "../../components/footer/commonFooter";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { MODAL_TYPES } from "../../routes/modal_root/modalTypes";
import useAppModal from "../../core/common/modal/useAppModal";
import { api_url } from "../../environment";
import Loader from "../../components/loader/Loader";

const StoreList = () => {
  const { open } = useAppModal();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, _setTotalRecords] = useState(5);
  const [rows, setRows] = useState(10);
  const [_searchQuery, setSearchQuery] = useState(undefined);
  const [selectedStores, setSelectedStores] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { header: "Store", field: "name", key: "name" },
    { header: "User Name", field: "username", key: "username" },
    { header: "Email", field: "email", key: "email" },
    { header: "Phone", field: "phone", key: "phone" },
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
        <div className="edit-delete-action d-flex align-items-center">
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
              open(MODAL_TYPES.STORE, {
                data: _row,
                onSuccess: () => fetchStore(),
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
    fetchStore();
  }, []);

  const fetchStore = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${api_url}/GetMaster?masterType=11`);
      const json = await res.json();

      const formattedData = json?.data.map((row) => ({
        code: row.code,
        name: row.name,
        alias: row.alias,
        username: row.c1,
        password: row.c2,
        email: row.c3,
        phone: row.c4,
        createdon: row.createdOn,
        status: row.status ? "Inactive" : "Active",
      }));

      setStores(formattedData);
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
                <h4>Stores</h4>
                <h6>Manage your Store</h6>
              </div>
            </div>
            <TableTopHead />
            <div className="page-btn">
              <Link
                to="#"
                className="btn btn-primary"
                onClick={() =>
                  open(MODAL_TYPES.STORE, {
                    data: null,
                    onSuccess: () => console.log("Store added successfully"),
                  })
                }
              >
                <i className="ti ti-circle-plus me-1" />
                Add Store
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
            <div className="card-body p-0">
              <div className="table-responsive">
                <PrimeDataTable
                  column={columns}
                  data={stores}
                  searchQuery={_searchQuery}
                  rows={rows}
                  setRows={setRows}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalRecords={totalRecords}
                  selectionMode="checkbox"
                  selection={selectedStores}
                  onSelectionChange={(e) => setSelectedStores(e.value)}
                  dataKey="id"
                />
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
        <CommonFooter />
      </div>
      <DeleteModal />
    </>
  );
};

export default StoreList;
