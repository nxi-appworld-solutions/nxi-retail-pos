// import React from "react";
// import { Calendar, CalendarChangeEvent } from "primereact/calendar";

// interface CommonDatePickerProps {
//   value: Date | null;
//   onChange: (value: Date | null) => void;
//   placeholder?: string;
//   showTime?: boolean;
//   dateFormat?: string;
//   className?: string;
//   disabled?: boolean;
//   maxDate?: Date | null;
//   minDate?: Date | null;
//   appendTo?: HTMLElement | "self" | null;
// }

// interface CommonMonthPickerProps {
//   value: Date | null;
//   onChange: (value: Date | null) => void;
//   placeholder?: string;
//   className?: string;
//   disabled?: boolean;
// }

// const CommonDatePicker: React.FC<CommonDatePickerProps> = ({
//   value,
//   onChange,
//   placeholder = "Select Date",
//   dateFormat = "dd/mm/yy",
//   className = "",
//   disabled = false,
//   maxDate = null,
//   minDate = null,
//   appendTo = null,
// }) => {
//   return (
//     <Calendar
//       value={value}
//       onChange={(e: CalendarChangeEvent) =>
//         onChange(e.value as Date | null)
//       }
//       placeholder={placeholder}
//       dateFormat={dateFormat}
//       className={className}
//       disabled={disabled}
//       maxDate={maxDate}
//       minDate={minDate}
//       appendTo={appendTo}
//     />
//   );
// };

// const CommonMonthPicker: React.FC<CommonMonthPickerProps> = ({
//   value,
//   onChange,
//   placeholder = "Select Month",
//   className = "",
//   disabled = false,
// }) => {
//   return (
//     <Calendar
//       value={value}
//       onChange={(e: CalendarChangeEvent) =>
//         onChange(e.value as Date | null)
//       }
//       placeholder={placeholder}
//       className={className}
//       disabled={disabled}
//       dateFormat="mm/yy"
//       view="month"
//       yearNavigator
//       yearRange="2020:2030"
//     />
//   );
// };

// export default CommonDatePicker;
// export { CommonMonthPicker };
