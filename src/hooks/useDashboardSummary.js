import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  dashboardCardSummary,
  dashboardRecentTransactions,
  dashboardSalePurchaseDayChart,
} from "../services/service";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../core/img/imagewithbasebath";
import { Clock } from "react-feather";

export default function useDashboardSummary() {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [recentTrans, setRecentTrans] = useState(null);
  const [chartData, setChartData] = useState({
    series: [],
    xaxis: {
      categories: [],
      labels: { style: { colors: "#6B7280", fontSize: "13px" } },
    },
  });
  const [totals, setTotals] = useState({ sales: 0, purchase: 0 });

  const baseChartOptions = {
    chart: {
      height: 245,
      type: "bar",
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    colors: ["#FE9F43", "#FFE3CB"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        borderRadius: 8,
        borderRadiusWhenStacked: "all",
        horizontal: false,
        endingShape: "rounded",
      },
    },
    xaxis: {
      categories: [],
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "13px",
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (val) => `${val}K`,
        offsetX: -15,
        style: {
          colors: "#6B7280",
          fontSize: "13px",
        },
      },
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 5,
      padding: {
        left: -16,
        top: 0,
        bottom: 0,
        right: 0,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
    },
  };

  const columns = [
    {
      title: "#",
      dataIndex: "srno",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Order Details",
      dataIndex: "items",
      render: (text, _) => (
        <div className="d-flex align-items-center">
          <Link className="avatar avatar-lg me-2">
            <ImageWithBasePath
              src={_.image || `assets/img/products/stock-img-05.png`}
              alt="img"
            />
          </Link>
          <div>
            <h6 className="fw-bold">
              <Link className="fw-bold">{text}</Link>
            </h6>
            <span className="d-flex align-items-center">
              <Clock className="feather-14" />
              15 Mins
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "Payment",
      dataIndex: "paymentMode",
      render: (text, _) => (
        <>
          <span className="d-block head-text">{text}</span>
          <span className="text-blue">#{_?.txnId}</span>
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "paymentStatus",
      render: (text) => (
        <>
          <span
            className={`badge ${
              text == "SUCCESS"
                ? "badge-success"
                : text == "PENDING"
                ? "badge-cyan"
                : "badge-danger"
            } badge-xs d-inline-flex align-items-center`}
          >
            <i className="ti ti-circle-filled fs-5 me-1" />
            {text}
          </span>
        </>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (text) => (
        <a className="fs-16 fw-bold text-gray-9">₹{text.toFixed(2)}</a>
      ),
    },
  ];

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const resp = await dashboardCardSummary();
      const row = resp?.data[0] || {};
      setSummary({
        totalSale: row.totalSale || 0,
        totalPurchase: row.totalPurchase || 0,
        totalPaid: row.totalPaid || 0,
        totalUnpaid: row.totalUnpaid || 0,
      });
    } catch (err) {
      toast.error(`API error: ${err?.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchDayChart = async (range) => {
    setLoading(false);
    try {
      const resp = await dashboardSalePurchaseDayChart(range);
      if (resp.status === 1) {
        const { chart } = resp.data;

        const totalSales =
          chart.series[0]?.data.reduce((a, b) => a + b, 0) || 0;
        const totalPurchase =
          chart.series[1]?.data.reduce((a, b) => a + b, 0) || 0;

        setTotals({
          sales: totalSales.toFixed(2),
          purchase: totalPurchase.toFixed(2),
        });
        setChartData({
          series: chart.series,
          xaxis: {
            ...chart.xaxis,
            labels: { style: { colors: "#6B7280", fontSize: "13px" } },
          },
        });
      } else {
        setChartData({
          series: [],
          xaxis: {
            categories: [],
            labels: { style: { colors: "#6B7280", fontSize: "13px" } },
          },
        });
      }
    } catch (err) {
      toast.error(`API error: ${err?.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentTrans = async () => {
    const resp = await dashboardRecentTransactions();

    const abc = resp?.data?.map((row, index) => ({
      srno: index + 1,
      image: row.image,
      date: row.date,
      items: row.items,
      paymentMode: row.paymentMode,
      txnId: row.txnId,
      paymentStatus: row.paymentStatus || "PENDING",
      amount: row.amount,
    }));

    // console.log("recent", abc);
    setRecentTrans(abc);
  };

  useEffect(() => {
    fetchSummary();
    fetchDayChart();
    fetchRecentTrans();
  }, []);

  return {
    loading,
    summary,
    fetchSummary,
    baseChartOptions,
    chartData,
    totals,
    fetchDayChart,
    recentColumns: columns,
    recentTrans,
    fetchRecentTrans,
  };
}
