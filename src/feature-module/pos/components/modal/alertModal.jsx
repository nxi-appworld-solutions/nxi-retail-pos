import React from "react";
import { Modal, Button } from "react-bootstrap";
import ModalCloseButton from "../../common/ModalCloseButton";

const ICONS = {
  warning: "⚠️",
  success: "✅",
  error: "❌",
  info: "ℹ️",
};

const AlertModal = ({
  show,
  setShow,
  type = "info", // "warning" | "success" | "error" | "info"
  title,
  message,
  footerButtons = [], // [{ label, variant, onClick }]
  onClose,
}) => {
  const handleClose = () => {
    setShow(false);
    if (onClose) onClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header
        className={`posx_v1_modalHeader posx_v1_modalHeader-${type}`}
      >
        <Modal.Title>
          {ICONS[type]} {title}
        </Modal.Title>
        <ModalCloseButton onClick={() => setShow(false)} type={type} />
      </Modal.Header>

      <Modal.Body>
        <p className="text-dark mb-0">{message}</p>
      </Modal.Body>

      {footerButtons.length > 0 && (
        <Modal.Footer className="d-flex justify-content-end gap-2">
          {footerButtons.map((btn, i) => (
            <Button
              key={i}
              variant={btn.variant || "secondary"}
              onClick={() => {
                if (btn.onClick) btn.onClick();
                if (btn.closeOnClick !== false) handleClose();
              }}
            >
              {btn.label}
            </Button>
          ))}
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default AlertModal;
