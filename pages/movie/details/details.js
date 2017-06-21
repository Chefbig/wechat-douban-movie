// pages/movie/details/details.js
const app = getApp();

Page({
  /** 页面的初始数据 */
  data: {
    details: {},
  },

  /** 初始化电影详情数据 */
  onLoad(options) {
    const id = options.id;
    const detailsURL = app.globalData.douban + app.globalData.subject + id;

    this.getDetailsData(detailsURL);
  },

  /** 获取电影详情数据 */
  getDetailsData(url) {
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
        that.analysisDetailsData(res.data);
      },
      complete() {
        wx.hideLoading();
      }
    })
  },

  /** 解析电影详情数据 */
  analysisDetailsData(data) {
    const details = {
      title: data.title,
      image: data.images.small,
      rating: data.rating.average,
      summary: data.summary,
      genres: data.genres,
      year: data.year,
      countries: data.countries,
      casts: data.casts,
    };

    this.setData({ details });
  }
})