// components/index/banner/banner.js
const {
  Ajax
} = require('../../../utils/plugin.js')
const {
  SONG_URL,
  SONG_DETAIL
} = require('../../../utils/route_str.js')
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    backgroundList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转至歌曲详情
    handleSongDetail(options) {
      // 如果type是1那么就是单曲，可以直接播放
      let type = options.currentTarget.dataset.item.type
      if (type == 1) {
        // 获取音乐ID
        let id = options.currentTarget.dataset.item.id
        // 如果这个歌曲id和全局一样的话，那么就不用在此获取了
        if (id == app.globalData.nowMusicId) {
          return;
        }
        app.globalData.nowMusicId = id
        // 这里首先获取歌曲的详细信息（以后需要做一个抽出）
        let param = {
          url: SONG_DETAIL,
          data: {
            ids: id
          }
        }
        // 获取歌曲详情信息
        Ajax(param)
          .then(res => {
            console.log(res)
            // 本来就是单曲，直接这样获取就行
            let song = res.data.songs[0]
            let {
              name,
              picUrl
            } = song.al
            let artists = song.ar.map(v => v.name).join('/')
            let id = song.id

            let param = {
              url: SONG_URL,
              data: {
                id
              }
            }
            this.setData({
              title:name,
              artists,
              imgUrl:picUrl
            })
            // 为了连续then返回一个promise
            return Ajax(param)
          })
          .then(res => {
            console.log(res)
            let songUrlList = res.data.data.map(v => v.url)
            let bgm = wx.getBackgroundAudioManager()
            bgm.title = this.data.title
            bgm.epname = this.data.title
            bgm.singer = this.data.artists
            bgm.coverImgUrl = this.data.imgUrl
            // 设置了 src 之后会自动播放，这里只是点击单曲，所以直接获取第一个就行
            bgm.src = songUrlList[0]
          })
      }
    }
  }
})