import React, { useState, useEffect } from 'react';
import UniversalChart from '../../UniversalChart';
import { Price } from '../PriceChart';
import FinTable from './FinTable';
import { fetchIncomeStatement } from '../../../api/api';

export default function Income() {
  const [incomeInfo, setIncomeInfo] = useState({});

  useEffect(() => {
    async function getIncomeInfo() {
      setIncomeInfo(await fetchIncomeStatement('MSFT'));
    }
    getIncomeInfo();
  }, []);

  const { values } = incomeInfo;
  let info;
  let infoArray;

  if (values) {
    info = values.splice(values.length - 6).reverse();
    const dates = info.map((info) => info.date);
    const grossProfit = info.map((info) => info.grossProfit);
    const operatingExpenses = info.map((info) => info.operatingExpenses);
    const operatingIncome = info.map((info) => info.operatingIncome);
    const incomeBeforeTax = info.map((info) => info.incomeBeforeTax);
    const incomeTaxExpense = info.map((info) => info.incomeTaxExpense);
    infoArray = [
      dates,
      grossProfit,
      operatingExpenses,
      operatingIncome,
      incomeBeforeTax,
      incomeTaxExpense,
    ];
  }

  return (
    <React.Fragment>
      <div className="income-container flex-row justify-around">
        <CompanyInfo />
        <IncomeChart />
      </div>
      <Buttons />
      {values ? <FinTable rowInfo={infoArray} /> : <div>Loading...</div>}
    </React.Fragment>
  );
}

function CompanyInfo() {
  return (
    <div className="company-container align-self flex-col">
      <div className="company-info pos-rel">
        <span className="company-name bold">INCOME CORP.</span>
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
    type: 'scatter',
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
