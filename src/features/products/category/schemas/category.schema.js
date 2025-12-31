// export const CATEGORY_LEVELS = {
//   CATEGORY: "CATEGORY",
//   SUBCATEGORY: "SUBCATEGORY",
// };

// export const defaultCategory = {
//   id: "",
//   name: "",
//   code: "",

//   parentId: null,
//   level: CATEGORY_LEVELS.CATEGORY,

//   description: "",

//   // POS Rules
//   visibleInPOS: true,
//   allowDiscount: true,
//   allowReturns: true,
//   allowOpenPrice: false,
//   allowFractionalQty: false,
//   directScan: true,
//   printKOT: false,

//   // Pricing
//   defaultMargin: "",
//   minMargin: "",
//   priceRounding: "NONE",

//   // Tax
//   taxCategory: "Taxable",
//   gstRate: 18,
//   hsn: "",
//   cess: 0,

//   // Inventory
//   stockTracking: "INHERIT",
//   expiryRequired: false,

//   // Analytics
//   fastMoving: false,

//   // System
//   status: "Active",
//   createdAt: "",
//   updatedAt: "",
// };

export const categoryState = {
  name: "",
  code: "", // e.g., CAT001
  parentCategory: null, // Agar null hai toh 'Main Category', agar ID hai toh 'Sub-Category'
  description: "",
  image: null,
  
  // Intelligence Settings
  hsnCode: "", // Default HSN for this category
  gstRate: "18", // Inheritance: Items in this category will auto-pick this GST
  commissionPercent: 0, // Sales commission for this category
  
  // Display settings
  visibleInPOS: true,
  onlineStatus: "Active",
  colorCode: "#4e73df" // POS Grid par identify karne ke liye color
};