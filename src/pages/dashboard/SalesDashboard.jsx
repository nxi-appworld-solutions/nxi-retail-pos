import React from "react";
import useDashboardSummary from "../../hooks/useDashboardSummary";
import Loader from "../../components/loader/loader";
import DashboardHeader from "./sections/DashboardHeader";
import SalesPurchaseChart from "./sections/SalesPurchaseChart";
import OverallInformation from "./sections/OverallInformation";
import RecentTransactions from "./sections/RecentTransactions";
import DashboardSummary from "./sections/DashboardSummary";

const SalesDashboard = () => {
  const { loading, summary, fetchSummary, baseChartOptions, chartData, totals, fetchDayChart, recentColumns, recentTrans, fetchRecentTrans } = useDashboardSummary();

  return (
    <div className="page-wrapper">
      {loading && <Loader />}
      <div className="content">
        <DashboardHeader />
        <div className="row sales-cards">
          <DashboardSummary summary={summary} onRefresh={fetchSummary} />
        </div>
        <div className="row">
          {/* <div className="col-xxl-8 col-xl-7 col-sm-12 col-12 d-flex"> */}
          <div className="col-xxl-12 col-xl-12 col-sm-12 col-12 d-flex">
            <SalesPurchaseChart chartConfig={{ ...baseChartOptions, series: chartData?.series, xaxis: chartData?.xaxis }} totals={totals} onRangeChange={fetchDayChart} />
          </div>
          {/* <div className="col-xxl-4 col-xl-5 d-flex">
            <OverallInformation />
          </div> */}
        </div>
        <div className="row">
          <RecentTransactions columns={recentColumns} dataSource={recentTrans} OnRecentTrans={fetchRecentTrans} />
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;
