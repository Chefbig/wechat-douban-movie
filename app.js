//app.js
App({
  onLaunch: function () {
    /** 调用API从本地缓存中获取数据 */
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function(cb){
    const that = this;

    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      /** 调用登录接口 */
      wx.login({
        success() {
          wx.getUserInfo({
            success(res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  /** 全局变量 */
  globalData: {
    userInfo: null,
    douban: "https://api.douban.com",
    in_theaters: "/v2/movie/in_theaters",
    coming_soon: "/v2/movie/coming_soon",
    top250: "/v2/movie/top250",
    subject: "/v2/movie/subject/",
  }
})