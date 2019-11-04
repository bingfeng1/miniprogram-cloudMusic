//app.js
App({
  onLaunch: function () {

  },
  globalData: {
    // 当前显示页
    currentIndex: 0,
    nowMusicId: 0,
    bgm: wx.getBackgroundAudioManager() //增加bgm播放
  }
})