// pages/rewrite/rewrite.js
const app = getApp()

Page({
  data: {
    video: null,
    rewrittenContent: '',
    isRewriting: false,
    contentStyle: 'casual', // 默认休闲风格
    contentLength: 'medium', // 默认适中长度
    rewriteCount: 0 // 记录重写次数
  },

  onLoad: function() {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', (data) => {
      console.log('接收到的视频数据:', data)
      if (data && data.video) {
        this.setData({
          video: data.video
        }, () => {
          console.log('页面数据已更新:', this.data)
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

  // 选择内容风格
  selectContentStyle(e) {
    const style = e.currentTarget.dataset.style
    this.setData({
      contentStyle: style
    })
    console.log('选择内容风格:', style)
    
    // 如果已经有改写内容，提示用户可以点击重新改写
    if (this.data.rewrittenContent) {
      this.showRewriteTip()
    }
  },

  // 选择内容长度
  selectContentLength(e) {
    const length = e.currentTarget.dataset.length
    this.setData({
      contentLength: length
    })
    console.log('选择内容长度:', length)
    
    // 如果已经有改写内容，提示用户可以点击重新改写
    if (this.data.rewrittenContent) {
      this.showRewriteTip()
    }
  },

  // 显示重新改写提示
  showRewriteTip() {
    if (this.data.rewriteCount === 0) {
      wx.showToast({
        title: '点击"重新改写"应用新选项',
        icon: 'none',
        duration: 2000
      })
    }
  },

  // 改写内容
  rewriteContent() {
    if (!this.data.video) {
      wx.showToast({
        title: '视频数据不存在',
        icon: 'none',
        duration: 1500
      })
      return
    }

    if (!this.data.video.content) {
      wx.showToast({
        title: '视频内容不存在',
        icon: 'none',
        duration: 1500
      })
      return
    }

    // 更新重写计数
    const newCount = this.data.rewriteCount + 1
    
    this.setData({
      isRewriting: true,
      rewriteCount: newCount
    })

    wx.showLoading({
      title: 'AI改写中...',
    })

    console.log('开始改写内容:', this.data.video.content)
    console.log('内容风格:', this.data.contentStyle)
    console.log('内容长度:', this.data.contentLength)
    console.log('重写次数:', newCount)

    // 准备用户提示
    let stylePrompt = ''
    switch(this.data.contentStyle) {
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
    switch(this.data.contentLength) {
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

    // 调用自己后端包装的DeepSeek API进行改写
    wx.request({
      url: `${app.globalData.apiBaseUrl}${app.globalData.apiEndpoints.rewriteContent}`,
      method: 'POST',
      data: {
        content: this.data.video.content,
        style: this.data.contentStyle,
        length: this.data.contentLength,
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
          this.setData({
            rewrittenContent: res.data.content
          }, () => {
            console.log('改写内容已更新:', this.data.rewrittenContent)
            
            // 首次改写后的提示
            if (newCount === 1) {
              wx.showToast({
                title: '改写成功！可修改选项后重新改写',
                icon: 'none',
                duration: 2000
              })
            } else {
              wx.showToast({
                title: '重新改写成功',
                icon: 'success',
                duration: 1500
              })
            }
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

    /* 直接调用DeepSeek API的代码参考（服务端实现为佳）
    const deepseekRequest = {
      url: "https://ark.cn-beijing.volces.com/api/v3/chat/completions",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 20f620f8-bbb6-4581-9db3-51b92d80b3d5"
      },
      data: {
        "model": "deepseek-v3-250324",
        "messages": [
          {
            "role": "system", 
            "content": `你是一位专业的短视频文案改写助手。请将用户提供的抖音视频文案改写成${stylePrompt}，${lengthPrompt}。保留原文的核心信息，但使用更吸引人的表达方式。`
          },
          {
            "role": "user", 
            "content": this.data.video.content
          }
        ]
      }
    }
    */
  },

  // 复制改写后的内容
  copyContent() {
    if (!this.data.rewrittenContent) {
      wx.showToast({
        title: '请先改写内容',
        icon: 'none',
        duration: 1500
      })
      return
    }

    wx.setClipboardData({
      data: this.data.rewrittenContent,
      success: () => {
        wx.showToast({
          title: '已复制到剪贴板',
          icon: 'success',
          duration: 1500
        })
      }
    })
  },

  // 保存到历史记录
  saveToHistory() {
    if (!this.data.rewrittenContent || !this.data.video) {
      wx.showToast({
        title: '请先改写内容',
        icon: 'none',
        duration: 1500
      })
      return
    }

    // 创建历史记录对象
    const historyItem = {
      id: Date.now().toString(), // 使用时间戳作为ID
      videoId: this.data.video.id,
      videoTitle: this.data.video.title,
      originalContent: this.data.video.content,
      rewrittenContent: this.data.rewrittenContent,
      coverUrl: this.data.video.coverUrl,
      styleType: this.data.contentStyle,
      lengthType: this.data.contentLength,
      createTime: new Date().getTime()
    }

    // 获取现有的历史记录
    const historyList = wx.getStorageSync('rewriteHistory') || []
    
    // 添加新记录到数组开头（最新的记录显示在前面）
    historyList.unshift(historyItem)
    
    // 限制历史记录数量，最多保存50条
    const limitedHistoryList = historyList.slice(0, 50)
    
    // 保存到本地存储
    wx.setStorageSync('rewriteHistory', limitedHistoryList)
    
    wx.showToast({
      title: '已保存到历史记录',
      icon: 'success',
      duration: 1500
    })
  }
}) 