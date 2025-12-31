import { useState, useEffect, useRef } from "react";
import { Modal, Button, Form, Spinner, Col, Row } from "react-bootstrap";
import { API_URL } from "../../environment";
import { toast } from "react-toastify";
import { PlusCircle, X } from "feather-icons-react/build/IconComponents";
import { loadImagesFromServer } from "../../utils/common";
import Loader from "../loader/loader";

const initialFormData = {
  name: "",
  printName: "",
  isActive: true,
  masterType: 5,
  users: "admin",
};

const AddCategory = ({ selectedRecord, onSuccess, show, handleClose }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState(null);
  const fileInputRef = useRef(null);
  const isEditMode = Boolean(selectedRecord);

  useEffect(() => {
    if (isEditMode && selectedRecord) {
      fetchProductDetails(selectedRecord?.id);
    } else {
      setFormData(initialFormData);
      setImages(null);
    }
  }, [isEditMode, selectedRecord]);

  const fetchProductDetails = async (code) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/GetMasterDetails/5?code=${code}`);
      const result = await res.json();
      console.log("data", result);
      const data = result?.data[0];

      if (!data) {
        toast.error("No data found for the selected category.");
      } else {
        console.log("Fetched data for edit mode:", result);
      }
      const formatted = {
        ...initialFormData,
        name: data?.name || "",
        printName: data?.printName || "",
        isActive: data?.isActive,
        masterType: data?.masterType || 5,
        users: data?.users || "admin",
      };

      setFormData(formatted);
      const imagesFromServer = await loadImagesFromServer(
        data?.imageList || [],
        { cacheBust: true }
      );
      setImages(imagesFromServer[0] || null);
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImages(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    try {
      const fd = new FormData();
      fd.append("Name", formData.name);
      fd.append("PrintName", formData.printName);
      fd.append("DeactiveMaster", formData.isActive ? false : true); // 0 for active, 1 for inactive
      fd.append("MasterType", 5);
      fd.append("Users", "admin");
      if (images) fd.append("Images", images);
      if (isEditMode) fd.append("Code", selectedRecord.id);

      const res = await fetch(`${API_URL}/SaveMasterDetailRequest`, {
        method: "POST",
        body: fd,
      });

      const result = await res.json();
      if (result.status === 1) {
        toast.success(isEditMode ? "Category updated" : "Category added");
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
    setFormData(initialFormData);
    setImages(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
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
            <Modal.Title>
              {isEditMode ? "Edit Category" : "Add Category"}
            </Modal.Title>
            {/* <button
              type="button"
              className="modal-close-button"
              aria-label="Close"
              onClick={handleClose}
            >
              <X size={12} />
            </button> */}
            <button
              type="button"
              className="btn btn-sm btn-danger remove-image-button"
              aria-label="Close"
              onClick={handleClose}
              // style={{ position: "absolute", right: "10px", top: "10px" }}
            >
              <X size={12} />
            </button>
          </Modal.Header>

          <Modal.Body>
            {/* Image Upload */}
            <div className="mb-3">
              <label className="form-label">Avatar</label>
              <div className="profile-pic-upload mb-2">
                <div className="profile-pic">
                  {images ? (
                    <div
                      style={{
                        position: "relative",
                        display: "inline-block",
                      }}
                    >
                      <img
                        src={
                          images &&
                          typeof images === "object" &&
                          images instanceof File
                            ? URL.createObjectURL(images)
                            : images.preview
                        }
                        alt="Preview"
                      />
                      <button
                        type="button"
                        className="btn btn-sm btn-danger remove-image-button"
                        onClick={() => {
                          setImages(null);
                          if (fileInputRef.current)
                            fileInputRef.current.value = "";
                        }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <Form.Label htmlFor="upload-avatar" className="btn">
                      <PlusCircle className="me-2" /> Upload
                    </Form.Label>
                  )}
                  <Form.Control
                    id="upload-avatar"
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                    required={!isEditMode}
                  />
                </div>
              </div>
            </div>
            {/* Category */}
            <Form.Group className="mb-3">
              <Form.Label>
                Category<span className="text-danger ms-1">*</span>
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
                checked={formData?.isActive}
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

export default AddCategory;
