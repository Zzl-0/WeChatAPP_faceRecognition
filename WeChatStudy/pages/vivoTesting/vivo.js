// pages/vivoTesting/vivo.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    classID: "",
    videoSrc: '', // 录制的视频临时路径
    isBack: false // 是否返回上一页,用于页面隐藏时判断
  },

  // 当取消授权或者打开设置授权
  handleNoAuth(res) {
    console.log("用户拒绝授权：", res);
    // 因为在设置里授权摄像头不会立即生效，所以要返回上一页,确保重新进入当前页使摄像头生效
    setTimeout(() => {
      wx.navigateBack()
    }, 500)
  },

  // 版本号过低的回调
  handleCannotuse() {
    console.log('版本号过低无法使用, 组件内已经弹窗提示过了');
    wx.navigateBack()
  },

  // 视频录制完成
  handleComplete(e) {
    console.log('视频文件路径:', e.detail)
    // e.detail: 视频临时路径
    this.setData({ videoSrc: e.detail, isBack: false })

    // 打印视频信息文件
    wx.getFileInfo({
      filePath: e.detail,
      success: (res) => {
        const { size } = res
        console.log("视频文件大小M:", size / Math.pow(1024, 2));
      },
      fail: (err) => {
        console.log("获取视频文件失败", err);
      }
    })
    var classID = this.data.classID
    // 上传文件, 实际业务中为人脸识别活体检测接口
    wx.showLoading({ title: '上传中..', mask: true })
    wx.uploadFile({
      url: app.globalData.url + 'vivoTest/', //仅为示例，非真实的接口地址
      filePath: e.detail,
      name: 'file',
      complete: (res) => {
        console.log('上传结果', res)
        wx.hideLoading()
      },
      success: function(res){
        // res.data.isPeople
        var json = JSON.parse(res.data)
        // console.log(json)
        // console.log("isPeople:"+res.data.isPeople)
        
        if(json.isPeople == 'yes'){
          wx.navigateTo({
            url: '../face/face?classID='+classID,
          })
        }else{
          wx.showLoading({ 
            title: '检测失败！请按照提示进行。', 
            icon: 'none',
          })
          setTimeout(function(){
            wx.hideToast()
          },3000)
        }
      },
      fail:function(res){
        
      },

    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      classID : options.classID
    })
    this.data.classID = options.classID
    console.log("classID:"+this.data.classID)
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
    console.log('页面显示')
    this.setData({ isBack: true })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    // 在录制中退出后台页面隐藏，返回上一页，确保重新进入当前页
    // 防止在录制中退出后台导致下次重新录制失败 "operateCamera:fail:is stopping"
    console.log('页面隐藏')
    if (this.data.isBack) wx.navigateBack()
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