import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  payload: {},
  options: {
    size: "md", // sm | md | lg | xl | fullscreen
    backdrop: true,
    closeOnEsc: true,
  },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { name, payload = {}, options = {} } = action.payload;

      state.name = name;
      state.payload = payload;
      state.options = {
        ...initialState.options,
        ...options,
      };
    },

    closeModal: () => initialState,
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
