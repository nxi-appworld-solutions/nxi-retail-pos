import { useSelector } from "react-redux";
import { MODALS } from "../../constants/modal.constants";
import CategoryModal from "../../features/products/category/AddCategoryModal";
import BrandModal from "../../features/products/brand/addBrandModal";

const GlobalModalRenderer = () => {
  const { activeModal } = useSelector((state) => state.uiModal);

  switch (activeModal) {
    case MODALS.CATEGORY:
      return <CategoryModal />;
    case MODALS.BRAND:
      return <BrandModal />;
    default:
      return null;
  }
};

export default GlobalModalRenderer;
