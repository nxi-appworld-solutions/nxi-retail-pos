import React, { useState } from "react";
<<<<<<< HEAD
import ImageWithBasePath from "../../../core/img/imagewithbasebath";
import { Link, useNavigate } from "react-router-dom";
import { all_routes } from "../../../Router/all_routes";
import useForm from "../../../hooks/useForm";
import { initialSignInState } from "../../../constants/form";
import { login } from "../../../services/service";
import { toast, ToastContainer } from "react-toastify";

const Signin = () => {
  const route = all_routes;
  const navigate = useNavigate();
  const { formData, handleChange, resetForm } = useForm(initialSignInState);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login(formData?.username, formData?.password);
      // console.log("LOGIN RESPONSE:", response);

      if (response.status === 0) {
        const message = response?.msg || "Invalid username or password";
        toast.error(message);
        return;
      }
      // ✅ Save tokens in localStorage
      sessionStorage.setItem("token", response.token);
      sessionStorage.setItem("refreshToken", response.refreshToken);

      // ✅ Navigate on success
      navigate(route.newdashboard);
    } catch (ex) {
      toast.error(`API error: ${ex.message || ex.msg}`);
=======
import { useNavigate } from "react-router-dom";
import ImageWithBasePath from "../../../core/img/imagewithbasebath";
import { login } from "../../../services/service";
import { all_routes } from "../../../Router/all_routes";
import { toast, ToastContainer } from "react-toastify";
import "./pos-signin.css";

const Signin = () => {
  const navigate = useNavigate();
  const route = all_routes;

  const [username, setUsername] = useState("rajaisexcellent@gmail.com");
  const [pin, setPin] = useState("");
  const [password, setPassword] = useState("rajasingh");
  const [mode, setMode] = useState("PIN");
  const [loading, setLoading] = useState(false);

  /* PIN keypad logic */
  const pressKey = (v) => {
    if (pin.length < 4) setPin((p) => p + v);
  };

  const clearPin = () => setPin("");

  const handleLogin = async () => {
    if (!username) {
      toast.error("Enter username");
      return;
    }

    if (mode === "PIN" && pin.length !== 4) {
      toast.error("Enter 4 digit PIN");
      return;
    }

    if (mode === "PASSWORD" && !password) {
      toast.error("Enter password");
      return;
    }

    setLoading(true);

    try {
      const res = await login({
        username,
        loginType: mode,
        pin: mode === "PIN" ? pin : null,
        password: mode === "PASSWORD" ? password : null,
      });

      if (res.status === 0) {
        toast.error(res.msg || "Invalid credentials");
        return;
      }

      sessionStorage.setItem("token", res.token);
      sessionStorage.setItem("refreshToken", res.refreshToken);

      if (mode === "PASSWORD" && res.isFirstLogin) {
        navigate(route.setPassword);
        return;
      }

      navigate(route.newdashboard);
    } catch {
      toast.error("Login failed. Try again.");
>>>>>>> 1c9ca8c (again post)
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <div className="signin-wrapper">
      <div className="signin-box animate-entry">
        <div className="signin-header fade-in delay-1">
          <ImageWithBasePath
            src="assets/img/logo.png"
            alt="Logo"
            className="signin-logo"
          />
          <h2>Welcome Back</h2>
          <p>Login to continue managing your orders.</p>
        </div>

        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="form-group float-label delay-2">
            <input
              type="input"
              className="form-control"
              name="username"
              value={formData.username}
              onChange={(e) => handleChange("username", e.target.value)}
              placeholder=""
              required
            />
            <label>Username</label>
          </div>

          <div className="form-group float-label delay-3">
            <div className="password-wrapper">
              <input
                type={isPasswordVisible ? "text" : "password"}
                className="form-control"
                name="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                defaultValue={"password123"}
                placeholder=""
                required
              />
              <label>Password</label>
              <span
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          <div className="form-options delay-4">
            <label className="checkbox">
              <input type="checkbox" /> Remember me
            </label>
            <button
              type="button"
              className="forgot-link border-0 bg-transparent"
              onClick={() => navigate(route.error404)}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="signin-button btn-submit border-0 delay-5"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="signin-footer fade-in delay-6">
          <p>© 2025 NXI. Future-ready experience.</p>
        </div>
      </div>
=======
    <div className="pos-login-page">
      {/* LEFT BRAND PANEL */}
      <div className="pos-left">
        <div className="pos-left-top">
          <div className="pos-brand">
            <ImageWithBasePath
              src="assets/img/logo.png"
              alt="NXI POS"
              className="pos-brand-logo"
            />
            <span className="pos-brand-text">NXI POS</span>
          </div>

          <div className="pos-divider" />

          <p className="pos-brand-sub">
            Secure retail billing terminal <br />
            Built for speed, accuracy & control
          </p>

          <ul className="pos-points">
            <li>Fast cashier login</li>
            <li>Manager approval controls</li>
            <li>Reliable day-long operation</li>
          </ul>
        </div>
      </div>

      {/* RIGHT LOGIN PANEL */}
      <div className="pos-right">
        <div className="pos-login-card">
          <h3>{mode === "PIN" ? "Cashier Login" : "Admin / Manager Login"}</h3>

          <p className="pos-subtitle">
            {mode === "PIN"
              ? "Enter PIN to start billing"
              : "Password required for system access"}
          </p>

          {/* USERNAME */}
          <input
            className="pos-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="pos-helper-text">
            First time login? Enter your username to continue.
          </div>
          {/* PIN MODE */}
          {mode === "PIN" && (
            <>
              <div className="pos-pin-dots">
                {"●".repeat(pin.length).padEnd(4, "○")}
              </div>

              <div className="pos-keypad">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <button key={n} onClick={() => pressKey(n)}>
                    {n}
                  </button>
                ))}
                <button className="key-clear" onClick={clearPin}>
                  C
                </button>
                <button onClick={() => pressKey(0)}>0</button>
                <button
                  className="btn btn-primary key-enter"
                  onClick={handleLogin}
                  disabled={loading}
                >
                  ✔
                </button>
              </div>
            </>
          )}

          {/* PASSWORD MODE */}
          {mode === "PASSWORD" && (
            <>
              <input
                type="password"
                className="pos-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                className="pos-primary-btn btn btn-primary"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? "Signing in..." : "Login"}
              </button>
            </>
          )}

          {/* MODE SWITCH */}
          <div className="pos-switch">
            {mode === "PIN" ? (
              <button
                type="button"
                className="pos-ghost-btn"
                onClick={() => setMode("PASSWORD")}
              >
                Manager / Admin Login
              </button>
            ) : (
              <button
                type="button"
                className="pos-ghost-btn back"
                onClick={() => setMode("PIN")}
              >
                ← Back to PIN Login
              </button>
            )}
          </div>
        </div>

        <div className="pos-footer">
          © 2025 NXI POS · Commercial Retail System
        </div>
      </div>

>>>>>>> 1c9ca8c (again post)
      <ToastContainer />
    </div>
  );
};

export default Signin;
