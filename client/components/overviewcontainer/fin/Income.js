import React, { useState, useEffect } from 'react';
import UniversalChart from '../../UniversalChart';
import { Price } from '../PriceChart';
import FinTable from './FinTable';
import CompanyInfo from './CompanyInfo';
import { fetchIncomeStatement, fetchStockProfile } from '../../../api/api';
import { getLocalData } from '../../../store/local/localActions';
import incomeTableLabels from './finTableLabels';
import {
  returnProfile,
  // returnTableInfo,
  calcYearlyChanges,
  formatNestedArrayNums,
  getDates,
  incomeArray,
  returnUnformatedData,
} from './finUtils';
import { FinButtons } from './FinButtons';

export default function Income() {
  const [incomeInfo, setIncomeInfo] = useState({});
  const [profile, setProfile] = useState({});

  useEffect(() => {
    async function getIncomeInfo() {
      setIncomeInfo(
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

  //Labels for Financials Tables
  //Right now formatting the labels and using them to fetch
  //Empty string is for date
  const labels = [
    'Gross Profit',
    'Operating Expenses',
    'Operating Income',
    'Income Before Tax',
    'Income Tax Expense',
  ];

  let unformatedDataNums = [];
  let rawDates;

  if (Object.keys(incomeInfo).length) {
    const {
      dates: { keys: keyDates },
    } = incomeInfo;

    rawDates = keyDates;

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
          labels={labels}
        />
      ) : (
        <div className="table-space">Loading...</div>
      )}
    </React.Fragment>
  );
}
