import React, { useState, useEffect } from 'react';
import UniversalChart from '../../UniversalChart';
import { Price } from '../PriceChart';
import Subheader from '../../Subheader';
import { FinancialsNavBar } from './Financialspage';
import FinTable from './FinTable';
import CompanyInfo from './CompanyInfo';
import { fetchCashflowStatement, fetchStockProfile } from '../../../api/api';
import { useSelector } from 'react-redux';
import { returnProfile, returnTableInfo } from './finUtils';
import { FinButtons } from './FinButtons';

//Right now I'm fetching from API at every sub page
//That's not what we want and I'll be optimizing with some of the tools we have
export default function Cash() {
  const { ticker } = useSelector((state) => state.local);
  const [cashflowInfo, setCashflowInfo] = useState({});
  const [profile, setProfile] = useState({});

  useEffect(() => {
    async function getCashflowInfo() {
      setCashflowInfo(await fetchCashflowStatement(ticker));
      setProfile(await fetchStockProfile(ticker));
    }
    getCashflowInfo();
  }, []);

  const companyProfile = returnProfile(profile);

  //These are the values returned from the fetch. Can be used in our charts!
  const { values } = cashflowInfo;

  //Labels for Financials Tables
  //Right now formatting the labels and using them to fetch
  //Empty string is for date
  const labels = [
    '',
    'Capital Expenditure',
    'Free Cash Flow',
    'Operating Cash Flow',
    'Other Investing Activites',
    'Other Financing Activites',
  ];

  //Returning a 2D array
  //Every inner array is a row of info relating to the above labels
  const infoArray = values ? returnTableInfo(values, labels) : [];

  //This is for our Chart information
  //Generate the data set and pass it into UniversalChart which is already in the return statement
  //Right now it's all place holder data
  const dataset = [];

  dataset.push({
    name: 'Income',
    type: 'pie',
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
            className="cash-chart fin-chart"
            title="Net Income"
            dataset={dataset}
            showlegend={false}
          />
        </div>
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
