// TransactionTable.jsx
import React from "react";
import Table from "../../core/pagination/datatable";
import TableToolbar from "../table/TableToolbar";

const DataTable = ({ columns, dataSource }) => (
  <div className="card table-list-card">
    <TableToolbar />
    <div className="card-body">
      <div className="table-responsive">
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={true}
          rowKey={(record) => record.id}
        />
      </div>
    </div>
  </div>
);

export default DataTable;
