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

export function getDates(values) {
  let info;
  info = values.slice(values.length - 15).reverse();
  const dates = info.map((info) => info.slice(0, 4));
  dates.pop();
  dates.unshift('');
  return dates;
}

// export function returnTableInfo(values, labels) {
//   let info;
//   let infoArray = [];

//   info = values.slice(values.length - 14).reverse();
//   // infoArray.push(info.map((info) => info.date.slice(0, 4)));
//   labels.map(function (label) {
//     const string = formatString(label);
//     infoArray.push(
//       info.map(function (info) {
//         return info[string];
//       })
//     );
//   });
//   return infoArray;
// }

//Formating the label to be used as a key to grab all the values from the object returned from the API
// function formatString(string) {
//   const newString =
//     string[0].toLowerCase() + string.split(' ').join('').slice(1);
//   return newString;
// }

//Calculating the changes from year to year
//Looping over the information that is to placed in the table
//Generate a yearly change based on the previous year
export function calcYearlyChanges(array) {
  const result = [];
  array.forEach(function (innerArray, index) {
    const array = [];
    let info;
    info = innerArray.slice(innerArray.length - 15).reverse();
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

export function formatNestedArrayNums(nestedArray) {
  return nestedArray.map(function (innerArray) {
    const array = [];
    let info;
    info = innerArray.slice(innerArray.length - 14).reverse();
    info.forEach(function (num, index) {
      if (index !== innerArray.length - 1) {
        array.push(formatNumber(num));
      }
    });
    return array;
  });
}

export const incomeArray = [
  'dates',
  'grossProfit',
  'operatingExpenses',
  'operatingIncome',
  'incomeBeforeTax',
  'incomeTaxExpense',
];

export function returnUnformatedData(incomeInfo, arrayOfItems) {
  const result = [];
  arrayOfItems.forEach((item) => {
    result.push(incomeInfo[item].values);
  });
  return result;
}
