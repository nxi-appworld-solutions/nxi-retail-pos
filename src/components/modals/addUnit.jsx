import { useState, useEffect, useRef } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { API_URL } from "../../environment";
import { toast } from "react-toastify";
import { PlusCircle, X } from "feather-icons-react/build/IconComponents";
import Loader from "../loader/loader";

const initialFormState = {
  name: "",
  printName: "",
  isActive: true,
  masterType: 8,
  users: "admin",
};

const AddUnit = ({ selectedRecord, onSuccess, show, handleClose }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const isEditMode = Boolean(selectedRecord);

  useEffect(() => {
    if (isEditMode && selectedRecord) {
      fetchProductDetails(selectedRecord?.id);
    } else {
      setFormData(initialFormState);
    }
  }, [isEditMode, selectedRecord]);

  const fetchProductDetails = async (code) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/GetMasterDetails/8?code=${code}`);
      const result = await res.json();
      console.log("data", result);
      const data = result?.data[0];

      if (!data) {
        toast.error("No data found for the selected unit.");
      } else {
        console.log("Fetched data for edit mode:", result);
      }
      const formatted = {
        ...initialFormState,
        name: data?.name || "",
        printName: data?.printName || "",
        isActive: data?.isActive,
        masterType: data?.masterType || 5,
        users: data?.users || "admin",
      };

      setFormData(formatted);
    } catch (error) {
      toast.error("Failed to fetch product details.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    try {
      const fd = new FormData();
      fd.append("Name", formData.name);
      fd.append("PrintName", formData.printName);
      fd.append("DeactiveMaster", formData.isActive ? false : true);
      fd.append("MasterType", 8);
      fd.append("Users", "admin");
      fd.append("Images", []);
      if (isEditMode) fd.append("Code", selectedRecord?.id);

      // console.log("Submitting form data:", Object.fromEntries(fd.entries()));
      const res = await fetch(`${API_URL}/SaveMasterDetailRequest`, {
        method: "POST",
        body: fd,
      });

      const result = await res.json();
      if (result.status === 1) {
        toast.success(isEditMode ? "Unit updated" : "Unit added");
        handleReset();
        onSuccess();
        handleClose();
      } else {
        toast.error(result.msg || "Operation failed");
      }
    } catch {
      toast.error("Server error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ name: "", printName: "", status: true });
  };

  return (
    <>
      {isLoading && <Loader />}
      <Modal
        show={show}
        onHide={() => {
          handleReset();
          handleClose();
        }}
        centered
      >
        <Form onSubmit={handleSubmit}>
          <Modal.Header>
            <Modal.Title>{isEditMode ? "Edit Unit" : "Add Unit"}</Modal.Title>
            <button
              type="button"
              className="modal-close-button"
              aria-label="Close"
              onClick={handleClose}
            >
              <X size={12} />
            </button>
          </Modal.Header>

          <Modal.Body>
            {/* Unit */}
            <Form.Group className="mb-3">
              <Form.Label>
                Unit<span className="text-danger ms-1">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Print Name */}
            <Form.Group className="mb-3">
              <Form.Label>
                Print Name<span className="text-danger ms-1">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="printName"
                value={formData.printName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Status */}
            <Form.Group className="d-flex justify-content-between align-items-center">
              <Form.Label className="mb-0">
                Status<span className="text-danger ms-1">*</span>
              </Form.Label>
              <Form.Check
                type="switch"
                id="statusToggle"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer className="d-flex justify-content-end gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                handleReset();
                handleClose();
              }}
            >
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

export default AddUnit;
