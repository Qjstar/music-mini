// app.js
App({
  //生命周期回调——监听小程序初始化。
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  //生命周期回调——监听小程序启动或切前台。
  onShow (options) {
    // Do something when show.
  },
  //生命周期回调——监听小程序切后台。
  onHide () {
    // Do something when hide.
  },
  //错误监听函数。
  onError (msg) {
    console.log(msg)
  },
  //页面不存在监听函数
  onPageNotFound(){
    console.log("找不到页面")
  },
  globalData: {
    userInfo: "I am global data!"
  }
})
