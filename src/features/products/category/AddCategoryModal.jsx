import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  X,
  Layers,
  Hash,
  Percent,
  Eye,
  RefreshCw,
  Type,
  CheckCircle,
  Image as ImageIcon,
  UploadCloud,
  Shield,
} from "react-feather";
import { MODALS } from "../../../constants/modal.constants";
import { closeModal } from "../../../core/redux/uiModalSlice";
import useCategory from "./hooks/useCategories";
import { Info } from "lucide-react";

const AddCategoryModal = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const { activeModal } = useSelector((state) => state.uiModal);
  const { formData, handleChange, onSubmit, resetForm, loading } =
    useCategory();

  if (activeModal !== MODALS.CATEGORY) return null;

  const handleClose = () => {
    dispatch(closeModal());
    resetForm();
  };

  // Image trigger helper
  const triggerFileInput = () => fileInputRef.current.click();

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div
        className="modal fade show d-block animate__animated animate__fadeIn"
        role="dialog"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content border-0 rounded-4 shadow-2xl overflow-hidden">
            {/* HEADER */}
            <div className="modal-header border-bottom bg-light bg-opacity-50 px-4 py-3">
              <div className="d-flex align-items-center">
                <div className="p-2 bg-primary bg-opacity-10 rounded-3 me-3 text-primary">
                  <Layers size={22} />
                </div>
                <div>
                  <h5 className="fw-bold mb-0 text-dark">
                    {formData.parentId
                      ? "New Sub-Category"
                      : "New Main Category"}
                  </h5>
                  <p className="text-muted small mb-0">
                    Configure category identity and visual assets
                  </p>
                </div>
              </div>
              <button
                className="btn btn-white border shadow-sm rounded-circle p-2 line-height-0"
                onClick={handleClose}
              >
                <X size={18} className="text-muted" />
              </button>
            </div>

            {/* BODY */}
            <div className="modal-body px-4 py-4 bg-white">
              <div className="row g-4">
                {/* --- LEFT COLUMN: IMAGE UPLOAD --- */}
                <div className="col-lg-4 border-end border-light pe-lg-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-info p-1 rounded-circle me-2"></div>
                    <h6 className="fw-bold text-uppercase small text-dark mb-0">
                      Visual Identity
                    </h6>
                  </div>

                  <div
                    className="card border-2 border-dashed rounded-3 p-4 text-center bg-light bg-opacity-50 cursor-pointer transition-all hover-bg-soft-primary"
                    onClick={triggerFileInput}
                    style={{
                      height: "250px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {formData.image ? (
                      <div className="position-relative w-100 h-100">
                        <img
                          src={formData.image}
                          className="w-100 h-100 object-fit-contain rounded-3"
                          alt="preview"
                        />
                        <div className="position-absolute bottom-0 start-50 translate-middle-x mb-2">
                          <span className="badge bg-dark rounded-pill px-3 py-2 opacity-75">
                            Click to Change
                          </span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="p-3 bg-white rounded-circle shadow-sm mb-3">
                          <UploadCloud size={32} className="text-primary" />
                        </div>
                        <h6 className="fw-bold mb-1">Upload Icon</h6>
                        <p className="text-muted small px-4">
                          Recommended: PNG or SVG with transparent background
                          (512x512px)
                        </p>
                      </>
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="d-none"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          // Standard handleChange update for image
                          handleChange({
                            target: {
                              name: "image",
                              value: URL.createObjectURL(file),
                            },
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="mt-3 p-2 bg-soft-info rounded-3">
                    <p className="small text-muted mb-0 d-flex align-items-center">
                      <Info size={14} className="me-2 text-info" />
                      This icon will appear on the POS grid and customer app.
                    </p>
                  </div>
                </div>

                {/* --- RIGHT COLUMN: FORM FIELDS --- */}
                <div className="col-lg-8 ps-lg-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary p-1 rounded-circle me-2"></div>
                    <h6 className="fw-bold text-uppercase small text-dark mb-0">
                      General Configuration
                    </h6>
                  </div>

                  <div className="row g-3 mb-4">
                    <div className="col-md-7">
                      <label className="form-label fw-bold small text-secondary">
                        Category Name <span className="text-danger">*</span>
                      </label>
                      <div className="input-group shadow-sm rounded-3 overflow-hidden border">
                        <span className="input-group-text bg-white border-0">
                          <Type size={16} className="text-muted" />
                        </span>
                        <input
                          type="text"
                          name="name"
                          className="form-control border-0 shadow-none fw-semibold"
                          placeholder="e.g. Mobile Accessories"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-5">
                      <label className="form-label fw-bold small text-secondary">
                        Sub Category <span className="text-danger">*</span>
                      </label>
                      <select
                        name="parentId"
                        className="form-select bg-light shadow-none fw-bold"
                        value={formData.parentId}
                        onChange={handleChange}
                        //   disabled={parentCategories.length === 0}
                      >
                        <option value="">📁 Top-Level (Main)</option>
                        {/* {parentCategories.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))} */}
                      </select>

                      <small className="text-muted">
                        Leave empty to create a main category
                      </small>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-bold small text-secondary">
                        Unique Code
                      </label>
                      <div className="input-group shadow-sm rounded-3 border">
                        <span className="input-group-text bg-white border-0">
                          <Hash size={14} />
                        </span>
                        <input
                          type="text"
                          name="code"
                          className="form-control border-0 shadow-none font-monospace text-uppercase"
                          placeholder="CAT-00"
                          value={formData.code}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-bold small text-secondary">
                        Default GST (%)
                      </label>
                      <div className="input-group shadow-sm rounded-2 border">
                        <span className="input-group-text bg-white border-0 text-muted">
                          <Percent size={14} />
                        </span>
                        <select
                          name="gstRate"
                          className="form-select border-0 shadow-none fw-bold"
                          value={formData.gstRate}
                          onChange={handleChange}
                        >
                          <option value="5">5%</option>
                          <option value="12">12%</option>
                          <option value="18">18%</option>
                          <option value="28">28%</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* POS BEHAVIOUR */}
                  <div className="d-flex align-items-center mb-3 pt-3 border-top">
                    <div className="bg-warning p-1 rounded-circle me-2"></div>
                    <h6 className="fw-bold text-uppercase small text-dark mb-0">
                      POS Terminal Behavior
                    </h6>
                  </div>

                  <div className="row g-3 mb-4">
                    {/* Reusing your existing switch logic with a bit cleaner UI */}
                    {[
                      {
                        icon: <Eye size={16} />,
                        label: "POS Visibility",
                        name: "visibleInPOS",
                        color: "primary",
                      },
                      {
                        icon: <Percent size={16} />,
                        label: "Discounts",
                        name: "allowDiscount",
                        color: "success",
                      },
                      {
                        icon: <RefreshCw size={16} />,
                        label: "Returns",
                        name: "allowReturns",
                        color: "danger",
                      },
                    ].map((item) => (
                      <div className="col-md-4" key={item.name}>
                        <div
                          className={`p-3 rounded-3 border transition-all ${
                            formData[item.name]
                              ? `bg-soft-${item.color} border-${item.color} border-opacity-25`
                              : "bg-light border-transparent"
                          }`}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <span
                              className={`fw-bold small d-flex align-items-center gap-2 ${
                                formData[item.name]
                                  ? `text-${item.color}`
                                  : "text-muted"
                              }`}
                            >
                              {item.icon} {item.label}
                            </span>
                            <div className="form-check form-switch m-0">
                              <input
                                type="checkbox"
                                name={item.name}
                                className="form-check-input p-2"
                                checked={formData[item.name]}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* ADMINISTRATIVE */}
                  <div className="p-3 bg-soft-danger bg-opacity-5 rounded-3 d-flex align-items-start gap-3 border">
                    <div className="p-2 bg-white rounded-3 shadow-sm text-danger mt-1">
                      <Shield size={18} />
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-center">
                        <h6 className="mb-0 fw-bold small text-secondary">
                          Administrative Lockdown
                        </h6>
                        <div className="form-check form-switch m-0">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={formData.status !== "Active"}
                            onChange={(e) =>
                              handleChange({
                                target: {
                                  name: "status",
                                  value: e.target.checked
                                    ? "Inactive"
                                    : "Active",
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                      <small className="text-muted mt-1 d-block">
                        If disabled, this category and its sub-categories will
                        be hidden from the catalog.
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="modal-footer border-0 bg-light bg-opacity-50 px-4 py-3">
              <button
                className="btn btn-outline-secondary d-flex align-items-center text-decoration-none px-4"
                onClick={handleClose}
              >
                Discard
              </button>
              <button
                className="btn btn-primary ms-2 d-flex align-items-center"
                onClick={onSubmit}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <RefreshCw size={16} className="me-2 animate-spin" />{" "}
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckCircle size={16} className="me-2" /> Save Category
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCategoryModal;
