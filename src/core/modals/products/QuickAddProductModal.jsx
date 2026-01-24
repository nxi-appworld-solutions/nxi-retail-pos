import React, { useEffect, useRef, useState } from "react";
import {
  CheckCircle,
  X,
  Image as ImageIcon,
  AlertTriangle,
  Eye,
} from "react-feather";
import useModal from "../useModal";

const QuickAddProductModal = () => {
  const { payload, close } = useModal();
  const nameRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    salePrice: "",
    gstRate: 0,
    barcode: "",
    categoryId: "",
    image: null,
    visibleInPOS: true,
    status: "Active", // ✅ ADD THIS
  });

  const [loading, setLoading] = useState(false);

  /* Demo categories (replace with API later) */
  const categories = [
    { id: 1, name: "General" },
    { id: 2, name: "Grocery" },
    { id: 3, name: "Electronics" },
  ];

  /* Auto focus on open */
  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  useEffect(() => {
    if (form.status !== "Active") {
      setForm((f) => ({ ...f, visibleInPOS: false }));
    }
  }, [form.status]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm({
      ...form,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const handleSave = async () => {
    if (!form.name || !form.salePrice || !form.categoryId) return;

    const fd = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key] !== null && form[key] !== "") {
        fd.append(key, form[key]);
      }
    });
    let createProductQuick;
    setLoading(true);
    try {
      await createProductQuick(fd);
      payload?.afterSave?.();
      close();
    } finally {
      setLoading(false);
    }
  };

  /* ENTER = SAVE */
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <div className="modal-content border-0 rounded-3 shadow-lg">
      {/* HEADER */}
      <div className="modal-header px-3 py-2 bg-white border-bottom">
        <h6 className="fw-bold mb-0">Quick Add Product</h6>
        <button className="btn btn-sm btn-light" onClick={close}>
          <X size={16} />
        </button>
      </div>

      {/* BODY */}
      <div className="modal-body px-3 py-3" onKeyDown={onKeyDown}>
        {/* PRODUCT NAME */}
        <div className="mb-2">
          <label className="form-label small fw-bold">
            Product Name <span className="text-danger">*</span>
          </label>
          <input
            ref={nameRef}
            type="text"
            name="name"
            className="form-control"
            placeholder="Scan or type product name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        {/* PRICE & GST */}
        <div className="row g-2">
          <div className="col-6">
            <label className="form-label small fw-bold">
              Selling Price <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              name="salePrice"
              className="form-control"
              value={form.salePrice}
              onChange={handleChange}
            />
          </div>

          <div className="col-6">
            <label className="form-label small fw-bold">GST %</label>
            <input
              type="number"
              name="gstRate"
              className="form-control"
              value={form.gstRate}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* CATEGORY */}
        <div className="mt-2">
          <label className="form-label small fw-bold">
            Category <span className="text-danger">*</span>
          </label>
          <select
            name="categoryId"
            className="form-select"
            value={form.categoryId}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* BARCODE */}
        <div className="mt-2">
          <label className="form-label small fw-bold">Barcode</label>
          <input
            type="text"
            name="barcode"
            className="form-control"
            placeholder="Scan barcode (optional)"
            value={form.barcode}
            onChange={handleChange}
          />
        </div>

        {/* IMAGE */}
        <div className="mt-3">
          <label className="form-label small fw-bold d-flex align-items-center gap-1">
            <ImageIcon size={14} /> Product Image (optional)
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        {/* VISIBILITY & STATUS */}
        <div className="mt-4 p-3 rounded-3 border bg-light">
          {/* SECTION TITLE */}
          <div className="d-flex align-items-center mb-2">
            <div className="me-2 bg-primary bg-opacity-10 text-primary rounded-circle p-1">
              <Eye size={14} />
            </div>
            <h6 className="mb-0 fw-bold small text-uppercase">
              POS Visibility & Status
            </h6>
          </div>

          {/* VISIBLE IN POS */}
          <div className="d-flex align-items-start justify-content-between mt-3">
            <div>
              <div className="fw-bold small text-dark">Visible in POS</div>
              <small className="text-muted">
                Show this product on the billing screen for cashiers
              </small>
            </div>
            <div className="form-check form-switch m-0">
              <input
                className="form-check-input"
                type="checkbox"
                name="visibleInPOS"
                checked={form.visibleInPOS}
                disabled={form.status !== "Active"}
                onChange={handleChange}
              />
            </div>
          </div>

          <hr className="my-3" />

          {/* PRODUCT ACTIVE */}
          <div className="d-flex align-items-start justify-content-between">
            <div>
              <div className="fw-bold small text-dark">Product Active</div>
              <small className="text-muted">
                Disable to completely block this product from sale
              </small>
            </div>
            <div className="form-check form-switch m-0">
              <input
                type="checkbox"
                className="form-check-input"
                checked={form.status === "Active"}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.checked ? "Active" : "Inactive",
                  })
                }
              />
            </div>
          </div>

          {/* WARNING NOTE */}
          {form.status !== "Active" && (
            <div className="mt-3 d-flex align-items-start text-danger small">
              <AlertTriangle size={14} className="me-1 mt-1" />
              <span>
                Inactive products cannot be sold, even if they are visible in
                POS.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="modal-footer px-3 py-2 bg-light">
        <button className="btn btn-sm btn-secondary me-2" onClick={close}>
          Cancel
        </button>
        <button
          className="btn btn-sm btn-success d-flex align-items-center"
          disabled={loading}
          onClick={handleSave}
        >
          <CheckCircle size={16} className="me-1" />
          Save
        </button>
      </div>
    </div>
  );
};

export default QuickAddProductModal;
