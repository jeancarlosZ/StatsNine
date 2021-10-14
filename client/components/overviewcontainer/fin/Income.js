import React, { useState, useEffect } from 'react';
import UniversalChart from '../../UniversalChart';
import FinTable from './FinTable';
import CompanyInfo from './CompanyInfo';
import {
  fetchIncomeStatement,
  fetchStockProfile,
  fetchFullStatement,
} from '../../../api/api';
import { getLocalData } from '../../../store/local/localActions';
import { incomeTableLabels, incomeIndentifiers } from './finTableLabels';
import { FinButtons } from './FinButtons';
import {
  calcYearlyChanges,
  formatRows,
  formatDates,
  returnUnformatedData,
} from './finUtils';

//Using the getLocalData method
//This method first checks to see if the requested data is in our redux store. If it is, return it, otherwise fetch what we need and log
//that into the local component sate and redux state

export default function Income() {
  const [selectedAttribute, setSelectedAttribute] = useState([
    'grossProfit',
    'Gross Profit',
    'rgba(39, 91, 232, 1)',
    'rgba(39, 91, 232, .3)',
  ]);
  const [incomeInfo, setIncomeInfo] = useState({});
  const [incomeInfoQtr, setIncomeQtr] = useState({});
  const [profile, setProfile] = useState({});

  useEffect(() => {
    async function getIncomeInfo() {
      //here we are fetching only what we need from the income statement
      setIncomeInfo(
        await getLocalData(
          [...incomeIndentifiers],
          fetchIncomeStatement,
          [false, 'annual'],
          [...incomeIndentifiers]
        )
      );

      //here we are fetching the stock profile
      const { symbol, companyName, image } = await getLocalData(
        ['symbol', 'companyName', 'image'],
        fetchStockProfile,
        [],
        ['symbol', 'companyName', 'image']
      );
      setProfile({ symbol, companyName, image });
    }

    getIncomeInfo();
  }, []);

  //Here we are fetching the quaterly info
  //I tried putting it in the above use effect but it did not fetch???
  useEffect(() => {
    async function getIncomeInfoQtr() {
      setIncomeQtr(
        //here we are fetching only what we need from the statement
        await getLocalData(
          [...incomeIndentifiers],
          fetchIncomeStatement,
          [false, 'quarter'],
          [...incomeIndentifiers]
        )
      );
    }
    getIncomeInfoQtr();
  }, []);

  //A handler function being passed down to the table that will affect the local state of this component
  function handleTableClick(attribute) {
    setSelectedAttribute(attribute);
  }

  //**------------------------------------------------------------------------------------------------ */
  //CHART DATA
  //**------------------------------------------------------------------------------------------------ */

  //This is the data I'll put in the chart
  //Selected attribute is defined by what is clicked on in the table
  const attribute = selectedAttribute[0];
  const label = selectedAttribute[1];
  const color = selectedAttribute[2];
  const outline = selectedAttribute[3];
  let chartData = [];
  let keys = [];

  if (Object.keys(incomeInfoQtr).length) {
    //Here i'm grabbing a particular array from the fetched object
    chartData = incomeInfoQtr[attribute].values;
    //The keys taken from he fetch ar the dates
    keys = incomeInfoQtr[attribute].keys;
  }

  const dataset = [];

  dataset.push({
    name: 'Stock Price',
    type: 'line',
    color: color,
    // outline: 'rgba(39, 91, 232, 1)',
    fillcolor: outline,
    fill: 'tonexty',
    values: chartData,
  });

  //**------------------------------------------------------------------------------------------------ */
  //TABLE DATA
  //**------------------------------------------------------------------------------------------------ */

  let unformatedData = [];
  let rawDates;

  if (Object.keys(incomeInfo).length) {
    //When cashflowInfo has been populated we'll destructure what we need
    // rawDates are in this format--"2021-06-30"--and need to be processed with getDates() before putting into table
    const { dates } = incomeInfo;
    rawDates = dates.keys;

    //Here i'm passing in my local state and an array of identifiers to a helper function that will extract the data for
    //those identifers and return a 2D array of the raw data numbers and set it equal to 'unformatedData'
    unformatedData = returnUnformatedData(incomeInfo, incomeIndentifiers);
    // console.log(unformatedData, 'unformated income data...');
  }
  //Here i'm passing the rawDates to be processed to look like this...'2021'
  const dates = Object.keys(incomeInfo).length ? formatDates(rawDates) : [];
  //Here i'm passing in the raw numbers to be processed and look like this...'123.3T' instead of '123300000000000'
  const rows = formatRows(unformatedData);
  //Here i'm calculating the change between a year and the previous year
  const yearlyChanges = calcYearlyChanges(unformatedData);
  //Here i'm creating an object with all of my relevent table info that I can pass on to the table
  const tableInfo = {
    dates,
    rows,
    yearlyChanges,
    labels: incomeTableLabels,
    attributes: incomeIndentifiers,
  };
  //**------------------------------------------------------------------------------------------------ */
  //RENDER
  //**-------------------------------------------------------------------------------------------------- */
  return (
    <>
      <div className="flex-col">
        <div className="income-container flex-row justify-between">
          <CompanyInfo profile={profile} />
          <div className="fin-chart-container pos-rel">
            <UniversalChart
              className="income-chart fin-chart"
              title={label}
              keys={keys}
              margin={{ l: 50, r: 50, b: 25, t: 35 }}
              plotBackgroundColor="rgba(33, 34, 45, 0)"
              dataset={dataset}
              showlegend={false}
              hoverdistance={50}
              hovermode="x"
              backgroundColor="fff"
            />
          </div>
        </div>
        <FinTable tableInfo={tableInfo} handleTableClick={handleTableClick} />
      </div>
      {/* <FinButtons /> */}
    </>
  );
}
