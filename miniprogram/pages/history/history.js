// history.js
Page({
  data: {
    historyItems: []
  },

  onLoad: function () {
    this.loadHistoryData()
  },

  onShow: function() {
    // 每次页面显示时重新加载数据，确保数据是最新的
    this.loadHistoryData()
  },

  // 加载历史数据
  loadHistoryData: function() {
    // 从本地存储获取历史记录
    const historyList = wx.getStorageSync('rewriteHistory') || []
    
    // 格式化数据以适应UI展示
    const formattedHistoryItems = historyList.map(item => {
      return {
        id: item.id,
        title: item.videoTitle,
        time: this.formatTime(item.createTime),
        description: item.rewrittenContent,
        originalContent: item.originalContent,
        coverUrl: item.coverUrl,
        styleType: this.getStyleName(item.styleType),
        lengthType: this.getLengthName(item.lengthType),
        videoId: item.videoId
      }
    })
    
    this.setData({
      historyItems: formattedHistoryItems
    })
  },

  // 格式化时间
  formatTime: function(timestamp) {
    const now = new Date()
    const date = new Date(timestamp)
    const diffDays = Math.floor((now - date) / (24 * 60 * 60 * 1000))
    
    if (diffDays === 0) {
      // 今天
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      return `今天 ${hours}:${minutes}`
    } else if (diffDays === 1) {
      // 昨天
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      return `昨天 ${hours}:${minutes}`
    } else if (diffDays < 7) {
      // 本周
      return `${diffDays}天前`
    } else {
      // 更早
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      return `${month}月${day}日`
    }
  },

  // 获取风格名称
  getStyleName: function(styleType) {
    const styleMap = {
      'formal': '正式',
      'casual': '休闲',
      'humorous': '幽默',
      'professional': '专业'
    }
    return styleMap[styleType] || '休闲'
  },

  // 获取长度名称
  getLengthName: function(lengthType) {
    const lengthMap = {
      'short': '简短',
      'medium': '适中',
      'long': '详细'
    }
    return lengthMap[lengthType] || '适中'
  },

  // 复制内容
  copyContent: function (e) {
    const item = e.currentTarget.dataset.item;
    wx.setClipboardData({
      data: item.description,
      success: function () {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 2000
        });
      }
    });
  },

  // 查看详情
  viewDetail: function (e) {
    const item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../history-detail/history-detail',
      success: (result) => {
        // 传递历史记录数据给详情页面
        result.eventChannel.emit('acceptDataFromOpenerPage', { history: item });
      },
      fail: (err) => {
        console.error('页面跳转失败:', err);
        wx.showToast({
          title: '页面跳转失败',
          icon: 'none',
          duration: 1500
        });
      }
    });
  },

  // 切换标签页
  switchTab: function (e) {
    const tab = e.currentTarget.dataset.tab;
    if (tab === 'discover') {
      wx.switchTab({
        url: '/pages/index/index'
      });
    }
  }
}); 