import { useDispatch } from "react-redux";
import { Plus, Edit2 } from "react-feather";

import PageHeader from "../../components/data-table/PageHeader";
import DataTableCard from "../../components/data-table/DataTable";

import { handleExportToExcel } from "../../utils/exportToExcel";
import { openModal } from "../../core/redux/store/modalSlice";

const Brands = () => {
  const dispatch = useDispatch();

  const brands = [
    {
      id: "1",
      name: "Samsung",
      code: "SAM",
      brandTier: "Premium",
      countryOfOrigin: "South Korea",
      visibleInPOS: true,
      status: "Active",
    },
    {
      id: "2",
      name: "Nike",
      code: "NIK",
      brandTier: "Premium",
      countryOfOrigin: "USA",
      visibleInPOS: false,
      status: "Inactive",
    },
  ];

  const columns = [
    {
      title: "Brand",
      dataIndex: "name",
      render: (v) => <span className="fw-bold">{v}</span>,
    },
    {
      title: "Code",
      dataIndex: "code",
      render: (v) => <span className="fw-bold font-monospace">{v || "—"}</span>,
    },
    {
      title: "Tier",
      dataIndex: "brandTier",
      render: (v) => <span className="badge bg-soft-info text-dark">{v}</span>,
    },
    {
      title: "Country",
      dataIndex: "countryOfOrigin",
      render: (v) => v || "—",
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
                modalName: "BRAND",
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
          title="Brand"
          subtitle="Manage your product brands"
          actions={[
            {
              label: "Add Brand",
              icon: <i className="ti ti-circle-plus" />,
              onClick: () =>
                dispatch(
                  openModal({
                    modalName: "BRAND",
                    modalProps: { mode: "ADD", record: null },
                  })
                ),
            },
          ]}
          tableActions={{
            onExportPdf: () => console.log("PDF"),
            onExportExcel: () => handleExportToExcel(brands),
            onRefresh: () => window.location.reload(),
          }}
        />

        <DataTableCard columns={columns} dataSource={brands} rowKey="id" />
      </div>
    </div>
  );
};

export default Brands;
