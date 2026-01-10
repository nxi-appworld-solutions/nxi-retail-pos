import React from "react";
import Loader from "../../../components/loader/loader";
import { toast } from "react-toastify";
import TableHeader from "../../../components/data-table/PageHeader";
import DataTable from "../../../components/data-table/DataTable";
import { handleExportToExcel } from "../../../utils/exportToExcel";
import useCustomers from "../../../hooks/useCustomers";
import { useNavigate } from "react-router-dom";

// title={entityType.charAt(0).toUpperCase() + entityType.slice(1) + "s"}

const Customers = () => {
  const navigate = useNavigate();
  const entityType = "Customers";
  const onRefresh = () => {};
  const { dataSource = [], columns } = useCustomers();

  return (
    <div className="page-wrapper">
      <div className="content">
        {/* Product table header */}
        <TableHeader
          title={entityType}
          onNavigate={() => navigate("/add-customers")}
          onExportPdf={() => toast.info("Export to PDF is not implemented yet")}
          onExportExcel={() => handleExportToExcel(dataSource)}
          onRefresh={onRefresh}
        />
        {/* Product table */}
        <DataTable columns={columns} dataSource={dataSource} />
      </div>
    </div>
  );
};

export default Customers;
