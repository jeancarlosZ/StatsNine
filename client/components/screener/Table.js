import React, { useEffect, useState } from "react";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { getScreenerData } from "../../store/local/localActions";
import Loading from "../Loading";
import Row from "./Row";

//* This is the screener
export default function Table() {
  const [sortBy, setSortBy] = useState({ criteria: "", order: "null" });
  const [stocksMap, setStocksMap] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // This function fetches information from the API for 500 stocks and stores it in the local state for rendering.
    async function getStocksList() {
      const fetchedMap = await getScreenerData("", 500, 60);
      setStocksMap(fetchedMap);
      setLoaded(true);

      // const stocks = await getLocalData(
      //   'all',
      //   'fetchScreenerStocks',
      //   ['isEtf=false'],
      //   'screener',
      //   'system'
      // )
      // setStocksList(stocks)
    }

    getStocksList();
  }, []);

  if (!loaded) return <Loading />;

  return (
    <div className="screener-page">
      <div className="screener-container">
        <div className="screener-scroll-container">
          <div className="screener-title">
            <label>Stock Screener</label>
          </div>
          <div className="screen-table-container">
            <SimpleBar className="screener-scroll shadow-deep-nohover">
              <table className="screen-table">
                <thead>{getTableHead(stocksMap, sortBy, setSortBy)}</thead>
                <tbody>{getTableBody(stocksMap, sortBy)}</tbody>
              </table>
            </SimpleBar>
          </div>
        </div>
      </div>
    </div>
  );
}

function sorting(data, order) {
  if (order === "ascending") {
    return data.sort((a, b) => {
      if (a.value > b.value) {
        return 1;
      }
      if (a.value < b.value) {
        return -1;
      }
      return 0;
    });
  } else {
    return data.sort((a, b) => {
      if (b.value > a.value) {
        return 1;
      }
      if (b.value < a.value) {
        return -1;
      }
      return 0;
    });
  }
}

//* Function to get the table body
function getTableBody(stocksList, sortBy) {
  // if (stocksList.length) {
  if (Object.keys(stocksList).length) {
    // return stocksList.map((stock, i) => <Row key={stock.symbol} stock={stock} index={i} />)

    if (sortBy.criteria) {
      const symbolValue = Object.values(stocksList).map(stock => ({
        symbol: stock.symbol,
        value: stock[sortBy.criteria],
      }));
      const sortedList = sorting(symbolValue, sortBy.order);
      return sortedList.map((stock, i) => (
        <Row key={stock.symbol} stock={stocksList[stock.symbol]} index={i} />
      ));
    } else {
      return Object.keys(stocksList).map((stock, i) => (
        <Row key={stock} stock={stocksList[stock]} index={i} />
      ));
    }
  } else {
    return (
      <tr>
        <td>Hold tight while we find some companies for you...</td>
      </tr>
    );
  }
}

//* Function to get table headers
function getTableHead(stocksList, sortBy, setSortBy) {
  // if (stocksList.length) {
  const crit = sortBy.criteria;
  const ord = sortBy.order;
  const symbolName =
    crit !== "symbol"
      ? "Symbol and Name"
      : ord === "ascending"
      ? "Symbol and Name ⬆︎"
      : "Symbol and Name ⬇︎";
  const price = crit !== "price" ? "Price" : ord === "ascending" ? "Price ⬇︎" : "Price ⬆︎";
  const change = crit !== "change" ? "Change" : ord === "ascending" ? "Change ⬇︎" : "Change ⬆︎";
  const earnings = crit !== "pe" ? "Earnings" : ord === "ascending" ? "Earnings ⬇︎" : "Earnings ⬆︎";
  const fiftyTwo =
    crit !== "yearHigh" ? "52 Week" : ord === "ascending" ? "52 Week ⬇︎" : "52 Week ⬆︎";
  const other = crit !== "marketCap" ? "Other" : ord === "ascending" ? "Other ⬇︎" : "Other ⬆︎";
  const sector = crit !== "sector" ? "Sector" : ord === "ascending" ? "Sector ⬇︎" : "Sector ⬆︎";

  function toSort(criteria) {
    function direction(sortBy) {
      const upOrDown = sortBy.order;
      switch (upOrDown) {
        case "ascending":
          return "descending";
        default:
          return "ascending";
      }
    }

    setSortBy({
      criteria,
      order: direction(sortBy),
    });
  }

  if (Object.keys(stocksList).length) {
    return (
      <tr>
        <th className="screen-border-h" onClick={() => toSort("symbol")}>
          {symbolName}
        </th>
        <th className="screen-border-h" onClick={() => toSort("price")}>
          {price}
        </th>
        <th className="screen-border-h" onClick={() => toSort("change")}>
          {change}
        </th>
        <th className="screen-border-h" onClick={() => toSort("pe")}>
          {earnings}
        </th>
        <th className="screen-border-h" onClick={() => toSort("yearHigh")}>
          {fiftyTwo}
        </th>
        <th className="screen-border-h" onClick={() => toSort("marketCap")}>
          {other}
        </th>
        {/* <th className="screen-border-h">Volume</th> */}
        {/* <th className="screen-border-h">Market Cap</th> */}
        <th className="screen-border-h" onClick={() => toSort("sector")}>
          {sector}
        </th>
      </tr>
    );
  } else {
    return <></>;
  }
}
