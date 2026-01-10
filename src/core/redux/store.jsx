import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import themeSettingSlice from "./themeSettingSlice";
import transactionReducer from "./transactionSlice";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";
import posOrderSlice from "./posOrderSlice";
import storeTypeReducer from "./storeTypeSlice";
import modalReducer from "./store/modalSlice";

import {
  registerCrossTabListener,
  storeTypeMiddleware,
} from "./middleware/storeTypeMiddleware";
import { fraudDetectionMiddleware } from "./middleware/fraudDetectionMiddleware";

const store = configureStore({
  reducer: {
    rootReducer: rootReducer,
    themeSetting: themeSettingSlice,
    transaction: transactionReducer,
    storeType: storeTypeReducer,
    cart: cartReducer,
    posOrder: posOrderSlice,
    order: orderReducer,
    modal: modalReducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(storeTypeMiddleware, fraudDetectionMiddleware),
});

// Enable cross-tab syncing
registerCrossTabListener(store);

export default store;
