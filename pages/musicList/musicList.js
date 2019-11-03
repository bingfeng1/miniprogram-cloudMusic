// pages/musicList.js
const {
  Ajax,
  formatDate
} = require('../../utils/plugin.js')
const {
  ALBUM,
  SONG_URL
} = require('../../utils/route_str.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {
      id,
      title
    } = options
    // 设置微信标题
    wx.setNavigationBarTitle({ title })
    let param = {
      url: ALBUM,
      data: {
        id
      }
    }
    Ajax(param)
      .then(res => {
        console.log(res.data)
        let {
          artists, //作者
          company, //发行公司
          description, //描述
          name, //专辑名称
          picUrl, //图片信息
          subType, //版本
          publishTime //发行时间
        } = res.data.album
        // 提取需要的作者
        artists = artists.map(v => {
          console.log(v)
          return {
            id: v.id,
            name: v.name
          }
        })
        let artistsStr = "歌手：" + artists.map(v => v.name).join(' / ')
        publishTime = formatDate(publishTime)
        // 歌曲信息
        let songs = res.data.songs.map(v => {
          let tempObj = {
            id: v.id,
            name: v.name
          }
          // 判断本歌曲是否正在播放
          tempObj.play = v.id == app.globalData.nowMusicId
          return tempObj
        })
        this.setData({
          artists,
          artistsStr,
          company,
          description,
          name,
          picUrl,
          subType,
          publishTime,
          songs
        })
      })
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
  handleBackgoundAudio(options) {
    let id = options.currentTarget.dataset.id
    // 如何相同，那么跳转至歌曲详细播放页面
    if (id == app.globalData.nowMusicId) {
      wx.navigateTo({
        url:`/pages/lyric/lyric?id=${id}`
      })
    }
    app.globalData.nowMusicId = id
    app.globalData.musicData = this.data;
    let param = {
      url: SONG_URL,
      data: {
        id
      }
    }
    Ajax(param)
      .then(res => {
        console.log(res)
        let songUrlList = res.data.data.map(v => v.url)
        let bgm = wx.getBackgroundAudioManager()
        bgm.title = this.data.name
        bgm.epname = this.data.name
        bgm.singer = this.data.artistsStr
        bgm.coverImgUrl = this.data.picUrl
        // 设置了 src 之后会自动播放，这里只是点击单曲，所以直接获取第一个就行
        bgm.src = songUrlList[0]
        // 设置为播放状态

        let tempSongs = [...this.data.songs].map(v => {
          let tempObj = {
            id: v.id,
            name: v.name
          }
          // 判断本歌曲是否正在播放
          tempObj.play = v.id == app.globalData.nowMusicId
          return tempObj
        })

        this.setData({
          songs: tempSongs
        })

      })
  }
})