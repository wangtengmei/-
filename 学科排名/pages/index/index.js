// index.js
const app = getApp()
Page({
  data: {
    province: ['北京', '上海', '重庆', '天津', '黑龙江', '吉林', '辽宁', '河北', '山东', '江苏', '安徽', '浙江', '福建', '广东', '海南', '云南', '贵州', '四川', '湖南', '湖北', '河南', '山西', '陕西', '甘肃', '青海', '江西', '台湾', '香港', '澳门', '新疆', '西藏', '宁夏', '内蒙古', '广西'],
    major:[
      ['教育学', '文学', '法学', '理学', '管理学', '艺术学', '农学', '医学', '历史学', '哲学', '工学', '经济学'],
      []
    ],
    level:["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-"],
    index: -1,
    levelindex: -1,
    majorindex:[-1,-1],
    startX:0,
    startY:0,
    moved_startX:0,
    moved_startY:0,
    change_pages:0,
    title:''
  },
  utinput(e){
    this.setData({
      title:e.detail.value
    })
  },
  gotoevaluate(e){
    var that = this;
    if(that.data.title === ''){
        console.log("none")
    }else{
          console.log("click")
    wx.navigateTo({
      url: '/pages/evaluate/evaluate?title=' + this.data.title,
    })
    that.setData({
      keyvalue:'',
      title:''
    })
    }

  },

  areaPickerChange: function (e) {
    console.log(e.detail.value)
   this.setData({
     index: e.detail.value
   })
 },
  majorcolumnPickerChange: function (e) {
  console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
  var data = {
    major: this.data.major,
    majorindex: this.data.majorindex
  };
  switch(e.detail.column){
    case 0:
      data.majorindex[0]=e.detail.value;
      switch(e.detail.value){
        case 0:
          this.data.major[1]=['体育学', '教育学', '心理学'];break;
        case 1:
          this.data.major[1]=['中国语言文学', '外国语言文学', '新闻传播学'];break;
        case 2:
          this.data.major[1]=['政治学', '民族学', '法学', '社会学', '马克思主义理论'];break;
        case 3:
          this.data.major[1]=['化学', '地球物理学', '地理学', '地质学', '大气科学', '天文学', '数学', '海洋科学', '物理学', '生态学', '生物学', '科学技术史', '系统科学', '统计学'];break;
        case 4:
          this.data.major[1]=['公共管理', '农林经济管理', '图书情报与档案管理', '工商管理', '管理科学与工程'];break;
        case 5:
          this.data.major[1]=['戏剧与影视学', '美术学', '艺术学理论', '设计学', '音乐与舞蹈学'];break;
        case 6:
          this.data.major[1]=['作物学', '兽医学', '农业资源与环境', '园艺学', '林学', '植物保护', '水产', '畜牧学', '草学'];break;
        case 7:
          this.data.major[1]=['中医学', '中药学', '中西医结合', '临床医学', '公共卫生与预防医学', '口腔医学', '基础医学', '护理学', '药学'];break;
        case 8:
          this.data.major[1]=['世界史', '中国史', '考古学'];break;
        case 9:
          this.data.major[1]=['哲学'];break;
        case 10:
          this.data.major[1]=['交通运输工程', '仪器科学与技术', '信息与通信工程', '光学工程', '兵器科学与技术', '农业工程', '冶金工程', '力学', '动力工程及工程热物理', '化学工程与技术', '土木工程', '地质资源与地质工程', '城乡规划学', '安全科学与工程', '建筑学', '控制科学与工程', '机械工程', '材料科学与工程', '林业工程', '核科学与技术', '水利工程', '测绘科学与技术', '环境科学与工程', '生物医学工程', '电子科学与技术', '电气工程', '石油与天然气工程', '矿业工程', '纺织科学与工程', '航空宇航科学与技术', '船舶与海洋工程', '计算机科学与技术', '软件工程', '轻工技术与工程', '风景园林学', '食品科学与工程'];break;
        case 11:
          this.data.major[1]=['应用经济学', '理论经济学'];break;
      };
      break;
    case 1:
      data.majorindex[1]=e.detail.value;
      break;
  }
  this.setData(data);
  console.log(this.data.majorindex);
},
  levelPickerChange: function (e) {
  console.log(e.detail.value)
  this.setData({
   levelindex: e.detail.value
 })
},
touchstart: function (e) {
  this.setData({
    startX: e.changedTouches[0].clientX,
    startY: e.changedTouches[0].clientY,
  })
},
touchend: function (e) {

      //添加音效
      const innerAudioContext = wx.createInnerAudioContext()
      innerAudioContext.autoplay = true  // 是否自动开始播放，默认为 false
      innerAudioContext.src = '/pages/index/reasources/flip.mp3';  // 音频资源的地址

      innerAudioContext.loop =false  // 是否循环播放，默认为 false
      wx.setInnerAudioOption({ // ios在静音状态下能够正常播放音效
        obeyMuteSwitch: true,   // 是否遵循系统静音开关，默认为 true。当此参数为 false 时，即使用户打开了静音开关，也能继续发出声音。
        success: function(e) {
          console.log(e)
          console.log('play success')
        },
        fail: function(e) {
          console.log(e)
          console.log('play fail')
        }
      })

  var that=this;
  this.setData({
    moved_startX: e.changedTouches[0].clientX,
    moved_startY: e.changedTouches[0].clientY,
  })
  var move_if = this.data.startX - this.data.moved_startX;
  if(move_if > 0){
    this.setData({
      change_pages: 1
    })
    console.log("向左滑动")


    innerAudioContext.onPlay(() => {  // 监听音频播放事件
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => { // 监听音频播放错误事件
      console.log(res.errMsg)
      console.log(res.errCode)
    })

    console.log(this.data.change_pages)
    var province=this.data.province
    var index=this.data.index
    var major=this.data.major
    var majorindex=this.data.majorindex
    var level=this.data.level
    var levelindex=this.data.levelindex
    var region=(index==-1)?'':province[index]
    var subject=(majorindex[1]==-1)?'':major[1][majorindex[1]]
    var utlevel=(levelindex==-1)?'':level[levelindex]
    setTimeout(function()
    {
      // complete
          wx.navigateTo({
      url: '/pages/middle-page/middle-page?region='+region+"&subject="+subject+"&utlevel="+utlevel,
    })
    },1000);

    setTimeout(function()
    {
      // complete
    that.setData({
      index: -1,
      levelindex: -1,
      majorindex:[-1,-1],
      change_pages:0
    })

    },2000);


  }
  else{
    console.log("向右滑动")
  }
},

  search(){
    this.gotoevaluate();
  }

})