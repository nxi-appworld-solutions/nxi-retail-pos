import React, { useState } from "react";
import useCustomers from "../../hooks/useCustomers";
import DataTableHeader from "../../components/table/DataTableHeader";
import { handleExportToExcel } from "../../utils/exportToExcel";
import CustomerList from "../../components/people/customer/customerlist";
import CommonFooter from "../../core/common/footer/commonFooter";
import EntityFormModal from "../../components/modals/addCustomer";
import CommonDeleteModal from "../../components/modals/deleteRecord";

const Customers = () => {
  const { emptyForm, customers, loading, saveCustomer, deleteCustomer, fetchCustomers } = useCustomers();
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [selected, setSelected] = useState(null);

  const handleEdit = (record) => {
    setSelected(record);
    setForm({ ...record });
    setShowModal(true);
  };

  const handleDelete = (record) => {
    setSelected(record);
    setDeleteModal(true);
  };

  const resetForm = () => {
    setForm(emptyForm);
    setSelected(null);
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <DataTableHeader
          title="Customer List"
          subtitle="Manage your customers"
          addButtonLabel="Add Customer"
          onNavigate={() => setShowModal(true)}
          onExportExcel={() => handleExportToExcel(customers)}
          onRefresh={fetchCustomers}
        />

        <CustomerList
          data={customers}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>

      <CommonFooter />

      <EntityFormModal
        isOpen={showModal}
        formData={form}
        // onInputChange={(e) =>setForm({ ...form, [e.target.name]: e.target.value })}
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
          saveCustomer(form, resetForm);
        }}
        onClose={resetForm}
        isLoading={loading}
        isEditMode={!!selected}
      />

      <CommonDeleteModal
        onShow={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={() =>
          deleteCustomer(selected?.id, () => setDeleteModal(false))
        }
        title="Delete Customer"
        message={`Are you sure you want to delete "${selected?.name}"?`}
        isDeleting={loading}
      />
    </div>
  );
};

export default Customers;
