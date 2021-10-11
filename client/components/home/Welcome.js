import React from 'react';
import '../../../public/styles/calendar.css';

export default function Calendar1() {
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
    <div className="container">
      <div className="calendar">
        <div className="month">
          <i
            className="fas fa-angle-left prev"
            onClick={() => {
              date.setMonth(date.getMonth() - 1);
            }}></i>
          <div className="date">
            <h1>{months[date.getMonth()]}</h1>
            <p>{new Date().toDateString()}</p>
          </div>
          <i
            className="fas fa-angle-right next"
            onClick={() => {
              date.setMonth(date.getMonth() + 1);
            }}></i>
        </div>
        <div className="weekdays">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className="days">{days}</div>
      </div>
    </div>
  );
}

// import React from 'react';
// const Welcome = () => {
//   return (
//     <nav className="navbar navbar-dark bg-dark">
//       <div className="container-fluid">
//         <a className="navbar-brand">Navbar</a>
//         <form className="d-flex">
//           <input
//             className="form-control me-2"
//             type="search"
//             placeholder="Search"
//             aria-label="Search"></input>
//           <button className="btn btn-outline-success" type="submit">
//             Search
//           </button>
//         </form>
//       </div>
//     </nav>
//   );
// };
