import React, { useEffect } from "react";
import { Modal, Button, Row, Col, Badge } from "react-bootstrap";
import {
  CheckCircle,
  HelpCircle,
  Printer,
  Repeat,
  ShoppingCart,
  XCircle,
} from "lucide-react";
import { capitalize, getFormattedDate } from "../../../utils/common";

const OrderConfirmationModal = ({
  isOpen,
  onClose,
  orderStatus,
  orderData,
  onResetCart,
  onResetFlow,
  onPrintReceipt,
}) => {
  const isSuccess = orderStatus === "success";

  // console.log("[OrderConfirmationModal] orderData:", orderData);
  
  useEffect(() => {
    if (isOpen) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 1800);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && isSuccess) {
      // Auto close + reset after 5s
      const t = setTimeout(() => {
        try {
          onResetCart && onResetCart();
          onResetFlow && onResetFlow();
        } finally {
          onClose && onClose();
        }
      }, 10000);
      return () => clearTimeout(t);
    }
  }, [isOpen, isSuccess, onResetCart, onResetFlow, onClose]);

  if (!orderData) return null;

  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      centered
      backdrop="static"
      dialogClassName="slide-up-modal"
    >
      {/* HEADER */}
      <Modal.Header
        className="border-0 text-white py-4 position-relative flex-column align-items-center"
        style={{
          background: isSuccess
            ? // ? "#3b5949"
              "linear-gradient(135deg, #2E7D64, #1F5A47, #174236)"
            : "linear-gradient(135deg, #D7263D, #B71F32)",
        }}
      >
        {/* Success Icon */}
        <div className="p-3 bg-white bg-opacity-20 rounded-circle animate-pulse mb-2">
          <CheckCircle
            size={50}
            className={isSuccess ? "text-success" : "text-danger"}
          />
        </div>

        {/* Title */}
        <h4 className="text-muted fw-semibold mb-1">
          {isSuccess ? "Order Confirmed" : "Order Failed"}
        </h4>

        {!isSuccess && (
          <small className="mt-1 text-warning fw-bold">
            {orderData?.error || "Server returned an error"}
          </small>
        )}

        {/* ⭐ NEW ORDER INFO CARD ⭐ */}
        <div
          style={{
            background: "rgba(255,255,255,0.20)",
            padding: "8px 18px",
            borderRadius: "12px",
            backdropFilter: "blur(6px)",
            marginTop: "4px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "0.75rem", fontWeight: 700 }}>
            Order No: #{orderData?.orderNo || "—"}
          </span>
          <span
            style={{
              fontSize: "0.85rem",
              opacity: 0.85,
              marginTop: "2px",
            }}
          >
            {getFormattedDate(new Date().toLocaleString())}
            {/* {orderData?.orderDate || "—"} */}
          </span>
        </div>
        {/* <small className="opacity-75 mt-1">
          {order?.orderNo || "—"} • {order?.orderDate}
        </small> */}

        {isSuccess && (
          <div className="thank-you-text mt-2">
            <span>Thank you for your order!</span>
          </div>
        )}
      </Modal.Header>

      {/* BODY */}
      <Modal.Body className="px-4 py-4 bg-light">
        {isSuccess ? (
          <div className="p-4 bg-white rounded shadow-sm text-center">
            <h5 className="fw-semibold text-success mb-3">
              Payment Successful 💸
            </h5>

            {/* Customer and Payment Info */}
            <Row className="justify-content-center text-start text-secondary small">
              <Col sm={6}>
                <div className="mb-2">
                  <span className="fw-semibold text-muted">Customer:</span>
                  <br />
                  <span className="text-dark fw-semibold">
                    {orderData?.customer}
                  </span>
                </div>
              </Col>
              <Col sm={6}>
                <div className="mb-2 text-sm-end">
                  <span className="fw-semibold text-muted">
                    Payment Method:
                  </span>
                  <br />
                  <span className="text-dark fw-semibold">
                    {capitalize(orderData?.payment) || "—"}{" "}
                    {/* <Badge
                      bg={
                        order?.payment?.status === "Success"
                          ? "success"
                          : order?.payment?.status === "Pending"
                          ? "warning"
                          : "secondary"
                      }
                      pill
                      className="ms-2 px-2"
                    >
                      {"Success" || order?.payment?.status}
                    </Badge> */}
                  </span>
                </div>
              </Col>
            </Row>

            <hr className="my-3" />

            <div>
              <h5 className="fw-bold mb-0 text-dark">
                Total Paid:{" "}
                <span className="text-success">
                  ₹{Number(orderData?.totals?.grandTotal || 0).toFixed(2)}
                </span>
              </h5>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-white rounded shadow-sm text-center">
            <h5 className="fw-semibold text-danger mb-3">Payment Failed ❌</h5>
            <p className="text-muted">{orderData?.error}</p>
          </div>
        )}
      </Modal.Body>

      {/* FOOTER */}
      <Modal.Footer className="border-0 bg-white d-flex justify-content-center px-4 pb-4">
        {" "}
        {/* justify-content-between */}
        {/* <button
          className="btn btn-outline-secondary d-flex align-items-center"
          onClick={onResetCart}
        >
          <XCircle size={16} className="me-1" />
          Close
        </button> */}
        <div className="d-flex gap-2">
          {isSuccess ? (
            <>
              <Button
                variant="outline-primary"
                onClick={onPrintReceipt}
                className="d-flex align-items-center gap-1"
              >
                <Printer size={16} /> Print
              </Button>
              <Button
                variant="success"
                onClick={() => {
                  onResetCart();
                  onResetFlow();
                  onClose();
                }}
                className="d-flex align-items-center text-sm font-medium shadow-sm"
              >
                <ShoppingCart size={16} className="me-2" />
                Continue Shopping
              </Button>
            </>
          ) : (
            <>
              {/* For failure, provide options to retry or seek help */}
              <Button
                variant="danger"
                onClick={onClose} // Placeholder: In a real app, this might navigate to payment page
                className="d-flex items-center text-sm font-medium"
              >
                <Repeat size={16} className="me-2" />
                Try Again
              </Button>
              <Button
                variant="warning"
                onClick={() => console.log("Contact support functionality")}
                className="d-flex items-center text-sm font-medium"
              >
                <HelpCircle size={16} className="me-2" />
                Support
              </Button>
            </>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderConfirmationModal;



// import React, { useEffect } from "react";
// import { Modal, Button, Row, Col } from "react-bootstrap";
// import {
//   CheckCircle,
//   Printer,
//   ShoppingCart,
//   Repeat,
//   HelpCircle,
// } from "lucide-react";
// import { capitalize } from "../../../utils/common";

// const OrderConfirmationModal = ({
//   isOpen,
//   onClose,
//   orderStatus,
//   orderData,
//   onResetCart,
//   onResetFlow,
//   onPrintReceipt,
// }) => {
//   const isSuccess = orderStatus === "success";

//   useEffect(() => {
//     if (isOpen && isSuccess) {
//       const t = setTimeout(() => {
//         onResetCart();
//         onResetFlow();
//         onClose();
//       }, 8000);
//       return () => clearTimeout(t);
//     }
//   }, [isOpen, isSuccess]);

//   if (!orderData) return null;

//   return (
//     <Modal show={isOpen} centered backdrop="static">
//       <Modal.Header
//         className="text-white flex-column align-items-center"
//         style={{
//           background: isSuccess
//             ? "linear-gradient(135deg, #2E7D64, #1F5A47)"
//             : "linear-gradient(135deg, #D7263D, #B71F32)",
//         }}
//       >
//         <div className="p-3 bg-white bg-opacity-20 rounded-circle mb-2">
//           <CheckCircle
//             size={50}
//             className={isSuccess ? "text-success" : "text-danger"}
//           />
//         </div>

//         <h4>{isSuccess ? "Order Confirmed" : "Order Failed"}</h4>
//         <div className="mt-2 bg-white bg-opacity-20 px-4 py-2 rounded">
//           <strong>Order No: #{orderData.orderNo}</strong>
//         </div>
//       </Modal.Header>

//       <Modal.Body className="text-center bg-light">
//         {isSuccess ? (
//           <>
//             <h5 className="text-success fw-bold mb-3">Payment Successful</h5>

//             <Row className="text-start small text-secondary">
//               <Col sm={6}>
//                 <strong>Customer:</strong>
//                 <br />
//                 {orderData.customer}
//               </Col>

//               <Col sm={6} className="text-sm-end">
//                 <strong>Payment Method:</strong>
//                 <br />
//                 {capitalize(orderData.payment)}
//               </Col>
//             </Row>

//             <hr />

//             <h5 className="fw-bold">
//               Total Paid: ₹{Number(orderData.totals.grandTotal).toFixed(2)}
//             </h5>
//           </>
//         ) : (
//           <div className="text-danger">
//             <h5 className="fw-bold mb-3">Payment Failed</h5>
//             <p>{orderData.error || "Something went wrong"}</p>
//           </div>
//         )}
//       </Modal.Body>

//       <Modal.Footer className="bg-white justify-content-center">
//         {isSuccess ? (
//           <>
//             <Button variant="outline-primary" onClick={onPrintReceipt}>
//               <Printer size={16} /> Print
//             </Button>

//             <Button
//               variant="success"
//               onClick={() => {
//                 onResetCart();
//                 onResetFlow();
//                 onClose();
//               }}
//             >
//               <ShoppingCart size={16} /> Continue
//             </Button>
//           </>
//         ) : (
//           <>
//             <Button variant="danger" onClick={onClose}>
//               <Repeat size={16} /> Try Again
//             </Button>
//             <Button variant="warning">
//               <HelpCircle size={16} /> Support
//             </Button>
//           </>
//         )}
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default OrderConfirmationModal;
