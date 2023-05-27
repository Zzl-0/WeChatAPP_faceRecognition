// index.js
const app = getApp();
Page({
  data: {
    classID:'',
    avatarUrl: '../images/myUser/user_unlogin.png', // 未登录时的状态图片
    userInfo: {}, // 存储用户信息列表
    hasUserInfo: false, 
    logged: false,
    takeSession: false,
    requestResult: '', // 请求结果
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') // 如需尝试获取用户信息可改为false
  },

  onLoad: function () { 

  }, //页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数。
  getUI(e) {    //点击授权登录时产生的监听事件， 后面的是没有的
    var t = this // 定义 变量 t var 可以定义全局变量 let 定义局部变量
    console.log('获取头像昵称', e) // console.log 打印输出
    var that = this
    var boole = this.data.isfingerPrint
    
    wx.getUserProfile({ 
      //获取用户信息。页面产生点击事件（例如 button 上 bindtap 的回调中）后才可调用，每次请求都会弹出授权窗口，用户同意后返回 userInfo,用于替换 wx.getUserInfo
      lang: 'zh_CN', //显示用户信息的语言
      desc: '用于在后台更好的识别您的身份', //声明获取用户个人信息后的用途
      success(res) { //接口调用成功的回调函数
        console.log('获取', res)
        wx.setStorageSync('userInfo', res.userInfo); // userInfo 本地缓存指定的 key  res.userInfo 需要存储的数据
        // wx.setStorageSync('userInfo', res.userInfo); 第一个参数为本地缓存指定的 key 
        // 第二个参数为 res.userInfo 为要需要存储的数据信息 这里要把 res.userInfo 获取到的用户信息列表，存储在userInfo 列表里面
        t.setData({ //对 userInfo 进行数据更改，赋值
          userInfo: res.userInfo, //把获取到的数据列表赋值给 userInfo 改变里面的数据
          avatarUrl: res.userInfo.avatarUrl //把头像地址赋值给 avatarUrl
        }),
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
                console.log("获取的全部信息"+res)
                // console.log("本地缓存的openid："+id)
                console.log('getUI ：openid==', res.data.openid)
                // 成功将openid存入缓存
                wx.setStorageSync('openid', res.data.openid)
                wx.request({
                  // url: 'http://127.0.0.1:8000/WX_api/login/',
                  url: app.globalData.url + 'WX_api/login/',
                  data: { 
                    openid: res.data.openid,
                    // identity: wx.getStorageSync('quanxian')
                  },
                  method: 'POST',
                  success: function (res2) {
                    wx.setStorageSync('userInfoTianXie', res2.data.userInfoTianXie)
                    // console.log("返回了："+res2.data.msg);
                    // if(res2.data.msg == "发送成功"){
                    //   console.log("后端已经添加openid")
                    // }
                    // 2023.4.2 跳转到非tabBer页面  不使用 switchTab ， 切换navigateTo
                    // wx.switchTab({  //跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面 就是首页  
                    wx.navigateTo({
                      url: "/pages/sign/sign",
                    })  //用户授权成功后就要跳转到首页导航栏
                      
                    // }); // 进入到首页后，出现消息提示窗，提示用户:'欢迎使用本小程序'的提示语
                  },
                })
              }
            })
          },
        })
        //查看支持的生物认证   比如ios的指纹识别   安卓部分机器是不能用指纹识别的
        // wx.checkIsSupportSoterAuthentication({
        //   success(res) {
        //     for (var i in res.supportMode) {
        //       if (res.supportMode[i] == 'fingerPrint') {
        //         console.log("支持指纹识别", res.supportMode[i]);
        //         wx.startSoterAuthentication({
        //           requestAuthModes: ['fingerPrint'],
        //           challenge: '123456',
        //           authContent: '请用指纹',
        //           success(res) {
        //             console.log("识别成功", res);
        //             wx.showModal({
        //               title: "提示",
        //               content: "识别成功",
        //               showCancel: false,
        //               success(res) {
        //                 if (res.confirm) {
        //                   getUserMessage();
        //                 }
        //               }
        //             })
        //           },
        //           fail(res) {
        //             console.log("识别失败", res);
        //             show("提示", "识别失败", false);
        //           }
        //         })
        //       } else {
        //         show("提示", "不支持识别", false);
        //       }
        //     }
        //   },
        //   fail(res) {
        //     getUserMessage();
        //     //getOpenId();
        //     console.log("不支持识别", res);
        //   }
        // })

        // 2023.4.2 消息提示应该在进入sign界面设置
        // wx.showToast({ //显示消息提示框
        //   image: "../images/msg/success.png", //自定义图标的本地路径，image 的优先级高于 icon
        //   icon: "success", //显示成功图标，此时 title 文本最多显示 7 个汉字长度
        //   title: '欢迎使用本小程序',
        //   duration: 1000, //提示的延迟时间 为1s 1000ms=1s
        // });

      },
      fail(err) { //接口调用失败的回调函数 用户拒绝授权登录后，出现的提示窗
        console.error(err) //打印输出错误数据
        console.error("123")
        wx.showToast({ // 拒绝登录 显示消息提示框 
          image: "../images/msg/error.png",
          title: '用户拒绝授权', // 提示用户：'用户拒绝授权'
          icon: "error",
          duration: 1000 // 提示语出现时间延迟1s
        });
      }
    })
  },

  // login
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
            wx.request({
              url: 'http://127.0.0.1:8000/WX_api/login/',
              data: { openid: res.data.openid },
              method: 'POST',
              success: function (res2) {
                // console.log("返回了："+res2.data.message);
                // setStorageSync 是同步信息更改的   本地缓存 
                wx.setStorageSync("openid", res.data.openid);
                var id = wx.getStorageInfoSync("openid")
                console.log("本地缓存的openid："+id)
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


  onShow() { //页面显示或从后台跳回小程序时显示此页面时触发，从跳转页面返回时触发，不能传递参数
    this.setData({
      //userInfo: wx.getStorageSync('userInfo') // 更新存储里面的 key ：userInfo

    })
  },
  getUserProfile() {
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({// 更新数据和给字段赋值
          avatarUrl: res.userInfo.avatarUrl,// 更新用户图像列表
          userInfo: res.userInfo,// 更新用户列表列表信息
          hasUserInfo: true,
        })
      }
    })
  },

  onGetUserInfo: function (e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      })
    }
  },
})

function getUserMessage() {
  // console.log(123)
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