const app = getApp();
Page({
  data: {
      myimgURL: "../images/myUser/user_unlogin2.png",
      // 模拟数据
      listData: {
          imgUrl: ["https://s1.ax1x.com/2022/04/13/LKr6i9.jpg","https://s1.ax1x.com/2022/04/13/LKr6i9.jpg","https://s1.ax1x.com/2022/04/13/LKr6i9.jpg","https://s1.ax1x.com/2022/04/13/LKr6i9.jpg"],
      }
  },
  // 点击事件
  previewSqs(event) {
      // 拿到图片的地址url
      var myimgURL = this.data.myimgURL
      console.log("我的图片地址："+this.data.myimgURL) 
      let currentUrl = event.currentTarget.dataset.src;
      console.log("图片地址："+myimgURL)
      // 微信预览图片的方法
      for(var i=0; i<3; i++){
        wx.previewImage({
          current: myimgURL, // 图片的地址url
          urls: [this.data.myimgURL] // 预览的地址url
      })
      }
      
  },

  // 前往人脸录入
  gotoface(){
    wx.navigateTo({
      url: '../face/face?faceInfo=1',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var imgURL
    var that = this.data
    //  找到上传的人脸信息进行赋值
    // http://172.16.44.144:8000/face_server/static/image/.jpg  图片地址
    wx.request({
      url: app.globalData.url+'face/setImage/',
      data: { 
        openid: wx.getStorageSync('openid'),
        // identity: wx.getStorageSync('quanxian')
      },
      method: 'POST',
      success: function (res2) {
        console.log("返回的图片地址："+res2.data)
        imgURL = app.globalData.url+res2.data.imgurl+wx.getStorageSync('openid')+'.jpg'  
        console.log("拼接好的图片地址："+imgURL)
        that.myimgURL = imgURL
        // }); // 进入到首页后，出现消息提示窗，提示用户:'欢迎使用本小程序'的提示语
      }, 
    })
    
     
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


