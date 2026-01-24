import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const defaultForm = {
  id: null,
  hsnCode: "",
  hsnDescription: "",
  gstPercent: 0,
  status: "Active",
  isLocked: false,
};

const useHSN = () => {
  const { payload } = useSelector((state) => state.modal);
  const mode = payload?.mode || "ADD";
  const record = payload?.record || null;

  const [formData, setFormData] = useState(defaultForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "EDIT" && record) {
      setFormData({ ...defaultForm, ...record });
    } else {
      setFormData(defaultForm);
    }
  }, [mode, record]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      console.log("HSN SAVE →", formData);
      // API call here
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    onSubmit,
    loading,
  };
};

export default useHSN;
