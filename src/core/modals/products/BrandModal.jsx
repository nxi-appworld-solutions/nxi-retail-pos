// import React, { useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   X,
//   Tag,
//   Hash,
//   RefreshCw,
//   Type,
//   CheckCircle,
//   UploadCloud,
//   Shield,
//   Globe,
//   Award,
//   Percent,
//   Truck,
//   Briefcase,
//   Box,
// } from "react-feather";
// import { MODALS } from "../../../constants/modal.constants";
// import { closeModal } from "../../../core/redux/uiModalSlice";
// import useBrand from "./hooks/useBrand";
// import Select from "react-select";
// import {
//   AlertCircle,
//   ShoppingCart,
//   Star,
//   Trash2,
//   UserCheck,
// } from "lucide-react";
// import { truncateText } from "../../../utils/common";

// const AddBrandModal = () => {
//   const dispatch = useDispatch();
//   const fileInputRef = useRef(null);
//   const { activeModal } = useSelector((state) => state.uiModal);
//   const { formData, handleChange, onSubmit, resetForm, loading } = useBrand();

//   if (activeModal !== MODALS.BRAND) return null;

//   const handleClose = () => {
//     dispatch(closeModal());
//     resetForm();
//   };
//   const vendorOptions = [
//     { value: "v1", label: "Global Distributors Pvt Ltd" },
//     { value: "v2", label: "Reliance Digital Wholesale" },
//     { value: "v3", label: "Local Tech Hub" },
//   ];
//   // Helper to find vendor label/data
//   const getVendorData = (id) => vendorOptions.find((o) => o.value === id);
//   const handleVendorSelect = (selectedOptions) => {
//     const currentVendors = formData.preferredVendors || [];
//     const newVendors = selectedOptions.map((opt) => {
//       const existing = currentVendors.find((v) => v.vendorId === opt.value);
//       return (
//         existing || { vendorId: opt.value, label: opt.label, isDefault: false }
//       );
//     });

//     // Agar koi default pehle se tha, toh use maintain rakhein, warna pehle wale ko bana dein
//     if (newVendors.length > 0 && !newVendors.some((v) => v.isDefault)) {
//       newVendors[0].isDefault = true;
//     }

//     handleChange({ target: { name: "preferredVendors", value: newVendors } });
//   };

//   const setAsDefault = (vendorId) => {
//     const updated = formData.preferredVendors.map((v) => ({
//       ...v,
//       isDefault: v.vendorId === vendorId,
//     }));
//     handleChange({ target: { name: "preferredVendors", value: updated } });
//   };

//   const triggerFileInput = () => fileInputRef.current.click();

//   return (
//     <>
//       {/* MODERN GLASS BACKDROP */}
//       <div className="modal-backdrop fade show"></div>
//       <div
//         className="modal fade show d-block animate__animated animate__fadeIn"
//         role="dialog"
//       >
//         <div className="modal-dialog modal-xl modal-dialog-centered">
//           <div className="modal-content border-0 rounded-3 shadow-2xl overflow-hidden">
//             {/* --- HEADER --- */}
//             <div className="modal-header bg-white px-4 py-3 border-bottom d-flex align-items-center justify-content-between">
//               <div className="d-flex align-items-center">
//                 <div className="p-2 bg-soft-success rounded-3 me-3 text-success shadow-sm">
//                   <Award size={24} />
//                 </div>
//                 <div>
//                   <h5 className="fw-bold mb-0 text-dark">
//                     Enterprise Brand Master
//                   </h5>
//                   <p className="text-muted small mb-0">
//                     Configure global brand identity and procurement rules
//                   </p>
//                 </div>
//               </div>
//               <button
//                 className="btn btn-light rounded-circle p-2 shadow-sm border"
//                 onClick={handleClose}
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             {/* --- BODY --- */}
//             <div className="modal-body px-4 py-4 bg-white">
//               <div className="row g-4">
//                 {/* LEFT COLUMN: BRAND IMAGE & QUICK STATS */}
//                 <div className="col-lg-3 border-end border-light pe-lg-4 text-center">
//                   <label className="form-label fw-bold small text-muted text-uppercase mb-3 d-block ls-1">
//                     Brand Identity
//                   </label>

//                   <div
//                     className="mx-auto position-relative card border-2 border-dashed rounded-2 p-2 bg-light cursor-pointer hover-bg-soft-primary transition-all mb-3"
//                     style={{
//                       width: "240px",
//                       height: "180px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                     onClick={triggerFileInput}
//                   >
//                     {formData.image ? (
//                       <img
//                         src={formData.image}
//                         alt="brand"
//                         className="w-100 h-100 object-fit-contain rounded-3"
//                       />
//                     ) : (
//                       <div className="text-center">
//                         <UploadCloud
//                           size={40}
//                           className="text-success opacity-50 mb-2"
//                         />
//                         <h6 className="fw-bold small mb-0">Upload Logo</h6>
//                       </div>
//                     )}
//                     <input
//                       type="file"
//                       ref={fileInputRef}
//                       className="d-none"
//                       accept="image/*"
//                       onChange={(e) => {
//                         const file = e.target.files[0];
//                         if (file)
//                           handleChange({
//                             target: {
//                               name: "image",
//                               value: URL.createObjectURL(file),
//                             },
//                           });
//                       }}
//                     />
//                   </div>

//                   <div className="p-3 bg-soft-light rounded-2 border">
//                     <div className="d-flex justify-content-between align-items-center mb-2">
//                       <span className="small text-muted fw-bold">
//                         Brand Tier
//                       </span>
//                       <span
//                         className={`badge rounded-pill ${
//                           formData.brandTier === "Premium"
//                             ? "bg-warning text-dark"
//                             : "bg-primary"
//                         }`}
//                       >
//                         {formData.brandTier || "Standard"}
//                       </span>
//                     </div>
//                     <p className="small text-muted mb-0 lh-sm">
//                       Logo will appear on Invoice, POS Grid, and Online Store.
//                     </p>
//                   </div>
//                 </div>

//                 {/* RIGHT COLUMN: DETAILED CONFIGURATION */}
//                 <div className="col-lg-9 ps-lg-4">
//                   {/* SECTION 1: CORE IDENTITY */}
//                   <div className="d-flex align-items-center mb-3">
//                     <div className="bg-primary p-1 rounded-circle me-2"></div>
//                     <h6 className="fw-bold text-uppercase small text-dark mb-0">
//                       Core Identity
//                     </h6>
//                   </div>

//                   <div className="row g-3 mb-4">
//                     <div className="col-md-6">
//                       <label className="form-label fw-bold small text-secondary">
//                         Brand Name <span className="text-danger">*</span>
//                       </label>
//                       <div className="input-group shadow-sm border rounded-3 overflow-hidden">
//                         <span className="input-group-text bg-white border-0">
//                           <Type size={16} className="text-muted" />
//                         </span>
//                         <input
//                           type="text"
//                           name="name"
//                           className="form-control border-0 fw-bold"
//                           placeholder="e.g. Samsung, Nike"
//                           value={formData.name}
//                           onChange={handleChange}
//                         />
//                       </div>
//                     </div>

//                     <div className="col-md-3">
//                       <label className="form-label fw-bold small text-secondary">
//                         Brand Code
//                       </label>
//                       <input
//                         type="text"
//                         name="code"
//                         className="form-control shadow-sm font-monospace text-uppercase"
//                         placeholder="BR-00"
//                         value={formData.code}
//                         onChange={handleChange}
//                       />
//                     </div>

//                     <div className="col-md-3">
//                       <label className="form-label fw-bold small text-secondary">
//                         Brand Tier
//                       </label>
//                       <select
//                         name="brandTier"
//                         className="form-select shadow-sm"
//                         value={formData.brandTier}
//                         onChange={handleChange}
//                       >
//                         <option value="Economy">Economy / Budget</option>
//                         <option value="Standard">Standard</option>
//                         <option value="Premium">Premium / Luxury</option>
//                       </select>
//                     </div>
//                   </div>

//                   {/* SECTION 2: PRODUCTION & WARRANTY */}
//                   <div className="d-flex align-items-center mb-3 pt-3 border-top">
//                     <div className="bg-info p-1 rounded-circle me-2"></div>
//                     <h6 className="fw-bold text-uppercase small text-dark mb-0">
//                       Manufacturing & Warranty
//                     </h6>
//                   </div>

//                   <div className="row g-3 mb-4">
//                     <div className="col-md-4">
//                       <label className="form-label small fw-bold text-secondary">
//                         Parent Manufacturer
//                       </label>
//                       <div className="input-group shadow-sm border rounded-3 overflow-hidden">
//                         <span className="input-group-text bg-white border-0">
//                           <Briefcase size={16} className="text-muted" />
//                         </span>
//                         <input
//                           type="text"
//                           name="manufacturer"
//                           className="form-control border-0"
//                           value={formData.manufacturer}
//                           onChange={handleChange}
//                         />
//                       </div>
//                     </div>

//                     <div className="col-md-4">
//                       <label className="form-label small fw-bold text-secondary">
//                         Country of Origin
//                       </label>
//                       <div className="input-group shadow-sm border rounded-3 overflow-hidden">
//                         <span className="input-group-text bg-white border-0">
//                           <Globe size={16} className="text-muted" />
//                         </span>
//                         <input
//                           type="text"
//                           name="countryOfOrigin"
//                           className="form-control border-0"
//                           value={formData.countryOfOrigin}
//                           onChange={handleChange}
//                         />
//                       </div>
//                     </div>

//                     <div className="col-md-4">
//                       <label className="form-label small fw-bold text-secondary">
//                         Std. Warranty (Months)
//                       </label>
//                       <input
//                         type="number"
//                         name="warrantyPeriod"
//                         className="form-control shadow-sm"
//                         value={formData.warrantyPeriod}
//                         onChange={handleChange}
//                       />
//                     </div>
//                   </div>

//                   {/* SECTION: VENDOR & SUPPLY CHAIN */}
//                   <div className="col-12 mb-3 mt-2 pt-3 border-top">
//                     <div className="d-flex align-items-center justify-content-between mb-3">
//                       <div className="d-flex align-items-center">
//                         <div className="p-2 bg-soft-primary rounded-3 me-2 text-primary">
//                           <Truck size={18} />
//                         </div>
//                         <h6 className="fw-bold text-uppercase small text-dark mb-0">
//                           Supply Chain & Strategic Sourcing
//                         </h6>
//                       </div>
//                       <span className="badge bg-light text-muted fw-normal">
//                         Total Vendors: {formData.preferredVendors?.length || 0}
//                       </span>
//                     </div>

//                     <div className="row g-3">
//                       {/* SELECTOR BOX */}
//                       <div className="col-md-5">
//                         <div className="p-4 bg-light rounded-2 border border-dashed h-100">
//                           <label className="form-label small fw-bold text-secondary d-flex align-items-center mb-3">
//                             <UserCheck
//                               size={14}
//                               className="me-2 text-primary"
//                             />{" "}
//                             Add Authorized Suppliers
//                           </label>

//                           <Select
//                             isMulti
//                             options={vendorOptions}
//                             placeholder="Search vendor database..."
//                             className="basic-multi-select shadow-sm"
//                             classNamePrefix="select"
//                             onChange={handleVendorSelect}
//                             value={vendorOptions.filter((opt) =>
//                               formData.preferredVendors?.some(
//                                 (v) => v.vendorId === opt.value
//                               )
//                             )}
//                           />

//                           <div className="mt-4 pt-2">
//                             <div className="d-flex align-items-center text-muted small mb-2">
//                               <AlertCircle size={12} className="me-1" />
//                               <span>
//                                 Avg. Restock Cycle:{" "}
//                                 <b>{formData.leadTimeDays || 0} Days</b>
//                               </span>
//                             </div>
//                             <input
//                               type="range"
//                               className="form-range bg-muted"
//                               name="leadTimeDays"
//                               min="1"
//                               max="60"
//                               value={formData.leadTimeDays || 7}
//                               onChange={handleChange}
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       {/* VENDOR RELATIONSHIP LIST */}
//                       <div className="col-md-7">
//                         <div
//                           className="vendor-matrix-container border rounded-2 overflow-hidden shadow-xs bg-white h-100"
//                           style={{ minHeight: "220px" }}
//                         >
//                           {!formData.preferredVendors ||
//                           formData.preferredVendors.length === 0 ? (
//                             <div className="h-100 d-flex flex-column align-items-center justify-content-center text-muted opacity-50">
//                               <ShoppingCart
//                                 size={40}
//                                 strokeWidth={1}
//                                 className="mb-2"
//                               />
//                               <p className="small">
//                                 No vendors mapped to this brand yet
//                               </p>
//                             </div>
//                           ) : (
//                             <div className="table-responsive h-100">
//                               <table className="table table-hover align-middle mb-0">
//                                 <thead className="bg-light">
//                                   <tr>
//                                     <th className="small border-0 ps-2">
//                                       Authorized Supplier
//                                     </th>
//                                     <th className="small border-0 text-center">
//                                       MOQ
//                                     </th>
//                                     <th className="small border-0 text-center">
//                                       Primary
//                                     </th>
//                                     <th className="small border-0 text-end pe-2">
//                                       Manage
//                                     </th>
//                                   </tr>
//                                 </thead>
//                                 <tbody>
//                                   {formData.preferredVendors.map((vendor) => {
//                                     const data = getVendorData(vendor.vendorId);
//                                     return (
//                                       <tr
//                                         key={vendor.vendorId}
//                                         className={
//                                           vendor.isDefault
//                                             ? "bg-soft-success bg-opacity-10"
//                                             : ""
//                                         }
//                                       >
//                                         <td className="ps-2">
//                                           <div className="d-flex align-items-center">
//                                             <div
//                                               className={`avatar-xs p-1 rounded-circle me-2 bg-white border ${
//                                                 vendor.isDefault
//                                                   ? "border-success"
//                                                   : ""
//                                               }`}
//                                             >
//                                               <Briefcase
//                                                 size={12}
//                                                 className={
//                                                   vendor.isDefault
//                                                     ? "text-success"
//                                                     : "text-muted"
//                                                 }
//                                               />
//                                             </div>
//                                             <div>
//                                               <div className="small fw-bold text-dark mb-0">
//                                                 {truncateText(data?.label, 20)}
//                                               </div>
//                                               <div className="text-muted small">
//                                                 {data?.location} • Code:{" "}
//                                                 {vendor.vendorId}
//                                               </div>
//                                             </div>
//                                           </div>
//                                         </td>
//                                         <td
//                                           className="text-center p-0"
//                                           style={{ width: "180px" }}
//                                         >
//                                           <input
//                                             type="number"
//                                             className="form-control small form-control-sm text-center border-0 bg-light"
//                                             placeholder="Qty"
//                                           />
//                                         </td>
//                                         <td className="text-center">
//                                           <button
//                                             type="button"
//                                             className={`btn btn-sm rounded-pill p-1 px-2 ${
//                                               vendor.isDefault
//                                                 ? "btn-success"
//                                                 : "btn-outline-light text-muted"
//                                             }`}
//                                             onClick={() =>
//                                               setAsDefault(vendor.vendorId)
//                                             }
//                                             style={{ fontSize: "10px" }}
//                                           >
//                                             {vendor.isDefault ? (
//                                               <>
//                                                 <Star
//                                                   size={10}
//                                                   fill="white"
//                                                   className="me-1"
//                                                 />{" "}
//                                                 Primary
//                                               </>
//                                             ) : (
//                                               "Set Main"
//                                             )}
//                                           </button>
//                                         </td>
//                                         <td className="text-end pe-3">
//                                           <button className="btn btn-link text-danger p-0 shadow-none hover-scale">
//                                             <Trash2 size={14} />
//                                           </button>
//                                         </td>
//                                       </tr>
//                                     );
//                                   })}
//                                 </tbody>
//                               </table>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* POS BEHAVIOR */}
//                   {/* <div className="d-flex align-items-center mb-3 pt-3 border-top">
//                     <div className="bg-warning p-1 rounded-circle me-2"></div>
//                     <h6 className="fw-bold text-uppercase small text-dark mb-0">
//                       POS Behavior
//                     </h6>
//                   </div>

//                   <div className="row g-3">
//                     {[
//                       {
//                         icon: <Percent size={14} className="text-muted" />,
//                         label: "Retail Discount",
//                         name: "allowBrandDiscount",
//                       },
//                       {
//                         icon: <Box size={14} className="text-muted" />,
//                         label: "Exclusive Brand",
//                         name: "exclusiveBrand",
//                       },
//                       {
//                         icon: <Award size={14} className="text-muted" />,
//                         label: "Loyalty Points",
//                         name: "isLoyaltyEligible",
//                       },
//                     ].map((rule) => (
//                       <div className="col-md-4" key={rule.name}>
//                         <div className="p-3 bg-light rounded-3 border d-flex align-items-center justify-content-between">
//                           <span className="fw-bold small d-flex align-items-center gap-2">
//                             {rule.icon} {rule.label}
//                           </span>
//                           <div className="form-check form-switch m-0">
//                             <input
//                               type="checkbox"
//                               className="form-check-input"
//                               name={rule.name}
//                               checked={formData[rule.name]}
//                               onChange={handleChange}
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div> */}

//                   {/* SECTION 3: PROFITABILITY & LOYALTY (NEW) */}
//                   <div className="d-flex align-items-center mb-3 pt-3 border-top">
//                     <div className="bg-warning p-1 rounded-circle me-2"></div>
//                     <h6 className="fw-bold text-uppercase small text-dark mb-0">
//                       Financials & POS Behavior
//                     </h6>
//                   </div>

//                   <div className="row g-3 mb-4">
//                     <div className="col-md-3">
//                       <label className="form-label small fw-bold text-secondary">
//                         Fixed Brand Margin (%)
//                       </label>
//                       <div className="input-group shadow-sm">
//                         <span className="input-group-text bg-light text-muted fw-bold">
//                           %
//                         </span>
//                         <input
//                           type="number"
//                           name="brandMarginPercent"
//                           className="form-control fw-bold text-success"
//                           value={formData.brandMarginPercent}
//                           onChange={handleChange}
//                         />
//                       </div>
//                     </div>

//                     <div className="col-md-9 d-flex gap-3 align-items-end pb-1">
//                       <div className="p-3 bg-light rounded-3 border d-flex align-items-center justify-content-between flex-grow-1 shadow-xs">
//                         <span className="fw-bold small d-flex align-items-center gap-2">
//                           <Percent size={14} className="text-muted" /> Allow
//                           Retail Discount
//                         </span>
//                         <div className="form-check form-switch m-0">
//                           <input
//                             type="checkbox"
//                             className="form-check-input"
//                             name="allowBrandDiscount"
//                             checked={formData.allowBrandDiscount}
//                             onChange={handleChange}
//                           />
//                         </div>
//                       </div>

//                       <div className="p-3 bg-light rounded-3 border d-flex align-items-center justify-content-between flex-grow-1 shadow-xs">
//                         <span className="fw-bold small d-flex align-items-center gap-2">
//                           <Box size={14} className="text-muted" /> Exclusive
//                           Brand
//                         </span>
//                         <div className="form-check form-switch m-0">
//                           <input
//                             type="checkbox"
//                             className="form-check-input"
//                             name="exclusiveBrand"
//                             checked={formData.exclusiveBrand}
//                             onChange={handleChange}
//                           />
//                         </div>
//                       </div>

//                       {/* NEW PRO FIELD: LOYALTY ELIGIBILITY */}
//                       <div className="p-3 bg-light rounded-3 border d-flex align-items-center justify-content-between flex-grow-1 shadow-xs">
//                         <span className="fw-bold small d-flex align-items-center gap-2">
//                           <Award size={14} className="text-muted" /> Loyalty
//                           Points
//                         </span>
//                         <div className="form-check form-switch m-0">
//                           <input
//                             type="checkbox"
//                             className="form-check-input"
//                             name="isLoyaltyEligible"
//                             checked={formData.isLoyaltyEligible}
//                             onChange={handleChange}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* SECTION 4: SUPPLY CHAIN */}
//                   <div className="row g-3 pt-3 border-top">
//                     <div className="col-md-6">
//                       <label className="form-label small fw-bold text-secondary d-flex align-items-center">
//                         <Truck size={14} className="me-2 text-primary" /> Lead
//                         Time (Days to Restock)
//                       </label>
//                       <input
//                         type="number"
//                         name="leadTimeDays"
//                         className="form-control shadow-sm"
//                         placeholder="Avg. days for procurement"
//                         value={formData.leadTimeDays}
//                         onChange={handleChange}
//                       />
//                     </div>

//                     <div className="col-md-6 d-flex align-items-center justify-content-between p-3 mt-4 bg-soft-danger rounded-3 border border-danger border-opacity-10">
//                       <div className="d-flex align-items-center">
//                         <Shield size={20} className="text-danger me-3" />
//                         <div>
//                           <h6 className="mb-0 fw-bold small text-dark">
//                             Administrative Status
//                           </h6>
//                           <small className="text-muted">
//                             Disable brand to hide associated products
//                           </small>
//                         </div>
//                       </div>
//                       <div className="form-check form-switch m-0">
//                         <input
//                           type="checkbox"
//                           className="form-check-input p-2"
//                           checked={formData.status !== "Active"}
//                           onChange={(e) =>
//                             handleChange({
//                               target: {
//                                 name: "status",
//                                 value: e.target.checked ? "Inactive" : "Active",
//                               },
//                             })
//                           }
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* --- FOOTER --- */}
//             <div className="modal-footer bg-light px-4 py-3 border-top-0">
//               <button
//                 className="btn btn-outline-secondary fw-bold text-decoration-none px-4"
//                 onClick={handleClose}
//               >
//                 Discard
//               </button>
//               <button
//                 className="btn btn-success ms-2 d-flex align-items-center"
//                 onClick={onSubmit}
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <RefreshCw size={18} className="me-2 animate-spin" />
//                 ) : (
//                   <CheckCircle size={18} className="me-2" />
//                 )}
//                 Save Brand
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddBrandModal;

import React, { useRef } from "react";
import {
  X,
  Tag,
  Hash,
  RefreshCw,
  Type,
  CheckCircle,
  UploadCloud,
  Shield,
  Award,
  Percent,
  Truck,
  Briefcase,
  Box,
  Globe,
} from "react-feather";
import useBrand from "../../hooks/products/useBrand";
import Select from "react-select";
import {
  AlertCircle,
  ShoppingCart,
  Star,
  Trash2,
  UserCheck,
} from "lucide-react";
import { truncateText } from "../../../utils/common";
import useModal from "../useModal";

const BrandModal = () => {
  const { payload, close } = useModal();
  const mode = payload?.mode || "ADD";
  const record = payload?.record || null;

  const fileInputRef = useRef(null);

  const { formData, handleChange, onSubmit, resetForm, loading } = useBrand();

  const handleClose = () => {
    close();
    resetForm();
  };

  const vendorOptions = [
    { value: "v1", label: "Global Distributors Pvt Ltd" },
    { value: "v2", label: "Reliance Digital Wholesale" },
    { value: "v3", label: "Local Tech Hub" },
  ];

  const getVendorData = (id) => vendorOptions.find((o) => o.value === id);

  const handleVendorSelect = (selectedOptions) => {
    const currentVendors = formData.preferredVendors || [];
    const newVendors = selectedOptions.map((opt) => {
      const existing = currentVendors.find((v) => v.vendorId === opt.value);
      return (
        existing || { vendorId: opt.value, label: opt.label, isDefault: false }
      );
    });

    if (newVendors.length > 0 && !newVendors.some((v) => v.isDefault)) {
      newVendors[0].isDefault = true;
    }
    handleChange({ target: { name: "preferredVendors", value: newVendors } });
  };

  const setAsDefault = (vendorId) => {
    const updated = formData.preferredVendors.map((v) => ({
      ...v,
      isDefault: v.vendorId === vendorId,
    }));
    handleChange({ target: { name: "preferredVendors", value: updated } });
  };

  const triggerFileInput = () => fileInputRef.current.click();

  return (
    <>
      <div className="modal-content border-0 rounded-3 shadow-2xl overflow-hidden">
        {/* --- HEADER --- */}
        <div className="modal-header bg-white px-4 py-3 border-bottom d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="p-2 bg-soft-success rounded-3 me-3 text-success shadow-sm">
              <Award size={24} />
            </div>
            <div>
              <h5 className="fw-bold mb-0">
                {mode === "EDIT"
                  ? "Edit Enterprise Brand Master"
                  : "Add Enterprise Brand Master"}
              </h5>
              <p className="text-muted small mb-0">
                Configure brand identity, sourcing and financial rules
              </p>
            </div>
          </div>
          <button
            className="btn btn-light rounded-circle p-2 border shadow-sm"
            onClick={handleClose}
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body px-4 py-4 bg-white">
          <div className="row g-4">
            {/* LEFT: LOGO SECTION */}
            <div className="col-lg-3 border-end border-light text-center pe-lg-4">
              <label className="form-label fw-bold small text-muted text-uppercase mb-3 d-block">
                Brand Logo
              </label>
              <div
                className="mx-auto position-relative card border-2 border-dashed rounded-3 p-2 bg-light cursor-pointer mb-3"
                style={{
                  width: "100%",
                  height: "180px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={triggerFileInput}
              >
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="brand"
                    className="w-100 h-100 object-fit-contain rounded-2"
                  />
                ) : (
                  <div className="text-center">
                    <UploadCloud
                      size={32}
                      className="text-success opacity-50 mb-2"
                    />
                    <h6 className="fw-bold small mb-0">Upload Logo</h6>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="d-none"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file)
                      handleChange({
                        target: {
                          name: "image",
                          value: URL.createObjectURL(file),
                        },
                      });
                  }}
                />
              </div>
              <div className="p-3 bg-soft-light rounded-2 border">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="small text-muted fw-bold">Brand Tier</span>
                  <span
                    className={`badge rounded-pill ${
                      formData.brandTier === "Premium"
                        ? "bg-warning text-dark"
                        : "bg-primary"
                    }`}
                  >
                    {formData.brandTier || "Standard"}
                  </span>
                </div>
                <p className="small text-muted mb-0 lh-sm">
                  Logo will appear on Invoice, POS Grid, and Online Store.
                </p>
              </div>
            </div>

            {/* RIGHT: CONFIGURATION */}
            <div className="col-lg-9 ps-lg-4">
              {/* 1. IDENTITY GROUP */}
              <div className="row g-3 mb-4">
                <div className="col-md-4">
                  <label className="form-label fw-bold small text-secondary">
                    Brand Name *
                  </label>
                  <div className="input-group shadow-sm">
                    <input
                      type="text"
                      name="name"
                      className="form-control fw-bold"
                      placeholder="e.g. Samsung, Nike"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-bold small text-secondary">
                    Brand Code
                  </label>
                  <input
                    type="text"
                    name="code"
                    className="form-control shadow-sm font-monospace text-uppercase"
                    placeholder="BR-00"
                    value={formData.code}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-bold small text-secondary">
                    Brand Tier
                  </label>
                  <select
                    name="brandTier"
                    className="form-select shadow-sm"
                    value={formData.brandTier}
                    onChange={handleChange}
                  >
                    <option value="Economy">Economy</option>
                    <option value="Standard">Standard</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-bold text-secondary">
                    Manufacturer
                  </label>
                  <div className="input-group shadow-sm border rounded-3 overflow-hidden">
                    <span className="input-group-text bg-white border-0">
                      <Briefcase size={16} className="text-muted" />
                    </span>
                    <input
                      type="text"
                      name="manufacturer"
                      className="form-control border-0"
                      value={formData.manufacturer}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-bold text-secondary">
                    Country of Origin
                  </label>
                  <div className="input-group shadow-sm border rounded-3 overflow-hidden">
                    <span className="input-group-text bg-white border-0">
                      <Globe size={16} className="text-muted" />
                    </span>
                    <input
                      type="text"
                      name="countryOfOrigin"
                      className="form-control border-0"
                      value={formData.countryOfOrigin}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-bold text-secondary">
                    Std. Warranty (Months)
                  </label>
                  <input
                    type="number"
                    name="warrantyPeriod"
                    className="form-control shadow-sm"
                    value={formData.warrantyPeriod}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* 2. SUPPLY CHAIN SECTION */}
              <div className="col-12 mt-2 pt-3 border-top">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center">
                    <div className="p-2 bg-soft-primary rounded-3 me-2 text-primary">
                      <Truck size={18} />
                    </div>
                    <h6 className="fw-bold text-uppercase small text-dark mb-0">
                      Supply Chain & Strategic Sourcing
                    </h6>
                  </div>
                  <span className="badge bg-light text-muted fw-normal">
                    Total Vendors: {formData.preferredVendors?.length || 0}
                  </span>
                </div>

                <div className="row g-3 bg-soft-light p-3 rounded-3 border mb-4">
                  <div className="col-md-7 m-0">
                    <label className="form-label small fw-bold text-secondary">
                      Add Authorized Suppliers
                    </label>
                    <Select
                      isMulti
                      options={vendorOptions}
                      className="basic-multi-select shadow-sm"
                      onChange={handleVendorSelect}
                      value={vendorOptions.filter((opt) =>
                        formData.preferredVendors?.some(
                          (v) => v.vendorId === opt.value,
                        ),
                      )}
                    />
                  </div>
                  <div className="col-md-5 m-0">
                    <label className="form-label small fw-bold text-secondary">
                      Avg. Lead Time (Days)
                    </label>
                    <input
                      type="number"
                      name="leadTimeDays"
                      className="form-control shadow-sm"
                      value={formData.leadTimeDays}
                      onChange={handleChange}
                    />
                  </div>

                  {formData.preferredVendors?.length > 0 && (
                    <div className="col-12 mt-3">
                      <div className="table-responsive h-100 border rounded-2 overflow-hidden shadow-xs">
                        <table className="table table-sm table-hover align-middle mb-0">
                          <thead className="bg-white">
                            <tr>
                              <th className="small border-0 ps-3">Supplier</th>
                              <th className="small border-0 text-center">
                                MOQ
                              </th>
                              <th className="small border-0 text-center">
                                Primary
                              </th>
                              <th className="small border-0 text-end pe-3">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {formData.preferredVendors.map((vendor) => {
                              const data = getVendorData(vendor.vendorId);
                              return (
                                <tr
                                  key={vendor.vendorId}
                                  className={
                                    vendor.isDefault
                                      ? "bg-soft-success bg-opacity-10"
                                      : ""
                                  }
                                >
                                  <td className="ps-3 small fw-semibold">
                                    {truncateText(data?.label, 30)}
                                  </td>
                                  <td
                                    className="text-center p-0"
                                    style={{ width: "180px" }}
                                  >
                                    <input
                                      type="number"
                                      className="form-control small form-control-sm text-center border-0 bg-light"
                                      placeholder="Qty"
                                    />
                                  </td>
                                  <td className="text-center">
                                    <button
                                      type="button"
                                      className={`btn btn-sm rounded-pill p-1 px-2 ${
                                        vendor.isDefault
                                          ? "btn-success"
                                          : "btn-outline-light text-muted"
                                      }`}
                                      onClick={() =>
                                        setAsDefault(vendor.vendorId)
                                      }
                                    >
                                      {vendor.isDefault ? (
                                        <>
                                          <Star
                                            size={10}
                                            fill="white"
                                            className="me-1"
                                          />{" "}
                                          Primary
                                        </>
                                      ) : (
                                        "Set Main"
                                      )}
                                    </button>
                                  </td>
                                  <td className="text-end pe-3">
                                    <button className="btn btn-link text-danger p-0 shadow-none">
                                      <Trash2 size={14} />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 3. FINANCIALS & POS RULES */}
              <div className="d-flex align-items-center mb-3 pt-3 border-top">
                <div className="bg-warning p-1 rounded-circle me-2"></div>
                <h6 className="fw-bold text-uppercase small text-dark mb-0">
                  Financials & Commercial Rules
                </h6>
              </div>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label small fw-bold text-secondary">
                    Brand Margin (%)
                  </label>
                  <div className="input-group shadow-sm border rounded-3 overflow-hidden">
                    <span className="input-group-text bg-white border-0 text-success fw-bold">
                      %
                    </span>
                    <input
                      type="number"
                      name="brandMarginPercent"
                      className="form-control border-0 fw-bold text-success"
                      value={formData.brandMarginPercent}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-8 d-flex gap-3 align-items-end">
                  {[
                    {
                      label: "Retail Discount",
                      name: "allowBrandDiscount",
                      icon: <Percent size={14} />,
                    },
                    {
                      label: "Loyalty Points",
                      name: "isLoyaltyEligible",
                      icon: <Award size={14} />,
                    },
                    {
                      label: "Exclusive Brand",
                      name: "exclusiveBrand",
                      icon: <Box size={14} />,
                    },
                  ].map((rule) => (
                    <div
                      key={rule.name}
                      className="p-3 bg-light rounded-3 border d-flex align-items-center justify-content-between flex-grow-1 shadow-xs"
                    >
                      <span className="fw-bold small text-secondary d-flex align-items-center">
                        {rule.icon} <span className="ms-2">{rule.label}</span>
                      </span>
                      <div className="form-check form-switch m-0">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name={rule.name}
                          checked={formData[rule.name]}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. SYSTEM PROTECTION */}
              <div className="mt-4 p-3 bg-soft-danger rounded-3 border border-danger border-opacity-10 d-flex align-items-center justify-content-between shadow-xs">
                <div className="d-flex align-items-center">
                  <Shield size={20} className="text-danger me-3" />
                  <div>
                    <h6 className="mb-0 fw-bold small text-dark">
                      Administrative Lockdown
                    </h6>
                    <small className="text-muted">
                      Disable this brand to hide all its products from the POS
                      terminal.
                    </small>
                  </div>
                </div>
                <div className="form-check form-switch m-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-2"
                    checked={formData.status !== "Active"}
                    onChange={(e) =>
                      handleChange({
                        target: {
                          name: "status",
                          value: e.target.checked ? "Inactive" : "Active",
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- FOOTER --- */}
        <div className="modal-footer bg-light px-4 py-3 border-top-0">
          <button
            className="btn btn-outline-secondary fw-bold text-decoration-none px-4"
            onClick={handleClose}
          >
            Discard
          </button>
          <button
            className="btn btn-success ms-2 d-flex align-items-center"
            onClick={onSubmit}
            disabled={loading}
          >
            {loading ? (
              <RefreshCw size={18} className="me-2 animate-spin" />
            ) : (
              <CheckCircle size={18} className="me-2" />
            )}
            Save Brand
          </button>
        </div>
      </div>
    </>
  );
};

export default BrandModal;
