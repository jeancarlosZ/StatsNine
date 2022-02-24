import axios from "axios";
import apiKey from "./api-key";
import { formatDate, logError, splitProperties } from "../utils";
//* This class will contain the API methods

//* Function to return stock price data, for charting the stock price
//* You can select a timeseries below
//* -----------------------------------
export const MINUTE = "1min";
export const FIVE_MINUTE = "5min";
export const FIFTEEN_MINUTE = "15min";
export const THIRTY_MINUTE = "30min";
export const HOUR = "1hour";
export const FOUR_HOUR = "4hour";
export const DAILY = "Daily";
//* -----------------------------------
//* You can select a data range from those listed below as well.
//* -----------------------------------
export const WEEK = "Week";
export const MONTH = "Month";
export const THREE_MONTH = "3 Month";
export const SIX_MONTH = "6 Month";
export const YEAR = "1 Year";
export const FIVE_YEAR = "5 Year";
export const TEN_YEAR = "10 Year";
export const ALL = "All";
//* -----------------------------------
//* Function to return stock price data, for charting the stock price
/**
 * //! This function is not to be used anymore, please use getLocalData()
 * @deprecated please use getLocalData instead!
 */
export async function fetchChartPrice(
  ticker,
  series = THIRTY_MINUTE,
  range = ALL,
  line = true,
) {
  const type =
    series === DAILY
      ? "historical-price-full"
      : "historical-chart" + `/${series}/`;
  const query = `${range !== ALL ? getDataRange(range) : ""}${
    line ? "&serietype=line" : ""
  }`;
  const link = getFMPLink(ticker, type, query);
  const data = await fetchData(link);
  return splitProperties(
    await formatTimeSeriesData(series === DAILY ? data.historical : data),
  );
}

//* Function used to make the axios calls and return the data
async function fetchData(link) {
  try {
    //* Make axios call, return the data
    return (await axios.get(link)).data;
  } catch (error) {
    //* Something went wrong
    logError(error, "Failed to make axios call for " + link);
    return null;
  }
}

//* Helper function to format the
//* response data for the reducer
export function formatTimeSeriesData(data, custom) {
  //* If the data is undefined or null
  if (!data) return {};

  const dates = [];

  //* Create our new balance sheet
  const formattedData = {};
  //* Use for loops so we can create a object
  for (let i = 0; i < data.length; i++) {
    const section = data[i];
    formattedData[custom ? section[custom] : section.date] = section;
    dates.push(formatDate(custom ? section[custom] : section.date, true));
  }

  //* Return the formatted data
  return formattedData;
}

//* Return the formatted link for making axios calls
export function getFMPLink(ticker, type, args, v3 = true) {
  const key = apiKey;
  const link = `https://financialmodelingprep.com/api/${v3 ? "v3" : "v4"}`;
  //* Return the desired link
  return `${link}${type ? "/" + type : ""}${v3 ? "/" : "?symbol="}${ticker}${
    v3 ? "?" : "&"
  }${args ? args + "&" : ""}apikey=${key}`;
}

//* Used to get data range
export function getDataRange(dataRange) {
  if (dataRange === ALL) return "";

  //* This nested function will return the desired end date
  //* of the data range (so we can only return.. the range)
  const getEndDate = (current, dataRange) => {
    const endDate = new Date();
    if (dataRange === WEEK) return endDate.setDate(endDate.getDate() - 9);
    if (dataRange === MONTH) return endDate.setMonth(endDate.getMonth() - 1);
    if (dataRange === THREE_MONTH)
      return endDate.setMonth(endDate.getMonth() - 3);
    if (dataRange === SIX_MONTH)
      return endDate.setMonth(endDate.getMonth() - 6);
    if (dataRange === YEAR)
      return endDate.setFullYear(endDate.getFullYear() - 1);
    if (dataRange === FIVE_YEAR)
      return endDate.setFullYear(endDate.getFullYear() - 5);
    if (dataRange === TEN_YEAR)
      return endDate.setFullYear(endDate.getFullYear() - 10);
    return endDate;
  };
  //* The current date (start date)
  let start = new Date();
  const end = getEndDate(start, dataRange);
  //* Return the range query
  return `from=${formatDate(end)}&to=${formatDate(start)}`;
}

const blackList = {
  BTC: true,
  "QBTC.TO": true,
  FOREX: true,
  MUTUAL_FUND: true,
  CRYPTO: true,
  BLTS: true,
  BLTSU: true,
  BLTSW: true,
  SSPGX: true,
  ASPCW: true,
  POWRW: true,
  HCICW: true,
  SWETW: true,
  TBCPW: true,
  ZWRKW: true,
  AUUDW: true,
  ENFAW: true,
  SDVGX: true,
  GTPBW: true,
  SRNGW: true,
  MXAPX: true,
};

//* Remove blacklisted stocks from the queue/return
function removeBlackList(data) {
  return data.filter((x) => {
    if (!blackList[x.symbol] && !blackList[x.exchangeShortName]) return true;
  });
}
