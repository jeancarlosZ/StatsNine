import React from 'react';

export default function FinTable(props) {
  //tableInfo is being passed as prop from each Financials sub page
  if (props.tableInfo) {
    const { dates, rows, yearlyChanges, labels } = props.tableInfo;
    //dates is a 1 dimensional array
    //labels is a 1 dimensional array
    //rows is a 2 dimensional array
    //yearlyChanges is a 2 dimensional array

    //We are mapping over the 2D rows array keeping track of the index so we can
    //attach the coresponding yearly change to it

    //Uncomment to see what they look like
    // console.log(dates, 'dates');
    // console.log(rows, 'rows');
    // console.log(yearlyChanges, 'yearlyChanges');
    // console.log(labels, 'labels');

    return (
      <table className="fin-table">
        <DatesRow dates={dates} />
        {rows.map((rowInfo, index) => (
          <FinRow
            rowInfo={rowInfo}
            yearlyChanges={yearlyChanges}
            key={`${rowInfo}${index}`}
            labels={labels}
            index={index}
          />
        ))}
      </table>
    );
  } else {
    return <div className="table-space">Loading...</div>;
  }
}

function FinRow(props) {
  //This is the process of creating a row...
  //Put the lable <td> first
  //Map over the rowInfo making a <td> for every info
  //That <td> element houses a <div> that contains the info and yearly change

  //Using the index will help us know where we are in the array
  const index = props.index;
  //This is the current row we will be mapping over
  const rowInfo = props.rowInfo;
  //The array of yearly changes corresponds  to the rowInfo array, so they match index for index
  const yearlyChanges = props.yearlyChanges[index];
  //This is the lable that will be placed before we map over rowInfo
  const label = props.labels[index];

  //creating the light or dark className for the row depending on if it's odd or even
  let rowClassName;
  let color = props.index % 2 ? 'light' : 'dark';
  rowClassName = `${color} bold fin-row center-text`;

  return (
    <tbody>
      <tr className={rowClassName}>
        <td className="fin-col fin-label">{label}</td>
        {rowInfo.map((info, index) => (
          <td key={index} className="fin-col">
            <div>{info}</div>
            <YearlyChanges yearlyChanges={yearlyChanges} index={index} />
          </td>
        ))}
      </tr>
    </tbody>
  );
}

function YearlyChanges(props) {
  //This function produces the yearly change with it's appropriate classname
  const yearlyChange = props.yearlyChanges[props.index];

  return (
    <div
      className={
        yearlyChange
          ? yearlyChange.includes('-')
            ? 'red'
            : 'green'
          : 'yearly-changes'
      }
    >
      {yearlyChange}
    </div>
  );
}

function DatesRow(props) {
  //Here we are taking in an array of dates and producing ONE row with a <td> for every date
  return (
    <tbody>
      <tr>
        {props.dates.map((date) => (
          <td className="fin-date" key={date}>
            {date}
          </td>
        ))}
      </tr>
    </tbody>
  );
}
