import React from "react";
import { useDispatch } from "react-redux";
import { Plus, Edit2 } from "react-feather";

import TableHeader from "../../../components/table/DataTableHeader";
import DataTable from "../../../components/common/DataTable";
import { handleExportToExcel } from "../../../utils/exportToExcel";
import { MODALS } from "../../../constants/modal.constants";
import { openModal } from "../../../core/redux/uiModalSlice";

const Brands = () => {
  const dispatch = useDispatch();

  const brands = [
    {
      id: "1",
      name: "Samsung",
      code: "SAM",
      brandTier: "Premium",
      countryOfOrigin: "South Korea",
      visibleInPOS: true,
      status: "Active",
    },
    {
      id: "2",
      name: "Nike",
      code: "NIK",
      brandTier: "Premium",
      countryOfOrigin: "USA",
      visibleInPOS: false,
      status: "Inactive",
    },
  ];

  const columns = [
    {
      title: "Brand",
      dataIndex: "name",
      render: (v) => <span className="fw-bold">{v}</span>,
    },
    {
      title: "Code",
      dataIndex: "code",
      render: (v) => <span className="font-monospace fw-bold">{v}</span>,
    },
    {
      title: "Tier",
      dataIndex: "brandTier",
      render: (v) => (
        <span className="badge bg-soft-info text-dark">{v}</span>
      ),
    },
    {
      title: "Country",
      dataIndex: "countryOfOrigin",
      render: (v) => v || "—",
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
        <span className={`badge ${v === "Active" ? "bg-success" : "bg-danger"}`}>
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
                modalName: MODALS.BRAND,
                data: row,
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
        <TableHeader
          title="Brands"
          addLabel="Add Brand"
          addIcon={<Plus size={16} />}
          onNavigate={() => dispatch(openModal({ modalName: MODALS.BRAND }))}
          onExportExcel={() => handleExportToExcel(brands)}
          onRefresh={() => window.location.reload()}
        />

        <DataTable columns={columns} dataSource={brands} rowKey="id" />
      </div>
    </div>
  );
};

export default Brands;
