import React from "react";
import DashboardSummaryCard from "./DashboardSummaryCard";

const DashboardSummary = ({ summary = null, onRefresh }) => {

  // if (!summary) return null;

  const cards = [
    {
      bgColor: "bg-primary",
      iconImg: "assets/img/icons/total-sales.svg",
      title: "No of Total Sales",
      // count: `₹${summary?.totalSale || 0}`,
      count: `${summary?.totalSale || 0}`,

    },
    {
      bgColor: "bg-secondary",
      iconImg: "assets/img/icons/purchased-earnings.svg",
      title: "No of Total Purchases",
      count: `${summary?.totalPurchase || 0}`,
    },
    {
      bgColor: "bg-teal",
      iconImg: "assets/img/icons/total-sales.svg",
      title: "No of Total Payment Paid",
      count: `${summary?.totalPaid || 0}`,
    },
    {
      bgColor: "bg-info",
      iconImg: "assets/img/icons/purchased-earnings.svg",
      title: "No of Total Payment Unpaid",
      count: `${summary?.totalUnpaid || 0}`,
    },
  ];

  return (
    <div className="row">
      {cards?.map((item, idx) => (
        <DashboardSummaryCard key={idx} {...item} onRefresh={onRefresh}/>
      ))}
    </div>
  );
};

export default DashboardSummary;
