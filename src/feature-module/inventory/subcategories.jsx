import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CommonFooter from "../../components/footer/commonFooter";
import PrimeDataTable from "../../components/data-table";
import TableTopHead from "../../components/table-top-head";
import SearchFromApi from "../../components/data-table/search";
import useAppModal from "../../core/common/modal/useAppModal";
import { MODAL_TYPES } from "../../routes/modal_root/modalTypes";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import { api_url } from "../../environment";
import { formatDate } from "../../utils/common";

const SubCategories = () => {
  const [loading, setLoading] = useState(false);
  const { open } = useAppModal();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, _setTotalRecords] = useState(5);
  const [rows, setRows] = useState(10);
  const [_searchQuery, setSearchQuery] = useState(undefined);
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [filteredData, setFilteredData] = useState(setSubCategories);

  useEffect(() => {
    fetchsubcategories();
    // fetchCategories();
  }, []);

  const fetchsubcategories = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${api_url}/GetMaster?masterType=4`);
      const json = await res.json();

      console.log("json", json);

      const formattedData = json?.data.map((row) => ({
        image: row.image,
        parentGrpName: row.parentGrpName,
        parentGrpCode: row.parentGrpCode,
        code: row.code,
        name: row.name,
        alias: row.alias,
        remark: row.remark,
        createdon: row.createdOn,
        status: row.deactive ? "Inactive" : "Active",
      }));
      setSubCategories(formattedData);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${api_url}/GetMaster?masterType=5`);
      const json = await res.json();

      const formatted = json?.data.map((item) => ({
        label: item.name,
        value: item.code,
      }));

      setCategories(formatted);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const columns = [
    {
      field: "name",
      header: "Sub Category",
      key: "name",
      sortable: true,
      body: (rowData) => (
        <>
          <span className="productimgname">
            <Link to="#" className="product-img stock-img">
              <img alt="" src={rowData.image} />
            </Link>
            <span>{rowData.name}</span>
          </span>
        </>
      ),
    },
    {
      field: "parentGrpName",
      header: "Category",
      key: "parentGrpName",
      sortable: true,
    },
    {
      field: "parentGrpCode",
      header: "Category Code",
      key: "parentGrpCode",
      sortable: true,
    },
    {
      field: "remark",
      header: "Description",
      key: "remark",
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
      field: "status",
      header: "Status",
      key: "status",
      sortable: true,
      body: (rowData) => (
        <span className="badge bg-success fw-medium fs-10">
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
              open(MODAL_TYPES.SUBCATEGORY, {
                data: _row,
                onSuccess: fetchsubcategories,
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

  return (
    <>
      {loading && <Loader loading={loading} />}
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4 className="fw-bold">Sub Category</h4>
                <h6>Manage your sub categories</h6>
              </div>
            </div>
            <TableTopHead />
            <div className="page-btn">
              <Link
                className="btn btn-primary"
                onClick={() =>
                  open(MODAL_TYPES.SUBCATEGORY, {
                    data: null,
                    onSuccess: fetchsubcategories,
                  })
                }
              >
                <i className="ti ti-circle-plus me-1"></i> Add Sub Category
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
                    {selectedCategory?.label || "Category"}
                  </Link>
                  {categories.map((item, index) => (
                    <ul className="dropdown-menu dropdown-menu-end p-3">
                      <li key={index}>
                        <Link
                          to="#"
                          className="dropdown-item rounded-1"
                          onClick={() => setSelectedCategory(item)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    </ul>
                  ))}
                </div>

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
              <div className="table-responsive sub-category-table">
                <PrimeDataTable
                  column={columns}
                  data={subCategories}
                  searchQuery={_searchQuery}
                  rows={rows}
                  setRows={setRows}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalRecords={totalRecords}
                  selectionMode="checkbox"
                  selection={selectedSubcategories}
                  onSelectionChange={(e) => setSelectedSubcategories(e.value)}
                  dataKey="id"
                />
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
        <CommonFooter />
      </div>
    </>
  );
};

export default SubCategories;
