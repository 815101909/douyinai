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