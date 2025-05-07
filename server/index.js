// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Check if COZE_TOKEN is available
if (!process.env.COZE_TOKEN) {
  console.error('COZE_TOKEN is missing! Please add it to your .env file');
  process.exit(1);
}

// API endpoints
app.post('/api/search-videos', async (req, res) => {
  try {
    const { keyword, minLikes, maxLikes } = req.body;
    
    if (!keyword) {
      return res.status(400).json({ success: false, message: '关键词不能为空' });
    }
    
    console.log(`Searching videos with keyword: ${keyword}, minLikes: ${minLikes}, maxLikes: ${maxLikes}`);
    
    // Call Coze API to get Douyin videos
    const response = await axios.post('https://api.coze.cn/v1/workflow/run', {
      parameters: {
        keyword: keyword,
        minlike: parseInt(minLikes) || 100,
        maxlike: parseInt(maxLikes) || 1000
      },
      workflow_id: "7501322425377570843",
      app_id: "7501292376427282444"
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.COZE_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Coze API Response:', JSON.stringify(response.data, null, 2));
    
    if (response.data && response.data.code === 0) {
      try {
        // First parse the outer JSON string in data
        const parsedData = JSON.parse(response.data.data);
        
        // Then parse the output string which contains the array of videos
        const videos = JSON.parse(parsedData.output);
        
        return res.json({ 
          success: true, 
          videos: videos 
        });
      } catch (parseError) {
        console.error('Error parsing response data:', parseError);
        console.error('Raw data:', response.data.data);
        return res.status(500).json({ 
          success: false, 
          message: '解析视频数据失败',
          error: parseError.message,
          rawData: response.data.data
        });
      }
    } else {
      console.error('Coze API error:', response.data);
      return res.status(response.status || 500).json({ 
        success: false, 
        message: '获取视频数据失败',
        error: response.data
      });
    }
  } catch (error) {
    console.error('Error fetching videos:', error);
    return res.status(500).json({ 
      success: false, 
      message: '服务器错误，请稍后再试',
      error: error.message 
    });
  }
});

// API endpoint to get video content by ID
app.post('/api/video-content', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ success: false, message: '视频链接不能为空' });
    }
    
    console.log(`Fetching content for video: ${url}`);
    
    // Call Coze API to get Douyin video content
    const response = await axios.post('https://api.coze.cn/v1/workflow/run', {
      parameters: {
        url: url
      },
      workflow_id: "7501389927004717092",
      app_id: "7501292376427282444"
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.COZE_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.data && response.data.code === 0) {
      return res.json({ 
        success: true, 
        content: response.data.data.output
      });
    } else {
      return res.status(response.status || 500).json({ 
        success: false, 
        message: '获取视频内容失败',
        error: response.data
      });
    }
  } catch (error) {
    console.error('Error fetching video content:', error);
    return res.status(500).json({ 
      success: false, 
      message: '服务器错误，请稍后再试',
      error: error.message 
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 