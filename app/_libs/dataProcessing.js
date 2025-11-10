
import { timeSeries } from "@/app/_libs/TimeSeries";

export default function rotateArray(arr) {
  if (arr.length > 1) {
    let firstItem = arr.shift();
    arr.push(firstItem);
  }
  return arr;
}

export function convertToKebabCase(text) {
  return text.replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+|_+/g, '-')
    .toLowerCase();
}

export function replaceHyphens(str) {
  return str.replace(/-/g, '%');
}

export function queryParamsToSql(request, param, sqlPrefix) {
  const searchParams = request.nextUrl.searchParams;
  let result = '';
  const paramValue = searchParams.get(param);
  if (paramValue) {
    result = `${sqlPrefix} (${paramValue})`;
  }
  return result;
}

export function createDatesArray(earliest=7, latest = 0) {
  const datesArray = [];
  for (let i = earliest - 1; i >= latest ; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    datesArray.push(date);
  }
  return datesArray;
}

export function isSameDate(date1, date2) {
  /* 
  This function was created because checking for equality between 2 date
  objects always returns false due to the nature of this data type
  */
  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);
  const result = date1 - date2 == 0;
  return result;
}

export const formatDate = (dateObject, options = null, removeColons=false) => {
  /* 
  To get the day of the week, options can be set to 
  `{ weekday: 'narrow' }`, { weekday: 'short' }, { weekday: 'long' }
  
  To get the month, options are:
  `{month: 'long'}`, `{month: 'short'}`
  
  To show time in 24-hour format, include `hour12: false` in the `options` object.
  
  To get the format as YYYY-MM-DD HH:MM:SS, options would be 
  {
  year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  }

  To get a human readable timestamp that can be used as a filename, use `options = 'filename'`
  */
  
  // format a date to the "MM/DD/YYYY" by default
  if (options === null) {
    options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  } else if (options == 'filename') {
    removeColons = true;
    options = {
      year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    }
  } else if (options == 'readable timestamp') {
    options = {
      year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    }
  }
  let formattedDate = dateObject.toLocaleDateString('en-CA', options) // format the date to string
  .replace(/,/g, ''); // remove commas
  if (removeColons) {
    formattedDate = formattedDate.replace(/:/, '').replace(/:/, '_').replace(/ /, '_')
  }
  
  return formattedDate
}

export function getWeekOfYear(date) {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const oneJan = new Date(date.getFullYear(), 0, 1);
  const differenceInTime = date - oneJan;
  const oneWeek = 604800000; // milliseconds in a week
  return Math.ceil((differenceInTime / oneWeek) + 1);
}

export function getMonthFromWeekNumber(week) {
    const today = new Date();
    const date = new Date(today.getFullYear(), 0, week * 7); // January 1st of the specified year plus the week number multiplied by 7
    const month = date.toLocaleString('default', { month: 'short' });
    return month;
}

export function getPastWeekActivty(activityArray) {
  const oneWeekAgo = timeSeries.nDaysAgoDate(7);
  const pastWeekActivity = activityArray.filter(object => object.date >= oneWeekAgo);
  return pastWeekActivity;
  
}