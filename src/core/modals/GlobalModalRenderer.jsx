// import { useSelector } from "react-redux";
// import { MODAL_REGISTRY } from "./modalRegistry"

// const GlobalModalRenderer = () => {
//   const { activeModal, modalProps } = useSelector((state) => state.modal);

//   if (!activeModal) return null;

//   const ModalComponent = MODAL_REGISTRY[activeModal];

//   if (!ModalComponent) {
//     console.warn(`Modal not registered: ${activeModal}`);
//     return null;
//   }

//   return <ModalComponent {...modalProps} />;
// };

// export default GlobalModalRenderer;

import { useSelector } from "react-redux";
import { MODAL_REGISTRY } from "./modalRegistry";

const GlobalModalRenderer = () => {
  const modalState = useSelector((state) => state.modal);

  console.log("modalState", modalState);

  if (!modalState) return null;

  const { activeModal, modalProps } = modalState;

  if (!activeModal) return null;

  const ModalComponent = MODAL_REGISTRY[activeModal];

  if (!ModalComponent) {
    console.warn(`Modal not registered: ${activeModal}`);
    return null;
  }

  return <ModalComponent {...(modalProps || {})} />;
};

export default GlobalModalRenderer;
