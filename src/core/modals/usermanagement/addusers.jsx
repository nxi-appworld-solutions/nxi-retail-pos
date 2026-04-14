import CommonSelect from "../../../components/select/common-select";
import { useState } from "react";
import { Link } from "react-router-dom";
import BaseModal from "../../common/modal/baseModal";
import useForm from "../../hooks/useForm";
import { userFormSchema } from "../../forms/formSchemas";

const AddUsers = () => {
  const { form, handleChange, setField } = useForm(userFormSchema);

  const status = [
    { value: "Choose", label: "Choose" },
    { value: "Manager", label: "Manager" },
    { value: "Admin", label: "Admin" },
  ];

  const [showPassword, setShowPassword] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const [showConfirmPassword, setConfirmPassword] = useState(false);
  const handleToggleConfirmPassword = () => {
    setConfirmPassword((prevShowPassword) => !prevShowPassword);
  };

  console.log("Form State:", form);

  return (
    <BaseModal
      title="Add User"
      footer={
        <button
          type="submit"
          form="userForm"
          className="btn btn-primary fs-13 fw-medium p-2 px-3"
        >
          Save
        </button>
      }
    >
      <div className="custom-modal-body">
        <form id="userForm">
          <div className="row">
            <div className="col-lg-12">
              <div className="new-employee-field">
                <span>Avatar</span>
                <div className="profile-pic-upload mb-2">
                  <div className="profile-pic">
                    <span>
                      <i className="feather icon-plus-circle plus-down-add" />
                      Profile Photo
                    </span>
                  </div>
                  <div className="input-blocks mb-0">
                    <div className="image-upload mb-0">
                      <input
                        type="file"
                        name="avatar"
                        accept="/image"
                        onChange={(e) => setField("avatar", e.target.files[0])}
                      />
                      <div className="image-uploads">
                        <h4>Change Image</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="input-blocks">
                <label>User Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="input-blocks">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="input-blocks">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="input-blocks">
                <label>Role</label>

                <CommonSelect
                  className="w-100"
                  options={status}
                  value={form.role}
                  onChange={(e) => setField("role", e.value)}
                  placeholder="Choose"
                  filter={false}
                  required
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="input-blocks">
                <label>Password</label>
                <div className="pass-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="pass-input form-control"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />

                  <span
                    className={`ti toggle-password text-gray-9 ${showPassword ? "ti-eye" : "ti-eye-off"}`}
                    onClick={handleTogglePassword}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="input-blocks">
                <label>Confirm Passworrd</label>
                <div className="pass-group">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="pass-input form-control"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />

                  <span
                    className={`ti toggle-password  ${showConfirmPassword ? "ti-eye" : "ti-eye-off"}`}
                    onClick={handleToggleConfirmPassword}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="mb-0 input-blocks">
                <label className="form-label">Descriptions</label>
                <textarea
                  className="form-control mb-1"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                />

                <p>Maximum 600 Characters</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </BaseModal>
  );
};

export default AddUsers;
