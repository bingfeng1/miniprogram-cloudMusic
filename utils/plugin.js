const { BASE_URL } = require("../config")
console.log(BASE_URL)
// 使用promise改造wx.request
const Ajax = ({
  url,
  data = {},
  method = "GET"
}) => {
  url = BASE_URL + url
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method,
      success: resolve,
      fail: reject
    })
  })
}

// 时间戳转日期
function formatDate(date) {
  var date = new Date(date);
  var YY = date.getFullYear() + '-';
  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  return YY + MM + DD;
}

// 秒转为分秒
function secondToTime(result) {
  result = result.toFixed(3)
  var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
  var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
  var ss = (""+result).split('.')[1];
  return result = `${m}:${s}.${ss}`;
}

module.exports = {
  Ajax,
  formatDate,
  secondToTime
}