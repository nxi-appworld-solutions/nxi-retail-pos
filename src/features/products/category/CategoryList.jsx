import React from "react";
import { useDispatch } from "react-redux";
import { Plus, Edit2 } from "react-feather";

import TableHeader from "../../../components/table/DataTableHeader";
import DataTable from "../../../components/common/DataTable";
import { handleExportToExcel } from "../../../utils/exportToExcel";
import { MODALS } from "../../../constants/modal.constants";
import { openModal } from "../../../core/redux/uiModalSlice";

const Categories = () => {
  const dispatch = useDispatch();

  const categories = [
    {
      id: "1",
      name: "Electronics",
      parentId: null,
      code: "ELE",
      gstRate: 18,
      visibleInPOS: true,
      status: "Active",
    },
    {
      id: "2",
      name: "Mobiles",
      parentId: "1",
      code: "MOB",
      gstRate: 18,
      visibleInPOS: true,
      status: "Active",
    },
    {
      id: "3",
      name: "Fashion",
      parentId: null,
      code: "FASH",
      gstRate: 5,
      visibleInPOS: false,
      status: "Inactive",
    },
  ];

  const dataSource = [];
  categories
    .filter((c) => !c.parentId)
    .forEach((parent) => {
      dataSource.push({ ...parent, type: "PARENT" });
      categories
        .filter((c) => c.parentId === parent.id)
        .forEach((child) =>
          dataSource.push({
            ...child,
            type: "CHILD",
            parentName: parent.name,
          })
        );
    });

  const columns = [
    {
      title: "Category",
      dataIndex: "name",
      render: (text, row) => (
        <div>
          <div className="fw-bold d-flex align-items-center gap-2">
            {row.type === "CHILD" && <span className="text-muted">↳</span>}
            {text}
          </div>
          {row.type === "CHILD" && (
            <small className="text-muted">Parent: {row.parentName}</small>
          )}
        </div>
      ),
    },
    {
      title: "Code",
      dataIndex: "code",
      render: (v) => <span className="fw-bold font-monospace">{v || "—"}</span>,
    },
    {
      title: "GST",
      dataIndex: "gstRate",
      render: (v) => <span className="badge bg-soft-primary">{v}%</span>,
    },
    {
      title: "POS",
      dataIndex: "visibleInPOS",
      render: (v) => (
        <span className={`badge ${v ? "bg-success" : "bg-secondary"}`}>
          {v ? "Yes" : "No"}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (v) => (
        <span
          className={`badge ${
            v === "Active"
              ? "bg-success"
              : v === "Inactive"
              ? "bg-warning text-dark"
              : "bg-danger"
          }`}
        >
          {v}
        </span>
      ),
    },
    {
      title: "Action",
      width: 80,
      render: (_, row) => (
        <Edit2
          size={16}
          className="cursor-pointer text-primary"
          onClick={() =>
            dispatch(
              openModal({
                modalName: MODALS.CATEGORY,
                data: row,
              })
            )
          }
        />
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        {/* ===== HEADER ===== */}
        <TableHeader
          title="Categories"
          addLabel="Add Category"
          addIcon={<Plus size={16} />}
          onNavigate={() => dispatch(openModal({ modalName: MODALS.CATEGORY }))}
          onExportExcel={() => handleExportToExcel(categories)}
          onRefresh={() => window.location.reload()}
        />

        {/* ===== TABLE ===== */}
        <DataTable columns={columns} dataSource={dataSource} rowKey="id" />
      </div>
    </div>
  );
};

export default Categories;
