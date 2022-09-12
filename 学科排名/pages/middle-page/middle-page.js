// pages/middle-page/middle-page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    utlevel:'',
    subject:'',
    region:'',
    dis:"none",
    utname:[],
    AP:[],
    A:[],
    AM:[],
    BP:[],
    B:[],
    BM:[],
    CP:[],
    C:[],
    CM:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    that.setData({
      region:options.region,
      subject:options.subject,
      utlevel:options.utlevel
    });
    wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.request({
      url: 'https://www.sswz.online/index_search.php',
      method:'GET',
      data:{
        'sj':that.data.subject,
        'rg':that.data.region,
        'lv':that.data.utlevel
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res.data);
        wx.hideNavigationBarLoading() //完成停止加载

        if(res.data.length == 0){
         wx.switchTab({
           url: '/pages/search2/search2',
         })
         wx.showToast({
           title: '找不到信息',
           icon: 'success',
           duration: 2000
         })
        }
        else{
          var AP=[]
          var A=[]
          var AM=[]
          var BP=[]
          var B=[]
          var BM=[]
          var CP=[]
          var C=[]
          var CM=[]
        for(var i = 0;i < res.data.length; i++){
          if(res.data[i].eva_result=='A+'){
            AP.push(res.data[i])
          }
          if(res.data[i].eva_result=='A'){
            A.push(res.data[i])
          }
          if(res.data[i].eva_result=='A-'){
            AM.push(res.data[i])
          }
          if(res.data[i].eva_result=='B+'){
            BP.push(res.data[i])
          }
          if(res.data[i].eva_result=='B'){
            B.push(res.data[i])
          }
          if(res.data[i].eva_result=='B-'){
            BM.push(res.data[i])
          }
          if(res.data[i].eva_result=='C+'){
            CP.push(res.data[i])
          }
          if(res.data[i].eva_result=='C'){
            C.push(res.data[i])
          }
          if(res.data[i].eva_result=='C-'){
            CM.push(res.data[i])
          }
        }
          that.setData({
            utname:res.data,
            AP:AP,
            A:A,
            AM:AM,
            BP:BP,
            B:B,
            BM:BM,
            CP:CP,
            C:C,
            CM:CM,
            dis:""
          });
          console.log(that.data.subject)
          console.log(that.data.region)
          console.log(that.data.utlevel)
     
        }
      },
      fail: function (res) {
        fail ? fail(res) : '';
        // 检查请求连接失败原因
        requestFail(res);
      },
    })
    
  },

  // 连接失败处理函数
requestFail(res) {
  if (res.errMsg.indexOf('time out') > -1 || res.errMsg.indexOf('timeout') > -1) {
    wx.showToast({
      title: '请求超时,请检查您的网络',
      icon: 'none'
    })
  } else if (res.errMsg.indexOf('connect error') > -1) {
    wx.showToast({
      title: '当前网络不佳,请稍后重试',
      icon: 'none'
    })
  } else {
    wx.showToast({
      title: '加载数据失败,请稍后尝试',
      icon: 'none'
    })
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

  },

  gotoevaluate(e){
    console.log(e.target.id);
    wx.navigateTo({
      url: '/pages/evaluate/evaluate?title=' + e.target.id,
    })
  }

})