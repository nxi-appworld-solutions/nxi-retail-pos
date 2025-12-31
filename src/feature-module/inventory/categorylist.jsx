import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CommonFooter from "../../core/common/footer/commonFooter";
import CommonDeleteModal from "../../core/common/modal/commonDeleteModal";
import CommonTable from "../../core/common/table/commonTable";
import TableTopFilter from "../../core/common/table/tableTopFilter";
import AddCategorys from "../../components/modals/addCategory";
import CommonTableHeader from "../../core/common/table/tableHeader";

const CategoryList = () => {
  const dataSource = useSelector(
    (state) => state.rootReducer.categotylist_data
  );

  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => a.category.length - b.category.length,
    },
    {
      title: "Category Slug",
      dataIndex: "categoryslug",
      sorter: (a, b) => a.categoryslug.length - b.categoryslug.length,
    },
    {
      title: "Created On",
      dataIndex: "createdon",
      sorter: (a, b) => a.createdon.length - b.createdon.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => (
        <span className="badge bg-success fw-medium fs-10">{text}</span>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: () => (
        <div className="action-table-data">
          <div className="edit-delete-action">
            <Link
              className="me-2 p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#edit-category"
            >
              <i data-feather="edit" className="feather-edit"></i>
            </Link>
            <Link
              data-bs-toggle="modal"
              data-bs-target="#delete-modal"
              className="p-2"
              to="#"
            >
              <i data-feather="trash-2" className="feather-trash-2"></i>
            </Link>
          </div>
        </div>
      ),
    },
  ];

  const openModal = () => {
    // Logic to open modal can be added here
    // For example, you can dispatch an action or set a state to trigger the modal
  };

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <CommonTableHeader
            title="Category"
            modalId="add-categorys"
            onAdd={() => openModal()}
          />
          <div className="card table-list-card">
            <TableTopFilter />
            <CommonTable columns={columns} data={dataSource} />
          </div>
        </div>
        <CommonFooter />
      </div>
      <AddCategorys />
      <CommonDeleteModal />
    </div>
  );
};

export default CategoryList;
