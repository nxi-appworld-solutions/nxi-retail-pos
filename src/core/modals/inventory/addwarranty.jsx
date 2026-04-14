import React, { useState } from "react";
import { warrantyFormSchema } from "../../forms/formSchemas";
import useModal from "../../../routes/modal_root/useModal";
import useForm from "../../hooks/useForm";
import BaseModal from "../../common/modal/baseModal";
import Loader from "../../../components/loader/Loader";
import CommonSelect from "../../../components/select/common-select";
import { Editor } from "primereact/editor";

const AddWarranty = () => {
  const { form, setForm, handleChange } = useForm(warrantyFormSchema);
  const { close, payload } = useModal();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState(null);

  const acs = [
    { label: "Month", value: "MONTH" },
    { label: "Year", value: "YEAR" },
  ];

  console.log("AddWarranty payload:", acs); // Debug log to check payload data
  return (
    <>
      {loading && <Loader loading />}
      <BaseModal
        title="Add Warranty"
        footer={
          <button type="submit" form="warrantyForm" className="btn btn-primary">
            Add Warranty
          </button>
        }
      >
        <form action="warranty.html">
          <div className="mb-3">
            <label className="form-label">
              Warranty<span className="text-danger ms-1">*</span>
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              placeholder="Warranty Name"
              required
            />
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">
                  Duration<span className="text-danger ms-1">*</span>
                </label>
                <input
                  type="text"
                  name="duration"
                  className="form-control"
                  value={form.duration}
                  onChange={handleChange}
                  placeholder="Duration eg. 1, 2, 3"
                  required
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">
                  Period<span className="text-danger ms-1">*</span>
                </label>
                <CommonSelect
                  className="w-100"
                  options={acs}
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.value)}
                  placeholder="Choose"
                  filter={false}
                />
              </div>
            </div>
            <CommonSelect
              className="w-100"
              options={acs}
            //   value={selectedPeriod}
            //   onChange={(e) => setSelectedPeriod(e.value)}
              placeholder="Select Option"
              filter={false}
            />
            <div className="col-lg-12">
              <div className="mb-3">
                <label className="form-label">
                  Description
                  <span className="text-danger ms-1">*</span>
                </label>
                <Editor
                  value={text}
                  onTextChange={(e) => setText(e.htmlValue)}
                  style={{ height: "200px" }}
                />
              </div>
            </div>
          </div>
          <div className="mb-0">
            <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
              <span className="status-label">Status</span>
              <input
                type="checkbox"
                id="warrantyCheck"
                name="status"
                className="check"
                checked={form.status}
                onChange={handleChange}
              />
              <label htmlFor="warrantyCheck" className="checktoggle" />
            </div>
          </div>
        </form>
      </BaseModal>
    </>
  );
};

export default AddWarranty;
