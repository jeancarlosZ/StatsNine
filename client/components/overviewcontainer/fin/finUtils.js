import { formatNumber } from '../../../utils';

export function formatDates(values) {
  //Grabbing the last 15 dates and reversing them so 2021 comes first...
  const info =
    values.length < 14
      ? [...values].reverse()
      : values.slice(values.length - 14).reverse();
  //Trimming the date down so I can use it in the table

  // const dates = info.map((info) => info.slice(0, 4));
  const dates = info.map(function (date, index) {
    if (index && date.slice(0, 4) === info[index - 1].slice(0, 4)) {
      return date.slice(0, 4) + '**';
    } else {
      return date.slice(0, 4);
    }
  });
  //Adding an empty 'date' so the dates row is offset when rendered
  dates.unshift('');
  return dates;
}

export function processUnformattedData(data) {
  //These are the two 2D arrays I will return from this function
  const yearlyChanges = [];
  const rows = [];

  //Looping through every nested array
  data.forEach(function (innerArray) {
    //Producing an innerArray for yearly change(a row)
    const changeArr = [];
    //Producing an innerArray for row data(a row)
    const rowsArr = [];

    //For every innerArray I will start from the back and work my way forward
    //until I'm either done with the array or I've gathered enough to fill 14 rows.
    //I need start at innerArray.length - 15 because in order to calculate the yearly change I need one extra position to the left

    //If the innerArray.length is < 14, there won't be enough data to do the last yearlyChange calculation. In that case push '-' for that
    //position.

    for (
      let i = innerArray.length - 1;
      i > innerArray.length - 15 && i >= 0;
      i--
    ) {
      //calculating the change
      const change = innerArray[i] - innerArray[i - 1];
      //pushing the formatted change
      //if the change is NaN, push '-'
      changeArr.push(formatNumber(change) ? formatNumber(change) : '-');

      //pushing the formatted number for display
      // const formattedNum = formatNumber(innerArray[i]);
      rowsArr.push(
        formatNumber(innerArray[i]) ? formatNumber(innerArray[i]) : '-'
      );
    }
    //here i'm pushing each innerArray(row) to the arrays that will be returned from this function
    yearlyChanges.push(changeArr);
    rows.push(rowsArr);
  });
  //returning two 2D arrays in an object
  return {
    yearlyChanges,
    rows,
  };
}
// export function calcYearlyChanges(array) {
//   //Calculating the changes from year to year
//   //The received array is a 2D array of raw data
//   //I'm mapping over this array and producing a correspoding yearly change array
//   //The result will be a 2d array of yearly changes
//   const result = [];
//   array.forEach(function (innerArray) {
//     const array = [];
//     //Here i'm slicing to +1 more than how many I need because...
//     //I'm calculating by checking the index and index+1 positions, So I need room for that last check
//     const info =
//       innerArray.length < 15
//         ? [...innerArray].reverse()
//         : innerArray.slice(innerArray.length - 15).reverse();
//     info.forEach(function (ele, index) {
//       if (index < info.length - 1) {
//         const yearlyChange = Number(info[index]) - Number(info[index + 1]);
//         array.push(formatNumber(yearlyChange));
//       } else {
//         array.push('-');
//       }
//     });

//     result.push(array);
//   });
//   return result;
// }

// export function formatRows(nestedArray) {
//   //This function takes in the raw data and formats the numbers to look like 231.2B or 21.1T depending on the value
//   return nestedArray.map(function (innerArray) {
//     const array = [];
//     const info =
//       innerArray.length < 14
//         ? [...innerArray].reverse()
//         : innerArray.slice(innerArray.length - 14).reverse();
//     info.forEach(function (num, index) {
//       if (num === 0) array.push('-');
//       else array.push(formatNumber(num));
//     });
//     return array;
//   });
// }

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
