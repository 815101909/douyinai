# deepseek API
输入
import requests

url = "https://ark.cn-beijing.volces.com/api/v3/chat/completions"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer 20f620f8-bbb6-4581-9db3-51b92d80b3d5"
}
data = {
    "model": "deepseek-v3-250324",
    "messages": [
        {"role": "system", "content": "你是人工智能助手."},
        {"role": "user", "content": "常见的十字花科植物有哪些？"}
    ]
}
resp = requests.post(url, headers=headers, json=data)
print(resp.json())

返回结果：
{'choices': [{'finish_reason': 'stop', 'index': 0, 'logprobs': None, 'message': {'content': '十字花科（Brassicaceae或Cruciferae）植物种类繁多，许多是常见的蔬菜、油料作物或观赏植物。以下是常见的十字花科植物分类及代表物种：\n\n---\n\n### **一、食用类**\n1. **芸薹属（*Brassica*）**  \n   - **白菜类**：大白菜（*B. rapa* var. *pekinensis*）、小白菜（*B. rapa* var. *chinensis*）  \n   - **甘蓝类**：卷心菜（*B. oleracea* var. *capitata*）、花椰菜（*B. oleracea* var. *botrytis*）、西兰花（*B. oleracea* var. *italica*）、羽衣甘蓝（*B. oleracea* var. *acephala*）  \n   - **根茎类**：芜菁（*B. rapa* var. *rapa*）、芥菜头（*B. napus* var. *napobrassica*）  \n   - **油料类**：油菜（*B. napus*、*B. rapa* var. *oleifera*）  \n\n2. **萝卜属（*Raphanus*）**  \n   - 萝卜（*R. sativus*），包括白萝卜、红萝卜、青萝卜等变种。\n\n3. **其他蔬菜**  \n   - 芥 菜（*Brassica juncea*）：叶用芥菜、雪里蕻、榨菜（茎用芥菜）  \n   - 芝麻菜（*Eruca sativa*）  \n   - 荠菜（*Capsella bursa-pastoris*），野生 常见野菜。\n\n---\n\n### **二、油料类**\n1. 欧洲油菜（*Brassica napus*），主要用于榨取菜籽油。  \n2. 芥菜型油菜（*Brassica juncea*），部分地 区种植。  \n\n---\n\n### **三、观赏类**\n1. 紫罗兰（*Matthiola incana*）  \n2. 香雪球（*Lobularia maritima*）  \n3. 桂竹香（*Erysimum cheiri*）  \n\n---\n\n### **四、野生/杂草类**\n1. 独行菜（*Lepidium apetalum*）  \n2. 蔊菜（*Rorippa indica*）  \n3. 播娘蒿（*Descurainia sophia*） ，常见于农田杂草。  \n\n---\n\n### **五、香辛料类**\n1. 辣根（*Armoracia rusticana*），根茎可制调味品。  \n2. 山葵（*Wasabia japonica*），日 本料理常用。  \n\n---\n\n### **特点**  \n十字花科植物共同特征：  \n- **花部结构**：花瓣4枚，呈十字形排列。  \n- **果实**：角果（长角果或短角 果）。  \n- **气味**：多数含硫苷，破碎时有辛辣味（如芥末味）。  \n\n这些植物广泛分布于全球，兼具经济价值和生态价值。', 'role': 'assistant'}}], 'created': 1746602294, 'id': '02174660226058895bc7671c67e27a84f1722655ed44ed1f0014e', 'model': 'deepseek-v3-250324', 'service_tier': 'default', 'object': 'chat.completion', 'usage': {'completion_tokens': 687, 'prompt_tokens': 14, 'total_tokens': 701, 'prompt_tokens_details': {'cached_tokens': 0}, 'completion_tokens_details': {'reasoning_tokens': 0}}}
