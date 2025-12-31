import { Link } from "react-router-dom";
import { Table } from "antd";

const InvoiceReportTable = ({ data }) => {
  const columns = [
    {
      title: "Order No.",
      dataIndex: "orderNo",
      sorter: (a, b) => parseInt(a.orderNo) - parseInt(b.orderNo),
      render: (text) => <Link to="#">{text}</Link>,
    },
    { title: "Invoice Number", dataIndex: "invoiceNo" },
    { title: "Invoice Date", dataIndex: "dueDate" },
    { title: "Customer", dataIndex: "customer" },
    { title: "Amount", dataIndex: "amount" },
    { title: "Paid", dataIndex: "paid" },
    { title: "Amount Due", dataIndex: "amountDue" },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => (
        <span className={`badge ${text === "PAID" ? "badge-success" : "badge-danger"}`}>
          <i className="ti ti-point-filled me-1" /> {text}
        </span>
      ),
    },
  ];

  return (
    <div className="card table-list-card no-search">
      <div className="card-header">
        <h4>Invoice Report</h4>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
    </div>
  );
};

export default InvoiceReportTable;
