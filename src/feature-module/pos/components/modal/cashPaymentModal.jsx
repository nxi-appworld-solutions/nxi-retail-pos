import { useState } from "react";
import useModal from "../../../../routes/modal_root/useModal";

const CashPaymentModal = () => {
  const { close, payload } = useModal();
  const { total = 0, onConfirm } = payload || {};

  const [cashReceived, setCashReceived] = useState("");
  const [loading, setLoading] = useState(false);

  const received = parseFloat(cashReceived) || 0;
  const change = received - total;

  const handleConfirm = async () => {
    if (!received) return;

    setLoading(true);
    try {
      await onConfirm?.({
        cashReceived: received,
        change,
      });
      close();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Quick cash buttons (POS feature)
  const quickAmounts = [100, 200, 500, 1000, 2000].filter((amt) => amt >= total);

  return (
    <div className="modal-content p-3 rounded-4 shadow-lg border-0">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
        <h5 className="fw-bold m-0">Cash Payment</h5>
        <button className="btn btn-sm btn-danger" onClick={close}>
          ✕
        </button>
      </div>

      {/* TOTAL */}
      <div className="text-center mb-3">
        <h2 className="fw-bold text-success">₹{total}</h2>
        <small className="text-muted">Total Amount</small>
      </div>

      {/* INPUT */}
      <div className="mb-3">
        <label className="fw-semibold mb-1">Cash Received</label>
        <input
          type="number"
          className="form-control form-control-lg text-center fw-bold"
          placeholder="0.00"
          value={cashReceived}
          onChange={(e) => setCashReceived(e.target.value)}
          autoFocus
        />
      </div>

      {/* QUICK CASH BUTTONS */}
      <div className="d-flex gap-2 flex-wrap mb-3">
        {quickAmounts.map((amt) => (
          <button
            key={amt}
            className="btn btn-outline-primary btn-sm"
            onClick={() => setCashReceived(amt)}
          >
            ₹{amt}
          </button>
        ))}
      </div>

      {/* CHANGE */}
      <div className="text-center p-3 bg-light rounded mb-3">
        <small className="text-muted d-block">Change</small>
        <h4 className={change < 0 ? "text-danger" : "text-success"}>
          ₹{change}
        </h4>
      </div>

      {/* ACTION BUTTONS */}
      <div className="d-flex justify-content-between gap-2">
        <button className="btn btn-light w-50" onClick={close}>
          Cancel
        </button>

        <button
          className="btn btn-success w-50 fw-semibold"
          disabled={loading || change < 0}
          onClick={handleConfirm}
        >
          {loading ? "Processing..." : "Confirm"}
        </button>
      </div>
    </div>
  );
};

export default CashPaymentModal;
