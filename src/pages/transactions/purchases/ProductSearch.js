import AsyncSelect from "react-select/async";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { searchProducts, getProductDetail } from "../../../services/service";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../core/redux/transactionSlice";

export default function ProductSearch() {
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const selectRef = useRef();
  const dispatch = useDispatch();

  const loadOptions = async (input) => {
    if (!input) return [];
    const data = await searchProducts(input);
    return data.map((p) => ({
      value: p.value,
      label: `${p.label} (${p.value})`,
    }));
  };

  const handleSelect = async (selected) => {
    if (!selected) return;
    // console.log("selected.value", selected.value);
    try {
      const productList = await getProductDetail(selected?.value);
      if (!productList || productList?.length === 0) {
        toast.error("Product not found");
        return;
      }
      console.log("productList[0]", productList[0]);
      // onProductSelect(productList[0]); // table me bhej do
      dispatch(addProduct(productList[0]));

      setInputValue("");
      setSelectedOption(null);
      if (selectRef.current) {
        selectRef.current.blur();
        setTimeout(() => {
          selectRef.current.focus();
        }, 0);
      }
    } catch {
      toast.error("Error fetching product detail");
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!inputValue) return;

      const results = await loadOptions(inputValue);
      console.log("results", results);

      if (results.length === 0) {
        toast.error("Product not found");
      } else if (results.length === 1) {
        await handleSelect(results[0]);
      } else {
        await handleSelect(results[0]);
        // toast.info("Multiple matches found, please select from dropdown");
      }
    }
  };

  return (
    <div className="mb-4">
      <AsyncSelect
        ref={selectRef}
        cacheOptions
        loadOptions={loadOptions}
        onInputChange={(val, action) =>
          action.action === "input-change" && setInputValue(val)
        }
        onChange={handleSelect}
        inputValue={inputValue}
        value={selectedOption}
        placeholder="Scan barcode or type product name/code"
        // onKeyDown={handleKeyDown}
        isClearable
        menuShouldCloseOnSelect
      />
    </div>
  );
}
