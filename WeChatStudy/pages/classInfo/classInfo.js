// pages/classInfo/classInfo.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // hiddenmodalput: true,  
    // hide1: true,
    // hide2: true,
    deposit: 0,
    classID:0,
    //  页面加载获取值
    className: [],
    // 搜索框选择值
    className2: [],
    isSeach: true,  // 默认不切换显示页面
    objectIndex: 0,//默认显示位置
    inputShowed: false,  //初始文本框不显示内容

    quanxian: '',

    hiddenmodalput: true,
    //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框
  },
  // 使文本框进入可编辑状态
  showInput: function () {
    this.setData({
      inputShowed: true,   //设置文本框可以输入内容
      isSeach: false
    });
  },
  // 取消搜索
  hideInput: function () {
    this.setData({
      inputShowed: false,
      isSeach: true
    });
  },
  // 搜索功能
  query(e) {
    this.setData({
      inputValue: e.detail.value
    })  //首先回显输入的字符串
    //实现搜索的功能
    var className = this.data.className;		//先把第二条json存起来
    var className2 = [];		//定义一个数组
    //循环去取数据
    for (var i = 0; i < className.length; i++) {
      var string = className[i].c_name;
      //查询json里的name是否包含搜索的关键词，如果有就把他装进list2数组
      if (string.indexOf(e.detail.value) >= 0) {
        className2.push(className[i]);
      }
    }
    //到这里list2就已经是你查出的数据
    //如果输入的关键词为空就加载原来的全部数据，不是空就加载搜索到的数据
    if (e.detail.value == "") {
      //加载全部
      this.setData({
        className2: className
      })
    } else {
      this.setData({
        className2: className2
      })
    }
  },

  // 点击事件
  previewSqs(event) {
    // 获取课程信息
    // 跳转到课程考勤界面
  },

  // 弹出框
  modalinput: function (e) {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput,
      classID: e.currentTarget.dataset.text
    })
    console.log(this.data.classID)
  },
  //取消按钮
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认
  confirm: function () {
    this.setData({
      hiddenmodalput: true
    })
  },
  // 获取输入内容
  getInptu(e) {
    const info = e.detail.value || e.detail.text
    this.setData({ deposit: info })
    console.log(info)
  },


  // 点击时间 选定课程信息去人脸识别
  gotoFace: function (e) {
    this.setData({
      hiddenmodalput: true
    })
    console.log("deposit="+this.data.deposit)
    if (this.data.deposit == 4413) {
      // 还是只能一页一页的传课程数据，到成功考勤在将数据存入数据库
      // console.log("测试数据：" + e.currentTarget.dataset.text)
      // console.log(e)
      var app = getApp()
      var classID = this.data.classID
      // app.globalData.className.push(classID)
      console.log('classInfo hava classID:' + classID)
      // let classname = this.data.className[0].name
      // let teaName = this.data.className[0].info
      // 做判断，是学生还是教师  学生为0，教师为1
      if (wx.getStorageSync('quanxian') == 0) {
        console.log("学生界面")
        wx.navigateTo({
          // url: '../face/face?className='+classname+"&teaName="+teaName,  // 
          url: '../vivoTesting/vivo?classID=' + classID,
        })
      } else {
        console.log("教师界面")
        wx.redirectTo({
          url: '../kq_record/kq_record?classID=' + classID,
        })
      }
    } else {
      wx.showToast({
        title: '密令错误，请重试！',
        icon:'none',
        duration:2000
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 每次点击都获取是否是第一次进入系统
    var userInfoTianXie = wx.getStorageSync('userInfoTianXie')
    let that = this
    this.data.quanxian = userInfoTianXie
    if (userInfoTianXie == '1') {
      wx.request({
        url: app.globalData.url + 'myclass/showClass/', //仅为示例，非真实的接口地址
        data: {
          // openid: openID,
        },
        method: 'POST',
        success: function (res2) {
          // 成功查询课程信息后，进行赋值和渲染
          console.log("res2.data:" + res2.data)
          that.setData({
            className: res2.data,
            className2: res2.data,
          })
        },
      })
    } else {
      wx.showModal({
        title: '信息错误', //提示的标题
        content: '检测到您是第一次进入系统，请先完善个人信息！', //提示的内容
        success: function (res) {
          if (res.confirm) {
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