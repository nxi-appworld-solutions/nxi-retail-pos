// core/redux/alertsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [], // { id, level, title, details, createdAt, resolved }
};

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    pushAlert(state, action) {
      state.list.unshift(action.payload);
    },
    resolveAlert(state, action) {
      state.list = state.list.map(a => a.id === action.payload ? {...a, resolved:true} : a);
    },
    clearAlerts(state) {
      state.list = [];
    }
  }
});

export const { pushAlert, resolveAlert, clearAlerts } = alertsSlice.actions;
export default alertsSlice.reducer;
