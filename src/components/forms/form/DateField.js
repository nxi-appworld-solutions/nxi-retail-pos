import { DatePicker } from "antd";
import { Calendar } from "feather-icons-react";

const DateField = ({ label, value, onChange }) => (
  <div className="input-blocks">
    <label>{label}</label>
    <div className="input-groupicon calender-input">
      <Calendar className="info-img" />
      <DatePicker
        selected={value}
        onChange={onChange}
        dateFormat="dd-MM-yyyy"
        placeholder="Choose Date"
      />
    </div>
  </div>
);

export default DateField;
