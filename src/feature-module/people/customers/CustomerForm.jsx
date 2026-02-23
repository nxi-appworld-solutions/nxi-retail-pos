import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Save, RotateCcw } from "react-feather";

import useCustomers from "../../../hooks/useCustomers";
import CustomerERPLayout from "./sections/CustomerERPLayout";

const CustomerForm = () => {
  const { id } = useParams(); // 🔥 ID based edit
  const isEditMode = Boolean(id);

  const { formData, handleChange, onSubmit, resetForm, loadCustomer, loading } =
    useCustomers();

  /* ---------- LOAD CUSTOMER (EDIT MODE) ---------- */
  useEffect(() => {
    if (isEditMode) {
      loadCustomer(id);
    } else {
      resetForm();
    }
    // eslint-disable-next-line
  }, [id]);

  /* ---------- RESET ---------- */
  const handleReset = () => {
    if (!window.confirm("Discard all unsaved changes?")) return;

    if (isEditMode) {
      loadCustomer(id); // reload original
    } else {
      resetForm();
    }
  };

  return (
    <div className="page-wrapper">
      {/* 🔥 IMPORTANT: FORM wraps everything */}
      <form onSubmit={onSubmit}>
        <div className="content container-fluid">
          {/* ---------- HEADER ---------- */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-1">
                  <li className="breadcrumb-item">
                    <Link to="/customers-list">Customers</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    {isEditMode ? "Edit Customer" : "Add New Customer"}
                  </li>
                </ol>
              </nav>

              <h3 className="fw-bold text-dark">
                {isEditMode ? "Edit Customer" : "Customer Registration"}
              </h3>

              {/* <small className="text-muted">
                {isEditMode
                  ? `${formData.name || "Customer"} ${
                      formData.code ? `(${formData.code})` : ""
                    }`
                  : "Create and configure customer profile"}
              </small> */}
            </div>
            <Link
              to="/customers/customers-list"
              className="btn btn-outline-secondary"
            >
              <ArrowLeft size={16} className="me-2" /> Customers
            </Link>
          </div>

          {/* ---------- MAIN FORM ---------- */}
          <div className="row">
            <div className="col-12">
              <CustomerERPLayout
                formData={formData}
                handleChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* ---------- STICKY FOOTER ---------- */}
        <div
          className="fixed-bottom bg-white border-top p-3 shadow-lg d-flex justify-content-end gap-3 px-5"
          style={{ zIndex: 1000 }}
        >
          <button
            type="button"
            className="btn btn-outline-secondary d-flex align-items-center"
            onClick={handleReset}
            disabled={loading}
          >
            <RotateCcw size={16} className="me-2" />
            Cancel
          </button>

          <button
            type="submit"
            className="btn btn-primary px-3 fw-bold d-flex align-items-center shadow"
            disabled={loading}
          >
            <Save size={18} className="me-2" />
            {loading
              ? isEditMode
                ? "Updating..."
                : "Saving..."
              : isEditMode
                ? "Update Customer"
                : "Save Customer"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
