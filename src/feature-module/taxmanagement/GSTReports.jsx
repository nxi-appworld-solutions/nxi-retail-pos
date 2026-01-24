import React, { useState } from "react";
import {
  Percent,
  Filter,
  FileText,
  Download,
} from "react-feather";

const GSTReports = () => {
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    branch: "ALL",
    supplyType: "ALL",
    gstType: "ALL",
    hsn: "",
    gstSlab: "ALL",
    customerType: "ALL",
    reportView: "SUMMARY",
  });

  const handleChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Dummy summary (API se aayega)
  const summary = {
    taxable: 250000,
    cgst: 22500,
    sgst: 22500,
    igst: 0,
    totalGST: 45000,
    netAmount: 295000,
  };

  const slabs = [
    { slab: "0%", taxable: 20000, gst: 0 },
    { slab: "5%", taxable: 50000, gst: 2500 },
    { slab: "12%", taxable: 40000, gst: 4800 },
    { slab: "18%", taxable: 100000, gst: 18000 },
    { slab: "28%", taxable: 40000, gst: 11200 },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <div className="p-2 bg-soft-success rounded-3 me-3 text-success">
              <Percent size={22} />
            </div>
            <div>
              <h4 className="fw-bold mb-0">GST Reports</h4>
              <small className="text-muted">
                Advanced GST analysis & compliance summary
              </small>
            </div>
          </div>

          <button className="btn btn-outline-primary d-flex align-items-center">
            <Download size={14} className="me-2" />
            Export
          </button>
        </div>

        {/* FILTERS */}
        <div className="card shadow-sm mb-3">
          <div className="card-header bg-white fw-bold d-flex align-items-center">
            <Filter size={14} className="me-2" />
            Filters
          </div>

          <div className="card-body row g-3">
            {[
              { label: "From Date", type: "date", name: "fromDate" },
              { label: "To Date", type: "date", name: "toDate" },
            ].map((f) => (
              <div className="col-md-2" key={f.name}>
                <label className="fw-bold small">{f.label}</label>
                <input
                  type={f.type}
                  className="form-control shadow-sm"
                  value={filters[f.name]}
                  onChange={(e) =>
                    handleChange(f.name, e.target.value)
                  }
                />
              </div>
            ))}

            <div className="col-md-2">
              <label className="fw-bold small">Supply Type</label>
              <select
                className="form-select shadow-sm"
                value={filters.supplyType}
                onChange={(e) =>
                  handleChange("supplyType", e.target.value)
                }
              >
                <option value="ALL">All</option>
                <option value="INTRA">Intra-State</option>
                <option value="INTER">Inter-State</option>
              </select>
            </div>

            <div className="col-md-2">
              <label className="fw-bold small">Customer Type</label>
              <select
                className="form-select shadow-sm"
                value={filters.customerType}
                onChange={(e) =>
                  handleChange("customerType", e.target.value)
                }
              >
                <option value="ALL">All</option>
                <option value="B2B">B2B</option>
                <option value="B2C">B2C</option>
              </select>
            </div>

            <div className="col-md-2">
              <label className="fw-bold small">GST Slab</label>
              <select
                className="form-select shadow-sm"
                value={filters.gstSlab}
                onChange={(e) =>
                  handleChange("gstSlab", e.target.value)
                }
              >
                <option value="ALL">All</option>
                <option>0%</option>
                <option>5%</option>
                <option>12%</option>
                <option>18%</option>
                <option>28%</option>
              </select>
            </div>

            <div className="col-md-2">
              <label className="fw-bold small">Report View</label>
              <select
                className="form-select shadow-sm"
                value={filters.reportView}
                onChange={(e) =>
                  handleChange("reportView", e.target.value)
                }
              >
                <option value="SUMMARY">GST Summary</option>
                <option value="SLAB">GST Slab-wise</option>
                <option value="HSN">HSN-wise</option>
                <option value="INVOICE">Invoice-wise</option>
              </select>
            </div>

            <div className="col-md-2 d-flex align-items-end">
              <button className="btn btn-primary w-100">
                Generate
              </button>
            </div>
          </div>
        </div>

        {/* SUMMARY VIEW */}
        {filters.reportView === "SUMMARY" && (
          <div className="row g-3">
            {Object.entries(summary).map(([key, val]) => (
              <div className="col-md-4" key={key}>
                <div className="p-3 bg-soft-light border rounded-3">
                  <div className="small text-muted text-uppercase">
                    {key}
                  </div>
                  <div className="fw-bold fs-5">
                    ₹ {val.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SLAB VIEW */}
        {filters.reportView === "SLAB" && (
          <div className="card shadow-sm">
            <table className="table table-hover mb-0">
              <thead className="bg-light">
                <tr>
                  <th>GST Slab</th>
                  <th>Taxable Amount</th>
                  <th>GST Amount</th>
                </tr>
              </thead>
              <tbody>
                {slabs.map((s) => (
                  <tr key={s.slab}>
                    <td>{s.slab}</td>
                    <td>₹ {s.taxable.toLocaleString()}</td>
                    <td>₹ {s.gst.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* PLACEHOLDER */}
        {["HSN", "INVOICE"].includes(filters.reportView) && (
          <div className="card shadow-sm">
            <div className="card-body text-center text-muted">
              <FileText size={32} className="mb-2" />
              <div className="fw-bold">
                Detailed report will load here
              </div>
              <small>
                Based on selected filters & date range
              </small>
            </div>
          </div>
        )}

        {/* FOOT NOTE */}
        <div className="text-muted small mt-4">
          ℹ GST reports are for internal reconciliation & audit support only.
          Use accounting software for statutory filing.
        </div>
      </div>
    </div>
  );
};

export default GSTReports;
