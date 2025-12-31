// src/redux/slices/purchaseSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactionType: "purchase", // purchase | sale | transfer
  products: [],
  totals: {
    subTotal: 0,
    tax: 0,
    discount: 0,
    shipping: 0,
    grandTotal: 0,
  },
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransactionType: (state, action) => {
      state.transactionType = action.payload;
      state.products = [];
      state.totals = initialState.totals;
    },

    addProduct: (state, action) => {
      const product = action.payload;
      const exists = state.products.find((p) => p.code === product.code);
      if (exists) {
        exists.qty += 1;
        exists.totalCost = parseFloat((exists.qty * exists.price).toFixed(2));
      } else {
        state.products.push({
          ...product,
          qty: 1,
          discount: product.discount || 0,
          // taxPer: product.taxPer || 0,
          // taxAmt: product.taxAmt || 0,
          // totalCost: product.price, // qty=1 ke liye by default
          taxPer: 5, // API se aaye to wahi set hoga
          taxAmt: parseFloat(((product.price * 5) / 100).toFixed(2)),
          totalCost: parseFloat((product.price).toFixed(2)), // qty=1 ke liye by default
          // totalCost: product.price + (product.price * 18) / 100, // qty=1 ke liye by default
        });
      }
      transactionSlice.caseReducers.calculateTotals(state);
    },

    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (p) => p.code !== action.payload.code
      );
      transactionSlice.caseReducers.calculateTotals(state);
    },
    updateQty: (state, action) => {
      const { code, qty, taxPer = 5 } = action.payload;
      const prod = state.products.find((p) => p.code === code);
      if (prod) {
        prod.qty = parseFloat((qty).toFixed(2));
        prod.taxAmt = parseFloat(((qty * prod.price * taxPer) / 100).toFixed(2));
        prod.totalCost = parseFloat((qty * prod.price).toFixed(2));
        // prod.totalCost = qty * prod.price + (qty * prod.price * taxPer) / 100;
      }
      transactionSlice.caseReducers.calculateTotals(state);
    },

    // updatePrice: (state, action) => {
    //   const { code, price } = action.payload;
    //   const prod = state.products.find((p) => p.code === code);
    //   if (prod) {
    //     prod.price = price;
    //     prod.totalCost = prod.qty * price;
    //   }
    //   transactionSlice.caseReducers.calculateTotals(state);
    // },
    updatePrice: (state, action) => {
      const { code, price, discount, taxPer } = action.payload;
      const product = state.products.find((p) => p.code === code);
      if (product) {
        if (price !== undefined) product.price = price;
        if (discount !== undefined) product.discount = discount;
        if (taxPer !== undefined) {
          product.taxPer = parseFloat((taxPer).toFixed(2));
          product.taxAmt = parseFloat(((product.price * product.qty * taxPer) / 100).toFixed(2));
        }
        product.totalCost = parseFloat((product.qty * product.price - (product.discount || 0) + (product.taxAmt || 0)).toFixed(2));
      }
      transactionSlice.caseReducers.calculateTotals(state);
    },

    calculateTotals: (state) => {
      const subTotal = state.products.reduce((sum, p) => sum + p.totalCost, 0);
      const tax = state.products.reduce((sum, p) => sum + p.taxAmt || 0, 0);

      //   const discount = 0; // TODO: global discount logic
      //   const shipping = 0; // TODO: add shipping
      const discount = state.products.reduce(
        (sum, p) => sum + (p.discount || 0),
        0
      );

      const shipping = parseFloat((state.totals.shipping).toFixed(2)) || 0;

      state.totals = {
        subTotal,
        tax,
        discount,
        shipping,
        grandTotal: parseFloat((subTotal + tax - discount + shipping).toFixed(2)),
      };
    },

    setShipping: (state, action) => {
      state.totals.shipping = action.payload;
      transactionSlice.caseReducers.calculateTotals(state);
    },

    // 🆕 Reset Transaction (for Purchase/Sale/Transfer)
    resetTransaction: () => initialState,
  },
});

export const {
  setTransactionType,
  addProduct,
  removeProduct,
  updateQty,
  updatePrice,
  calculateTotals,
  setShipping,
  resetTransaction,
} = transactionSlice.actions;

export default transactionSlice.reducer;
