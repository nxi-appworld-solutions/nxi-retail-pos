import { useDispatch } from "react-redux";
import { Edit2, UserCheck } from "react-feather";

import PageHeader from "../../components/data-table/PageHeader";
import DataTableCard from "../../components/data-table/DataTable";
import { openModal } from "../../core/redux/store/modalSlice";
import { MODAL_TYPES } from "../../core/modals/modalTypes";
import { handleExportToExcel } from "../../utils/exportToExcel";

const Users = () => {
  const dispatch = useDispatch();

  const users = [
    {
      id: 1,
      fullName: "Rahul Sharma",
      username: "rahul",
      role: "Cashier",
      status: "Active",
    },
    {
      id: 2,
      fullName: "Amit Verma",
      username: "amit",
      role: "Manager",
      status: "Active",
    },
    {
      id: 3,
      fullName: "Owner",
      username: "admin",
      role: "Admin",
      status: "Active",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
      render: (v) => <span className="fw-bold">{v}</span>,
    },
    {
      title: "Username",
      dataIndex: "username",
      render: (v) => <span className="font-monospace fw-bold">{v}</span>,
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (v) => (
        <span className="badge bg-soft-primary text-primary">{v}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (v) => (
        <span
          className={`badge ${v === "Active" ? "bg-success" : "bg-secondary"}`}
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
                name: MODAL_TYPES.USER,
                payload: { mode: "EDIT", record: row },
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
          title="Users"
          subtitle="Manage staff access for POS system"
          actions={[
            {
              label: "Add User",
              icon: <UserCheck size={16} />,
              onClick: () =>
                dispatch(
                  openModal({
                    name: MODAL_TYPES.USER,
                    payload: { mode: "ADD" },
                    options: { size: "lg" },
                  }),
                ),
            },
          ]}
          tableActions={{
            onExportPdf: () => console.log("PDF"),
            onExportExcel: () => handleExportToExcel([], 'Users'),
            onRefresh: () => window.location.reload(),
          }}
        />

        <DataTableCard columns={columns} dataSource={users} rowKey="id" />
      </div>
    </div>
  );
};

export default Users;
