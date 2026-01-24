// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   activeModal: null,
//   modalProps: {},
// };

// const modalSlice = createSlice({
//   name: "modal",
//   initialState,
//   reducers: {
//     openModal: (state, action) => {
//       state.activeModal = action.payload.modalType;
//       state.modalProps = action.payload.modalProps || {};
//     },
//     closeModal: (state) => {
//       state.activeModal = null;
//       state.modalProps = {};
//     },
//   },
// });

// export const { openModal, closeModal } = modalSlice.actions;
// export default modalSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   activeModal: null,
//   modalProps: {},
// };

// const modalSlice = createSlice({
//   name: "modal",
//   initialState,
//   reducers: {
//     openModal: (state, action) => {
//       state.activeModal = action.payload.modalName;
//       state.modalProps = action.payload.modalProps || {};
//     },
//     closeModal: (state) => {
//       state.activeModal = null;
//       state.modalProps = {};
//     },
//   },
// });

// export const { openModal, closeModal } = modalSlice.actions;
// export default modalSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  payload: {},
  options: {
    size: "md",             // sm | md | lg | xl | fullscreen
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


