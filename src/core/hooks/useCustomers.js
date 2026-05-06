import { useState, useEffect } from "react";
// import { API_URL } from "../environment";
import useForm from "./useForm";
import { useNavigate } from "react-router-dom";
import { api_url } from "../../environment";
import toast from "react-hot-toast";
import { customerFormSchema } from "../forms/formSchemas";

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

  return errors;
};

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
  } = useForm(customerFormSchema);

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
      setErrors(validationErrors);
      toast.error("Please fix validation errors");
      return;
    }

    setLoading(true);
    try {
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
    } finally {
      setLoading(false);
    }
  };

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
      const res = await fetch(`${api_url}/customers/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      toast[data.status === 1 ? "success" : "error"](data.msg);
      fetchCustomers();
    } catch {
      toast.error("Failed to delete customer");
    } finally {
      setLoading(false);
    }
  };

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
  useEffect(() => {
    fetchCustomers();
  }, []);

  /* =====================================================
     EXPORT
  ===================================================== */
  return {
    /* FORM */
    formData,
    setFormData,
    handleChange,
    resetForm,
    onSubmit,
    loadCustomer,      // 🔥 EDIT ENTRY POINT
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
  };
}
