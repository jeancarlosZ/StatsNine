import React, { useState } from "react";
import CalendarDays from "./common/CalendarDays";

import "../../../public/styles/calendar2.css";

export default function Calendar() {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [currentDay, setCurrentDay] = useState(new Date());

  return (
    <div className="calendar position-relative">
      <div className="calendar-header ">
        <h5>Calendar</h5>
      </div>
      <div className="lead align-self-center d-inline p-2 text-light">
        {months[currentDay.getMonth()]} {currentDay.getFullYear()}
      </div>
      <table className="calendar-body">
        <thead>
          <tr className="table-header">
            {weekdays.map((weekday, idx) => {
              return (
                <th key={idx} className="weekday">
                  {weekday}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <CalendarDays day={currentDay} />
        </tbody>
      </table>
    </div>
  );
}
