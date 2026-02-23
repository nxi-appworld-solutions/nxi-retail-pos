import React from "react";
import {
  Shield,
  CreditCard,
  Sliders,
  Lock,
} from "react-feather";

const CustomerConfiguration = ({
  formData,
  handleChange,
  role = "ADMIN", // ADMIN | MANAGER | CASHIER
}) => {

  /* ---------- ROLE GUARD ---------- */
  if (role === "CASHIER") {
    return (
      <div className="alert alert-warning">
        You do not have permission to modify customer configuration.
      </div>
    );
  }

  /* ---------- SAFE UPDATE (CONFIG ONLY) ---------- */
  const updateConfig = (key, value) => {
    handleChange({
      target: {
        name: "config",
        value: {
          ...formData.config,
          [key]: value,
        },
      },
    });
  };

  return (
    <div className="row g-4 animate__animated animate__fadeIn">

      {/* ================= TAX & COMPLIANCE ================= */}
      <ConfigCard
        title="Tax & Compliance"
        icon={<Shield size={18} />}
        description="GST applicability and compliance controls"
      >
        <Toggle
          label="Apply GST on Billing"
          value={formData.isGSTEnabled}
          onChange={(v) =>
            handleChange({
              target: { name: "isGSTEnabled", value: v },
            })
          }
        />

        <small className="text-muted">
          GST applies only if customer is registered and GSTIN exists
        </small>
      </ConfigCard>

      {/* ================= CREDIT RULES ================= */}
      <ConfigCard
        title="Credit Rules"
        icon={<CreditCard size={18} />}
        description="Controls whether credit sales are allowed"
      >
        <Toggle
          label="Allow Credit Sales"
          value={formData.config.allowCredit}
          onChange={(v) => updateConfig("allowCredit", v)}
        />

        {formData.config.allowCredit && (
          <Toggle
            label="Strict Credit Stop (Block Billing on Overdue)"
            value={formData.config.strictCreditStop}
            onChange={(v) => updateConfig("strictCreditStop", v)}
          />
        )}
      </ConfigCard>

      {/* ================= BILLING RULES ================= */}
      <ConfigCard
        title="Billing Rules"
        icon={<Sliders size={18} />}
        description="Default billing and payment behavior"
      >
        <RadioGroup
          label="Default Payment Mode"
          value={formData.config.defaultPaymentMode}
          options={[
            { value: "CASH", label: "Cash" },
            { value: "UPI", label: "UPI" },
            { value: "CREDIT", label: "Credit" },
          ]}
          onChange={(v) => updateConfig("defaultPaymentMode", v)}
        />

        <Toggle
          label="Allow Partial Payment"
          value={formData.config.allowPartialPayment}
          onChange={(v) => updateConfig("allowPartialPayment", v)}
        />

        <Toggle
          label="Allow Discount"
          value={formData.config.allowDiscount}
          onChange={(v) => updateConfig("allowDiscount", v)}
        />

        {formData.config.allowDiscount && (
          <Input
            label="Max Discount (%)"
            value={formData.config.maxDiscountPercent}
            onChange={(v) =>
              updateConfig("maxDiscountPercent", Number(v) || 0)
            }
          />
        )}
      </ConfigCard>

      {/* ================= CUSTOMER CONTROLS ================= */}
      <ConfigCard
        title="Customer Controls"
        icon={<Lock size={18} />}
        description="Customer level billing restrictions"
      >
        <Toggle
          label="Block Customer (Disable Billing)"
          value={formData.config.isBlocked}
          onChange={(v) => {
            if (
              v &&
              !window.confirm(
                "Blocking customer will disable billing. Continue?"
              )
            ) {
              return;
            }
            updateConfig("isBlocked", v);
          }}
        />
      </ConfigCard>
    </div>
  );
};

export default CustomerConfiguration;

/* ================= UI HELPERS ================= */

const ConfigCard = ({ title, icon, description, children }) => (
  <div className="col-md-6">
    <div className="p-4 border border-dashed rounded-4 bg-white shadow-sm h-100">
      <label className="form-label fw-bold small d-flex align-items-center text-secondary mb-1">
        {icon} <span className="ms-2">{title}</span>
      </label>
      <p className="text-muted small mb-3">{description}</p>
      {children}
    </div>
  </div>
);

const Toggle = ({ label, value, onChange }) => (
  <div className="form-check form-switch mb-2">
    <input
      className="form-check-input"
      type="checkbox"
      checked={!!value}
      onChange={(e) => onChange(e.target.checked)}
    />
    <label className="form-check-label">{label}</label>
  </div>
);

const Input = ({ label, value, onChange, placeholder }) => (
  <div className="mt-2">
    <label className="text-muted small mb-1">{label}</label>
    <input
      className="form-control bg-light border-0"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const RadioGroup = ({ label, options, value, onChange }) => (
  <div className="mb-2">
    <label className="text-muted small d-block mb-1">{label}</label>
    {options.map((o) => (
      <div key={o.value} className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          checked={value === o.value}
          onChange={() => onChange(o.value)}
        />
        <label className="form-check-label">{o.label}</label>
      </div>
    ))}
  </div>
);
