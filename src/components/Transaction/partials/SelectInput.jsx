import React from "react";
import Select from "react-select";

const SelectInput = ({
  label,
  options = [],
  onChange,
  value,
  required = false,
}) => (
  <div className="input-blocks">
    <label>
      {label}
      {required && <span className="text-danger ms-1">*</span>}
    </label>
    <Select
      options={options}
      onChange={onChange}
      value={value}
      classNamePrefix="react-select"
      placeholder={`Choose ${label}`}
    />
  </div>
);

export default SelectInput;
