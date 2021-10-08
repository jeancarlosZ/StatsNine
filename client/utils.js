//* This file contains a set of utilities/helper functions.
//* These functions are to be universal!
//*
//* (Please comment your functions so we know what they do)

//* Check if two objects are the same.
export function isSameObject(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

//* Function to find out if a number is between a given: min & max
//* Optionally check if it is between || equal to
export function isBetween(n, min, max, canEqual = false) {
  return canEqual ? n >= min && n <= max : n > min && n < max;
}

//* Split an object into two arrays, keys and values
//* You can optionally return the array values in reverse.
//* Which is useful when dealing with time series data.
export function splitProperties(obj, reverse = false) {
  //* If object is null or undefined
  //* then there's no properties
  if (!obj) return null;
  try {
    //* Obtain the keys
    let keys = Object.keys(obj);
    //* Obtain the values by mapping the keys
    let values = Object.values(obj);

    //* If they should be reversed
    if (reverse) {
      keys = keys.reverse();
      values = values.reverse();
    }

    //* Return the keys and values
    return { keys, values };
  } catch (error) {
    //* If the object doesn't have any properties
    //* we will get an error and return null as a backup
    logError(error, `Failed to split object! (${obj})`);
    return null;
  }
}

//* Used to round a number to it's secondPlace point,
//* optionally you can pass in false, as a second arument
//* to round to the third place.
export function roundNumberDec(n, secondPlace = true) {
  const mult = secondPlace ? 100 : 1000;
  return Math.round(n * mult) / mult;
}

//* Used to check for formatting purposes
export const THOUSAND = 1000;
export const MILLION = 1000000;
export const BILLION = 1000000000;
export const TRILLION = 1000000000000;

//* Function to format a number into a string for display
//* Long: 1,000,000,000 !Long: 1B
export function formatNumber(n, long = false) {
  if (n < THOUSAND) return n;
  if (long) return n.toLocaleString();

  //* Greater than Trillion
  if (n >= TRILLION) {
    return roundNumberDec(n / TRILLION) + 'T';
    //* Greater than a Billion
  } else if (n >= BILLION) {
    return Math.round((n / BILLION) * 1000) / 1000 + 'B';
    //* Greater than million
  } else if (n >= MILLION) {
    return Math.round((n / MILLION) * 1000) / 1000 + 'M';
    //* Greater than thousand
  } else if (n >= THOUSAND) {
    return Math.round((n / THOUSAND) * 1000) / 1000 + 'K';
  } else return n;
}

//* Format dates for charting
export function formatDate(date) {
  if (!date) return '0000-00-00';
  return date.toLocaleString('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

//* Function used to log errors in a easy to read way.
//* Pass in the error and optionally a description.
export function logError(error, desc = '') {
  console.log('--------------------');
  console.log('Error:' + desc);
  console.log('--------------------');
  console.error(error);
  console.log('--------------------');
}
