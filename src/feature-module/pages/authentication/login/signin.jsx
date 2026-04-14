import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import ImageWithBasePath from "../../../core/img/imagewithbasebath";
// import { login } from "../../../services/service";
// import { toast, ToastContainer } from "react-toastify";
import "./pos-signin.css";
import { Link } from "react-router-dom";
import { all_routes } from "../../../../routes/all_routes";

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

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login attempt with:", { username, mode, pin, password });

    navigate(route.newdashboard);
    return;
    // if (!username) {
    //   toast.error("Enter username");
    //   return;
    // }

    // if (mode === "PIN" && pin.length !== 4) {
    //   toast.error("Enter 4 digit PIN");
    //   return;
    // }

    // if (mode === "PASSWORD" && !password) {
    //   toast.error("Enter password");
    //   return;
    // }

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
      // toast.error("Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pos-login-page">
      {/* LEFT BRAND PANEL */}
      <div className="pos-left">
        <div className="pos-left-top">
          <div className="pos-brand">
            <img
              src="https://tiimg.tistatic.com/co_logo/7657505/logical-learning-india-pvt-ltd-v1.jpg"
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
        <form onSubmit={handleLogin}>
          <div className="pos-login-card">
            <h3>
              {mode === "PIN" ? "Cashier Login" : "Admin / Manager Login"}
            </h3>

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
                    type="submit"
                    className="btn btn-primary key-enter "
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
                  type="submit"
                  className="pos-primary-btn btn btn-primary"
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
        </form>
        <div className="pos-footer">
          © 2025 NXI POS · Commercial Retail System
        </div>
      </div>

      {/* <ToastContainer /> */}
    </div>
  );
};

export default Signin;
