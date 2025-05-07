// index.js
const app = getApp()

Page({
  data: {
    keyword: '',
    minLikes: 100,
    maxLikes: 1000000,
    activeTab: 'discover',
    videos: [],
    isLoading: false
  },
  
  // 输入事件处理函数
  onKeywordInput(e) {
    this.setData({
      keyword: e.detail.value
    })
  },
  
  onMinLikesInput(e) {
    this.setData({
      minLikes: e.detail.value
    })
  },
  
  onMaxLikesInput(e) {
    this.setData({
      maxLikes: e.detail.value
    })
  },
  
  // 搜索视频
  searchVideos() {
    // 检查关键词是否为空
    if (!this.data.keyword.trim()) {
      wx.showToast({
        title: '请输入关键词',
        icon: 'none',
        duration: 1500
      })
      return
    }

    // 显示加载中提示
    this.setData({
      isLoading: true
    })
    
    wx.showLoading({
      title: '搜索中...',
    })

    // 调用后端API搜索视频
    wx.request({
      url: `${app.globalData.apiBaseUrl}${app.globalData.apiEndpoints.searchVideos}`,
      method: 'POST',
      data: {
        keyword: this.data.keyword,
        minLikes: this.data.minLikes,
        maxLikes: this.data.maxLikes
      },
      success: (res) => {
        wx.hideLoading()
        this.setData({
          isLoading: false
        })
        
        if (res.data && res.data.success) {
          // 处理返回的视频数据
          const videos = res.data.videos.map(item => {
            return {
              id: item.item_id,
              title: item.item_title || '无标题',
              coverUrl: item.item_cover_url,
              likes: this.formatNumber(item.like_cnt),
              views: this.formatNumber(item.play_cnt),
              videoUrl: `https://www.douyin.com/video/${item.item_id}`,
              authorName: item.nick_name,
              authorAvatar: item.avatar_url,
              duration: this.formatDuration(item.item_duration),
              publishTime: this.formatPublishTime(item.publish_time),
              content: item.item_desc || ''
            }
          })
          
          this.setData({ videos })
          
          wx.showToast({
            title: `找到 ${videos.length} 个视频`,
            icon: 'success',
            duration: 1500
          })
        } else {
          wx.showToast({
            title: res.data?.message || '搜索失败',
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail: (err) => {
        console.error('搜索请求失败', err)
        wx.hideLoading()
        this.setData({
          isLoading: false
        })
        
        wx.showToast({
          title: '网络错误，请检查服务器是否运行',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  
  // 格式化数字（例如：1.2万）
  formatNumber(num) {
    if (!num) return '0'
    
    num = parseInt(num)
    if (num >= 10000) {
      return (num / 10000).toFixed(1) + '万'
    }
    return num.toString()
  },
  
  // 格式化视频时长
  formatDuration(duration) {
    if (!duration) return '00:00'
    
    // 毫秒转秒
    const totalSeconds = Math.floor(duration / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  },
  
  // 格式化发布时间
  formatPublishTime(timestamp) {
    if (!timestamp) return '未知时间'
    
    const now = new Date()
    const publishDate = new Date(timestamp * 1000)
    
    // 计算时间差（毫秒）
    const diffMs = now.getTime() - publishDate.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    
    // 1天内显示小时
    if (diffDays < 1) {
      if (diffHours === 0) {
        return '刚刚'
      }
      return `${diffHours}小时前`
    }
    // 3天内显示天数
    else if (diffDays <= 3) {
      return `${diffDays}天前`
    }
    // 超过3天显示具体日期（年-月-日）
    else {
      const year = publishDate.getFullYear()
      const month = (publishDate.getMonth() + 1).toString().padStart(2, '0')
      const day = publishDate.getDate().toString().padStart(2, '0')
      
      // 如果是当年发布的，只显示月-日
      if (year === now.getFullYear()) {
        return `${month}-${day}`
      }
      // 不是当年的，显示完整年-月-日
      return `${year}-${month}-${day}`
    }
  },
  
  // 跳转到AI改写页面
  goToRewrite(e) {
    const video = e.currentTarget.dataset.video
    console.log('准备改写的视频数据:', video)
    
    if (!video || !video.videoUrl) {
      wx.showToast({
        title: '视频数据不完整',
        icon: 'none',
        duration: 1500
      })
      return
    }

    // 先获取视频内容
    wx.showLoading({
      title: '获取视频内容...',
    })
    
    wx.request({
      url: `${app.globalData.apiBaseUrl}${app.globalData.apiEndpoints.videoContent}`,
      method: 'POST',
      data: {
        url: video.videoUrl
      },
      success: (res) => {
        wx.hideLoading()
        console.log('获取视频内容响应:', res.data)
        
        if (res.data && res.data.success) {
          // 添加内容到视频对象
          const videoWithContent = {
            ...video,
            content: res.data.content
          }
          console.log('准备传递的视频数据:', videoWithContent)
          
          // 导航到改写页面
          wx.navigateTo({
            url: '../rewrite/rewrite',
            success: (result) => {
              // 传递视频数据给改写页面
              result.eventChannel.emit('acceptDataFromOpenerPage', { video: videoWithContent })
            },
            fail: (err) => {
              console.error('页面跳转失败:', err)
              wx.showToast({
                title: '页面跳转失败',
                icon: 'none',
                duration: 1500
              })
            }
          })
        } else {
          wx.showToast({
            title: res.data?.message || '获取视频内容失败',
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail: (err) => {
        console.error('获取视频内容失败', err)
        wx.hideLoading()
        
        wx.showToast({
          title: '网络错误，请检查服务器是否运行',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  
  // 切换底部标签
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    
    if (tab === this.data.activeTab) return
    
    this.setData({
      activeTab: tab
    })
    
    if (tab === 'history') {
      wx.switchTab({
        url: '/pages/history/history'
      })
    }
  },
  
  onLoad() {
    // 页面加载时可以执行初始化操作
  }
})
