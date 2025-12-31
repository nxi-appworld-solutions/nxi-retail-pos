import React from "react";
import { useSelector } from "react-redux";

const AuditLogViewer = () => {
  const logs = useSelector(s => s.auditLog.entries);

  if (!logs || logs.length === 0) return <div className="p-3 text-muted">No audit logs</div>;

  return (
    <div className="p-3">
      <h5>Audit Logs</h5>
      {logs.map(l => (
        <div className="card mb-2" key={l.id}>
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div>
                <strong>{l.type.toUpperCase()}</strong> • Order: {l.orderNo} • By: {l.user?.name}
                <div className="small text-muted">{new Date(l.timestamp).toLocaleString()}</div>
              </div>
              <div className="text-end">
                <div>Refund: ₹{l.refundAmount}</div>
                <div className="small">{l.reason}</div>
              </div>
            </div>
            {l.items && (
              <div className="mt-2 small">
                {l.items.map((it, idx) => <div key={idx}>{it.name} x{it.voidQty || it.qty} • ₹{it.amount}</div>)}
              </div>
            )}
            {l.note && <div className="mt-2 small text-muted">Note: {l.note}</div>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AuditLogViewer;
