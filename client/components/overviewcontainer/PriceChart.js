import React from 'react';
import UniversalChart from '../UniversalChart';

export default function PriceChart() {
  return (
    <div className="price-chart flex-col align-self">
      <span className="price-container flex-row justify-evenly">
        <Price />
        <USD />
      </span>
      <OverviewChart />
    </div>
  );
}

function OverviewChart() {
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
    <UniversalChart
      className="example-chart align-self justify-center"
      title="Net Income"
      dataset={dataset}
      showlegend={false}
    />
  );
}
export function Price() {
  return <div>$289.65</div>;
}

function USD() {
  return <div className="usd">USD</div>;
}
