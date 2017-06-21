// pages/start/start.js
const app = getApp();

Page({
  /** 页面的初始数据 */
  data: {
    start: '查看日志', 
    userInfo: {},
  },

  /** 获取用户信息 */
  onLoad(options) {
    const that = this;
    /** 调用应用实例的方法获取全局数据 */
    app.getUserInfo(userInfo => (
      /** 更新数据 */
      that.setData({userInfo})
    ));
  },

  /** 跳转到 movie */
  toMovie() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  }
})