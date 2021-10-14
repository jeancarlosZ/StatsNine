import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { ALL, DAILY, fetchChartPrice, MONTH, WEEK } from '../../api/api';
import { getLocalData } from '../../store/local/localActions';
import UniversalChart from '../UniversalChart';

export default function StockPriceChart() {
  const [range, setRange] = useState(ALL);
  const [series, setSeries] = useState(DAILY);
  const [data, setData] = useState({});

  const [update, setUpdate] = useState(true);

  useEffect(() => {
    async function getData() {
      if (update) {
        setData({
          ...data, //* Upate data  { ...data, [range]: newData }
          [range]: await getLocalData(
            'close', //* key
            fetchChartPrice, //* func
            [series, range], //* args
            `price${series}${range}`, //* saveas
            'SPY'
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
      name: 'Stock Price',
      type: 'line',
      color: '#007AFF',
      outline: 'rgba(39, 91, 232, 1)',
      fillcolor: 'rgba(244, 247, 255, .6)',
      fill: 'tonexty',

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
    <div className="rounded-3 ">
      <div className="selector rounded-3">
        <label className="text-white">Stock Price</label>
        {getSelectors(series, range, updateSeries, updateRange)}
      </div>
      <div className="wrapper">
        <UniversalChart
          className="ohlc"
          keys={keys}
          dataset={dataset}
          showlegend={false}
          backgroundColor="fff"
          plotBackgroundColor="rgba(30, 34, 45, 0)"
          xaxis={{ gridcolor: 'fff' }}
          yaxis={{ gridcolor: 'fff' }}
        />
      </div>
    </div>
  );
}

function getSelectors(series, range, updateSeries, updateRange) {
  return (
    <div>
      <DropdownButton
        className="dropdown-selector"
        title={range}
        size="sm"
        variant="secondary">
        <Dropdown.Item onClick={() => updateRange(range, ALL)}>
          All
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => updateRange(range, MONTH)}>
          1 month
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => updateRange(range, WEEK)}>
          1 Week
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
}
