// pages/albumList/albumList.js
const { Ajax } = require('../../utils/plugin')
const { ALBUMS } = require('../../utils/route_str')
// 每页数据数量
const { ALBUM_LIST_LIMIT } = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 分页偏移量
    offset: 0,
    albumList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAlbumList(this.data.offset)
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
    this.getAlbumList(this.data.offset)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getAlbumList(offset) {
    let param = {
      url: ALBUMS,
      data: {
        offset: offset * ALBUM_LIST_LIMIT,
        limit: ALBUM_LIST_LIMIT
      }
    }
    Ajax(param)
      .then(res => {
        // 深拷贝
        let temp = [...this.data.albumList];
        let data = res.data.albums;
        for (let v of data) {
          let artists = v.artists.map(w => w.name).join(" / ")

          temp.push({
            imageUrl: v.picUrl,
            name: v.name,
            artist: artists,
            id: v.id
          })
        }

        this.setData({
          albumList: temp,
          offset: this.data.offset + 1
        })
      })
  }
})