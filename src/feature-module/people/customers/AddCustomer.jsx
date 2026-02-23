import React from "react";
import useCustomers from "../../../hooks/useCustomers";
import { Link } from "react-router-dom";
import { ArrowLeft, Save, RotateCcw } from "react-feather";
import CustomerERPLayout from "./sections/CustomerERPLayout";

const AddCustomer = () => {
  const { formData, onChange, onSubmit } = useCustomers();

  return (
    <div className="page-wrapper">
      {/* style={{ background: "#f4f7fe", minHeight: "100vh" }} */}
      <form onSubmit={onSubmit}>
        <div className="content container-fluid">
          {/* MODERN HEADER */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-1">
                  <li className="breadcrumb-item">
                    <Link to="/customers-list">Customers</Link>
                  </li>
                  <li className="breadcrumb-item active">Add New Customer</li>
                </ol>
              </nav>
              <h3 className="fw-bold text-dark">Customer Registration</h3>
            </div>
            <Link
              to="/customers-list"
              className="btn btn-white shadow-sm border text-dark"
            >
              <ArrowLeft size={18} className="me-2" /> Back to List
            </Link>
          </div>

          {/* MAIN LAYOUT */}
          <div className="row">
            <div className="col-12">
              <CustomerERPLayout formData={formData} handleChange={onChange} />
            </div>
          </div>
        </div>

        {/* STICKY FOOTER - Yeh hamesha screen par rahega */}
        <div
          className="fixed-bottom bg-white border-top p-3 shadow-lg d-flex justify-content-end gap-3 px-5"
          style={{ zIndex: 1000 }}
        >
          <button
            type="button"
            className="btn btn-outline-secondary d-flex align-items-center"
          >
            <RotateCcw size={16} className="me-2" /> Reset Form
          </button>
          <button
            type="submit"
            className="btn btn-primary px-5 fw-bold d-flex align-items-center shadow"
          >
            <Save size={18} className="me-2" /> Save Customer
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;
