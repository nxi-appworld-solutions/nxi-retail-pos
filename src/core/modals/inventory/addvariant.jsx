import { Link } from "react-router-dom";
import BaseModal from "../../common/modal/baseModal";
import Loader from "../../../components/loader/Loader";
import { useEffect, useState } from "react";
import useModal from "../../../routes/modal_root/useModal";
import useForm from "../../hooks/useForm";
import { variantFormSchema } from "../../forms/formSchemas";
import { api_url } from "../../../environment";
import toast from "react-hot-toast";

const AddVariant = () => {
  const { close, payload } = useModal();
  const { form, setForm, handleChange, resetForm } = useForm(variantFormSchema);
  const [loading, setLoading] = useState(false);
  const isEdit = !!payload?.data;

  useEffect(() => {
    if (payload?.data) {
      setForm({
        code: payload.data.code,
        name: payload.data.name,
        alias: payload.data.alias,
        values: payload.data.values,
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
      formData.append("alias", form.alias);
      formData.append("c1", form.values);
      formData.append("masterType", 10);
      formData.append("status", form.status);

      const res = await fetch(`${api_url}/saveMaster`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("data", data);

      if (data.status === 1) {
        toast.success(data.msg || "Variant saved successfully");
        payload?.onSuccess?.();
        if (isEdit) {
          close();
        } else {
          resetForm();
        }
      } else {
        toast.error(data.msg || "Error saving variant");
      }
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Add Unit */}
      {loading && <Loader loading />}
      <BaseModal
        title="Add Variant"
        footer={
          <button
            type="submit"
            form="variantForm"
            className="btn btn-primary fs-13 fw-medium p-2 px-3"
          >
            Create Attributes
          </button>
        }
      >
        <form id="variantForm" onSubmit={handleSubmit}>
          {/* Variant Name */}
          <div className="mb-3">
            <label className="form-label">
              Variant<span className="text-danger ms-1">*</span>
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Size, Color"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Alias<span className="text-danger ms-1">*</span>
            </label>
            <input
              type="text"
              name="alias"
              className="form-control"
              value={form.alias}
              onChange={handleChange}
              placeholder="e.g. S, C"
            />
          </div>
          {/* Variant Values */}
          <div className="mb-3">
            <label className="form-label">
              Values<span className="text-danger ms-1">*</span>
            </label>
            <input
              type="text"
              name="values"
              className="form-control"
              value={form.values}
              onChange={handleChange}
              placeholder="e.g. S,M,L or Red,Blue"
            />
            <div className="input-blocks">
              <span className="tag-text">Enter value separated by comma</span>
            </div>
          </div>

          {/* Status */}
          <div className="mb-0">
            <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
              <span className="status-label">Status</span>
              <input
                id="variantStatus"
                type="checkbox"
                name="status"
                className="check"
                checked={form.status}
                onChange={handleChange}
              />
              <label htmlFor="variantStatus" className="checktoggle" />
            </div>
          </div>
        </form>
      </BaseModal>
    </>
  );
};

export default AddVariant;
