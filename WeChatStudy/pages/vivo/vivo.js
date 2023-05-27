// pages/vivo/vivo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoSrc:'',
    src:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setCameraSize();
    this.ctx = wx.createCameraContext()  // 获取照相机
    
  },

  startRecord() {
    this.ctx.startRecord({
      success: (res) => {
        console.log('startRecord')
      }
    })
  },
  stopRecord() {
    this.ctx.stopRecord({
      success: (res) => {
        this.setData({
          src: res.tempThumbPath,
          videoSrc: res.tempVideoPath
        })
      }
    })
    
  },
  error(e) {
    console.log(e.detail)
  },

  // 第二种方法
  setCameraSize(){
    //获取设备信息
    const res = wx.getSystemInfoSync();
    //获取屏幕的可使用宽高，设置给相机
    this.setData({
      cameraHeight: res.windowHeight,
      cameraWidth: res.windowWidth
    })
    console.log(res)
  },
  // 开始录像
  startShootVideo() {
    this.setData({
      videoSrc: ''
    })
    console.log("========= 调用开始录像 ===========")
    let that = this
    this.ctx.startRecord({
      timeoutCallback: () => {
      },
      success: (res) => {
      },
      fail() {
        wx.showToast({
          title: '录像失败',
          icon: 'none',
          duration:4000
        })
        console.log("========= 调用开始录像失败 ===========")
      }
    })
  },
  /**
   * 结束录像
   */
  stopShootVideo() {
    wx.hideLoading();
    // console.log("========= 调用结束录像 ===========")
    this.ctx.stopRecord({
      compressed: false, //压缩视频
      success: (res) => {
        console.log(res)
        this.setData({
          videoSrc: res.tempVideoPath
        })
      },
      fail() {
        wx.showToast({
          title: '录像失败',
          icon: 'none',
          duration:4000
        })
        console.log("========= 调用结束录像失败 ===========")
      }
    })
  },
 
  //touch start 手指触摸开始
  handleTouchStart: function (e) {
    this.setData({
      startTime: e.timeStamp
    })
  },
 
  //touch end 手指触摸结束
  handleTouchEnd: function (e) {
    // wx.hideLoading();
    let endTime = e.timeStamp;
    //判断是点击还是长按 点击不做任何事件，长按 触发结束录像
    if (endTime - this.data.startTime > 350) {
      //长按操作 调用结束录像方法
      this.stopShootVideo();
    } else {
      this.setData({
        textFlag: ''
      })
    }
 
  },
 
  /**
   * 长按按钮进行录像
   */
  handleLongPress: function (e) {
    // 长按方法触发，调用开始录像方法
    this.startShootVideo();
  },


  upRecord(){
    console.log('videoSrc:'+this.data.videoSrc)
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