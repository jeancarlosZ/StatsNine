import React, { useState, useEffect } from 'react';
import UniversalChart from '../../UniversalChart';
import FinTable from './FinTable';
import CompanyInfo from './CompanyInfo';
import { fetchCashflowStatement, fetchStockProfile } from '../../../api/api';
import { getLocalData } from '../../../store/local/localActions';
import { cashflowTableLabels, cashflowIndentifiers } from './finTableLabels';
import { FinButtons } from './FinButtons';
import {
  returnProfile,
  calcYearlyChanges,
  formatNestedArrayNums,
  getDates,
  returnUnformatedData,
} from './finUtils';

//Right now I'm fetching from API at every sub page
//That's not what we want and I'll be optimizing with some of the tools we have
export default function Cash() {
  const [cashflowInfo, setCashflowInfo] = useState({});
  const [profile, setProfile] = useState({});

  useEffect(() => {
    async function getCashflowInfo() {
      setCashflowInfo(
        //here we are fetching only what we need from the income statement
        await getLocalData(
          [...cashflowIndentifiers],
          fetchCashflowStatement,
          [false, 'annual'],
          [...cashflowIndentifiers]
        )
      );
    }
    getCashflowInfo();
  }, []);

  const companyProfile = returnProfile(profile);

  //**------------------------------------------------------------------------------------------------ */

  let unformatedDataNums = [];
  let rawDates;

  //incomeInfo will be returned in this format
  //{dates: {keys: [...etc], values: [...etc]} grossProfit: {keys: [...etc], values: [...etc]}}

  if (Object.keys(cashflowInfo).length) {
    //When incomeInfo has been populated we'll destructure what we need
    // rawDates are in this format--"2021-06-30"--and need to be processed with getDates() before putting into table
    const { dates } = cashflowInfo;
    rawDates = dates.keys;

    //Here i'm passing in my local state object and an array of identifiers to a helper function that will extract the data for
    //those identifers and return a 2D array of the raw data numbers and set it equal to 'unformatedDataNums'
    unformatedDataNums = returnUnformatedData(
      cashflowInfo,
      cashflowIndentifiers
    );
  }
  //Here i'm passing the rawDates to be processed to look like this...'2021'
  const dates = Object.keys(cashflowInfo).length ? getDates(rawDates) : [];
  //Here i'm passing in the raw income numbers to be processed and look like this...'123.3T' instead of '123300000000000'
  const infoArray = formatNestedArrayNums(unformatedDataNums);
  //Here i'm calculating the change between a year and the previous year
  const yearlyChanges = calcYearlyChanges(unformatedDataNums);

  //**------------------------------------------------------------------------------------------------ */

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
      {Object.keys(cashflowInfo).length ? (
        <FinTable
          dates={dates}
          rowInfo={infoArray}
          yearlyChanges={yearlyChanges}
          labels={cashflowTableLabels}
        />
      ) : (
        <div className="table-space">Loading...</div>
      )}
    </>
  );
}
