import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "react-feather";

import PageHeader from "../../components/data-table/PageHeader";
import TableHeaderActions from "../../components/data-table/TableHeaderActions";

import { handleExportToExcel } from "../../utils/exportToExcel";
import useProducts from "../../core/hooks/products/useProducts";
import DataTableCard from "../../components/data-table/DataTable";
import { MODAL_TYPES } from "../../core/modals/modalTypes";
import { openModal } from "../../core/redux/store/modalSlice";
import { useDispatch } from "react-redux";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dataSource = [] } = useProducts();
  const [quickAddOpen, setQuickAddOpen] = useState(false);

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
            v <= (r.reorderLevel || 0) ? "bg-danger" : "bg-success"
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
        {/* PAGE HEADER */}
        <PageHeader
          title="Products"
          subtitle="Manage your product inventory"
          actions={[
            {
              label: "Add Product",
              icon: <i className="ti ti-circle-plus"></i>,
              variant: "primary",
              children: [
                {
                  label: "Quick Add",
                  onClick: () =>
                    dispatch(
                      openModal({
                        name: MODAL_TYPES.QUICK_ADD_PRODUCT,
                        payload: {
                          afterSave: () => {
                            // product list refresh
                            window.location.reload(); // ya better: refetchProducts()
                          },
                        },
                      }),
                    ),
                },

                {
                  label: "Advanced Add",
                  onClick: () => navigate("/add-product"),
                },
              ],
            },
          ]}
          tableActions={{
            onExportExcel: () => handleExportToExcel(dataSource),
            onExportPdf: () => console.log("pdf in unble to download"),
            onRefresh: () => window.location.reload(),
          }}
        />

        {/* DATA TABLE */}
        <DataTableCard columns={columns} dataSource={dataSource} rowKey="sku" />
      </div>
    </div>
  );
};

export default Products;
