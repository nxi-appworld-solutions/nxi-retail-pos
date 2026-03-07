import React from "react";
import { Link } from "react-router-dom";
import { Save, ArrowLeft, RotateCcw } from "react-feather";
import ProductERPLayout from "./sections/ProductERPLayout";
import useProducts from "../../core/hooks/products/useProducts";

const AddProduct = () => {
  const { formData, onChange, onSubmit } = useProducts();
  return (
    <form onSubmit={onSubmit}>
      <div className="page-wrapper px-0">
        <div className="content container-fluid">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-1">
                  <li className="breadcrumb-item">
                    <Link to="/products">Products</Link>
                  </li>
                  <li className="breadcrumb-item active">Add Product</li>
                </ol>
              </nav>
              <h3 className="fw-bold">Product Registration</h3>
            </div>

            <Link to="/products" className="btn btn-outline-secondary">
              <ArrowLeft size={16} className="me-2" /> Back
            </Link>
          </div>

          <ProductERPLayout formData={formData} handleChange={onChange} />
        </div>

        {/* <div className="fixed-bottom bg-white border-top p-3 d-flex justify-content-end gap-3">
          <button type="submit" className="btn btn-primary px-5">
            <Save size={16} className="me-2" /> Save Product
          </button>
        </div> */}

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
            <Save size={16} className="me-2" /> Save Product
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddProduct;
