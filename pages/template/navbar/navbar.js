// templates/navbar/navbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bgColor: {
      type: String,
      value: 'white'
    },
    indexPage: {
      type: Boolean,
      value: false
    },
    navbarTitle: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isIPhoneX: false
  },

  ready() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        console.log( 'getSystemInfo ... ' + JSON.stringify(res));
        if (res.model == 'iPhone X') {
          that.setData({
            isIPhoneX: true
          })
        }
      },
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindGoBackTap: function () {
      wx.navigateBack({
        delta: 1
      })
    },
    bindSearchTap: function () {
      wx.navigateTo({
        url: '../search/search',
      })
    }
  }
})
