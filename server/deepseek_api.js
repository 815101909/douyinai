// server/deepseek_api.js
const axios = require('axios');

// DeepSeek API配置
const DEEPSEEK_API_URL = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions';
const DEEPSEEK_API_KEY = '20f620f8-bbb6-4581-9db3-51b92d80b3d5'; // 实际环境中应使用环境变量
const DEEPSEEK_MODEL = 'deepseek-v3-250324';

/**
 * 调用DeepSeek API进行文本改写
 * @param {string} content - 原始内容
 * @param {string} stylePrompt - 风格提示
 * @param {string} lengthPrompt - 长度提示
 * @returns {Promise<string>} - 改写后的内容
 */
async function rewriteContentWithDeepseek(content, stylePrompt, lengthPrompt) {
  try {
    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: DEEPSEEK_MODEL,
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
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
        }
      }
    );

    // 检查响应
    if (response.data && 
        response.data.choices && 
        response.data.choices.length > 0 && 
        response.data.choices[0].message && 
        response.data.choices[0].message.content) {
      return response.data.choices[0].message.content;
    } else {
      console.error('DeepSeek API 响应格式不正确:', response.data);
      throw new Error('API 响应格式不正确');
    }
  } catch (error) {
    console.error('调用 DeepSeek API 失败:', error);
    throw error;
  }
}

// 示例Express接口实现
function setupRewriteEndpoint(app) {
  app.post('/api/rewrite', async (req, res) => {
    try {
      const { content, stylePrompt, lengthPrompt } = req.body;
      
      if (!content) {
        return res.status(400).json({
          success: false,
          message: '缺少必要的内容参数'
        });
      }

      const rewrittenContent = await rewriteContentWithDeepseek(
        content,
        stylePrompt || '轻松、休闲的风格',
        lengthPrompt || '适中长度，大约100-200字'
      );

      return res.json({
        success: true,
        content: rewrittenContent
      });
    } catch (error) {
      console.error('处理改写请求失败:', error);
      return res.status(500).json({
        success: false,
        message: '服务器处理失败，请稍后重试'
      });
    }
  });
}

module.exports = {
  rewriteContentWithDeepseek,
  setupRewriteEndpoint
}; 