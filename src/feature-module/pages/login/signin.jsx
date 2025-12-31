import React, { useState } from "react";
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
    } finally {
      setLoading(false);
    }
  };

  return (
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
      <ToastContainer />
    </div>
  );
};

export default Signin;
