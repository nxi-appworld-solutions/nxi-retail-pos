import Select from "react-select";

const SelectField = ({ label, options, onChange, value, isMulti = false }) => (
  <div className="input-blocks">
    <label>{label}</label>
    <Select
      classNamePrefix="react-select"
      options={options}
      onChange={onChange}
      value={value}
      isMulti={isMulti}
      placeholder="Choose"
    />
  </div>
);

export default SelectField;
