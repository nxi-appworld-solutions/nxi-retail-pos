import React from "react";
import PropTypes from "prop-types";

const ModalCloseButton = ({ onClick, type = "default", size = "sm" }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`posx_v1_modalHeader_closeBtn posx_v1_modalHeader_closeBtn-${type} posx_v1_modalHeader_closeBtn-${size}`}
    >
      ×
    </button>
  );
};

ModalCloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf([
    "cash",
    "online",
    "warning",
    "success",
    "error",
    "default",
  ]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
};

export default ModalCloseButton;
