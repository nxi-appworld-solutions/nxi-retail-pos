// src/api/easebuzzService.js
import { api } from "./api";

/**
 * Initiate Easebuzz Payment (calls backend)
 * This hits your .NET endpoint that creates the order + generates payment URL.
 */
export const initiateEasebuzzPayment = async (orderData) => {
  // console.log("🧾 initiateEasebuzzPayment called with:", orderData);
  return await api("/easebuzz/orders/initiate-payment", "POST", orderData);
};

/**
 * Update Payment Status (after success/failure redirect)
 */
export const updateEasebuzzPaymentStatus = async (statusData) => {
  return await api("/easebuzz/UpdatePaymentStatus", "POST", statusData);
};

/**
 * Fetch Payment Status by Order ID
 */
export const getEasebuzzPaymentStatus = async (orderId) => {
  return await api(`/easebuzz/status/${orderId}`, "GET");
};
