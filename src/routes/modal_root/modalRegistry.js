// modalRegistry.js

import AddBrand from "../../core/modals/inventory/addbrand";
import AddCategory from "../../core/modals/inventory/addcategory";
import AddSubCategory from "../../core/modals/inventory/addsubcategory";
import Addunits from "../../core/modals/inventory/addunits";
import AddVariant from "../../core/modals/inventory/addvariant";
import AddWarranty from "../../core/modals/inventory/addwarranty";
import AddCustomer from "../../core/modals/peoples/addcustomer";
import AddStore from "../../core/modals/peoples/addstore";
import AddWarehouse from "../../core/modals/peoples/addwarehouse";
import AddUsers from "../../core/modals/usermanagement/addusers";
import { MODAL_TYPES } from "./modalTypes";

export const MODAL_REGISTRY = {
  [MODAL_TYPES.BRAND]: AddBrand,
  [MODAL_TYPES.CATEGORY]: AddCategory,
  [MODAL_TYPES.SUBCATEGORY]: AddSubCategory,
  [MODAL_TYPES.UNIT]: Addunits,
  [MODAL_TYPES.VARIANT]: AddVariant,
  [MODAL_TYPES.STORE]: AddStore,
  [MODAL_TYPES.WAREHOUSE]: AddWarehouse,
  [MODAL_TYPES.WARRANTY]: AddWarranty,
  [MODAL_TYPES.CUSTOMER]: AddCustomer,
  [MODAL_TYPES.USER]: AddUsers,
  // [MODAL_TYPES.QUICK_ADD_PRODUCT]: QuickAddProductModal,
  // [MODAL_TYPES.GST]: GSTMasterModal,
  // [MODAL_TYPES.HSN]: HSNMasterModal,
  // [MODAL_TYPES.TAX_GROUP]: TaxGroupModal,
  // [MODAL_TYPES.VARIANT_ATTRIBUTE]: VariantAttributeModal,
};
