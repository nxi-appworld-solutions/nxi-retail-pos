import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   items: {}, // { [productCode]: { ...product, quantity } }
//   total: 0,
//   charges: {
//     shipping: 0,
//     tax: 0,
//     coupon: 0,
//     discount: 0,
//     roundoff: 0, // will be calculated dynamically
//   },
//   subTotal: 0,
//   totalPayable: 0,
// };

const defaultCharges = {
  shipping: 0,
  tax: 5,
  coupon: 0,
  discount: 0,
  roundoff: 0,
};

const initialState = {
  items: {},
  total: 0,
  charges: { ...defaultCharges },
  subTotal: 0,
  totalPayable: 0,
};

// Load Cart from sessionStorage (Safe)
if (typeof window !== "undefined") {
  try {
    const saved = JSON.parse(sessionStorage.getItem("cartState"));
    if (saved) {
      initialState.items = saved.items || {};
      initialState.total = saved.total || 0;
      initialState.subTotal = saved.subTotal || 0;
      initialState.totalPayable = saved.totalPayable || 0;
      initialState.charges = { ...defaultCharges, ...(saved.charges || {}) };
    }
  } catch (err) {
    console.warn("⚠️ Failed to load cart from sessionStorage:", err);
  }
}

// Helper: Save Cart
function saveTosessionStorage(state) {
  if (typeof window === "undefined") return;
  const { items, total, subTotal, totalPayable, charges } = state;
  sessionStorage.setItem(
    "cartState",
    JSON.stringify({ items, total, subTotal, totalPayable, charges })
  );
}

//  Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload;
      const existing = state.items[product.code];
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items[product.code] = {
          ...product,
          quantity: 1,
          scannedAt: product.scannedAt || new Date().toLocaleTimeString(),
        };
      }
      cartSlice.caseReducers.recalculateTotal(state);
      saveTosessionStorage(state);
    },
    removeProduct: (state, action) => {
      delete state.items[action.payload];
      cartSlice.caseReducers.recalculateTotal(state);
      saveTosessionStorage(state);
    },
    updateQuantity: (state, action) => {
      const { code, quantity } = action.payload;
      console.log("Updating quantity for", code, "to", quantity);
      if (state.items[code]) {
        state.items[code].quantity = quantity;
      }
      cartSlice.caseReducers.recalculateTotal(state);
      saveTosessionStorage(state);
    },
    // 🔹 Increment quantity
    incrementQuantity: (state, action) => {
      const code = action.payload;
      if (state.items[code]) {
        state.items[code].quantity += 1;
      }
      cartSlice.caseReducers.recalculateTotal(state);
      saveTosessionStorage(state);
    },

    // Decrement quantity (and remove if zero)
    decrementQuantity: (state, action) => {
      const code = action.payload;
      if (state.items[code]) {
        state.items[code].quantity -= 1;
        if (state.items[code].quantity <= 0) {
          delete state.items[code];
        }
      }
      cartSlice.caseReducers.recalculateTotal(state);
      saveTosessionStorage(state);
    },
    clearCart: (state) => {
      state.items = {};
      state.total = 0;
      state.subTotal = 0;
      state.totalPayable = 0;
      state.charges = { ...defaultCharges };
      saveTosessionStorage(state);
    },
    // Update shipping/tax/discount dynamically
    updateCharges: (state, action) => {
      const { key, value } = action.payload;
      if (state.charges[key] !== undefined) {
        state.charges[key] = value;
        cartSlice.caseReducers.recalculateTotal(state);
        saveTosessionStorage(state);
      }
    },
    recalculateTotal: (state) => {
      state.total = Object.values(state.items).reduce(
        (sum, p) => sum + p.price * p.quantity,
        0
      );

      // Auto apply TAX when items > 5
      const itemCount = Object.keys(state.items).length;

      if (itemCount > 0) {
        state.charges.tax = parseFloat((state.total * 0.05).toFixed(2)); //5%
      } else {
        state.charges.tax = 0; // Otherwise no tax
      }

      // ✅ If cart is empty, reset charges except roundoff
      const isCartEmpty = itemCount === 0;
      // Object.keys(state.items).length === 0;
      if (isCartEmpty) {
        state.charges.shipping = 0;
        // state.charges.tax = 0;
        state.charges.coupon = 0;
        state.charges.discount = 0;
      }

      const { shipping, tax, coupon, discount } = state.charges;

      // Step 1: subtotal before roundoff
      let subTotal = parseFloat(
        (state.total + shipping + tax - coupon - discount).toFixed(2)
      );

      // Step 2: auto round to nearest 0.50 or 1.00
      // const rounded = Math.round(subTotal * 2) / 2; // nearest 0.50
      // const roundoff = parseFloat((rounded - subTotal).toFixed(2));
      const roundoff = 0; // nearest 1.00
      state.charges.roundoff = roundoff; // can be + or -
      state.subTotal = subTotal;
      state.totalPayable = parseFloat((subTotal + roundoff).toFixed(2));

      console.log("totalPayable", state.totalPayable);
    },
    // validateCartProducts: (state, action) => {
    //   const validList = action.payload || [];
    //   if (validList.length === 0) {
    //     console.warn(
    //       "⚠️ Skipping validation — no valid product codes received."
    //     );
    //     return;
    //   }

    //   const validCodes = new Set(validList);
    //   const removedItems = [];

    //   Object.keys(state.items).forEach((code) => {
    //     if (!validCodes.has(code)) {
    //       removedItems.push(state.items[code]?.name || code);
    //       delete state.items[code];
    //     }
    //   });

    //   if (removedItems.length > 0) {
    //     cartSlice.caseReducers.recalculateTotal(state);
    //     saveTosessionStorage(state);
    //     console.warn("🧹 Removed unavailable items:", removedItems);
    //   }
    // },
  },
});

// 🔹 Helper: persist cart to sessionStorage
// function saveTosessionStorage(state) {
//   sessionStorage.setItem("cartState", JSON.stringify(state));
// }

// function saveTosessionStorage(state) {
//   const { items, total, subTotal, totalPayable, charges } = state;
//   sessionStorage.setItem("cartState", JSON.stringify({ items, total, subTotal, totalPayable, charges }) );
// }

// 🔹 Selectors
export const selectCartItems = (state) => Object.values(state.cart.items);
export const selectCartCount = (state) => Object.keys(state.cart.items).length;
export const selectCartTotal = (state) => state.cart.total;
export const selectCharges = (state) => state.cart.charges;
export const selectTotalPayable = (state) => state.cart.totalPayable;

export const {
  addProduct,
  removeProduct,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  updateCharges,
  validateCartProducts,
} = cartSlice.actions;

export default cartSlice.reducer;
