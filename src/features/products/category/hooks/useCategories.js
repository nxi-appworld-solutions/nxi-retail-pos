import { useState } from "react";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  code: "",
  parentId: null, // Agar null hai toh Parent, varna Sub-category
  description: "",
  gstRate: "18",
  hsnCode: "",
  colorCode: "#4e73df",
  visibleInPOS: true,
  status: "Active",
  image: null
};

const useCategory = () => {
  const [formData, setFormData] = useState(initialState);
  const [categories, setCategories] = useState([]); // List storage

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const resetForm = () => setFormData(initialState);

  const onSubmit = (e) => {
    if(e) e.preventDefault();
    if (!formData.name) return toast.error("Category name is required");
    
    console.log("Saving Category:", formData);
    toast.success(`${formData.parentId ? 'Sub-Category' : 'Category'} saved successfully!`);
    resetForm();
  };

  return { formData, setFormData, handleChange, onSubmit, categories, resetForm };
};

export default useCategory;