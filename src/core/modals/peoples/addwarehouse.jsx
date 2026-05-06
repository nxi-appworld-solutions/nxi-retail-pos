import React, { useEffect, useState } from "react";
import BaseModal from "../../common/modal/baseModal";
import Loader from "../../../components/loader/Loader";
import useForm from "../../hooks/useForm";
import { warehouseFormSchema } from "../../forms/formSchemas";
import useModal from "../../../routes/modal_root/useModal";
import { api_url } from "../../../environment";
import toast from "react-hot-toast";
import CommonSelect from "../../../components/select/common-select";
import { indiaData } from "../../../utils/constants/data";

const AddWarehouse = () => {
  const { form, setForm, handleChange, resetForm } =
    useForm(warehouseFormSchema);
  const [loading, setLoading] = useState(false);
  const { close, payload } = useModal();
  const isEdit = !!payload?.data;

  const [country, setCountry] = useState("India");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const existingImage = payload?.data?.image || "";

  console.log("payload?.data", payload?.data);

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
        contactPerson: payload.data.contactPerson,
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
      formData.append("c1", form.contactPerson);
      formData.append("c3", form.email);
      formData.append("c4", form.phone);
      formData.append("c5", form.address);

      formData.append("cm1", selectedCity);
      formData.append("cm2", selectedState);
      formData.append("cm3", selectedCountry);
      formData.append("cm4", form.postalcode);
      formData.append("masterType", 12);
      formData.append("status", form.status);

      const res = await fetch(`${api_url}/saveMaster`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("response", data?.status);

      if (data?.status === 1) {
        toast.success(data.msg || "Warehouse saved successfully");
        payload?.onSuccess?.();
        if (isEdit) {
          close();
        } else {
          resetForm();
        }
      } else {
        toast.error(data.msg || "Error saving store");
      }
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader loading />}
      <BaseModal
        title="Add Warehouse"
        footer={
          <button
            type="submit"
            form="warehouseForm"
            className="btn btn-primary"
          >
            Add Warehouse
          </button>
        }
      >
        <form
          action="warehouse.html"
          onSubmit={handleSubmit}
          id="warehouseForm"
        >
          <div className="row">
            <div className="col-lg-12">
              <div className="mb-3">
                <label className="form-label">
                  Warehouse <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="mb-3">
                <label className="form-label">
                  Contact Person <span className="text-danger">*</span>
                </label>
                {/* <CommonSelect
                  className="w-100"
                  options={contactPersonOptions}
                  value={selectedContactPerson}
                  onChange={(e) => setSelectedContactPerson(e.value)}
                  placeholder="Select Contact Person"
                  filter={false}
                /> */}
                <input
                  type="text"
                  name="contactPerson"
                  className="form-control"
                  value={form.contactPerson}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="mb-3">
                <label className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">
                  Phone <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">Phone(Work)</label>
                <input
                  type="text"
                  name="phonework"
                  className="form-control"
                  value={form.phonework}
                  onChange={handleChange}
                />
              </div>
            </div> */}
            <div className="col-lg-12">
              <div className="mb-3">
                <label className="form-label">
                  Address <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  value={form.address}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 col-12">
              <div className="mb-3">
                <label className="form-label">
                  City <span className="text-danger">*</span>
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
            </div>
            <div className="col-lg-6 col-sm-12 col-12">
              <div className="mb-3">
                <label className="form-label">
                  State <span className="text-danger">*</span>
                </label>
                <CommonSelect
                  className="w-100"
                  options={stateOptions}
                  value={selectedState}
                  onChange={(e) => handleStateChange(e.value)}
                  placeholder="Select State"
                  filter={false}
                />
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 col-10">
              <div className="mb-3">
                <label className="form-label">
                  Country <span className="text-danger">*</span>
                </label>
                <CommonSelect
                  className="w-100"
                  options={countryOptions}
                  value={selectedCountry}
                  onChange={(e) => handleCountryChange(e.value)}
                  placeholder="Select Country"
                  filter={false}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">
                  Postal Code <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="postalcode"
                  className="form-control"
                  value={form.postalcode}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-0">
                <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                  <span className="status-label">Status</span>
                  <input
                    type="checkbox"
                    id="warehouseStatus"
                    className="check"
                    checked={form.status}
                    onChange={handleChange}
                    name="status"
                  />

                  <label
                    htmlFor="warehouseStatus"
                    className="checktoggle mb-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </BaseModal>
    </>
  );
};

export default AddWarehouse;
