import { useDispatch } from "react-redux";
import { Plus, Edit2 } from "react-feather";

import PageHeader from "../../components/data-table/PageHeader";
import DataTableCard from "../../components/data-table/DataTable";

import { handleExportToExcel } from "../../utils/exportToExcel";
import { openModal } from "../../core/redux/store/modalSlice";
import { MODAL_TYPES } from "../../core/modals/modalTypes";

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
          }),
        );
    });

  const columns = [
    {
      title: "Category",
      dataIndex: "name",
      render: (text, row) => (
        <div>
          <div className="fw-bold d-flex align-items-center">
            {row.type === "CHILD" && <span className="text-muted me-1">↳</span>}
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
      title: "POS",
      dataIndex: "visibleInPOS",
      render: (v, row) =>
        row.type === "PARENT" ? (
          <span className="badge bg-light text-muted">Auto</span>
        ) : (
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
            v === "Active" ? "bg-success" : "bg-warning text-dark"
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
                name: MODAL_TYPES.CATEGORY,
                payload: {
                  mode: "EDIT",
                  record: row,
                },
                options: { size: "xl" },
              }),
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
          subtitle="Organize products using category hierarchy"
          actions={[
            {
              label: "Add Category",
              icon: <i className="ti ti-circle-plus" />,
              onClick: () =>
                dispatch(
                  openModal({
                    name: MODAL_TYPES.CATEGORY,
                    modalProps: { mode: "ADD", record: null },
                    options: { size: "xl" },
                  }),
                ),
            },
          ]}
          tableActions={{
            onExportPdf: () => console.log("PDF"),
            onExportExcel: () => handleExportToExcel(categories),
            onRefresh: () => window.location.reload(),
          }}
        />

        <DataTableCard columns={columns} dataSource={dataSource} rowKey="id" />
      </div>
    </div>
  );
};

export default Categories;
