import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
      selected={selected}
      onChange={onChange}
      dateFormat={dateFormat}
      placeholderText={placeholderText}
      customInput={<Input />}
    />
  );
}
