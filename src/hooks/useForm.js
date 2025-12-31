// hooks/useForm.js
import { useState } from "react";
import { handleEnterKey } from "../utils/form";

export default function useForm(initialState) {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (key, value) => {
    // console.log("value", value);
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // console.log("formData", formData);

  const resetForm = () => setFormData(initialState);

  return { formData, setFormData, handleChange, handleEnterKey, resetForm };
}
