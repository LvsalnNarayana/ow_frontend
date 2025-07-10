import React, { useState } from 'react';
import YearLayout from '../../calendar/layouts/YearLayout';

// Mock events data (you can replace this with your actual events)
const mockEvents = [
  {
    id: "1",
    startTime: new Date(2024, 0, 15), // January 15, 2024
    endTime: new Date(2024, 0, 15),
    color: "#1976d2",
  },
  {
    id: "2",
    startTime: new Date(2024, 2, 10), // March 10, 2024
    endTime: new Date(2024, 2, 10),
    color: "#d32f2f",
  },
  {
    id: "3",
    startTime: new Date(2024, 5, 20), // June 20, 2024
    endTime: new Date(2024, 5, 20),
    color: "#388e3c",
  },
  {
    id: "4",
    startTime: new Date(), // Today
    endTime: new Date(),
    color: "#ff9800",
  },
];

const Year: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    console.log('Selected date:', date);
  };

  const handleYearSelect = (year: Date) => {
    setSelectedDate(year);
    console.log('Selected year:', year);
  };

  return (
    <YearLayout
      selectedDate={selectedDate}
      onDateSelect={handleDateSelect}
      onYearSelect={handleYearSelect}
      events={mockEvents}
      minDate={new Date(1900, 0, 1)}
      maxDate={new Date(2100, 11, 31)}
    />
  );
};

export default Year;
