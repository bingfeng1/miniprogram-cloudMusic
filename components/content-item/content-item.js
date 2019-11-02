// components/content-item/content-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    flexNum: {
      type: Number,
      value: 3
    },
    itemList: {
      type: Array,
      value: []
    },
    itemTitle:{
      type:String,
      value:""
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
    handleShow(event) {
      let id = event.currentTarget.dataset.id
      let url = `/pages/musicList/musicList?id=${id}&title=${this.properties.itemTitle}`
      wx.navigateTo({
        url,
      })
    }
  },
  externalClasses: ['text-overflow']
})