import util from './../../utils/util.js';
var app = getApp();
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
    this.setData({
      off: true,
      currenPosition: 0,//当前的时间
      duration: 0,
      s: 0,
      m: 0,
      eleWidth: 0,
      curM: 0
    })
    var that=this;
    var data=app.globalData.playlist;
    // console.log(data)
    this.setData({
      musicList:data,
      imageurl:'http://y.gtimg.cn/music/photo_new/T002R150x150M000' + data.albummid + '.jpg'
    })
    console.log(this)
    wx.playBackgroundAudio({
      dataUrl: 'http://dl.stream.qqmusic.qq.com/C100' + data.songmid+'.m4a?fromtag=38'
    })
    
    //歌词
    var musicid = this.data.musicList.songid;
    util.get_lyric(musicid,function(data){
      var re = /[^\u4e00-\u9fa5]/g; //找到中文

      var text = data.replace(re, "<br>"); //所有的英文都变成br

      var text1 = text.replace(/<br>\s*(<br>\s*)+/g, '  '); //把多个br变成一个br

      var text2 = text1.replace(/<br>+/g, " ").split("  ");  //转化成数组
      that.setData({
        lyc:text2
      })
    })

    this.musicStartus();
  },


  musicStartus:function(){
    var that = this;
   //获取音乐播放的状态
    clearInterval(this.data.timer);
    setInterval(function () {
      wx.getBackgroundAudioPlayerState({
        success: function (res) {
          // var currenPosition=res.currentPosition
          // var duration=res.duration
          // console.log(currenPosition, duration)
          that.setData({
            currenPosition: Math.floor(res.currentPosition),//当前的时间
            duration: Math.floor(res.duration),
            s: Math.floor(res.duration % 60),
            m: Math.floor(parseInt(res.duration / 60)),
            eleWidth: Math.floor(res.currentPosition / res.duration * 100),
            curM: Math.floor(parseInt(res.currentPosition / 60))
          })
        }
      })
    }, 1000)
  },

  bofan: function () {
    var off = !this.data.off;
    var data = app.globalData.playlist;
    //console.log(off)
    this.setData({
      off: off
    })

    if (off) { //播放
      wx.playBackgroundAudio({
        dataUrl: 'http://ws.stream.qqmusic.qq.com/C100' + data.songmid + '.m4a?fromtag=38'
      })
      this.musicStartus();
    }
    else {
      wx.pauseBackgroundAudio()
    }
  },

    //前进后退
  ctrplaymusic:function(ev){
     //1.  bar-child = 获取手指的移动距离  
    //2.  获取 bar的 总宽度  = 屏幕的宽度 - bar.offsetLeft * 2 
    //3. 获取总时长
    //4. 当前的时间 = bar-child的宽度 / bar的宽度 * 总时长
    
    //移动的距离
    var eleWidth = ev.touches["0"].clientX - ev.target.offsetLeft;

    //屏幕的宽度
    var screenX = wx.getSystemInfoSync().screenWidth

    //bar(蓝色)的宽度 
    var barWidth = screenX - ev.target.offsetLeft * 2;
    if(eleWidth>=barWidth){
      eleWidth=100;
    }
   

    this.setData({
      eleWidth: eleWidth / barWidth * 100,
      nv: eleWidth / barWidth * this.data.duration,
    })
  },
  
  nv66:function(){
    var that=this;
    wx.seekBackgroundAudio({
      position: that.data.nv,
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