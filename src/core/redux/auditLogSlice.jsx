// core/redux/auditLogSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entries: [], // append-only
};

const auditLogSlice = createSlice({
  name: "auditLog",
  initialState,
  reducers: {
    addAuditEntry(state, action) {
      state.entries.unshift(action.payload); // newest first
    },
    clearAuditLogs(state) {
      state.entries = [];
    },
  },
});

export const { addAuditEntry, clearAuditLogs } = auditLogSlice.actions;
export default auditLogSlice.reducer;
