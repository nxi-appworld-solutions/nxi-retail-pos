import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../core/redux/store/modalSlice";

const useModal = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);

  return {
    isOpen: !!modal.name,
    name: modal.name,
    payload: modal.payload || {},
    options: modal.options,
    close: () => dispatch(closeModal()),
  };
};

export default useModal;
