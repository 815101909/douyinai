// history.js
Page({
  data: {
    historyItems: [
      {
        id: 1,
        title: '告别复杂健身！5个懒人居家运动秘籍，日投10分钟，30天塑造理想体态',
        time: '今天 12:30',
        description: '懒人变身运动达人的秘密来啦！今天为你带来5个零基础、零器械的居家训练动作，每天只占用你10分钟，一个月后绝对让你惊艳自己！',
        likes: '25.6万',
        views: '186.2万',
        coverUrl: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=600&h=900'
      },
      {
        id: 2,
        title: '厨房空间翻倍！7个收纳妙招让小厨房变身收纳天堂',
        time: '昨天 18:15',
        description: '小厨房也能有大容量！这7个超实用收纳技巧让你的厨房空间立刻扩大一倍，再也不用担心东西放不下了！每个技巧都经过实测，成本不到50元就能搞定！',
        likes: '13.2万',
        views: '96.5万',
        coverUrl: 'https://images.pexels.com/photos/5824877/pexels-photo-5824877.jpeg?auto=compress&cs=tinysrgb&w=600&h=900'
      },
      {
        id: 3,
        title: '手机摄影进阶秘诀：3步让你的照片媲美专业相机，朋友圈点赞999+',
        time: '前天 09:45',
        description: '不用花钱买昂贵设备，用这3个简单技巧，立刻提升你的手机摄影水平！第一招构图法则让照片更专业，第二招光线运用创造氛围感，第三招后期调色让照片独具风格。',
        likes: '35.8万',
        views: '212.3万',
        coverUrl: 'https://images.pexels.com/photos/3328102/pexels-photo-3328102.jpeg?auto=compress&cs=tinysrgb&w=600&h=900'
      },
      {
        id: 4,
        title: '一天学会Excel高级函数，办公效率提升200%！',
        time: '5月15日',
        description: '这5个Excel函数让你从职场小白变身数据分析高手！VLOOKUP让数据查询不再困难，SUMIFS让条件汇总更精准，IFERROR让错误处理更优雅，透视表让数据展示更直观！',
        likes: '18.7万',
        views: '127.5万',
        coverUrl: 'https://images.pexels.com/photos/7235677/pexels-photo-7235677.jpeg?auto=compress&cs=tinysrgb&w=600&h=900'
      }
    ]
  },

  onLoad: function () {
    // 页面加载时执行
  },

  // 复制内容
  copyContent: function (e) {
    const item = e.currentTarget.dataset.item;
    wx.setClipboardData({
      data: item.title + '\n' + item.description,
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
    // 这里可以跳转到详情页，暂时用提示代替
    wx.showToast({
      title: '查看详情：' + item.id,
      icon: 'none',
      duration: 2000
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