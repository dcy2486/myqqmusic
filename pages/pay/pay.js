import util from './../../utils/util.js';
var app=getApp();
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
    var songmid=app.globalData.pay
  //  console.log(songmid)
    this.setData({
      songmid:songmid,
      imageurl: 'http://y.gtimg.cn/music/photo_new/T002R150x150M000' + songmid.album.mid + '.jpg'
    })
    wx.playBackgroundAudio({
      dataUrl: 'http://dl.stream.qqmusic.qq.com/C100' + songmid.mid + '.m4a?fromtag=38'
    })


    //歌词
    var that=this;
    var musicid = this.data.songmid.id;
    console.log(musicid);
    util.get_lyric(musicid, function (data) {
      var re = /[^\u4e00-\u9fa5]/g; //找到中文

      var text = data.replace(re, "<br>"); //所有的英文都变成br

      var text1 = text.replace(/<br>\s*(<br>\s*)+/g, '  '); //把多个br变成一个br

      var text2 = text1.replace(/<br>+/g, " ").split("  ");  //转化成数组
      that.setData({
        lyc: text2
      })
    })

  },

//控制播放
  bofan: function () {
    var off = !this.data.off;
    var songmid = app.globalData.pay
    //console.log(off)
    this.setData({
      off: off
    })

    if (off) { //播放
      wx.playBackgroundAudio({
        dataUrl: 'http://ws.stream.qqmusic.qq.com/C100' + songmid.mid + '.m4a?fromtag=38'
      })
    }
    else {
      wx.pauseBackgroundAudio()
    }
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