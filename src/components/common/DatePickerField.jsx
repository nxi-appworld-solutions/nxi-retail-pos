import { Calendar } from "feather-icons-react/build/IconComponents";
import { DatePicker } from "antd";

const DatePickerField = ({ selectedDate, onChange }) => (
  <div className="input-blocks">
    <label>Purchase Date</label>
    <div className="input-groupicon calender-input">
      <Calendar className="info-img" />
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        type="date"
        className="filterdatepicker"
        dateFormat="dd-MM-yyyy"
        placeholder="Choose Date"
      />
    </div>
  </div>
);

export default DatePickerField;
