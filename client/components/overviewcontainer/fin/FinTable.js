import React, { useState, useEffect } from 'react';
import { roundNumberDec, formatNumber } from '../../../utils';

export default function FinTable(props) {
  return (
    <table className="screener-table">
      {props.rowInfo.map((info) => (
        <FinRow rowInfo={info} key={info} />
      ))}
    </table>
  );
}

function FinRow(props) {
  const row = props.rowInfo.map((info) => formatNumber(info));

  return (
    <tbody>
      <tr>
        {row.map((info, index) => (
          <td key={index}>{info}</td>
        ))}
      </tr>
    </tbody>
  );
}
