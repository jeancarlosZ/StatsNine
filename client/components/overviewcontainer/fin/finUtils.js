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
  console.log(info);
  infoArray.push(info.map((info) => info.date));
  labels.forEach(function (label) {
    if (label !== '') {
      const string = formatString(label);
      infoArray.push(info.map((info) => info[string]));
    }
  });
  return infoArray;
}

function formatString(string) {
  const newString =
    string[0].toLowerCase() + string.split(' ').join('').slice(1);
  return newString;
}
