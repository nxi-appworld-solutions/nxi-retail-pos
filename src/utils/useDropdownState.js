import { useState } from "react";

export const useDropdownState = (initialState) => {
  const [dropdowns, setDropdowns] = useState(initialState);

  const setDropdown = (name, selectedOption) => {
    setDropdowns((prev) => ({ ...prev, [name]: selectedOption }));
    return selectedOption?.value || "";
  };

  const getValue = (key) => dropdowns[key]?.value || 0;
  const getLabel = (key) => dropdowns[key]?.label || "";

  const clear = () =>
    setDropdowns({
      selectedCategory: null,
      selectedUnit: null,
      selectedProductType: null,
      selectedTaxType: null,
      selectedDiscountType: null,
    });

  return { dropdowns, setDropdowns, getValue, getLabel, clear };
};
