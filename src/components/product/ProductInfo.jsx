import React from "react";
import { AlertCircle, Info, PlusCircle } from "react-feather";
import Select from "react-select";
import { Link } from "react-router-dom";
import DefaultEditor from "react-simple-wysiwyg";

const ProductInfo = ({
  formData,
  handleChange,
  onEnterKey,
  onAliasEvents,
  onNameEvents,
  generateSKU,
  dropdowns,
  setDropdowns,
  unit,
  category,
  isLoading,
  onAddUnit,
  onAddCategory,
  errors,
}) => {
  return (
    <div className="accordion-item border mb-4">
      <h2 className="accordion-header" id="headingSpacingOne">
        <div
          className="accordion-button collapsed bg-white"
          data-bs-toggle="collapse"
          data-bs-target="#SpacingOne"
          aria-expanded="true"
          aria-controls="SpacingOne"
        >
          <h5 className="d-flex align-items-center">
            <Info className="text-primary me-2" />
            <span>Product Information</span>
          </h5>
        </div>
      </h2>
      <div
        id="SpacingOne"
        className="accordion-collapse collapse show"
        aria-labelledby="headingSpacingOne"
      >
        <div className="accordion-body border-top">
          <div className="mb-3 d-flex flex-wrap">
            <div style={{ flex: "1 1 50%" }}>
              <label className="form-check form-switch">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  className="form-check-input"
                  checked={formData.isActive}
                  onChange={handleChange}
                />
                <span className="form-label form-check-label">
                  {formData.isActive ? "Active" : "Deactive"}
                </span>
              </label>
              <span className="text-muted ms-1 ">
                Use this switch to activate or deactivate the product.
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-sm-6 col-12">
              <div className="mb-3">
                <label className="form-label">
                  Name
                  <span className="text-danger ms-1">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData?.name}
                  placeholder="Enter Product Name"
                  required
                  tabIndex={1}
                  autoFocus
                  onChange={handleChange}
                  onBlur={onNameEvents}
                  onKeyDown={(e) => {
                    onEnterKey(e);
                    if (e.key === "Enter") onNameEvents(e); // Enter पर printName copy
                  }}
                />
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 col-12">
              <div className="mb-3">
                <label className="form-label">
                  Alias{/* <span className="text-danger ms-1">*</span> */}
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="alias"
                  value={formData.alias}
                  placeholder="Enter Product Alias"
                  tabIndex={2}
                  onChange={onAliasEvents}
                  onBlur={onAliasEvents}
                  onKeyDown={(e) => {
                    onEnterKey(e);
                    if (e.key === "Enter") onAliasEvents(e);
                  }}
                />
                {errors.alias && (
                  <div className="d-flex align-items-center text-danger mt-1">
                    <AlertCircle size={16} className="me-1" />
                    <span>{errors.alias}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 col-12">
              <div className="mb-3">
                <label className="form-label">
                  Print Name<span className="text-danger ms-1">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="printName"
                  value={formData?.printName}
                  placeholder="Enter Print Name"
                  required
                  tabIndex={3}
                  onChange={handleChange}
                  onKeyDown={onEnterKey}
                />
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 col-12">
              <div className="mb-3">
                <div className="add-newplus">
                  <label className="form-label">
                    Group
                    <span className="text-danger ms-1">*</span>
                  </label>
                  <Link
                    to="#"
                    // data-bs-toggle="modal"
                    // data-bs-target="#add-prod-categorys"
                    onClick={onAddCategory}
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
                  name="parentGrp"
                  value={dropdowns?.selectedCategory}
                  onChange={(selectedOption) =>
                    setDropdowns((prev) => ({
                      ...prev,
                      selectedCategory: selectedOption,
                    }))
                  }
                  tabIndex={4}
                  onKeyDown={onEnterKey}
                  isLoading={isLoading}
                  isSearchable={true}
                  required
                />
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 col-12">
              <div className="mb-3">
                <div className="add-newplus">
                  <label className="form-label">
                    Unit
                    <span className="text-danger ms-1">*</span>
                  </label>
                  <Link
                    to="#"
                    // data-bs-toggle="modal"
                    // data-bs-target="#add-units"
                    onClick={onAddUnit}
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
                  placeholder="Choose Unit"
                  name="unit"
                  value={dropdowns?.selectedUnit}
                  onChange={(selectedOption) =>
                    setDropdowns((prev) => ({
                      ...prev,
                      selectedUnit: selectedOption,
                    }))
                  }
                  tabIndex={5}
                  onKeyDown={onEnterKey}
                  isLoading={isLoading}
                  isSearchable={true}
                  required
                />
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 col-12">
              <div className="mb-3 list">
                <label className="form-label">
                  SKU<span className="text-danger ms-1">*</span>
                </label>
                <input
                  type="text"
                  className="form-control list"
                  name="sku"
                  value={formData?.sku}
                  disabled
                />
                <button
                  type="button"
                  className="btn btn-primaryadd"
                  onClick={generateSKU}
                  disabled={isLoading}
                >
                  Generate
                </button>
              </div>
            </div>
            {/* <div className="col-lg-4 col-sm-6 col-12 ">
              <div className="mb-3 list">
                <label className="form-label">
                  HSN<span className="text-danger ms-1">*</span>
                </label>
                <input
                  type="text"
                  className="form-control list"
                  name="sku"
                  value={formData?.sku}
                  disabled
                />
                <button
                  type="button"
                  className="btn btn-primaryadd"
                  onClick={generateSKU}
                  disabled={isLoading}
                >
                  Generate
                </button>
              </div>
            </div> */}
          </div>
          <div className="col-lg-12">
            <div className="summer-description-box">
              <label className="form-label">Description</label>
              <DefaultEditor
                name="description"
                value={formData?.description}
                className="form-control"
                onChange={handleChange}
                placeholder="Enter Product Description"
              />
              <p className="fs-14 mt-1">Maximum 60 Words</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
