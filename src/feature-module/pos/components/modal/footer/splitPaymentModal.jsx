// src/components/modals/pos/SplitPaymentModal.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../../core/redux/store/modalSlice";
import { toast } from "react-toastify";

const paymentMethods = ["cash", "card", "upi", "wallet", "online"];

const SplitPaymentModal = ({ isOpen = true, total = 0, onConfirm }) => {
  const dispatch = useDispatch();
  const [entries, setEntries] = useState([]);
  const [method, setMethod] = useState("cash");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const sum = entries.reduce((s, e) => s + Number(e.amount || 0), 0);
  const remaining = Number(total) - sum;

  const addEntry = () => {
    if (!amount || amount <= 0) return toast.warning("Enter valid amount");
    if (amount > remaining) return toast.warning("Amount exceeds remaining");
    setEntries([...entries, { id: Date.now(), method, amount }]);
    setAmount(0);
  };

  const removeEntry = (id) => setEntries(entries.filter((e) => e.id !== id));

  const handleConfirm = async () => {
    if (sum !== Number(total))
      return toast.warning("Split amounts must equal total");
    setLoading(true);
    try {
      await onConfirm(entries);
      toast.success("Split payments recorded");
      dispatch(closeModal("splitPayment"));
    } catch (err) {
      toast.error(err?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show" />
      <div className="modal fade show d-block" role="dialog" aria-modal="true">
        <div className="modal-dialog modal-md modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-info text-white">
              <h5 className="modal-title text-white">Split Payment</h5>
              <button
                type="button"
                className="modal-close-btnx"
                aria-label="Close"
                onClick={() => dispatch(closeModal("splitPayment"))}
              >
                ✖
              </button>
            </div>

            <div className="modal-body">
              <div className="mb-2">Total: ₹{Number(total).toFixed(2)}</div>

              <div className="d-flex gap-2 mb-2">
                <select
                  className="form-select"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                >
                  {paymentMethods.map((m) => (
                    <option key={m} value={m}>
                      {m.toUpperCase()}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
                <button className="btn btn-secondary" onClick={addEntry}>
                  Add
                </button>
              </div>

              <ul className="list-group mb-2">
                {entries.map((e) => (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center"
                    key={e.id}
                  >
                    <div>{e.method.toUpperCase()}</div>
                    <div>₹{Number(e.amount).toFixed(2)}</div>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeEntry(e.id)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>

              <div>
                <strong>Paid:</strong> ₹{sum.toFixed(2)} &nbsp;{" "}
                <strong>Remaining:</strong> ₹{(total - sum).toFixed(2)}
              </div>
            </div>

            <div className="modal-footer gap-2">
              <button
                className="btn btn-secondary"
                onClick={() => dispatch(closeModal("splitPayment"))}
                disabled={loading}
              >
                Close
              </button>
              <button
                className="btn btn-success"
                onClick={handleConfirm}
                disabled={loading || sum !== Number(total)}
              >
                {loading ? "Saving..." : "Confirm Split"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SplitPaymentModal;
