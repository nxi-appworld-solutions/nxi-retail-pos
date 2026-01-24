import React, { useState } from "react";
import {
  Shield,
  Settings,
  CheckCircle,
  AlertTriangle,
} from "react-feather";

const GSTSettings = () => {
  const [settings, setSettings] = useState({
    isCompositionDealer: false,
    enableReverseCharge: false,
    defaultGSTInclusive: false,
    defaultSupplyType: "INTRA",
    roundOffMethod: "AUTO",
    decimalPrecision: 2,
    lockGSTAfterPosting: true,
    allowAdminOverride: false,
  });

  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (name, value) => {
    setDirty(true);
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const saveSettings = async () => {
    setSaving(true);

    // 🔐 API CALL HERE
    console.log("GST SETTINGS SAVE →", settings);

    setTimeout(() => {
      setSaving(false);
      setDirty(false);
      alert("GST Settings saved successfully");
    }, 800);
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <div className="p-2 bg-soft-success rounded-3 me-3 text-success">
              <Settings size={22} />
            </div>
            <div>
              <h4 className="fw-bold mb-0">GST Settings</h4>
              <small className="text-muted">
                Configure system-level GST behavior
              </small>
            </div>
          </div>

          <button
            className="btn btn-success d-flex align-items-center"
            onClick={saveSettings}
            disabled={!dirty || saving}
          >
            <CheckCircle size={16} className="me-2" />
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>

        {/* BUSINESS GST */}
        <div className="card shadow-sm mb-3">
          <div className="card-header bg-white fw-bold">
            Business GST Configuration
          </div>
          <div className="card-body row g-3">
            <div className="col-md-6">
              <div className="p-3 bg-soft-light rounded-3 border">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={settings.isCompositionDealer}
                    onChange={(e) =>
                      handleChange("isCompositionDealer", e.target.checked)
                    }
                  />
                  <label className="form-check-label fw-bold">
                    Composition Dealer
                  </label>
                  <small className="text-muted d-block">
                    Restrict GST slabs as per composition scheme
                  </small>

                  {settings.isCompositionDealer && (
                    <div className="small text-warning mt-1">
                      ⚠ Standard GST slabs will be unavailable
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 bg-soft-light rounded-3 border">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={settings.enableReverseCharge}
                    onChange={(e) =>
                      handleChange("enableReverseCharge", e.target.checked)
                    }
                  />
                  <label className="form-check-label fw-bold">
                    Enable Reverse Charge
                  </label>
                  <small className="text-muted d-block">
                    Tax liability shifts to recipient
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SUPPLY & LOCATION */}
        <div className="card shadow-sm mb-3">
          <div className="card-header bg-white fw-bold">
            Supply & Location Behavior
          </div>
          <div className="card-body row g-3">
            <div className="col-md-6">
              <label className="fw-bold small">Default Supply Type</label>
              <select
                className="form-select shadow-sm"
                value={settings.defaultSupplyType}
                onChange={(e) =>
                  handleChange("defaultSupplyType", e.target.value)
                }
              >
                <option value="INTRA">Intra-State (CGST + SGST)</option>
                <option value="INTER">Inter-State (IGST)</option>
              </select>
            </div>

            <div className="col-md-6">
              <div className="p-3 bg-soft-light rounded-3 border mt-4">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={settings.defaultGSTInclusive}
                    onChange={(e) =>
                      handleChange("defaultGSTInclusive", e.target.checked)
                    }
                  />
                  <label className="form-check-label fw-bold">
                    GST Inclusive Pricing
                  </label>
                  <small className="text-muted d-block">
                    Prices include GST by default
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CALCULATION RULES */}
        <div className="card shadow-sm mb-3">
          <div className="card-header bg-white fw-bold">
            GST Calculation Rules
          </div>
          <div className="card-body">
            <div className="alert alert-light border small mb-3">
              ℹ These rules affect GST calculation during billing & invoicing
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="fw-bold small">Round Off Method</label>
                <select
                  className="form-select shadow-sm"
                  value={settings.roundOffMethod}
                  onChange={(e) =>
                    handleChange("roundOffMethod", e.target.value)
                  }
                >
                  <option value="AUTO">Auto Round</option>
                  <option value="UP">Round Up</option>
                  <option value="DOWN">Round Down</option>
                  <option value="NONE">No Rounding</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="fw-bold small">Decimal Precision</label>
                <input
                  type="number"
                  className="form-control shadow-sm"
                  min={0}
                  max={4}
                  value={settings.decimalPrecision}
                  onChange={(e) =>
                    handleChange(
                      "decimalPrecision",
                      Number(e.target.value),
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECURITY */}
        <div className="card shadow-sm">
          <div className="card-header bg-white fw-bold d-flex align-items-center">
            <Shield size={16} className="me-2 text-danger" />
            Security & Control
          </div>
          <div className="card-body row g-3">
            <div className="col-md-6">
              <div className="p-3 bg-soft-danger rounded-3 border border-danger border-opacity-25">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={settings.lockGSTAfterPosting}
                    onChange={(e) =>
                      handleChange("lockGSTAfterPosting", e.target.checked)
                    }
                  />
                  <label className="form-check-label fw-bold">
                    Lock GST After Posting
                  </label>
                  <small className="text-muted d-block">
                    Prevent GST edits once invoice is saved
                  </small>

                  {settings.lockGSTAfterPosting && (
                    <div className="small text-danger mt-1">
                      🔒 GST values become read-only after posting
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 bg-soft-light rounded-3 border">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={settings.allowAdminOverride}
                    onChange={(e) =>
                      handleChange("allowAdminOverride", e.target.checked)
                    }
                  />
                  <label className="form-check-label fw-bold">
                    Allow Admin Override
                  </label>
                  <small className="text-muted d-block">
                    Admin can override GST in special cases
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOT NOTE */}
        <div className="text-muted small mt-4 d-flex align-items-center">
          <AlertTriangle size={14} className="me-2" />
          Changes apply only to future transactions. Existing invoices remain unchanged.
        </div>
      </div>
    </div>
  );
};

export default GSTSettings;
