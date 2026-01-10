import PrimeDataTable from ".";
import SearchFromApi from "./search";

const DataTable = ({
  columns,
  data,
  rows,
  setRows,
  currentPage,
  setCurrentPage,
  totalRecords,
  selection,
  setSelection,
}) => {
  return (
    <div className="card table-list-card">
      <div className="card-header">
        <SearchFromApi rows={rows} setRows={setRows} />
      </div>

      <div className="card-body">
        <div className="table-responsive">
          <PrimeDataTable
            column={columns}
            data={data}
            rows={rows}
            setRows={setRows}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalRecords={totalRecords}
            selectionMode="checkbox"
            selection={selection}
            onSelectionChange={(e) => setSelection(e.value)}
            dataKey="id"
          />
        </div>
      </div>
    </div>
  );
};

export default DataTable;
