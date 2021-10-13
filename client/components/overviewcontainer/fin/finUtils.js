import { formatNumber } from '../../../utils';

export function formatDates(values) {
  //Grabbing the last 15 dates and reversing them so 2021 comes first...
  const info = values.slice(values.length - 14).reverse();
  //Trimming the date down so I can use it in the table
  const dates = info.map((info) => info.slice(0, 4));
  //Adding an empty 'date' so the dates row is offset when rendered
  dates.unshift('');
  return dates;
}

export function calcYearlyChanges(array) {
  //Calculating the changes from year to year
  //The recieved array is a 2D array of raw data
  //I'm mapping over this array and producing a corespoding yearly change array
  //The result will be a 2d array of yearly changes
  const result = [];
  array.forEach(function (innerArray) {
    const array = [];
    //Here i'm slicing to +1 more than how many I need beacuse...
    //I'm calculating by checking the index and index+1 positions, So I need room for that last check
    const info = innerArray.slice(innerArray.length - 15).reverse();
    info.forEach(function (ele, index) {
      if (index != info.length - 1) {
        const yearlyChange = Number(info[index]) - Number(info[index + 1]);
        array.push(formatNumber(yearlyChange));
      }
    });

    result.push(array);
  });
  return result;
}

export function formatRows(nestedArray) {
  //This function takes in the raw data and formats the numbers to look like 231.2B or 21.1T depending on the value
  return nestedArray.map(function (innerArray) {
    const array = [];
    const info = innerArray.slice(innerArray.length - 14).reverse();
    info.forEach(function (num, index) {
      if (index !== innerArray.length - 1) {
        if (num === 0) array.push('-');
        else array.push(formatNumber(num));
      }
    });
    return array;
  });
}

export function returnUnformatedData(incomeInfo, arrayOfItems) {
  //This function maps over arrayOfItems and for each item it extracts data from the incomeInfo object
  const result = [];
  arrayOfItems.forEach((item, index) => {
    if (index) {
      result.push(incomeInfo[item].values);
    }
  });
  return result;
}
