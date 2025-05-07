# 抖音热点搜索 + AI 改写文案小程序

这是一个微信小程序，用于搜索抖音热门视频并使用 AI 进行文案内容改写。

## 项目结构

- `miniprogram/`: 微信小程序前端代码
- `server/`: Node.js 后端 API 服务

## 后端设置

1. 进入 server 目录:
   ```
   cd server
   ```

2. 安装依赖:
   ```
   npm install
   ```

3. 创建 `.env` 文件，添加 COZE API Token:
   ```
   COZE_TOKEN=your_coze_api_token_here
   ```

4. 启动服务器:
   ```
   npm run dev
   ```

后端服务器将在 http://localhost:3000 上运行。

## 小程序开发

使用微信开发者工具打开 `miniprogram` 目录。

### 配置

如果你的后端不是运行在 `http://localhost:3000`，请更新 `app.js` 中的 `apiBaseUrl`:

```javascript
globalData: {
  userInfo: null,
  apiBaseUrl: 'http://your-server-url', // 更新为你的服务器地址
  apiEndpoints: {
    searchVideos: '/api/search-videos',
    videoContent: '/api/video-content'
  }
}
```

## 功能

- **搜索页面**: 输入关键词和点赞范围搜索抖音热门视频
- **历史记录**: 查看已搜索过的视频和进行过 AI 改写的内容
- **AI 改写**: 对抖音视频内容进行 AI 改写

## API 端点

- `POST /api/search-videos`: 根据关键词和点赞数搜索抖音视频
- `POST /api/video-content`: 获取指定抖音视频的文案内容 
