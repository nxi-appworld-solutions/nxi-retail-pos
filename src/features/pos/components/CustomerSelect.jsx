import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearCart } from "../../../core/redux/cartSlice";
import useCustomers from "../../../hooks/useCustomers";

import QuickActions from "./customer/QuickActions";
import EntityFormModal from "../../../components/modals/addCustomer";
import CustomerFindModal from "../../../components/modals/pos/customerFindModal";
import CustomerSelectDropdown from "./customer/CustomerSelectDropdown";
import BarcodeModal from "../../../components/modals/pos/barcodeModal";
import CartWarningModal from "../../../components/modals/pos/cartWarningModal";
import { setSelectedCustomer } from "../../../core/redux/posOrderSlice";

const CustomerSelect = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const { emptyForm, customers, loading, saveCustomer } = useCustomers();
  const selectedCustomer = useSelector((state) => state.posOrder.selectedCustomer);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showFindModal, setShowFindModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [options, setOptions] = useState([]);
  const [showCartWarning, setShowCartWarning] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);

  useEffect(() => {
    if (customers && customers.length > 0) {
      // cconst walkIn = customers.find(c => c.name === "Walk in Customer");

      const customerOptions = customers.map((c) => ({
        value: c.code,
        label: c.name,
      }));
      // Always keep "Walk in Customer" at the top
      // const walkInOption = customerOptions.find((c) => c.label === "Walk in Customer");
      // const otherOptions = customerOptions.filter(
      //   (c) => c.label !== "Walk in Customer"
      // );
      // options.length = 0;
      // if (walkInOption) options.push(walkInOption);
      // options.push(...otherOptions);

      const finalOptions = [
        { value: "walkInCustomer", label: "Walk in Customer" },
        ...customerOptions,
      ];
      // options.length = 0;
      // options.push(...finalOptions);

      setOptions(finalOptions);
    } else {
      // Fallback when no customers are loaded yet
      setOptions([{ value: "walkInCustomer", label: "Walk in Customer" }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customers]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCustomerChange = (opt) => {
    if (opt.value === "walkInCustomer") {
      dispatch(setSelectedCustomer(null));
    } else {
      const found = customers.find((c) => c.id === opt.value);
      dispatch(setSelectedCustomer(found));
    }
  };

  // 🔹 When user clicks "Open Barcode Scanner"
  const handleOpenBarcode = () => {
    const cartCount = Object.keys(cartItems).length;
    console.log("cartCount", cartCount);

    if (cartCount > 0) {
      setConfirmMessage(
        `Your cart already has ${cartCount} items. What would you like to do?`
      );
      setShowCartWarning(true);
    } else {
      setShowBarcodeModal(true);
    }
  };

  const handleConfirmClear = (action) => {
    setShowCartWarning(false);

    if (action === "clear") {
      dispatch(clearCart());
      toast.info("🗑️ Cart cleared — ready to scan new items.");
    } else if (action === "keep") {
      toast.success("🛒 Keeping existing cart — new items will be added.");
    }

    // After handling, open barcode modal
    setTimeout(() => setShowBarcodeModal(true), 200);
  };

  return (
    <div>
      <h5 className="mb-2">Customer Information</h5>
      <div className="d-flex align-items-center gap-2">
        <CustomerSelectDropdown
          options={options}
          selected={selectedCustomer}
          loading={loading}
          onChange={handleCustomerChange}
        />

        <QuickActions
          onFind={() => setShowFindModal(true)}
          onAdd={() => setShowAddModal(true)}
          onScan={() => handleOpenBarcode()}
        />

        <EntityFormModal
          isOpen={showAddModal}
          formData={form}
          onInputChange={handleInputChange}
          onImageChange={(_, img) => setForm({ ...form, image: img })}
          onLocationChange={(loc) =>
            setForm((prev) => ({
              ...prev,
              countryCode: loc.country?.value,
              stateCode: loc.state?.value,
              cityCode: loc.city?.value,
            }))
          }
          onSubmit={(e) => {
            e.preventDefault();
            saveCustomer(form, () => {
              setForm(emptyForm);
              setShowAddModal(false);
            });
          }}
          onClose={() => setShowAddModal(false)}
          isLoading={loading}
          isEditMode={!!selectedCustomer}
        />
        <CustomerFindModal
          isOpen={showFindModal}
          onClose={() => setShowFindModal(false)}
          onSelect={(c) => dispatch(setSelectedCustomer(c))}
        />
      </div>
      <BarcodeModal
        show={showBarcodeModal}
        onClose={() => setShowBarcodeModal(false)}
        cartItems={cartItems}
        // categories={categories}
      />
      <CartWarningModal
        showConfirmClear={showCartWarning}
        setShowConfirmClear={setShowCartWarning}
        confirmMessage={confirmMessage}
        handleConfirmClear={handleConfirmClear}
        onClose={() => setShowCartWarning(false)}
      />
    </div>
  );
};

export default CustomerSelect;
