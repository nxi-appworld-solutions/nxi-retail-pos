import { useDispatch } from "react-redux";
import { Edit2 } from "react-feather";

import PageHeader from "../../components/data-table/PageHeader";
import DataTableCard from "../../components/data-table/DataTable";
import { openModal } from "../../core/redux/store/modalSlice";
import { MODAL_TYPES } from "../../core/modals/modalTypes";

const TaxGroupList = () => {
  const dispatch = useDispatch();

  const taxGroups = [
    {
      id: 1,
      taxGroupName: "GST 0%",
      taxGroupCode: "GST0",
      totalPercent: 0,
      components: "Exempt",
      status: "Active",
    },
    {
      id: 2,
      taxGroupName: "GST 5%",
      taxGroupCode: "GST5",
      totalPercent: 5,
      components: "2.5 + 2.5",
      status: "Active",
    },
    {
      id: 3,
      taxGroupName: "GST 18%",
      taxGroupCode: "GST18",
      totalPercent: 18,
      components: "9 + 9",
      status: "Active",
    },
  ];

  const columns = [
    {
      title: "Tax Group",
      dataIndex: "taxGroupName",
      render: (v) => <span className="fw-bold">{v}</span>,
    },
    {
      title: "Code",
      dataIndex: "taxGroupCode",
      render: (v) => <span className="font-monospace">{v}</span>,
    },
    {
      title: "Total %",
      dataIndex: "totalPercent",
      render: (v) => <span className="fw-bold text-success">{v}%</span>,
    },
    {
      title: "Components",
      dataIndex: "components",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (v) => (
        <span className={`badge ${v === "Active" ? "bg-success" : "bg-warning text-dark"}`}>
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
                name: MODAL_TYPES.TAX_GROUP,
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
          title="Tax Group"
          subtitle="Structure and grouping of tax components"
          actions={[
            {
              label: "Add Tax Group",
              icon: <i className="ti ti-circle-plus" />,
              onClick: () =>
                dispatch(
                  openModal({
                    name: MODAL_TYPES.TAX_GROUP,
                    payload: { mode: "ADD", record: null },
                    options: { size: "lg" },
                  })
                ),
            },
          ]}
        />

        <DataTableCard
          columns={columns}
          dataSource={taxGroups}
          rowKey="id"
        />
      </div>
    </div>
  );
};

export default TaxGroupList;
