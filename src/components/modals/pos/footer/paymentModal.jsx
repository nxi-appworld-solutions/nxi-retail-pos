// // src/components/modals/pos/PaymentModal.jsx
// import React, { useState, useMemo } from "react";
// import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import { closeModal } from "../../../../core/redux/modalSlice";

// const PaymentModal = ({ isOpen = true, total = 0, onPay }) => {
//   const dispatch = useDispatch();
//   const [method, setMethod] = useState("cash");
//   const [amountReceived, setAmountReceived] = useState(total);
//   const [reference, setReference] = useState("");
//   const [tip, setTip] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const finalAmount = useMemo(
//     () => Number(total) + Number(tip || 0),
//     [total, tip]
//   );
//   const change = useMemo(
//     () => Number(amountReceived || 0) - finalAmount,
//     [amountReceived, finalAmount]
//   );

//   const handlePay = async () => {
//     setLoading(true);
//     try {
//       await onPay?.({
//         method,
//         amount: finalAmount,
//         received: amountReceived,
//         reference,
//         tip,
//       });
//       toast.success("Payment recorded");
//       dispatch(closeModal("payment"));
//     } catch (err) {
//       toast.error(err?.message || "Payment failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <>
//       <div className="modal-backdrop fade show" />
//       <div className="modal fade show d-block" role="dialog" aria-modal="true">
//         <div className="modal-dialog modal-md modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-header bg-primary text-white">
//               <h5 className="modal-title">Take Payment</h5>
//               <button
//                 type="button"
//                 className="modal-close-btnx"
//                 aria-label="Close"
//                 onClick={() => dispatch(closeModal("payment"))}
//               >
//                 ✖
//               </button>
//             </div>

//             <div className="modal-body">
//               <div className="mb-2">
//                 Total: <strong>₹{Number(total).toFixed(2)}</strong>
//               </div>

//               <label className="form-label">Payment method</label>
//               <select
//                 className="form-select mb-2"
//                 value={method}
//                 onChange={(e) => setMethod(e.target.value)}
//               >
//                 <option value="cash">Cash</option>
//                 <option value="card">Card</option>
//                 <option value="upi">UPI</option>
//                 <option value="wallet">Wallet</option>
//                 <option value="online">Online Gateway</option>
//               </select>

//               <label className="form-label">Tip (optional)</label>
//               <input
//                 type="number"
//                 className="form-control mb-2"
//                 value={tip}
//                 onChange={(e) => setTip(Number(e.target.value))}
//               />

//               <label className="form-label">Amount received</label>
//               <input
//                 type="number"
//                 className="form-control mb-2"
//                 value={amountReceived}
//                 onChange={(e) => setAmountReceived(Number(e.target.value))}
//               />

//               {method !== "cash" && (
//                 <>
//                   <label className="form-label">
//                     Reference / Transaction ID
//                   </label>
//                   <input
//                     className="form-control mb-2"
//                     value={reference}
//                     onChange={(e) => setReference(e.target.value)}
//                   />
//                 </>
//               )}

//               <div className="mt-2">
//                 <strong>Final:</strong> ₹{finalAmount.toFixed(2)} &nbsp;{" "}
//                 <strong>Change:</strong> ₹{change.toFixed(2)}
//               </div>
//             </div>

//             <div className="modal-footer gap-2">
//               <button
//                 className="btn btn-secondary"
//                 onClick={() => dispatch(closeModal("payment"))}
//                 disabled={loading}
//               >
//                 Close
//               </button>
//               <button
//                 className="btn btn-success"
//                 onClick={handlePay}
//                 disabled={loading}
//               >
//                 {loading ? "Processing..." : "Confirm Payment"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PaymentModal;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../../core/redux/store/modalSlice";
import { toast } from "react-toastify";

const PAYMENT_METHODS = [
  { key: "cash", label: "Cash", icon: "ti ti-cash" },
  { key: "upi", label: "UPI", icon: "ti ti-device-mobile-dollar" },
  { key: "card", label: "Card", icon: "ti ti-credit-card" },
  { key: "wallet", label: "Wallet", icon: "ti ti-wallet" },
  { key: "due", label: "Pay Later", icon: "ti ti-clock" },
];

const QUICK_AMOUNTS = [50, 100, 200, 500, 1000];

const PaymentModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.posCart);

  const [selectedMethod, setSelectedMethod] = useState("cash");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [payments, setPayments] = useState([]);

  // const subtotal = useMemo(
  //   () => cart?.items?.reduce((s, it) => s + it?.price * it?.qty, 0),
  //   [cart.items]
  // );

  const subtotal = 0;

  const total = useMemo(() => {
    const tax = cart?.tax || 0;
    const discount = cart?.discount || 0;
    return subtotal + tax - discount;
  }, [subtotal, cart?.tax, cart?.discount]);

  const paidAmount = payments.reduce((s, p) => s + Number(p.amount), 0);
  const remaining = Math.max(total - paidAmount, 0);
  const changeReturn = paidAmount > total ? paidAmount - total : 0;

  const addPayment = () => {
    if (!amount || Number(amount) <= 0)
      return toast.error("Enter valid payment amount");

    setPayments([
      ...payments,
      { method: selectedMethod, amount: Number(amount) },
    ]);

    setAmount("");
  };

  const completePayment = () => {
    if (paidAmount < total) return toast.error("Payment incomplete");

    toast.success("Payment Successful & Order Completed");
    dispatch(closeModal("payment"));
  };

  const deletePayment = (index) => {
    const updated = [...payments];
    updated.splice(index, 1);
    setPayments(updated);
  };

  // if (!cart?.items?.length)
  //   return (
  //     <>
  //       <div className="modal-backdrop fade show" />
  //       <div className="payment-sheet d-block">
  //         <div className="sheet-container">
  //           <div className="text-center text-muted p-4">Cart is empty</div>
  //           <button className="btn btn-secondary w-100" onClick={onClose}>
  //             Close
  //           </button>
  //         </div>
  //       </div>
  //     </>
  //   );

  return (
    <>
      <div className="modal-backdrop fade show" />
      <div className="modal fade show d-block" role="dialog" aria-modal="true">
        <div className="payment-sheet show">
          <div className="sheet-container">
            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Payment</h5>
              <button className="btn-close" onClick={onClose} />
            </div>

            {/* ORDER SUMMARY */}
            <div className="card p-3 mb-3">
              <h6>Order Summary</h6>
              <div className="d-flex justify-content-between small mt-1">
                <span>Subtotal</span>
                <strong>₹{subtotal.toFixed(2)}</strong>
              </div>
              <div className="d-flex justify-content-between small">
                <span>Tax</span>
                <strong>₹{(cart?.tax || 0).toFixed(2)}</strong>
              </div>
              <div className="d-flex justify-content-between small">
                <span>Discount</span>
                <strong>₹{(cart?.discount || 0).toFixed(2)}</strong>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Grand Total</strong>
                <strong>₹{total.toFixed(2)}</strong>
              </div>
            </div>

            {/* PAYMENT METHOD TABS */}
            <div className="payment-methods mb-3">
              {PAYMENT_METHODS.map((m) => (
                <button
                  key={m.key}
                  className={`pay-method-btn ${
                    selectedMethod === m.key ? "active" : ""
                  }`}
                  onClick={() => setSelectedMethod(m.key)}
                >
                  <i className={`${m.icon} me-1`} />
                  {m.label}
                </button>
              ))}
            </div>

            {/* AMOUNT ENTRY */}
            <div className="card p-3 mb-3">
              <label className="form-label">Enter Amount</label>
              <input
                type="number"
                className="form-control"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              {/* QUICK AMOUNT BUTTONS */}
              <div className="d-flex gap-2 mt-2 flex-wrap">
                {QUICK_AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    className="btn btn-light flex-fill"
                    onClick={() => setAmount(amt)}
                  >
                    ₹{amt}
                  </button>
                ))}

                <button
                  className="btn btn-success flex-fill"
                  onClick={() => setAmount(total)}
                >
                  Exact: ₹{total}
                </button>
              </div>

              <button
                className="btn btn-primary mt-3 w-100"
                onClick={addPayment}
              >
                Add Payment
              </button>
            </div>

            {/* PAYMENT LIST */}
            {payments.length > 0 && (
              <div className="card p-3 mb-3">
                <h6>Payments Added</h6>

                {payments.map((p, idx) => (
                  <div
                    key={idx}
                    className="d-flex justify-content-between align-items-center border-bottom py-2"
                  >
                    <span>
                      {p.method.toUpperCase()} — ₹{p.amount}
                    </span>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deletePayment(idx)}
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <div className="d-flex justify-content-between mt-2">
                  <span>Total Paid</span>
                  <strong>₹{paidAmount}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Remaining</span>
                  <strong>₹{remaining}</strong>
                </div>
                {changeReturn > 0 && (
                  <div className="d-flex justify-content-between text-success">
                    <span>Change Return</span>
                    <strong>₹{changeReturn}</strong>
                  </div>
                )}
              </div>
            )}

            {/* NOTE */}
            <textarea
              className="form-control mb-3"
              rows={2}
              placeholder="Add note (optional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            {/* PAYMENT ACTION BUTTONS */}
            <div className="d-flex gap-2">
              <button
                className="btn btn-primary flex-fill"
                disabled={paidAmount < total}
                onClick={completePayment}
              >
                Complete Payment
              </button>

              <button className="btn btn-secondary flex-fill" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* STYLES */}
      <style>{`
        .payment-sheet {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 9999;
          display: flex;
          justify-content: center;
          animation: slideUp 0.25s ease-out;
        }
        .sheet-container {
          width: 100%;
          max-width: 600px;
          background: #fff;
          padding: 15px;
          border-radius: 14px 14px 0 0;
          box-shadow: 0 -2px 12px rgba(0,0,0,0.2);
          max-height: 85vh;
          overflow-y: auto;
        }
        @keyframes slideUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .payment-methods {
          display: flex;
          overflow-x: auto;
          gap: 8px;
        }

        .pay-method-btn {
          flex: 1;
          white-space: nowrap;
          padding: 8px 12px;
          border-radius: 6px;
          border: 1px solid #ccc;
          background: #f8f9fa;
        }
        .pay-method-btn.active {
          background: #007bff;
          color: white;
          border-color: #007bff;
        }
      `}</style>
    </>
  );
};

export default PaymentModal;
