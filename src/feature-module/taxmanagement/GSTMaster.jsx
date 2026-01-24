import { useDispatch } from "react-redux";
import { Edit2 } from "react-feather";

import PageHeader from "../../components/data-table/PageHeader";
import DataTableCard from "../../components/data-table/DataTable";

import { handleExportToExcel } from "../../utils/exportToExcel";
import { openModal } from "../../core/redux/store/modalSlice";
import { MODAL_TYPES } from "../../core/modals/modalTypes";

const GSTMaster = () => {
  const dispatch = useDispatch();

  // TEMP DATA (API se aayega)
  const gstList = [
    {
      id: 1,
      gstName: "GST 0%",
      gstCode: "GST0",
      gstPercent: 0,
      isInclusive: false,
      status: "Active",
    },
    {
      id: 2,
      gstName: "Sales GST 5%",
      gstCode: "GST5",
      gstPercent: 5,
      isInclusive: false,
      status: "Active",
    },
    {
      id: 3,
      gstName: "Sales GST 18%",
      gstCode: "GST18",
      gstPercent: 18,
      isInclusive: true,
      status: "Active",
    },
  ];

  const columns = [
    {
      title: "GST Name",
      dataIndex: "gstName",
      render: (v) => <span className="fw-bold">{v}</span>,
    },
    {
      title: "Code",
      dataIndex: "gstCode",
      render: (v) => (
        <span className="fw-bold font-monospace">{v}</span>
      ),
    },
    {
      title: "GST %",
      dataIndex: "gstPercent",
      render: (v) => (
        <span className="fw-bold text-success">{v}%</span>
      ),
    },
    {
      title: "Price Type",
      dataIndex: "isInclusive",
      render: (v) => (
        <span className={`badge ${v ? "bg-info" : "bg-secondary"}`}>
          {v ? "Inclusive" : "Exclusive"}
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
                name: MODAL_TYPES.GST,
                payload: {
                  mode: "EDIT",
                  record: row,
                },
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
          title="GST Master"
          subtitle="Manage GST slabs and tax behavior"
          actions={[
            {
              label: "Add GST",
              icon: <i className="ti ti-circle-plus" />,
              onClick: () =>
                dispatch(
                  openModal({
                    name: MODAL_TYPES.GST,
                    payload: { mode: "ADD", record: null },
                    options: { size: "lg" },
                  })
                ),
            },
          ]}
          tableActions={{
            onExportPdf: () => console.log("PDF"),
            onExportExcel: () => handleExportToExcel(gstList),
            onRefresh: () => window.location.reload(),
          }}
        />

        <DataTableCard
          columns={columns}
          dataSource={gstList}
          rowKey="id"
        />
      </div>
    </div>
  );
};

export default GSTMaster;
