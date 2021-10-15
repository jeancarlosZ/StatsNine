import React, { useEffect, useState } from 'react';
import CalendarDays from './common/CalendarDays';

import '../../../public/styles/calendar.css';
import '../../../public/styles/calendar2.css';
import Table from 'react-bootstrap/Table';

export default function Calendar() {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const [currentDay, setCurrentDay] = useState(new Date()); //

  return (
    <div>
      <div className="card-header table-borderless border-0">
        <h5 className="mb-0 card-title calendar  table-borderless border-0 text-white">
          Calendar
        </h5>
      </div>
      <div className=" card-body d-inline p-2  text-white position-relative">
        <div className="align-self-center w-100 d-inline p-2  text-white position-relative">
          <div className="rdtDays rounded-circle align-self-center  d-inline p-2 text-white position-relative">
            <div className="rdtSwitch rdtPrev  align-self-center d-inline p-2  text-white">
              {months[currentDay.getMonth() - 1]} {currentDay.getFullYear()}
            </div>
            <div className="rdtSwitch rdtPrev align-self-center d-inline p-2 text-white">
              {months[currentDay.getMonth()]} {currentDay.getFullYear()}
            </div>
            <div className="rdtSwitch rdtPrev align-self-center d-inline p-2 text-white">
              {months[currentDay.getMonth() + 1]} {currentDay.getFullYear()}
            </div>
            <table responsive="true">
              <thead>
                <tr className=" fs-5 align-self-center  d-inline p-5 text-white position-relative">
                  {weekdays.map((weekday, idx) => {
                    return (
                      <th key={idx} className="weekday">
                        {weekday}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="text-xl-start fs-3 align-self-center d-inline p-2 mx-auto w-auto p-2 text-white position-relative table-borderless ">
                <CalendarDays
                  day={currentDay}
                  className="current selected rounded-circle table-borderless "
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
