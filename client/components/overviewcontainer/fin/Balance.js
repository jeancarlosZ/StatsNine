import React from 'react';
import UniversalChart from '../../UniversalChart';
import { Price } from '../PriceChart';

export default function Balance() {
  return (
    <React.Fragment>
      <div className="income-container flex-row justify-around">
        <CompanyInfo />
        <IncomeChart />
      </div>
      <Buttons />
      <Table />
    </React.Fragment>
  );
}

function CompanyInfo() {
  return (
    <div className="company-container align-self flex-col">
      <div className="company-info pos-rel">
        <span className="company-name bold">MICROSOFT CORP.</span>
        <div className="ticker-container flex-row justify-between">
          <span className="ticker bold">MSFT</span>
          <span className="bold">NASDAQ</span>
        </div>
        <Price />
      </div>
    </div>
  );
}

function IncomeChart() {
  const dataset = [];

  dataset.push({
    name: 'Income',
    type: 'bar',
    labels: ['1st', '2nd', '3rd', '4th', '5th'],
    values: [38, 27, 18, 10, 7],
    hoverinfo: 'label+percent+name',
    domain: { row: 1, column: 0 },
  });

  return (
    <UniversalChart
      className="income-chart"
      title="Net Income"
      dataset={dataset}
      showlegend={false}
    />
  );
}

function Table() {
  return <div className="table">Table</div>;
}

function Buttons() {
  return (
    <div className="fin-button-container align-self pos-rel">
      <button className="buttons">Annual</button>
      <button className="buttons">Quarterly</button>
    </div>
  );
}
