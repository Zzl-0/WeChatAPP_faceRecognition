// pages/face/face.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    classID:"",
    // 照片来源
    faceInfo:'',
    // 地点位置信息
    QQmapName:'',
    filePath:"../images/myUser/user_unlogin3.png",
    class_id:"选择考勤场次",
    multiArray: [['A老师', 'B老师'], ['课程A', '课程B']],//二维数组，长度是多少是几列
    multiIndex: [0, 0],
    array: [{
      id: "1"
    }, {
      id: "2"
    }, {
      id: "3"
    }]
  },

  chooseClassID(){
    var id = this
    // wx.request({
    //   url: 'url',
    // })
    wx.navigateTo({
      url: '../',
    })
  },

  record: function () {
    let that = this
    console.log(that.data.class_id)
    let ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        //console.log(res.tempImagePath)
        that.setData({
          src: res.tempImagePath
        })
        console.log('faceInfo:'+this.data.faceInfo)
        if(this.data.faceInfo==1){
          that.firstlocalhostimgesupdata(res.tempImagePath)
        }else{
          that.localhostimgesupdata(res.tempImagePath)
        }
        // console.log(res.tempImagePath)  //打印地址http://tmp/sfWkGFLaFFhxfab193be9cdb4059183497e128ab9a1b.jpg
      }
    })
  },
  // 照片用于考勤
  localhostimgesupdata: function (imgPath) {
    console.log("app.globalData.url:"+app.globalData.url)
    let url = app.globalData.url + 'face/get_Image/';
    var classID = this.data.classID
    wx.uploadFile({
      url: url, // 图片上传服务器真实的接口地址
      filePath: imgPath,
      name: 'image',
      method: 'POST',
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      formData: {   // Http请求的额外数据
        // wx.getStorageSync('openid'),
        // 'account': wx.getStorageSync('unitName'),
        // 'id': wx.getStorageSync('openID'),
        openid: wx.getStorageSync('openid')
      },
      success: function (res) {
        console.log("返回值" + res.data);
        // if (JSON.parse(res.data).code == 200) {
        if (res.data == 200 ) {
          wx.showToast({
            title: '人脸比对成功',
            icon: 'success',
            duration: 1500,
            success: function () {
              setTimeout(function () {  //setTimeout 时间延迟功能
                wx.navigateBack({
                  delta: 1  // 返回上一级页面。
                })
              }, 2000);
              wx.redirectTo({
                url:'../kqinfo/kqinfo?classID='+classID
              })
            }
          })
          wx.setStorageSync('kqState', 1)
        } else {
          wx.showToast({
            title: '人脸保存失败',
            icon: 'error',
            duration: 2000
          })
          wx.setStorageSync('kqState', 0)
        }
      }
    })
  },
  // 照片用于第一次上传
  firstlocalhostimgesupdata: function (imgPath) {
    console.log("app.globalData.url:"+app.globalData.url)
    let url = app.globalData.url + '/face/get_Image';
    wx.uploadFile({
      url: app.globalData.url + 'face/firstImage/', // 图片上传服务器真实的接口地址
      filePath: imgPath,
      name: 'image',
      method: 'POST',
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      formData: {   // Http请求的额外数据
        // wx.getStorageSync('openid'),
        // 'account': wx.getStorageSync('unitName'),
        // 'id': wx.getStorageSync('openID'),
        openid: wx.getStorageSync('openid')
      },
      success: function (res) {
        console.log("返回值" + res.data);
        // if (JSON.parse(res.data).code == 200) {
        if (res.data == 200 ) {
          wx.showToast({
            title: '人脸保存成功',
            icon: 'success',
            duration: 1500,
            success: function () {
              setTimeout(function () {  //setTimeout 时间延迟功能
                wx.navigateBack({
                  delta: 1  // 返回上一级页面。
                })
              }, 2000);
            }
          })
        } else {
          wx.showToast({
            title: '人脸保存失败',
            icon: 'error',
            duration: 2000
          })
        }
      }
    })
  },

  // 测试图片上传
  test(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths=res.tempFilePaths
          console.log(tempFilePaths)
          // console.log(that.data.openid)
          wx.uploadFile({filePath:tempFilePaths[0],  //文件路径
            name: 'image',
            url: 'http://127.0.0.1:8000/face/get_image',  //访问的页面路径
            method:'POST',  //操作的类型
            header:{
              'content-type':'application/x-www-form-urlencoded'   //浏览器默认编码格式
            },
            formData:{
              openid:that.data.openid    //附加信息有opid
            },
          })    
      }
    })
  },
    
  // 选择文件
  uploadImg(){
    var that = this
    wx.chooseMedia({
      count:1,  //一次允许传输的照片数
      mediaType:['image','video'],
      sizeType:['origina'],  // 不压缩图片
      success:(res) => {
        console.log(res.tempFiles)
        that.setData({
          filePath:res.tempFiles[0].tempFilePath
        })
      }
    })
  },

  // 上传文件
  submit(){
    var that =  this 
    var time = utils.formatTime(new Date())
    var name = time.substring(0,10).replaceALL('/','')+time.substring(11)
    wx.uploadFile({
      filePath: 'that.data.filePath',  //本地图片路径
      name: name,  //图片名，作为在后端提取图片文件的key
      url: app.globalData.url+'english/upload_img',  // 后端接口
      formData:{
        name:name,
        id:res.data.task_id
      },
      success:(res) => {
        console.log(res)
        if (res.statusCode==200){
          wx.showToast({
            title: '创建成功',
          })
          setTimeout(function(){
            wx.navigateTo({
              url: '../chooseTasker/chooseTasker?task_id='+id,
            })
          },2000)
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      classID : options.classID
    })
    var QQMapWX = require('../common/sdk/qqmap-wx-jssdk.js');
    var qqmapsdk = new QQMapWX({
      key: 'G2ABZ-IRMKQ-ISN5Y-4ND4S-KBSXQ-HAFLX'
    });
    console.log('signin')
    const _this = this;
    wx.getLocation({
      isHighAccuracy: true,
      type: 'gcj02',
      success: function (res) {
        // console.log("res:"+)
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) { //成功后的回调
            // var addressRes = addressRes.result;
            var addressRes2 = addressRes.result;
            console.log('addressRes2:'+addressRes2)
            var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
            var x = parseFloat(addressRes2.location.lng);
            var y = parseFloat(addressRes2.location.lat);
            var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
            var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
            var lng = z * Math.cos(theta) + 0.0065;
            var lat = z * Math.sin(theta) + 0.006;
            // 获取地区位置
            console.log(lng)
            console.log(lat)
            console.log(addressRes2.address)
            _this.data.QQmapName = addressRes2.address
            console.log('QQmapName:'+_this.data.QQmapName)
            _this.setData({
              QQmapName:addressRes2.address+'医鉴丁楼'
            })
          },
          fail: function (error) {
            console.error(error);
          },
          complete: function (addressRes) {
            console.log(addressRes);
          }
        })
      }
    })

    // 接收页面跳转传参
    console.log(options)
    this.setData({
      faceInfo:options.faceInfo
    })
    
    // wx.showActionSheet({
    //   itemList: ['我是学生', '我是老师'],
    //   success: function (res) {
    //     if (!res.cancel) {
    //       // console.log("选择值:"+res.tapIndex)
    //       if(res.tapIndex==0){
    //         // 在这里确认权限，存入权限代码  权限为0 是学生
    //         wx.setStorageSync('quanxian', res.tapIndex)
    //         wx.navigateTo({
    //           url: '../goentry/goentry',   // 
    //         })
    //       }else if(res.tapIndex == 1){
    //         wx.setStorageSync('quanxian', res.tapIndex)
    //         wx.navigateTo({
    //           url: '../goentry_tea/goentry_tea',   // 
    //         })
    //       }
    //     }
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