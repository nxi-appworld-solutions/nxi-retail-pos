import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { brandFormSchema } from "../../forms/formSchemas";
import BaseModal from "../../common/modal/baseModal";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../../components/loader/Loader";
import useModal from "../../../routes/modal_root/useModal";
import { api_url } from "../../../environment";

const AddBrand = () => {
  const { close, payload } = useModal();
  const { form, setForm, handleChange, resetForm } = useForm(brandFormSchema);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
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
      formData.append("masterType", 7);
      formData.append("status", form.status);
      formData.append("image", file);

      const res = await fetch(`${api_url}/saveMaster`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.status === 1) {
        toast.success(data.msg || "Brand saved successfully");
        payload?.onSuccess?.();
        if (isEdit) {
          close();
        } else {
          resetForm();
        }
      } else {
        toast.error(data.msg || "Error saving brand");
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
        title="Add Brand"
        footer={
          <button
            type="submit"
            form="brandForm"
            className="btn btn-primary fs-13 fw-medium p-2 px-3"
          >
            Save
          </button>
        }
      >
        <div className="new-employee-field">
          <form id="brandForm" onSubmit={handleSubmit}>
            <div className="mb-3">
              <div className="add-image-upload">
                <div className="add-image">
                  <span className="fw-normal">
                    <i className="feather icon-plus-circle plus-down-add" /> Add
                    Image
                  </span>
                </div>
                <div className="new-employee-field">
                  <div className="mb-0">
                    <div className="image-upload mb-2">
                      <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                      <div className="image-uploads">
                        <h4 className="fs-13 fw-medium">Upload Image</h4>
                      </div>
                    </div>
                    <span>JPEG, PNG up to 2 MB</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">
                Brand<span className="text-danger ms-1">*</span>
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
              <label className="form-label">Brand Code</label>
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
                <span className="status-label">
                  Status<span className="text-danger ms-1">*</span>
                </span>
                <input
                  id="brandStatus"
                  name="status"
                  type="checkbox"
                  className="check"
                  checked={form.status}
                  onChange={handleChange}
                />

                <label htmlFor="brandStatus" className="checktoggle" />
              </div>
            </div>
          </form>
        </div>
      </BaseModal>
    </>
  );
};

export default AddBrand;