import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datePickerStyle.css";
import { Input } from "@chakra-ui/react";

interface MyDatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholderText?: string;
  dateFormat?: string;
}

export default function MyDatePicker({
  selected,
  onChange,
  placeholderText = "Select a date",
  dateFormat = "yyyy/MM/dd",
}: MyDatePickerProps) {
  return (
    <DatePicker
      className={"react-date-picker"}
      selected={selected}
      onChange={onChange}
      dateFormat={dateFormat}
      placeholderText={placeholderText}
      customInput={<Input
          colorPalette={"orange"}
          bg={"white"}
          letterSpacing={2}
          color={"orange.950"}
          fontWeight={{
            base:"bold",
            _placeholder:"normal",
          }}
      />}
    />
  );
}
