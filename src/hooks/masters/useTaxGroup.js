import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const defaultForm = {
  id: null,
  taxGroupName: "",
  taxGroupCode: "",
  totalPercent: 0,
  cgstPercent: 0,
  sgstPercent: 0,
  igstPercent: 0,
  status: "Active",
  isLocked: false,
};

const useTaxGroup = () => {
  const { payload } = useSelector((state) => state.modal);
  const mode = payload?.mode || "ADD";
  const record = payload?.record || null;

  const [formData, setFormData] = useState(defaultForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "EDIT" && record) {
      const half = record.totalPercent / 2;
      setFormData({
        ...defaultForm,
        ...record,
        cgstPercent: half,
        sgstPercent: half,
        igstPercent: record.totalPercent,
      });
    } else {
      setFormData(defaultForm);
    }
  }, [mode, record]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "taxGroupName") {
      const match = value.match(/\d+/);
      const percent = match ? Number(match[0]) : 0;
      const half = percent / 2;

      setFormData((prev) => ({
        ...prev,
        taxGroupName: value,
        taxGroupCode: value.replace(/\s+/g, "").toUpperCase(),
        totalPercent: percent,
        cgstPercent: half,
        sgstPercent: half,
        igstPercent: percent,
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      console.log("SAVE TAX GROUP →", formData);
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

export default useTaxGroup;
