import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {
  ALL,
  DAILY,
  FIFTEEN_MINUTE,
  FIVE_YEAR,
  FOUR_HOUR,
  HOUR,
  MINUTE,
  MONTH,
  SIX_MONTH,
  TEN_YEAR,
  THIRTY_MINUTE,
  THREE_MONTH,
  WEEK,
  YEAR,
} from "../../../../api/api";
import { getLocalData } from "../../../../store/local/localActions";
import UniversalChart from "../../../UniversalChart";

//* This chart will render the stock price for a
//* Selected range and range of the user's choice
export default function StockPriceChart() {
  //* Selected Range, series, and the chart data
  const [range, setRange] = useState(FIVE_YEAR);
  const [series, setSeries] = useState(DAILY);
  const [data, setData] = useState({});
  //* Do we need to update the data
  const [update, setUpdate] = useState(true);

  //* When the component is mounted we just need
  //* to load the data, and update the state.
  useEffect(() => {
    //* Here we will create a 'async' getData function. Here
    //* you will call all of the functions required apon load.
    async function getData() {
      if (update) {
        //* Now update the state with the response
        //* Set the data
        setData({
          ...data, //* Update data  { ...data, [range]: newData }
          [range]: await getLocalData(
            "close", //* key
            "fetchChartPrice", //* func
            [series, range, false], //* args
            `price${series}${range}close`, //* saveas
          ),
        });
        setUpdate(false);
      }
    }
    //* Now you call the getData function
    getData();
  }, [series, range]);

  //* Get the keys and values from the data
  const { keys, values } = !data[range] ? {} : data[range];

  //* Create our dataset
  const dataset = [];

  //* We must wait until our values are populated before
  //* attempting to make the 'traces' or 'sets'
  if (values) {
    //* Now we must fill our dataset with some 'traces' or 'sets' of data
    //* In this case I am going to make a chart to display the net income
    dataset.push({
      name: "Stock Price",
      type: "line",
      color: "rgba(39, 91, 232, 1)",
      outline: "rgba(39, 91, 232, 1)",
      fillcolor: "rgba(39, 91, 232, .3)",
      fill: "tonexty",
      //* Since our VALUES array contains many different values, we must select
      //* one VALUE per 'trace' or 'set' to display.
      values: values,
    });
  }

  //* Change the series and update the data
  function updateSeries(series, newSeries) {
    if (series !== newSeries) {
      setSeries(newSeries);
      setUpdate(true);
    }
  }

  //* Change the range and update the data
  function updateRange(range, newRange) {
    if (range !== newRange) {
      setRange(newRange);
      if (!data[newRange]) setUpdate(true);
    }
  }

  //* Return the chart
  return (
    <>
      <div className="selector">
        <label>Stock Price</label>
        {getSelectors(series, range, updateSeries, updateRange)}
      </div>
      <div className="wrapper">
        <UniversalChart
          className="stock-price-chart"
          keys={keys}
          dataset={dataset}
          showlegend={false}
          backgroundColor="fff"
          plotBackgroundColor="rgba(30, 34, 45, 0)"
          margin={{ l: 50, r: 50, b: 25, t: 35 }}
          hoverdistance={50}
          hovermode="x"
          xaxis={{ rangebreaks: [{ pattern: "day of week", bounds: ["sat", "mon"] }] }}
        />
      </div>
    </>
  );
}

//* Get the options/selector buttons
function getSelectors(series, range, updateSeries, updateRange) {
  return (
    <div className="dropdown-selector-menu-key">
      <DropdownButton className="dropdown-selector" title={range} size="sm" variant="secondary">
        <Dropdown.Item onClick={() => updateRange(range, ALL)}>All</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => updateRange(range, TEN_YEAR)}>10 Year</Dropdown.Item>
        <Dropdown.Item onClick={() => updateRange(range, FIVE_YEAR)}>5 Year</Dropdown.Item>
        <Dropdown.Item onClick={() => updateRange(range, YEAR)}>1 Year</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => updateRange(range, SIX_MONTH)}>6 Month</Dropdown.Item>
        <Dropdown.Item onClick={() => updateRange(range, THREE_MONTH)}>3 Month</Dropdown.Item>
        <Dropdown.Item onClick={() => updateRange(range, MONTH)}>1 month</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => updateRange(range, WEEK)}>1 Week</Dropdown.Item>
      </DropdownButton>

      {/* Potential future add-on */}
      {/* <DropdownButton id="dropdown-basic-button" title={series}>
        <Dropdown.Item onClick={() => updateSeries(series, DAILY)}>Daily</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => updateSeries(series, FOUR_HOUR)}>4 Hour</Dropdown.Item>
        <Dropdown.Item onClick={() => updateSeries(series, HOUR)}>1 Hour</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => updateSeries(series, THIRTY_MINUTE)}>30 Minute</Dropdown.Item>
        <Dropdown.Item onClick={() => updateSeries(series, FIFTEEN_MINUTE)}>
          15 Minute
        </Dropdown.Item>
        <Dropdown.Item onClick={() => updateSeries(series, MINUTE)}>1 Minute</Dropdown.Item>
      </DropdownButton> */}
    </div>
  );
}
