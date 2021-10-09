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
  let infoArray;
  if (values) {
    info = values.splice(values.length - 6).reverse();
    const dates = info.map((info) => info.date);
    const totalAssets = info.map((info) => info.totalAssets);
    const totalLiabilities = info.map((info) => info.totalLiabilities);
    const totalEquity = info.map((info) => info.totalStockholdersEquity);
    const totalDebt = info.map((info) => info.totalDebt);
    const longTermDebt = info.map((info) => info.longTermDebt);
    infoArray = [
      dates,
      totalAssets,
      totalLiabilities,
      totalEquity,
      totalDebt,
      longTermDebt,
    ];
  }
  console.log(info);
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
          {values ? <FinTable rowInfo={infoArray} /> : <div>Loading...</div>}
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
    <div className="fin-button-container align-self pos-rel">
      <button className="buttons">Annual</button>
      <button className="buttons">Quarterly</button>
    </div>
  );
}
