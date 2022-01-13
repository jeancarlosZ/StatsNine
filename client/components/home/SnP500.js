import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { ALL, DAILY, SIX_MONTH, YEAR } from "../../api/api";
import { getLocalData } from "../../store/local/localActions";
import UniversalChart from "../UniversalChart";

export default function StockPriceChart() {
  const [range, setRange] = useState(ALL);
  const [series, setSeries] = useState(DAILY);
  const [data, setData] = useState({});

  const [update, setUpdate] = useState(true);

  useEffect(() => {
    async function getData() {
      if (update) {
        setData({
          ...data, //* Update data  { ...data, [range]: newData }
          [range]: await getLocalData(
            "close", //* key
            "fetchChartPrice", //* func
            [series, range], //* args
            `SPY${series}${range}`, //* saveas
            "SPY",
          ),
        });
        setUpdate(false);
      }
    }

    getData();
  }, [series, range]);

  const { keys, values } = !data[range] ? data : data[range];

  const dataset = [];

  if (values) {
    dataset.push({
      name: "Stock Price",
      type: "line",
      color: "rgba(44, 221, 155, 1)",
      outline: "rgba(44, 221, 155, 1)",
      fillcolor: "rgba(44, 221, 155, .2)",
      fill: "tonexty",

      values: values,
    });
  }

  function updateSeries(series, newSeries) {
    if (series !== newSeries) {
      setSeries(newSeries);
      setUpdate(true);
    }
  }

  function updateRange(range, newRange) {
    if (range !== newRange) {
      setRange(newRange);
      if (!data[newRange]) setUpdate(true);
    }
  }

  return (
    <div className="rounded-3 position-relative">
      <div className="selector rounded-3">
        <label className="lead  text-center fs-4 text-white">S&P 500</label>
        {getSelectors(series, range, updateSeries, updateRange)}
      </div>

      <UniversalChart
        className="ohlc"
        keys={keys}
        dataset={dataset}
        showlegend={false}
        backgroundColor="fff"
        plotBackgroundColor="rgba(30, 34, 45, 0)"
        margin={{ l: 50, r: 50, b: 25, t: 35 }}
        x-axis={false}
        y-axis={false}
        hoverdistance={50}
        hovermode="x"
      />
    </div>
  );
}

function getSelectors(series, range, updateSeries, updateRange) {
  return (
    <div>
      <DropdownButton className="dropdown-selector " title={range} size="sm" variant="success">
        <Dropdown.Item onClick={() => updateRange(range, ALL)}>All</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => updateRange(range, YEAR)}>1 year</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => updateRange(range, SIX_MONTH)}>6 months</Dropdown.Item>
      </DropdownButton>
    </div>
  );
}
