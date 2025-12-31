/* eslint-disable react/prop-types */
import React from "react";
import { ScaleLoader } from "react-spinners";
import { PropTypes } from "prop-types";
import "../../style/css/global.css";

const Loader = ({ loading }) => {
  return (
    <div className="container_loading">
      <ScaleLoader color="#ff7b00" loading={loading} />
    </div>
  );
};

// Loader.propTypes = {
//   loading: PropTypes.bool.isRequired,
// };

export default Loader;
