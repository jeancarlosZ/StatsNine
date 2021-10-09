import React from "react";
import { roundNumberDec, formatNumber } from "../../utils";

export default function Row(props) {
  let { companyName, lastAnnualDividend, marketCap, price, sector, symbol, volume } = props.stock;
  price = roundNumberDec(price).toFixed(2);
  lastAnnualDividend = roundNumberDec(lastAnnualDividend).toFixed(2);
  volume = formatNumber(volume);
  marketCap = formatNumber(marketCap);

  return (
    <tr>
      <td>
        <div>{symbol}</div>
        <div>{companyName}</div>
      </td>
      <td>{price}</td>
      <td>{lastAnnualDividend}</td>
      <td>{volume}</td>
      <td>{marketCap}</td>
      <td>{sector}</td>
    </tr>
  );
}
