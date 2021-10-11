import React, { useState, useEffect } from 'react';
import UniversalChart from '../../UniversalChart';
import { Price } from '../PriceChart';
import FinTable from './FinTable';
import CompanyInfo from './CompanyInfo';
import { fetchIncomeStatement, fetchStockProfile } from '../../../api/api';
import { getLocalData } from '../../../store/local/localActions';
import { incomeTablelabels } from './finTableLabels';
import { FinButtons } from './FinButtons';
import {
  returnProfile,
  // returnTableInfo,
  calcYearlyChanges,
  formatNestedArrayNums,
  getDates,
  incomeArray,
  returnUnformatedData,
} from './finUtils';

//Using the getLocalData method
//This method first checks to see if the requested data is in our redux store. If it is, return it, otherwise fetch what we need an log
//that into the local component sate and redux state
export default function Income() {
  const [incomeInfo, setIncomeInfo] = useState({});
  const [profile, setProfile] = useState({});

  useEffect(() => {
    async function getIncomeInfo() {
      setIncomeInfo(
        //here we are fetching an array of items
        await getLocalData(
          [...incomeArray],
          fetchIncomeStatement,
          [false, 'annual'],
          [...incomeArray]
        )
      );
    }
    getIncomeInfo();
  }, []);

  const companyProfile = returnProfile(profile);
  let unformatedDataNums = [];
  let rawDates;
  //**------------------------------------------------------------------------------------------------ */

  //incomeInfo will be returned in this format
  //{dates: {keys: [...etc], values: [...etc]} grossProfitL {keys: [...etc], values: [...etc]}}

  if (Object.keys(incomeInfo).length) {
    const { dates } = incomeInfo;
    rawDates = dates.keys;

    unformatedDataNums = returnUnformatedData(incomeInfo, [
      'grossProfit',
      'operatingExpenses',
      'operatingIncome',
      'incomeBeforeTax',
      'incomeTaxExpense',
    ]);
  }

  const dates = Object.keys(incomeInfo).length ? getDates(rawDates) : [];
  const infoArray = formatNestedArrayNums(unformatedDataNums);
  const yearlyChanges = calcYearlyChanges(unformatedDataNums);

  //**------------------------------------------------------------------------------------------------ */
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
  //**-------------------------------------------------------------------------------------------------- */
  return (
    <React.Fragment>
      <div className="income-container flex-row justify-between">
        <CompanyInfo
          companyName={companyProfile.companyName}
          symbol={companyProfile.symbol}
          ticker={companyProfile.exchangeShortName}
        />
        <div className="fin-chart-container">
          <UniversalChart
            className="income-chart fin-chart"
            title="Net Income"
            dataset={dataset}
            showlegend={false}
          />
        </div>
      </div>
      <FinButtons />
      {Object.keys(incomeInfo).length ? (
        <FinTable
          dates={dates}
          rowInfo={infoArray}
          yearlyChanges={yearlyChanges}
          labels={incomeTablelabels}
        />
      ) : (
        <div className="table-space">Loading...</div>
      )}
    </React.Fragment>
  );
}
