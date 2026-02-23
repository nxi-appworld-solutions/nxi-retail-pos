// import React, { useEffect, useState } from "react";
// import {
//   User,
//   Phone,
//   MapPin,
//   DollarSign,
//   FileText,
//   Star,
//   Settings,
//   MessageCircle,
//   Shield,
//   CheckCircle,
//   Box,
// } from "react-feather";
// import BasicInfo from "./BasicInfo";
// import ContactInfo from "./ContactInfo";
// import AddressInfo from "./AddressInfo";
// import FinancialInfo from "./FinancialInfo";
// import LegalInfo from "./LegalInfo";
// import LoyaltyInfo from "./LoyaltyInfo";
// import CRMInfo from "./CRMInfo";
// import SystemInfo from "./SystemInfo";
// import CustomerConfiguration from "./CustomerConfiguration";

// const sections = [
//   {
//     key: "basic",
//     label: "Basic",
//     icon: <User />,
//     color: "#4e73df",
//     requiredFields: ["name"],
//   },
//   {
//     key: "contact",
//     label: "Contact",
//     icon: <Phone />,
//     color: "#1cc88a",
//     requiredFields: ["mobile"],
//   },
//   { key: "address", label: "Location", icon: <MapPin />, color: "#36b9cc" },
//   {
//     key: "financial",
//     label: "Accounts",
//     icon: <DollarSign />,
//     color: "#f6c23e",
//   },
//   { key: "legal", label: "GST & Tax", icon: <Shield />, color: "#e74a3b" },
//   // { key: "loyalty", label: "Loyalty", icon: <Star />, color: "#f6c23e" },
//   // {
//   //   key: "crm",
//   //   label: "CRM & Notes",
//   //   icon: <MessageCircle />,
//   //   color: "#6610f2",
//   // },
//   { key: "system", label: "System", icon: <Settings />, color: "#858796" },
// ];

// const CustomerERPLayout = ({ formData, handleChange }) => {
//   const [active, setActive] = useState("basic");

//   useEffect(() => {
//     const handler = (e) => {
//       e.preventDefault();
//       e.returnValue = "";
//     };
//     window.addEventListener("beforeunload", handler);
//     return () => window.removeEventListener("beforeunload", handler);
//   }, []);

//   // Helper function: Check if section is "Ready"
//   const checkStatus = (fields) => {
//     if (!fields) return false;
//     return fields.every(
//       (field) => formData[field] && formData[field].toString().length > 0,
//     );
//   };

//   const canNavigate = (key) => {
//     // if (key === "basic") return true;
//     // if (!checkStatus(["name", "mobile"])) return false;
//     return true;
//   };

//   const visibleSections = sections.filter(
//     (s) => s.key !== "legal" || formData.isGSTEnabled,
//   );

//   const renderSection = () => {
//     const props = { formData, handleChange };
//     switch (active) {
//       case "basic":
//         return <BasicInfo {...props} />;
//       case "contact":
//         return <ContactInfo {...props} />;
//       case "address":
//         return <AddressInfo {...props} />;
//       case "financial":
//         return <FinancialInfo {...props} />;
//       case "legal":
//         return <LegalInfo {...props} />;
//       case "loyalty":
//         return <LoyaltyInfo {...props} />;
//       case "crm":
//         return <CRMInfo {...props} />;
//       case "system":
//         return <CustomerConfiguration {...props} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="row gx-4 animate__animated animate__fadeIn">
//       {/* SIDEBAR NAVIGATION */}
//       <div className="col-lg-3 mb-4">
//         <div className="sticky-top" style={{ top: "100px", zIndex: 10 }}>
//           <div className="card border-0 shadow-sm rounded-2 overflow-hidden">
//             <div className="card-header bg-white py-3 border-bottom-0">
//               <span className="fw-bold mb-0 text-muted small text-uppercase">
//                 Navigation
//               </span>
//             </div>
//             <div className="list-group list-group-flush p-2 pt-0">
//               {sections.map((s) => {
//                 const isComplete = checkStatus(s.requiredFields);
//                 return (
//                   <button
//                     key={s.key}
//                     type="button"
//                     className={`list-group-item list-group-item-action border-0 rounded-3 mb-1 d-flex align-items-center justify-content-between py-3 transition-all ${
//                       active === s.key
//                         ? "active shadow bg-primary"
//                         : "text-muted"
//                     }`}
//                     disabled={!canNavigate(s.key)}
//                     onClick={() => setActive(s.key)}
//                   >
//                     <div className="d-flex align-items-center">
//                       <span
//                         className={`me-3 d-flex align-items-center ${
//                           active === s.key ? "text-white" : ""
//                         }`}
//                         style={{ color: s.color }}
//                       >
//                         {React.cloneElement(s.icon, { size: 18 })}
//                       </span>
//                       <span className="fw-semibold small text-uppercase">
//                         {s.label}
//                       </span>
//                     </div>
//                     {/* Completion Indicator */}
//                     {isComplete && (
//                       <CheckCircle
//                         size={14}
//                         className={
//                           active === s.key ? "text-white" : "text-success"
//                         }
//                       />
//                     )}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Quick Summary Card (Optional Pro Feature) */}
//           <div className="card border-0 bg-primary bg-opacity-10 rounded-2 p-3 d-none d-lg-block">
//             <div className="d-flex align-items-center">
//               <div className="p-2 bg-primary rounded-3 text-white me-2">
//                 <Box size={16} />
//               </div>
//               <div className="overflow-hidden">
//                 {/* <small className="opacity-75">Quick Preview</small> */}
//                 <h6 className="small fw-bold mb-0 text-truncate text-primary">
//                   {formData.name || "Unnamed Customer"}
//                 </h6>
//                 <p className="text-xs text-muted mb-0">
//                   {formData.sku || "No Type yet"}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* DYNAMIC CONTENT AREA */}
//       <div className="col-lg-9 mb-5 pb-5">
//         <div className="card border-0 shadow-sm rounded-4 h-100 min-vh-50 animate__animated animate__fadeInRight animate__faster">
//           <div className="card-header bg-white border-bottom py-3 px-4 d-flex justify-content-between align-items-center">
//             <h5 className="mb-0 fw-bold text-primary">
//               {sections.find((s) => s.key === active)?.label} Details
//             </h5>
//             <span className="badge bg-light text-muted fw-normal">
//               Section {sections.findIndex((s) => s.key === active) + 1} of{" "}
//               {sections.length}
//             </span>
//           </div>
//           <div className="card-body p-4">{renderSection()}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerERPLayout;

import React, { useEffect, useMemo, useState } from "react";
import {
  User,
  Phone,
  MapPin,
  DollarSign,
  Settings,
  Shield,
  CheckCircle,
  Box,
} from "react-feather";

import BasicInfo from "./BasicInfo";
import ContactInfo from "./ContactInfo";
import AddressInfo from "./AddressInfo";
import FinancialInfo from "./FinancialInfo";
import LegalInfo from "./LegalInfo";
import CustomerConfiguration from "./CustomerConfiguration";

/* ---------------- SECTION CONFIG ---------------- */

const ALL_SECTIONS = [
  {
    key: "basic",
    label: "Basic",
    icon: <User />,
    color: "#4e73df",
    requiredFields: ["name"],
  },
  {
    key: "contact",
    label: "Contact",
    icon: <Phone />,
    color: "#1cc88a",
    requiredFields: ["mobile"],
  },
  {
    key: "address",
    label: "Location",
    icon: <MapPin />,
    color: "#36b9cc",
    // requiredFields: ["name", "mobile"],
  },
  {
    key: "financial",
    label: "Accounts",
    icon: <DollarSign />,
    color: "#f6c23e",
    // requiredFields: ["name", "mobile"],
  },
  {
    key: "legal",
    label: "GST & Tax",
    icon: <Shield />,
    color: "#e74a3b",
    dependsOnGST: true,
    // requiredFields: ["name", "mobile"],
  },
  {
    key: "configuration",
    label: "Configuration",
    icon: <Settings />,
    color: "#858796",
  },
];

/* ---------------- COMPONENT ---------------- */

const CustomerERPLayout = ({ formData, handleChange }) => {
  const [active, setActive] = useState("basic");

  /* ---- UNSAVED CHANGES WARNING ---- */
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  /* ---- REQUIRED CHECK ---- */
  const checkStatus = (fields = []) =>
    fields.every(
      (f) => formData[f] && formData[f].toString().trim().length > 0,
    );

  /* ---- NAVIGATION GUARD ---- */
  const canNavigate = (key) => {
    switch (key) {
      case "basic":
        return true;

      case "contact":
        return checkStatus(["name"]);

      case "address":
      case "financial":
        return checkStatus(["name", "mobile"]);

      case "legal":
        return formData.isGSTEnabled && checkStatus(["name", "mobile"]);

      case "configuration":
        return true;

      default:
        return false;
    }
  };

  /* ---- VISIBLE SECTIONS ---- */
  const visibleSections = useMemo(
    () => ALL_SECTIONS.filter((s) => !s.dependsOnGST || formData.isGSTEnabled),
    [formData.isGSTEnabled],
  );

  /* ---- ACTIVE SECTION META ---- */
  const activeIndex = visibleSections.findIndex((s) => s.key === active);
  const activeSection = visibleSections[activeIndex];

  /* ---- CONTENT RENDER ---- */
  const renderSection = () => {
    const props = { formData, handleChange };
    switch (active) {
      case "basic":
        return <BasicInfo {...props} />;
      case "contact":
        return <ContactInfo {...props} />;
      case "address":
        return <AddressInfo {...props} />;
      case "financial":
        return <FinancialInfo {...props} />;
      case "legal":
        return <LegalInfo {...props} />;
      case "configuration":
        return <CustomerConfiguration {...props} />;
      default:
        return null;
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="row gx-4 animate__animated animate__fadeIn">
      {/* -------- LEFT NAV -------- */}
      <div className="col-lg-3 mb-4">
        <div className="sticky-top" style={{ top: 100, zIndex: 10 }}>
          <div className="card border-0 shadow-sm rounded-3">
            <div className="card-header bg-white py-3 border-0">
              <span className="fw-bold text-muted small text-uppercase">
                Customer Setup
              </span>
            </div>

            <div className="list-group list-group-flush p-2">
              {visibleSections.map((s) => {
                const isComplete = checkStatus(s.requiredFields);
                const disabled = !canNavigate(s.key);

                return (
                  <button
                    key={s.key}
                    type="button"
                    disabled={disabled}
                    onClick={() => setActive(s.key)}
                    className={`list-group-item border-0 rounded-3 mb-1 d-flex justify-content-between align-items-center py-3
                      ${active === s.key ? "bg-primary text-white shadow" : "text-muted"}
                      ${disabled ? "opacity-50" : ""}
                    `}
                  >
                    <div className="d-flex align-items-center">
                      <span
                        className="me-3"
                        style={{ color: active === s.key ? "#fff" : s.color }}
                      >
                        {React.cloneElement(s.icon, { size: 18 })}
                      </span>
                      <span className="fw-semibold small text-uppercase">
                        {s.label}
                      </span>
                    </div>

                    {isComplete && (
                      <CheckCircle
                        size={14}
                        className={
                          active === s.key ? "text-white" : "text-success"
                        }
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ---- QUICK SUMMARY ---- */}
          <div className="card border-0 bg-primary bg-opacity-10 rounded-3 p-3 mt-3 d-none d-lg-block">
            <div className="d-flex align-items-center">
              <div className="p-2 bg-primary rounded-3 text-white me-2">
                <Box size={16} />
              </div>
              <div className="overflow-hidden">
                <h6 className="fw-bold mb-0 text-primary text-truncate">
                  {formData.name || "Unnamed Customer"}
                </h6>
                <small className="text-muted">
                  {formData.mobile || "No contact added"}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -------- RIGHT CONTENT -------- */}
      <div className="col-lg-9 mb-5 pb-5">
        <div className="card border-0 shadow-sm rounded-4 min-vh-50">
          <div className="card-header bg-white border-bottom py-3 px-4 d-flex justify-content-between align-items-center">
            <h5 className="fw-bold text-primary mb-0">
              {activeSection?.label}
            </h5>
            <span className="badge bg-light text-muted">
              Step {activeIndex + 1} of {visibleSections.length}
            </span>
          </div>

          <div className="card-body p-4">{renderSection()}</div>
        </div>
      </div>
    </div>
  );
};

export default CustomerERPLayout;
