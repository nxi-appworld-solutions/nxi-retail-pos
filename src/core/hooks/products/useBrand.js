import { useState } from "react";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  code: "",
  parentId: null, 
  description: "",
  gstRate: "18",
  hsnCode: "",
  colorCode: "#4e73df",
  visibleInPOS: true,
  status: "Active",
  image: null
};

const useBrand = () => {
  const [formData, setFormData] = useState(initialState);
  const [brands, setBrands] = useState([]);

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

  return { formData, setFormData, handleChange, onSubmit, brands, resetForm };
};

export default useBrand;