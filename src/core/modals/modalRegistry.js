// modalRegistry.js
import BrandModal from "./products/BrandModal";
import QuickAddProductModal from "./products/QuickAddProductModal";
import CategoryModal from "./products/CategoryModal";
import VariantAttributeModal from "./products/VariantAttributeModal";
<<<<<<< HEAD
import UserModal from "./usermanagement/addusers";
import GSTMasterModal from "./taxmanagement/GSTMasterModal";
import HSNMasterModal from "./taxmanagement/HSNMasterModal";
import TaxGroupModal from "./taxmanagement/TaxGroupModal";

import { MODAL_TYPES } from "./modalTypes";
import UnitMasterModal from "./products/UnitMasterModal";
=======
import UnitMasterModal from "./products/UnitMasterModal";
import GSTMasterModal from "./taxmanagement/GSTMasterModal";
import HSNMasterModal from "./taxmanagement/HSNMasterModal";
import TaxGroupModal from "./taxmanagement/TaxGroupModal";
import UserModal from "./system/UserModal";

import { MODAL_TYPES } from "./modalTypes";
>>>>>>> 1c9ca8c (again post)

export const MODAL_REGISTRY = {
  [MODAL_TYPES.BRAND]: BrandModal,
  [MODAL_TYPES.CATEGORY]: CategoryModal,
  [MODAL_TYPES.UNIT_MASTER]: UnitMasterModal,
  [MODAL_TYPES.USER]: UserModal,
  [MODAL_TYPES.QUICK_ADD_PRODUCT]: QuickAddProductModal,
  [MODAL_TYPES.GST]: GSTMasterModal,
  [MODAL_TYPES.HSN]: HSNMasterModal,
  [MODAL_TYPES.TAX_GROUP]: TaxGroupModal,
  [MODAL_TYPES.VARIANT_ATTRIBUTE]: VariantAttributeModal,
};
