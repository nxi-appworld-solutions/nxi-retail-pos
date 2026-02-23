// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useEffect, useState } from "react";
// import { Shield, Lock, Save, Info } from "react-feather";

// const ROLES = ["Cashier", "Manager", "Admin"];

// const PERMISSIONS = {
//   BILL_CREATE: "Create Bills",
//   BILL_CANCEL: "Cancel Bills",
//   DISCOUNT_APPLY: "Apply Discount",
//   DISCOUNT_OVERRIDE: "Override Discount",

//   CASH_OPEN: "Open Cash Shift",
//   CASH_PAID_IN: "Cash Paid In",
//   CASH_PAID_OUT: "Cash Paid Out",
//   CASH_CLOSE: "Close Shift",

//   USER_CREATE: "Create Users",
//   USER_EDIT: "Edit Users",

//   REPORT_VIEW: "View Reports",
//   SETTINGS_ACCESS: "System Settings",
// };

// const PERMISSION_GROUPS = {
//   Billing: [
//     "BILL_CREATE",
//     "BILL_CANCEL",
//     "DISCOUNT_APPLY",
//     "DISCOUNT_OVERRIDE",
//   ],
//   Cash: ["CASH_OPEN", "CASH_PAID_IN", "CASH_PAID_OUT", "CASH_CLOSE"],
//   Users: ["USER_CREATE", "USER_EDIT"],
//   System: ["REPORT_VIEW", "SETTINGS_ACCESS"],
// };

// const ROLE_PERMISSION_MAP = {
//   Cashier: ["BILL_CREATE", "DISCOUNT_APPLY", "CASH_OPEN", "CASH_CLOSE"],

//   Manager: [
//     "BILL_CREATE",
//     "BILL_CANCEL",
//     "DISCOUNT_APPLY",
//     "DISCOUNT_OVERRIDE",
//     "CASH_OPEN",
//     "CASH_PAID_IN",
//     "CASH_PAID_OUT",
//     "CASH_CLOSE",
//     "REPORT_VIEW",
//   ],

//   Admin: Object.keys(PERMISSIONS),
// };

// const RolePermissionPage = () => {
//   const [role, setRole] = useState("Cashier");
//   const [localPerms, setLocalPerms] = useState([]);
//   const [dirty, setDirty] = useState(false);

//   const isEditable = role === "Manager";
//   const basePermissions = ROLE_PERMISSION_MAP[role];

//   useEffect(() => {
//     setLocalPerms(basePermissions);
//     setDirty(false);
//   }, [role]);

//   const togglePermission = (perm) => {
//     if (!isEditable) return;

//     setDirty(true);
//     setLocalPerms((prev) =>
//       prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm],
//     );
//   };

//   const saveChanges = () => {
//     // TODO: API call
//     console.log("Saved permissions:", role, localPerms);
//     setDirty(false);
//     alert("Permissions updated successfully");
//   };

//   return (
//     <div className="page-wrapper">
//       <div className="content">
//         <div className="page-header d-flex justify-content-between align-items-center">
//           <div className="page-title">
//             {/* HEADER */}
//             <div className="mb-4">
//               <h4 className="fw-bold mb-1">Roles & Permissions</h4>
//               <p className="text-muted">
//                 Define access control for each role in the POS system
//               </p>
//             </div>
//           </div>
//           {/* ROLE SELECTOR */}
//           <div className="d-flex gap-2 mb-4">
//             {ROLES.map((r) => (
//               <button
//                 key={r}
//                 className={`btn ${
//                   role === r ? "btn-primary" : "btn-outline-secondary"
//                 }`}
//                 onClick={() => setRole(r)}
//               >
//                 {r}
//               </button>
//             ))}
//           </div>
//         </div>
//         {/* INFO BANNER */}
//         {!isEditable && (
//           <div className="alert alert-light d-flex align-items-center mb-4">
//             <Info size={18} className="me-2 text-muted" />
//             <span className="small text-muted">
//               Permissions for <b>{role}</b> are system-defined and cannot be
//               modified.
//             </span>
//           </div>
//         )}

//         {/* PERMISSION GROUPS */}
//         {Object.entries(PERMISSION_GROUPS).map(([group, perms]) => (
//           <div key={group} className="card mb-3 border-0 shadow-sm">
//             <div className="card-header bg-light fw-bold">
//               {group} Permissions
//             </div>

//             <div className="card-body">
//               {perms.map((perm) => {
//                 const checked = localPerms.includes(perm);

//                 return (
//                   <div
//                     key={perm}
//                     className="d-flex align-items-center justify-content-between mb-2"
//                   >
//                     <div className="d-flex align-items-center">
//                       <Shield size={16} className="me-2 text-primary" />
//                       <span>{PERMISSIONS[perm]}</span>
//                     </div>

//                     <div className="form-check form-switch">
//                       <input
//                         className="form-check-input"
//                         type="checkbox"
//                         checked={checked}
//                         disabled={!isEditable}
//                         onChange={() => togglePermission(perm)}
//                       />
//                     </div>
//                   </div>
//                 );
//               })}

//               {!isEditable && (
//                 <div className="small text-muted mt-2">
//                   <Lock size={12} className="me-1" />
//                   Locked by system policy
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}

//         {/* SAVE BAR */}
//         {isEditable && dirty && (
//           <div className="card border-0 shadow-sm mt-4">
//             <div className="card-body d-flex justify-content-between align-items-center">
//               <span className="small text-muted">
//                 You have unsaved permission changes
//               </span>
//               <button
//                 className="btn btn-primary d-flex align-items-center"
//                 onClick={saveChanges}
//               >
//                 <Save size={16} className="me-2" />
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RolePermissionPage;
