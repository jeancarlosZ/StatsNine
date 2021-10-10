import React, { useState, useEffect } from 'react';
import { roundNumberDec, formatNumber } from '../../../utils';

export default function FinTable(props) {
  return (
    <table className="screener-table">
      {props.rowInfo.map((info, index) => (
        <FinRow
          rowInfo={info}
          key={info}
          label={props.labels[index]}
          index={index}
        />
      ))}
    </table>
  );
}

function FinRow(props) {
  let className = props.index % 2 ? 'light' : 'dark';
  className = `${className} fin-row center-text`;
  const row =
    props.label !== 'Date'
      ? props.rowInfo.map((info) => formatNumber(info))
      : props.rowInfo.map((info) => info.slice(0, 4));

  return (
    <tbody>
      <tr className={className}>
        <td className="fin-col">{props.label}</td>
        {row.map((info, index) => (
          <td key={index} className="fin-col">
            {info}
          </td>
        ))}
      </tr>
    </tbody>
  );
}
