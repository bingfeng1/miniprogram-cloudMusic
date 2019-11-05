// pages/lyric/lyric.js
const {
  Ajax,
  secondToTime
} = require('../../utils/plugin.js')
const {
  LYRIC
} = require('../../utils/route_str.js')
const { MUSIC_DURATION, MUSIC_ROTATE, LYRIC_SIZE } = require('../../config')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rotate: MUSIC_ROTATE, // 唱盘旋转角度
    isplay: true, // 是否正在播放
    show: false,  //是否显示歌词
    lyricTop: '40vh',
    lyricFontSize: LYRIC_SIZE
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id } = options
    this.getLyric(id)
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
  // 获取歌词
  getLyric(id) {
    let param = {
      url: LYRIC,
      data: {
        id
      }
    }
    Ajax(param)
      .then(res => {
        // 歌词信息
        let lyric = "无歌词"
        if (res.data.lrc) {
          lyric = res.data.lrc.lyric
        }
        let { name } = app.globalData.musicData
        wx.setNavigationBarTitle({
          title: name
        })

        let audio = app.globalData.bgm

        this.setData({
          musicData: app.globalData.musicData,
          lyric,
          isplay: !audio.paused
        })
        this.animations()

        this.dealLyric()
      })
  },
  animations() {
    if (this.data.isplay) {
      this.startAnimation()
    } else {
      this.stopAnimation()
    }
  },
  // 开始动画，并将动画设置为本页面，方便暂停使用
  startAnimation() {
    // 生成动画
    var animation = wx.createAnimation({
      duration: MUSIC_DURATION,
      timingFunction: 'linear',
    })

    animation.rotate(this.data.rotate).step()

    this.setData({
      rotate: this.data.rotate + MUSIC_ROTATE,
      animationData: animation.export()
    })

    let time = setInterval(() => {
      animation.rotate(this.data.rotate).step()
      this.setData({
        rotate: this.data.rotate + MUSIC_ROTATE,
        animationData: animation.export()
      })
    }, MUSIC_DURATION)
    this.setData({
      time
    })
  },
  // 停止动画效果
  stopAnimation() {
    clearInterval(this.data.time)
  },
  // 播放
  start() {
    this.setData({
      isplay: true
    })
    this.animations()
    app.globalData.bgm.play()
  },
  // 暂停
  pause() {
    this.setData({
      isplay: false
    })
    this.animations()
    app.globalData.bgm.pause()
  },
  // 显示歌词
  showLyric() {
    this.setData({
      show: true
    })
  },
  // 显示歌词
  hideLyric() {
    this.setData({
      show: false
    })
  },
  // 处理歌词
  dealLyric() {
    let lyric = this.data.lyric;
    // 歌词数组
    let lyricList = lyric.split('\n');
    let lyricMap = new Map();

    for (let v of lyricList) {
      let vlist = v.split(']')
      // 如果有空格也要显示
      lyricMap.set(vlist[0].substring(1, vlist[0].length), vlist[1] || "&ensp;")
    }
    this.setData({
      lyricMap: Array.from(lyricMap)
    })

    // 动态歌词移动
    let audio = app.globalData.bgm
    audio.onTimeUpdate(() => {
      let audioTime = secondToTime(audio.currentTime)
      for (let i in this.data.lyricMap) {
        // 这里的if判断就是需要两个，不然就无效了。最重要的是为了减少setData频率增加效率
        if (this.data.lyricMap[i][0] > audioTime) {
          if (i > this.lyricIndex) {
            // console.log('in', i, this.lyricIndex)
            this.lyricIndex = +i;
            // 计算view占得高度
            let view_height = 0;
            // 通过节点方式获取歌词的高度
            const query = wx.createSelectorQuery()
            // 这里本想用方法参数解构的，但是微信的自动解析不成功
            query.select("#lyric").boundingClientRect((rest) => {
              rest && (view_height = rest.height / lyricList.length)
              this.setData({
                lyricTop: `calc(40vh - ${(+i) * view_height}px)`
              })
            }).exec()
          }
          break;
        }
      }
    })
  },
  // 用于计算歌词到第几行，为了减少setData开销
  lyricIndex: 0
})