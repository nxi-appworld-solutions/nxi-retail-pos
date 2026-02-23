import React from "react";
import { Edit2, UserCheck } from "react-feather";
import PageHeader from "../../../components/data-table/PageHeader";
import DataTableCard from "../../../components/data-table/DataTable";
import { handleExportToExcel } from "../../../utils/exportToExcel";
import useCustomers from "../../../hooks/useCustomers";
import { useNavigate } from "react-router-dom";

const Customers = () => {
  const navigate = useNavigate();
  const { dataSource = [], columns } = useCustomers();

  return (
    <div className="page-wrapper">
      <div className="content">
        <PageHeader
          title="Customers"
          subtitle="Manage customer information and billing"
          actions={[
            {
              label: "Add Customer",
              icon: <i className="ti ti-circle-plus" />,
              onClick: () => navigate("/customers/add-customer"),
            },
          ]}
          tableActions={{
            onExportPdf: () =>
              console.log("Export to PDF is not implemented yet"),
            onExportExcel: () => handleExportToExcel([], "Customers"),
            onRefresh: () => window.location.reload(),
          }}
        />

        <DataTableCard columns={columns} dataSource={dataSource} rowKey="id" />
      </div>
    </div>
  );
};

export default Customers;
