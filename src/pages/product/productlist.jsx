/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ImageTextCell from "../../components/data-table/AvatarTextCell";
import Loader from "../../components/loader/loader";

import { all_routes } from "../../Router/all_routes";
import { setToogleHeader } from "../../core/redux/action";
import { useNavigate } from "react-router-dom";
import CommonDeleteModal from "../../components/modals/deleteRecord";
import ImportProduct from "../../components/modals/importproduct";
import { IMPORT_OPT } from "../../constants";
import { handleExportToExcel } from "../../utils/exportToExcel";
import { API_URL } from "../../environment";
import DataTableHeader from "../../components/data-table/PageHeader";
import DataTable from "../../components/data-table/DataTable";
import RowActionButtons from "../../components/data-table/TableRowActions";

const ProductList = () => {
  const route = all_routes;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const columns = [
    {
      title: "SKU",
      dataIndex: "sku",
      sorter: (a, b) => a.sku.localeCompare(b.sku),
    },
    {
      title: "Product",
      dataIndex: "name",
      render: (_, record) => (
        <ImageTextCell imageSrc={record?.productImage} text={record?.name} />
      ),
      sorter: (a, b) => a.product.localeCompare(b.product),
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),
    },
    {
      title: "Unit",
      dataIndex: "unit",
      sorter: (a, b) => a.unit.localeCompare(b.unit),
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Qty",
      dataIndex: "qty",
      sorter: (a, b) => a.qty - b.qty,
    },
    {
      title: "Creation By",
      dataIndex: "createdby",
    },
    {
      title: "Creation Time",
      dataIndex: "creationTime",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <RowActionButtons
          onView={() => handleViewRow(record)}
          onEdit={() => handleEditRow(record)}
          onDelete={() => handleDeleteRow(record)}
        />
      ),
    },
  ];

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/GetProductMasterDetails/6`);
      const result = await response.json();
      // console.log("result", result);
      if (result?.status !== 1)
        throw new Error(result?.msg || "Failed to fetch product data");

      const formattedData = result?.data?.map((product, index) => ({
        key: index,
        code: product?.code,
        name: product?.name,
        sku: product?.sku,
        category: product?.parentGrpName,
        unit: product?.unitName,
        price: product?.price,
        qty: product?.qty,
        createdby: product?.users,
        creationTime: product?.creationTime,
        productImage: product?.imageList[0]?.filePath ?? "",
      }));
      setTableData(formattedData || []);
    } catch (ex) {
      toast.error(ex?.message || "Failed to fetch product data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCollapseToggle = (e) => {
    e.preventDefault();
    dispatch(setToogleHeader(!isHeaderCollapsed));
  };

  const handleEditRow = (record) => {
    setSelectedRecord(record);
    navigate(route.addproduct, { state: { product: record } });
  };

  const handleViewRow = (record) => {
    setSelectedRecord(record);
    navigate(route.productdetails, { state: { product: record } });
  };

  const handleDeleteRow = (record) => {
    setDeleteModal(true);
    setSelectedItem(record);
  };

  const handleConfirmDelete = async () => {
    if (!selectedItem?.code) return;
    setIsDeleting(true);
    setIsLoading(true);
    try {
      const resp = await fetch(
        `${API_URL}/DeleteMasterByTypeAndCode?tranType=1&masterType=6&code=${selectedItem?.code}`,
        { method: "POST", headers: { "Content-Type": "application/json" } }
      );
      const json = await resp.json();
      console.log("Delete response:", json);
      if (json.status === 1) fetchData();
      toast.success(json?.msg);
    } catch {
      toast.error("Error deleting product");
    } finally {
      setIsDeleting(false);
      setDeleteModal(false);
      setSelectedItem(null);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="page-wrapper">
        <div className="content">
          {/* Product table header */}
          <DataTableHeader
            title="Product List"
            subtitle="Manage your products"
            importLabel="Import Product"
            addButtonLabel="Add New Product"
            onNavigate={() => navigate(route.addproduct)}
            showImport={false}
            onExportPdf={() => {
              toast.info("Export to PDF is not implemented yet");
            }}
            onExportExcel={() => handleExportToExcel(tableData)}
            onRefresh={fetchData}
          />
          {/* Product table */}
          <DataTable columns={columns} dataSource={tableData} />
        </div>
        <CommonDeleteModal
          onShow={deleteModal}
          onClose={() => setDeleteModal(false)}
          onConfirm={handleConfirmDelete}
          title="Delete Product"
          message={`Are you sure you want to delete the product : "${selectedItem?.name}"?`}
          isDeleting={isDeleting}
        />
        <ImportProduct
          title="Import Product"
          label="Select Action"
          show={showImportModal}
          actionOptions={IMPORT_OPT}
          handleClose={() => setShowImportModal(false)}
          onSuccess={fetchData}
        />
      </div>
    </>
  );
};

export default ProductList;
