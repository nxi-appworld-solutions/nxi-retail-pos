/* =========================
   PAGES (ROUTES)
========================= */
export { default as AddCustomer } from "./pages/AddCustomer";
export { default as CustomerList } from "./pages/CustomerList";

/* =========================
   HOOKS
========================= */
export { default as useCustomers } from "./hooks/useCustomers";

/* =========================
   CONSTANTS
========================= */
export { initialCustomer } from "./constants/initialCustomer";

/* =========================
   LOGIC (OPTIONAL EXPORT)
   ⚠️ Sirf hooks ke liye,
   components directly import na karein
========================= */
export * from "./customer.logic";
