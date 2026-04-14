import React, { useState } from "react";
import BaseModal from "../../common/modal/baseModal";
import CommonSelect from "../../../components/select/common-select";
import useForm from "../../hooks/useForm";
import { customerFormSchema } from "../../forms/formSchemas";

const AddCustomer = () => {
  const { form, handleChange, setField } = useForm(customerFormSchema);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const cityOptions = [
    { label: "Select", value: "" },
    { label: "Los Angles", value: "los-angles" },
    { label: "New York City", value: "new-york-city" },
    { label: "Houston", value: "houston" },
  ];

  const stateOptions = [
    { label: "Select", value: "" },
    { label: "California", value: "california" },
    { label: "New York", value: "new-york" },
    { label: "Texas", value: "texas" },
  ];

  const countryOptions = [
    { label: "Select", value: "" },
    { label: "United States", value: "united-states" },
    { label: "Canada", value: "canada" },
    { label: "Germany", value: "germany" },
  ];

  return (
    <BaseModal
      title="Add Customer"
      footer={
        <button
          type="submit"
          form="customerForm"
          className="btn btn-primary fs-13 fw-medium p-2 px-3"
        >
          Save
        </button>
      }
    >
      <form id="customerForm" action="customers.html">
        {/* <div className="modal-body"> */}
        <div className="new-employee-field">
          <div className="profile-pic-upload">
            <div className="profile-pic">
              <span>
                <i className="feather icon-plus-circle plus-down-add" /> Add
                Image
              </span>
            </div>
            <div className="mb-3">
              <div className="image-upload mb-0">
                <input
                  type="file"
                  name="avatar"
                  accept="/image"
                  onChange={(e) => setField("avatar", e.target.files[0])}
                />
                <div className="image-uploads">
                  <h4>Upload Image</h4>
                </div>
              </div>
              <p className="mt-2">JPEG, PNG up to 2 MB</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 mb-3">
            <label className="form-label">
              First Name<span className="text-danger ms-1">*</span>
            </label>
            <input type="text" name="firstName" className="form-control" />
          </div>
          <div className="col-lg-6 mb-3">
            <label className="form-label">
              Last Name<span className="text-danger ms-1">*</span>
            </label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-lg-12 mb-3">
            <label className="form-label">
              Email<span className="text-danger ms-1">*</span>
            </label>
            <input type="email" className="form-control" />
          </div>
          <div className="col-lg-12 mb-3">
            <label className="form-label">
              Phone<span className="text-danger ms-1">*</span>
            </label>
            <input type="tel" className="form-control" />
          </div>
          <div className="col-lg-12 mb-3">
            <label className="form-label">
              Address<span className="text-danger ms-1">*</span>
            </label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-lg-6 mb-3">
            <label className="form-label">
              City<span className="text-danger ms-1">*</span>
            </label>
            <CommonSelect
              className="w-100"
              options={cityOptions}
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.value)}
              placeholder="Select City"
              filter={false}
            />
          </div>
          <div className="col-lg-6 mb-3">
            <label className="form-label">
              State<span className="text-danger ms-1">*</span>
            </label>
            <CommonSelect
              className="w-100"
              options={stateOptions}
              value={selectedState}
              onChange={(e) => setSelectedState(e.value)}
              placeholder="Select State"
              filter={false}
            />
          </div>
          <div className="col-lg-6 mb-3">
            <label className="form-label">
              Country<span className="text-danger ms-1">*</span>
            </label>
            <CommonSelect
              className="w-100"
              options={countryOptions}
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.value)}
              placeholder="Select Country"
              filter={false}
            />
          </div>
          <div className="col-lg-6 mb-3">
            <label className="form-label">
              Postal Code<span className="text-danger ms-1">*</span>
            </label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-lg-12">
            <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
              <span className="status-label">Status</span>
              <input
                type="checkbox"
                id="user1"
                className="check"
                defaultChecked
              />

              <label htmlFor="user1" className="checktoggle">
                {" "}
              </label>
            </div>
          </div>
        </div>
        {/* </div> */}
      </form>
    </BaseModal>
  );
};

export default AddCustomer;
