// pages/kqinfo/kqinfo.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    kqState: "已考勤",
    listData:[{up_time:"2023-04-07",classname:'java测试',kqState:'已考勤'},
    ]
  },

  gotouser(){
    wx.switchTab({
      url: '../user/user',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      classID : options.classID
    })
    var classID = this.data.classID
    // var openid = wx.getStorageSync('openid')
    // 这个人考勤了，修改数据库信息
    wx.request({
      url: app.globalData.url + 'myclass/alterKqInfo/', //仅为示例，非真实的接口地址
      data: {
        openid: 'oMyW45HtAA9Crungf5dEvwvjQ0Jg',
        // classID: classID,
      },
      method: 'POST',
      header:{
        "content-type" : "application/json'", //get请求时候
      },
      success: function (res2) {
        // 成功查询课程信息后，进行赋值和渲染
        console.log("res2.data:" + res2.data)
        // that.setData({
        //   chooseInfo: res2.data,
        //   // stu_id: res2.data,
        // })
      },
    })

    console.log("课程数组："+app.globalData.className+"classID:"+classID)
    var state = wx.getStorageSync('kqState')
    //z
    if(state == 1){
      this.setData({
        kqState:"已考勤" 
      })
    }
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