import React, { useState, useEffect } from 'react';
import UniversalChart from '../../UniversalChart';
import { Price } from '../PriceChart';
import Subheader from '../../Subheader';
import { FinancialsNavBar } from './Financialspage';
import FinTable from './FinTable';
import { fetchBalanceStatement } from '../../../api/api';

export default function Balance() {
  const [balanceInfo, setBalanceInfo] = useState({});

  useEffect(() => {
    async function getBalanceInfo() {
      setBalanceInfo(await fetchBalanceStatement('MSFT'));
    }
    getBalanceInfo();
  }, []);

  const { values } = balanceInfo;
  let info;
  let infoArray = [];
  const labels = [
    'Date',
    'Total Assets',
    'Total Liabilities',
    'Total Equity',
    'Total Debt',
    'Longterm Debt',
  ];
  if (values) {
    info = values.slice(values.length - 6).reverse();
    infoArray.push(info.map((info) => info.date));
    infoArray.push(info.map((info) => info.totalAssets));
    infoArray.push(info.map((info) => info.totalLiabilities));
    infoArray.push(info.map((info) => info.totalStockholdersEquity));
    infoArray.push(info.map((info) => info.totalDebt));
    infoArray.push(info.map((info) => info.longTermDebt));
  }
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
          {values ? (
            <FinTable rowInfo={infoArray} labels={labels} />
          ) : (
            <div className="table-space">Loading...</div>
          )}
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
    <div className="fin-button-container align-self pos-rel flex-row justify-around">
      <button className="buttons">Annual</button>
      <button className="buttons">Quarterly</button>
    </div>
  );
}
