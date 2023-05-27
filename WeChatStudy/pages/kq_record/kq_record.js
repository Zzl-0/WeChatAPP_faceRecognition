// pages/kq_record/kq_record.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    listData:[{name:'123',kq_time:"2020-03-17",stuID:'2019级'},{name:'567',kq_time:"2020-03-17",stuID:'2019级'}],
    // id:wx.getStorageSync('quanxian')
    chooseInfo:[],
    classID:'',
  },

  tiaozhuang(){
    var qx = wx.getStorageSync('quanxian')
    if(qx == 1){  // 是教师的话跳转界面
      wx.navigateTo({
        url: '../kqinfo/kqinfo',
      })
    }else{  // 提示框，你不是教师
      wx.showModal({
        title: '权限错误', //提示的标题
        content: '您不是教师，没有此权限！', //提示的内容
        success: function(res) {
          if(res.confirm) {
            console.log('用户点击了确定')
          } else if (res.cancel) {
            console.log('用户点击了取消')
          }
        }
      })
    
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      classID : options.classID
    })
    var classID = this.data.classID
    console.log("classID:"+classID)
    // 每次点击都获取是否是第一次进入系统
    var userInfoTianXie =  wx.getStorageSync('userInfoTianXie')
    if(userInfoTianXie == '1' ){
      // 不是第一次进入系统，则查询自己的考勤信息进行展示
      wx.request({
        url: app.globalData.url + 'myclass/showChooseInfo', //仅为示例，非真实的接口地址
        data: {
          // openid: openID,
          classID: classID,
        },
        method: 'GET',
        header:{
          "content-type" : "application/json'", //get请求时候
        },
        success: function (res2) {
          // 成功查询课程信息后，进行赋值和渲染
          console.log("res2.data:" + res2.data)
          that.setData({
            chooseInfo: res2.data,
            // stu_id: res2.data,
          })
        },
      })
    }else{
      wx.showModal({
        title: '信息错误', //提示的标题
        content: '检测到您是第一次进入系统，请先完善个人信息！', //提示的内容
        success: function(res) {
          if(res.confirm) {
            console.log('用户点击了确定')
            wx.redirectTo({
              url: '../user/user'
            })
          } else if (res.cancel) {
            console.log('用户点击了取消')
            wx.redirectTo({
              url: '../user/user'
            })
          }
        }
      })
    }
    var that=this;
    // wx.request({
    //   url: 'https://127.0.0.1/getHistory', // 仅为示例，并非真实的接口地址
    //   method: 'post',
    //   data: {
    //     account: wx.getStorageSync('unitName'),
    //   },
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded' // 默认值
    //   },
    //   success(res) {
    //     that.setData({
    //       listData: res.data.obj
    //     })
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})