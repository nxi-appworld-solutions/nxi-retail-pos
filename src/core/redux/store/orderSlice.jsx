// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { saveOrder, finalizeInvoice, getPaymentStatus } from "../../services/orderService";

// // 🔹 1️⃣ Create Order (Save order on backend)
// export const createOrderThunk = createAsyncThunk(
//   "order/createOrder",
//   async (orderPayload, { rejectWithValue }) => {
//     try {
//       const response = await saveOrder(orderPayload); // call API
//       return response; // { orderNo, status }
//     } catch (err) {
//       return rejectWithValue(err.message || "Order creation failed");
//     }
//   }
// );

// // 🔹 2️⃣ Finalize Invoice (Mark as paid + generate invoice)
// export const finalizeInvoiceThunk = createAsyncThunk(
//   "order/finalizeInvoice",
//   async ({ orderNo, paymentInfo }, { rejectWithValue }) => {
//     try {
//       const response = await finalizeInvoice(orderNo, paymentInfo); // call API
//       return response; // { invoiceNo, billData }
//     } catch (err) {
//       return rejectWithValue(err.message || "Invoice finalization failed");
//     }
//   }
// );

// // 🔹 3️⃣ Poll Payment Status (optional, for online polling)
// export const pollPaymentStatusThunk = createAsyncThunk(
//   "order/pollPaymentStatus",
//   async ({ txnId }, { rejectWithValue }) => {
//     try {
//       const response = await getPaymentStatus(txnId);
//       return response; // { status, gatewayTxnId, bankRefNo }
//     } catch (err) {
//       return rejectWithValue(err.message || "Polling failed");
//     }
//   }
// );

// // 🔹 Initial State
// const initialState = {
//   currentOrderNo: null,
//   invoiceNo: null,
//   billData: null,
//   status: "idle",
//   error: null,
//   paymentStatus: "idle",
// };

// // 🔹 Slice
// const orderSlice = createSlice({
//   name: "order",
//   initialState,
//   reducers: {
//     resetOrderState: () => initialState,
//   },
//   extraReducers: (builder) => {
//     builder
//       // Create Order
//       .addCase(createOrderThunk.pending, (state) => {
//         state.status = "creating";
//         state.error = null;
//       })
//       .addCase(createOrderThunk.fulfilled, (state, action) => {
//         state.status = "created";
//         state.currentOrderNo = action.payload.orderNo;
//       })
//       .addCase(createOrderThunk.rejected, (state, action) => {
//         state.status = "error";
//         state.error = action.payload;
//       })

//       // Finalize Invoice
//       .addCase(finalizeInvoiceThunk.pending, (state) => {
//         state.status = "finalizing";
//       })
//       .addCase(finalizeInvoiceThunk.fulfilled, (state, action) => {
//         state.status = "finalized";
//         state.invoiceNo = action.payload.invoiceNo;
//         state.billData = action.payload.billData;
//       })
//       .addCase(finalizeInvoiceThunk.rejected, (state, action) => {
//         state.status = "error";
//         state.error = action.payload;
//       })

//       // Poll Payment Status
//       .addCase(pollPaymentStatusThunk.pending, (state) => {
//         state.paymentStatus = "pending";
//       })
//       .addCase(pollPaymentStatusThunk.fulfilled, (state, action) => {
//         state.paymentStatus = action.payload.status;
//       })
//       .addCase(pollPaymentStatusThunk.rejected, (state, action) => {
//         state.paymentStatus = "failed";
//         state.error = action.payload;
//       });
//   },
// });

// export const { resetOrderState } = orderSlice.actions;
// export const selectOrder = (state) => state.order;
// export default orderSlice.reducer;
