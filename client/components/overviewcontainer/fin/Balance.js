import React, { useState, useEffect } from 'react';
import UniversalChart from '../../UniversalChart';
import FinTable from './FinTable';
import { fetchBalanceStatement, fetchStockProfile } from '../../../api/api';
import { getLocalData } from '../../../store/local/localActions';
import { balanceTableLabels, balanceIndentifiers } from './finTableLabels';
import CompanyInfo from './CompanyInfo';
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
export default function Balance() {
  const [selectedAttribute, setSelectedAttribute] = useState('totalAssets');
  const [balanceInfo, setBalanceInfo] = useState({});
  const [profile, setProfile] = useState({});

  useEffect(() => {
    async function getBalanceInfo() {
      setBalanceInfo(
        //here we are fetching only what we need from the income statement
        await getLocalData(
          [...balanceIndentifiers],
          fetchBalanceStatement,
          [false, 'annual'],
          [...balanceIndentifiers]
        )
      );
    }
    getBalanceInfo();
  }, []);

  //Fetching the company profile
  useEffect(() => {
    async function getData() {
      //* Fetch data from API
      const { symbol, companyName, image } = await getLocalData(
        ['symbol', 'companyName', 'image'],
        fetchStockProfile,
        [],
        ['symbol', 'companyName', 'image']
      );
      setProfile({ symbol, companyName, image });
    }
    getData();
  }, []);

  //A handler function being passed down to the table that will affect the local state of this component
  function handleTableClick(attribute) {
    setSelectedAttribute(attribute);
  }
  //**------------------------------------------------------------------------------------------------ */

  let unformatedData = [];
  let rawDates;

  let chartData = [];
  let keys = [];

  if (Object.keys(balanceInfo).length) {
    //----------------------------------------//
    //chartData testing
    chartData = balanceInfo[selectedAttribute].values;
    keys = balanceInfo.totalAssets.keys;

    // console.log(keys, 'chartData...');
    //----------------------------------------//
    //When balanceInfo has been populated we'll destructure what we need
    // rawDates are in this format--"2021-06-30"--and need to be processed with getDates() before putting into table
    const { dates } = balanceInfo;
    rawDates = dates.keys;

    //Here i'm passing in my local state object and an array of identifiers to a helper function that will extract the data for
    //those identifers and return a 2D array of the raw data numbers and set it equal to 'unformatedDataNums'
    unformatedData = returnUnformatedData(balanceInfo, balanceIndentifiers);
  }
  //Here i'm passing the rawDates to be processed to look like this...'2021'
  const dates = Object.keys(balanceInfo).length ? formatDates(rawDates) : [];
  //Here i'm passing in the raw income numbers to be processed and look like this...'123.3T' instead of '123300000000000'
  const rows = formatRows(unformatedData);
  //Here i'm calculating the change between a year and the previous year
  const yearlyChanges = calcYearlyChanges(unformatedData);
  //Here i'm creating an object with all of my relevent table info that I can pass on to the table
  const tableInfo = {
    dates,
    rows,
    yearlyChanges,
    labels: balanceTableLabels,
    attributes: balanceIndentifiers,
  };

  //**------------------------------------------------------------------------------------------------ */

  const dataset = [];

  //This is for our Chart information
  //Generate the data set and pass it into UniversalChart which is already in the return statement
  //Right now it's all place holder data
  // dataset.push({
  //   name: 'Balance',
  //   type: 'line',
  //   values: chartData,
  //   color: 'rgba(44, 221, 155, 0.3)',
  //   outline: 'rgba(44, 221, 155, 0.6)',
  //   hoverinfo: 'label+percent+name',
  //   fillcolor: 'rgba(39, 91, 232, .3)',
  //   fill: 'tonexty',
  // });

  dataset.push({
    name: 'Balance',
    type: 'scatter',
    color: 'rgba(44, 221, 155, 0.3)',
    outline: 'rgba(44, 221, 155, 0.6)',
    values: chartData,
    hoverinfo: 'label+percent+name',
    fillcolor: 'rgba(39, 91, 232, .3)',
    fill: 'tonexty',
  });

  return (
    <>
      <div className="income-container flex-row justify-between">
        <CompanyInfo profile={profile} />
        <div className="fin-chart-container">
          <UniversalChart
            className="income-chart fin-chart"
            title="Balance"
            keys={keys}
            margin={{ l: 50, r: 50, b: 25, t: 35 }}
            plotBackgroundColor="rgba(30, 34, 45, 0)"
            dataset={dataset}
            showlegend={false}
            hoverdistance={50}
            hovermode="x"
          />
        </div>
      </div>
      {/* <FinButtons /> */}
      <FinTable tableInfo={tableInfo} handleTableClick={handleTableClick} />
    </>
  );
}
