import util from './../../utils/util.js';
var app = getApp(); //获取一个app实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    let that = this;
    util.get_toplist_detail(id,function(res){
      that.setData({
        songmusic: res.data.songlist
      })
    })
    //请求数据
 console.log(this)
  },
//播放音乐
  openPlaymusic:function(ev){
    var id = ev.currentTarget.dataset.songid;
    app.globalData.playlist=this.data.songmusic[id].data
    wx.navigateTo({
      url: '/pages/playsong/playsong'
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})