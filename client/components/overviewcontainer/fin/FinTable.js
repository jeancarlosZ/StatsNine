import React, { useState, useEffect } from 'react';
import { roundNumberDec, formatNumber } from '../../../utils';

export default function FinTable(props) {
  return (
    <table className="fin-table">
      <tbody>
        <tr>
          {props.dates.map((date) => (
            <td className="fin-date" key={date}>
              {date}
            </td>
          ))}
        </tr>
      </tbody>
      {props.rowInfo.map((info, index) => (
        <FinRow
          rowInfo={info}
          yearlyChanges={props.yearlyChanges[index]}
          key={info}
          label={props.labels[index]}
          index={index}
        />
      ))}
    </table>
  );
}

function FinRow(props) {
  let className;
  let color = props.index % 2 ? 'light' : 'dark';
  className = `${color} bold fin-row center-text`;

  return (
    <tbody>
      <tr className={className}>
        <td className="fin-col fin-label">{props.label}</td>
        {props.rowInfo.map((info, index) => (
          <td key={index} className="fin-col">
            <div>{info}</div>
            <div
              className={
                props.yearlyChanges[index]
                  ? props.yearlyChanges[index].includes('-')
                    ? 'red'
                    : 'green'
                  : 'yearly-changes'
              }
            >
              {props.yearlyChanges[index]}
            </div>
          </td>
        ))}
      </tr>
    </tbody>
  );
}
