import React, { useEffect, useState } from 'react';
import UniversalChart from '../components/UniversalChart';
import { fetchIncomeStatement } from './api';

//* This is a example of how you would go about fetching data from
//* the api and implementing a chart
export default function ExamplePage() {
  //* First you must decide what data you need.
  //* Create for that variable and default it to {}
  const [incomeData, setIncomeData] = useState({});
  //* const [balanceData, setBalanceData] = useState({})

  //* When the component is mounted we just need
  //* to load the data, and update the state.
  useEffect(() => {
    //* Here we will create a 'async' getData function. Here
    //* you will call all of the functions required apon load.
    async function getData() {
      //* Now update the state with the response
      setIncomeData(await fetchIncomeStatement('AAPL'));
      //* setBalanceData(await fetchBalanceSheet('AAPL'))
    }
    //* Now you call the getData function
    getData();
  }, []);

  //* If you check console you will see the api returns a set
  //* of KEYS and VALUES. You can use these to populate the chart.
  console.log('Income Data:', incomeData);

  //* The best way to do this is to destructure your keys and values
  const { keys, values } = incomeData;

  //* See the results here
  console.log('Keys:', keys);
  console.log('Values:', values);

  //* Now we will create our dataset for the chart. This is an array,
  //* containing each of the VALUES you would like to display.
  const dataset = [];

  //* We must wait until our values are populated before
  //* attempting to make the 'traces' or 'sets'
  if (values) {
    //* Now we must fill our dataset with some 'traces' or 'sets' of data
    //* In this case I am going to make a chart to display the net income
    dataset.push({
      name: 'Net income',
      type: 'bar',
      color: '#00887b',
      outline: '#34b87d',
      //* Since our VALUES array contains many different values, we must select
      //* one VALUE per 'trace' or 'set' to display.
      values: values.map(x => x.netIncome),
    });

    //* Other examples include...
    // dataset.push({ name: 'Common Stock', color: 'green', values: values.map(x => x.commonStock) })
    // dataset.push({ name: 'Liabilities', type: 'line', values: values.map(x => x.netDebt) })

    // dataset.push({
    //   name: 'Liabilities',
    //   type: 'pie',
    //   labels: ['1st', '2nd', '3rd', '4th', '5th'],
    //   values: [38, 27, 18, 10, 7],
    //   hoverinfo: 'label+percent+name',
    //   domain: { row: 1, column: 0 }
    // })

    // dataset.push({
    //   name: 'Assets',
    //   type: 'line',
    //   color: 'purple',
    //   values: values.map(x => x.totalAssets),
    //   fill: 'tozeroy'
    // })

    // dataset.push({
    //   name: 'Liabilities',
    //   type: 'line',
    //   color: 'green',
    //   values: values.map(x => x.totalLiabilities),
    //   fill: 'tozeroy'
    // })
  }

  //* It's probably best to return the chart inside a div, for styling reasons.
  //* I have also attached a className property to the Universal chart.
  //* TODO: Try to use the className on ALL chart's so we can customize them later.
  return (
    <>
      <UniversalChart
        className="example-chart"
        title="Net Income"
        keys={keys}
        dataset={dataset}
        showlegend={true}
      />
    </>
  );
}
