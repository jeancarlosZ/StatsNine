import React from 'react';
import UniversalChart from '../../UniversalChart';
import { Price } from '../PriceChart';

export default function Financialspage() {
  return (
    <div className="fin-container flex-col justify-around">
      <FinancialsNavBar />
      <div className="income-container flex-col">
        <span className="flex-row justify-around">
          <CompanyInfo />
          <IncomeChart />
        </span>
      </div>
      <Table />
    </div>
  );
}

function FinancialsNavBar() {
  return (
    <nav className="fin-nav">
      <button>Income Statement</button>
      <button>Balance Sheet</button>
      <button>Cash Flow</button>
      <button>Dividends</button>
    </nav>
  );
}
function CompanyInfo() {
  return (
    <div className="company-container align-self flex-col">
      <div className="company-info">
        <span className="company-name">MICROSOFT CORP.</span>
        <div className="ticker-container flex-row justify-between">
          <span className="ticker">MSFT</span>
          <span className="market">NASDAQ</span>
        </div>
        <span className="income-price">
          <Price />
        </span>
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
      className="income-statement-chart"
      title="Net Income"
      dataset={dataset}
      showlegend={false}
    />
  );
}

function Table() {
  return <div className="table">Table</div>;
}
