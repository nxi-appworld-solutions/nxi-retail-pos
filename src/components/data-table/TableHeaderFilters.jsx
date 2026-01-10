import { Link } from "react-router-dom";

const TableHeaderFilters = () => {
  return (
    <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
      <div className="search-set" />

      <div className="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3">
        {/* STATUS FILTER */}
        <div className="dropdown me-2">
          <Link
            to="#"
            className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
            data-bs-toggle="dropdown"
          >
            Status
          </Link>

          <ul className="dropdown-menu dropdown-menu-end p-3">
            <li>
              <button className="dropdown-item rounded-1" type="button">
                Active
              </button>
            </li>
            <li>
              <button className="dropdown-item rounded-1" type="button">
                Inactive
              </button>
            </li>
          </ul>
        </div>

        {/* SORT FILTER */}
        <div className="dropdown">
          <Link
            to="#"
            className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
            data-bs-toggle="dropdown"
          >
            Sort By : Last 7 Days
          </Link>

          <ul className="dropdown-menu dropdown-menu-end p-3">
            {[
              "Recently Added",
              "Ascending",
              "Descending",
              "Last Month",
              "Last 7 Days",
            ].map((item) => (
              <li key={item}>
                <button className="dropdown-item rounded-1" type="button">
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TableHeaderFilters;
