//index.js
const {
  Ajax
} = require('../../utils/plugin.js')
const {
  PLAYLIST_HOT,
  BANNER,
  NEWEST_ALBUMS
} = require('../../utils/route_str.js')

//获取应用实例
const app = getApp()

Page({
  data: {
    // 主页菜单
    menuList: [{
      title: '热门歌单',
      icon: 'icon-gedan'
    }, {
      title: 'MV',
      icon: 'icon-mv'
    }],
    // 背景轮播图
    backgroundList: [],
    // 主页每一栏的区域
    areaList: [{
      id: NEWEST_ALBUMS,
      title: "新碟",
      sub_title: "新歌",
      list: [],
      tool: "更多新碟"
    }]
  },
  onLoad() {
    // this.getPlaylistHot()
    this.getBannerList()
    this.getNewestAlbums();
  },
  // 获取轮播图
  getBannerList() {
    const param = {
      url: BANNER
    }
    Ajax(param)
      .then(res => {
        console.log(res)
        let bannerList = res.data.banners.filter(v => {
          return v.titleColor == "red" && v.targetId
        }).map(v => {
          return {
            url:v.imageUrl, // 图片
            id:v.targetId,  // 查询使用的id
            type:v.targetType // 类型，目前发现：1、单曲
          }
        })
        this.setData({
          backgroundList: bannerList
        })
      })
  },
  // 首页选项切换
  changeTab(event) {
    console.log(event)
  },
  // 获取新碟
  getNewestAlbums() {
    const param = {
      url: NEWEST_ALBUMS,
    }
    Ajax(param)
      .then(res => {
        let temp = [];
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
        let areaIndex = this.data.areaList.findIndex(obj => {
          return obj.id = NEWEST_ALBUMS
        })
        this.setData({
          [`areaList[${areaIndex}].list`]: temp
        })
      })
  },
  // 获取热门歌单
  getPlaylistHot() {
    const param = {
      url: PLAYLIST_HOT
    }
    Ajax(param)
      .then(res => {
        console.log(res)
      })
  },
  // 每个区域的单独空间
  handleTool(options){
    const tool = options.currentTarget.dataset.tool
    // 如果是表示更多专辑
    if(tool == NEWEST_ALBUMS){
      wx.navigateTo({
        url:'/pages/albumList/albumList'
      })
    }
  }
})