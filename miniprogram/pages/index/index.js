// index.js
const app = getApp()

Page({
  data: {
    keyword: '',
    minLikes: 1000,
    maxLikes: 1000000,
    activeTab: 'discover',
    videos: [
      {
        id: 1,
        title: '5个超级简单的家庭健身训练动作，每天10分钟告别拖延症，塑造完美身材！',
        coverUrl: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=600&h=900',
        likes: '25.6万',
        views: '186.2万',
        content: '大家好！今天给大家分享5个超级简单的居家健身动作，不需要任何器械，每天只需10分钟，坚持一个月你就能看到明显变化！第一个动作是改良版俯卧撑，对手臂和胸部有很好的锻炼效果；第二个是平板支撑，能强化你的核心肌群；第三个是深蹲跳，增强下肢力量；第四个是仰卧起坐变式；最后是高抬腿，能帮助你燃烧腹部脂肪。我已经坚持这套动作三个月了，效果超级棒！记得点赞关注，每天分享不同的健身小技巧！'
      },
      {
        id: 2,
        title: '超级省钱的厨房收纳技巧大公开！再也不怕东西太多放不下了！',
        coverUrl: 'https://images.pexels.com/photos/5824877/pexels-photo-5824877.jpeg?auto=compress&cs=tinysrgb&w=600&h=900',
        likes: '13.2万',
        views: '96.5万',
        content: '小厨房也能有大容量！这7个超实用收纳技巧让你的厨房空间立刻扩大一倍，再也不用担心东西放不下了！每个技巧都经过实测，成本不到50元就能搞定！'
      },
      {
        id: 3,
        title: '这个手机摄影技巧让你的照片秒变大片，朋友圈点赞暴涨！',
        coverUrl: 'https://images.pexels.com/photos/3328102/pexels-photo-3328102.jpeg?auto=compress&cs=tinysrgb&w=600&h=900',
        likes: '35.8万',
        views: '212.3万',
        content: '不用花钱买昂贵设备，用这3个简单技巧，立刻提升你的手机摄影水平！第一招构图法则让照片更专业，第二招光线运用创造氛围感，第三招后期调色让照片独具风格。'
      },
      {
        id: 4,
        title: '一天学会Excel高级函数，办公效率提升200%！',
        coverUrl: 'https://images.pexels.com/photos/7235677/pexels-photo-7235677.jpeg?auto=compress&cs=tinysrgb&w=600&h=900',
        likes: '18.7万',
        views: '127.5万',
        content: '这5个Excel函数让你从职场小白变身数据分析高手！VLOOKUP让数据查询不再困难，SUMIFS让条件汇总更精准，IFERROR让错误处理更优雅，透视表让数据展示更直观！'
      },
      {
        id: 5,
        title: '在家也能做出米其林水准的牛排，这个秘诀太绝了！',
        coverUrl: 'https://images.pexels.com/photos/6205791/pexels-photo-6205791.jpeg?auto=compress&cs=tinysrgb&w=600&h=900',
        likes: '32.9万',
        views: '201.7万',
        content: '今天教大家在家做出餐厅级别的完美牛排！选对牛排种类、室温回温30分钟、锅烧热至冒烟、精确控制时间是关键。最重要的是煎完后一定要静置5分钟，让肉汁重新分布。按这个方法做，外焦里嫩，口感超赞！'
      },
      {
        id: 6,
        title: '3个小妙招让你的手机电池续航增加50%！',
        coverUrl: 'https://images.pexels.com/photos/5053740/pexels-photo-5053740.jpeg?auto=compress&cs=tinysrgb&w=600&h=900',
        likes: '41.3万',
        views: '284.6万',
        content: '手机电池总是撑不到一天？试试这3个超实用的省电小技巧！关闭不必要的后台刷新、调整屏幕亮度和使用省电模式是基本操作，但真正厉害的是定期校准电池和清理这些特定应用，立刻让你的电池续航提升一倍！'
      }
    ],
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
              publishTime: this.formatPublishTime(item.publish_time)
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
    
    const date = new Date(timestamp * 1000)
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
  },
  
  // 跳转到AI改写页面
  goToRewrite(e) {
    const video = e.currentTarget.dataset.video
    
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
        
        if (res.data && res.data.success) {
          // 添加内容到视频对象
          video.content = res.data.content
          
          // 导航到改写页面
          wx.navigateTo({
            url: '../rewrite/rewrite',
            success: (result) => {
              // 传递视频数据给改写页面
              result.eventChannel.emit('acceptDataFromOpenerPage', { video: video })
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
