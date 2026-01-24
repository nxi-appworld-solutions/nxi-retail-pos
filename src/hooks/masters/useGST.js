import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const defaultForm = {
  id: null,
  gstName: "",
  gstCode: "",
  gstPercent: 0,
  cgstPercent: 0,
  sgstPercent: 0,
  igstPercent: 0,
  isInclusive: false,
  isLocked: true,
  status: "Active",
};

const useGST = () => {
  const { payload } = useSelector((state) => state.modal);
  const mode = payload?.mode || "ADD";
  const record = payload?.record || null;

  const [formData, setFormData] = useState(defaultForm);
  const [loading, setLoading] = useState(false);

  /* -------------------------------
     EDIT MODE DATA BIND
  -------------------------------- */
  useEffect(() => {
    if (mode === "EDIT" && record) {
      setFormData({
        ...defaultForm,
        ...record,
      });
    } else {
      setFormData(defaultForm);
    }
  }, [mode, record]);

  /* -------------------------------
     AUTO GST SPLIT LOGIC
  -------------------------------- */
  useEffect(() => {
    const gst = Number(formData.gstPercent || 0);

    setFormData((prev) => ({
      ...prev,
      cgstPercent: gst / 2,
      sgstPercent: gst / 2,
      igstPercent: gst,
    }));
  }, [formData.gstPercent]);

  /* -------------------------------
     COMMON CHANGE HANDLER
  -------------------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        value === "true"
          ? true
          : value === "false"
          ? false
          : value,
    }));
  };

  /* -------------------------------
     SUBMIT HANDLER
  -------------------------------- */
  const onSubmit = async () => {
    setLoading(true);

    try {
      const payloadToSend = {
        ...formData,
        gstPercent: Number(formData.gstPercent),
        cgstPercent: Number(formData.cgstPercent),
        sgstPercent: Number(formData.sgstPercent),
        igstPercent: Number(formData.igstPercent),
      };

      if (mode === "ADD") {
        console.log("ADD GST ➜", payloadToSend);
        // await api.post("/gst", payloadToSend);
      } else {
        console.log("UPDATE GST ➜", payloadToSend);
        // await api.put(`/gst/${formData.id}`, payloadToSend);
      }
    } catch (err) {
      console.error("GST Save Failed", err);
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------------
     RESET FORM (OPTIONAL)
  -------------------------------- */
  const resetForm = () => {
    setFormData(defaultForm);
  };

  return {
    formData,
    handleChange,
    onSubmit,
    resetForm,
    loading,
    mode,
  };
};

export default useGST;

