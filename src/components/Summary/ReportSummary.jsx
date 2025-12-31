import ReportSummaryCard from "./ReportSummaryCard";

const ReportSummary = ({ summary = null }) => {
  // console.log("summary in cards", summary);

  if (!summary) return null;

  const cards = [
    {
      borderColor: "success",
      bgColor: "success",
      iconClass: "ti ti-align-box-bottom-left-filled",
      title: "Total Amount",
      value: `₹${summary?.totalAmount || 0}`,
    },
    {
      borderColor: "info",
      bgColor: "info",
      iconClass: "ti ti-align-box-bottom-left-filled",
      title: "Total Paid",
      value: `₹${summary?.totalPaid || 0}`,
    },
    {
      borderColor: "orange",
      bgColor: "orange",
      iconClass: "ti ti-moneybag",
      title: "Total Unpaid",
      value: `₹${summary?.totalUnpaid || 0}`,
    },
    {
      borderColor: "danger",
      bgColor: "danger",
      iconClass: "ti ti-alert-circle-filled",
      title: "Overdue",
      value: `₹${summary?.overdue || 0}`,
    },
  ];

  return (
    <div className="row">
      {cards.map((item, idx) => (
        <ReportSummaryCard key={idx} {...item} />
      ))}
    </div>
  );
};

export default ReportSummary;
