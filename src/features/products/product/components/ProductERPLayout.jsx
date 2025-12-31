import React, { useState } from "react";
import {
  Box,
  DollarSign,
  Database,
  Percent,
  Layers,
  Settings,
  Truck,
  BarChart2,
  ChevronRight,
} from "react-feather";

import BasicInfo from "./BasicInfo";
import PricingInfo from "./PricingInfo";
import InventoryInfo from "./InventoryInfo";
import TaxInfo from "./TaxInfo";
import VariantInfo from "./VariantInfo";
import POSBehavior from "./POSBehavior";
import SystemInfo from "./SystemInfo";
import SupplierInfo from "./SupplierInfo";
import AnalyticsInfo from "./AnalyticsInfo";

// Section logic remains same, but we add 'color' for better UX icons
const sections = [
  { key: "basic", label: "Identity", icon: <Box />, color: "#4e73df" },
  { key: "pricing", label: "Pricing", icon: <DollarSign />, color: "#1cc88a" },
  {
    key: "inventory",
    label: "Inventory",
    icon: <Database />,
    color: "#36b9cc",
  },
  { key: "tax", label: "Tax & GST", icon: <Percent />, color: "#f6c23e" },
  { key: "variants", label: "Variants", icon: <Layers />, color: "#e74a3b" },
  { key: "supplier", label: "Suppliers", icon: <Truck />, color: "#6610f2" },
  {
    key: "analytics",
    label: "Analytics",
    icon: <BarChart2 />,
    color: "#fd7e14",
  },
  { key: "pos", label: "POS Rules", icon: <Settings />, color: "#858796" },
  { key: "system", label: "System", icon: <Settings />, color: "#5a5c69" },
];

const ProductERPLayout = ({ formData, handleChange }) => {
  const [active, setActive] = useState("basic");

  const renderSection = () => {
    const props = { formData, handleChange };
    switch (active) {
      case "basic":
        return <BasicInfo {...props} />;
      case "pricing":
        return <PricingInfo {...props} />;
      case "inventory":
        return <InventoryInfo {...props} />;
      case "tax":
        return <TaxInfo {...props} />;
      case "variants":
        return <VariantInfo {...props} />;
      case "supplier":
        return <SupplierInfo {...props} />;
      case "analytics":
        return <AnalyticsInfo {...props} />;
      case "pos":
        return <POSBehavior {...props} />;
      case "system":
        return <SystemInfo {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="row gx-4 animate__animated animate__fadeIn">
      {/* SIDEBAR NAVIGATION */}
      <div className="col-lg-3">
        <div className="sticky-top" style={{ top: "100px", zIndex: 10 }}>
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
            <div className="card-header bg-white border-0 py-3">
              <h6 className="fw-bold mb-0 text-muted small text-uppercase">
                Navigation
              </h6>
            </div>
            <div className="list-group list-group-flush p-2">
              {sections.map((s) => (
                <button
                  key={s.key}
                  className={`list-group-item list-group-item-action border-0 rounded-3 mb-1 d-flex align-items-center justify-content-between py-3 transition-all ${
                    active === s.key
                      ? "active shadow-sm bg-primary text-white"
                      : "text-muted bg-transparent hover-light"
                  }`}
                  onClick={() => setActive(s.key)}
                  type="button"
                >
                  <div className="d-flex align-items-center">
                    <span
                      className="me-3 d-flex align-items-center"
                      style={{ color: active === s.key ? "#fff" : s.color }}
                    >
                      {React.cloneElement(s.icon, { size: 18 })}
                    </span>
                    <span className="fw-bold small text-uppercase ls-1">
                      {s.label}
                    </span>
                  </div>
                  {active === s.key && (
                    <ChevronRight
                      size={14}
                      className="animate__animated animate__fadeInRight"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* QUICK PREVIEW MINI-CARD (PRO UX) */}
          <div className="card border-0 bg-primary bg-opacity-10 rounded-4 p-3 d-none d-lg-block">
            <div className="d-flex align-items-center">
              <div className="p-2 bg-primary rounded-3 text-white me-2">
                <Box size={16} />
              </div>
              <div className="overflow-hidden">
                <h6 className="small fw-bold mb-0 text-truncate text-primary">
                  {formData.name || "Draft Product"}
                </h6>
                <p className="text-xs text-muted mb-0">
                  {formData.sku || "No SKU yet"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DYNAMIC CONTENT AREA */}
      <div className="col-lg-9 mb-5 pb-5">
        <div className="card border-0 shadow-sm rounded-4 h-100 min-vh-75">
          {/* <div className="card-header bg-white border-bottom-0 py-4 px-4">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="fw-bold text-dark mb-1">
                  {sections.find((s) => s.key === active)?.label} Details
                </h4>
                <p className="text-muted small mb-0">
                  Configure your product {active} settings here.
                </p>
              </div>
              <div className="text-end">
                <span className="badge bg-soft-primary text-primary px-3 py-2 rounded-pill fw-bold">
                  STEP {sections.findIndex((s) => s.key === active) + 1} OF{" "}
                  {sections.length}
                </span>
              </div>
            </div>
          </div> */}
          <div className="card-header bg-white border-bottom py-3 px-4 d-flex justify-content-between align-items-center">
            <h5 className="mb-0 fw-bold text-primary">
              {sections.find((s) => s.key === active)?.label} Details
            </h5>
            <div className="text-end">
              <span className="badge bg-soft-primary text-primary px-3 py-2 rounded-pill fw-bold">
                STEP {sections.findIndex((s) => s.key === active) + 1} OF{" "}
                {sections.length}
              </span>
            </div>
          </div>
          <div className="card-body p-4">  {/* mt-0 mb-4 opacity-50 */}
            {/* <hr className="mt-0 mb-4 opacity-50" /> */}
            {/* We wrap renderSection in a div with key to trigger animation on switch */}
            <div
              key={active}
              className="animate__animated animate__fadeInRight animate__faster"
            >
              {renderSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductERPLayout;
