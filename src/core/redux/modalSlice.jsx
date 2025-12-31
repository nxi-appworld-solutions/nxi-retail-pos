// modalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modals",
  initialState: {
    holdOrder: false,
    holdOrderList: false,
    cancelOrder: false,
    splitPayment: false,
    discountPopup: false,
    recentTransactions: false,
    reset: false,
  },
  reducers: {
    openModal: (state, action) => { state[action.payload] = true; },
    closeModal: (state, action) => { state[action.payload] = false; },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
