// src/components/modals/pos/CancelOrderModal.jsx
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import usePos from "../../../../hooks/usePos";
// import { closeModal } from "../../../../core/redux/modalSlice";

// const cancelReasons = [
//   "Customer changed mind",
//   "Item unavailable",
//   "Duplicate order",
//   "Wrong order placed",
//   "Other",
// ];

// const CancelOrderModal = ({ order = null, onCancelled }) => {
//   const dispatch = useDispatch();
//   const { cancelOrder } = usePos(); // should call API to cancel and optionally refund
//   const [reason, setReason] = useState(cancelReasons[0]);
//   const [customReason, setCustomReason] = useState("");
//   const [refundAmount, setRefundAmount] = useState(order?.totalAmount || 0);
//   const [restock, setRestock] = useState(true);
//   const [loading, setLoading] = useState(false);

//   // if (!isOpen) return null;

//   const handleCancel = async () => {
//     if (!order) return toast.error("No order selected.");
//     const payload = {
//       orderId: order.orderId,
//       refundAmount,
//       reason: reason === "Other" ? customReason : reason,
//       restock,
//     };

//     setLoading(true);
//     try {
//       const res = await cancelOrder(payload); // implement in usePos
//       toast.success("Order cancelled successfully");
//       onCancelled?.(res);
//       dispatch(closeModal("cancelOrder"));
//     } catch (err) {
//       toast.error(err?.message || "Failed to cancel order");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="modal-backdrop fade show" />
//       <div className="modal fade show d-block" role="dialog" aria-modal="true">
//         <div className="modal-dialog modal-md modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-header bg-danger text-white">
//               <h5 className="modal-title text-white">Cancel Order</h5>
//               <button
//                 type="button"
//                 className="modal-close-btnx"
//                 aria-label="Close"
//                 onClick={() => dispatch(closeModal("cancelOrder"))}
//               >
//                 ✖
//               </button>
//             </div>

//             <div className="modal-body">
//               <div className="mb-2">
//                 <strong>Order:</strong>{" "}
//                 {order?.orderNo || order?.OrderNo || "-"}
//               </div>
//               <div className="mb-2">
//                 <strong>Amount:</strong> ₹
//                 {Number(order?.totalAmount || 0).toFixed(2)}
//               </div>

//               <label className="form-label">Cancel reason</label>
//               <select
//                 className="form-select mb-2"
//                 value={reason}
//                 onChange={(e) => setReason(e.target.value)}
//               >
//                 {cancelReasons.map((r) => (
//                   <option key={r} value={r}>
//                     {r}
//                   </option>
//                 ))}
//               </select>

//               {reason === "Other" && (
//                 <input
//                   className="form-control mb-2"
//                   placeholder="Custom reason"
//                   value={customReason}
//                   onChange={(e) => setCustomReason(e.target.value)}
//                 />
//               )}

//               <label className="form-label">Refund amount (optional)</label>
//               <input
//                 type="number"
//                 className="form-control mb-2"
//                 value={refundAmount}
//                 onChange={(e) => setRefundAmount(Number(e.target.value))}
//               />

//               <div className="form-check mb-2">
//                 <input
//                   className="form-check-input"
//                   type="checkbox"
//                   checked={restock}
//                   onChange={() => setRestock((v) => !v)}
//                   id="restock"
//                 />
//                 <label className="form-check-label" htmlFor="restock">
//                   Return items to inventory
//                 </label>
//               </div>

//               <div className="text-muted small">
//                 Cancelled orders are audited and cannot be un-cancelled.
//               </div>
//             </div>

//             <div className="modal-footer gap-2">
//               <button
//                 className="btn btn-secondary"
//                 onClick={() => dispatch(closeModal("cancelOrder"))}
//                 disabled={loading}
//               >
//                 Close
//               </button>
//               <button
//                 className="btn btn-danger"
//                 onClick={handleCancel}
//                 disabled={loading}
//               >
//                 {loading ? "Cancelling..." : "Confirm Cancel"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CancelOrderModal;


import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../../core/redux/modalSlice";
import { addAuditEntry } from "../../../../core/redux/auditLogSlice";
import { pushAlert } from "../../../../core/redux/alertsSlice";
// optional action to update order status in your orders store
// import { markOrderCancelled, voidOrderItems } from '../../../../core/redux/ordersSlice';

const CancelOrderModal = ({ order = {}, user = { id: 'staff-1', name: 'Staff' }, onClose }) => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState("cancel"); // cancel | void | item_void
  const [reason, setReason] = useState("Customer changed mind");
  const [refundAmount, setRefundAmount] = useState(order.totalAmount || 0);
  const [returnItems, setReturnItems] = useState(true);
  const [note, setNote] = useState("");
  const [pin, setPin] = useState("");

  // item-level state: allow selecting quantities to void
  const itemsArr = (order.items || []).map((it, idx) => ({
    ...it,
    _idx: idx,
    voidQty: 0,
  }));
  const [itemState, setItemState] = useState(itemsArr);

  const CANCEL_REASONS = [
    "Customer changed mind",
    "Item not available",
    "Wait time too long",
    "Wrong item selected",
    "Staff mistake",
  ];
  const VOID_REASONS = [
    "Wrong billing",
    "Duplicate order",
    "Fraud correction",
    "Stock negative mismatch",
  ];

  const handleItemQtyChange = (idx, qty) => {
    setItemState((s) => s.map(it => it._idx === idx ? {...it, voidQty: Math.max(0, Math.min(qty, it.qty))} : it));
    // recalc refundAmount automatically
    const totalRefund = itemState.reduce((sum, it) => {
      const v = it._idx === idx ? Math.max(0, Math.min(qty, it.qty)) : it.voidQty;
      return sum + v * (it.price || 0);
    }, 0);
    setRefundAmount(totalRefund);
  };

  const handleSubmit = () => {
    if (mode === "void" && (!pin || pin.length < 4)) {
      return alert("Manager PIN required for VOID");
    }

    // build audit entry
    const entry = {
      id: `audit-${Date.now()}-${Math.floor(Math.random()*9999)}`,
      type: mode === "item_void" ? "item_void" : (mode === "void" ? "void" : "cancel"),
      orderId: order.orderId,
      orderNo: order.orderNo,
      user: { id: user.id, name: user.name, role: user.role || "cashier" },
      items: mode === "item_void" ? itemState.filter(i => i.voidQty > 0).map(i => ({
        sku: i.sku,
        name: i.name,
        qty: i.qty,
        voidQty: i.voidQty,
        amount: (i.price || 0) * i.voidQty
      })) : (order.items || []).map(i => ({ sku: i.sku, name: i.name, qty: i.qty, amount: (i.price||0) * i.qty })),
      reason,
      refundAmount: Number(refundAmount) || 0,
      returnToInventory: !!returnItems,
      note,
      managerPinUsed: !!pin,
      timestamp: new Date().toISOString(),
    };

    // Dispatch audit log
    dispatch(addAuditEntry(entry));

    // OPTIONAL: update order status in orders reducer / backend api call
    // if (mode === "cancel") dispatch(markOrderCancelled({ orderId: order.orderId, refund: entry.refundAmount }));
    // if (mode === "void") dispatch(voidOrderItems({ orderId: order.orderId, items: entry.items }));

    // Optionally push a low-level alert summary
    if (entry.type === "void" || entry.type === "item_void") {
      dispatch(pushAlert({
        id: `alert-${Date.now()}-${Math.floor(Math.random()*9999)}`,
        level: "warning",
        title: `Void performed by ${user.name}`,
        details: { orderNo: order.orderNo, refundAmount: entry.refundAmount },
        createdAt: new Date().toISOString(),
        resolved: false,
      }));
    }

    // Close modal
    dispatch(closeModal("cancelOrder"));
    onClose?.();
  };

  return (
    <>
      <div className="modal-backdrop fade show" />
      <div className="modal fade show d-block" role="dialog" aria-modal="true">
        <div className="modal-dialog modal-md modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">{mode === "void" ? "Void Order" : mode === "item_void" ? "Void Items" : "Cancel Order"}</h5>
              <button className="btn-close btn-close-white" onClick={onClose} />
            </div>

            <div className="modal-body">
              {/* mode selector */}
              <div className="btn-group mb-3 w-100">
                <button className={`btn ${mode==="cancel" ? "btn-danger" : "btn-outline-secondary"}`} onClick={() => setMode("cancel")}>Cancel</button>
                <button className={`btn ${mode==="void" ? "btn-dark" : "btn-outline-secondary"}`} onClick={() => setMode("void")}>Void</button>
                <button className={`btn ${mode==="item_void" ? "btn-warning" : "btn-outline-secondary"}`} onClick={() => setMode("item_void")}>Item-level Void</button>
              </div>

              <p className="mb-1"><strong>Order:</strong> {order.orderNo || "-"}</p>
              <p className="mb-3"><strong>Amount:</strong> ₹{order.totalAmount || 0}</p>

              <label className="form-label">Reason</label>
              <select className="form-select" value={reason} onChange={(e) => setReason(e.target.value)}>
                {(mode === "void" ? VOID_REASONS : CANCEL_REASONS).map((r,i) => <option key={i} value={r}>{r}</option>)}
              </select>

              {mode === "item_void" && (
                <>
                  <div className="mt-3">
                    <small className="text-muted">Select quantity to void (per item)</small>
                    {itemState.map(it => (
                      <div key={it._idx} className="d-flex align-items-center gap-2 my-2">
                        <div style={{flex:1}}>
                          <div><strong>{it.name}</strong> <small className="text-muted">x{it.qty}</small></div>
                          <div className="small text-muted">₹{it.price}</div>
                        </div>
                        <div style={{width:140}}>
                          <input type="number" className="form-control" value={it.voidQty} min={0} max={it.qty}
                                 onChange={(e)=> handleItemQtyChange(it._idx, Number(e.target.value) || 0)} />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {mode !== "item_void" && (
                <>
                  <label className="form-label mt-3">Refund amount (optional)</label>
                  <input type="number" className="form-control" value={refundAmount} onChange={(e)=> setRefundAmount(e.target.value)} />
                </>
              )}

              <div className="form-check mt-3">
                <input className="form-check-input" type="checkbox" checked={returnItems} onChange={() => setReturnItems(!returnItems)} />
                <label className="form-check-label">Return items to inventory</label>
              </div>

              {mode === "void" && (
                <>
                  <label className="form-label mt-3">Manager PIN</label>
                  <input type="password" className="form-control" value={pin} onChange={(e)=> setPin(e.target.value)} placeholder="Enter 4-digit PIN if required" />
                </>
              )}

              <label className="form-label mt-3">Note (optional)</label>
              <textarea className="form-control" value={note} onChange={(e)=> setNote(e.target.value)} />

              <p className="text-muted small mt-2">{ mode === "cancel" ? "Cancelling removes the order from open sales." : "Voiding logs the action and requires manager PIN." }</p>
            </div>

            <div className="modal-footer">
              <button className="btn btn-light" onClick={onClose}>Close</button>
              <button className={`btn ${mode==="cancel" ? "btn-danger" : mode==="void" ? "btn-dark" : "btn-warning"}`} onClick={handleSubmit}>Confirm {mode==="cancel" ? "Cancel" : mode==="void" ? "Void" : "Void Items"}</button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default CancelOrderModal;
