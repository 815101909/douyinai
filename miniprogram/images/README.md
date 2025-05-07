# 微信小程序图标指南

## TabBar 图标要求

微信小程序的 TabBar 图标需要遵循以下要求：

1. **文件格式**: 必须使用 PNG 格式，不支持 SVG
2. **建议尺寸**: 81px × 81px 
3. **每个标签需要两个图标**:
   - 未选中状态图标
   - 选中状态图标（可以是相同图标的不同颜色版本）

## 需要创建的图标

请创建以下 PNG 格式图标：

1. **视频发现 标签**:
   - `video.png`: 未选中状态（灰色，#888888）
   - `video_selected.png`: 选中状态（红色，#ff2c55）

2. **历史记录 标签**:
   - `history.png`: 未选中状态（灰色，#888888）
   - `history_selected.png`: 选中状态（红色，#ff2c55）

## 如何添加到项目

1. 将 PNG 图标放入 `miniprogram/images` 目录
2. 更新 `app.json` 中的 tabBar 配置:

```json
"tabBar": {
  "color": "#888888",
  "selectedColor": "#ff2c55",
  "backgroundColor": "#ffffff",
  "borderStyle": "white",
  "list": [
    {
      "pagePath": "pages/index/index",
      "text": "视频发现",
      "iconPath": "images/video.png",
      "selectedIconPath": "images/video_selected.png"
    },
    {
      "pagePath": "pages/history/history",
      "text": "历史记录",
      "iconPath": "images/history.png",
      "selectedIconPath": "images/history_selected.png"
    }
  ]
}
```

## 图标转换工具

从 SVG 转换为 PNG:
- 在线工具: https://svgtopng.com/
- 桌面软件: Adobe Illustrator, Inkscape, GIMP 等
- 命令行: ImageMagick (`convert input.svg output.png`) 