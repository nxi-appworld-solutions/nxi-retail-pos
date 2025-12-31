import Select from "react-select";
import CommonDateRangePicker from "./date-range-picker/common-date-range-picker";
import { PAY_CUSTOMER, PAY_STATUS } from "../constants";

const InvoiceReportFilters = ({ filters, setFilters, onSubmit, loading }) => {
  const handleDateChange = (dateRange) => {
    setFilters((prev) => ({
      ...prev,
      date: {
        start: dateRange[0].format("DD-MMM-YYYY"),
        end: dateRange[1].format("DD-MMM-YYYY"),
      },
    }));
  };

  return (
    <div className="card border-0">
      <div className="card-body pb-1">
        <form onSubmit={onSubmit}>
          <div className="row align-items-end">
            <div className="col-lg-10">
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label">Choose Date</label>
                    <div className="input-icon-start position-relative">
                      <CommonDateRangePicker selectedDate={handleDateChange} />
                      <span className="input-icon-left">
                        <i className="ti ti-calendar" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label">Customer</label>
                    <Select
                      classNamePrefix="react-select"
                      options={PAY_CUSTOMER}
                      placeholder="Choose"
                      onChange={(value) =>
                        setFilters({ ...filters, customer: value })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <Select
                      classNamePrefix="react-select"
                      options={PAY_STATUS}
                      placeholder="Choose"
                      onChange={(value) =>
                        setFilters({ ...filters, status: value })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="mb-3">
                <button
                  className="btn btn-primary w-100"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Generating..." : "Generate"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceReportFilters;
