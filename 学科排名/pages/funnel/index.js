import * as echarts from '../ec-canvas/echarts';
const util = require('../utils/util.js');
var barGraph = null;

var pieChart = null;
var data='';
var re='';
var isdetail=false;


Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    utname:'',
    disp:"1",
    ecBar: {
      onInit: function (canvas, width, height) {
      barGraph = echarts.init(canvas, null, {
      width: width,
      
      height: height
      
      });
      canvas.setChart(barGraph);
      
      return barGraph;
      
      }
  },
  ecPie: {
    onInit: function (canvas, width, height) {
    pieChart = echarts.init(canvas, null, {
    width: width,
    
    height: height
    
    });
    
    canvas.setChart(pieChart);
    
    return pieChart;
    
    }
    
    },
    couponArr: [],
  topImages: 'http://m.qpic.cn/psc?/V12RQMJM3f6Gnx/45NBuzDIW489QBoVep5mcaxAY5OfHuAxbSYjGxUKDltOC0z2h5u1vu4QbZNCoJzweO7LcqAKLiehH4gAkQoUOpK7SD5wzLkt0tAP4v73w5Y!/b&bo=fgPkAAAAAAADN4s!&rf=viewer_4',
  
  closeBtnImages: 'http://m.qpic.cn/psc?/V14ZaBeY40XWC8/zkoezU7GGNbZGOF.DPhgQZjV2a5npNMM5D47K1jMLBHO3ccXXkEwsTHa*69Gi8pCGkdmz4imEISAR0fRbZj7*malDMMANN7ZzH8oI6XDWDk!/b&bo=QABAAEAAQAADCSw!&rf=viewer_4',
  // 是否显示优惠劵弹窗
  isShowCouponPopUp: false
    
    },
    onLoad: function (optine) {
      var that = this
      that.setData({
        utname:optine.title
      })
      setTimeout(that.getData,500);
      
      },
      
      getData: function () {
        wx.showLoading({
        title: '加载中...',
        
        });
        
        let that = this;
        var formata='';
        let url1 = 'https://www.sswz.online/search.php?id=' + that.data.utname;
        let url2 = 'https://www.sswz.online/myphp.php?id=' + that.data.utname;
        var param = {id:'123456789'};
        
        util.sendRequest(url1,'GET').then(function (res) {
          console.log(res.data);
          
        //第一个
        barGraph.setOption({
          backgroundColor: '#f7eed6',
          color: ['#f19072','#f3bf88', '#fcd575',
                  '#84a2d4', '#89c3eb','#a0d8ef',
                  '#3eb370', '#68be8d', '#88cb7f'],
          title: {
              text: that.data.utname,             
              textStyle: {
                  color: '#3498db',
                  fontWeight: '800',
                  fontSize: `20`,
              },
              left: 'center',
              top: '5%',
          },
          tooltip: {
              trigger: 'item',
              backgroundColor: 'rgba(0,0,0,0.9)',
              formatter:function(params) {
                return  params.data['name'] +':'+ params.data['value'] ;
            }
              // textStyle: {
              //     fontSize: 16,
              // },
          },
          
          legend: {
              data: ['A+','A','A-','B+','B','B-', 'C+', 'C', 'C-'],
              orient: 'horizontal',
              top: '80%',
              itemWidth: 20,
              itemHeight: 20,
              itemGap: 10,
              
              textStyle: {
                  color: '#',
                  fontSize: 16,
              },
              rich: {
                a: {
                    color: 'red',
                    lineHeight: 10,
                    top: '75%',
                },
              }
          },
          series: [{
              name: 'TITLE',
              type: 'pie',
              
              clockwise: false,
              startAngle: 90,
              radius: '50%',
              center: ['50%', '50%'],
              formatter: [
                '{这段文本采用样式a}',
                '{这段文本采用样式b}这段用默认样式{这段用样式x}'
            ].join('\n'),
              //hoverAnimation: false,
              //roseType: '100%', //area
              data: [{
                      value: res.data[0].Aplus,
                      name: 'A+'
                  },
                  {
                      value: res.data[0].A,
                      name: 'A'
                  },
                  {
                      value: res.data[0].Aminus,
                      name: 'A-'
                  },
                  {
                      value: res.data[0].Bplus,
                      name: 'B+'
                  },
                  {
                      value: res.data[0].B,
                      name: 'B'
                  },
                  {
                      value: res.data[0].Bminus,
                      name: 'B-'
                  },
                  {
                      value: res.data[0].Cplus,
                      name: 'C+'
                  },
                  {
                      value: res.data[0].C,
                      name: 'C'
                  },
                  {
                      value: res.data[0].Cminus,
                      name: 'C-'
                  },
              ],
              itemStyle: {
                  normal:{ 
                      borderColor:'#f7eed6',
                      borderWidth:'3',
                  },
              },
              label: {
                  show: true,
                  position: 'outside',
                  formatter: '{a|{b}:{d}%}\n{hr|}',
                  rich: {
                      hr: {
                          backgroundColor: 't',
                          borderRadius: 100,
                          width: 0,
                          height: 10,
                          padding: [3, 3, 0, -16],
                          shadowColor: '#f7eed6',
                          shadowBlur: 1,
                          shadowOffsetX: '0',
                          shadowOffsetY: '2',
                      },
                      a: {
                          fontSize : 12,
                          padding: [-35, 1, -20, 2],
                      },
                      
                    }
                },
              labelLine: {
                  normal: {
                      length: 10,
                      length2: 20,
                      lineStyle: {
                          width: 1,
                      }
                  }
              },
          }],
          
      });
        
        //第二个
        
        
        
        wx.hideLoading();
        
      });
    return barGraph;
  },
  formSubmit: function (e) {
    var that = this;
    wx.request({
      url: 'https://www.sswz.online/myphp.php?',
      data:{
        id:that.data.utname
      } ,
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        var s='';
          console.log(res.data);
          that.setData({
            couponArr:res.data,
            re:res.data,
            isdetail: true,
          })
      }
    })
  },
  //打开优惠劵弹窗
  openTheCouponPopUp: function () {
    var that = this;
    setTimeout(() => {
      // 先开启优惠劵弹窗
      
      that.setData({
        isShowCouponPopUp: true,
      })
      // 设置优惠劵弹窗打开动画
      
      var animation = wx.createAnimation({
        duration: 600,
        timingFunction: 'ease',
      })
      that.animation = animation;
      animation.scale(1).step();
      
        that.setData({
        animationData: animation.export()
      })
      
      
    }, 1000)
  },
  //关闭优惠劵弹窗
  closeTheCouponPopUp: function () {
    // 设置优惠劵弹窗关闭动画
    var that = this;
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    })
    this.animation = animation;
    animation.scale(0).step();
    this.setData({
      animationData: animation.export(),
    })
    //执行完动画后再关闭
    setTimeout(() => {
      console.log(111)
      this.setData({
        isShowCouponPopUp: false,
        isdetail:false
      })
    }, 200)
    this.getData()

  },
})
