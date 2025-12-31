// src/components/modals/pos/DiscountModal.jsx
import React, { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { closeModal } from "../../../../core/redux/modalSlice";

const DiscountModal = ({ isOpen = true, cart = {}, onApply }) => {
  const dispatch = useDispatch();
  const [type, setType] = useState("order"); // order | item
  const [mode, setMode] = useState("percent"); // percent | flat
  const [value, setValue] = useState(0);
  const [itemId, setItemId] = useState(null);
  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(false);

  const subtotal = cart.subTotal || cart.SubTotal || 0;
  const discountAmount = useMemo(() => {
    if (!value) return 0;
    if (mode === "percent") return (subtotal * Number(value)) / 100;
    return Number(value);
  }, [value, mode, subtotal]);

  const handleApply = async () => {
    setLoading(true);
    try {
      if (coupon) {
        // call server to validate coupon (implement in usePos or service)
        // const res = await validateCoupon(coupon, subtotal);
        // if (!res.valid) throw new Error("Invalid coupon");
      }
      await onApply({ type, mode, value: Number(value), itemId, coupon });
      toast.success("Discount applied");
      dispatch(closeModal("discountPopup"));
    } catch (err) {
      toast.error(err?.message || "Failed to apply discount");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-backdrop fade show" />
      <div className="modal fade show d-block" role="dialog" aria-modal="true">
        <div className="modal-dialog modal-md modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-secondary text-white">
              <h5 className="modal-title text-white">Apply Discount</h5>
              <button
                type="button"
                className="modal-close-btnx"
                aria-label="Close"
                onClick={() => dispatch(closeModal("discountPopup"))}
              >
                ✖
              </button>
            </div>

            <div className="modal-body">
              <div className="mb-2">
                <label className="form-label">Scope</label>
                <select
                  className="form-select"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="order">Order Level</option>
                  <option value="item">Item Level</option>
                </select>
              </div>

              {type === "item" && (
                <div className="mb-2">
                  <label className="form-label">Select Item</label>
                  <select
                    className="form-select"
                    value={itemId || ""}
                    onChange={(e) => setItemId(e.target.value)}
                  >
                    <option value="">Select item</option>
                    {(Object.values(cart.items || {}) || []).map((it) => (
                      <option key={it.id} value={it.id}>
                        {it.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="d-flex gap-2 mb-2">
                <select
                  className="form-select"
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                >
                  <option value="percent">% (Percent)</option>
                  <option value="flat">Flat</option>
                </select>
                <input
                  className="form-control"
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Value"
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Coupon (optional)</label>
                <input
                  className="form-control"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Coupon code"
                />
              </div>

              <div className="small text-muted">
                Discount preview: ₹{discountAmount.toFixed(2)}
              </div>
            </div>

            <div className="modal-footer gap-2">
              <button
                className="btn btn-secondary"
                onClick={() => dispatch(closeModal("discountPopup"))}
                disabled={loading}
              >
                Close
              </button>
              <button
                className="btn btn-success"
                onClick={handleApply}
                disabled={loading}
              >
                {loading ? "Applying..." : "Apply Discount"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiscountModal;
