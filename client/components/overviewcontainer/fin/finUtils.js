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

  info = values.slice(values.length - 6).reverse();
  console.log(info);
  infoArray.push(info.map((info) => info.date));
  labels.forEach(function (label) {
    if (label !== '') {
      const string = formatString(label);
      infoArray.push(info.map((info) => info[string]));
    }
  });
  //   infoArray.push(info.map((info) => info.grossProfit));
  //   infoArray.push(info.map((info) => info.operatingExpenses));
  //   infoArray.push(info.map((info) => info.operatingIncome));
  //   infoArray.push(info.map((info) => info.incomeBeforeTax));
  //   infoArray.push(info.map((info) => info.incomeTaxExpense));

  return infoArray;
}

function formatString(string) {
  const newString =
    string[0].toLowerCase() + string.split(' ').join('').slice(1);
  return newString;
}
