var util=require("./../../utils/util.js");
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curNum: 0,
    searchstort: [],
    key:1,
    searchBackFlag: true,
    searchList: [], //搜索结果
    nav:[
      "首页","排行榜","搜索"
      ],
      img: [
        "/images/1.jpg",
        "/images/2.jpg",
        "/images/3.jpg",
        "/images/4.jpg",
        "/images/5.jpg"
      ],
      indicatorDots: true,
      indicatorcolor: '#fff',
      autoplay:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;

    //推荐
      util.imgdata(function(res){
        // console.log(res)
      var data=res.data.data;
      that.setData({
      imgsdata:data
      })
      })

      //排行榜
      util.paihmath(function(res){
        var data=res.data.topList;
        that.setData({
          topList:data
        })
      })

      //热门搜索
      util.sousuo(function(res){
        that.setData({
          sousuode:res
        })
      })
      //获取搜索记录
      wx.getStorage({
        key: 'task',
        success: function (res) {
          //console.log(res)
          that.setData({
            searchstort: res.data
          })
        }
      })
      console.log(this)
  },
  //打开排行榜
  opentoplist: function (ev) {
    var id = ev.currentTarget.dataset.topid;
    wx.navigateTo({
      url: './../paihan/paihan?id=' + id
    })
  },

  tabnav: function (ev) {
    let index = ev.currentTarget.dataset.navindex
    this.setData({
      curNum: index
    })
  },
  searchInput: function (ev) {
    this.setData({
      searchVal: ev.detail.value //获取输入的歌名
    })
    if (!ev.detail.value){
      this.setData({
        searchList: []
      })
    }
  },

  searchSubmit: function () { //搜索点击完成触发
    // console.log(1)
    var that=this;
    var value = this.data.searchVal;
    this.searchBack(value);
    // util.get_search(value,key,function(res){
    //   that.setData({
    //     searchList: res.data.song.list
    //   })
    // })
    if (this.data.searchBackFlag){
      this.store(value);
    }
  },
  searchBack:function(value){
    var that=this;
    var key = this.data.key;
    util.get_search(value, key, function (res) {
      let searchList = that.data.searchList;
      if (that.data.searchBackFlag) {
        searchList = res.data.song.list;
      } else {
        //拼接数组
        searchList = searchList.concat(res.data.song.list)
      }
      that.setData({
        searchBackFlag: false,
        searchList: searchList
      })
    })
  },
  store:function(value){
    //搜索记录
    var arr = this.data.searchstort;
    arr.push(value)
    wx.setStorage({
      key: "task",
      data: arr
    })
  },

  //获取焦点显示 搜索记录
  getfoucus: function () {
    this.setData({
      foucus: true
    })
  },
  //删除搜索记录
  clolseStore:function(ev){
  //1.删除  this.data.searchstort  第几个
    //2. 存到 storeage里面
    //3.更新 搜索记录

    var that = this;
    var id = ev.currentTarget.dataset.storeid;
    this.data.searchstort.splice(id,1);

    wx:wx.setStorage({
      key: 'task',
      data: this.data.searchstort
    })
    that.setData({
      searchstort: this.data.searchstort
    })
  },

  //播放音乐
  playm:function(ev){
    var id = ev.currentTarget.dataset.playid;
    app.globalData.playlist = this.data.searchList[id];
    wx.navigateTo({
      url: '/pages/playsong/playsong'
    })
  },

  //点进历史记录
  storeSearchreSult:function(ev){
   var that=this;
    var value = ev.currentTarget.dataset.value; 
   that.setData({
     searchVal:value
   })
   this.searchBack(value)
  },

  //一个人的招牌歌
  zhaopai:function(ev){
    var id = ev.currentTarget.dataset.radioid;
    util.zhaopaige(id,function(data){
      var index=Math.floor(Math.random()*20);
      var data=data.data[index];
      app.globalData.pay=data;
      wx.navigateTo({
        url:'/pages/pay/pay'
      })
    })
  },

  hotmusic:function(ev){
    var id = ev.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/hot/hot?id='+id
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
    var key=this.data.key;
    var value=this.data.serchVal;
    this.setData({
      key:key+1
    })
    this.searchSubmit(value);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})