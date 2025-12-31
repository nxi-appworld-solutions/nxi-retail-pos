// src/components/customer/CustomerSelectDropdown.jsx
import React from "react";
import Select from "react-select";

const CustomerSelectDropdown = ({ options, selected, loading, onChange }) => (
  <div className="flex-grow-1">
    <Select
      options={options}
      classNamePrefix="react-select select"
      placeholder="Choose a customer"
      value={
        options.find((o) => o.value === selected?.id) || options[0] || null
      }
      onChange={onChange}
      isLoading={loading}
    />
  </div>
);

export default CustomerSelectDropdown;
