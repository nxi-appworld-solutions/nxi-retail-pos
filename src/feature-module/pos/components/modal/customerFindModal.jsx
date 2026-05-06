import React, { useState, useEffect } from "react";
import { Modal, Form, Table, Button } from "react-bootstrap";
import { Search, X } from "react-feather";
import Loader from "../../loader/loader";
import useCustomers from "../../../hooks/useCustomers";

const CustomerFindModal = ({ isOpen, onClose, onSelect }) => {
  const { customers, loading, fetchCustomers } = useCustomers();
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (isOpen) fetchCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    const s = search.toLowerCase();
    const list = customers.filter(
      (c) =>
        c.name?.toLowerCase().includes(s) ||
        c.phone?.toLowerCase().includes(s) ||
        c.email?.toLowerCase().includes(s)
    );
    setFiltered(list);
  }, [search, customers]);

  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      centered
      size="md"
      backdrop="static"
      className="find-customer-modal"
    >
      <Modal.Header>
        <Modal.Title>Find Customer</Modal.Title>
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
        {loading && <Loader />}
        <Form.Group className="mb-3 position-relative">
          <Form.Control
            type="text"
            placeholder="Search by name, phone, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          <Search
            size={18}
            className="position-absolute"
            style={{
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              opacity: 0.6,
            }}
          />
        </Form.Group>

        <div
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            border: "1px solid #eee",
            borderRadius: "6px",
          }}
        >
          <Table hover size="sm" className="align-middle mb-0">
            <tbody>
              {filtered.length === 0 && !loading && (
                <tr>
                  <td className="text-center text-muted py-3">
                    No matching customers found.
                  </td>
                </tr>
              )}
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    onSelect(c);
                    onClose();
                  }}
                >
                  <td>
                    <div className="fw-semibold">{c.name}</div>
                    <small className="text-muted">
                      {c.phone || "—"} | {c.email || "No Email"}
                    </small>
                  </td>
                  <td className="text-end">
                    <span
                      className={`badge ${
                        c.status === "Active" ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-content-end">
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomerFindModal;
