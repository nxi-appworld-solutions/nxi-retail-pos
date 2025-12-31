import { createSlice } from "@reduxjs/toolkit";

const posOrderSlice = createSlice({
  name: "posOrder",
  initialState: {
    selectedCustomer: null,
    selectedPayment: null,
    isPaymentModalOpen: false,
    isConfirmationOpen: false,
    confirmationStatus: null,
    confirmationData: null,
    showSuccessScreen: false,
    cashReceived: 0,
    payload: null,
    posLoading: false,
    loadingInit: false,
    loaderMessage: "",
  },
  reducers: {
    setSelectedCustomer: (state, action) => {
      state.selectedCustomer = action.payload;
    },
    clearSelectedCustomer: (state) => {
      state.selectedCustomer = null;
    },
    setSelectedPayment: (state, action) => {
      state.selectedPayment = action.payload;
    },
    clearSelectedPayment: (state) => {
      state.selectedPayment = "cash";
    },
    resetPosOrderState: (state) => {
      state.selectedCustomer = null;
      state.selectedPayment = "cash";
    },
  },
});

export const {
  setSelectedCustomer,
  clearSelectedCustomer,
  setSelectedPayment,
  clearSelectedPayment,
  resetPosOrderState,
} = posOrderSlice.actions;

export default posOrderSlice.reducer;
