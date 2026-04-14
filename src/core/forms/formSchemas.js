export const categoryFormSchema = {
  code: 0,
  name: "",
  alias: "",
  status: true,
};

export const subCategoryFormSchema = {
  categoryId: null,
  code: 0,
  name: "",
  alias: "",
  description: "",
  image: null,
  status: true,
};

export const brandFormSchema = {
  code: 0,
  name: "",
  alias: "",
  image: null,
  status: true,
};

export const unitFormSchema = {
  code: 0,
  name: "",
  alias: "",
  status: true,
};

export const variantFormSchema = {
  code: 0,
  name: "",
  alias: "",
  values: "",
  status: true,
};

export const storeFormSchema = {
  code: 0,
  name: "",
  alias: "",
  username: "",
  password: "",
  email: "",
  phone: "",
  status: true,
};

export const warehouseFormSchema = {
  code: 0,
  name: "",
  alias: "",
  email: "",
  contactPerson: "",
  phone: "",
  phonework: "",
  address: "",
  city: "",
  state: "",
  postalcode: "",
  status: true,
};

export const productFormSchema = {
  storeId: 0,
  warehouseId: 0,
  code: 0,
  name: "",
  alias: "",
  slug: "",
  sku: "",
  categoryId: 0,
  unitId: 0,
  barcode: 0,
  description: "",
  discountType: 0,
  discountValue: 0,
  qty: 0,
  price: 0,
  qtyAlt: 0,
  taxType: 0,
};

export const userFormSchema = {
  username: "",
  phone: "",
  email: "",
  role: "",
  password: "",
  confirmPassword: "",
  description: "",
  avatar: null,
};

export const warrantyFormSchema = {
  code: 0,
  name: "",
  description: "",
  duration: "",
  period: "",
  status: true,
};

export const customerFormSchema = {
  name: "",
  email: "",
  phone: "",
  address: "",
  status: true,
};

export const supplierFormSchema = {
  name: "",
  email: "",
  phone: "",
  address: "",
  status: true,
};

export const expenseFormSchema = {
  code: 0,
  name: "",
  alias: "",
  descripition: "",
  status: true,
};

export const expensecategoryFormSchema = {
  code: 0,
  name: "",
  alias: "",
  descripition: "",
  status: "Active",
};

export const taxFormSchema = {
  code: 0,
  name: "",
  alias: "",
  rate: "",
  status: true,
};

export const orderFormSchema = {
  customerId: null,
  orderDate: "",
  status: "Pending",
  items: [
    {
      productId: null,
      quantity: "",
      price: "",
      discountType: "",
      discountValue: "",
      taxType: "",
    },
  ],
};

export const purchaseFormSchema = {
  supplierId: null,
  purchaseDate: "",
  status: "pending",
  items: [
    {
      prodectId: null,
      quantity: "",
      price: "",
      discountType: "",
      discountValue: "",
      taxType: "",
    },
  ],
};

export const returnFormSchema = {
  orderId: null,
  returnDate: "",
  status: "pending",
  items: [
    {
      productId: null,
      quantity: "",
      price: "",
      discountType: "",
      discountValue: "",
      taxType: "",
    },
  ],
};

export const transferFormSchema = {
  fromWareHouseId: null,
  toWareHouseId: null,
  transferDate: "",
  status: "pending",
  items: [
    {
      productId: null,
      quantity: "",
      price: "",
      discountType: "",
      discountValue: "",
      taxType: "",
    },
  ],
};

export const paymentFormSchema = {
  amount: "",
  paymentDate: "",
  paymentMethod: "",
  descripition: "",
  status: "pending",
};

export const reportFormSchema = {
  startDate: "",
  endDate: "",
  reportType: "",
};

export const settingFormSchema = {
  siteName: "",
  siteEmail: "",
  sitePhone: "",
  siteAddress: "",
  currency: "",
  timeZone: "",
  dateFormet: "",
  logo: null,
};

export const profileFormSchema = {
  username: "",
  email: "",
  phone: "",
  avatar: null,
};

export const passwordFormSchema = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export const roleFormSchems = {
  name: "",
  description: "",
  permissions: [],
};

export const permissionFormSchema = {
  name: "",
  description: "",
};

export const notificationFormSchema = {
  tittle: "",
  message: "",
  type: "",
  status: "unread",
};

export const messageFormSchema = {};
