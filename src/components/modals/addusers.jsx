/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { PlusCircle, X } from "feather-icons-react/build/IconComponents";
import Select from "react-select";
import { ROLE_OPT } from "../../constants";
import { API_URL } from "../../environment";

const Loader = () => (
  <div className="text-center py-3">
    <Spinner animation="border" />
  </div>
);

const initialfield = {
  code: 0,
  name: "",
  mobile: "",
  email: "",
  username: "",
  pwd: "",
  role: null,
  userType: 1,
  remark: "",
  base64: "",
  status: true,
  users: "admin",
};

const AddUsers = ({ record, onSubmitSuccess, showModal, onClose }) => {
  const [formData, setFormData] = useState(initialfield);
  const [passwords, setPasswords] = useState({
    password: "",
    confirm: "",
    error: "",
  });
  const [showPwd, setShowPwd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isEditMode = Boolean(record);

  useEffect(() => {
    if (showModal) {
      if (isEditMode && record?.code) {
        GetUserById(record?.code);
      } else {
        resetForm();
      }
    }
  }, [showModal, record, isEditMode]);

  const resetForm = () => {
    setFormData(initialfield);
    setPasswords({ password: "", confirm: "", error: "" });
    setShowPwd(false);
  };

  const GetUserById = async (userId) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/GetUserMasterDetails/users?code=${userId}`
      );
      const result = await res.json();
      const data = result.data;
      // console.log("data", data);

      if (data) {
        const matchedRole = ROLE_OPT?.find(
          (opt) => opt.value === data[0].role || opt.value === data[0].roleId
        );
        setFormData({
          code: data[0].code || data[0].userId,
          name: data[0].name || data[0].username,
          mobile: data[0].mobile || data[0].mobileNo,
          email: data[0].email || data[0].emailId,
          username: data[0].username,
          pwd: data[0].pwd,
          role: matchedRole,
          remark: data[0].remark || data[0].desc || "",
          base64: data[0].base64 || data[0].image || "",
          status: data[0].status ?? (data[0].active === 2 ? false : true),
          userType: 1,
          users: "admin",
        });

        setPasswords({
          password: data[0].pwd || "",
          confirm: data[0].pwd || "",
          error: "",
        });
      }
    } catch (err) {
      toast.error("Error loading user: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (selected) => {
    setFormData((prev) => ({ ...prev, role: selected }));
  };

  const validatePasswords = () => {
    if (passwords.password !== passwords.confirm) {
      setPasswords((prev) => ({ ...prev, error: "Passwords do not match" }));
      return false;
    }

    if (passwords.password.length < 6) {
      setPasswords((prev) => ({
        ...prev,
        error: "Password must be at least 6 characters long",
      }));
      return false;
    }

    setPasswords((prev) => ({ ...prev, error: "" }));
    return true;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, base64: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleImageRemove = () => {
    setFormData((prev) => ({ ...prev, base64: "" }));
    const fileInput = document.getElementById("upload-avatar");
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswords()) return;

    const requiredFields = [
      { key: "name", label: "Name" },
      { key: "mobile", label: "Mobile number" },
      { key: "email", label: "Email" },
      { key: "username", label: "Username" },
    ];

    for (let field of requiredFields) {
      if (!formData[field.key]?.trim()) {
        toast.error(`${field.label} is required`);
        return;
      }
    }

    console.log("formData", formData);
    setIsLoading(true);

    try {
      const submitData = {
        ...formData,
        role: formData.role?.value || 0,
        pwd: passwords.password,
        code: isEditMode ? record.code : 0,
      };

      console.log("submitData", submitData);

      const response = await fetch(`${API_URL}/SaveUserMasterDetails/users`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      console.log("response", response);

      const result = await response.json();
      if (result.status === 1) {
        toast.success(result.msg);
        resetForm();
        onSubmitSuccess();
        onClose();
      } else {
        toast.error(result.msg || "Failed to save user");
      }
    } catch (err) {
      toast.error("Error: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Modal
        show={showModal}
        onHide={onClose}
        size="lg"
        centered
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>{isEditMode ? "Edit User" : "Add User"}</Modal.Title>
          <button
            type="button"
            className="modal-close-button"
            aria-label="Close"
            onClick={onClose}
          >
            <X size={12} />
          </button>
        </Modal.Header>

        {isLoading && <Loader />}
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="mb-3 text-center">
              <Col>
                {formData.base64 ? (
                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <img
                      src={formData.base64}
                      alt="Avatar"
                      className="rounded-circle"
                      style={{ width: 100, height: 100, objectFit: "cover" }}
                    />
                    <Button
                      variant="danger"
                      className="small-remove-btn"
                      onClick={handleImageRemove}
                    >
                      <X size={14} />
                    </Button>
                  </div>
                ) : (
                  <Form.Label
                    htmlFor="upload-avatar"
                    className="btn btn-outline-primary"
                  >
                    <PlusCircle className="me-2" /> Upload Avatar
                  </Form.Label>
                )}
                <Form.Control
                  id="upload-avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile"
                    className="form-control"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    className="form-control"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPwd ? "text" : "password"}
                      name="password"
                      className="form-control"
                      value={passwords.password}
                      onChange={handlePasswordChange}
                      required
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowPwd(!showPwd)}
                    >
                      {showPwd ? "Hide" : "Show"}
                    </Button>
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPwd ? "text" : "password"}
                      name="confirm"
                      className="form-control"
                      value={passwords.confirm}
                      onChange={handlePasswordChange}
                      isInvalid={!!passwords.error}
                      required
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowPwd(!showPwd)}
                    >
                      {showPwd ? "Hide" : "Show"}
                    </Button>
                  </InputGroup>
                  <Form.Control.Feedback type="invalid">
                    {passwords.error}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Select
                    options={ROLE_OPT}
                    value={formData?.role}
                    onChange={handleRoleSelect}
                    placeholder="Choose Role"
                    isSearchable
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="remark"
                    value={formData.remark}
                    onChange={handleChange}
                    rows={3}
                  />
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group className="d-flex justify-content-between align-items-center">
                  <Form.Label className="mb-0">Status</Form.Label>
                  <Form.Check
                    type="switch"
                    id="statusToggle"
                    name="status"
                    checked={formData.status}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  {isEditMode ? "Updating..." : "Adding..."}
                </>
              ) : isEditMode ? (
                "Update"
              ) : (
                "Add"
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddUsers;
