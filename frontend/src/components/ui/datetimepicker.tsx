"use client";

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateTimePickerProps {
  value: Date | null;
  onChangeAction: (value: Date | null) => void;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  value,
  onChangeAction,
}) => {
  return (
    <div className="w-full">
      <DatePicker
        selected={value}
        onChange={(date) => onChangeAction(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Select date and time"
        className="mt-2 w-full p-2 border rounded-md shadow-sm"
      />
    </div>
  );
};
