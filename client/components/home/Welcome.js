// Welcome this is just my scrumble page

import React from 'react';
// import '../../../public/styles/calendar.css';

// export default function Calendar1() {
//   const date = new Date();
//   date.setDate(1);

//   const lastDay = new Date(
//     date.getFullYear(),
//     date.getMonth() + 1,
//     0
//   ).getDate();

//   const prevLastDay = new Date(
//     date.getFullYear(),
//     date.getMonth(),
//     0
//   ).getDate();

//   const DayIndex1 = date.getDay();

//   const lastDayIndex = new Date(
//     date.getFullYear(),
//     date.getMonth() + 1,
//     0
//   ).getDay();

//   const nextDays = 7 - lastDayIndex - 1;

//   const months = [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December',
//   ];
//   let days = '';

//   for (let x = DayIndex1; x > 0; x--) {
//     days += `${prevLastDay - x + 1}`;
//   }

//   for (let i = 1; i <= lastDay; i++) {
//     if (
//       i === new Date().getDate() &&
//       date.getMonth() === new Date().getMonth()
//     ) {
//       days += `${i}`;
//     } else {
//       days += `${i}`;
//     }
//   }

//   for (let j = 1; j <= nextDays; j++) {
//     days += `${j}`;
//   }

//   return (
//     <div className="container">
//       <div className="calendar">
//         <div className="month">
//           <i
//             className="fas fa-angle-left prev"
//             onClick={() => {
//               date.setMonth(date.getMonth() - 1);
//             }}></i>
//           <div className="date">
//             <h1>{months[date.getMonth()]}</h1>
//             <p>{new Date().toDateString()}</p>
//           </div>
//           <i
//             className="fas fa-angle-right next"
//             onClick={() => {
//               date.setMonth(date.getMonth() + 1);
//             }}></i>
//         </div>
//         <div className="weekdays">
//           <div>Sun</div>
//           <div>Mon</div>
//           <div>Tue</div>
//           <div>Wed</div>
//           <div>Thu</div>
//           <div>Fri</div>
//           <div>Sat</div>
//         </div>
//         <div className="days">{days}</div>
//       </div>
//     </div>
//   );
// }

export default function Calendar1() {
  // set the data
  const data = [
    { x: 'Mandarin chinese', value: 1090000000, category: 'Sino-Tibetan' },
    { x: 'English', value: 983000000, category: 'Indo-European' },
    { x: 'Hindustani', value: 544000000, category: 'Indo-European' },
    { x: 'Spanish', value: 527000000, category: 'Indo-European' },
    { x: 'Arabic', value: 422000000, category: 'Afro-Asiatic' },
    { x: 'Malay', value: 281000000, category: 'Austronesian' },
    { x: 'Russian', value: 267000000, category: 'Indo-European' },
    { x: 'Bengali', value: 261000000, category: 'Indo-European' },
    { x: 'Portuguese', value: 229000000, category: 'Indo-European' },
    { x: 'French', value: 229000000, category: 'Indo-European' },
    { x: 'Hausa', value: 150000000, category: 'Afro-Asiatic' },
    { x: 'Punjabi', value: 148000000, category: 'Indo-European' },
    { x: 'Japanese', value: 129000000, category: 'Japonic' },
    { x: 'German', value: 129000000, category: 'Indo-European' },
    { x: 'Persian', value: 121000000, category: 'Indo-European' },
  ];

  anychart.onDocumentReady(function () {
    // create a tag (word) cloud chart
    const chart = anychart.tagCloud(data);

    // set a chart title
    chart.title('15 most influential languages');
    // set an array of angles at which the words will be laid out
    chart.angles([0]);
    // enable a color range
    chart.colorRange(true);
    // set the color range length
    chart.colorRange().length('80%');

    // display the word cloud chart
    chart.container('container');
    chart.draw();
    // format the tooltips
    const formatter =
      '{%value}{scale:(1)(1000)(1000)(1000)|( dozen)( thousand)( million)( billion)}';
    const tooltip = chart.tooltip();
    tooltip.format(formatter);
    chart.angles([0, -45, 90]);
    // add an event listener
  });
}
