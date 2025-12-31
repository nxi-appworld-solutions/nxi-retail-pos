import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { X } from "react-feather";
import Select from "react-select";

const TaxCategoryForm = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "Goods",
    igst: "",
    cgst: "",
    sgst: "",
    taxOnMRP: false,
    changeByPrice: false,
  });

  const type = [
    { value: "Goods", label: "Goods" },
    { value: "Services", label: "Services" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    onClose(); // modal close after save
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header className="bg-primary text-white">
        <Modal.Title>🧾 Tax Category Setup</Modal.Title>
        <button
          type="button"
          className="btn btn-sm btn-danger remove-image-button"
          aria-label="Close"
          onClick={onClose}
        >
          <X size={12} />
        </button>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* General Info */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="taxName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter tax category name"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="taxType">
                <Form.Label>Type</Form.Label>
                <Select
                  name="type"
                  options={type}
                  classNamePrefix="react-select"
                  defaultValue={type[0]}
                  value={formData.type}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* GST Info */}
          {/* <h5 className="mt-3 text-primary ">GST Rate Info</h5> */}
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="igst">
                <Form.Label>IGST %</Form.Label>
                <Form.Control
                  type="number"
                  name="igst"
                  value={formData.igst}
                  onChange={handleChange}
                  placeholder="0"
                />
                <span className="text-danger ms-1">
                  For Inter-State Transactions
                </span>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="cgst">
                <Form.Label>CGST %</Form.Label>
                <Form.Control
                  type="number"
                  name="cgst"
                  value={formData.cgst}
                  onChange={handleChange}
                  placeholder="0"
                />
                <span className="text-danger ms-1">For Local Transactions</span>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="sgst">
                <Form.Label>SGST %</Form.Label>
                <Form.Control
                  type="number"
                  name="sgst"
                  value={formData.sgst}
                  onChange={handleChange}
                  placeholder="0"
                />
                <span className="text-danger ms-1">For Local Transactions</span>
              </Form.Group>
            </Col>
          </Row>

          {/* Switches */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Check
                type="switch"
                id="taxOnMRP"
                name="taxOnMRP"
                label="Tax on MRP"
                checked={formData.taxOnMRP}
                onChange={handleChange}
              />
              <span className="text-danger ms-1">
                Only For Multi-Tax Voucher
              </span>
            </Col>
            <Col md={6}>
              <Form.Check
                type="switch"
                id="changeByPrice"
                name="changeByPrice"
                label="Change Rate by Price"
                checked={formData.changeByPrice}
                onChange={handleChange}
              />
            </Col>
          </Row>

          {/* Tax Change Table */}
          {/* <div className="mt-4">
            <TaxRateTable />
          </div> */}

          {/* Buttons */}
          <div className="d-flex justify-content-end mt-4">
            <Button variant="secondary" className="me-2" onClick={onClose}>
              Quit
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TaxCategoryForm;
