import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { API_URL } from "../../../environment";
import useForm from "../../../hooks/useForm";

import {
  validateCustomer,
  normalizeCustomer,
  canStartBilling,
  isDuplicateMobile,
} from "../customer.logic";

import { initialCustomer } from "../constants/initialCustomer";

/* ============================================================================
   CUSTOMER DOMAIN HOOK
============================================================================ */
export default function useCustomers() {
  /* ---------------- ROUTER ---------------- */
  const navigate = useNavigate();

  /* ---------------- FORM STATE ---------------- */
  const {
    formData,
    setFormData,
    handleChange,
    resetForm,
  } = useForm(initialCustomer);

  const [errors, setErrors] = useState({});
  const [isSaved, setIsSaved] = useState(false);

  /* ---------------- LIST STATE ---------------- */
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ============================================================================
     FETCH CUSTOMER LIST
  ============================================================================ */
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/GetCustomerMasterDet/customers`);
      const json = await res.json();
      setCustomers(json?.data || []);
    } catch (err) {
      toast.error("Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  };

  /* ============================================================================
     SAVE CUSTOMER (ADD / EDIT)
  ============================================================================ */
  const saveCustomer = async (callback) => {
    const normalized = normalizeCustomer(formData);

    /* ---------- VALIDATION ---------- */
    const validationErrors = validateCustomer(normalized);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      toast.error("Please fix validation errors");
      return;
    }

    /* ---------- DUPLICATE MOBILE CHECK ---------- */
    if (isDuplicateMobile(normalized.mobile, customers)) {
      toast.error("Customer with this mobile already exists");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/SaveOrUpdateCustomerDet/customers`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(normalized),
        }
      );

      const data = await res.json();

      if (data?.status === 1) {
        toast.success(data.msg || "Customer saved successfully");
        setIsSaved(true);
        fetchCustomers();
        callback?.(data);
      } else {
        toast.error(data.msg || "Failed to save customer");
      }
    } catch (err) {
      toast.error("Server error while saving customer");
    } finally {
      setLoading(false);
    }
  };

  /* ============================================================================
     DELETE CUSTOMER
  ============================================================================ */
  const deleteCustomer = async (code, callback) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/DeleteMasterByTypeAndCode?tranType=1&masterType=2&code=${code}`,
        { method: "POST" }
      );

      const data = await res.json();
      toast[data.status === 1 ? "success" : "error"](data.msg);
      fetchCustomers();
      callback?.();
    } catch {
      toast.error("Failed to delete customer");
    } finally {
      setLoading(false);
    }
  };

  /* ============================================================================
     LOAD CUSTOMER FOR EDIT
  ============================================================================ */
  const loadCustomerForEdit = (customer) => {
    setFormData({ ...initialCustomer, ...customer });
    setIsSaved(true);
  };

  /* ============================================================================
     POS BILLING GUARD
  ============================================================================ */
  const startBilling = () => {
    const result = canStartBilling(formData);
    if (result !== true) {
      toast.error(result);
      return;
    }
    navigate(`/pos/billing/${formData.code}`);
  };

  /* ============================================================================
     TABLE COLUMNS (LIST PAGE)
  ============================================================================ */
  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Type", dataIndex: "type" },
    { title: "Mobile", dataIndex: "mobile" },
    { title: "Email", dataIndex: "email" },
    { title: "City", dataIndex: "city" },
    { title: "Status", dataIndex: "status" },
    { title: "Created On", dataIndex: "createdOn" },
  ];

  /* ---------------- INIT ---------------- */
  useEffect(() => {
    fetchCustomers();
  }, []);

  /* ============================================================================
     PUBLIC API (HOOK RETURN)
  ============================================================================ */
  return {
    /* -------- FORM -------- */
    formData,
    setFormData,
    handleChange,
    resetForm,
    saveCustomer,
    errors,
    isSaved,

    /* -------- POS -------- */
    startBilling,

    /* -------- LIST -------- */
    customers,
    columns,
    fetchCustomers,
    deleteCustomer,
    loadCustomerForEdit,

    /* -------- COMMON -------- */
    loading,
  };
}
