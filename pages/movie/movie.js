// pages/movie/movie.js
const app = getApp();

Page({
  /** 页面的初始数据 */
  data: {
    subjects: [],
  },

  /** 初始化电影数据 */
  onLoad(options) {
    const in_theatersURL = app.globalData.douban + app.globalData.in_theaters + '?start=0&count=7';
    const coming_soonURL = app.globalData.douban + app.globalData.coming_soon + '?start=0&count=7';
    const top250URL = app.globalData.douban + app.globalData.top250 + '?start=0&count=7';

    this.getMovieData(in_theatersURL, "in_theaters", "正在热映");
    this.getMovieData(coming_soonURL, "coming_soon", "即将上映");
    this.getMovieData(top250URL, "top250", "Top250");
  },

  /** 获取电影数据 */
  getMovieData(url, key, name) {
    const that = this;

    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: url,
      header: {
        'content-type': 'json',
      },
      success(res) {
        that.analysisMovieData(res.data.subjects, key, name);
      },
      complete() {
        wx.hideLoading();
      }
    })
  },

  /** 解析电影数据 */
  analysisMovieData(data, key, name){
    const { subjects } = this.data;
    const obj = {};
    const subject = [];

    obj.key = key;
    obj.name = name;
    data.map(item => (
      subject.push({
        id: item.id,
        title: item.title,
        image: item.images.medium,
        rating: item.rating.average,
      })
    ));
    obj.value = subject;
    subjects.push(obj);

    this.setData({subjects});
  },

  /** 跳转到 Details */
  toDetails(e) {
    const id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: '../movie/details/details?id=' + id,
    })
  }
})