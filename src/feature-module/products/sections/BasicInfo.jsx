import React, { useRef } from "react";
import { Barcode, RefreshCcw, X, Plus } from "lucide-react";
import { FileText, Info, Box } from "react-feather";

const MAX_IMAGES = 6;

const BasicInfo = ({
  formData,
  handleChange,
  categories = [],
  brands = [],
  units = [],
  errors = {},
}) => {
  const fileInputRef = useRef(null);

  /* ---------------- IMAGE HANDLERS ---------------- */

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const previews = files.map((f) => URL.createObjectURL(f));
    const updated = [...(formData.images || []), ...previews].slice(
      0,
      MAX_IMAGES,
    );

    handleChange({ target: { name: "images", value: updated } });
    e.target.value = "";
  };

  const removeImage = (index) => {
    const updated = [...formData.images];
    URL.revokeObjectURL(updated[index]);
    updated.splice(index, 1);
    handleChange({ target: { name: "images", value: updated } });
  };

  return (
    <div className="row g-4 animate__animated animate__fadeIn">
      <div className="col-12">
        {/* <div className="p-4 bg-white rounded-4 shadow-sm border"> */}
        <div
          className="p-4 rounded-4 shadow-sm border"
          style={{
            background: "linear-gradient(135deg, #f8f9ff, #ffffff)",
            border: "1px solid rgba(78,115,223,0.15)",
          }}
        >
          {/* <div className="d-flex align-items-center mb-3">
            <Box size={18} className="text-primary me-2" />
            <h6 className="fw-bold mb-0">Product Identity</h6>
          </div> */}

          <div className="d-flex flex-wrap gap-3">
            {/* Upload */}
            <div
              className="cursor-pointer"
              style={{ width: 110, height: 110 }}
              onClick={() => fileInputRef.current?.click()}
            >
              <div
                className="w-100 h-100 bg-white rounded-4 border-2 border-[rgba(78,115,223,0.3)] d-flex flex-column align-items-center justify-content-center text-center"
                style={{ border: "2px dashed rgba(78,115,223,0.3)"}}
              >
                <Plus size={20} className="text-primary mb-1" />
                <small className="fw-semibold text-muted">Add Images</small>
                <small className="text-muted" style={{ fontSize: 10 }}>
                  Max {MAX_IMAGES}
                </small>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="d-none"
                onChange={handleImageUpload}
              />
            </div>

            {/* Preview */}
            {formData.images?.map((img, i) => (
              <div
                key={i}
                className="position-relative"
                style={{ width: 110, height: 110 }}
              >
                <img
                  src={img}
                  alt=""
                  className="w-100 h-100 object-fit-cover rounded-4 border"
                />
                <button
                  type="button"
                  className="position-absolute top-0 end-0 bg-danger text-white border-0 rounded-circle"
                  style={{ width: 22, height: 22 }}
                  onClick={() => removeImage(i)}
                >
                  <X size={12} />
                </button>

                {i === 0 && (
                  <div className="position-absolute bottom-0 start-0 w-100 bg-primary text-white text-center rounded-bottom-4 py-1 small">
                    Primary Image
                  </div>
                )}
              </div>
            ))}

            {/* Title Preview */}
            <div className="flex-grow-1 ps-md-3">
              <h5 className="fw-bold mb-1">{formData.name || "New Product"}</h5>
              <span
                className={`badge ${
                  formData.sku
                    ? "bg-soft-primary text-primary"
                    : "bg-soft-warning text-warning"
                }`}
              >
                {formData.sku ? (
                  `SKU: ${formData.sku}`
                ) : (
                  <>
                    <RefreshCcw size={12} className="me-1" />
                    Auto SKU
                  </>
                )}
              </span>

              <p className="text-muted small mt-2 mb-0">
                <Info size={13} className="me-1" />
                First image will appear on catalog & invoice
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* 🧾 CORE DETAILS                                  */}
      {/* ================================================= */}
      <div className="col-md-8">
        <label className="form-label fw-bold small">
          Product Name <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          name="name"
          className={`form-control shadow-sm ${
            errors.name ? "is-invalid" : ""
          }`}
          placeholder="e.g. Samsung 55 inch Smart TV"
          value={formData.name}
          onChange={handleChange}
          maxLength={120}
        />
        <div className="invalid-feedback">{errors.name}</div>
      </div>

      <div className="col-md-4">
        <label className="form-label fw-bold small">SKU / Item Code</label>
        <input
          type="text"
          name="sku"
          className="form-control shadow-sm font-monospace fw-bold"
          placeholder="AUTO"
          value={formData.sku}
          onChange={handleChange}
        />
        {/* <small className="text-muted">Leave blank to auto-generate</small> */}
      </div>

      {/* ================================================= */}
      {/* 🧩 CLASSIFICATION                                */}
      {/* ================================================= */}
      <div className="col-md-4">
        <label className="form-label fw-bold small">Category</label>
        <select
          name="category"
          className="form-select shadow-sm"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-4">
        <label className="form-label fw-bold small">Brand</label>
        <select
          name="brand"
          className="form-select shadow-sm"
          value={formData.brand}
          onChange={handleChange}
        >
          <option value="">Select brand</option>
          {brands.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-4">
        <label className="form-label fw-bold small">Unit</label>
        <select
          name="unit"
          className="form-select shadow-sm"
          value={formData.unit}
          onChange={handleChange}
        >
          <option value="">Select unit</option>
          {units.map((u) => (
            <option key={u.id} value={u.id}>
              {u.unitName} ({u.unitCode})
            </option>
          ))}
        </select>
      </div>

      {/* ================================================= */}
      {/* 🔍 BARCODE & SEARCH                               */}
      {/* ================================================= */}
      <div className="col-md-6">
        <label className="form-label fw-bold small">
          <Barcode size={14} className="me-1" />
          Master Barcode
        </label>
        <input
          type="text"
          name="barcode"
          className="form-control shadow-sm"
          placeholder="Scan or enter barcode"
          value={formData.barcode}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-6">
        <label className="form-label fw-bold small">Search / SEO Tags</label>
        <input
          type="text"
          name="tags"
          className="form-control shadow-sm"
          placeholder="e.g. tv, smart, led"
          value={formData.tags}
          onChange={handleChange}
        />
      </div>

      {/* ================================================= */}
      {/* 📝 DESCRIPTION                                   */}
      {/* ================================================= */}
      <div className="col-12">
        <label className="form-label fw-bold small">
          <FileText size={14} className="me-1 text-primary" />
          Description
        </label>
        <textarea
          name="description"
          rows={3}
          className="form-control shadow-sm"
          placeholder="Key features, warranty, box contents..."
          value={formData.description}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default BasicInfo;
