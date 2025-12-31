import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../core/redux/modalSlice";

const HoldOrderModal = ({ onSave }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modals.holdOrder);
  const cart = useSelector((state) => state.cart);
  const customer = useSelector((state) => state.posOrder.selectedCustomer);

  // Form state
  const [customerName, setCustomerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [priority, setPriority] = useState("normal");
  const [tag, setTag] = useState("counter"); // counter/takeaway/online/dinein
  const [note, setNote] = useState("");
  const [printSlip, setPrintSlip] = useState(true);

  // UX state
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // derived
  const itemCount = useMemo(
    () => Object.values(cart.items || {}).length,
    [cart.items]
  );
  const totalAmount = cart?.totalPayable ?? 0;

  // Keep formErrors in sync when fields change
  // We'll run a validation each render triggered by relevant fields
  useEffect(() => {
    setFormErrors(validate());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerName, mobile, tableNumber, tag, cart.items]);

  if (!isOpen) return null;

  // Validation function - returns errors object
  const validate = () => {
    const errors = {};

    // Items required
    if (!itemCount || itemCount === 0) {
      errors.items = "Cart is empty. Add items before holding the order.";
    }

    // If dinein, tableNumber required
    if (tag === "dinein" && (!tableNumber || tableNumber.trim() === "")) {
      errors.tableNumber = "Table / Token number is required for Dine In.";
    }

    // If mobile provided, validate digits and length
    if (mobile && mobile.trim() !== "") {
      const digits = mobile.replace(/\D/g, "");
      if (digits.length < 7) {
        errors.mobile = "Enter a valid mobile number (at least 7 digits).";
      }
      if (!/^\+?\d[\d\s-]*$/.test(mobile)) {
        // simple allowed characters check
        errors.mobile =
          "Mobile number should contain only digits and optional +.";
      }
    }

    return errors;
  };

  const handleSave = async () => {
    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      // Do not proceed; errors will be shown inline
      return;
    }

    setLoading(true);

    const payload = {
      holdId: "HLD-" + Date.now(),
      date: new Date().toISOString(),
      items: cart.items,
      totalAmount: totalAmount,
      itemCount: itemCount,

      // Advanced fields
      customer: {
        name:
          customerName && customerName.trim() !== ""
            ? customerName.trim()
            : "Walk-in",
        phone: mobile && mobile.trim() !== "" ? mobile.trim() : null,
      },
      tableNumber:
        tableNumber && tableNumber.trim() !== "" ? tableNumber.trim() : null,
      expectedReturn: expectedReturn || null,
      priority,
      tag,
      note: note || null,
      printSlip,
    };

    try {
      // onSave may save to server or local DB; await it
      if (onSave) {
        await onSave(payload);
      }
      // close modal after successful save
      dispatch(closeModal("holdOrder"));
    } catch (err) {
      // Show a generic error if onSave fails - you can enhance this to show server message
      setFormErrors({
        global: err?.message || "Failed to save hold. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div
        className="modal fade hold-order-modal show d-block"
        role="dialog"
        aria-modal="true"
        aria-labelledby="holdOrderModalLabel"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header bg-dark text-white">
              <h5 className="modal-title text-white">Advanced Hold Order</h5>
              <button
                type="button"
                className="modal-close-btnx"
                aria-label="Close"
                onClick={() => dispatch(closeModal("holdOrder"))}
              >
                ✖
              </button>
            </div>

            {/* Body */}
            <div className="modal-body">
              {/* Show global error */}
              {formErrors.global && (
                <div className="alert alert-danger small">
                  {formErrors.global}
                </div>
              )}

              {/* Customer Section */}
              {/* <h6 className="fw-bold mb-2">Customer Details</h6> */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label mb-1">
                    Customer Name (optional)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Customer Name"
                    value={customer?.name || customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label mb-1">
                    Mobile Number (optional)
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formErrors.mobile ? "is-invalid" : ""
                    }`}
                    placeholder="Mobile Number"
                    value={customer?.phone || mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                  {formErrors.mobile && (
                    <div className="invalid-feedback">{formErrors.mobile}</div>
                  )}
                </div>
              </div>

              <hr />

              {/* Additional Meta */}
              {/* <h6 className="fw-bold mb-2">Order Meta</h6> */}
              <div className="row mb-3">
                <div className="col-md-4">
                  <label className="form-label mb-1">
                    Table / Token Number{" "}
                    {tag === "dinein" && <span className="text-danger">*</span>}
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formErrors.tableNumber ? "is-invalid" : ""
                    }`}
                    placeholder="Table / Token Number"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                  />
                  {formErrors.tableNumber && (
                    <div className="invalid-feedback">
                      {formErrors.tableNumber}
                    </div>
                  )}
                </div>

                <div className="col-md-4">
                  <label className="form-label mb-1">
                    Expected Return Time (optional)
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(e.target.value)}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label mb-1">Priority</label>
                  <select
                    className="form-select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="urgent">Urgent</option>
                    <option value="normal">Normal</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
              </div>

              {/* Tags */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label mb-1">Tag</label>
                  <select
                    className="form-select"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                  >
                    <option value="counter">Counter</option>
                    <option value="takeaway">Takeaway</option>
                    <option value="online">Online Customer</option>
                    <option value="dinein">Dine In</option>
                  </select>
                </div>

                <div className="col-md-6 d-flex align-items-center">
                  <div className="d-flex align-items-center mt-4">
                    <input
                      id="printSlip"
                      type="checkbox"
                      className="me-2"
                      checked={printSlip}
                      onChange={() => setPrintSlip((v) => !v)}
                    />
                    <label htmlFor="printSlip" className="mb-0">
                      Print Hold Slip
                    </label>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="mb-3">
                <label className="form-label mb-1">Notes (optional)</label>
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Add notes / reason"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              <hr />

              {/* Summary */}
              <div className="bg-light p-3 rounded border">
                <div className="d-flex justify-content-between">
                  <strong>Items:</strong>
                  <span>{itemCount}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <strong>Total:</strong>
                  <span>₹{Number(totalAmount || 0).toFixed(2)}</span>
                </div>

                {formErrors.items && (
                  <div className="mt-2 text-danger small">
                    {formErrors.items}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer gap-3">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => dispatch(closeModal("holdOrder"))}
                disabled={loading}
              >
                Close
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
                disabled={loading || Object.keys(formErrors).length > 0}
              >
                {loading ? "Saving..." : "Save Hold Order"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HoldOrderModal;
