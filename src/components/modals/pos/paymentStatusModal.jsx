import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { CheckCircle, XCircle } from "lucide-react";

const PaymentStatusModal = ({ show, onHide, onPaymentComplete }) => {
  const [status, setStatus] = useState("processing"); // 'processing', 'success', 'failed'

  useEffect(() => {
    if (show) {
      // simulate payment process
      setStatus("processing");

      // after 3 seconds, randomly decide success/fail (or replace with API call)
      const timer = setTimeout(() => {
        const isSuccess = Math.random() > 0.2; // 80% success rate
        setStatus(isSuccess ? "success" : "failed");

        // show result for 2 seconds, then trigger parent callback
        setTimeout(() => {
          onHide();
          onPaymentComplete(isSuccess);
        }, 1800);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      dialogClassName="slide-up-modal"
    >
      <Modal.Body className="text-center p-5">
        {status === "processing" && (
          <>
            <Spinner
              animation="border"
              variant="primary"
              style={{ width: "3rem", height: "3rem" }}
            />
            <h5 className="mt-4 fw-semibold">Processing Payment...</h5>
            <p className="text-muted small">
              Please wait while we confirm your payment.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="p-3 bg-success bg-opacity-10 rounded-circle mx-auto mb-3 animate-pulse">
              <CheckCircle size={64} className="text-success" />
            </div>
            <h4 className="fw-semibold text-success">Payment Successful!</h4>
            <p className="text-muted small mb-0">
              Your transaction has been confirmed securely.
            </p>
          </>
        )}

        {status === "failed" && (
          <>
            <div className="p-3 bg-danger bg-opacity-10 rounded-circle mx-auto mb-3 animate-pulse">
              <XCircle size={64} className="text-danger" />
            </div>
            <h4 className="fw-semibold text-danger">Payment Failed!</h4>
            <p className="text-muted small mb-0">
              Something went wrong. Please try again.
            </p>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PaymentStatusModal;
