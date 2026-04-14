import { useEffect, useState } from "react";
import BaseModal from "../../common/modal/baseModal";
import useModal from "../../../routes/modal_root/useModal";
import Loader from "../../../components/loader/Loader";
import useForm from "../../hooks/useForm";
import { unitFormSchema } from "../../forms/formSchemas";
import toast from "react-hot-toast";
import { api_url } from "../../../environment";

const Addunits = () => {
  const { close, payload } = useModal();
  const { form, setForm, handleChange, resetForm } = useForm(unitFormSchema);
  const [loading, setLoading] = useState(false);
  const isEdit = !!payload?.data;

  useEffect(() => {
    if (payload?.data) {
      setForm({
        code: payload.data.code,
        name: payload.data.name,
        alias: payload.data.alias,
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
      formData.append("masterType", 8);
      formData.append("status", form.status);

      const res = await fetch(`${api_url}/saveMaster`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      // console.log("data", data);

      if (data.status === 1) {
        toast.success(data.msg || "Unit saved successfully");
        payload?.onSuccess?.();
        if (isEdit) {
          close();
        } else {
          resetForm();
        }
      } else {
        toast.error(data.msg || "Error saving unit");
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
        title="Add Unit"
        footer={
          <button
            type="submit"
            form="unitForm"
            className="btn btn-primary fs-13 fw-medium p-2 px-3"
          >
            Save
          </button>
        }
      >
        <form id="unitForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              Unit<span className="text-danger ms-1">*</span>
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
              Short Name<span className="text-danger ms-1">*</span>
            </label>
            <input
              type="text"
              name="alias"
              className="form-control"
              value={form.alias}
              onChange={handleChange}
            />
          </div>
          <div className="mb-0">
            <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
              <span className="status-label">Status</span>
              <input
                id="unitStatus"
                type="checkbox"
                name="status"
                className="check"
                checked={form.status}
                onChange={handleChange}
              />

              <label htmlFor="unitStatus" className="checktoggle" />
            </div>
          </div>
        </form>
      </BaseModal>
    </>
  );
};

export default Addunits;
