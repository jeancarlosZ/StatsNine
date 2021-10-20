import React, { useEffect, useState } from 'react';
import { getLocalData } from '../../../store/local/localActions';
import UniversalChart from '../../UniversalChart';
import CompanyInfo from './CompanyInfo';
import { FinButtons } from './FinButtons';
import FinTable from './FinTable';
import {
  balanceIndentifiers,
  balanceTableLabels,
  getQtrIndentifers,
} from './finTableLabels';
import {
  formatDates,
  processUnformattedData,
  returnUnformatedData,
} from './finUtils';
//Using the getLocalData method
//This method first checks to see if the requested data is in our redux store. If it is, return it, otherwise fetch what we need and log
//that into the local component sate and redux state
export default function Balance() {
  const [selectedAttribute, setSelectedAttribute] = useState([
    'totalAssets',
    'Total Assets',
    'rgba249, 200, 70, 1)',
    'rgba(249, 200, 70, .8)',
  ]);
  const [chartDatatype, setChartDatatype] = useState('annual');
  const [balanceInfo, setBalanceInfo] = useState({});
  const [balanceQtr, setBalanceQtr] = useState({});
  const [profile, setProfile] = useState({});

  //Fetching the data needed
  //Fetching annual, quarterly and company profile
  useEffect(() => {
    async function getBalanceInfo() {
      setBalanceInfo(
        //here we are fetching only what we need from the income statement
        await getLocalData(
          [...balanceIndentifiers],
          'fetchBalanceStatement',
          [false, 'annual'],
          [...balanceIndentifiers]
        )
      );
      //here we are fetching the stock profile
      setProfile(
        await getLocalData(
          [
            'symbol',
            'companyName',
            'image',
            'exchangeShortName',
            'industry',
            'sector',
            'fullTimeEmployees',
            'price',
          ],
          'fetchStockProfile',
          [],
          [
            'symbol',
            'companyName',
            'image',
            'exchangeShortName',
            'industry',
            'sector',
            'fullTimeEmployees',
            'price',
          ]
        )
      );
    }
    getBalanceInfo();
  }, []);
  //Here we are fetching the quaterly info
  //I tried putting it in the above use effect but it did not fetch???
  useEffect(() => {
    async function getBalanceInfoQtr() {
      const { saveAs, qtrIdentifiers } = getQtrIndentifers(balanceIndentifiers);
      setBalanceQtr(
        //here we are fetching only what we need from the statement
        await getLocalData(
          [...qtrIdentifiers],
          'fetchBalanceStatement',
          [false, 'quarter'],
          [...saveAs]
        )
      );
    }
    getBalanceInfoQtr();
  }, []);
  //A handler function being passed down to the table that will affect the local state of this component
  function handleTableClick(attribute) {
    setSelectedAttribute(attribute);
  }

  //A handler function being passed down to the buttons that will affect the local state of this component
  function handleChartButtonClick(dataType) {
    setChartDatatype(dataType);
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

  if (Object.keys(balanceQtr).length && Object.keys(balanceInfo).length) {
    //Here i'm grabbing a particular array from the fetched object
    chartData =
      chartDatatype === 'quarter'
        ? balanceQtr[attribute].values
        : balanceInfo[attribute].values;
    //The keys taken from he fetch are the dates
    keys =
      chartDatatype === 'quarter'
        ? balanceQtr[attribute].keys
        : balanceInfo[attribute].keys;
  }

  const dataset = [];

  dataset.push({
    name: label,
    type: 'scatter',
    color: color,
    // outline: outline,
    fillcolor: outline,
    fill: 'tonexty',
    values: chartData,
  });

  //**------------------------------------------------------------------------------------------------ */
  //TABLE DATA
  //**------------------------------------------------------------------------------------------------ */

  let unformatedData = [];
  let rawDates;

  if (Object.keys(balanceInfo).length) {
    //When balanceInfo has been populated we'll destructure what we need
    // rawDates are in this format--"2021-06-30"--and need to be processed with getDates() before putting into table
    const { totalAssets } = balanceInfo;
    rawDates = totalAssets.keys;

    //Here i'm passing in my local state object and an array of identifiers to a helper function that will extract the data for
    //those identifers and return a 2D array of the raw data numbers and set it equal to 'unformatedDataNums'
    unformatedData = returnUnformatedData(balanceInfo, balanceIndentifiers);
  }
  //Here i'm passing the rawDates to be processed to look like this...'2021'
  const tabledates = Object.keys(balanceInfo).length
    ? formatDates(rawDates)
    : [];

  //Here i'm sending the unformatedData off to be processed
  const { yearlyChanges, rows } = processUnformattedData(unformatedData);
  const tableInfo = {
    tabledates,
    rows,
    yearlyChanges,
    labels: balanceTableLabels,
    attributes: balanceIndentifiers,
  };

  //**------------------------------------------------------------------------------------------------ */
  //RENDER
  //**------------------------------------------------------------------------------------------------ */

  return (
    <>
      <div className="page shadow-deep-nohover">
        <div className="fin-top-container">
          <CompanyInfo profile={profile} />
          <div className="fin-chart-container">
            <FinButtons
              handleButtonClick={handleChartButtonClick}
              label={label}
            />
            <UniversalChart
              className="income-chart fin-chart"
              // title={label}
              keys={keys}
              margin={{ l: 50, r: 50, b: 25, t: 35 }}
              plotBackgroundColor="rgba(30, 34, 45, 0)"
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
    </>
  );
}
