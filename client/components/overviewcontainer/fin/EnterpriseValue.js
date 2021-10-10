import React, { useState, useEffect } from 'react';
import UniversalChart from '../../UniversalChart';
import { Price } from '../PriceChart';
import Subheader from '../../Subheader';
import { FinancialsNavBar } from './Financialspage';
import FinTable from './FinTable';
import { fetchEnterpriseValue } from '../../../api/api';

export default function EnterpriseValue() {
  const [enterpriseInfo, setEnterpriseInfo] = useState({});

  useEffect(() => {
    async function getEnterpriseInfo() {
      setEnterpriseInfo(await fetchEnterpriseValue('MSFT'));
    }
    getEnterpriseInfo();
  }, []);

  console.log(enterpriseInfo);
  const { values } = enterpriseInfo;
  let info;
  let infoArray = [];
  const labels = [
    'Date',
    'Enterprise Value',
    'Market Cap',
    'Number Of Shares',
    'Add Total Debt',
  ];

  if (values) {
    info = values.splice(values.length - 6).reverse();
    infoArray.push(info.map((info) => info.date));
    infoArray.push(info.map((info) => info.enterpriseValue));
    infoArray.push(info.map((info) => info.marketCapitalization));
    infoArray.push(info.map((info) => info.numberOfShares));
    infoArray.push(info.map((info) => info.addTotalDebt));
  }

  return (
    <>
      <Subheader />
      <div className="main flex-col justify-center">
        <div className="card align-self justify-around">
          <FinancialsNavBar />
          <div className="income-container flex-row justify-around">
            <CompanyInfo />
            <DividendsChart />
          </div>
          <Buttons />
          {values ? (
            <FinTable rowInfo={infoArray} labels={labels} />
          ) : (
            <div>Loading...</div>
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
        <span className="company-name bold">DIVIDENDS CORP.</span>
        <div className="ticker-container flex-row justify-between">
          <span className="ticker bold">MSFT</span>
          <span className="bold">NASDAQ</span>
        </div>
      </div>
    </div>
  );
}

function DividendsChart() {
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
