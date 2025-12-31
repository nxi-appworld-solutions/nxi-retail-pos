import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { all_routes } from "../../Router/all_routes";
import {
  ArrowLeft,
  Image,
  Info,
  LifeBuoy,
  PlusCircle,
  X,
} from "feather-icons-react/build/IconComponents";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import RefreshIcon from "../../core/common/tooltip-content/refresh";
import CollapesIcon from "../../core/common/tooltip-content/collapes";

import TextEditor from "./texteditor";
import ApiService from "../../services/api";
import { generateSlug } from "../../utils/common";
import CommonModal from "../../core/common/modal/commonModal";
import { categoryFields, unitFields } from "../../utils/modalFields";

const AddProduct = () => {
  const route = all_routes;
  const [formData, setFormData] = useState({
    productName: "",
    productSlug: "",
    sku: "",
    sellingType: "",
    category: "",
    subCategory: "",
    brand: "",
    unit: "",
    barcodeSymbology: "",
    itemCode: "",
    description: "",
    quantity: "",
    price: "",
    taxType: "",
    discountType: "",
    discountValue: "",
    quantityAlert: "",
  });

  // Update generateSKU function
  const generateSKU = async () => {
    try {
      const data = await ApiService.getGenerateSku();
      console.log("Generated SKU:", data);
      setFormData((prevFormData) => ({
        ...prevFormData,
        sku: data.sku || "",
      }));
    } catch (error) {
      console.error("Failed to generate SKU", error);
    }
  };

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      // Generate slug if the field is productName
      ...(name === "productName" && { productSlug: generateSlug(value) }),
    }));
  };

  const category = [
    { value: "choose", label: "Choose" },
    { value: "lenovo", label: "Lenovo" },
    { value: "electronics", label: "Electronics" },
  ];

  const unit = [
    { value: "choose", label: "Choose" },
    { value: "kg", label: "Kg" },
    { value: "pc", label: "Pc" },
  ];

  const producttype = [
    { value: "choose", label: "Choose" },
    { value: 1, label: "Veg" },
    { value: 2, label: "Non-Veg" },
  ];

  const taxtype = [
    { value: "exclusive", label: "Exclusive" },
    { value: "salesTax", label: "Sales Tax" },
  ];

  const discounttype = [
    { value: "choose", label: "Choose" },
    { value: "percentage", label: "Percentage" },
    { value: "cash", label: "Cash" },
  ];

  const [isImageVisible, setIsImageVisible] = useState(true);

  const handleRemoveProduct = () => {
    setIsImageVisible(false);
  };
  const [isImageVisible1, setIsImageVisible1] = useState(true);

  const handleRemoveProduct1 = () => {
    setIsImageVisible1(false);
  };
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Create Product</h4>
                <h6>Create new product</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <RefreshIcon />
              <CollapesIcon />
              <li>
                <div className="page-btn">
                  <Link to={route.productlist} className="btn btn-secondary">
                    <ArrowLeft className="me-2" />
                    Back to Product
                  </Link>
                </div>
              </li>
            </ul>
          </div>
          {/* /add */}
          <form className="add-product-form">
            <div className="add-product">
              <div
                className="accordions-items-seperate"
                id="accordionSpacingExample"
              >
                <div className="accordion-item border mb-4">
                  <h2 className="accordion-header" id="headingSpacingOne">
                    <div
                      className="accordion-button collapsed bg-white"
                      data-bs-toggle="collapse"
                      data-bs-target="#SpacingOne"
                      aria-expanded="true"
                      aria-controls="SpacingOne"
                    >
                      <div className="d-flex align-items-center justify-content-between flex-fill">
                        <h5 className="d-flex align-items-center">
                          <Info className="text-primary me-2" />
                          <span>Product Information</span>
                        </h5>
                      </div>
                    </div>
                  </h2>
                  <div
                    id="SpacingOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingSpacingOne"
                  >
                    <div className="accordion-body border-top">
                      <div className="row">
                        <div className="col-sm-6 col-12">
                          <div className="mb-3">
                            <label className="form-label">
                              Product Name
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="productName"
                              value={formData.productName}
                              onChange={handelChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-sm-6 col-12">
                          <div className="mb-3">
                            <label className="form-label">
                              Slug<span className="text-danger ms-1">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="productSlug"
                              value={formData.productSlug}
                              required
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6 col-12">
                          <div className="mb-3 list position-relative">
                            <label className="form-label">
                              SKU<span className="text-danger ms-1">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control list"
                              name="sku"
                              value={formData.sku}
                              disabled
                            />
                            <button
                              type="button"
                              className="btn btn-primaryadd"
                              onClick={generateSKU}
                            >
                              Generate
                            </button>
                          </div>
                        </div>
                        <div className="col-sm-6 col-12">
                          <div className="mb-3">
                            <div className="add-newplus">
                              <label className="form-label">
                                Unit
                                <span className="text-danger ms-1">*</span>
                              </label>
                              <Link
                                to="#"
                                data-bs-toggle="modal"
                                data-bs-target="#add-units-category"
                              >
                                <PlusCircle
                                  data-feather="plus-circle"
                                  className="plus-down-add"
                                />
                                <span>Add New</span>
                              </Link>
                            </div>
                            <Select
                              classNamePrefix="react-select"
                              options={unit}
                              placeholder="Choose"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="addservice-info">
                        <div className="row">
                          <div className="col-sm-6 col-12">
                            <div className="mb-3">
                              <div className="add-newplus">
                                <label className="form-label">
                                  Category
                                  <span className="text-danger ms-1">*</span>
                                </label>
                                <Link
                                  to="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#add-units-category"
                                >
                                  <PlusCircle
                                    data-feather="plus-circle"
                                    className="plus-down-add"
                                  />
                                  <span>Add New</span>
                                </Link>
                              </div>
                              <Select
                                classNamePrefix="react-select"
                                options={category}
                                placeholder="Choose"
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="summer-description-box">
                          <label className="form-label">Description</label>
                          <TextEditor />
                          <p className="fs-14 mt-1">Maximum 60 Words</p>
                        </div>
                      </div>
                      {/* /Editor */}
                    </div>
                  </div>
                </div>
                <div className="accordion-item border mb-4">
                  <h2 className="accordion-header" id="headingSpacingTwo">
                    <div
                      className="accordion-button collapsed bg-white"
                      data-bs-toggle="collapse"
                      data-bs-target="#SpacingTwo"
                      aria-expanded="true"
                      aria-controls="SpacingTwo"
                    >
                      <div className="d-flex align-items-center justify-content-between flex-fill">
                        <h5 className="d-flex align-items-center">
                          <LifeBuoy
                            data-feather="life-buoy"
                            className="text-primary me-2"
                          />
                          <span>Pricing &amp; Stocks</span>
                        </h5>
                      </div>
                    </div>
                  </h2>
                  <div
                    id="SpacingTwo"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingSpacingTwo"
                  >
                    <div className="accordion-body border-top">
                      <div className="mb-3s">
                        <label className="form-label">
                          Product Type
                          <span className="text-danger ms-1">*</span>
                        </label>
                        <div className="single-pill-product mb-3">
                          <ul
                            className="nav nav-pills"
                            id="pills-tab1"
                            role="tablist"
                          >
                            <li className="nav-item" role="presentation">
                              <span
                                className="custom_radio me-4 mb-0 active"
                                id="pills-home-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-home"
                                role="tab"
                                aria-controls="pills-home"
                                aria-selected="true"
                              >
                                <input
                                  type="radio"
                                  className="form-control"
                                  name="payment"
                                />
                                <span className="checkmark" /> Single Product
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="tab-content" id="pills-tabContent">
                        <div
                          className="tab-pane fade show active"
                          id="pills-home"
                          role="tabpanel"
                          aria-labelledby="pills-home-tab"
                        >
                          <div className="single-product">
                            <div className="row">
                              <div className="col-lg-4 col-sm-6 col-12">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Product Type
                                    <span className="text-danger ms-1">*</span>
                                  </label>
                                  <Select
                                    classNamePrefix="react-select"
                                    options={producttype}
                                    placeholder="Choose"
                                    name="sellingType"
                                    // value={formData.sellingType}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="col-lg-4 col-sm-6 col-12">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Quantity
                                    <span className="text-danger ms-1">*</span>
                                  </label>
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                              <div className="col-lg-4 col-sm-6 col-12">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Price
                                    <span className="text-danger ms-1">*</span>
                                  </label>
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                              <div className="col-lg-4 col-sm-6 col-12">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Tax Type
                                    <span className="text-danger ms-1">*</span>
                                  </label>
                                  <Select
                                    classNamePrefix="react-select"
                                    options={taxtype}
                                    placeholder="Select Option"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-4 col-sm-6 col-12">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Discount Type
                                    <span className="text-danger ms-1">*</span>
                                  </label>
                                  <Select
                                    classNamePrefix="react-select"
                                    options={discounttype}
                                    placeholder="Choose"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-4 col-sm-6 col-12">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Discount Value
                                    <span className="text-danger ms-1">*</span>
                                  </label>
                                  <input className="form-control" type="text" />
                                </div>
                              </div>
                              <div className="col-lg-4 col-sm-6 col-12">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Quantity Alert
                                    <span className="text-danger ms-1">*</span>
                                  </label>
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item border mb-4">
                  <h2 className="accordion-header" id="headingSpacingThree">
                    <div
                      className="accordion-button collapsed bg-white"
                      data-bs-toggle="collapse"
                      data-bs-target="#SpacingThree"
                      aria-expanded="true"
                      aria-controls="SpacingThree"
                    >
                      <div className="d-flex align-items-center justify-content-between flex-fill">
                        <h5 className="d-flex align-items-center">
                          <Image
                            data-feather="image"
                            className="text-primary me-2"
                          />
                          <span>Images</span>
                        </h5>
                      </div>
                    </div>
                  </h2>
                  <div
                    id="SpacingThree"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingSpacingThree"
                  >
                    <div className="accordion-body border-top">
                      <div className="text-editor add-list add">
                        <div className="col-lg-12">
                          <div className="add-choosen">
                            <div className="mb-3">
                              <div className="image-upload">
                                <input type="file" />
                                <div className="image-uploads">
                                  <PlusCircle
                                    data-feather="plus-circle"
                                    className="plus-down-add me-0"
                                  />
                                  <h4>Add Images</h4>
                                </div>
                              </div>
                            </div>
                            {isImageVisible1 && (
                              <div className="phone-img">
                                <ImageWithBasePath
                                  src="assets/img/products/phone-add-2.png"
                                  alt="image"
                                />
                                <Link to="#">
                                  <X
                                    className="x-square-add remove-product"
                                    onClick={handleRemoveProduct1}
                                  />
                                </Link>
                              </div>
                            )}
                            {isImageVisible && (
                              <div className="phone-img">
                                <ImageWithBasePath
                                  src="assets/img/products/phone-add-1.png"
                                  alt="image"
                                />
                                <Link to="#">
                                  <X
                                    className="x-square-add remove-product"
                                    onClick={handleRemoveProduct}
                                  />
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="d-flex align-items-center justify-content-end mb-4">
                <button type="button" className="btn btn-secondary me-2">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Product
                </button>
              </div>
            </div>
          </form>
          {/* /add */}
        </div>
        <div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
          <p className="mb-0 text-gray-9">
            2014 - 2025 © NXI. All Right Reserved
          </p>
          <p>
            Designed &amp; Developed by{" "}
            <Link to="#" className="text-primary">
              Xcel Technology
            </Link>
          </p>
        </div>
      </div>
      {/* <CommonModal
        modalId={MODAL_ID}
        key={modalKey}
        title="Category"
        fields={categoryFields}
        mode={edit ? "edit" : "create"}
        defaultData={[]}
        onSubmit={handleSubmit}
      />
      <CommonModal
        modalId={MODAL_ID}
        key={modalKey}
        title="Unit"
        fields={unitFields}
        mode={edit ? "edit" : "create"}
        defaultData={[]}
        onSubmit={handleSubmit}
      /> */}
    </>
  );
};

export default AddProduct;
