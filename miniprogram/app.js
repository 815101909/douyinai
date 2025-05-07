// app.js
App({
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
  globalData: {
    userInfo: null,
    apiBaseUrl: 'http://localhost:3000', // 开发环境API地址
    // apiBaseUrl: 'https://yourprodserver.com', // 生产环境API地址
    apiEndpoints: {
      searchVideos: '/api/search-videos',
      videoContent: '/api/video-content'
    }
  }
})
