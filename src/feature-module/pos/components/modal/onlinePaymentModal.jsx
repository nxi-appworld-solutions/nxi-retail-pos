import { useState } from "react";
import useModal from "../../../../routes/modal_root/useModal";
import GlobalLoaderOverlay from "../../../../components/loader/pos/globalLoaderOverlay";
import { useSelector } from "react-redux";
import useOrderFlow from "../../../../core/hooks/useOrderFlow";

const OnlinePaymentModal = () => {
  const { close, payload } = useModal();

  // 👉 payload me sirf data rakho (no functions)
  const { orderPayload } = payload || {};

  // 👉 cart se hook ko feed karo (same as PosOrder)
  const cart = useSelector((state) => state.cart);
  const { startOnlinePayment } = useOrderFlow(cart);

  const [loading, setLoading] = useState(false);
  const [loaderMessage, setLoaderMessage] = useState("");

  const handlePayment = async () => {
    if (!orderPayload) return;

    try {
      setLoading(true);
      setLoaderMessage("Initializing payment...");

      await startOnlinePayment({
        setLoaderMessage,
        setLoading,
      });

      // ⚠️ usually gateway redirect karega, yahan close mat karo
      // close();  // optional based on your flow
    } catch (err) {
      console.error(err);
      setLoading(false);
      setLoaderMessage("");
    }
  };

  return (
    <div className="modal-content p-3 rounded-4 shadow-lg border-0">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
        <h5 className="fw-bold m-0">Online Payment</h5>
      </div>

      {/* BODY */}
      <div className="text-center py-3">
        <GlobalLoaderOverlay
          visible={loading || !!loaderMessage}
          message={loaderMessage || (loading ? "Initializing payment..." : "")}
        />

        {!loading && (
          <>
            <h5 className="fw-semibold mb-2">Proceed to Online Payment</h5>

            <p className="text-muted mb-3">
              You will be redirected to a secure payment gateway.
            </p>

            {/* 🔥 optional icons (UX improve) */}
            <div className="d-flex justify-content-center gap-2 mb-3">
              <span className="badge bg-light text-dark">UPI</span>
              <span className="badge bg-light text-dark">Card</span>
              <span className="badge bg-light text-dark">NetBanking</span>
            </div>
          </>
        )}
      </div>

      {/* FOOTER */}
      {!loading && (
        <div className="d-flex gap-2">
          <button className="btn btn-light w-50" onClick={close}>
            Cancel
          </button>

          <button
            className="btn btn-primary w-50 fw-semibold"
            onClick={handlePayment}
            disabled={!orderPayload}
          >
            Pay Now
          </button>
        </div>
      )}
    </div>
  );
};

export default OnlinePaymentModal;
