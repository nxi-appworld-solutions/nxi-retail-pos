import React, { useState } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  RefreshCw,
  Shield,
} from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FirstTimeCredentialSetup = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const loginType = state?.loginType || "PIN"; // "PIN" | "PASSWORD"
  const userName = state?.userName || "User";

  const [value, setValue] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* SAFETY GUARD */
  if (!loginType) {
    toast.error("Invalid onboarding flow");
    navigate("/login");
    return null;
  }

  /* PIN KEYPAD */
  const pressKey = (v) => {
    if (value.length < 4) setValue((p) => p + v);
  };
  const clearPin = () => setValue("");

  /* VALIDATION */
  const validate = () => {
    if (loginType === "PIN") {
      if (value.length !== 4) return "PIN must be 4 digits";
      if (value !== confirm) return "PINs do not match";
    } else {
      if (value.length < 6) return "Password must be at least 6 characters";
      if (value !== confirm) return "Passwords do not match";
    }
    return "";
  };

  const strength =
    loginType === "PASSWORD"
      ? value.length >= 8
        ? "Strong"
        : value.length >= 6
          ? "Medium"
          : value
            ? "Weak"
            : ""
      : "";

  /* SUBMIT */
  const submit = async () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    setError("");
    setLoading(true);

    try {
      // TODO: API CALL
      // await setCredential({ value, loginType });

      await new Promise((r) => setTimeout(r, 1200));
      navigate("/dashboard");
    } catch {
      setError("Unable to complete setup. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="card border-0 shadow-lg"
        style={{ width: 420, borderRadius: 14 }}
      >
        {/* HEADER */}
        <div className="card-header bg-white border-0 text-center pt-4">
          <div className="mx-auto mb-3 p-3 bg-soft-primary rounded-md text-primary" >
            <Shield size={28} />
          </div>
          <h4 className="fw-bold mb-1">Welcome, {userName}</h4>
          <p className="text-muted mb-0">
            {loginType === "PIN"
              ? "Set your PIN to start billing"
              : "Create your password to continue"}
          </p>
        </div>

        {/* BODY */}
        <div className="card-body px-4 py-4">
          {/* PIN MODE */}
          {loginType === "PIN" && (
            <>
              <div className="text-center mb-3">
                <div className="fs-4 letter-spacing">
                  {"●".repeat(value.length).padEnd(4, "○")}
                </div>
              </div>

              <div className="row g-2 mb-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <div key={n} className="col-4">
                    <button
                      className="btn btn-light w-100 py-2"
                      onClick={() => pressKey(n)}
                    >
                      {n}
                    </button>
                  </div>
                ))}
                <div className="col-4">
                  <button
                    className="btn btn-danger-subtle w-100 py-2"
                    onClick={clearPin}
                  >
                    C
                  </button>
                </div>
                <div className="col-4">
                  <button
                    className="btn btn-light w-100 py-2"
                    onClick={() => pressKey(0)}
                  >
                    0
                  </button>
                </div>
              </div>

              <input
                type="password"
                className="form-control shadow-sm mb-2"
                placeholder="Confirm PIN"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </>
          )}

          {/* PASSWORD MODE */}
          {loginType === "PASSWORD" && (
            <>
              <label className="form-label small fw-bold">New Password</label>
              <div className="input-group shadow-sm mb-2">
                <span className="input-group-text bg-light">
                  <Lock size={14} />
                </span>
                <input
                  type={show ? "text" : "password"}
                  className="form-control"
                  placeholder="Create a secure password"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  autoFocus
                />
                <button
                  className="btn btn-light"
                  onClick={() => setShow((s) => !s)}
                  type="button"
                >
                  {show ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>

              <ul className="small text-muted mb-2 ps-3">
                <li>Minimum 6 characters</li>
                <li>Avoid common passwords</li>
              </ul>

              {strength && (
                <div className="small mb-2">
                  Strength:{" "}
                  <b
                    className={
                      strength === "Strong"
                        ? "text-success"
                        : strength === "Medium"
                          ? "text-warning"
                          : "text-danger"
                    }
                  >
                    {strength}
                  </b>
                </div>
              )}

              <input
                type="password"
                className="form-control shadow-sm mb-2"
                placeholder="Confirm password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </>
          )}

          {error && <div className="small text-danger mt-1">{error}</div>}

          <div className="mt-3 p-2 bg-soft-info rounded-3 small text-muted">
            This credential is private and required for future system access.
          </div>
        </div>

        {/* FOOTER */}
        <div className="card-footer bg-white border-0 px-4 pb-4">
          <button
            className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
            onClick={submit}
            disabled={loading}
          >
            {loading ? (
              <RefreshCw size={18} className="me-2 animate-spin" />
            ) : (
              <CheckCircle size={18} className="me-2" />
            )}
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default FirstTimeCredentialSetup;
