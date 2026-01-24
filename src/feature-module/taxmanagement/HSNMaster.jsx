import { useDispatch } from "react-redux";
import { Edit2 } from "react-feather";

import PageHeader from "../../components/data-table/PageHeader";
import DataTableCard from "../../components/data-table/DataTable";
import { handleExportToExcel } from "../../utils/exportToExcel";
import { openModal } from "../../core/redux/store/modalSlice";
import { MODAL_TYPES } from "../../core/modals/modalTypes";

const HSNMaster = () => {
  const dispatch = useDispatch();

  // TEMP DATA (API later)
  const hsnList = [
    {
      id: 1,
      hsnCode: "9405",
      hsnDescription: "Lighting fittings and fixtures",
      gstPercent: 18,
      status: "Active",
    },
    {
      id: 2,
      hsnCode: "2106",
      hsnDescription: "Food preparations",
      gstPercent: 5,
      status: "Active",
    },
  ];

  const columns = [
    {
      title: "HSN Code",
      dataIndex: "hsnCode",
      render: (v) => <span className="fw-bold font-monospace">{v}</span>,
    },
    {
      title: "Description",
      dataIndex: "hsnDescription",
      render: (v) => <span className="text-muted">{v}</span>,
    },
    {
      title: "Default GST %",
      dataIndex: "gstPercent",
      render: (v) => <span className="fw-bold text-success">{v}%</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (v) => (
        <span
          className={`badge ${
            v === "Active"
              ? "bg-success"
              : "bg-warning text-dark"
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
                name: MODAL_TYPES.HSN,
                payload: { mode: "EDIT", record: row },
                options: { size: "lg" },
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
          title="HSN Master"
          subtitle="Manage government-defined HSN codes"
          actions={[
            {
              label: "Add HSN",
              icon: <i className="ti ti-circle-plus" />,
              onClick: () =>
                dispatch(
                  openModal({
                    name: MODAL_TYPES.HSN,
                    payload: { mode: "ADD", record: null },
                    options: { size: "lg" },
                  })
                ),
            },
          ]}
          tableActions={{
            onExportPdf: () => console.log("PDF"),
            onExportExcel: () => handleExportToExcel(hsnList),
            onRefresh: () => window.location.reload(),
          }}
        />

        <DataTableCard
          columns={columns}
          dataSource={hsnList}
          rowKey="id"
        />
      </div>
    </div>
  );
};

export default HSNMaster;
