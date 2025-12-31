import React from "react";
import { LifeBuoy } from "react-feather";
import Select from "react-select";

const PricingStock = ({
  formData,
  handleChange,
  options,
  dropdowns,
  setDropdowns,
  isLoading,
}) => {
  return (
    <div className="accordion-item border mb-4">
      <h2 className="accordion-header" id="headingSpacingTwo">
        <div
          className="accordion-button collapsed bg-white"
          data-bs-toggle="collapse"
          data-bs-target="#SpacingTwo"
          aria-expanded="true"
          aria-controls="SpacingTwo"
        >
          <h5 className="d-flex align-items-center">
            <LifeBuoy className="text-primary me-2" />
            <span>Pricing & Stocks</span>
          </h5>
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
              <ul className="nav nav-pills" id="pills-tab1" role="tablist">
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
                        options={options?.productType}
                        name="productType"
                        value={dropdowns?.selectedProductType}
                        onChange={(selectedOption) =>
                          setDropdowns((prev) => ({
                            ...prev,
                            selectedProductType: selectedOption,
                          }))
                        }
                        isLoading={isLoading}
                        isSearchable={true}
                        placeholder="Choose"
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
                      <input
                        type="text"
                        className="form-control"
                        name="qty"
                        value={formData?.qty}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Price
                        <span className="text-danger ms-1">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="price"
                        value={formData?.price}
                        onChange={handleChange}
                        required
                      />
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
                        options={options?.taxType}
                        name="taxType"
                        value={dropdowns?.selectedTaxType}
                        onChange={(selectedOption) =>
                          setDropdowns((prev) => ({
                            ...prev,
                            selectedTaxType: selectedOption,
                          }))
                        }
                        isSearchable={true}
                        isLoading={isLoading}
                        placeholder="Choose"
                        required
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
                        options={options?.discountType}
                        name="discountType"
                        value={dropdowns?.selectedDiscountType}
                        onChange={(selectedOption) =>
                          setDropdowns((prev) => ({
                            ...prev,
                            selectedDiscountType: selectedOption,
                          }))
                        }
                        isSearchable={true}
                        isLoading={isLoading}
                        placeholder="Choose"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Discount Value
                        <span className="text-danger ms-1">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="discount"
                        value={formData?.discount}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Quantity Alert
                        <span className="text-danger ms-1">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="minQty"
                        value={formData?.minQty}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingStock;
