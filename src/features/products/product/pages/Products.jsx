import React from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "react-feather";
import TableHeader from "../../../../components/table/DataTableHeader";
import DataTable from "../../../../components/common/DataTable";
import { handleExportToExcel } from "../../../../utils/exportToExcel";
import useProducts from "../hooks/useProducts";

const Products = () => {
  const navigate = useNavigate();
  const { dataSource = [] } = useProducts();

  const columns = [
    {
      title: "Product",
      dataIndex: "name",
      render: (text, row) => (
        <div>
          <div className="fw-bold">{text}</div>
          <small className="text-muted">SKU: {row.sku}</small>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "salePrice",
      render: (v) => <span className="fw-bold">₹ {v}</span>,
    },
    {
      title: "Stock",
      dataIndex: "currentStock",
      render: (v, r) => (
        <span
          className={`badge ${
            v <= (r.reorderLevel || 0)
              ? "bg-danger"
              : "bg-success"
          }`}
        >
          {v ?? 0}
        </span>
      ),
    },
    {
      title: "Tax",
      dataIndex: "gstRate",
      render: (v) => `${v}%`,
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
              ? "bg-secondary"
              : "bg-danger"
          }`}
        >
          {v}
        </span>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <TableHeader
          title="Products"
          onNavigate={() => navigate("/add-product")}
          addLabel="Add Product"
          addIcon={<Plus size={16} />}
          onExportExcel={() => handleExportToExcel(dataSource)}
          onRefresh={() => window.location.reload()}
        />

        <DataTable
          columns={columns}
          dataSource={dataSource}
          rowKey="sku"
        />
      </div>
    </div>
  );
};

export default Products;
