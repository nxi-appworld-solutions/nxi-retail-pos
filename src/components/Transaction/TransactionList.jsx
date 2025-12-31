// Now in your TransactionList.jsx
import React from "react";
import TransactionTable from "../common/DataTable";
import TransactionTableHeader from "../table/DataTableHeader";
import { toast } from "react-toastify";
import { handleExportToExcel } from "../../utils/exportToExcel";
import Loader from "../loader/loader";

const TransactionList = ({
  title,
  subtitle,
  columns,
  dataSource,
  onExportExcel,
  productModalIsOpen,
  addLabel,
  isLoading,
}) => {
  console.log("dataSource", dataSource);
  return (
    <>
      {isLoading && <Loader />}
      <div className="page-wrapper">
        <div className="content">
          <TransactionTableHeader
            title={title}
            subtitle={subtitle}
            addButtonLabel={addLabel}
            onNavigate={productModalIsOpen}
            onExportPdf={() => {
              toast.info("Export to PDF is not implemented yet");
            }}
            onExportExcel={onExportExcel}
            onRefresh={dataSource}
          />
          <TransactionTable columns={columns} dataSource={dataSource} />
        </div>
      </div>
    </>
  );
};

export default TransactionList;
