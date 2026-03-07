// hooks/useForm.js
import { useState } from "react";
import { handleEnterKey } from "../utils/form";

export default function useForm(initialState) {
  const [formData, setFormData] = useState(initialState);

  /**
   * handleChange supports:
   * 1. onChange(e)
   * 2. handleChange("name", value)
   */
  const handleChange = (eOrKey, value) => {
    // CASE 1: event based
    if (typeof eOrKey === "object" && eOrKey?.target) {
      const { name, value: val, type, checked } = eOrKey.target;

      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : val,
      }));
      return;
    }

    // CASE 2: manual update
    if (typeof eOrKey === "string") {
      setFormData((prev) => ({
        ...prev,
        [eOrKey]: value,
      }));
    }
  };

  const resetForm = () => setFormData(initialState);

  return {
    formData,
    setFormData,
    handleChange,
    handleEnterKey,
    resetForm,
  };
}
