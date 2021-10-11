import React, { useState, useEffect } from 'react';
import UniversalChart from '../../UniversalChart';
import { Price } from '../PriceChart';
import Subheader from '../../Subheader';
import { FinancialsNavBar } from './Financialspage';
import FinTable from './FinTable';
import CompanyInfo from './CompanyInfo';
import { fetchEnterpriseValue, fetchStockProfile } from '../../../api/api';
import { useSelector } from 'react-redux';
import {
  returnProfile,
  returnTableInfo,
  calcYearlyChanges,
  formatNestedArrayNums,
} from './finUtils';
import { FinButtons } from './FinButtons';

//Right now I'm fetching from API at every sub page
//That's not what we want and I'll be optimizing with some of the tools we have
export default function EnterpriseValue() {
  const { ticker } = useSelector((state) => state.local);
  const [enterpriseInfo, setEnterpriseInfo] = useState({});
  const [profile, setProfile] = useState({});

  useEffect(() => {
    async function getEnterpriseInfo() {
      setEnterpriseInfo(await fetchEnterpriseValue(ticker));
      setProfile(await fetchStockProfile(ticker));
    }
    getEnterpriseInfo();
  }, []);

  const companyProfile = returnProfile(profile);

  //These are the values returned from the fetch. Can be used in our charts!
  const { values } = enterpriseInfo;

  //Labels for Financials Tables
  //Right now formatting the labels and using them to fetch
  //Empty string is for date
  const labels = [
    'Enterprise Value',
    'Market Capitalization',
    'Number Of Shares',
    'Add Total Debt',
  ];

  //Returning a 2D array
  //Every inner array is a row of info relating to the above labels
  const unformatedDataNums = values ? returnTableInfo(values, labels) : [];

  const infoArray = formatNestedArrayNums(unformatedDataNums);
  const yearlyChanges = calcYearlyChanges(unformatedDataNums);

  //This is for our Chart information
  //Generate the data set and pass it into UniversalChart which is already in the return statement
  //Right now it's all place holder data
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
    <>
      <div className="income-container flex-row justify-between">
        <CompanyInfo
          companyName={companyProfile.companyName}
          symbol={companyProfile.symbol}
          ticker={companyProfile.exchangeShortName}
        />
        <div className="fin-chart-container">
          <UniversalChart
            className="enterprise-chart fin-chart "
            title="Net Income"
            dataset={dataset}
            showlegend={false}
          />
        </div>
      </div>
      <FinButtons />
      {values ? (
        <FinTable
          rowInfo={infoArray}
          labels={labels}
          yearlyChanges={yearlyChanges}
        />
      ) : (
        <div className="table-space">Loading...</div>
      )}
    </>
  );
}
