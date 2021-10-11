import { formatTimeSeriesData } from '../../../api/api';
import { formatNumber } from '../../../utils';

export function returnProfile(profile) {
  const { companyName } = profile;
  const { symbol } = profile;
  const { exchangeShortName } = profile;
  return {
    companyName,
    symbol,
    exchangeShortName,
  };
}

export function returnTableInfo(values, labels) {
  let info;
  let infoArray = [];

  info = values.slice(values.length - 13).reverse();
  // infoArray.push(info.map((info) => info.date.slice(0, 4)));
  labels.forEach(function (label) {
    if (label !== '') {
      const string = formatString(label);
      infoArray.push(info.map((info) => info[string]));
    }
  });
  return infoArray;
}

//Formating the label to be used as a key to grab all the values from the object returned from the API
function formatString(string) {
  const newString =
    string[0].toLowerCase() + string.split(' ').join('').slice(1);
  return newString;
}

//Calculating the changes from year to year
//Looping over the information that is to placed in the table
//Generate a yearly change based on the previous year
export function calcYearlyChanges(array) {
  const result = [];
  array.forEach(function (innerArray, index) {
    const array = [];

    innerArray.forEach(function (ele, index) {
      if (index != innerArray.length - 1) {
        const yearlyChange =
          Number(innerArray[index]) - Number(innerArray[index + 1]);
        array.push(formatNumber(yearlyChange));
      }
    });

    result.push(array);
  });
  return result;
}

export function formatNestedArrayNums(nestedArray) {
  return nestedArray.map(function (innerArray) {
    return innerArray.map(function (num) {
      return formatNumber(num);
    });
  });
}
