import { useEffect, useState } from "react";
import useModal from "../../../routes/modal_root/useModal";
import BaseModal from "../../common/modal/baseModal";
import { categoryFormSchema } from "../../../core/forms/formSchemas";
import useForm from "../../hooks/useForm";
import { api_url } from "../../../environment";
import toast from "react-hot-toast";
import Loader from "../../../components/loader/Loader";

const AddCategory = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const { close, payload } = useModal();
  const { form, setForm, handleChange, resetForm } =
    useForm(categoryFormSchema);
  const isEdit = !!payload?.data;

  useEffect(() => {
    if (payload?.data) {
      setForm({
        name: payload.data.category,
        alias: payload.data.categoryslug,
        code: payload.data.code,
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
      formData.append("masterType", 5);
      formData.append("status", form.status);

      const res = await fetch(`${api_url}/saveMaster`, {
        method: "POST",
        body: formData,
        // headers: {
        //   "content-type": "application/json",
        // },
        // body: JSON.stringify(requestPayload),
      });

      const data = await res.json();
      if (data.status === 1) {
        toast.success(data.msg || "Category saved successfully");
        payload?.onSuccess?.();
        if (isEdit) {
          close();
        } else {
          resetForm();
        }
      } else {
        toast.error(data.msg || "Error saving category");
      }
    } catch (error) {
      console.error("Error saving category:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader loading={loading} />}
      <BaseModal
        title="Add Category"
        footer={
          <button
            type="submit"
            form="categoryForm"
            className="btn btn-primary fs-13 fw-medium p-2 px-3"
          >
            Save
          </button>
        }
      >
        <form id="categoryForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              Category Name<span className="text-danger ms-1">*</span>
            </label>

            <input
              type="text"
              name="name"
              className="form-control"
              value={form?.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category Code</label>

            <input
              type="text"
              name="alias"
              className="form-control"
              value={form?.alias}
              onChange={handleChange}
            />
          </div>

          <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
            <span className="status-label">
              Status<span className="text-danger ms-1">*</span>
            </span>

            <input
              id="categoryStatus"
              type="checkbox"
              name="status"
              className="check"
              checked={form.status}
              onChange={handleChange}
            />

            <label htmlFor="categoryStatus" className="checktoggle" />
          </div>
        </form>
      </BaseModal>
    </>
  );
};

export default AddCategory;
