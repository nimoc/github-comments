function formatNumber(val, len = 2) {
  let num = `${val}`;

  while (num.length < len) {
    num = `0${num}`;
  }

  return num;
}

function formatDate(str) {
  const date = new Date(str.replace(/T/, ' ').replace(/Z/, ' UTC').replace(/-/g, '/'));

  return `${date.getFullYear()}-${
            formatNumber(date.getMonth() + 1)}-${
            formatNumber(date.getDate())} ${
            formatNumber(date.getHours())}:${
            formatNumber(date.getMinutes())}:${
            formatNumber(date.getSeconds())}`;
}
module.exports = formatDate;
