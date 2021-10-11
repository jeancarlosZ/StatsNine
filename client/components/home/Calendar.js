import React, { useEffect, useState } from 'react';
import '../../../public/styles/calendar.css';

export default function Calendar() {
  const date = new Date();
  date.setDate(1);

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const DayIndex1 = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

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
  let days = '';

  for (let x = DayIndex1; x > 0; x--) {
    days += `${prevLastDay - x + 1}`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `${i}`;
    } else {
      days += `${i}`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `${j}`;
  }
  return (
    <div>
      {/* <div className="col-xxl-3 d-flex order-1 order-xxl-1 col-md-6"> */}
      {/* <div className="flex-fill w-100 card"> */}
      <div className="card-header">
        {/* <div className="card-actions float-right">
            <div className="d-inline-block dropdown"></div>
          </div> */}
        <h5 className="mb-0 card-title calendar">Calendar</h5>
      </div>
      <div className="d-flex card-body">
        <div className="align-self-center w-100">
          {/* <div className="rdt rdtStatic rdtOpen"> */}
          {/* <div className="rdtPicker"> */}
          <div className="rdtDays">
            <table>
              <thead>
                <tr>
                  <th className="rdtSwitch rdtPrev">
                    {months[date.getMonth() - 1]} 2021
                  </th>
                  <th className="rdtSwitch">
                    {' '}
                    {months[date.getMonth()]} 2021{' '}
                  </th>
                  <th className="rdtSwitch rdtNext">
                    {months[date.getMonth() + 1]} 2021
                  </th>
                </tr>
                <tr>
                  <th className="dow">SUN</th>
                  <th className="dow">MON</th>
                  <th className="dow">TUS</th>
                  <th className="dow">WED</th>
                  <th className="dow">THUR</th>
                  <th className="dow">FRI</th>
                  <th className="dow">SAT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="rdtDay rdtOld">26</td>
                  <td
                    data-value="27"
                    data-month="8"
                    data-year="2021"
                    className="rdtDay rdtOld">
                    27
                  </td>
                  <td
                    data-value="28"
                    data-month="8"
                    data-year="2021"
                    className="rdtDay rdtOld">
                    28
                  </td>
                  <td
                    data-value="29"
                    data-month="8"
                    data-year="2021"
                    className="rdtDay rdtOld">
                    29
                  </td>
                  <td
                    data-value="30"
                    data-month="8"
                    data-year="2021"
                    className="rdtDay rdtOld">
                    30
                  </td>
                  <td
                    data-value="1"
                    data-month="9"
                    data-year="2021"
                    className="rdtDay">
                    1
                  </td>
                  <td
                    data-value="2"
                    data-month="9"
                    data-year="2021"
                    className="rdtDay">
                    2
                  </td>
                </tr>
                <tr>
                  <td
                    data-value="3"
                    data-month="9"
                    data-year="2021"
                    className="rdtDay">
                    3
                  </td>
                  <td
                    data-value="4"
                    data-month="9"
                    data-year="2021"
                    className="rdtDay">
                    4
                  </td>
                  <td
                    data-value="5"
                    data-month="9"
                    data-year="2021"
                    className="rdtDay">
                    5
                  </td>
                  <td
                    data-value="6"
                    data-month="9"
                    data-year="2021"
                    className="rdtDay">
                    6
                  </td>
                  <td
                    data-value="7"
                    data-month="9"
                    data-year="2021"
                    className="rdtDay">
                    7
                  </td>
                  <td
                    data-value="8"
                    data-month="9"
                    data-year="2021"
                    className="rdtDay rdtToday">
                    8
                  </td>
                  <td
                    data-value="9"
                    data-month="9"
                    data-year="2021"
                    className="rdtDay">
                    9
                  </td>
                </tr>
                <tr>
                  <td
                    data-value="10"
                    data-month="9"
                    data-year="2021"
                    className="rdtDay">
                    10
                  </td>
                  <td
                    data-value="11"
                    data-month="9"
                    data-year="2021"
                    className="today">
                    11
                  </td>
                  <td
                    data-value="12"
                    data-month="9"
                    data-year="2021"
                    className="rdtDay">
                    12
                  </td>
                  <td
                    data-value="13"
                    data-month="9"
                    data-year="2021"
                    className="rdtDay">
                    13
                  </td>
                  <td
                    data-value="14"
                    data-month="9"
                    data-year="2021"
                    className="rdtDay">
                    14
                  </td>
                  <td
                    data-value="15"
                    data-month="9"
                    data-year="2021"
                    className="rdtDay">
                    15
                  </td>
                  <td
                    data-value="16"
                    data-month="9"
                    data-year="2021"
                    className="rdtDay">
                    16
                  </td>
                </tr>
                <tr>
                  <td
                    data-value="17"
                    data-month="9"
                    data-year="2021"
                    className="rdtDay">
                    17
                  </td>
                  <td
                    data-value="18"
                    data-month="9"
                    data-year="2021"
                    className="rdtDay">
                    18
                  </td>
                  <td
                    data-value="19"
                    data-month="9"
                    data-year="2021"
                    className="rdtDay">
                    19
                  </td>
                  <td
                    data-value="20"
                    data-month="9"
                    data-year="2021"
                    className="rdtDay">
                    20
                  </td>
                  <td
                    data-value="21"
                    data-month="9"
                    data-year="2021"
                    className="rdtDay">
                    21
                  </td>
                  <td
                    data-value="22"
                    data-month="9"
                    data-year="2021"
                    className="rdtDay">
                    22
                  </td>
                  <td
                    data-value="23"
                    data-month="9"
                    data-year="2021"
                    className="rdtDay">
                    23
                  </td>
                </tr>
                <tr>
                  <td
                    data-value="24"
                    data-month="9"
                    data-year="2021"
                    className="rdtDay">
                    24
                  </td>
                  <td
                    data-value="25"
                    data-month="9"
                    data-year="2021"
                    className="rdtDay">
                    25
                  </td>
                  <td
                    data-value="26"
                    data-month="9"
                    data-year="2021"
                    className="rdtDay">
                    26
                  </td>
                  <td
                    data-value="27"
                    data-month="9"
                    data-year="2021"
                    className="rdtDay">
                    27
                  </td>
                  <td
                    data-value="28"
                    data-month="9"
                    data-year="2021"
                    className="rdtDay">
                    28
                  </td>
                  <td
                    data-value="29"
                    data-month="9"
                    data-year="2021"
                    className="rdtDay">
                    29
                  </td>
                  <td
                    data-value="30"
                    data-month="9"
                    data-year="2021"
                    className="rdtDay">
                    30
                  </td>
                </tr>
                <tr>
                  <td
                    data-value="31"
                    data-month="9"
                    data-year="2021"
                    className="rdtDay">
                    31
                  </td>
                  <td
                    data-value="1"
                    data-month="10"
                    data-year="2021"
                    className="rdtDay rdtNew">
                    1
                  </td>
                  <td
                    data-value="2"
                    data-month="10"
                    data-year="2021"
                    className="rdtDay rdtNew">
                    2
                  </td>
                  <td
                    data-value="3"
                    data-month="10"
                    data-year="2021"
                    className="rdtDay rdtNew">
                    3
                  </td>
                  <td
                    data-value="4"
                    data-month="10"
                    data-year="2021"
                    className="rdtDay rdtNew">
                    4
                  </td>
                  <td
                    data-value="5"
                    data-month="10"
                    data-year="2021"
                    className="rdtDay rdtNew">
                    5
                  </td>
                  <td
                    data-value="6"
                    data-month="10"
                    data-year="2021"
                    className="rdtDay rdtNew">
                    6
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
      {/* </div> */}
      {/* </div> */}
    </div>
  );
}
