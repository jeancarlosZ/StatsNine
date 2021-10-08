import React from 'react';
import UniversalChart from '../UniversalChart';

export default function PriceChart() {
  const dataset = [];

  dataset.push({
    name: 'Liabilities',
    type: 'line',
    labels: ['1st', '2nd', '3rd', '4th', '5th'],
    values: [38, 27, 18, 10, 7],
    hoverinfo: 'label+percent+name',
    domain: { row: 1, column: 0 },
  });

  return (
    <div className="price-chart">
      <div className="price-container">
        <Price />
        <USD />
      </div>

      <UniversalChart
        className="example-chart"
        title="Net Income"
        dataset={dataset}
        showlegend={false}
      />
    </div>
  );
}

function Price() {
  return <div>$289.65</div>;
}

function USD() {
  return <div className="usd">USD</div>;
}
