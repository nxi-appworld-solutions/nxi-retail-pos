import { useDispatch } from "react-redux";
import { Plus, Edit2 } from "react-feather";

import PageHeader from "../../components/data-table/PageHeader";
import DataTableCard from "../../components/data-table/DataTable";

import { handleExportToExcel } from "../../utils/exportToExcel";
import { openModal } from "../../core/redux/store/modalSlice";

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
            <small className="text-muted">
              Parent: {row.parentName}
            </small>
          )}
        </div>
      ),
    },
    {
      title: "Code",
      dataIndex: "code",
      render: (v) => (
        <span className="fw-bold font-monospace">{v || "—"}</span>
      ),
    },
    {
      title: "GST",
      dataIndex: "gstRate",
      render: (v) => (
        <span className="badge bg-soft-primary">{v}%</span>
      ),
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
                modalName: "CATEGORY",
                modalProps: {
                  mode: "EDIT",
                  record: row,
                },
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
        <PageHeader
          title="Categories"
          subtitle="Manage your product categories"
          actions={[
            {
              label: "Add Category",
              icon: <i className="ti ti-circle-plus" />,
              onClick: () =>
                dispatch(
                  openModal({
                    modalName: "CATEGORY",
                    modalProps: { mode: "ADD", record: null, },
                  })
                ),
            },
          ]}
          tableActions={{
            onExportPdf: () => console.log("PDF"),
            onExportExcel: () => handleExportToExcel(categories),
            onRefresh: () => window.location.reload(),
          }}
        />

        <DataTableCard
          columns={columns}
          dataSource={dataSource}
          rowKey="id" // ✅ FIX 2
        />
      </div>
    </div>
  );
};

export default Categories;
