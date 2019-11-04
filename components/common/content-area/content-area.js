// components/index-area/index-area.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
      value:""
    },
    subTitle: {
      type: String,
      value: ""
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

  },
  // 外部css可以影响本组件，本组件不会影响外部
  options: {
    styleIsolation: "apply-shared",
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  }
})
