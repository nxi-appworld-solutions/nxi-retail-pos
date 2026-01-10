import Table from "../../core/pagination/datatable";
import TableHeaderFilters from "./TableHeaderFilters";

const DataTableCard = ({
  columns,
  dataSource,
  rowKey = "id",
  showFilters = true,
  pagination = true,
}) => {
  return (
    <div className="card table-list-card">
      {showFilters && <TableHeaderFilters />}

      <div className="card-body">
        <div className="table-responsive">
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={pagination}
            rowKey={rowKey}
          />
        </div>
      </div>
    </div>
  );
};

export default DataTableCard;
