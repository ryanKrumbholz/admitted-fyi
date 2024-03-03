import React, { useState } from 'react';

// Define the props interface for type safety
interface DatePickerProps {
  onChange: (date: Date | null) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onChange }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const currDate = new Date();
  const maxHtmlDate = currDate.toISOString().slice(0, 10);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSelectedDate(newValue);
    
    // Create a Date object only if the newValue is not an empty string
    const dateValue = newValue ? new Date(newValue) : null;
    
    // Call the passed onChange function with either a Date object or null
    if (onChange) {
      onChange(dateValue);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.showPicker(); // This is experimental and not widely supported.
  };

  const handlePickerShow = (e: React.MouseEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
  
  // Checking if showPicker function exists on the input element before calling it
    if ('showPicker' in input && typeof input.showPicker === 'function') {
      input.showPicker();
    }
  };

  return (
    <div>
      <label htmlFor="date-picker" className="block font-bold text-white">Select a date:</label>
      <input
        min={`${currDate.getFullYear()-1}-01-01`} 
        max={`${maxHtmlDate}`}  
        name="date"
        type="date"
        id="date-picker"
        value={selectedDate}
        onChange={handleDateChange}
        onFocus={handleFocus}
        onClick={handlePickerShow}
        className="mt-1 block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      />
    </div>
  );
};

export default DatePicker;
