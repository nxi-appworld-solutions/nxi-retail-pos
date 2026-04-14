import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import EditCategoryList from "../../core/modals/inventory/editcategorylist";
import CommonFooter from "../../components/footer/commonFooter";
import PrimeDataTable from "../../components/data-table";
import TableTopHead from "../../components/table-top-head";
import DeleteModal from "../../components/delete-modal";
import SearchFromApi from "../../components/data-table/search";
import { MODAL_TYPES } from "../../routes/modal_root/modalTypes";
import useAppModal from "../../core/common/modal/useAppModal";
import { api_url } from "../../environment";
import { formatDate } from "../../utils/common";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const { open } = useAppModal();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, _setTotalRecords] = useState(5);
  const [rows, setRows] = useState(10);
  const [_searchQuery, setSearchQuery] = useState(undefined);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    setCurrentPage(1);
  }, [_searchQuery]);

  const columns = [
    {
      header: "Category",
      field: "category",
      key: "category",
      sortable: true,
    },
    {
      header: "Category Slug",
      field: "categoryslug",
      key: "categoryslug",
      sortable: true,
    },
    {
      header: "Created On",
      field: "createdon",
      key: "createdon",
      sortable: true,
      body: (data) => <div>{formatDate(data.createdon)}</div>,
    },
    {
      header: "Status",
      field: "status",
      key: "status",
      sortable: true,
      body: (data) => (
        <span className="badge bg-success fw-medium fs-10">{data.status}</span>
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
            onClick={() =>
              open(MODAL_TYPES.CATEGORY, {
                data: _row,
                onSuccess: fetchCategories,
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
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${api_url}/GetMaster?masterType=5`);
      const json = await res.json();

      const formattedData = json?.data.map((category) => ({
        code: category.code,
        category: category.name,
        categoryslug: category.alias,
        createdon: category.createdOn,
        status: category.status ? "Inactive" : "Active",
      }));

      setCategories(formattedData);
    } catch (error) {
      toast.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader loading={loading} />}
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4 className="fw-bold">Category</h4>
                <h6>Manage your categories</h6>
              </div>
            </div>
            <TableTopHead />
            <div className="page-btn">
              <Link
                className="btn btn-primary"
                onClick={() =>
                  open(MODAL_TYPES.CATEGORY, {
                    data: null,
                    onSuccess: fetchCategories,
                  })
                }
              >
                <i className="ti ti-circle-plus me-1"></i>
                Add Category
              </Link>
            </div>
          </div>
          {/* /product list */}
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
                <div className="dropdown">
                  <Link
                    to="#"
                    className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
                    data-bs-toggle="dropdown"
                  >
                    Sort By : Last 7 Days
                  </Link>
                  <ul className="dropdown-menu  dropdown-menu-end p-3">
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Recently Added
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Ascending
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Desending
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Last Month
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Last 7 Days
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive category-table">
                <PrimeDataTable
                  column={columns}
                  data={categories}
                  searchQuery={_searchQuery}
                  rows={rows}
                  setRows={setRows}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalRecords={totalRecords}
                  selectionMode="checkbox"
                  selection={selectedCategories}
                  onSelectionChange={(e) => setSelectedCategories(e.value)}
                  dataKey="id"
                  // onRowClick={(e) => {
                  //   if (e.originalEvent.target.type === "checkbox") return;
                  //   setSelectedRow(e.data);
                  //   open(MODAL_TYPES.CATEGORY, { data: e.data });
                  // }}
                />
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
        <CommonFooter />
      </div>

      <EditCategoryList />
      <DeleteModal />
    </div>
  );
};

export default CategoryList;
