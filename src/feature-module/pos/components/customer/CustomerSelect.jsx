import React, { useEffect, useState } from "react";
import CustomerSelectDropdown from "./CustomerSelectDropdown";
import CustomerFindModal from "../../../../components/modals/CustomerFindModal";
import BarcodeModal from "../../../../components/modals/BarcodeModal";
import useCustomers from "../../../../hooks/useCustomers";
import QuickActions from "./QuickActions";
import EntityFormModal from "../../../../components/modals/AddCustomer";

const CustomerSelect = ({ onCustomerSelect }) => {
  const { emptyForm, customers, loading, saveCustomer } = useCustomers();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFindModal, setShowFindModal] = useState(false);
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [selected, setSelected] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const mapped =
      customers?.map((c) => ({ value: c.id, label: c.name })) || [];
    setOptions([
      { value: "walkInCustomer", label: "Walk in Customer" },
      ...mapped,
    ]);
  }, [customers]);

  const resetForm = () => {
    setForm(emptyForm);
    setSelected(null);
    setShowAddModal(false);
  };

  const handleCustomerChange = (opt) => {
    if (opt.value === "walkInCustomer") {
      setSelected(null);
      onCustomerSelect?.(null);
    } else {
      const found = customers.find((c) => c.id === opt.value);
      setSelected(found);
      onCustomerSelect?.(found);
    }
  };

  return (
    <div>
      <h5 className="mb-2">Customer Information</h5>
      <div className="d-flex align-items-center gap-2">
        <CustomerSelectDropdown
          options={options}
          selected={selected}
          loading={loading}
          onChange={handleCustomerChange}
        />

        <QuickActions
          onFind={() => setShowFindModal(true)}
          onAdd={() => setShowAddModal(true)}
          onScan={() => setShowBarcodeModal(true)}
        />
      </div>

      {/* ✅ Add Customer Modal */}
      <EntityFormModal
        isOpen={showAddModal}
        formData={[]}
        onInputChange={(e) =>
          setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
        }
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
          saveCustomer(form, resetForm);
        }}
        onClose={resetForm}
        isLoading={loading}
        isEditMode={!!selected}
      />

      {/* ✅ Find Existing Customer */}
      <CustomerFindModal
        isOpen={showFindModal}
        onClose={() => setShowFindModal(false)}
        onSelect={(c) => {
          setSelected(c);
          onCustomerSelect?.(c);
        }}
      />

      {/* ✅ Barcode Scanner Modal */}
      <BarcodeModal
        show={showBarcodeModal}
        onClose={() => setShowBarcodeModal(false)}
      />
    </div>
  );
};

export default CustomerSelect;
