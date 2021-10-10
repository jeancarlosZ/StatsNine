import React, { useState, useEffect } from 'react';
import { roundNumberDec, formatNumber } from '../../../utils';

export default function FinTable(props) {
  return (
    <table className="screener-table">
      {props.rowInfo.map((info, index) => (
        <FinRow rowInfo={info} key={info} label={props.labels[index]} />
      ))}
    </table>
  );
}

function FinRow(props) {
  const row = props.rowInfo.map((info) => formatNumber(info));

  return (
    <tbody>
      <tr>
        <td>{props.label}</td>
        {row.map((info, index) => (
          <td key={index}>{info}</td>
        ))}
      </tr>
    </tbody>
  );
}
