
export const CUSTOMER_STATUS = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  BLACKLISTED: "Blacklisted",
};

export const TAX_TYPE = {
  REGULAR: "Regular",
  COMPOSITION: "Composition",
  CONSUMER: "Consumer",
  OVERSEAS: "Overseas",
};

export const WALK_IN_MOBILE = "0000000000";

export const validateCustomer = (c = {}) => {
  const errors = {};

  // Identity
  if (!c.name?.trim()) {
    errors.name = "Customer name is required";
  }

  // Contact
  if (!c.mobile || c.mobile.length < 10) {
    errors.mobile = "Valid mobile number is required";
  }

  // GST / Tax
  if (c.taxType === TAX_TYPE.REGULAR && !c.gstin) {
    errors.gstin = "GSTIN required for Regular GST customer";
  }

  // Finance
  if (Number(c.creditLimit) < 0) {
    errors.creditLimit = "Credit limit cannot be negative";
  }

  if (Number(c.defaultDiscount) < 0 || Number(c.defaultDiscount) > 100) {
    errors.defaultDiscount = "Discount must be between 0–100%";
  }

  // Status
  if (c.status === CUSTOMER_STATUS.BLACKLISTED) {
    errors.status = "Blacklisted customer cannot be used for billing";
  }

  return errors;
};

export const normalizeCustomer = (c = {}) => {
  const customer = { ...c };

  // Alias auto-fill
  if (!customer.alias && customer.name) {
    customer.alias = customer.name;
  }

  // WhatsApp auto-sync
  if (!customer.whatsapp && customer.mobile?.length === 10) {
    customer.whatsapp = customer.mobile;
  }

  // Default values safety
  customer.creditLimit = Number(customer.creditLimit || 0);
  customer.openingBalance = Number(customer.openingBalance || 0);
  customer.defaultDiscount = Number(customer.defaultDiscount || 0);

  return customer;
};

export const canSaveCustomer = (c = {}) => {
  const errors = validateCustomer(c);
  return Object.keys(errors).length === 0;
};

export const canStartBilling = (c = {}) => {
  if (!c.isSaved) return "Customer not saved";
  if (c.status === CUSTOMER_STATUS.BLACKLISTED)
    return "Customer is blacklisted";
  return true;
};

export const isDuplicateMobile = (mobile, customers = []) => {
  if (!mobile || mobile === WALK_IN_MOBILE) return false;
  return customers.some((c) => c.mobile === mobile);
};

export const createWalkInCustomer = () => ({
  name: "Walk-in Customer",
  mobile: WALK_IN_MOBILE,
  type: "Walk-in",
  status: CUSTOMER_STATUS.ACTIVE,
  isSaved: true,
});

export const getImagePreview = (file) => {
  if (!file) return null;
  return URL.createObjectURL(file);
};

export const isSectionComplete = (customer, fields = []) => {
  return fields.every(
    (field) =>
      customer[field] !== undefined &&
      customer[field] !== null &&
      customer[field].toString().trim() !== ""
  );
};
