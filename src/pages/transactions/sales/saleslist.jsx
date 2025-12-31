// components/purchases/PurchasesList.jsx
import React, { useEffect, useState } from "react";
import TransactionList from "../../../components/Transaction/TransactionList";
import TransactionFormModal from "../../../components/Transaction/FormModal";
import { purchaseslist } from "../../../core/json/purchaselistdata";
import { Link } from "react-router-dom";
import {
  CustomerName,
  OrderStatus,
  PaymentType,
  Supplier,
} from "../../../core/common/selectOption/selectOption";
import useFetchTransactionData from "../../../hooks/useFetchTransactionData";
import dayjs from "dayjs";
import ImportPurchases from "../../../core/modals/purchases/importpurchases";
import useModal from "../../../hooks/useModal";
import useForm from "../../../hooks/useForm";
import { useSelector } from "react-redux";
import { API_URL } from "../../../environment";
import { toast } from "react-toastify";
import { initialPurchaseState } from "../../../constants/transactions/PurchaseForm";
import { generatePDF } from "../../../utils/pdfGenerator";
import { handleExportToExcelTransaction } from "../../../utils/exportToExcel";

const PurchasesList = () => {
  const modal = useModal();
  const { formData, setFormData, handleChange, resetForm } =
    useForm(initialPurchaseState);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs()); //const [uiDate, setUiDate] = useState(dayjs()); // UI ke liye
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  // Fetch data hooks
  const { data: customer } = useFetchTransactionData(
    "customer",
    {},
    { enabled: shouldFetch }
  );
  const { data: stType } = useFetchTransactionData(
    "stType",
    {},
    { enabled: shouldFetch }
  );
  const { data: matCenter } = useFetchTransactionData(
    "matCenter",
    {},
    { enabled: shouldFetch }
  );
  const { data: vchNo } = useFetchTransactionData(
    "vchNo",
    {},
    { enabled: shouldFetch }
  );
  const {
    data: getTransactions,
    fetchData: refetchTransactions,
    loading: loadingTable,
  } = useFetchTransactionData(
    "tableData",
    { vchType: 9 },
    { enabled: true, cache: false }
  );
  // vchType 2 for purchase, 9 for sales
  const products = useSelector((state) => state.transaction.products);
  const totals = useSelector((state) => state.transaction.totals);

  // Sync fetched data to form
  useEffect(() => {
    if (vchNo?.data?.[0]) {
      setFormData((prev) => ({
        ...prev,
        vchNo: vchNo.data[0]?.vchNo,
        refNo: vchNo.data[0]?.refNo,
        date: dayjs().format("DD-MMM-YYYY"),
      }));
    }
  }, [vchNo, setFormData]);

  useEffect(() => {
    // console.log("getTransactions", getTransactions);

    if (getTransactions?.data?.length) {
      const datasource = getTransactions.data.map((item) => ({
        name: item.accName || "Symbiosis Canteen Buyer",
        vchNo: item.vchNo,
        orderNo: item.orderNo || item.vchNo,
        date: dayjs(item.date).format("DD-MMM-YYYY"),
        status: item.paymentStatus || "Pending",
        totAmt: item.totAmt,
        paid: item.payAmt || item.totAmt,
        due: item.totAmt - item.payAmt || 0,
        createdBy: item.createdBy || "System",
        createdOn: item.createdOn,
        paymentMode: item.paymentMode,
        paymentMethod: item.paymentMethod,
        paymentStatus: item.paymentStatus,
        products: item.tProductDets.map((prod) => ({
          itemCode: prod.itemCode,
          itemName: prod.itemName,
          qty: prod.qty,
          price: prod.price,
          amount: prod.amount,
          taxPer: prod.taxPer,
          taxAmt: prod.taxAmt,
          image: prod.image,
        })),
      }));

      console.log("datasource ===>", datasource);
      setTableData(datasource);
    } else {
      toast.warning(getTransactions?.msg);
    }
  }, [getTransactions, setTableData]);

  // console.log("tableData", tableData);

  useEffect(() => {
    if (products.length > 0) {
      const subTot = products.reduce((sum, p) => sum + p.totalCost, 0);
      const taxAmt = products.reduce((sum, p) => sum + (p.taxAmt || 0), 0);
      const discount = products.reduce((sum, p) => sum + (p.discount || 0), 0);
      const totAmt = subTot + taxAmt - discount;

      setFormData((prev) => ({
        ...prev,
        subTot,
        taxAmt,
        discount,
        totAmt,
      }));
    }
  }, [products, setFormData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Saving data:", formData);
    const payload = {
      ...formData,
      date: dayjs(formData.date).toISOString(),
      accCode: formData.name?.value || 0, // name se value nikala
      accName: formData.name?.label || "", // name se value nikala
      mcCode: formData.matCenter?.value || 0, // matCenter se value nikala
      mcName: formData.matCenter?.label || "", // matCenter se value nikala
      stType: formData.purcType?.value || 0, // purchase type se value nikala
      stName: formData.purcType?.label || "", // purchase type se value nikala
      tranType: formData.tranType || 1, // 1 for purchase
      tProductDets: products.map((p) => ({
        vchNo: formData.vchNo || "",
        itemCode: p.code || 0,
        itemName: p.name || "",
        imcCode: formData.matCenter?.value || 0,
        imcName: formData.matCenter?.label || "",
        qty: p.qty,
        price: p.price,
        amount: p.totalCost,
        discount: p.discount || 0,
        taxPer: p.taxPer || 0,
        taxAmt: p.taxAmt || 0,
        unitCost: p.unitCost || p.price,
        image: p.image || "",
      })),
    };

    // console.log("Saving data:", payload);
    try {
      const res = await fetch(
        `${API_URL}/SaveOrUpdateTransactionDet/transactions/purchase`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Failed to save");
      const result = await res.json();
      // console.log("Saved:", result);
      if (result.status == 1) {
        toast.success(result.msg);
        resetForm();
        modal.close();
        // 🔹 Save ke baad table refresh
        await refetchTransactions();
      } else {
        toast.warning(result.msg);
      }
    } catch (err) {
      console.error("Error saving transaction:", err);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    handleChange("date", date ? dayjs(date).format("DD-MMM-YYYY") : "");
  };

  const columns = [
    // {
    //   title: "Supplier",
    //   dataIndex: "name",
    //   sorter: (a, b) => a.name.length - b.name.length,
    // },
    {
      title: "Order Id",
      dataIndex: "orderNo",
      // sorter: (a, b) => a.orderNo.localeCompare(b.orderNo),
      sorter: (a, b) => {
        const numA = parseInt(a.orderNo, 10);
        const numB = parseInt(b.orderNo, 10);
        return numA - numB;
      },
    },
    {
      title: "Order Date",
      dataIndex: "createdOn",
      sorter: (a, b) => a.createdOn.length - b.createdOn.length,
    },
    {
      title: "Invoice No.",
      dataIndex: "vchNo",
      sorter: (a, b) => a.vchNo.length - b.vchNo.length,
    },
    {
      title: "Invoice Date",
      dataIndex: "date",
      sorter: (a, b) => a.date.length - b.date.length,
    },
    {
      title: "Customer",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   render: (text) => (
    //     <span
    //       className={`badges status-badge fs-10 p-1 px-2 rounded-1 ${
    //         text === "Pending"
    //           ? "badge-pending"
    //           : text === "Pending"
    //           ? "bg-warning"
    //           : ""
    //       }`}
    //     >
    //       {text}
    //     </span>
    //   ),
    //   sorter: (a, b) => a.status.length - b.status.length,
    // },
    {
      title: "Grand Total",
      dataIndex: "totAmt",
      sorter: (a, b) => a.totAmt.length - b.totAmt.length,
    },
    // {
    //   title: "Paid",
    //   dataIndex: "paid",
    //   sorter: (a, b) => a.paid.length - b.paid.length,
    // },
    // {
    //   title: "Due",
    //   dataIndex: "due",
    //   sorter: (a, b) => a.due.length - b.due.length,
    // },
    {
      title: "Method",
      dataIndex: "paymentMethod",
      sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
      render: (text) => (
        <span
          className={`badges status-badge fs-10 p-1 px-2 rounded-1 ${
            text === "CASH"
              ? "badge-pending"
              : text === "ONLINE"
              ? "bg-warning"
              : ""
          }`}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Mode",
      dataIndex: "paymentMode",
      sorter: (a, b) => a.paymentMode.length - b.paymentMode.length,
      render: (text) => (
        <span
          className={`badges status-badge fs-10 p-1 px-2 rounded-1 ${
            text === "UPI"
              ? "badge-pending"
              : text === "NA"
              ? "bg-danger"
              : "bg-green"
          }`}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      render: (text) => (
        <span
          className={`p-1 pe-2 rounded-1  fs-10 ${
            text ===
            ("SUCCESS" || "Success" || "Paid" || "Completed" || "Full Paid")
              ? "text-success bg-success-transparent"
              : text === "PENDING"
              ? "text-danger bg-danger-transparent"
              : text === "Overdue"
              ? "text-warning bg-warning-transparent "
              : "text-info bg-info-transparent"
          }`}
        >
          <i className="ti ti-point-filled me-1 fs-11"> </i>{" "}
          {text === "PENDING" ? "CANCELLED" : text}
        </span>
      ),
      sorter: (a, b) => a.createdBy.length - b.createdBy.length,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, row) => (
        <div className="text-center">
          <Link
            className="action-set"
            to="#"
            data-bs-toggle="dropdown"
            aria-expanded="true"
          >
            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
          </Link>
          <ul className="dropdown-menu">
            <li>
              <Link
                to="#"
                className="dropdown-item"
                data-bs-toggle="modal"
                data-bs-target="#sales-details-new"
              >
                <i data-feather="eye" className="feather-eye me-2"></i>Sale
                Detail
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="dropdown-item"
                data-bs-toggle="modal"
                data-bs-target="#showpayment"
              >
                ₹ Show Payments
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="dropdown-item"
                data-bs-toggle="modal"
                data-bs-target="#createpayment"
              >
                <i
                  data-feather="plus-circle"
                  className="feather-plus-circle me-2"
                ></i>
                Create Payment
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="dropdown-item"
                onClick={(e) => {
                  e.preventDefault(); // ⛔ default navigation stop karega
                  generatePDF(row, {
                    title: "Sales Invoice",
                    fileName: `Sales_Invoice_${row.orderNo}.pdf`,
                  });
                }}
              >
                <i data-feather="download" className="feather-edit me-2"></i>
                Download pdf
              </Link>
            </li>
          </ul>
        </div>
      ),
    },
  ];

  console.log("tableData", tableData);

  return (
    <>
      <TransactionList
        title="Sales"
        subtitle="Manage Your sales"
        columns={columns}
        dataSource={tableData}
        onExportExcel={() => handleExportToExcelTransaction(tableData)}
        productModalIsOpen={() => {
          modal.open();
          setShouldFetch(true);
        }}
        modalId="edit-sales-modal"
        importModalId="view-notes"
        addLabel="Add Sales"
        importLabel="Import Sales"
        isLoading={loadingTable}
      />

      <TransactionFormModal
        type="sale"
        title="Entry"
        onShow={modal.isOpen}
        onClose={modal.close}
        onReset={resetForm}
        customers={customer?.data || []}
        storeList={matCenter?.data || []}
        purcTypeList={stType?.data || []}
        productList={[]}
        statusList={OrderStatus}
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        transactionData={formData}
        calTotals={totals}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={isLoading}
      />

      <ImportPurchases />
    </>
  );
};

export default PurchasesList;
