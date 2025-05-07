# 抖音热点搜索后端 API

这是抖音热点搜索与 AI 改写小程序的后端 API 服务。

## 设置

1. 确保已安装 Node.js 和 npm
2. 创建 `.env` 文件并添加你的 COZE API token:
   ```
   COZE_TOKEN=your_coze_api_token_here
   ```
3. 安装依赖:
   ```
   npm install
   ```

## 运行服务器

开发模式:
```
npm run dev
```

生产模式:
```
npm start
```

服务器将在 `http://localhost:3000` 上运行。

## API 端点

### 1. 搜索抖音热门视频

**请求:**
```
POST /api/search-videos
Content-Type: application/json

{
  "keyword": "搜索关键词",
  "minLikes": 100,
  "maxLikes": 1000
}
```

**响应:**
```json
{
  "success": true,
  "videos": [
    {
      "avatar_url": "用户头像URL",
      "follow_cnt": 6,
      "item_cover_url": "视频封面URL",
      "item_duration": 516250,
      "item_id": "7498644350738517302",
      "item_title": "视频标题",
      "like_cnt": 106,
      "nick_name": "用户昵称",
      "play_cnt": 3365,
      "publish_time": 1745914333
    }
  ]
}
```

### 2. 获取视频内容

**请求:**
```
POST /api/video-content
Content-Type: application/json

{
  "url": "https://www.douyin.com/video/7498644350738517302"
}
```

**响应:**
```json
{
  "success": true,
  "content": "视频文案内容"
}
``` 