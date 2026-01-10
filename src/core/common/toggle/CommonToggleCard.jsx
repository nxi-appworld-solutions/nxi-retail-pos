const CommonToggleCard = ({ icon, label, name, checked, color, onChange }) => (
  <div className="col-md-4">
    <div
      className={`p-3 rounded-3 border ${
        checked
          ? `bg-soft-${color} border-${color} border-opacity-25`
          : "bg-light"
      }`}
    >
      <div className="d-flex justify-content-between align-items-center">
        <span
          className={`fw-bold small d-flex align-items-center gap-2 ${
            checked ? `text-${color}` : "text-muted"
          }`}
        >
          {icon} {label}
        </span>

        <input
          type="checkbox"
          className="form-check-input"
          name={name}
          checked={checked}
          onChange={onChange}
        />
      </div>
    </div>
  </div>
);

export default CommonToggleCard;
