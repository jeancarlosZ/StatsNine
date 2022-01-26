import { formatNumber } from "../../../utils";

export function formatDates(values) {
  //Grabbing the last 15 dates and reversing them so 2021 comes first...
  const info =
    values.length < 14 ? [...values].reverse() : values.slice(values.length - 14).reverse();
  //Trimming the date down so I can use it in the table

  const dates = info.map(function (date, index) {
    if (index && date.slice(0, 4) === info[index - 1].slice(0, 4)) {
      return date.slice(0, 4) + "**";
    } else {
      return date.slice(0, 4);
    }
  });
  //Adding an empty 'date' so the dates row is offset when rendered
  dates.unshift("");
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

    for (let i = innerArray.length - 1; i > innerArray.length - 15 && i >= 0; i--) {
      //calculating the change
      const change = innerArray[i] - innerArray[i - 1];
      //pushing the formatted change
      //if the change is NaN, push '-'
      changeArr.push(formatNumber(change) ? formatNumber(change) : "-");

      //pushing the formatted number for display
      // const formattedNum = formatNumber(innerArray[i]);
      rowsArr.push(formatNumber(innerArray[i]) ? formatNumber(innerArray[i]) : "-");
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
