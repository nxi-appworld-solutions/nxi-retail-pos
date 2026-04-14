import React, { useEffect, useState } from "react";
import BaseModal from "../../common/modal/baseModal";
import Loader from "../../../components/loader/Loader";
import useForm from "../../hooks/useForm";
import { storeFormSchema } from "../../forms/formSchemas";
import { api_url } from "../../../environment";
import useModal from "../../../routes/modal_root/useModal";
import toast from "react-hot-toast";

const AddStore = () => {
  const { form, setForm, handleChange, resetForm } = useForm(storeFormSchema);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { close, payload } = useModal();
  const isEdit = !!payload?.data;

  useEffect(() => {
    if (payload?.data) {
      setForm({
        code: payload.data.code,
        name: payload.data.name,
        alias: payload.data.alias,
        username: payload.data.username,
        password: payload.data.password,
        email: payload.data.email,
        phone: payload.data.phone,
        status: payload.data.status === "Active",
      });
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
      formData.append("alias", form.name);
      formData.append("c1", form.username);
      formData.append("c2", form.password);
      formData.append("c3", form.email);
      formData.append("c4", form.phone);
      formData.append("masterType", 11);
      formData.append("status", form.status);

      const res = await fetch(`${api_url}/saveMaster`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("response", data?.status);

      if (data?.status === 1) {
        toast.success(data.msg || "Store saved successfully");
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
        title="Add Store"
        footer={
          <button type="submit" form="storeForm" className="btn btn-primary">
            Add Store
          </button>
        }
      >
        <form action="#" onSubmit={handleSubmit} id="storeForm">
          <div className="row">
            <div className="mb-3">
              <label className="form-label">
                Store Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                User Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="username"
                className="form-control"
                value={form.username}
                onChange={handleChange}
              />
            </div>
            <div className="input-blocks mb-3">
              <label className="form-label">
                Password <span className="text-danger">*</span>
              </label>
              <div className="pass-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control pass-input"
                  value={form.password}
                  onChange={handleChange}
                />

                <span
                  className={`fas toggle-password ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
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
            <div className="mb-0">
              <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                <span className="status-label ">Status</span>
                <input
                  type="checkbox"
                  id="storeStatus"
                  name="status"
                  className="check"
                  checked={form.status}
                  onChange={handleChange}
                />

                <label htmlFor="storeStatus" className="checktoggle" />
              </div>
            </div>
          </div>
        </form>
      </BaseModal>
    </>
  );
};

export default AddStore;
