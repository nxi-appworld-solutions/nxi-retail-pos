// CategoryList.js
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddCategoryModal from "../../components/modals/addCategory";
import Loader from "../../components/loader/loader";
import { API_URL } from "../../environment";
import CommonDeleteModal from "../../components/modals/deleteRecord";
import ImageTextCell from "../../components/data-table/AvatarTextCell";
import { handleExportToExcel } from "../../utils/exportToExcel";
import DataTableHeader from "../../components/data-table/PageHeader";
import DataTable from "../../components/data-table/DataTable";
import RowActionButtons from "../../components/data-table/TableRowActions";

const CategoryList = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const columns = [
    {
      title: "Category",
      dataIndex: "name",
      render: (_, record) =>
        console.log("Record:", record) || (
          <ImageTextCell
            imageSrc={
              record?.image ||
              "https://png.pngtree.com/png-clipart/20230913/original/pngtree-cartoon-funny-man-pointing-two-fingers-with-dummy-vector-png-image_11081212.png"
            }
            text={record?.name}
          />
        ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Print Name",
      dataIndex: "printName",
      sorter: (a, b) => a.printName.localeCompare(b.printName),
    },
    {
      title: "Creation By",
      dataIndex: "creationBy",
    },
    {
      title: "Creation Time",
      dataIndex: "creationTime",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => (
        <span
          className={`badge table-badge ${
            text == "Active" ? `bg-success` : `bg-danger`
          } fw-medium fs-10`}
        >
          {text}
        </span>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: "Actions",
      render: (_, record) => (
        <RowActionButtons
          onEdit={() => handleEditRow(record)}
          onDelete={() => handleDeleteRow(record)}
          canView={false}
        />
      ),
    },
  ];

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const resp = await fetch(`${API_URL}/GetMasterDetails/5`);
      const json = await resp.json();
      if (json.status !== 1)
        throw new Error(json.Msg || "Failed to fetch categories");
      if (!Array.isArray(json.data)) throw new Error();
      const formattedData = json?.data?.map((item) => ({
        id: item.code,
        name: item.name,
        printName: item.printName,
        status: item.isActive ? "Active" : "Inactive",
        creationBy: item.users,
        creationTime: item.creationTime,
        image: item.imageList?.[0]?.filePath,
      }));

      setTableData(formattedData);
    } catch {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const onAddClick = () => {
    setSelectedItem(null);
    setShowFormModal(true);
  };

  const handleEditRow = (record) => {
    setSelectedItem(record);
    setShowFormModal(true);
  };

  const handleDeleteRow = (record) => {
    setSelectedItem(record);
    setDeleteModal(true);
  };

  const handleClose = () => {
    setShowFormModal(false);
    setSelectedItem(null);
  };

  const handleFormSuccess = () => {
    fetchCategories();
    handleClose();
  };

  const handleConfirmDelete = async () => {
    if (!selectedItem?.id) return;
    setIsDeleting(true);
    setLoading(true);
    try {
      const resp = await fetch(
        `${API_URL}/DeleteMasterByTypeAndCode?tranType=1&masterType=5&code=${selectedItem?.id}`,
        { method: "POST", headers: { "Content-Type": "application/json" } }
      );
      const res = await resp.json();

      if (res.status === 1) {
        toast.success(res.msg || "Category deleted successfully");
        fetchCategories();
      } else {
        toast.error(res.msg || "Failed to delete category");
      }
    } catch {
      toast.error("Error deleting category");
    } finally {
      setIsDeleting(false);
      setDeleteModal(false);
      setSelectedItem(null);
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="page-wrapper">
        <div className="content">
          <DataTableHeader
            title="Category List"
            subtitle="Manage your categories"
            addButtonLabel="Add New Category"
            onNavigate={onAddClick}
            showImport={false}
            onExportPdf={() => {
              toast.info("Export to PDF is not implemented yet");
            }}
            onExportExcel={() => handleExportToExcel(tableData)}
            onRefresh={fetchCategories}
          />
          <DataTable columns={columns} dataSource={tableData} />
        </div>

        <AddCategoryModal
          show={showFormModal}
          handleClose={handleClose}
          selectedRecord={selectedItem}
          onSuccess={handleFormSuccess}
        />

        <CommonDeleteModal
          onShow={deleteModal}
          onClose={() => setDeleteModal(false)}
          onConfirm={handleConfirmDelete}
          title="Delete Category"
          message={`Are you sure you want to delete the category : "${selectedItem?.name}"?`}
          isDeleting={isDeleting}
        />
      </div>
    </>
  );
};

export default CategoryList;
