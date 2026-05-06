import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Tooltip } from "antd";
import { useDispatch } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  updateQuantity,
} from "../../redux/cartSlice";

const CartCounter = ({ item, defaultValue = 1 }) => {
  const [quantity, setQuantity] = useState(defaultValue);
  const dispatch = useDispatch();

  useEffect(() => {
    setQuantity(defaultValue);
  }, [defaultValue]);

  const handleIncrement = (e) => {
    e.preventDefault();
    if (quantity < 99) {
      // Optional: Maximum limit
      const newQty = quantity + 1;
      setQuantity(newQty);
      dispatch(incrementQuantity(item));
    }
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    if (quantity > 0) {
      // Prevent going below 0
      const newQty = quantity - 1;
      setQuantity(newQty);
      dispatch(decrementQuantity(item));
    } else if (quantity === 1) {
      dispatch(decrementQuantity(item));
    }
  };

  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   const numericValue = parseInt(value, 10);

  //   // Allow empty input temporarily for manual edits
  //   if (value === "") {
  //     setQuantity(0); // Reset to 0 if input is empty
  //   } else if (
  //     !isNaN(numericValue) &&
  //     numericValue >= 0 &&
  //     numericValue <= 99
  //   ) {
  //     setQuantity(numericValue); // Update state with valid numbers
  //   }
  // };

  const handleChange = (e) => {
    const value = e.target.value;
    const numericValue = parseInt(value, 10);

    // Allow empty input temporarily for manual edits
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 99) {
      setQuantity(numericValue);
      dispatch(updateQuantity({ code: item, quantity: numericValue }));
    }
  };

  return (
    <>
      <Tooltip title="minus">
        <Link
          to="#"
          className="dec d-flex justify-content-center align-items-center"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="minus"
          onClick={handleDecrement}
        >
          <i className="ti ti-minus" />
        </Link>
      </Tooltip>
      <input
        type="text"
        className="form-control text-center"
        name="qty"
        value={quantity.toString()} // Convert number to string for input
        onChange={handleChange} // Allow manual edits
      />
      <Tooltip title="plus">
        <Link
          to="#"
          className="inc d-flex justify-content-center align-items-center"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="plus"
          onClick={handleIncrement}
        >
          <i className="ti ti-plus" />
        </Link>
      </Tooltip>
    </>
  );
};

CartCounter.propTypes = {
  defaultValue: PropTypes.number,
  onChange: PropTypes.func,
};

export default CartCounter;
