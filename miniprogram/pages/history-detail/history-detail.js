// history-detail.js
const app = getApp()

Page({
  data: {
    history: null,
    showRewriteOptions: false,
    rewriteStyle: 'casual',
    rewriteLength: 'medium',
    isRewriting: false,
    newContent: ''
  },

  onLoad: function() {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', (data) => {
      console.log('接收到的历史数据:', data)
      if (data && data.history) {
        this.setData({
          history: data.history
        }, () => {
          console.log('详情页数据已更新:', this.data)
        })
      } else {
        console.error('接收到的数据格式不正确:', data)
        wx.showToast({
          title: '数据加载失败',
          icon: 'none',
          duration: 1500
        })
      }
    })
  },

  // 切换改写选项显示
  toggleRewriteOptions: function() {
    this.setData({
      showRewriteOptions: !this.data.showRewriteOptions
    })
  },

  // 选择改写风格
  selectRewriteStyle: function(e) {
    const style = e.currentTarget.dataset.style
    this.setData({
      rewriteStyle: style
    })
    console.log('选择改写风格:', style)
  },

  // 选择改写长度
  selectRewriteLength: function(e) {
    const length = e.currentTarget.dataset.length
    this.setData({
      rewriteLength: length
    })
    console.log('选择改写长度:', length)
  },

  // 重新改写内容
  rewriteContent: function() {
    if (!this.data.history || !this.data.history.originalContent) {
      wx.showToast({
        title: '无原始内容可改写',
        icon: 'none',
        duration: 1500
      })
      return
    }

    this.setData({
      isRewriting: true
    })

    wx.showLoading({
      title: 'AI改写中...',
    })

    console.log('开始改写内容:', this.data.history.originalContent)
    console.log('内容风格:', this.data.rewriteStyle)
    console.log('内容长度:', this.data.rewriteLength)

    // 准备用户提示
    let stylePrompt = ''
    switch(this.data.rewriteStyle) {
      case 'formal':
        stylePrompt = '正式、庄重的风格'
        break
      case 'casual':
        stylePrompt = '轻松、休闲的风格'
        break
      case 'humorous':
        stylePrompt = '幽默、有趣的风格'
        break
      case 'professional':
        stylePrompt = '专业、行业术语的风格'
        break
      default:
        stylePrompt = '轻松、休闲的风格'
    }

    let lengthPrompt = ''
    switch(this.data.rewriteLength) {
      case 'short':
        lengthPrompt = '简短精炼，大约50-100字'
        break
      case 'medium':
        lengthPrompt = '适中长度，大约100-200字'
        break
      case 'long':
        lengthPrompt = '详细丰富，大约200-300字'
        break
      default:
        lengthPrompt = '适中长度，大约100-200字'
    }

    // 调用API进行改写
    wx.request({
      url: `${app.globalData.apiBaseUrl}${app.globalData.apiEndpoints.rewriteContent}`,
      method: 'POST',
      data: {
        content: this.data.history.originalContent,
        style: this.data.rewriteStyle,
        length: this.data.rewriteLength,
        stylePrompt: stylePrompt,
        lengthPrompt: lengthPrompt
      },
      success: (res) => {
        wx.hideLoading()
        console.log('改写响应:', res.data)
        
        this.setData({
          isRewriting: false
        })

        if (res.data && res.data.success) {
          // 创建新的历史记录对象
          const newHistory = {
            ...this.data.history,
            description: res.data.content,
            styleType: this.getStyleName(this.data.rewriteStyle),
            lengthType: this.getLengthName(this.data.rewriteLength),
            time: this.formatTime(new Date().getTime())
          }
          
          // 更新当前页面数据
          this.setData({
            history: newHistory,
            showRewriteOptions: false
          })
          
          // 保存到历史记录
          this.saveToHistory(res.data.content)
          
          wx.showToast({
            title: '改写成功',
            icon: 'success',
            duration: 1500
          })
        } else {
          wx.showToast({
            title: res.data?.message || '改写失败',
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail: (err) => {
        console.error('改写请求失败', err)
        wx.hideLoading()
        this.setData({
          isRewriting: false
        })

        wx.showToast({
          title: '网络错误，请稍后重试',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  // 保存到历史记录
  saveToHistory: function(newContent) {
    // 获取现有的历史记录
    const historyList = wx.getStorageSync('rewriteHistory') || []
    
    // 创建新记录
    const historyItem = {
      id: Date.now().toString(), // 使用时间戳作为ID
      videoId: this.data.history.videoId,
      videoTitle: this.data.history.title,
      originalContent: this.data.history.originalContent,
      rewrittenContent: newContent,
      coverUrl: this.data.history.coverUrl,
      styleType: this.data.rewriteStyle,
      lengthType: this.data.rewriteLength,
      createTime: new Date().getTime()
    }
    
    // 添加新记录到数组开头（最新的记录显示在前面）
    historyList.unshift(historyItem)
    
    // 限制历史记录数量，最多保存50条
    const limitedHistoryList = historyList.slice(0, 50)
    
    // 保存到本地存储
    wx.setStorageSync('rewriteHistory', limitedHistoryList)
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

  // 复制内容
  copyContent: function() {
    if (!this.data.history || !this.data.history.description) {
      wx.showToast({
        title: '无内容可复制',
        icon: 'none',
        duration: 1500
      })
      return
    }

    wx.setClipboardData({
      data: this.data.history.description,
      success: () => {
        wx.showToast({
          title: '已复制到剪贴板',
          icon: 'success',
          duration: 1500
        })
      }
    })
  },

  // 返回上一页
  goBack: function() {
    wx.navigateBack()
  }
}) 