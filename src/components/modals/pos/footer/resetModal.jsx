// src/components/modals/pos/ResetModal.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { closeModal } from "../../../../core/redux/store/modalSlice";
import { clearCart } from "../../../../core/redux/cartSlice";
import { resetPosOrderState } from "../../../../core/redux/posOrderSlice";

const ResetModal = ({ isOpen = true }) => {
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleReset = async () => {
    // if (!confirm) return toast.warning("Please check the confirmation box");
    setLoading(true);
    try {
      // perform reset: clear cart, clear holds (API/local), reset state
      dispatch(clearCart());
      dispatch(resetPosOrderState());
      // TODO: clear holds in DB/localStorage
      toast.success("POS reset complete");
      dispatch(closeModal("reset"));
    } catch (err) {
      toast.error("Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show" />
      <div className="modal fade show d-block" role="dialog" aria-modal="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-0">
              <div className="success-wrap text-center">
                <form>
                  <div className="icon-success bg-purple-transparent text-purple mb-2">
                    <i className="ti ti-transition-top" />
                  </div>
                  <h3 className="mb-2">Confirm Your Action</h3>
                  <p className="fs-16 mb-3">
                    The current order will be cleared. But not deleted if
                    it&apos;s persistent. Would you like to proceed ?
                  </p>
                  {/* <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      id="confirmReset"
                      type="checkbox"
                      checked={confirm}
                      onChange={() => setConfirm((v) => !v)}
                    />
                    <label className="form-check-label" htmlFor="confirmReset">
                      I understand the consequences. Clear session.
                    </label>
                  </div> */}
                  <div className="d-flex align-items-center justify-content-center gap-2 flex-wrap">
                    <button
                      type="button"
                      className="btn btn-md btn-secondary"
                      onClick={() => dispatch(closeModal("reset"))}
                    >
                      No, Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-md btn-primary"
                      onClick={handleReset}
                      disabled={loading}
                    >
                      {loading ? "Resetting..." : "Yes, Proceed"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetModal;
