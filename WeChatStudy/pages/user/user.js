// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userinfo: {},
    isstudent: false,
  },
  onLoad: function () {
    console.log('进入页面加载后：userInfo:'+wx.getStorageSync("userInfo"));
    var that = this;
    that.setData({
      nickName: wx.getStorageSync('unitName'),
      userInfo: wx.getStorageSync('portrait'),
      // isstudent: wx.getStorageSync('quanxian')
      hasUserInfo: true
    })
    
  },

  // 微信用户授权登录
  login_wx(e) {
    var that = this
    var boole = this.data.isfingerPrint
    wx.login({
      success: function (res) {
        let code = res.code;
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session', // 
          data: {
            appid: 'wx4251fd8f4e7853a2',
            secret: '6e571f51293e11f51f5c6194b76edc3b',
            js_code: res.code,
            grant_type: 'authorization_code',
          },
          method: 'GET',  // 如果是POST会跳出弹框询问是否允许授权，但是会报错
          success(res) {
            console.log('openid==', res.data.openid)
            // 本地存储openid
            wx.request({
              url: 'http://127.0.0.1:8000/WX_api/login/',
              data: { openid: res.data.openid },
              method: 'POST',
              success: function (res2) {
                // console.log("返回了："+res2.data.message);
                // 根据让返回值设置跳转页面
                wx.navigateTo({
                  url: '../up_pictrue/up_pictrue',
                })
              },
            })
          }
        })
      },
    })
    //查看支持的生物认证   比如ios的指纹识别   安卓部分机器是不能用指纹识别的
    wx.checkIsSupportSoterAuthentication({
      success(res) {
        for (var i in res.supportMode) {
          if (res.supportMode[i] == 'fingerPrint') {
            console.log("支持指纹识别", res.supportMode[i]);
            wx.startSoterAuthentication({
              requestAuthModes: ['fingerPrint'],
              challenge: '123456',
              authContent: '请用指纹',
              success(res) {
                console.log("识别成功", res);
                wx.showModal({
                  title: "提示",
                  content: "识别成功",
                  showCancel: false,
                  success(res) {
                    if (res.confirm) {
                      getUserMessage();
                    }
                  }
                })
              },
              fail(res) {
                console.log("识别失败", res);
                show("提示", "识别失败", false);
              }
            })
          } else {
            show("提示", "不支持识别", false);
          }
        }
      },
      fail(res) {
        getUserMessage();
        //getOpenId();
        console.log("不支持识别", res);
      }
    })
    wx.getUserProfile({
      desc: '获取用户的信息',
      success: res => {
        console.log("成功授权", res)
        this.setData({
          userInfo: res.userInfo
          // nickName: res.userInfo.nickName,
          // touxian:res.userInfo.avatarUrl
        })
      },
      fail: (err) => {
        console.log("授权失败", err);
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var userInfo = wx.getStorageSync("userInfo");
    console.log(userInfo);
    this.setData({
      userInfo
    })
  },

  //信息完善
  goEntry: function (event) {
    // 演示时只能更改一次身份？ 设个后台管理   0 代表学生权限，1表示教师权限
    if(wx.getStorageSync('quanxian') == 0){
      wx.navigateTo({
        url: '../goentry/goentry',
      })
    } else {
      wx.navigateTo({
        url: '../goentry_tea/goentry_tea',
      })
    }

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

  // 进入人脸识别
  faceClick: function () {
    var quanxian = wx.getStorageSync('quanxian')
    if(quanxian==0){
      this.setData({
        
      })
      wx.navigateTo({
        url: '../faceinfo/faceinfo',  // 
      })
    }
    
  },

  logoff:function(event){
    wx.removeStorageSync('openid');
    wx.removeStorageSync('quanxian')
    // wx.removeStorageSync('')
    wx.removeStorage({
      key: 'logs',
      success: function (res) {
      },
    })

    this.setData({
      userInfo:null,
      hasUserInfo: false,
    })
    
    wx.redirectTo({
      url: '../index/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(wx.getStorageSync('quanxian') == 0){
      console.log("设置学生界面")
      this.setData({
        isstudent: true
      })
    }else{
      console.log("设置教师界面")
      this.setData({
        isstudent: false
      })
    }
  },

})

function getUserMessage() {
  console.log(123)
  // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
  // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  wx.getUserProfile({
    desc: '用于完善资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    success: (res) => {
      const { userInfo } = res;
      console.log(userInfo)
      wx.setStorageSync("userinfo", userInfo);
      // wx.navigateBack({
      //   delta: 1,  // 返回上一级
      //   // data:this.data.openid,
      //   // console.log(data)
      // });
    }
  })
}