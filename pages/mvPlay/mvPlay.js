// pages/mvPlay/mvPlay.js
const { Ajax } = require('../../utils/plugin')
const { MV_DETAIL } = require('../../utils/route_str')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mvDetail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { id } = options
    this.getMvDetail(id)
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
  getMvDetail(id) {
    let param = {
      url: MV_DETAIL,
      data: {
        mvid: id
      }
    }
    Ajax(param)
      .then(res => {
        console.log(res)
        let { id, name, desc, publishTime, brs, artists } = res.data.data;
        let artistStr = artists.map(w => w.name).join(" / ")

        this.setData({
          mvDetail: {
            id,
            name,
            desc,
            publishTime,
            brs,
            artists,
            artistStr
          }
        })
      })
  }
})