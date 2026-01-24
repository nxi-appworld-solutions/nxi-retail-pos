// import React from "react";
// import {
//   ShoppingCart,
//   Percent,
//   Edit,
//   RotateCcw,
//   Eye,
//   Lock,
//   PlusCircle,
//   AlertCircle,
//   FileText,
//   Printer
// } from "react-feather";

// const POSBehavior = ({ formData, handleChange }) => {
//   const handleCheckbox = (e) => {
//     const { name, checked } = e.target;
//     handleChange({ target: { name, value: checked } });
//   };

//   return (
//     <div className="row g-4 animate__animated animate__fadeIn">
//       {/* --- STRATEGIC HEADER --- */}
//       <div className="col-12">
//         <div className="p-4 bg-white rounded-4 shadow-sm d-flex align-items-center justify-content-between border-start border-4 border-primary">
//           <div className="d-flex align-items-center">
//             <div className="p-3 bg-primary bg-opacity-10 rounded-3 me-3 text-primary">
//               <ShoppingCart size={28} />
//             </div>
//             <div>
//               <h6 className="fw-bold mb-1">POS Billing Rules</h6>
//               <small className="text-muted">Define how this product interacts with the cashier at checkout</small>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* --- VISIBILITY & ACCESSIBILITY --- */}
//       <div className="col-md-6">
//         <div className="p-3 bg-light border rounded-4 d-flex justify-content-between align-items-center shadow-sm h-100">
//           <div className="d-flex align-items-center">
//             <div className="p-2 bg-white rounded-3 me-3 shadow-xs"><Eye size={18} className="text-info" /></div>
//             <div>
//               <h6 className="mb-0 fw-bold small">Visible in POS Catalog</h6>
//               <small className="text-muted">Searchable on billing screen</small>
//             </div>
//           </div>
//           <div className="form-check form-switch m-0">
//             <input type="checkbox" name="visibleInPOS" className="form-check-input p-2"
//                    checked={formData.visibleInPOS} onChange={handleCheckbox} />
//           </div>
//         </div>
//       </div>

//       <div className="col-md-6">
//         <div className="p-3 bg-light border rounded-4 d-flex justify-content-between align-items-center shadow-sm h-100">
//           <div className="d-flex align-items-center">
//             <div className="p-2 bg-white rounded-3 me-3 shadow-xs"><Edit size={18} className="text-warning" /></div>
//             <div>
//               <h6 className="mb-0 fw-bold small">Allow Open Price</h6>
//               <small className="text-muted">Cashier can edit price manually</small>
//             </div>
//           </div>
//           <div className="form-check form-switch m-0">
//             <input type="checkbox" name="allowOpenPrice" className="form-check-input p-2"
//                    checked={formData.allowOpenPrice} onChange={handleCheckbox} />
//           </div>
//         </div>
//       </div>

//       {/* --- QUANTITY & UNIT BEHAVIOR (NEW PRO FIELDS) --- */}
//       <div className="col-12 mt-4">
//         <h6 className="fw-bold text-uppercase small text-muted border-bottom pb-2">Quantity & Scanning Rules</h6>
//       </div>

//       <div className="col-md-6">
//         <div className="p-3 bg-light border rounded-4 d-flex justify-content-between align-items-center shadow-sm h-100">
//           <div className="d-flex align-items-center">
//             <div className="p-2 bg-white rounded-3 me-3 shadow-xs"><PlusCircle size={18} className="text-success" /></div>
//             <div>
//               <h6 className="mb-0 fw-bold small">Direct Scanning</h6>
//               <small className="text-muted">Add to cart immediately on scan</small>
//             </div>
//           </div>
//           <div className="form-check form-switch m-0">
//             <input type="checkbox" name="isDirectScan" className="form-check-input p-2"
//                    checked={formData.isDirectScan} onChange={handleCheckbox} />
//           </div>
//         </div>
//       </div>

//       <div className="col-md-6">
//         <div className="p-3 bg-light border rounded-4 d-flex justify-content-between align-items-center shadow-sm h-100">
//           <div className="d-flex align-items-center">
//             <div className="p-2 bg-white rounded-3 me-3 shadow-xs"><AlertCircle size={18} className="text-danger" /></div>
//             <div>
//               <h6 className="mb-0 fw-bold small">Allow Fractional Qty</h6>
//               <small className="text-muted">e.g. Sell 1.5 Kg or 0.5 Mtr</small>
//             </div>
//           </div>
//           <div className="form-check form-switch m-0">
//             <input type="checkbox" name="allowFractionalQty" className="form-check-input p-2"
//                    checked={formData.allowFractionalQty} onChange={handleCheckbox} />
//           </div>
//         </div>
//       </div>

//       {/* --- DISCOUNTS & SECURITY --- */}
//       <div className="col-12 mt-4">
//         <h6 className="fw-bold text-uppercase small text-muted border-bottom pb-2">Discount & Return Rules</h6>
//       </div>

//       <div className="col-md-6">
//         <div className="p-3 bg-light border rounded-4 d-flex justify-content-between align-items-center shadow-sm h-100">
//           <div className="d-flex align-items-center">
//             <div className="p-2 bg-white rounded-3 me-3 shadow-xs"><Percent size={18} className="text-success" /></div>
//             <div>
//               <h6 className="mb-0 fw-bold small">Item Level Discount</h6>
//               <small className="text-muted">Cashier can apply discounts</small>
//             </div>
//           </div>
//           <div className="form-check form-switch m-0">
//             <input type="checkbox" name="allowDiscount" className="form-check-input p-2"
//                    checked={formData.allowDiscount} onChange={handleCheckbox} />
//           </div>
//         </div>
//       </div>

//       <div className="col-md-6">
//         <div className="p-3 bg-light border rounded-4 d-flex justify-content-between align-items-center shadow-sm h-100">
//           <div className="d-flex align-items-center">
//             <div className="p-2 bg-white rounded-3 me-3 shadow-xs"><RotateCcw size={18} className="text-danger" /></div>
//             <div>
//               <h6 className="mb-0 fw-bold small">Allow Sales Return</h6>
//               <small className="text-muted">Enable return/exchange at POS</small>
//             </div>
//           </div>
//           <div className="form-check form-switch m-0">
//             <input type="checkbox" name="allowReturns" className="form-check-input p-2"
//                    checked={formData.allowReturns} onChange={handleCheckbox} />
//           </div>
//         </div>
//       </div>

//       {/* --- PRINT & DOCUMENTATION (NEW PRO FIELDS) --- */}
//       <div className="col-md-12 mt-2">
//         <div className="p-3 bg-soft-info border border-info border-opacity-10 rounded-4 d-flex justify-content-between align-items-center shadow-sm">
//           <div className="d-flex align-items-center">
//             <div className="p-2 bg-white rounded-3 me-3 shadow-xs"><Printer size={18} className="text-info" /></div>
//             <div>
//               <h6 className="mb-0 fw-bold small">Print Kitchen/Service Token (KOT)</h6>
//               <small className="text-muted">Useful for Food or Service based items</small>
//             </div>
//           </div>
//           <div className="form-check form-switch m-0">
//             <input type="checkbox" name="printKOT" className="form-check-input p-2"
//                    checked={formData.printKOT} onChange={handleCheckbox} />
//           </div>
//         </div>
//       </div>

//       {/* --- PRO TIP --- */}
//       <div className="col-12 mt-2">
//         <div className="p-3 bg-white border border-dashed rounded-4 d-flex align-items-center">
//           <Lock size={16} className="text-muted me-2" />
//           <span className="small text-muted"><b>Note:</b> Restricting behavior here ensures operational security and prevents cashier malpractice.</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default POSBehavior;


/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/exhaustive-deps */
import { Barcode } from "lucide-react";
import React from "react";
import {
  Shield,
  Percent,
  DollarSign,
  Package,
  AlertTriangle,
  Lock,
} from "react-feather";

const POSRules = ({ formData, handleChange }) => {
  const rules = formData.posRules || {};

  const onBoolChange = (name) => (e) => {
    handleChange({
      target: { name: `posRules.${name}`, value: e.target.checked },
    });
  };

  const onValueChange = (name) => (e) => {
    handleChange({
      target: { name: `posRules.${name}`, value: e.target.value },
    });
  };

  return (
    <div className="row g-4 animate__animated animate__fadeIn">
      <div className="col-12">
        <div className="p-4 bg-white rounded-4 shadow-sm border-start border-4 border-dark">
          <div className="d-flex align-items-center">
            <div className="p-3 bg-dark bg-opacity-10 rounded-3 me-3">
              <Shield size={26} className="text-dark" />
            </div>
            <div>
              <h6 className="fw-bold mb-1">POS Rules & Billing Control</h6>
              <small className="text-muted">
                Define how this product behaves during POS billing
              </small>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12">
        <h6 className="fw-bold small text-muted border-bottom pb-2 d-flex align-items-center">
          <Percent size={14} className="me-2" />
          Discount Control
        </h6>
      </div>

      <div className="col-md-6">
        <div className="p-3 bg-light rounded-4 border h-100 d-flex justify-content-between align-items-center">
          <div>
            <h6 className="fw-bold small mb-0">Allow Discount</h6>
            <small className="text-muted">
              Cashier can apply discount on this item
            </small>
          </div>
          <input
            type="checkbox"
            className="form-check-input"
            checked={rules.allowDiscount}
            onChange={onBoolChange("allowDiscount")}
          />
        </div>
      </div>

      <div className="col-12 mt-3">
        <h6 className="fw-bold small text-muted border-bottom pb-2 d-flex align-items-center">
          <DollarSign size={14} className="me-2" />
          Price Protection
        </h6>
      </div>

      <div className="col-md-6">
        <div className="p-3 bg-light rounded-4 border h-100 d-flex justify-content-between align-items-center">
          <div>
            <h6 className="fw-bold small mb-0">Allow Price Override</h6>
            <small className="text-muted">
              Cashier can manually change selling price
            </small>
          </div>
          <input
            type="checkbox"
            className="form-check-input"
            checked={rules.allowPriceOverride}
            onChange={onBoolChange("allowPriceOverride")}
          />
        </div>
      </div>

      <div className="col-md-6">
        <label className="form-label fw-bold small">
          Minimum Selling Price
        </label>
        <input
          type="number"
          min="0"
          className="form-control shadow-sm"
          placeholder="Block billing below this price"
          value={rules.minSellingPrice || ""}
          onChange={onValueChange("minSellingPrice")}
        />
        <small className="text-muted">
          Works with “Prevent Loss Selling” in Pricing
        </small>
      </div>
      <div className="col-12 mt-3">
        <h6 className="fw-bold small text-muted border-bottom pb-2 d-flex align-items-center">
          <Package size={14} className="me-2" />
          Stock Rules
        </h6>
      </div>

      <div className="col-md-6">
        <div className="p-3 bg-soft-danger rounded-4 border h-100 d-flex justify-content-between align-items-center">
          <div>
            <h6 className="fw-bold small mb-0">
              Allow Negative Stock Billing
            </h6>
            <small className="text-muted">
              Allow sale even when stock is zero
            </small>
          </div>
          <input
            type="checkbox"
            className="form-check-input"
            checked={rules.allowNegativeStock}
            onChange={onBoolChange("allowNegativeStock")}
          />
        </div>
      </div>

      <div className="col-md-6">
        <div className="p-3 bg-light rounded-4 border h-100 d-flex justify-content-between align-items-center">
          <div>
            <h6 className="fw-bold small mb-0">
              Block Sale When Out of Stock
            </h6>
            <small className="text-muted">
              Strict stock enforcement
            </small>
          </div>
          <input
            type="checkbox"
            className="form-check-input"
            checked={rules.blockOutOfStockSale}
            onChange={onBoolChange("blockOutOfStockSale")}
          />
        </div>
      </div>
      <div className="col-12 mt-3">
        <h6 className="fw-bold small text-muted border-bottom pb-2 d-flex align-items-center">
          <Barcode size={14} className="me-2" />
          Barcode & Safety
        </h6>
      </div>

      <div className="col-md-6">
        <div className="p-3 bg-light rounded-4 border h-100 d-flex justify-content-between align-items-center">
          <div>
            <h6 className="fw-bold small mb-0">
              Barcode Scan Increases Quantity
            </h6>
            <small className="text-muted">
              Each scan adds +1 quantity
            </small>
          </div>
          <input
            type="checkbox"
            className="form-check-input"
            checked={rules.scanIncrementsQty}
            onChange={onBoolChange("scanIncrementsQty")}
          />
        </div>
      </div>

      <div className="col-md-6">
        <div className="p-3 bg-soft-warning rounded-4 border h-100 d-flex justify-content-between align-items-center">
          <div>
            <h6 className="fw-bold small mb-0">
              Allow Zero Price Sale
            </h6>
            <small className="text-muted">
              Useful for samples / free items
            </small>
          </div>
          <input
            type="checkbox"
            className="form-check-input"
            checked={rules.allowZeroPriceSale}
            onChange={onBoolChange("allowZeroPriceSale")}
          />
        </div>
      </div>
      <div className="col-12">
        <div className="alert alert-soft-info rounded-4 d-flex align-items-center">
          <Lock size={18} className="me-3" />
          <small className="fw-bold mb-0">
            Variant products always follow variant-level price & stock during
            billing. These rules apply on top of Pricing & Inventory controls.
          </small>
        </div>
      </div>
    </div>
  );
};

export default POSRules;
