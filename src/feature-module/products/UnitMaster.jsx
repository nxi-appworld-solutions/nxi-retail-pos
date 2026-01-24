import { useDispatch } from "react-redux";
import { Edit2 } from "react-feather";

import PageHeader from "../../components/data-table/PageHeader";
import DataTableCard from "../../components/data-table/DataTable";
import { openModal } from "../../core/redux/store/modalSlice";
import { MODAL_TYPES } from "../../core/modals/modalTypes";
import { Scale } from "lucide-react";
import { handleExportToExcel } from "../../utils/exportToExcel";

const UnitMaster = () => {
  const dispatch = useDispatch();

  const unitList = [
    {
      id: 1,
      unitName: "Piece",
      unitCode: "PCS",
      baseUnit: "PCS",
      conversionFactor: 1,
      status: "Active",
    },
    {
      id: 2,
      unitName: "Kilogram",
      unitCode: "KG",
      baseUnit: "KG",
      conversionFactor: 1,
      status: "Active",
    },
    {
      id: 3,
      unitName: "Box",
      unitCode: "BOX",
      baseUnit: "PCS",
      conversionFactor: 12,
      status: "Active",
    },
  ];

  const columns = [
    {
      title: "Unit",
      dataIndex: "unitName",
      render: (v, row) => (
        <div>
          <div className="fw-bold">{v}</div>
          <div className="text-muted small">Code: {row.unitCode}</div>
        </div>
      ),
    },
    {
      title: "Base Unit",
      dataIndex: "baseUnit",
      render: (v) => (
        <span className="badge bg-light text-dark">{v || "-"}</span>
      ),
    },
    {
      title: "Factor",
      dataIndex: "conversionFactor",
      render: (v) => <span className="fw-bold">{v}</span>,
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
                name: MODAL_TYPES.UNIT_MASTER,
                payload: {
                  mode: "EDIT",
                  record: row,
                },
                options: { size: "lg" },
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
          title="Unit Master"
          subtitle="Manage quantity & stock measurement units"
          icon={<Scale size={20} />}
          actions={[
            {
              label: "Add Unit",
              icon: <i className="ti ti-circle-plus" />,
              onClick: () =>
                dispatch(
                  openModal({
                    name: MODAL_TYPES.UNIT_MASTER,
                    payload: { mode: "ADD", record: null },
                    options: { size: "lg" },
                  }),
                ),
            },
          ]}
          tableActions={{
            onExportPdf: () => console.log("PDF"),
            onExportExcel: () => handleExportToExcel([...unitList], 'UnitMaster'),
            onRefresh: () => window.location.reload(),
          }}
        />

        <DataTableCard columns={columns} dataSource={unitList} rowKey="id" />
      </div>
    </div>
  );
};

export default UnitMaster;
