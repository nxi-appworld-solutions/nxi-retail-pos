import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeModal: null,     // e.g. "CATEGORY", "BRAND"
  modalData: null,       // edit data / payload
};

const uiModalSlice = createSlice({
  name: "uiModal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.activeModal = action.payload.modalName;
      state.modalData = action.payload.data || null;
    },
    closeModal: (state) => {
      state.activeModal = null;
      state.modalData = null;
    },
  },
});

export const { openModal, closeModal } = uiModalSlice.actions;
export default uiModalSlice.reducer;
