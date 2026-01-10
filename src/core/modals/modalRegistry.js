// modalRegistry.js
import BrandModal from "./products/BrandModal";
import CategoryModal from "./products/CategoryModal";
import UserModal from "./usermanagement/addusers";

export const MODAL_REGISTRY = {
  CATEGORY: CategoryModal,
  BRAND: BrandModal,

  USER: UserModal,
};
