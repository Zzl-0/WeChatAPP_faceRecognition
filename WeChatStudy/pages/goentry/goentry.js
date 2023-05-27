// pages/goentry/goentry.js
var time = require("../utils/utils")
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    realname: "",
    student_id: "",
    collegeclass: "",
    college: "",
    isjiantou: true,   //箭头切换
    selectcontent: [
      { id: 1, name: "我是老师" },
      { id: 2, name: "我是学生" },

    ],
    value: undefined,   //选中的值
    valueid: undefined,  //选中的id
  },

  // 下拉框收起和下拉
  changejiantou() {
    this.setData({
      isjiantou: !this.data.isjiantou
    })
  },

  // 选择数据后回显
  changecontent(e) {
    console.log(e.currentTarget.dataset.datavalue.id)
    this.setData({
      value: e.currentTarget.dataset.datavalue.name,
      valueid: e.currentTarget.dataset.datavalue.id,
      isjiantou: true,
    })
  },

  // 判断信息来源 （已完成）
  overinput: function (event) {
    var value = event.detail.value;
    let that = this;
    // 根据data-id的值来判断是什么数据（姓名、学号还是班级）
    var id = event.currentTarget.dataset.id;
    console.log('获取的信息:' + id)
    if (id == 1) {
      that.setData({
        realname: value
      })
    }
    // console.log(realname)  // 提示时间警告，实时获取输入栏的数据需要时间支撑
    if (id == 2) {
      // 进行正则表达式校验
      that.setData({
        student_id: value
      })
    } if (id == 3) {
      that.setData({
        collegeclass: value
      })
    } if (id == 4) {
      that.setData({
        college: value
      })
    }
  },

  // 清除信息功能 （已完成）
  cleandata: function () {
    this.setData({
      realname: "",
      student_id: "",
      collegeclass: "",
      college: "",
    })
  },

  //提交编写的信息
  submit: function (event) {
    var that = this;
    // getStorageInfoSync 是返回整个缓存信息不包含缓存值，    getStorageSync是获取当前key对应的值
    var id = wx.getStorageSync('openid')
    console.log("id:" + id)
    // console.log(valueid)
    console.log("检查一下提交的数据：" + that.data.realname + " 学号：" + that.data.student_id + " 专业班级：" + that.data.collegeclass + " 学院名称：" + that.data.college)
    // 数据提交
    wx.request({
      url:  app.globalData.url+'user_info/addInfo/',
      method: 'POST',
      data: {
        id: wx.getStorageSync('openid'),
        quanxian:wx.getStorageSync('quanxian'),
        realname: that.data.realname,
        student_id: that.data.student_id,
        collegeclass: that.data.collegeclass,
        college: that.data.college,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log("传回信息：" + res.data.msg)
        wx.setStorageSync('userInfoTianXie', res.data.Info)
        if (res.data.code == 200) {
          wx.showToast({
            title: '信息提交成功！',
            icon: 'success',
            duration: 2000,
          })
          wx.redirectTo({
            url: '../user/user'
          })
        } else {
          wx.showToast({
            title: '数据格式错误！',
            icon: '',
            image: '../images/myUser/error.png',
            duration: 2000
          })
        }
      }
    })
    // 跳转页面
    // wx.redirectTo({
    //   url:'../user/user'
    // })
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