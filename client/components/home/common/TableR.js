import React, { useState } from 'react';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from 'react-modern-calendar-datepicker';

const TableR = () => {
  const defaultValue = {
    year: 2021,
    month: 10,
    day: 15,
  };
  const [selectedDay, setSelectedDay] = useState(defaultValue);

  return (
    <Calendar
      className
      value={selectedDay}
      onChange={setSelectedDay}
      calendarClassName="responsive-calendar position-relative "
      shouldHighlightWeekends
      // here we go
      renderFooter={() => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '1rem 2rem',
          }}>
          <button
            type="button"
            onClick={() => {
              setSelectedDay(null);
            }}
            style={{
              border: '#0fbcf9',
              color: '#fff',
              borderRadius: '0.5rem',
              padding: '1rem 2rem',
            }}>
            Reset Value!
          </button>
        </div>
      )}
    />
  );
};

export default TableR;
