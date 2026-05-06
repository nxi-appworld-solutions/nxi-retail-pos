import React, { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../../core/redux/store/modalSlice";

const HoldOrderListModal = ({ orders = [], onRestore, onDelete, onPrint }) => {
  const dispatch = useDispatch();

  // Local UI states
  const [search, setSearch] = useState("");
  const [filterTag, setFilterTag] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [sortBy, setSortBy] = useState("time_desc");

  // ---------------------------
  // FILTER + SEARCH + SORT LOGIC
  // ---------------------------
  const filteredOrders = useMemo(() => {
    let data = [...orders];

    // Search
    if (search.trim() !== "") {
      const s = search.toLowerCase();
      data = data.filter(
        (o) =>
          o.holdId?.toLowerCase().includes(s) ||
          o.customer?.name?.toLowerCase().includes(s) ||
          o.customer?.phone?.toLowerCase().includes(s) ||
          String(o.tableNumber || "").includes(search)
      );
    }

    // Filter by tag
    if (filterTag !== "all") {
      data = data.filter((o) => o.tag === filterTag);
    }

    // Filter by priority
    if (filterPriority !== "all") {
      data = data.filter((o) => o.priority === filterPriority);
    }

    // Sorting
    if (sortBy === "time_desc") {
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "time_asc") {
      data.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === "amount_desc") {
      data.sort((a, b) => b.totalAmount - a.totalAmount);
    } else if (sortBy === "amount_asc") {
      data.sort((a, b) => a.totalAmount - b.totalAmount);
    }

    return data;
  }, [orders, search, filterTag, filterPriority, sortBy]);

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show d-block" role="dialog" aria-modal="true">
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            {/* <div className="page-wrapper p-0 m-0">
            <div className="content p-0"> */}
            {/* HEADER */}
            <div className="modal-header bg-dark text-white">
              <h5 className="modal-title text-white">Hold Order List</h5>
              <button
                type="button"
                className="modal-close-btnx"
                aria-label="Close"
                onClick={() => dispatch(closeModal("holdOrderList"))}
              >
                ✖
              </button>
            </div>

            {/* FILTERS & SEARCH */}
            <div className="modal-body">
              <div className="d-flex gap-3 mb-3">
                {/* Search */}
                <input
                  type="text"
                  placeholder="Search Hold No, Customer, Phone, Table..."
                  className="form-control"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                {/* Tag Filter */}
                <select
                  className="form-select"
                  value={filterTag}
                  onChange={(e) => setFilterTag(e.target.value)}
                >
                  <option value="all">All Tags</option>
                  <option value="counter">Counter</option>
                  <option value="takeaway">Takeaway</option>
                  <option value="online">Online</option>
                  <option value="dinein">Dine-In</option>
                </select>

                {/* Priority Filter */}
                <select
                  className="form-select"
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                >
                  <option value="all">All Priority</option>
                  <option value="urgent">Urgent</option>
                  <option value="normal">Normal</option>
                  <option value="low">Low</option>
                </select>

                {/* Sort */}
                <select
                  className="form-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="time_desc">Latest First</option>
                  <option value="time_asc">Oldest First</option>
                  <option value="amount_desc">Amount High → Low</option>
                  <option value="amount_asc">Amount Low → High</option>
                </select>
              </div>

              {/* ---------------------- */}
              {/* TABLE OF HOLD ORDERS    */}
              {/* ---------------------- */}
              <div className="table-responsive" style={{ maxHeight: "65vh" }}>
                <table className="table table-bordered table-striped">
                  <thead className="table-light">
                    <tr>
                      <th>Hold No</th>
                      <th>Customer</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Tag</th>
                      <th>Priority</th>
                      <th>Table</th>
                      <th>Created</th>
                      <th style={{ width: 180 }}>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.holdId}>
                        <td>{order.holdId}</td>
                        <td>{order.customer?.name || "Walk-in"}</td>
                        <td>{order.itemCount}</td>
                        <td>₹{Number(order.totalAmount).toFixed(2)}</td>
                        <td>{order.tag}</td>
                        <td>{order.priority}</td>
                        <td>{order.tableNumber || "-"}</td>
                        <td>{new Date(order.date).toLocaleString("en-IN")}</td>

                        <td className="text-center">
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() => onRestore(order)}
                          >
                            Restore
                          </button>

                          <button
                            className="btn btn-secondary btn-sm me-2"
                            onClick={() => onPrint(order)}
                          >
                            Print
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => onDelete(order)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}

                    {filteredOrders.length === 0 && (
                      <tr>
                        <td colSpan="9" className="text-center text-muted py-3">
                          No hold orders found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* </div>
        </div> */}
        </div>
      </div>
    </>
  );
};

export default HoldOrderListModal;
