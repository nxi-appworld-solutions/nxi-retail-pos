import { useDispatch } from "react-redux";
import { openModal } from "../../redux/store/modalSlice";

const useAppModal = () => {
  const dispatch = useDispatch();

  const open = (name, payload = {}, options = {}) => {
    dispatch(
      openModal({
        name,
        payload,
        options,
      }),
    );
  };

  return { open };
};

export default useAppModal;
