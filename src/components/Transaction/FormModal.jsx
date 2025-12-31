import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Form, Spinner } from "react-bootstrap";
import DateInput from "./partials/DateInput";
import { Link } from "react-router-dom";
import { PlusCircle, X } from "react-feather";
import Select from "react-select";
import Loader from "../loader/loader";
import { toast } from "react-toastify";
import TableFooter from "../common/ModalFooter";
import TransactionPage from "../../pages/transactions/purchases/TransactionPage";
import TextEditor from "../../feature-module/inventory/texteditor";
import TotalSummary from "./TotalSummary";
import DefaultEditor from "react-simple-wysiwyg";

const TransactionFormModal = ({
  type = "purchase", // or 'purchase', 'expense', etc.
  title = "Transaction",
  onShow,
  onClose,
  onReset,
  customers = [],
  storeList = [],
  purcTypeList = [],
  productList = [],
  statusList = [],
  selectedDate,
  onDateChange,
  transactionData = {},
  calTotals = {},
  onChange,
  onSubmit,
  loading,
  error,
  isEditMode,
}) => {
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <>
      {loading && <Loader />}
      <Modal
        show={onShow}
        onHide={() => {
          onReset();
          onClose();
        }}
        centered
        size="xl"
        backdrop="static"
        className="transaction-modal"
      >
        <Modal.Header className="border">
          <Modal.Title as="h4">{title}</Modal.Title>
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
          <Form id="transactionForm" onSubmit={onSubmit}>
            <Row>
              <Col lg={3} md={6}>
                <DateInput value={selectedDate} onChange={onDateChange} />
              </Col>

              <Col lg={3} md={6}>
                <div className="mb-3">
                  <label className="form-label">
                    Invoice No
                    <span className="text-danger ms-1">*</span>
                  </label>
                  <div className="row">
                    <div className="col-lg-12 col-sm-12 col-12">
                      <input
                        type="text"
                        className="form-control"
                        name="vchNo"
                        value={transactionData.vchNo}
                        placeholder="Invoice No."
                        onChange={(e) => onChange("vchNo", e.target.value)}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={3} md={6}>
                <div className="mb-3">
                  <label className="form-label">
                    Purchase Type
                    <span className="text-danger ms-1">*</span>
                  </label>
                  <div className="row">
                    <div className="col-lg-12 col-sm-12 col-12">
                      <Select
                        classNamePrefix="react-select"
                        options={purcTypeList}
                        value={transactionData.salePurcType}
                        onChange={(val) => onChange("salePurcType", val)}
                        isSearchable
                        isLoading={false}
                      />
                    </div>
                  </div>
                </div>
              </Col>

              <Col lg={3} md={6}>
                <div className="mb-3">
                  <label className="form-label">
                    Reference No
                    <span className="text-danger ms-1">*</span>
                  </label>
                  <div className="row">
                    <div className="col-lg-12 col-sm-12 col-12">
                      <input
                        type="text"
                        className="form-control"
                        name="refNo"
                        value={transactionData.refNo}
                        placeholder="Choose"
                        onChange={(e) => onChange("refNo", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={3} md={6}>
                <div className="mb-3">
                  <label className="form-label">
                    {type === "sale" ? "Customer Name" : "Supplier Name"}
                    <span className="text-danger ms-1">*</span>
                  </label>
                  <div className="row">
                    <div className="col-lg-10 col-sm-10 col-10">
                      <Select
                        classNamePrefix="react-select"
                        name="name"
                        options={customers}
                        value={transactionData.name}
                        onChange={(val) => onChange("name", val)}
                        placeholder="Choose"
                        isSearchable
                        required
                      />
                    </div>
                    <div className="col-lg-2 col-sm-2 col-2 ps-0">
                      <div className="add-icon">
                        <Link to="#" className="bg-dark text-white p-2 rounded">
                          <PlusCircle />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={3} md={6}>
                <div className="mb-3">
                  <label className="form-label">
                    Mat Center
                    <span className="text-danger ms-1">*</span>
                  </label>
                  <div className="row">
                    <div className="col-lg-12 col-sm-12 col-12">
                      <Select
                        classNamePrefix="react-select"
                        options={storeList}
                        name="matCenter"
                        value={transactionData.matCenter}
                        onChange={(val) => onChange("matCenter", val)}
                        isSearchable
                        placeholder="Choose"
                      />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={12}>
                <TransactionPage type={type} />
              </Col>
            </Row>
            <Row className="justify-content-end mt-4">
              <Col lg={6}>
                <TotalSummary totals={calTotals} />
              </Col>
            </Row>

            {/* <Row className="mt-3">
              {["Order Tax", "Discount", "Shipping"].map((label) => (
                <Col lg={3} sm={6} key={label}>
                  <TextInput
                    label={label}
                    value={transactionData[label.toLowerCase()]}
                    onChange={(e) =>
                      onChange(label.toLowerCase(), e.target.value)
                    }
                  />
                </Col>
              ))}

              <Col lg={3} sm={6}>
                <SelectInput
                  label="Status"
                  options={statusList}
                  value={transactionData.status}
                  onChange={(val) => onChange("status", val)}
                />
              </Col>
            </Row> */}

            <Row className="mt-4">
              <Col lg={12}>
                <div className="input-blocks summer-description-box">
                  <label>Notes</label>
                  <DefaultEditor
                    name="remark"
                    value={transactionData.remark}
                    onChange={(e) => onChange("remark", e.target.value)}
                  />
                </div>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <TableFooter
          isLoading={loading}
          isEditMode={false}
          onReset={onReset}
          onClose={onClose}
          formId="transactionForm"
        />
      </Modal>
    </>
  );
};

export default TransactionFormModal;
