// components/index/menu_item/menu_item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabList: {
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
    handleNavigate(event){
      console.log(event)

    }
  },
  // 外部css可以影响本组件，本组件不会影响外部
  options: {
    styleIsolation: "apply-shared"
  }
})