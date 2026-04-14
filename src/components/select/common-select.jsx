import React from "react";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";

const CommonSelect = ({
  value,
  options,
  placeholder = "Select",
  onChange,
  className = "",
  disabled = false,
  filter = true,
  multiple = false,
}) => {
  return (
    <div className="primereact-common-select">
      {multiple ? (
        <MultiSelect
          value={value}
          options={options}
          onChange={onChange}
          placeholder={placeholder}
          className={className}
          disabled={disabled}
          filter={filter}
          display="chip" // 👈 selected values chips me dikhengi
          maxSelectedLabels={2} // 👈 compact view
        />
      ) : (
        <Dropdown
          value={value}
          options={Array.isArray(options) ? options : []}
          onChange={onChange}
          placeholder={placeholder}
          className={className}
          disabled={disabled}
          appendTo={document.body}
          filter={filter}
        />
      )}
    </div>
  );
};

export default CommonSelect;
