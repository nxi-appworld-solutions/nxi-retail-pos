import { Calendar } from "react-feather";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const DateInput = ({ label = "Date", value, onChange }) => {
  return (
    <div className="input-blocks">
      <label>{label}</label>
      <div className="input-groupicon calender-input">
        <Calendar className="info-img" />
        <DatePicker
          value={value}
          onChange={onChange}
          format="DD-MM-YYYY"
          className="form-control filterdatepicker"
          placeholder="Choose Date"
        />
      </div>
    </div>
  );
};

export default DateInput;
