const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,  
    // hiddenmodalput: false,   // 修改成false会是什么样子  不重要 
    hide1: true,
    hide2: true,
    isRegister: false,
    sname: "",
    snum: "",
    slesson: "",
    sclass: "",
  },
  //点击按钮弹出指定的hiddenmodalput弹出框
  modalinput1: function(e) {
    var that = this;
    var userid = wx.getStorageSync('openid');
    // console.log("userInfo:"+wx.getStorageSync('openid'))
    // 判断是否登录，如果没有就需要授权登录,但是在我的系统当中不会出现这种情况
    if (wx.getStorageSync('openid') == null) {
      wx.showModal({
        title: '📢提示',
        content: '先去授权登录哟(*/ω＼*)',
        confirmText: "确定",
        success(res) {
          console.log('res:'+res.confirm)
          if (res.confirm) {
            wx.switchTab({
              url: '../person/person',
            })
          }
        }
      })
    } else {
      wx.setStorageSync('quanxian', 0)
      // console.log("quanxian:"+wx.getStorageSync('quanxian'))
        wx.switchTab({
          url: '../user/user'
        })
    }
  },
  modalinput2: function(e) {
    wx.setStorageSync('quanxian', 1)
    console.log("点击我是老师后判断条件："+e.detail.userInfo)
    if (e.detail.userInfo != undefined) {
      this.setData({
        hiddenmodalput: !this.data.hiddenmodalput,
        hidden1: true,
        hidden2: false,
      })
    }
  },
  goLesson: function() {
    wx.switchTab({
      url: '../classInfo/classInfo'
    })
  },
  //取消按钮
  cancel: function() {
    this.setData({
      hiddenmodalput: true,
    });
  },
  //确认
  confirm: function(e) {
    var that = this;
    this.setData({
      hiddenmodalput: true,
    })
    if ((that.data.sname && that.data.snum) || (that.data.slesson && that.data.sclass) != '') {
      this.charu()
      this.setData({
        slesson: "",
        sclass: "",
      })

    } else {
      wx.showToast({
        title: '输入为空(+_+)?',
        icon: 'none'
      })
    }
  },

  //获取input的信息
  setname: function(e) {
    this.setData({
      sname: e.detail.value
    })
  },
  setnum: function(e) {
    this.setData({
      snum: e.detail.value
    })
  },
  setlesson: function(e) {
    this.setData({
      slesson: e.detail.value,
      sname: "",
      snum:""
    })
  },
  setclass: function(e) {
    console.log(e.detail.value)
    this.setData({
      sclass: e.detail.value,
      sname: "",
      snum: ""
    })
  },

  charu: function() {
    var that = this;
    var userid = wx.getStorageSync('openid');
    wx.request({
      // 使用封装好的服务器URL
      url: app.globalData.url + 'myclass/ClassInfo/',
      data: {
        userid: userid,
        sname: that.data.sname,
        snum: that.data.snum,
        slesson: that.data.slesson,
        sclass: that.data.sclass
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res.data)
        if (res.data =="student_success") {
          wx.showToast({
            title: '添加成功！',
            icon: 'success'
          })
          wx.switchTab({
            url: '../classInfo/classInfo'
          })
          that.setData({
            isRegister: true,
          })
        } else if(res.data =="lesson_success"){
          wx.showToast({
            title: '添加成功！',
            icon: 'success'
          })
          wx.navigateTo({
            url: '../teacher_lesson/teacher_lesson'
          })
        }else{
          wx.showToast({
            title: '失败请重试！😱',
          })
        }
      },
      fail: function(res) {

      },
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function() {
      wx.hideLoading()
    }, 1500)
  },
  check_student: function() {


  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      hiddenmodalput: true
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})