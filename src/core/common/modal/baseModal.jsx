import useModal from "../../../routes/modal_root/useModal";

const BaseModal = ({ title, children, footer }) => {
  const { close } = useModal();

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h4>{title}</h4>

        <button
          type="button"
          className="close bg-danger text-white"
          onClick={close}
        >
          ×
        </button>
      </div>

      <div className="modal-body">{children}</div>

      <div className="modal-footer">
        <button
          className="btn me-2 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none"
          onClick={close}
        >
          Cancel
        </button>

        {footer}
      </div>
    </div>
  );
};

export default BaseModal;
