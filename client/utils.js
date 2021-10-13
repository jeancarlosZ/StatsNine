//* This file contains a set of utilities/helper functions.
//* These functions are to be universal!
//*
//* (Please comment your functions so we know what they do)

import { BAD, GOOD } from './store/local/localActions'

//* Check if two objects are the same.
export function isSameObject(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

//* Function to find out if a number is between a given: min & max
//* Optionally check if it is between || equal to
export function isBetween(n, min, max, canEqual = false) {
  return canEqual ? n >= min && n <= max : n > min && n < max
}

//* Split an object into two arrays, keys and values
//* You can optionally return the array values in reverse.
//* Which is useful when dealing with time series data.
export function splitProperties(obj, reverse = false) {
  //* If object is null or undefined
  //* then there's no properties
  if (!obj) return null
  try {
    //* Obtain the keys
    let keys = Object.keys(obj)
    //* Obtain the values by mapping the keys
    let values = Object.values(obj)

    //* If they should be reversed
    if (reverse) {
      keys = keys.reverse()
      values = values.reverse()
    }

    //* Return the keys and values
    return { keys, values }
  } catch (error) {
    //* If the object doesn't have any properties
    //* we will get an error and return null as a backup
    logError(error, `Failed to split object! (${obj})`)
    return null
  }
}

//* Used to round a number to it's secondPlace point,
//* optionally you can pass in false, as a second arument
//* to round to the third place.
export function roundNumberDec(n, secondPlace = true) {
  const mult = secondPlace ? 100 : 1000
  return Math.round(n * mult) / mult
}

//* Used to check for formatting purposes
export const THOUSAND = 1000
export const MILLION = 1000000
export const BILLION = 1000000000
export const TRILLION = 1000000000000

//* Function to format a number into a string for display
//* Long: 1,000,000,000 !Long: 1B
export function formatNumber(n, long = false) {
  const symbol = n < 0 ? '-' : ''
  n = Math.abs(n)

  if (n < THOUSAND) return roundNumberDec(n)
  if (long) return n.toLocaleString()

  //* Greater than Trillion
  if (n >= TRILLION) {
    return symbol + roundNumberDec(n / TRILLION) + 'T'
    //* Greater than a Billion
  } else if (n >= BILLION) {
    return symbol + roundNumberDec(n / BILLION) + 'B'
    //* Greater than million
  } else if (n >= MILLION) {
    return symbol + roundNumberDec(n / MILLION) + 'M'
    //* Greater than thousand
  } else if (n >= THOUSAND) {
    return symbol + roundNumberDec(n / THOUSAND) + 'K'
  } else return roundNumberDec(n)
}

//* Format percentages into pretty numbers
export function formatPercentage(n, secondPlace = true, asString = false) {
  const fmt = roundNumberDec(n * 100, secondPlace)
  return asString ? fmt + '%' : fmt
}

//* Format dates for charting
export function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

//* Function used to log errors in a easy to read way.
//* Pass in the error and optionally a description.
export function logError(error, desc = '') {
  console.log('--------------------')
  console.log('Error:' + desc)
  console.log('--------------------')
  console.error(error)
  console.log('--------------------')
}

//* Function used to get the corresponding star color
//* Based on the type of rating the metric received
export function getStarColor(rating) {
  return rating === GOOD ? '#2CDD9B' : rating === BAD ? '#FE5252' : '#FAAD14'
}

//* Function to trim date (2021-05-01) -> (2021)
export function trimDate(date) {
  return date ? date.substring(0, 4) : '0000'
}

//* This should return the % difference between two numbers
export function getPercentDifference(num1, num2, includeSign = true, format = true) {
  const result = (Math.abs(num1) - Math.abs(num2)) / ((num1 + num2) / 2)
  return (
    (includeSign ? (num1 >= num2 ? '+' : '-') : '') +
    (format ? formatPercentage(result, true) : result)
  )
}

//* Get the difference between the first and last number
//* In a given array [5, 6, 8] would result in -> 3
export function getDifferenceBetween(arr, reverse = false) {
  const narr = [...arr]
  return reverse ? narr.shift() - narr.pop() : narr.pop() - narr.shift()
}

//* Get the between the first and last number of an array
export function getFirstLastArr(arr, reverse = false) {
  const narr = [...arr]
  return reverse ? [narr.shift(), narr.pop()] : [narr.pop(), narr.shift()]
}
