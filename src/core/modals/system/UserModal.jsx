import React from "react";
import {
  X,
  User,
  Shield,
  Key,
  Phone,
  Mail,
  CheckCircle,
  RefreshCw,
} from "react-feather";
import useModal from "../useModal";

const UserModal = () => {
  const { close, payload } = useModal();
  const { mode = "ADD", record } = payload || {};

  const [loading, setLoading] = React.useState(false);

  const [formData, setFormData] = React.useState({
    fullName: record?.fullName || "",
    username: record?.username || "",
    mobile: record?.mobile || "",
    email: record?.email || "",
    role: record?.role || "Cashier",
    loginType: record?.loginType || "PIN",
    status: record?.status || "Active",
    branchAccess: record?.branchAccess || "All",
    isFirstLogin: mode === "ADD" ? true : record?.isFirstLogin ?? false,
  });

  /* ROLE → LOGIN TYPE AUTO CONTROL */
  React.useEffect(() => {
    if (formData.role === "Cashier") {
      setFormData((p) => ({ ...p, loginType: "PIN" }));
    } else {
      setFormData((p) => ({ ...p, loginType: "PASSWORD" }));
    }
  }, [formData.role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async () => {
    if (!formData.fullName || !formData.username) {
      alert("Full name and username are required");
      return;
    }

    setLoading(true);

    /* 🔐 SEND ONLY SAFE DATA TO BACKEND */
    const payloadToSend = {
      ...formData,
      pin: null,          // PIN set on first login
      password: null,     // Password set on first login
    };

    // TODO: Replace with API call
    setTimeout(() => {
      setLoading(false);
      close();
    }, 900);
  };

  return (
    <div className="modal-content border-0 rounded-3 shadow-2xl overflow-hidden">
      {/* HEADER */}
      <div className="modal-header bg-white px-4 py-3 border-bottom d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <div className="p-2 bg-soft-primary rounded-3 me-3 text-primary">
            <User size={22} />
          </div>
          <div>
            <h5 className="fw-bold mb-0">
              {mode === "ADD" ? "Create POS User" : "Edit POS User"}
            </h5>
            <p className="text-muted small mb-0">
              Manage staff access & authentication
            </p>
          </div>
        </div>
        <button className="btn btn-light rounded-circle p-2" onClick={close}>
          <X size={18} />
        </button>
      </div>

      {/* BODY */}
      <div className="modal-body px-4 py-4 bg-white">
        {/* BASIC DETAILS */}
        <h6 className="fw-bold mb-3">Basic Details</h6>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label small fw-bold">
              Full Name <span className="text-danger">*</span>
            </label>
            <input
              name="fullName"
              className="form-control shadow-sm"
              placeholder="e.g. Rahul Sharma"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-bold">
              Username <span className="text-danger">*</span>
            </label>
            <input
              name="username"
              className="form-control shadow-sm"
              placeholder="Used for POS login"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-bold">Mobile Number</label>
            <div className="input-group shadow-sm">
              <span className="input-group-text bg-light">
                <Phone size={14} />
              </span>
              <input
                name="mobile"
                className="form-control"
                placeholder="10 digit mobile number"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>
            <small className="text-muted">
              Optional – used for contact & recovery
            </small>
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-bold">Email</label>
            <div className="input-group shadow-sm">
              <span className="input-group-text bg-light">
                <Mail size={14} />
              </span>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Optional (password recovery)"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* ROLE */}
        <div className="mt-4">
          <h6 className="fw-bold mb-2">User Role</h6>
          <select
            name="role"
            className="form-select shadow-sm"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="Cashier">Cashier</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
          <small className="text-muted">
            Role defines access level inside POS
          </small>
        </div>

        {/* LOGIN METHOD (READ ONLY – AUTO CONTROLLED) */}
        <div className="mt-4 p-3 bg-soft-info rounded-3 border border-info border-opacity-10">
          <div className="d-flex align-items-center mb-2">
            <Key size={18} className="text-info me-2" />
            <h6 className="fw-bold mb-0">Login Method</h6>
          </div>

          <input
            className="form-control shadow-sm"
            disabled
            value={
              formData.loginType === "PIN"
                ? "4 Digit PIN (Cashier Fast Login)"
                : "Password Login (Manager / Admin)"
            }
          />

          <small className="text-muted d-block mt-1">
            {formData.loginType === "PIN"
              ? "PIN will be set by user on first login"
              : "Password will be set on first login"}
          </small>
        </div>

        {/* STATUS */}
        <div className="mt-4 p-3 bg-soft-warning rounded-3 border border-warning border-opacity-10 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Shield size={18} className="text-warning me-2" />
            <div>
              <h6 className="mb-0 fw-bold small">User Status</h6>
              <small className="text-muted">
                Inactive users cannot login to POS
              </small>
            </div>
          </div>

          <div className="form-check form-switch m-0">
            <input
              type="checkbox"
              className="form-check-input"
              checked={formData.status === "Active"}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  status: e.target.checked ? "Active" : "Inactive",
                }))
              }
            />
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="modal-footer bg-light px-4 py-3">
        <button className="btn btn-outline-secondary" onClick={close}>
          Cancel
        </button>
        <button
          className="btn btn-primary ms-2 d-flex align-items-center"
          onClick={onSubmit}
          disabled={loading}
        >
          {loading ? (
            <RefreshCw size={18} className="me-2 animate-spin" />
          ) : (
            <CheckCircle size={18} className="me-2" />
          )}
          Save User
        </button>
      </div>
    </div>
  );
};

export default UserModal;
