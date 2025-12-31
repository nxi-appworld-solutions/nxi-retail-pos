// core/redux/middleware/fraudDetectionMiddleware.js
import { pushAlert } from "../alertsSlice";
import { addAuditEntry } from "../auditLogSlice";

/**
 * Simple in-memory sliding window tracker per user.
 * Production: consider storing server-side or persistent store.
 */
export const fraudDetectionMiddleware = (store) => {
  const WINDOW_MIN = 10; // minutes
  const VOID_THRESHOLD = 5; // threshold within window
  const events = {}; // { userId: [ timestamps ] }

  const prune = (arr, windowMs) => arr.filter(ts => (Date.now() - ts) <= windowMs);

  return (next) => (action) => {
    const result = next(action);

    // Listen for audit-worthy actions (we dispatch audit actions from Cancel modal)
    if (action.type === "audit/addAuditEntry") {
      const payload = action.payload;
      // item-level void or order-level void/cancel
      if (payload.type === "void" || payload.type === "item_void") {
        const userId = payload.user?.id || "unknown";
        events[userId] = prune((events[userId] || []).concat(Date.now()), WINDOW_MIN * 60 * 1000);

        if ((events[userId] || []).length >= VOID_THRESHOLD) {
          // push an alert
          store.dispatch(pushAlert({
            id: `alert-${Date.now()}-${Math.floor(Math.random()*9999)}`,
            level: "critical",
            title: `High void/cancel activity: ${payload.user?.name || userId}`,
            details: {
              userId,
              userName: payload.user?.name,
              windowMinutes: WINDOW_MIN,
              voidCount: events[userId].length,
              threshold: VOID_THRESHOLD,
            },
            createdAt: new Date().toISOString(),
            resolved: false,
          }));
        }
      }
    }

    return result;
  };
};
