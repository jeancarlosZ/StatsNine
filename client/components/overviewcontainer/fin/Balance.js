import React from 'react';
import UniversalChart from '../../UniversalChart';
import { Price } from '../PriceChart';
import Subheader from '../../Subheader';
import { FinancialsNavBar } from './Financialspage';
import FinTable from './FinTable';

export default function Balance() {
  return (
    <>
      <Subheader />
      <div className="main flex-col justify-center">
        <div className="card align-self justify-around">
          <FinancialsNavBar />
          <div className="income-container flex-row justify-around">
            <CompanyInfo />
            <BalanceChart />
          </div>
          <Buttons />
          <FinTable />
        </div>
      </div>
    </>
  );
}

function CompanyInfo() {
  return (
    <div className="company-container align-self flex-col">
      <div className="company-info pos-rel">
        <span className="company-name bold">BALANCE CORP.</span>
        <div className="ticker-container flex-row justify-between">
          <span className="ticker bold">MSFT</span>
          <span className="bold">NASDAQ</span>
        </div>
        <Price />
      </div>
    </div>
  );
}

function BalanceChart() {
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

function Buttons() {
  return (
    <div className="fin-button-container align-self pos-rel">
      <button className="buttons">Annual</button>
      <button className="buttons">Quarterly</button>
    </div>
  );
}
