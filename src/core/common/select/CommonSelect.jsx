import React from "react";
import Select from "react-select";

const CommonSelect = ({
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select",
  isDisabled = false,
  isClearable = false,
  isLoading = false,
}) => {
  const selectedOption =
    options.find((opt) => String(opt.value) === String(value)) || null;

  const handleChange = (opt) => {
    onChange({
      target: { name, value: opt ? opt.value : "" },
    });
  };

  return (
    <Select
      name={name}
      value={selectedOption}
      options={options}
      onChange={handleChange}
      placeholder={placeholder}
      isDisabled={isDisabled || isLoading}
      isClearable={isClearable}
      isLoading={isLoading}
      menuPortalTarget={document.target}
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
    />
  );
};

export default CommonSelect;
