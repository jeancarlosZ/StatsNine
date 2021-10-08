import React from 'react';
import UniversalChart from '../../UniversalChart';
import { Price } from '../PriceChart';

export default function Financialspage() {
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
    <div className="main-container">
      <nav className="financials-nav">
        <button>Income Statement</button>
        <button>Balance Sheet</button>
        <button>Cash Flow</button>
        <button>Dividends</button>
      </nav>
      <div className="income-container">
        <div className="company-info">
          <div className="company-name">MICROSOFT CORP.</div>
          <div className="ticker-container flex-row">
            <div className="ticker">MSFT</div>
            <div className="market">NASDAQ</div>
          </div>
          <div className="income-price">
            <Price />
          </div>
        </div>
        <UniversalChart
          className="income-statement-chart"
          title="Net Income"
          dataset={dataset}
          showlegend={false}
        />
      </div>
    </div>
  );
}
