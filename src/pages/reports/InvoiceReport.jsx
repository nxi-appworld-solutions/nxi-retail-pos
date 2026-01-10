import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { invoiceReport } from "../../services/service";
import ReportSummaryCards from "../../components/Summary/ReportSummary";
import InvoiceReportFilters from "../../components/InvoiceReportFilters";
import InvoiceReportTable from "../../components/InvoiceReportTable";
import CommonFooter from "../../core/common/footer/commonFooter";
import { exportToExcel } from "../../utils/exportToExcel";
import TableHeaderActions from "../../components/data-table/TableHeaderActions";
import Loader from "../../components/loader/loader";

const InvoiceReport = () => {
  const [filters, setFilters] = useState({
    date: { start: null, end: null },
    customer: null,
    status: null,
  });

  const [data, setData] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateReport = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    const startDate = filters?.date?.start;
    const endDate = filters?.date?.end;
    const customer = filters.customer?.value || null;
    const status = filters.status?.value || 0;

    setLoading(true);
    try {
      const resp = await invoiceReport(9, startDate, endDate, customer, status);

      const rows = resp?.data?.transactions || [];

      const formattedData = rows.map((item) => ({
        orderNo: item.orderId,
        invoiceNo: item.invNo,
        customer: item.accName,
        dueDate: item.invDt,
        amount: `₹${item.amount}`,
        paid: item.paymentStatus === "PAID" ? item.amount : "0.00",
        amountDue: item.paymentStatus === "PAID" ? "0.00" : item.amount,
        status: item.paymentStatus,
      }));

      setData(formattedData);
      setSummary(resp?.data?.summary || null);
    } catch (err) {
      toast.error(`API error: ${err?.message || "Something went wrong"}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGenerateReport();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {loading && <Loader loading={loading} />}
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>Invoice Report</h4>
              <h6>Manage Your Invoice Report</h6>
            </div>

            <TableHeaderActions
              onExportPdf={() =>
                toast.info("Export to PDF is not implemented yet")
              }
              onExportExcel={() =>
                exportToExcel(
                  data,
                  `Invoice_Report_${new Date().toISOString().slice(0, 10)}`,
                  [],
                  "Invoice Report",
                  () => toast.success("Excel downloaded")
                )
              }
              onRefresh={() => handleGenerateReport()}
            />
          </div>

          <ReportSummaryCards summary={summary} />

          <InvoiceReportFilters
            filters={filters}
            setFilters={setFilters}
            onSubmit={handleGenerateReport}
            loading={loading}
          />

          <InvoiceReportTable data={data} />
        </div>

        <CommonFooter />
      </div>
    </div>
  );
};

export default InvoiceReport;
