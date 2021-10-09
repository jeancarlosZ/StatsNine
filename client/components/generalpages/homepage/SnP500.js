import React, { useEffect, useState } from 'react';
import UniversalChart from '../../UniversalChart';
import { fetchIncomeStatement } from '../../../api/api';

export default function SnP500() {
  const [progressData, setProgressData] = useState({});

  useEffect(() => {
    async function getData() {
      setProgressData(await fetchIncomeStatement('AAPL'));
    }

    getData();
  }, []);

  console.log('Progress Data:', progressData);

  const { keys, values } = progressData;

  console.log('Keys:', keys);
  console.log('Values:', values);

  const dataset = [];

  if (values) {
    dataset.push({
      name: 'current progress',
      type: 'line',
      color: '#00887b',
      outline: '#34b87d',

      values: values.map(x => x.netIncome),
    });
  }

  return (
    <>
      <UniversalChart
        className="monitor-chart"
        title=""
        keys={keys}
        dataset={dataset}
        showlegend={false}
      />
    </>
  );
}
