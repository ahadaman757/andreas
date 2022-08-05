import { useState, useEffect } from "react";
import datetimeDifference from "datetime-difference";
import axios from 'axios'
const useAxiosPost = (url, body) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.post(url, body)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);

  return [data];
};

const showDateDiff = (startDate, EndDate) => {
  const End_Time = new Date(EndDate)
  const start_Time = new Date(startDate)
  const result = datetimeDifference(start_Time, End_Time);
  const Ydiff = result.years ? result.years + " year," : '';
  const mdiff = result.months ? result.months + " Month," : '';
  const ddiff = result.days ? result.days + " Day," : '';
  const hdiff = result.hours ? result.hours + " hour" : '';
  const midiff = result.minutes ? result.minutes + " M " : '';
  const sdiff = result.seconds ? result.seconds + " S" : '';
  return Ydiff + mdiff + ddiff + hdiff + midiff + sdiff;
}

function tConvert(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice(1);  // Remove full string match value
    time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(''); // return adjusted time or original string
}
const asyncLocalStorage = {
  setItem: async function (key, value) {
    await null;
    return localStorage.setItem(key, value);
  },
  getItem: async function (key) {
    await null;
    return localStorage.getItem(key);
  },
};

export { tConvert, useAxiosPost, showDateDiff, asyncLocalStorage }