import React, { useEffect, useState } from 'react';
import UniversalChart from '../../UniversalChart';
import { fetchMarketCap } from '../../../api/api';

export default function SnP500() {
  const [marketData, setMarketData] = useState({});

  useEffect(() => {
    async function getData() {
      setMarketData(await fetchMarketCap('AAPL'));
    }
    getData();
  }, []);

  console.log('Market Data:', marketData);

  const { keys, values } = marketData;

  console.log('Keys:', keys);
  console.log('Values:', values);

  const dataset = [];

  if (values) {
    dataset.push({
      name: 'S&P 500',
      type: 'bar',
      color: '#00887b',
      outline: '#34b87d',
      domain: { row: 1, column: 0 },

      // values: values.map(x => x.price),
    });
  }

  return (
    <>
      <UniversalChart
        className="example-chart"
        title="Market Data"
        dataset={dataset}
        showlegend={false}
      />
    </>
  );
}
