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

  var week = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  let weekday = week[date.getDay()];
  console.log(weekday);

  return (
    <div>
      <div className="card-header rounded-6">
        <h5 className="mb-0 card-title calendar  rounded-6 text-white">
          Calendar
        </h5>
      </div>
      <div className=" card-body d-inline p-2  text-white">
        <div className="align-self-center w-100 d-inline p-2  text-white">
          <div className="rdtDays align-self-center  d-inline p-2 text-white">
            <div className="rdtSwitch rdtPrev  align-self-center d-inline p-2  text-white">
              {months[date.getMonth() - 1]} 2021
            </div>
            <div className="rdtSwitch rdtPrev align-self-center d-inline p-2 text-white">
              {months[date.getMonth()]} 2021{' '}
            </div>
            <div className="rdtSwitch rdtPrev align-self-center d-inline p-2 text-white">
              {months[date.getMonth() + 1]} 2021{' '}
            </div>
            <table>
              <thead>
                <tr className=" fs-5 align-self-center  d-inline p-5 text-white position-relative">
                  <th className="dow">SUN</th>
                  <th className="dow">MON</th>
                  <th className="dow">TUS</th>
                  <th className="dow">WED</th>
                  <th className="dow">THUR</th>
                  <th className="dow">FRI</th>
                  <th className="dow">SAT</th>
                </tr>
              </thead>
              <tbody className="text-xl-start fs-3 align-self-center d-inline p-2 mx-auto w-auto p-3 text-white position-relative">
                <tr>
                  <td className="rdtDay rdtOld">26</td>
                  <td className="rdtDay rdtOld rounded-circle">27</td>
                  <td className="rdtDay rdtOld">28</td>
                  <td className="rdtDay rdtOld">29</td>
                  <td className="rdtDay rdtOld">30</td>
                  <td className="rdtDay">1</td>
                  <td className="rdtDay">2</td>
                </tr>
                <tr>
                  <td className="rdtDay">3</td>
                  <td className="rdtDay">4</td>
                  <td className="rdtDay">5</td>
                  <td className="rdtDay">6</td>
                  <td className="rdtDay">7</td>
                  <td className="rdtDay  rounded-circle">8</td>
                  <td className="rdtDay">9</td>
                </tr>
                <tr>
                  <td className="rdtDay">10</td>
                  <td className="rdtDay">11</td>
                  <td className="today rounded-circle">12</td>
                  <td className="rdtDay">13</td>
                  <td className="rdtDay">14</td>
                  <td className="rdtDay">15</td>
                  <td className="rdtDay">16</td>
                </tr>
                <tr>
                  <td className="rdtDay">17</td>
                  <td className="rdtDay">18</td>
                  <td className="rdtDay">19</td>
                  <td className="rdtDay">20</td>
                  <td className="rdtDay">21</td>
                  <td className="rdtDay">22</td>
                  <td className="rdtDay">23</td>
                </tr>
                <tr>
                  <td className="rdtDay">24</td>
                  <td className="rdtDay">25</td>
                  <td className="rdtDay">26</td>
                  <td className="rdtDay">27</td>
                  <td className="rdtDay">28</td>
                  <td className="rdtDay">29</td>
                  <td className="rdtDay">30</td>
                </tr>
                <tr>
                  <td className="rdtDay">31</td>
                  <td className="rdtDay rdtNew">1</td>
                  <td className="rdtDay rdtNew">2</td>
                  <td className="rdtDay rdtNew">3</td>
                  <td className="rdtDay rdtNew">4</td>
                  <td className="rdtDay rdtNew">5</td>
                  <td className="rdtDay rdtNew">6</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
