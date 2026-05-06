import React, { useEffect, useState } from "react";
import BaseModal from "../../common/modal/baseModal";
import CommonSelect from "../../../components/select/common-select";
import useForm from "../../hooks/useForm";
import { customerFormSchema } from "../../forms/formSchemas";
import { indiaData } from "../../../utils/constants/data";
import useModal from "../../../routes/modal_root/useModal";
import { api_url } from "../../../environment";
import toast from "react-hot-toast";

const AddCustomer = () => {
  const { form, handleChange, setField, resetForm } =
    useForm(customerFormSchema);
  const [file, setFile] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [country, setCountry] = useState("India");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const { close, payload } = useModal();
  const isEdit = !!payload?.data;
  const existingImage = payload?.data?.image || "";

  console.log("form", form);

  // const cityOptions = [
  //   { label: "Select", value: "" },
  //   { label: "Los Angles", value: "los-angles" },
  //   { label: "New York City", value: "new-york-city" },
  //   { label: "Houston", value: "houston" },
  // ];

  // const stateOptions = [
  //   { label: "Select", value: "" },
  //   { label: "California", value: "california" },
  //   { label: "New York", value: "new-york" },
  //   { label: "Texas", value: "texas" },
  // ];

  // const countryOptions = [
  //   { label: "Select", value: "" },
  //   { label: "United States", value: "united-states" },
  //   { label: "Canada", value: "canada" },
  //   { label: "Germany", value: "germany" },
  // ];

  useEffect(() => {
    if (!payload?.data) {
      // ✅ India find
      const india = indiaData.find((c) => c.country === "India");

      if (india) {
        setSelectedCountry(india.id);
        setStates(india.states);

        // ✅ UP find
        const up = india.states.find((s) => s.name === "Uttar Pradesh");

        if (up) {
          setSelectedState(up.id);
          setCities(up.cities);

          // ✅ Noida find
          const noida = up.cities.find((c) => c.name === "Noida");

          if (noida) {
            setSelectedCity(noida.id);
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const countryData = indiaData.find((c) => c.id === selectedCountry);
      setStates(countryData?.states || []);
    }
  }, [selectedCountry]);

  const countryOptions = indiaData.map((c) => ({
    label: c.country,
    value: c.id, // ✅ ID
  }));

  const cityOptions = cities.map((c) => ({
    label: c.name,
    value: c.id,
  }));

  const stateOptions = states.map((s) => ({
    label: s.name,
    value: s.id,
  }));

  const handleStateChange = (value) => {
    setSelectedState(value);

    const countryData = indiaData.find((c) => c.id === selectedCountry);
    const stateData = countryData?.states.find((s) => s.id === value);

    setCities(stateData?.cities || []);
    setSelectedCity(null);
  };

  const handleCountryChange = (value) => {
    setCountry(value);

    const countryData = indiaData.find((c) => c.id === value);
    setStates(countryData?.states || []);

    setSelectedState(null);
    setSelectedCity(null);
  };

  useEffect(() => {
    if (payload?.data) {
      setLoading(true);
      setForm({
        code: payload.data.code,
        name: payload.data.name,
        email: payload.data.email,
        phone: payload.data.phone,
        address: payload.data.address,
        postalcode: payload.data.postalcode,
        status: payload.data.status === "Active",
      });

      setSelectedCountry(payload.data.country);
      setSelectedState(payload.data.state);
      setSelectedCity(payload.data.city);
      setLoading(false);
    } else {
      resetForm();
    }
  }, [payload]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("code", form.code);
      formData.append("name", form.name);
      formData.append("c1", form.email);
      formData.append("c2", form.phone);
      formData.append("c5", form.address);

      formData.append("cm7", selectedCity);
      formData.append("cm8", selectedState);
      formData.append("cm9", selectedCountry);
      formData.append("cm10", form.postalcode);
      formData.append("masterType", 2); // ✅ Master Type for Customer
      formData.append("status", form.status);
      formData.append("files", file);
      formData.append(
        "images",
        JSON.stringify(existingImage ? [existingImage] : []),
      );

      const res = await fetch(`${api_url}/saveMaster`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("response", data?.status);

      if (data?.status === 1) {
        toast.success(data.msg || "Customer saved successfully");
        payload?.onSuccess?.();
        if (isEdit) {
          close();
        } else {
          resetForm();
        }
      } else {
        toast.error(data.msg || "Error saving customer");
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

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
      <form id="customerForm" onSubmit={handleSubmit}>
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
                  // onChange={(e) => setField("avatar", e.target.files[0])}
                  onChange={(e) => setFile(e.target.files[0])}
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
          <div className="col-lg-12 mb-3">
            <label className="form-label">
              Name<span className="text-danger ms-1">*</span>
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          {/* <div className="col-lg-6 mb-3">
            <label className="form-label">
              Last Name<span className="text-danger ms-1">*</span>
            </label>
            <input type="text" className="form-control" />
          </div> */}
          <div className="col-lg-12 mb-3">
            <label className="form-label">
              Email<span className="text-danger ms-1">*</span>
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-12 mb-3">
            <label className="form-label">
              Phone<span className="text-danger ms-1">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              className="form-control"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-12 mb-3">
            <label className="form-label">
              Address<span className="text-danger ms-1">*</span>
            </label>
            <input
              type="text"
              name="address"
              className="form-control"
              value={form.address}
              onChange={handleChange}
            />
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
            <input
              type="text"
              name="postalcode"
              className="form-control"
              value={form.postalcode}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-12">
            <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
              <span className="status-label">Status</span>
              <input
                type="checkbox"
                id="customer-status"
                name="status"
                className="check"
                checked={form.status}
                onChange={handleChange}
              />

              <label htmlFor="customer-status" className="checktoggle">
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
