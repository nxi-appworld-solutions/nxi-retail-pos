const CommonInput = ({ label, required, ...props }) => (
  <div>
    <label className="form-label fw-bold small text-secondary">
      {label} {required && <span className="text-danger">*</span>}
    </label>

    <input {...props} className="form-control shadow-none" />
  </div>
);

export default CommonInput;
