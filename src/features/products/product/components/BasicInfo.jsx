import {
  Barcode,
  Image as ImageIcon,
  Camera,
  RefreshCcw,
  X,
  Plus,
} from "lucide-react";
import React from "react";
import {
  Box,
  Tag,
  Layers,
  FileText,
  Hash,
  Info,
  Smartphone,
  Type,
} from "react-feather";

const BasicInfo = ({ formData, handleChange }) => {
  // Multiple Image Upload Handler
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    // Preview URLs create karna (Real app mein yahan API upload logic aayega)
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));

    // Master state update karna (Existing images + New images)
    const updatedImages = [...(formData.images || []), ...newPreviewUrls];

    handleChange({ target: { name: "images", value: updatedImages } });
  };

  // Image Remove Handler
  const removeImage = (indexToRemove) => {
    const filteredImages = formData.images.filter(
      (_, index) => index !== indexToRemove
    );
    handleChange({ target: { name: "images", value: filteredImages } });
  };

  return (
    <div className="row g-4 animate__animated animate__fadeIn">
      {/* --- PRO IDENTITY & MULTI-IMAGE GALLERY --- */}
      <div className="col-12">
        <div className="p-4 bg-white border border-primary border-opacity-10 rounded-4 shadow-sm position-relative">
          <div className="d-flex align-items-start flex-wrap gap-3">
            {/* 1. MAIN UPLOAD BUTTON */}
            <div
              className="position-relative group cursor-pointer"
              style={{ width: "110px", height: "110px" }}
              onClick={() =>
                document.getElementById("multi-image-upload").click()
              }
            >
              <div className="w-100 h-100 bg-light rounded-4 border-2 border-dashed border-primary border-opacity-25 d-flex flex-column align-items-center justify-content-center text-center">
                <div className="p-2 bg-white rounded-circle shadow-sm mb-1 text-primary">
                  <Plus size={20} />
                </div>
                <small className="fw-bold text-muted small">Add Photos</small>
              </div>
              <input
                type="file"
                id="multi-image-upload"
                className="d-none"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

            {/* 2. GALLERY PREVIEW CARDS */}
            {formData.images &&
              formData.images.map((img, index) => (
                <div
                  key={index}
                  className="position-relative animate__animated animate__zoomIn"
                  style={{ width: "110px", height: "110px" }}
                >
                  <img
                    src={img}
                    alt={`Product ${index}`}
                    className="w-100 h-100 object-fit-cover rounded-4 border shadow-sm"
                  />

                  {/* Delete Button */}
                  <button
                    type="button"
                    className="position-absolute top-0 end-0 bg-danger text-white border-0 rounded-circle m-n2 shadow-sm d-flex align-items-center justify-content-center hover-scale"
                    style={{ width: "22px", height: "22px", zIndex: 10 }}
                    onClick={() => removeImage(index)}
                  >
                    <X size={12} strokeWidth={3} />
                  </button>

                  {/* Primary/Cover Label */}
                  {index === 0 && (
                    <div
                      className="position-absolute bottom-0 start-0 w-100 bg-primary bg-opacity-75 text-white text-center rounded-bottom-4 py-1"
                      style={{ fontSize: "9px" }}
                    >
                      MAIN PREVIEW
                    </div>
                  )}
                </div>
              ))}

            {/* 3. PRODUCT STATUS TEXT */}
            <div className="flex-grow-1 ps-md-3 mt-3 mt-md-0">
              <div className="d-flex align-items-center mb-1 flex-wrap gap-2">
                <h5 className="fw-bold mb-0 text-dark">
                  {formData.name || "Product Registration"}
                </h5>
                <span
                  className={`badge ${
                    formData.sku
                      ? "bg-soft-primary text-primary"
                      : "bg-soft-warning text-warning"
                  } px-3 py-2 rounded-pill border border-opacity-25 shadow-sm small`}
                >
                  {formData.sku ? (
                    `SKU: ${formData.sku}`
                  ) : (
                    <>
                      <RefreshCcw size={12} className="me-1 animate-spin" />{" "}
                      Auto-SKU
                    </>
                  )}
                </span>
                {formData.category && (
                  <span className="badge bg-soft-info text-info px-3 py-2 rounded-pill border border-opacity-25 small">
                    {formData.category}
                  </span>
                )}
              </div>
              <p className="text-muted small mb-0 d-flex align-items-center">
                <Info size={14} className="me-1 text-primary" />
                First image will be used as the primary catalog cover.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- CORE PRODUCT DATA --- */}
      <div className="col-md-8">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <label className="form-label fw-bold small mb-0 d-flex align-items-center">
            Full Product Name <span className="text-danger ms-1">*</span>
          </label>
          <span
            className="badge bg-light text-muted fw-normal"
            style={{ fontSize: "10px" }}
          >
            {formData.name?.length || 0}/120
          </span>
        </div>
        <div className="input-group shadow-sm border rounded-3 overflow-hidden transition-all focus-within-primary">
          <span className="input-group-text bg-white border-0">
            <Box size={16} className="text-muted" />
          </span>
          <input
            type="text"
            name="name"
            className="form-control border-0 shadow-none fw-semibold py-2"
            placeholder="e.g. Sony Bravia 55 inch 4K OLED"
            value={formData.name}
            onChange={handleChange}
            maxLength={120}
            required
          />
        </div>
      </div>

      <div className="col-md-4">
        <label className="form-label fw-bold small d-flex align-items-center">
          <Hash size={14} className="me-2 text-primary" /> Item Code / SKU
        </label>
        <div className="input-group shadow-sm border rounded-3 overflow-hidden">
          <span className="input-group-text bg-light border-0">
            <Smartphone size={16} className="text-muted" />
          </span>
          <input
            type="text"
            name="sku"
            className="form-control border-0 shadow-none font-monospace fw-bold text-uppercase"
            placeholder="AUTO"
            value={formData.sku}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* --- CLASSIFICATION --- */}
      <div className="col-md-4">
        <label className="form-label fw-bold small d-flex align-items-center">
          <Layers size={14} className="me-2 text-danger" /> Primary Category
        </label>
        <select
          name="category"
          className="form-select shadow-sm border rounded-3 py-2 fw-semibold"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">-- Select --</option>
          <optgroup label="Retail Goods">
            <option value="Electronics">Electronics</option>
            <option value="Grocery">Grocery</option>
            <option value="Fashion">Fashion</option>
          </optgroup>
          <optgroup label="Services">
            <option value="Consultancy">Consultancy</option>
            <option value="Repairing">Repairing</option>
          </optgroup>
        </select>
      </div>

      <div className="col-md-4">
        <label className="form-label fw-bold small d-flex align-items-center">
          <Tag size={14} className="me-2 text-info" /> Brand
        </label>
        <input
          type="text"
          name="brand"
          className="form-control shadow-sm rounded-3 py-2"
          placeholder="Manufacturer Name"
          value={formData.brand}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-4">
        <label className="form-label fw-bold small d-flex align-items-center">
          Stocking Unit
        </label>
        <select
          name="unit"
          className="form-select shadow-sm rounded-3 py-2"
          value={formData.unit}
          onChange={handleChange}
        >
          <option value="PCS">Pieces (Pcs)</option>
          <option value="KG">Kilogram (Kg)</option>
          <option value="BOX">Box / Case</option>
        </select>
      </div>

      {/* --- SCANNING & SEARCH --- */}
      <div className="col-md-6">
        <label className="form-label fw-bold small d-flex align-items-center">
          <Barcode size={14} className="me-2 text-success" /> Master Barcode
          (EAN)
        </label>
        <div className="input-group shadow-sm border rounded-3 overflow-hidden">
          <input
            type="text"
            name="barcode"
            className="form-control border-0 py-2 shadow-none"
            placeholder="Scan Item Barcode"
            value={formData.barcode}
            onChange={handleChange}
          />
          <button
            className="btn btn-primary border-0 px-4 fw-bold"
            type="button"
          >
            SCAN
          </button>
        </div>
      </div>

      <div className="col-md-6">
        <label className="form-label fw-bold small d-flex align-items-center">
          <Tag size={14} className="me-2 text-warning" /> SEO / Meta Tags
        </label>
        <input
          type="text"
          name="tags"
          className="form-control shadow-sm rounded-3 py-2"
          placeholder="Comma separated keywords"
          value={formData.tags}
          onChange={handleChange}
        />
      </div>

      {/* --- DESCRIPTION --- */}
      <div className="col-12">
        <div className="p-3 border-dashed rounded-4 bg-light border-primary border-opacity-10">
          <label className="form-label fw-bold small d-flex align-items-center">
            <FileText size={14} className="me-2 text-primary" /> Full
            Specifications & Description
          </label>
          <textarea
            name="description"
            className="form-control bg-transparent border-0 shadow-none mt-1"
            rows="3"
            placeholder="Write about product features, dimensions, or box contents..."
            value={formData.description}
            onChange={handleChange}
            style={{ resize: "none" }}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
