/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddUsers from "../../components/modals/addusers";
import { toast } from "react-toastify";
import Loader from "../../components/loader/loader";
import CommonDeleteModal from "../../components/modals/deleteRecord";
import { API_URL } from "../../environment";
import DataTable from "../../components/common/DataTable";
import RowActionButtons from "../../components/table/RowActionButtons";
import DataTableHeader from "../../components/table/DataTableHeader";
import { useDispatch, useSelector } from "react-redux";

const UserList = () => {
  // const dataSource = useSelector((state) => state.rootReducer.userlist_data);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const columns = [
    {
      title: "User Name",
      dataIndex: "username",
      render: (text, record) => (
        <span className="userimgname">
          <Link to="#" className="userslist-img bg-img">
            <img alt="" src={record?.img} />
          </Link>
          <div>
            <Link to="#">{text}</Link>
          </div>
        </span>
      ),
      sorter: (a, b) => a.username.length - b.username.length,
    },

    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a, b) => a.phone.length - b.phone.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Role",
      dataIndex: "role",
      sorter: (a, b) => a.role.length - b.role.length,
    },
    {
      title: "Created On",
      dataIndex: "creationTime",
      sorter: (a, b) => a.creationTime.length - b.creationTime.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => (
        <span
          className={`d-inline-flex align-items-center p-1 pe-2 rounded-1 text-white ${
            text === `Active` ? `bg-success` : `bg-danger`
          } fs-10`}
        >
          {" "}
          <i className="ti ti-point-filled me-1 fs-11"></i>
          {text}
        </span>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <RowActionButtons
          onEdit={() => handleEditRow(record)}
          onDelete={() => handleDeleteRow(record)}
        />
      ),
    },
  ];

  const handleDeleteRow = (record) => {
    setSelectedItem(record);
    setDeleteModal(true);
  };

  const handleEditRow = (record) => {
    setSelectedItem(record);
    setShowModal(true);
  };

  const fetchData = async () => {
    setIsLoading(true);
    setTableData([]);
    try {
      const response = await fetch(`${API_URL}/GetUserMasterDetails/users`);
      const jsonData = await response.json();
      // console.log("User Master Data:", jsonData);
      if (jsonData?.status !== 1)
        throw new Error(jsonData.Msg || "Failed to fetch user data");

      const formattedData = jsonData?.data?.map((user, index) => ({
        key: index + 1,
        id: user.code,
        code: user.code,
        name: user.name,
        username: user.username,
        phone: user.mobile,
        email: user.email,
        role:
          user.role == 1 ? "Super Admin" : user.role == 2 ? "Admin" : "User",
        // creationTime: new Date(user.creationTime).toLocaleDateString(),
        creationTime: user.creationTime,
        status: user.isActive ? "Active" : "Inactive",
        img: user.img || "default-avatar.png",
        creationBy: user.creationBy || "N/A",
      }));
      setTableData(formattedData);
    } catch (error) {
      toast.error("Failed to fetch user data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleConfirmDelete = async () => {
    if (!selectedItem?.id) return;
    setIsDeleting(true);
    setIsLoading(true);
    try {
      const resp = await fetch(
        `${API_URL}/DeleteMasterByTypeAndCode?tranType=2&masterType=1&code=${selectedItem?.id}`,
        { method: "POST", headers: { "Content-Type": "application/json" } }
      );
      const result = await resp.json();
      if (result?.status === 1) {
        fetchData();
        toast.success(result?.msg || "Failed to delete User");
      } else {
        toast.error(result?.msg || "Failed to delete User");
      }
    } catch {
      toast.error("Error deleting User");
    } finally {
      setIsDeleting(false);
      setDeleteModal(false);
      setSelectedItem(null);
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      <div className="page-wrapper">
        <div className="content">
          <DataTableHeader
            title="User List"
            subtitle="Manage your users"
            addButtonLabel="Add New User"
            onNavigate={() => {
              setShowModal(true);
              setSelectedItem(null);
            }}
            showImport={false}
            onExportPdf={() => {
              toast.info("Export to PDF is not implemented yet");
            }}
            onExportExcel={() => handleExportToExcel(tableData)}
            onRefresh={fetchData}
          />
          <DataTable columns={columns} dataSource={tableData} />
        </div>
      </div>
      <AddUsers
        showModal={showModal}
        onClose={() => setShowModal(false)}
        record={selectedItem}
        onSubmitSuccess={() => {
          setShowModal(false);
          setSelectedItem(null);
          fetchData();
        }}
      />

      <CommonDeleteModal
        onShow={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Delete User"
        message={`Are you sure you want to delete the user : "${selectedItem?.name}"?`}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default UserList;
