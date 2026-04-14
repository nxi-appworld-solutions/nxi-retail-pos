import React, { useEffect, useState } from "react";
import BaseModal from "../../common/modal/baseModal";
import CommonSelect from "../../../components/select/common-select";
import { Editor } from "primereact/editor";
import { subCategoryFormSchema } from "../../forms/formSchemas";
import useForm from "../../hooks/useForm";
import { api_url } from "../../../environment";
import toast from "react-hot-toast";
import Loader from "../../../components/loader/Loader";
import useModal from "../../../routes/modal_root/useModal";

const AddSubCategory = () => {
  const [file, setFile] = useState(null);
  const { close, payload } = useModal();
  const [loading, setLoading] = useState(false);
  const [existingImage, setExistingImage] = useState("");
  const { form, setForm, handleChange, resetForm } = useForm(
    subCategoryFormSchema,
  );
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [text, setText] = useState("");
  const isEdit = !!payload?.data;

  console.log("payload", payload?.data);

  useEffect(() => {
    if (payload?.data) {
      setForm({
        name: payload.data.name,
        alias: payload.data.alias,
        code: payload.data.code,
        status: payload.data.status === "Active",
      });

      setExistingImage(payload.data.image || "");
      // ✅ category set
      setSelectedCategory(payload.data.parentGrpCode);

      // ✅ description set
      setText(payload.data.remark || "");

      // optional: file reset
      setFile(null);
    } else {
      resetForm();
      setSelectedCategory(null);
      setText("");
    }
  }, [payload]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${api_url}/GetMaster?masterType=5`);
      const json = await res.json();

      const formatted = json?.data.map((item) => ({
        label: item.name,
        value: item.code,
      }));

      setCategories(formatted);
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("code", form.code);
      formData.append("name", form.name);
      formData.append("alias", form.alias);
      formData.append("parentGrp", selectedCategory);
      formData.append("masterType", 4);
      formData.append("remark", text);
      formData.append("status", form.status);
      formData.append("files", file);
      formData.append(
        "images",
        JSON.stringify(existingImage ? [existingImage] : []),
      );

      console.log("formData", [...formData.entries()]);

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
        toast.success(data.msg || "Subcategory saved successfully");
        payload?.onSuccess?.();
        if (isEdit) {
          close();
        } else {
          resetForm();
        }
      } else {
        toast.error(data.msg || "Error saving subcategory");
      }
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader loading={loading} />}
      <BaseModal
        title="Add Sub Category"
        footer={
          <button
            type="submit"
            form="subcategoryForm"
            className="btn btn-primary fs-13 fw-medium p-2 px-3"
          >
            Save
          </button>
        }
      >
        <form id="subcategoryForm" onSubmit={handleSubmit}>
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
              Category<span className="text-danger ms-1">*</span>
            </label>
            <CommonSelect
              className="w-100"
              options={categories}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.value)}
              placeholder="Choose"
              filter={false}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Sub Category Name
              <span className="text-danger ms-1">*</span>
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
            <label className="form-label">Sub Category Code</label>
            <input
              type="text"
              name="alias"
              className="form-control"
              value={form.alias}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <Editor
              value={text}
              onTextChange={(e) => setText(e.htmlValue)}
              name="description"
              className="form-control"
              style={{ height: "100px" }}
            />
          </div>
          <div className="mb-0">
            <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
              <span className="status-label">
                Status<span className="text-danger ms-1">*</span>
              </span>
              <input
                id="subCategoryStatus"
                type="checkbox"
                name="status"
                className="check"
                checked={form.status}
                onChange={handleChange}
              />

              <label htmlFor="subCategoryStatus" className="checktoggle" />
            </div>
          </div>
        </form>
      </BaseModal>
    </>
  );
};

export default AddSubCategory;
