import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../environment";
import useForm from "./useForm";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { initialCustomer } from "../constants/people/initialCustomer";

// ---------------- VALIDATION ---------------- //
const validateCustomer = (data) => {
  const errors = {};

  if (!data.name?.trim()) errors.name = "Name is required";
  if (!data.mobile || data.mobile.length < 10)
    errors.mobile = "Valid mobile number required";

  if (data.taxType === "Regular" && !data.gstin)
    errors.gstin = "GSTIN required for Regular GST";

  if (Number(data.creditLimit) < 0)
    errors.creditLimit = "Credit limit cannot be negative";

  if (data.status === "Blacklisted")
    errors.status = "Blacklisted customer cannot be billed";

  return errors;
};

export default function useCustomers() {
  /* ---------- FORM MODE ---------- */
  const navigate = useNavigate();
  const { formData, setFormData, handleChange, resetForm } =
    useForm(initialCustomer);

  const [errors, setErrors] = useState({});
  const [isSaved, setIsSaved] = useState(false);

  /* ---------- LIST MODE ---------- */
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  /* ---------- FETCH LIST ---------- */
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/GetCustomerMasterDet/customers`);
      const json = await res.json();
      setCustomers(json?.data || []);
    } catch {
      toast.error("Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- SAVE CUSTOMER ---------- */
  const saveCustomer = async (callback) => {
    const validationErrors = validateCustomer(formData);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      toast.error("Please fix validation errors");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/SaveOrUpdateCustomerDet/customers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.status === 1) {
        toast.success(data.msg || "Customer saved");
        setIsSaved(true);
        fetchCustomers();
        callback?.(data);
      } else {
        toast.error(data.msg || "Save failed");
      }
    } finally {
      setLoading(false);
    }
  };

  /* ---------- DELETE ---------- */
  const deleteCustomer = async (id, callback) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/DeleteMasterByTypeAndCode?tranType=1&masterType=2&code=${id}`,
        { method: "POST" }
      );
      const data = await res.json();
      toast[data.status === 1 ? "success" : "error"](data.msg);
      fetchCustomers();
      callback?.();
    } finally {
      setLoading(false);
    }
  };

  /* ---------- POS BILLING GATE ---------- */
  const startBilling = () => {
    if (!isSaved) {
      toast.error("Please save customer before billing");
      return;
    }
    navigate(`/pos/billing/${formData.code}`);
  };

  /* ---------- TABLE COLUMNS ---------- */
  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Type", dataIndex: "type" },
    { title: "Mobile", dataIndex: "mobile" },
    { title: "Email", dataIndex: "email" },
    { title: "City", dataIndex: "city" },
    { title: "Status", dataIndex: "status" },
    { title: "Created On", dataIndex: "createdOn" },
  ];

  useEffect(() => {
    fetchCustomers();
  }, []);

  /* ---------- RETURN (DUAL MODE) ---------- */
  return {
    /* FORM (Add / Edit) */
    formData,
    setFormData,
    handleChange,
    resetForm,
    saveCustomer,
    errors,
    isSaved,
    startBilling,

    /* LIST */
    customers,
    columns,
    fetchCustomers,
    deleteCustomer,

    /* COMMON */
    loading,
    selectedDate,
    setSelectedDate,
  };
}
