// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:'',
    userInfo:''  //用于存储获取的用户信息
  },
//   onLaunch: function () {
//     // 本地存储能力
//     var logs = wx.getStorageSync('logs') || []
//     logs.unshift(Date.now())
//     wx.setStorageSync('logs', logs) 

//     wx.getSetting({
//       success:res=>{
//         if (res.authSetting['scope.userInfo']){
//           // 已经授权，可以直接调用getUserInfo 获取头像昵称等，不会弹框
//           wx.getUserInfo({
//             success: res => {
//             }
//           })
//         }
//     }
//   })
// },

  dianJi(){
    console.log("点击了按钮")
    wx.getUserProfile({
      desc: '获取用户的信息',
      success:res => {
        console.log("成功授权",res)
        this.setData({
          userInfo:res.userInfo
          // nickName: res.userInfo.nickName,
          // touxian:res.userInfo.avatarUrl
        })
      },
      fail:(err) => {
        console.log("授权失败",err);
      }
    })
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