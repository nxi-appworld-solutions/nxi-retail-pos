import { createSlice } from "@reduxjs/toolkit";

const LOCAL_KEY = "pos_storeType";

const initialState = {
  storeType: localStorage.getItem("LOCAL_KEY") || "retail",
};

const storeTypeSlice = createSlice({
  name: "storeType",
  initialState,
  reducers: {
    setStoreType(state, action) {
      state.storeType = action.payload;
      localStorage.setItem(LOCAL_KEY, action.payload);
    },
  },
});

export const { setStoreType } = storeTypeSlice.actions;
export const selectStoreType = (state) => state.storeType?.storeType;

export default storeTypeSlice.reducer;
