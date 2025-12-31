import { useState } from "react";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  sku: "",
  category: "",
  brand: "",
  unit: "PCS",

  mrp: "",
  salePrice: "",
  purchasePrice: "",

  openingStock: 0,
  reorderLevel: 0,
  allowNegativeStock: false,

  gstRate: "18",
  hsn: "",

  hasVariants: false,

  visibleInPOS: true,
  allowDiscount: true,
  allowOpenPrice: false,

  preferredSupplier: "",
  supplierSku: "",
  lastPurchaseRate: 0,
  leadTime: 0,
  minOrderQty: 0,
  autoPurchase: false,

  totalSoldQty: 0,
  totalRevenue: 0,
  totalProfit: 0,
  lastSoldDate: "",
  fastMoving: false,

  status: "Active",
};

const useProducts = () => {
  const [formData, setFormData] = useState(initialState);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    if (!formData.name) {
      toast.error("Product name is required");
      return false;
    }
    if (!formData.salePrice) {
      toast.error("Sale price is required");
      return false;
    }
    return true;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("PRODUCT PAYLOAD:", formData);
    toast.success("Product saved successfully");
  };

  return {
    formData,
    onChange,
    onSubmit,
  };
};

export default useProducts;
