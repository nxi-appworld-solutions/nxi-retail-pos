import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../environment";
import useForm from "./useForm";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
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
=======
import { initialCustomerV2 } from "../constants/people/initialCustomer";

/* =====================================================
   VALIDATION (PRODUCTION SAFE)
===================================================== */
const validateCustomer = (data) => {
  const errors = {};

  if (!data.name?.trim()) {
    errors.name = "Customer name is required";
  }

  if (!data.mobile || data.mobile.length < 10) {
    errors.mobile = "Valid mobile number is required";
  }

  if (data.isGSTEnabled && data.gstType !== "UNREGISTERED") {
    if (!data.gstin || data.gstin.length !== 15) {
      errors.gstin = "Valid 15 digit GSTIN is required";
    }
  }

  if (data.config?.allowCredit) {
    if (Number(data.creditLimit) <= 0) {
      errors.creditLimit = "Credit limit must be greater than zero";
    }
    if (Number(data.creditDays) <= 0) {
      errors.creditDays = "Credit days must be greater than zero";
    }
  }

  if (data.config?.isBlocked) {
    errors.status = "Blocked customer cannot be billed";
  }
>>>>>>> 1c9ca8c (again post)

  return errors;
};

<<<<<<< HEAD
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
=======
/* =====================================================
   NORMALIZER (UI → BACKEND)
===================================================== */
const normalizeCustomer = (data) => {
  const gstEnabled = data.gstType !== "UNREGISTERED";

  return {
    ...data,

    /* GST */
    isGSTEnabled: gstEnabled,
    gstType: gstEnabled ? data.gstType : "UNREGISTERED",
    gstin: gstEnabled ? data.gstin?.toUpperCase().trim() : "",

    /* CREDIT */
    creditLimit: data.config?.allowCredit ? Number(data.creditLimit) : 0,
    creditDays: data.config?.allowCredit ? Number(data.creditDays) : 0,

    /* CONTACT */
    mobile: data.mobile?.trim(),
    whatsapp: data.whatsapp || data.mobile,

    /* ADDRESS */
    billingAddress: data.billingAddress?.trim(),
    shippingAddress: data.shippingAddress?.trim(),

    /* META */
    modifiedDate: new Date().toISOString(),
  };
};

/* =====================================================
   MAIN HOOK (ADD + EDIT)
===================================================== */
export default function useCustomers() {
  const navigate = useNavigate();

  /* ---------------- FORM ---------------- */
  const {
    formData,
    setFormData,
    handleChange,
    resetForm,
  } = useForm(initialCustomerV2);

  const [errors, setErrors] = useState({});
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ---------------- LIST ---------------- */
  const [customers, setCustomers] = useState([]);

  /* =====================================================
     FETCH LIST
  ===================================================== */
  const fetchCustomers = async () => {
    // setLoading(true);
    // try {
    //   const res = await fetch(`${API_URL}/customers`);
    //   const json = await res.json();
    //   setCustomers(json?.data || []);
    // } catch {
    //   toast.error("Failed to fetch customers");
    // } finally {
    //   setLoading(false);
    // }
  };

  /* =====================================================
     LOAD CUSTOMER (EDIT MODE)
  ===================================================== */
  const loadCustomer = async (id) => {
    // if (!id) return;

    // setLoading(true);
    // try {
    //   const res = await fetch(`${API_URL}/customers/${id}`);
    //   const json = await res.json();

    //   if (json.status === 1) {
    //     setFormData(json.data);   // 🔥 EDIT MODE
    //     setIsSaved(true);
    //   } else {
    //     toast.error("Failed to load customer");
    //   }
    // } catch {
    //   toast.error("Server error while loading customer");
    // } finally {
    //   setLoading(false);
    // }
  };

  /* =====================================================
     SAVE (ADD / UPDATE)
  ===================================================== */
  const saveCustomer = async (payload) => {
    const validationErrors = validateCustomer(payload);

    if (Object.keys(validationErrors).length > 0) {
>>>>>>> 1c9ca8c (again post)
      setErrors(validationErrors);
      toast.error("Please fix validation errors");
      return;
    }

    setLoading(true);
    try {
<<<<<<< HEAD
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
=======
      const res = await fetch(`${API_URL}/customers/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.status === 1) {
        toast.success(
          payload.id
            ? "Customer updated successfully"
            : "Customer created successfully",
        );

        setIsSaved(true);
        setErrors({});
        fetchCustomers();

        // backend may return new id/code
        if (data.data) {
          setFormData((p) => ({ ...p, ...data.data }));
        }
      } else {
        toast.error(data.msg || "Failed to save customer");
      }
    } catch {
      toast.error("Server error while saving customer");
>>>>>>> 1c9ca8c (again post)
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
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
=======
  /* =====================================================
     🔥 FINAL onSubmit (ADD + EDIT)
  ===================================================== */
  const onSubmit = async (e) => {
    e.preventDefault();

    const payload = normalizeCustomer(formData);

    setFormData(payload); // keep UI synced
    await saveCustomer(payload);
  };

  /* =====================================================
     DELETE
  ===================================================== */
  const deleteCustomer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/customers/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      toast[data.status === 1 ? "success" : "error"](data.msg);
      fetchCustomers();
    } catch {
      toast.error("Failed to delete customer");
>>>>>>> 1c9ca8c (again post)
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
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

=======
  /* =====================================================
     POS BILLING GATE
  ===================================================== */
  const startBilling = () => {
    if (!formData.id) {
      toast.error("Please save customer before billing");
      return;
    }

    if (formData.config?.isBlocked) {
      toast.error("This customer is blocked for billing");
      return;
    }

    navigate(`/pos/billing/${formData.code}`);
  };

  /* =====================================================
     TABLE COLUMNS
  ===================================================== */
  const columns = [
    { title: "Customer Name", dataIndex: "name" },
    { title: "Type", dataIndex: "customerType" },
    { title: "Mobile", dataIndex: "mobile" },
    { title: "City", dataIndex: "city" },
    {
      title: "GST",
      render: (_, r) =>
        r.isGSTEnabled ? r.gstin || "Yes" : "No",
    },
    {
      title: "Credit",
      render: (_, r) =>
        r.creditLimit > 0 ? `₹${r.creditLimit}` : "-",
    },
    { title: "Status", dataIndex: "status" },
  ];

  /* =====================================================
     INIT
  ===================================================== */
>>>>>>> 1c9ca8c (again post)
  useEffect(() => {
    fetchCustomers();
  }, []);

<<<<<<< HEAD
  /* ---------- RETURN (DUAL MODE) ---------- */
  return {
    /* FORM (Add / Edit) */
=======
  /* =====================================================
     EXPORT
  ===================================================== */
  return {
    /* FORM */
>>>>>>> 1c9ca8c (again post)
    formData,
    setFormData,
    handleChange,
    resetForm,
<<<<<<< HEAD
    saveCustomer,
=======
    onSubmit,
    loadCustomer,      // 🔥 EDIT ENTRY POINT
>>>>>>> 1c9ca8c (again post)
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
<<<<<<< HEAD
    selectedDate,
    setSelectedDate,
=======
>>>>>>> 1c9ca8c (again post)
  };
}
