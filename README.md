# 抖音热点搜索 + AI 改写文案小程序
## 项目结构

- `miniprogram/`：微信小程序前端代码
- `server/`：Node.js 后端 API 服务

---

## 技术栈

- **前端**：微信小程序原生开发
- **后端**：Node.js + Express
- **AI 改写**：DeepSeek API（大模型文案改写）

---

## 后端设置

1. 进入 server 目录:
   ```bash
   cd server
   ```

2. 安装依赖:
   ```bash
   npm install
   ```

3. 创建 `.env` 文件，添加 COZE API Token:
   ```env
   COZE_TOKEN=your_coze_api_token_here
   ```
   其中文案提取用到的api链接:https://mediahelper.xyz/

4. 启动服务器:
   ```bash
   npm run dev
   ```

后端服务器将在 [http://localhost:3000](http://localhost:3000) 上运行。

---

## 小程序开发

使用微信开发者工具打开 `miniprogram` 目录。

### 配置

如果你的后端不是运行在 `http://localhost:3000`，请更新 `miniprogram/app.js` 中的 `apiBaseUrl`：

```javascript
globalData: {
  userInfo: null,
  apiBaseUrl: 'http://your-server-url', // 更新为你的服务器地址
  apiEndpoints: {
    searchVideos: '/api/search-videos',
    videoContent: '/api/video-content',
    rewriteContent: '/api/rewrite'
  }
}
```

---

## 功能说明

- **搜索页面**：输入关键词和点赞范围，搜索抖音热门视频
- **历史记录**：查看已搜索和改写过的视频内容
- **AI 改写**：对抖音视频文案进行 AI 智能改写，支持风格和长度自定义

---

## AI 改写（DeepSeek API）

- 后端通过 DeepSeek API 实现文案智能改写，支持多种风格和长度选项。
- DeepSeek API 调用示例（见 `server/deepseek_api.js`）：

  ```js
  const response = await axios.post(
    'https://ark.cn-beijing.volces.com/api/v3/chat/completions',
    {
      model: 'deepseek-v3-250324',
      messages: [
        {
          role: 'system',
          content: `你是一位专业的短视频文案改写助手。请将用户提供的抖音视频文案改写成${stylePrompt}，${lengthPrompt}。保留原文的核心信息，但使用更吸引人的表达方式。`
        },
        {
          role: 'user',
          content: content
        }
      ]
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer <你的DeepSeek API Key>`
      }
    }
  );
  ```

- 后端提供 `/api/rewrite` 接口，前端传递原文、风格、长度，返回改写后的文案。

---

## API 端点

<<<<<<< HEAD
- `POST /api/search-videos`: 根据关键词和点赞数搜索抖音视频
- `POST /api/video-content`: 获取指定抖音视频的文案内容 
=======
- `POST /api/search-videos`：根据关键词和点赞数搜索抖音视频
- `POST /api/video-content`：获取指定抖音视频的文案内容
- `POST /api/rewrite`：对视频文案进行 AI 改写（DeepSeek）

---

## 运行效果

1. 用户在小程序首页输入关键词，设置点赞范围，点击搜索。
2. 展示抖音热门视频列表，支持查看详情。
3. 进入详情页或改写页，可选择文案风格和长度，点击"AI改写"按钮，获取智能改写后的文案。
4. 支持将改写内容保存到历史记录，便于后续查看和复制。

---

## 注意事项

- DeepSeek API Key 建议通过环境变量或配置文件管理，避免泄露。
- COZE API 用于抖音视频数据抓取，DeepSeek API 用于文案智能改写。
- 若需部署到生产环境，请将 `apiBaseUrl` 配置为线上服务器地址。

---
>>>>>>> 11414cc (README更新)
