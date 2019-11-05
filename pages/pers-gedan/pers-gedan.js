// pages/pers-gedan/pers-gedan.js
const { Ajax } = require('../../utils/plugin')
const { PERSONALIZED } = require('../../utils/route_str')
// 每页数据数量(推荐歌单，没有offset所以就是固定值)
const { ALBUM_LIST_LIMIT } = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gedan: [],
    switchUrl:"musicList-gedan"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPersGeDan()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getPersGeDan() {
    let param = {
      url: PERSONALIZED,
      data: {
        limit: ALBUM_LIST_LIMIT
      }
    }
    Ajax(param)
      .then(res => {
        // 深拷贝
        let temp = [];
        let data = res.data.result;
        for (let v of data) {
          temp.push({
            imageUrl: v.picUrl,
            name: v.name,
            id: v.id  //歌单id
          })
        }

        this.setData({
          gedan: temp
        })
      })
  }
})