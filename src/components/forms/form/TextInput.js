const TextInput = ({ label, value, onChange, placeholder }) => (
  <div className="input-blocks">
    <label>{label}</label>
    <input
      type="text"
      className="form-control"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

export default TextInput;
