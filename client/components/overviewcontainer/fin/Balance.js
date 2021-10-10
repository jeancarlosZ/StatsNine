import React, { useState, useEffect } from 'react';
import UniversalChart from '../../UniversalChart';
import { Price } from '../PriceChart';
import Subheader from '../../Subheader';
import { FinancialsNavBar } from './Financialspage';
import FinTable from './FinTable';
import { fetchBalanceStatement, fetchStockProfile } from '../../../api/api';
import CompanyInfo from './CompanyInfo';
import { useSelector } from 'react-redux';
import { returnProfile, returnTableInfo } from './finUtils';
import { FinButtons } from './FinButtons';

//Right now I'm fetching from API at every sub page
//That's not what we want and I'll be optimizing with some of the tools we have
export default function Balance() {
  const { ticker } = useSelector((state) => state.local);
  const [balanceInfo, setBalanceInfo] = useState({});
  const [profile, setProfile] = useState({});

  useEffect(() => {
    async function getBalanceInfo() {
      setBalanceInfo(await fetchBalanceStatement(ticker));
      setProfile(await fetchStockProfile(ticker));
    }
    getBalanceInfo();
  }, []);

  const companyProfile = returnProfile(profile);

  //These are the values returned from the fetch. Can be used in our charts!
  const { values } = balanceInfo;

  //Labels for Financials Tables
  //Right now formatting the labels and using them to fetch
  //Empty string is for date
  const labels = [
    '',
    'Total Assets',
    'Total Liabilities',
    'Long Term Investments',
    'Total Debt',
    'Common Stock',
  ];

  //Returning a 2D array
  //Every inner array is a row of info relating to the above labels
  const infoArray = values ? returnTableInfo(values, labels) : [];

  const dataset = [];

  //This is for our Chart information
  //Generate the data set and pass it into UniversalChart which is already in the return statement
  //Right now it's all place holder data
  dataset.push({
    name: 'Income',
    type: 'bar',
    labels: ['1st', '2nd', '3rd', '4th', '5th'],
    values: [38, 27, 18, 10, 7],
    hoverinfo: 'label+percent+name',
    domain: { row: 1, column: 0 },
  });

  return (
    <>
      <div className="income-container flex-row justify-around">
        <CompanyInfo
          companyName={companyProfile.companyName}
          symbol={companyProfile.symbol}
          ticker={companyProfile.exchangeShortName}
        />
        <UniversalChart
          className="income-chart"
          title="Net Income"
          dataset={dataset}
          showlegend={false}
        />
      </div>
      <FinButtons />
      {values ? (
        <FinTable rowInfo={infoArray} labels={labels} />
      ) : (
        <div className="table-space">Loading...</div>
      )}
    </>
  );
}
