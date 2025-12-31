// components/purchases/PurchasesList.jsx
import React, { useEffect, useState } from "react";
import TransactionList from "../../../components/Transaction/TransactionList";
import TransactionFormModal from "../../../components/Transaction/FormModal";
import { Link, useNavigate } from "react-router-dom";
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
import RowActionButtons from "../../../components/table/RowActionButtons";

const PurchasesList = () => {
  const modal = useModal();
  const navigate = useNavigate();
  const { formData, setFormData, handleChange, resetForm } =
    useForm(initialPurchaseState);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs()); //const [uiDate, setUiDate] = useState(dayjs()); // UI ke liye
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch data hooks
  const { data: customer } = useFetchTransactionData(
    "customer",
    {},
    { enabled: shouldFetch }
  );
  const { data: stType } = useFetchTransactionData(
    "stType",
    { tranType: 1, masterType: 14 },
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
    { vchType: 2 },
    { enabled: true, cache: false }
  );

  // const { fetchData: saveTransaction, loading } =
  //   useFetchTransactionData("saveTransaction");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const payload = {
  //     ...formData,
  //     date: dayjs(formData.date).toISOString(),
  //     accCode: formData.name?.value || 0, // name se value nikala
  //     accName: formData.name?.label || "", // name se value nikala
  //     mcCode: formData.matCenter?.value || 0, // matCenter se value nikala
  //     mcName: formData.matCenter?.label || "", // matCenter se value nikala
  //     stType: formData.purcType?.value || 0, // purchase type se value nikala
  //     stName: formData.purcType?.label || "", // purchase type se value nikala

  //     tProductDets: products.map((p) => ({
  //       vchNo: formData.vchNo || "",
  //       itemCode: p.code || 0,
  //       itemName: p.name || "",
  //       imcCode: formData.matCenter?.value || 0,
  //       imcName: formData.matCenter?.label || "",
  //       qty: p.qty,
  //       price: p.price,
  //       amount: p.totalCost,
  //       discount: p.discount || 0,
  //       taxPer: p.taxPer || 0,
  //       taxAmt: p.taxAmt || 0,
  //       unitCost: p.unitCost || p.price,
  //       image: p.image || "",
  //     })),
  //   };
  //   try {
  //     const abc = await saveTransaction(payload);
  //     console.log("cuygcdu", abc);
  //     toast.success("Transaction saved!");
  //   } catch (err) {
  //     toast.error(err.message);
  //   }
  // };
  const products = useSelector((state) => state?.transaction?.products);
  const totals = useSelector((state) => state?.transaction?.totals);

  // Sync fetched data to form
  useEffect(() => {
    if (vchNo?.data?.[0]) {
      setFormData((prev) => ({
        ...prev,
        vchNo: vchNo.data[0]?.vchNo,
        refNo: vchNo.data[0]?.refNo,
        OrderId: vchNo.data[0]?.OrderId,
        date: dayjs().format("DD-MMM-YYYY"),
      }));
    }
  }, [vchNo, setFormData]);

  useEffect(() => {
    if (getTransactions?.data?.length) {
      const datasource = getTransactions?.data?.map((item) => ({
        name: item.accName,
        vchNo: item.vchNo,
        date: dayjs(item.date).format("DD-MMM-YYYY"),
        status: "Success",
        totAmt: item.totAmt,
        paid: item.paidAmt || item.totAmt,
        due: item.dueAmt || 0,
        paymentstatus: "Paid",
        createdBy: item.date || item.createdBy || "XcelTec",
      }));
      setTableData(datasource);
    } else {
      toast.warning(getTransactions?.msg);
    }
  }, [getTransactions, setTableData]);

  useEffect(() => {
    if (products?.length > 0) {
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

  console.log("formData", formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Saving data:", formData);
    const payload = {
      ...formData,
      // date: dayjs(formData.date).toISOString(),
      date: formData.date || null,
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

    console.log("Saving data:", payload);
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
      console.log("Saved:", result);
      if (result.status == 1) {
        toast.success(result.msg);
        resetForm();
        modal.close();

        // clear cache before refetch
        refetchTransactions.cacheRef = {};
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

  const handleEditRow = (record) => {
    setSelectedRecord(record);
  };

  const handleViewRow = (record) => {
    setSelectedRecord(record);
  };

  const handleDeleteRow = (record) => {
    setDeleteModal(true);
    setSelectedItem(record);
  };

  const columns = [
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
      title: "Supplier",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => (
        <span
          className={`badges status-badge fs-10 p-1 px-2 rounded-1 ${
            text === "Pending"
              ? "badge-pending"
              : text === "Pending"
              ? "bg-warning"
              : ""
          }`}
        >
          {text}
        </span>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: "Grand Total",
      dataIndex: "totAmt",
      sorter: (a, b) => a.totAmt.length - b.totAmt.length,
    },
    {
      title: "Paid",
      dataIndex: "paid",
      sorter: (a, b) => a.paid.length - b.paid.length,
    },
    {
      title: "Due",
      dataIndex: "due",
      sorter: (a, b) => a.due.length - b.due.length,
    },
    {
      title: "Payment Status",
      dataIndex: "paymentstatus",
      render: (text) =>
        console.log("Payment Status Text:", text) || (
          <span
            className={`p-1 pe-2 rounded-1  fs-10 ${
              text === "Paid"
                ? "text-success bg-success-transparent"
                : text === "Overdue"
                ? "text-warning bg-warning-transparent "
                : "text-danger bg-danger-transparent "
            }`}
          >
            <i className="ti ti-point-filled me-1 fs-11"> </i> {text}
          </span>
        ),
      sorter: (a, b) => a.createdBy.length - b.createdBy.length,
    },

    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <RowActionButtons
          onView={() => handleViewRow(record)}
          onEdit={() => handleEditRow(record)}
          onDelete={() => handleDeleteRow(record)}
        />
      ),
    },
  ];

  return (
    <>
      <TransactionList
        title="Purchase"
        subtitle="Manage Your purchase"
        columns={columns}
        dataSource={tableData}
        productModalIsOpen={() => {
          modal.open();
          setShouldFetch(true);
        }}
        modalId="edit-purchase-modal"
        importModalId="view-notes"
        addLabel="Add Purchase"
        importLabel="Import Purchase"
        isLoading={loadingTable}
      />

      <TransactionFormModal
        type="purchase"
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
        // error={error}
      />

      <ImportPurchases />
    </>
  );
};

export default PurchasesList;
