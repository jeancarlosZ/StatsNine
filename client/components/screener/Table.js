import React, { useState, useEffect } from "react";
import { fetchScreenerStocks } from "../../api/api";
import Row from "./Row";

export default function Table() {
  const [stocksList, setStocksList] = useState([]);

  useEffect(() => {
    async function getStocksList() {
      setStocksList(await fetchScreenerStocks());
    }

    getStocksList();
  }, []);

  return (
    <div>
      <table className="screener-table">
        <thead>
          <tr>
            <th>Symbol and Name</th>
            <th>Last Price</th>
            <th>Annual Dividend</th>
            <th>Volume</th>
            <th>Market Cap</th>
            <th>Sector</th>
          </tr>
        </thead>
        <tbody>
          {stocksList.length ? (
            stocksList.map(stock => <Row key={stock.symbol} stock={stock} />)
          ) : (
            <tr>
              <td>Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
