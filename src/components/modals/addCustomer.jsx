import React, { useEffect, useRef, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { X } from "react-feather";
import FormModalFooter from "../common/FormModalFooter";
import ImageUpload from "../common/ImageUpload";
import LocationSelector from "../common/LocationSelector";

const AddCustomerModal = ({
  isOpen,
  formData,
  onImageChange,
  onLocationChange,
  onInputChange,
  onClose,
  onSubmit,
  isLoading,
  isEditMode,
}) => {
  return (
    <>
      <Modal show={isOpen} onHide={onClose} centered backdrop="static">
        <Modal.Header>
          <Modal.Title>
            {isEditMode ? "Edit Customer" : "Add Customer"}
          </Modal.Title>
          <button
            type="button"
            className="btn btn-sm btn-danger remove-image-button"
            aria-label="Close"
            onClick={onClose}
            // style={{ position: "absolute", right: "10px", top: "10px" }}
          >
            <X size={12} />
          </button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <div className="text-center mb-3">
              <ImageUpload
                onChange={onImageChange}
                initialImage={formData?.image}
              />
            </div>
            {/* 2️⃣ Status Switch — right after image */}
            <div className="d-flex justify-content-between align-items-center bg-light rounded-3 p-3 mb-4 shadow-sm">
              <div>
                <h6 className="mb-1 fw-semibold text-dark">
                  {formData.status ? "Active" : "Inactive"} Customer
                </h6>
                <small className="text-muted">
                  Toggle this switch to activate or deactivate the customer.
                </small>
              </div>
              <Form.Check
                type="switch"
                id="status-switch"
                name="status"
                value={formData?.status}
                onChange={onInputChange}
                defaultChecked={formData?.status}
              />
            </div>

            {/* Personal Details */}
            <Row>
              <Col lg={12} className="mb-3">
                <label className="form-label">
                  Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={onInputChange}
                  required
                />
              </Col>
              <Col lg={6} className="mb-3">
                <label className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={onInputChange}
                  required
                />
              </Col>
              <Col lg={6} className="mb-3">
                <label className="form-label">
                  Phone <span className="text-danger">*</span>
                </label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={onInputChange}
                  required
                />
              </Col>
            </Row>
            <Row>
              {/* Location Selector */}
              <LocationSelector
                onLocationChange={onLocationChange}
                initialCountry={formData.country}
                initialState={formData.state}
                initialCity={formData.city}
              />
              <Col lg={12} className="mb-3">
                <label className="form-label">
                  Address <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={formData.address}
                  onChange={onInputChange}
                  required
                />
              </Col>
            </Row>
            <Row>
              <FormModalFooter
                // className="mt-2"
                title="Customer"
                onClose={onClose}
                isLoading={isLoading}
                isEditMode={isEditMode}
              />
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddCustomerModal;
