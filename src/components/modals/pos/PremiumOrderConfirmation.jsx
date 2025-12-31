import React from "react";
import { Modal, Button } from "react-bootstrap";
import { CheckCircle } from "lucide-react";

const PremiumOrderConfirmation = ({ show, onHide, order }) => {
  if (!order) return null;

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      centered 
      backdrop="static"
      size="md"
      dialogClassName="premium-order-modal"
    >
      {/* HEADER */}
      <div
        style={{
          background: "#1f3d33",
          padding: "40px 20px",
          textAlign: "center",
          color: "white",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
      >
        <CheckCircle size={60} color="#6ee7b7" />
        <h3 className="mt-3">Thanks for your Order!</h3>

        <div
          style={{
            background: "#ffcb29",
            display: "inline-block",
            padding: "6px 18px",
            borderRadius: "6px",
            fontWeight: "600",
            marginTop: "12px",
            color: "#000",
            fontSize: "15px",
          }}
        >
          Order No: #{order?.orderNo || "—"}
        </div>
      </div>

      {/* BODY */}
      <div className="p-4 bg-light">

        {/* 3-Column Details */}
        <div className="d-flex justify-content-between text-muted mb-4">
          <div>
            <h6 className="fw-bold text-dark">Date</h6>
            <p className="mb-0">{order?.orderDate || "—"}</p>
          </div>

          <div>
            <h6 className="fw-bold text-dark">Customer</h6>
            <p className="mb-0">{order?.accName || "Walk-in Customer"}</p>
          </div>

          <div>
            <h6 className="fw-bold text-dark">Payment Method</h6>
            <p className="mb-0">{order?.payment || "—"}</p>
          </div>
        </div>

        {/* Total */}
        <div
          className="bg-white p-3 rounded shadow-sm text-center"
          style={{ border: "1px solid #e5e7eb" }}
        >
          <h5 className="fw-semibold text-dark">Total Paid</h5>
          <h3 className="text-success fw-bold mt-2">
            ₹{Number(order?.totals?.grandTotal || 0).toFixed(2)}
          </h3>
        </div>
      </div>

      {/* FOOTER */}
      <div className="d-flex justify-content-between p-4 bg-white">
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="success" onClick={onHide}>
          Done
        </Button>
      </div>
    </Modal>
  );
};

export default PremiumOrderConfirmation;
