// pages/goentry_tea/goentry_tea.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  submit:function(event){
    var that = this;
    // console.log(valueid)
    console.log("检查一下提交的数据："+that.data.realname+that.data.student_id+that.data.collegeclass+that.data.valueid)
    // 数据提交
    // wx.request({
    //   url: 'url',
    // })
    // 
    // 跳转页面
    wx.redirectTo({
      url:'../user/user'
    })

    // 弹窗，提示信息提交成功  只能放在后面，不然不提示
    wx.showToast({ //显示消息提示框
      image: "../images/msg/success.png", //自定义图标的本地路径，image 的优先级高于 icon
      icon: "success", //显示成功图标，此时 title 文本最多显示 7 个汉字长度
      title: '成功提交信息',
      duration: 1000, //提示的延迟时间 为1s 1000ms=1s
    })
    // wx.navigateTo({
    //   url: '../user/user',
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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