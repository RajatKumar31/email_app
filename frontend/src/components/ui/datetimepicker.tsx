"use client";

import React, { useEffect } from "react";
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
  const now = new Date();
  const isToday = value?.toDateString() === now.toDateString();
  const minTime = isToday ? now : new Date(new Date().setHours(0, 0, 0, 0));
  const maxTime = new Date(new Date().setHours(23, 45, 0, 0));

  useEffect(() => {
    if (!value) {
      onChangeAction(new Date());
    }
  }, [value, onChangeAction]);

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
        minDate={now}
        minTime={minTime}
        maxTime={maxTime}
      />
    </div>
  );
};
