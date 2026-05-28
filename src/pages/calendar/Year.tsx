// External
import React, { useState } from 'react';


// Parent, Sibling, Index
import YearLayout from '../../calendar/layouts/YearLayout';

// Mock events data (you can replace this with your actual events)
const mockEvents = [
  {
    id: "1",
    color: "#1976d2",
    endTime: new Date(2024, 0, 15),
    startTime: new Date(2024, 0, 15), // January 15, 2024
  },
  {
    id: "2",
    color: "#d32f2f",
    endTime: new Date(2024, 2, 10),
    startTime: new Date(2024, 2, 10), // March 10, 2024
  },
  {
    id: "3",
    color: "#388e3c",
    endTime: new Date(2024, 5, 20),
    startTime: new Date(2024, 5, 20), // June 20, 2024
  },
  {
    id: "4",
    color: "#ff9800",
    endTime: new Date(),
    startTime: new Date(), // Today
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
