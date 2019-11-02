const {BASE_URL} = require("../config")
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
  return YY + MM + DD ;
}

module.exports = {
  Ajax,
  formatDate
}