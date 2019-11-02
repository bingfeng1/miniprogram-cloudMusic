// components/custom-tab-bar/index.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    tabList: [{
      title: "音乐",
      icon: "icon-music",
      url: '/pages/index/index'
    }, {
      title: "我的",
      icon: "icon-mine",
      url: '/pages/mine/mine'
    }]
  },

  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      this.setData({
        currentIndex: app.globalData.currentIndex
      })
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击切换tabs
    handleSwitchTab(options) {
      // 获取点击的下标
      const index = options.currentTarget.dataset.index;
      // 如果就是现在的选中项，那么就不需要任何操作
      if (app.globalData.currentIndex != index) {
        app.globalData.currentIndex = index
        wx.switchTab({
          url: this.data.tabList[index].url,
        })
      }
    }
  },
  // 外部css可以影响本组件，本组件不会影响外部
  options: {
    styleIsolation: "apply-shared"
  }
})