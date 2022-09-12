// pages/my.js


//index.js
//获取应用实例
var app = getApp();
var mtabW;
Page({
 data: {
   hasUserInfo:false,
 tabs:["详细信息","学生评价"],
 activeIndex:0,
 slideOffset:0,
 tabW:0,
 title:"合肥工业大学",
 footdisp:"none",
 id:app.globalData.name,
 photo:app.globalData.src,
 comment:[],
 info:[],
 },



 //事件处理函数
 onLoad: function (options) {
  this.setData({
    hasUserInfo:app.globalData.hasUserInfo
  })
   console.info(options.title)
 var that = this;
 that.setData({   title:options.title})
 wx.getSystemInfo({
  success: function (res) {
  mtabW = res.windowWidth / 2; //设置tab的宽度
  that.setData({
   tabW:mtabW,
   clientHeight: res.windowHeight
  })
  }
 });
 wx.showNavigationBarLoading() //在标题栏中显示加载

   //模拟加载
   setTimeout(function()
   {
     // complete
    //  wx.hideNavigationBarLoading() //完成停止加载
     wx.stopPullDownRefresh() //停止下拉刷新
   },2000);

 this.readsql();
 this.readsql2();

 },
 bindViewTap: function() {
 wx.navigateTo({
 url: '../logs/logs'
 })
 },

 readsql(){
   var that = this;
   console.log(that.data.title)
   //读取数据库评论
 wx.request({
  url: 'https://www.sswz.online/readWx.php',
  method: 'GET',
  data: {
    'ut': that.data.title
  },
  header: {
    'content-Type': 'application/json'
  },
  success(res) {
    console.log("success");
    wx.hideNavigationBarLoading() //完成停止加载

      that.setData({
        comment: res.data,
        // clientHeight:(res.data.length)*80
      });


  },
  fail: function (res) {
    fail ? fail(res) : '';
    // 检查请求连接失败原因
    requestFail(res);
  },
})
 },

 readsql2(){
  var that = this;
  //读取数据库
wx.request({
 url: 'https://www.sswz.online/readWx2.php',
 method: 'GET',
 data: {
   'ut': that.data.title
 },
 header: {
   'content-Type': 'application/json'
 },
 success(res) {
   console.log(res.data);
   if(res.data.length == 0){
    wx.navigateTo({
      url: '/pages/index/index',
    })
    wx.showToast({
      title: '找不到信息',
      icon: 'none',
      duration: 2000
    })
   }
   else{
     that.setData({
       info: res.data,
       imgurl:res.data[0].imgurl
       // clientHeight:(res.data.length)*80
     });

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


 onPullDownRefresh:function()
 {
   wx.showNavigationBarLoading() //在标题栏中显示加载

   //模拟加载
   setTimeout(function()
   {
     // complete
     wx.hideNavigationBarLoading() //完成停止加载
     wx.stopPullDownRefresh() //停止下拉刷新
   },1500);
   this.setData({
     scrolltop:0
   })
   this.readsql()
   this.readsql2()
 },

 tabClick:function(e){
 var that = this;
 var idIndex = e.currentTarget.id;
 var offsetW = e.currentTarget.offsetLeft; //2种方法获取距离文档左边有多少距离

 this.setData({
 activeIndex:idIndex,
 slideOffset:offsetW
 });

 if (e.timeStamp - this.touchStartTime  < 300){
  console.log('shuangji')
  wx.showNavigationBarLoading() //在标题栏中显示加载

  //模拟加载
  setTimeout(function()
  {
    // complete
    wx.hideNavigationBarLoading() //完成停止加载
  },1500);
  this.setData({
    scrolltop:0
  })
  this.readsql()
}

this.touchStartTime = e.timeStamp;
 },
 bindChange:function(e){
 var current = e.detail.current;
 if((current+1)%4 == 0){

 }
 var offsetW = current * mtabW; //2种方法获取距离文档左边有多少距离
 this.setData({
  activeIndex:current,
  slideOffset:offsetW,
  footdisp:(current==1)?"":"none"
 });

 },


 formSubmit: function(e) {
   console.log("tijiao")
   wx.showNavigationBarLoading() //在标题栏中显示加载
   
 var utils = require('../utils/utils.js');
  var time = utils.formatTime(new Date())//time

  console.log(app.globalData.name);
  console.info(this.data.title),
  wx.showToast({
    title: '评论成功',
    icon: 'success',
    duration: 2000
  })
  var that = this;
  if(e.detail.value.liuyantext){
    var liuyantext = e.detail.value.liuyantext; //获取表单所有name=liuyantext的值 
  }


  // console.log('id' + this.data.id);
  // console.log('留言number:' + that.data.number);
      wx.request({
    url: 'https://www.sswz.online/writeWx.php',
    method:'GET',
    data: {
      ut:that.data.title,
      content: liuyantext,
      // number: that.data.number,
      photo:app.globalData.src,
      id: app.globalData.name,
      date:time
    },

    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },

    success: function (res) { 

    that.readsql();
    wx.hideNavigationBarLoading() //完成停止加载


      that.setData({
        keyValue:'',
      })
    },
    fail: function () { console.log("fail") }

    
  })

},

guanwang(e){
  wx.navigateTo({
    url: '/pages/website/website?addr='+e.currentTarget.id,
  })
  console.log(e.currentTarget.id)
},

gotoshow(){
  wx.navigateTo({
    url: '/pages/funnel/index?title='+this.data.title,
  })
},

getUserProfile(e) {
  // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
  // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  wx.getUserProfile({
    desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    success: (res) => {
      app.globalData.userInfo = res.userInfo
      app.globalData.hasUserInfo = true
      app.globalData.name = res.userInfo.nickName
      app.globalData.src = res.userInfo.avatarUrl
      console.log(app.globalData.hasUserInfo)
      this.setData({
        hasUserInfo:app.globalData.hasUserInfo
      })
    }
  })
},
search(){
  this.gotoevaluate();
}
})

