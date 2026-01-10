import { Barcode } from "lucide-react";
import React, { useState } from "react";
import { Layers, Plus, Trash2, Hash, DollarSign, 
  Package, Grid } from "react-feather";

const VariantInfo = ({ formData, handleChange }) => {
  const variants = formData.variants || [];

  const updateVariants = (newVariants) => {
    handleChange({ target: { name: "variants", value: newVariants } });
  };

  // --- ADVANCED FEATURE: AUTO GENERATOR ---
  const generateSKU = (name) => {
    return (formData.sku || "PROD") + "-" + name.toUpperCase().replace(/\s+/g, "-");
  };

  const addVariant = () => {
    updateVariants([
      ...variants,
      { name: "", sku: "", price: formData.salePrice || "", stock: "0", barcode: "" },
    ]);
  };

  const removeVariant = (index) => {
    updateVariants(variants.filter((_, i) => i !== index));
  };

  const updateVariant = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    
    // Auto-generate SKU if name is entered and SKU is empty
    if (field === "name" && !updated[index].sku) {
      updated[index].sku = generateSKU(value);
    }
    
    updateVariants(updated);
  };

  return (
    <div className="row g-4 animate__animated animate__fadeIn">
      {/* --- HEADER STRIP --- */}
      <div className="col-12">
        <div className="p-4 bg-white rounded-4 shadow-sm d-flex align-items-center justify-content-between border-start border-4 border-primary">
          <div className="d-flex align-items-center">
            <div className="p-3 bg-primary bg-opacity-10 rounded-3 me-3 text-primary">
              <Grid size={28} />
            </div>
            <div>
              <h6 className="fw-bold mb-0">Multi-Variant Management</h6>
              <small className="text-muted">Define unique SKU, Price and Barcode for each variation</small>
            </div>
          </div>
          <button type="button" className="btn btn-primary rounded-pill px-4 shadow-sm" onClick={addVariant}>
            <Plus size={16} className="me-1" /> Add New Variant
          </button>
        </div>
      </div>

      {/* --- EMPTY STATE --- */}
      {variants.length === 0 && (
        <div className="col-12 text-center py-5 bg-light rounded-4 border border-dashed">
          <Layers size={48} className="text-muted opacity-25 mb-3" />
          <p className="text-muted">No variants defined. Use this for products with sizes, colors, or materials.</p>
        </div>
      )}

      {/* --- VARIANTS LIST --- */}
      <div className="col-12">
        <div className="row g-3">
          {variants.map((v, index) => (
            <div className="col-12 animate__animated animate__fadeInUp" key={index}>
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="card-body bg-white">
                  <div className="row g-3 align-items-end">
                    {/* Name */}
                    <div className="col-md-3">
                      <label className="form-label fw-bold small">Variant Label</label>
                      <input type="text" className="form-control bg-light" placeholder="e.g. Red / XL" 
                             value={v.name} onChange={(e) => updateVariant(index, "name", e.target.value)} />
                    </div>

                    {/* SKU */}
                    <div className="col-md-2">
                      <label className="form-label fw-bold small">Variant SKU</label>
                      <input type="text" className="form-control font-monospace small" 
                             value={v.sku} onChange={(e) => updateVariant(index, "sku", e.target.value)} />
                    </div>

                    {/* Individual Barcode (Crucial for POS) */}
                    <div className="col-md-2">
                      <label className="form-label fw-bold small">Barcode (Unique)</label>
                      <div className="input-group">
                        <span className="input-group-text bg-white border-end-0"><Barcode size={14}/></span>
                        <input type="text" className="form-control border-start-0" placeholder="EAN" 
                               value={v.barcode} onChange={(e) => updateVariant(index, "barcode", e.target.value)} />
                      </div>
                    </div>

                    {/* Price Override */}
                    <div className="col-md-2">
                      <label className="form-label fw-bold small">Special Price</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">₹</span>
                        <input type="number" className="form-control" 
                               value={v.price} onChange={(e) => updateVariant(index, "price", e.target.value)} />
                      </div>
                    </div>

                    {/* Stock */}
                    <div className="col-md-2">
                      <label className="form-label fw-bold small">Opening Stock</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light"><Package size={14}/></span>
                        <input type="number" className="form-control" 
                               value={v.stock} onChange={(e) => updateVariant(index, "stock", e.target.value)} />
                      </div>
                    </div>

                    {/* Delete */}
                    <div className="col-md-1 text-end">
                      <button type="button" className="btn btn-soft-danger border-0 p-2" onClick={() => removeVariant(index)}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- PRO TIP --- */}
      <div className="col-12">
        <div className="alert alert-soft-info border-0 rounded-4 d-flex align-items-center">
           <Package size={20} className="me-3" />
           <small className="fw-bold">Pro Tip: Each variant can have its own Barcode. When you scan the variant-specific barcode in POS, the system will automatically pick the correct size/price.</small>
        </div>
      </div>
    </div>
  );
};

export default VariantInfo;