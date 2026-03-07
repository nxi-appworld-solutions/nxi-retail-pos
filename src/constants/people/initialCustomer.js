// export const initialCustomer = {
//   /* =========================
//      IDENTITY / MASTER
//   ========================== */
//   id: null,
//   code: "",
//   name: "",
//   alias: "",
//   type: "",               // Sundry Debtors / Creditors / Walk-in
//   group: "General",       // Pricing group
//   tags: "",
//   image: null,            // Profile photo / logo

//   /* =========================
//      CONTACT / COMMUNICATION
//   ========================== */
//   mobile: "",
//   whatsapp: "",
//   email: "",
//   alternateMobile: "",
//   website: "",

//   pref_SMS: false,
//   pref_WhatsApp: false,
//   pref_Email: false,

//   language: "English",

//   /* =========================
//      ADDRESS / LOCATION
//   ========================== */
//   billingAddress: "",
//   shippingAddress: "",
//   city: "",
//   pincode: "",
//   state: "",
//   stateCode: "",
//   country: "India",

//   deliveryZone: "",
//   latlong: "",

//   /* =========================
//      FINANCIAL / ACCOUNTS
//   ========================== */
//   creditLimit: 0,
//   creditDays: 0,
//   gracePeriod: 0,

//   openingBalance: 0,
//   balanceType: "Debit",

//   currentOutstanding: 0,

//   lateInterest: 0,

//   preferredPaymentMode: "Cash",
//   priceList: "Standard",
//   defaultDiscount: 0,

//   bankAccount: "",

//   isCreditBlocked: false,
//   billByBill: true,

//   /* =========================
//      TAX / LEGAL
//   ========================== */
//   taxType: "Consumer",      // Regular / Composition / Consumer
//   gstin: "",
//   pan: "",
//   aadhar: "",
//   cin: "",

//   isTaxExempt: false,
//   stateCodePOS: "",         // Place of Supply (if needed separately)

//   /* =========================
//      LOYALTY / REWARDS
//   ========================== */
//   pointsBalance: 0,
//   pointValue: 1,
//   minRedeemPoints: 0,

//   membershipLevel: "Silver",
//   membershipId: "",
//   autoEnroll: true,

//   lastRedemption: null,

//   /* =========================
//      CRM / RELATIONSHIP
//   ========================== */
//   notes: "",
//   interests: "",
//   communication: "SMS",
//   rating: "3",
//   potentialVolume: 0,
//   nextFollowUp: null,

//   /* =========================
//      SYSTEM / CONTROL
//   ========================== */
//   status: "Active",        // Active / Inactive / Blacklisted
//   hasPortalAccess: false,

//   lifetimeValue: 0,
//   lastPurchaseDate: null,

//   /* =========================
//      AUDIT / META
//   ========================== */
//   createdBy: "",
//   createdDate: null,
//   modifiedBy: "",
//   modifiedDate: null,

//   isSaved: false
// };
export const initialCustomerV2 = {
  /* ================= CORE ================= */
  id: null,
  code: "",
  name: "",
  alias: "",
  customerType: "RETAIL", // RETAIL | WHOLESALE | WALK_IN | ONLINE
  tags: "",
  image: null,
  status: "ACTIVE", // ACTIVE | BLOCKED | INACTIVE

  /* ================= CONTACT ================= */
  mobile: "",
  alternateMobile: "",
  email: "",
  whatsapp: "",
  website: "",
  language: "English",

  /* ================= ADDRESS ================= */
  billingAddress: "",
  shippingAddress: "",
  city: "",
  pincode: "",
  state: "",
  stateCode: "",
  country: "India",

  shippingCity: "",
  shippingPincode: "",
  shippingState: "",
  shippingCountry: "India",

  /* ================= FINANCIAL ================= */
  openingBalance: 0,
  openingBalanceType: "DEBIT", // DEBIT | CREDIT

  creditLimit: 0,
  creditDays: 0,
  gracePeriod: 0,
  strictCreditStop: true,
  currentOutstanding: 0,

  defaultPaymentMode: "CASH", // CASH | UPI | CREDIT
  priceList: "STANDARD",

  /* ================= BANK ================= */
  bankName: "",
  bankAccountHolder: "",
  bankAccountNumber: "",
  bankIFSC: "",

  /* ================= GST ================= */
  isGSTEnabled: false,
  gstType: "UNREGISTERED", // REGULAR | COMPOSITION | UNREGISTERED
  gstin: "",
  placeOfSupply: "",

  /* ================= CONFIG ================= */
  config: {
    allowCredit: false,
    allowPartialPayment: false,
    allowDiscount: false,
    maxDiscountPercent: 0,

    sendWhatsappInvoice: true,
    sendEmailInvoice: false,

    billByBill: true,
    isBlocked: false,
  },

  /* ================= META ================= */
  notes: "",
  rating: 3,
  loyaltyPoints: 0,

  lastTransactionDate: null,
  totalSales: 0,

  createdBy: "",
  createdDate: null,
  modifiedBy: "",
  modifiedDate: null,
};
