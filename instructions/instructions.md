# 根据关键词、点赞量批量获取抖音爆款视频
输入:
```bash
curl -X POST 'https://api.coze.cn/v1/workflow/run' \
-H "Authorization: Bearer pat_tCY5qL3qRVUvOByMher9p4zze4mIm0gqmaR3PKY75zEasEZNVNP3pOYQ9UHeGvZc" \
-H "Content-Type: application/json" \
-d '{
  "parameters": {
    "keyword": "cursor",
    "minlike": 100,
    "maxlike": 1000
  },
  "workflow_id": "7501322425377570843",
  "app_id": "7501292376427282444"
}'
```
输出：
```json
{"code":0,"cost":"0","data":"{\"output\":\"[{\\\"avatar_url\\\":\\\"https://p3.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-i-0813c001_ocOM9nAGTBeEAH8VAAIASmzfgnBgmFEDArNCrB.jpeg?from=2956013662\\\",\\\"follow_cnt\\\":6,\\\"item_cover_url\\\":\\\"https://p26-sign.douyinpic.com/tos-cn-i-dy/87191d0d6482478d96b36bd41c062204~tplv-dy-resize-walign-adapt-aq:540:q75.jpeg?lk3s=138a59ce&x-expires=1747767600&x-signature=JDgWk6LY3m9YP3K%2F9Ap79LFb%2BHQ%3D&from=327834062&s=PackSourceEnum_PUBLISH&se=false&sc=cover&biz_tag=aweme_video&l=202505070309015413D313C27BB36AB8AF\\\",\\\"item_duration\\\":516250,\\\"item_id\\\":\\\"7498644350738517302\\\",\\\"item_title\\\":\\\"Cursor官方分享的12个正确用法，10x效率提升 Cursor首席设计师 Ryo Lu 上周发布了一条内容，关于如何正确使用Cursor，一共 12 条方法，可能部分小伙伴已经看过了。\\\\n.\\\\n不过没关系。今天这条视频，除了分享 Ryo Lu 提到的这 12 条方法，还会基于我的Cursor实践对这些方法进行解读，这些方法同样适用于Windsurf、Trae的开发实践。\\\\n.\\\\n#cursor #cursor编辑器 #cursor教程 #AI编程 #AI\\\",\\\"like_cnt\\\":106,\\\"nick_name\\\":\\\"ai呀蔡蔡\\\",\\\"play_cnt\\\":3365,\\\"publish_time\\\":1745914333},{\\\"avatar_url\\\":\\\"https://p3.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-i-c9aec8xkvj_327cc5401a414146abab350d8998854e.jpeg?from=2956013662\\\",\\\"follow_cnt\\\":18,\\\"item_cover_url\\\":\\\"https://p3-sign.douyinpic.com/tos-cn-i-dy/5c2e08f440ba414a8358366195756139~tplv-dy-resize-walign-adapt-aq:540:q75.jpeg?lk3s=138a59ce&x-expires=1747767600&x-signature=FD7ulnKVJN1fPvKqUxG7VgIRd7g%3D&from=327834062&s=PackSourceEnum_PUBLISH&se=false&sc=cover&biz_tag=aweme_video&l=202505070309015413D313C27BB36AB8AF\\\",\\\"item_duration\\\":439034,\\\"item_id\\\":\\\"7481583031111748915\\\",\\\"item_title\\\":\\\"Cursor 10分钟构建产品原型图和 iOS 应用 使用 Cursor 和 Claude3.7 10分钟构建产品原型图和iOS应用，无需写一行代码。#Cursor #Claude……版本过低，升级后可展示全部信息\\\",\\\"like_cnt\\\":101,\\\"nick_name\\\":\\\"马克的技术工作坊\\\",\\\"play_cnt\\\":3806,\\\"publish_time\\\":1741941936}]\"}","debug_url":"https://www.coze.cn/work_flow?execute_id=7501411774518312996&space_id=7395855037996204051&workflow_id=7501322425377570843&execute_mode=2","msg":"Success","token":0}
```
# 2.根据抖音链接获取抖音视频文案
https://www.douyin.com/video/ + 【item-id]

输入：
```bash
curl -X POST 'https://api.coze.cn/v1/workflow/run' \
-H "Authorization: Bearer pat_tCY5qL3qRVUvOByMher9p4zze4mIm0gqmaR3PKY75zEasEZNVNP3pOYQ9UHeGvZc" \
-H "Content-Type: application/json" \
-d '{
  "parameters": {
    "url": "https://www.douyin.com/video/7498644350738517302"
  },
  "workflow_id": "7501389927004717092",
  "app_id": "7501292376427282444"
}'
```
输出
```json
{"code":0,"cost":"0","data":"{\"output\":\"Cursor首席设计师Ryo Lu上周发布了一条内容关于如何正确使用Cursor一共12条方法可能部分小伙伴已经看过了不过没关系今天这条视频除了分享Ryo Lu提到的这12条方法还会基于我的Cursor实践对这些方法进行解读这些方法同样适用于WindServe Tray的开发实践一 在一开始就设定5-10条清晰的项目规则让Cursor了解你的结构和约束尝试为现有代码库执行Generate Rules设定项目规则很重要我之前对比过设定了项目规则,以及没有设定项目规则去推进同一个项目,后者会明显更吃力,因为代码生成更不可控。为什么是5-10条项目规则?我之前分享过一篇文章,主题讲的是Project Rules在实际开发中的三个层级。随着项目壮大,我们已经没法用一条通用的Cursor Rules来跑完整个项目。大家想要更精准地控制代码生成,就需要更细致的项目规则。在Cursor实际开发中,项目规则可以分为三个层级,即通用规则、编程语言规则和框架规则。根据项目类型规模的不同,需要的项目规则数量也会有所区别。如果是全新的项目,建议先从通用规则对应Rule Type的Always开始,也可以在完成项目脚手架后,在Agent模式输入中执行Generate Rules。这里补充一个小的知识点,项目脚手架提供项目初始结构和基础配置,如目录、工具链、依赖等。它的核心是加速启动。2、在提示词中要具体,详细说明技术战,行为和约束,就像一个迷你规范。先给大家看三个提示词案例。案例一,web版限定了这个贪吃蛇游戏的技术战范围,其中尽量不引入web依赖,也降低了依赖的安装。基本就是一个最简单的HTML加CSS加JavaScript的技术战组合。案例二,Chrome浏览器插件类别限定了技术战范围,功能描述则做了进一步的约束。按例3,这是指定特定配置进行Ui优化,同时Ui优化方向进行了约束。大家不难发现,每一轮的提示词对话,其实都是在做一次小的规范。是在user rules,cursor rules,project rules之下的更细颗粒度的一个规范。3,按文件逐个工作,在小块,集中的部分生成,测试和审查。如果只是做功能简单的小项目,那么完全可以用cursor一次性生成全部代码,一般不会有什么大问题。但如果是做功能相较复杂的中大型项目,那么一次性搞定基本是不可能的。之前看过这么一个案案例就是团队用AiID花了3-4个小时完成开发结果花了20小时去研究AI写了什么最后程序也没法运行这种案例并不少见它们的问题其实都很相似就是前期没有做好项目和结构拆解中期任由AiIDE自己去跑代码也不做太多调试和审查到了后期代码就成了一坨改不动也运行不了的这个问题解决起来的核心就是功能模块化然后按逐个模块解决之前在知识星球其实也有提到不要试图让Cursor一次性生成太长的代码不仅上下文扛不住生成的代码也大概率会出问题目前比较好的实践就是让Cursor分批生成怎么分批生成呢先做核心功能核心功能没问题后再分区域分功能一点点来进行补齐关于前期项目和代码结构拆解之前也有一期主题分享这里就不赘述了感兴趣的精神股东可以自行查看四 先写测试 锁定它们然后生成代码 直到所有测试通过由于Agent可能会修改测试文件去让测试通过,所以在测试前建议使用点CursorIgnore功能去防止Agent修改测试文件。CursorIgnore可以在CursorSettings Features Hierarchical CursorIgnore中开启,这个功能主要用于控制CursorIgnore文件的作用范围。它有点类似点GitIgnore,用于指定哪些文件和目录应该被Cursor忽略,也就是不会被Cursor的智能功能如代码补全、文件搜索等处理。对于大型项目,建议启用此选项以便更好的管理忽略规则。可以在不同层级的目录放置Cursor Ignore文件来实现更细力度的控制。5.总是审查AI输出,并对任何错误的内容进行硬修复,然后告诉Cursor将其作为事例使用。Cursor每次给出的代码并不完全都是正确的或符合要求的,所以需要我们进行人工审查。举个最简单的例子,比如你所在企业对代码注释有一定规范,但Cursor每次生成都和这种企业规范有一定差距。这时候你就需要自己按照企业代码注释规范进行调整。当然,你不用每次都手动调整,最方便的方法就是将这种规范作为示例喂给Cursor。这样Cursor就能学会这种示例并应用到下次编程任务中。6、使用addFile,addFolder,addGate,将Cursor的关注点定位到代码库的正确部分。这个功能一般会搭配第三点按模块推进开发一起使用,因为随着项目代码越来越多,我们不可能每次都便利项目文件去做内容调整,一方面受上下文限制,另一方面,便利项目往往会导致Cursor改动一些我们并不希望它改动的代码。所以要善用addFilee, Add Folder, Add Git这些上下文功能,它们相当于一个定位工具实现指哪打哪。7. 将设计文档和检查清单保存在Cursor目录中,以便Agent能够全面了解下一步要做什么。这个目录一般包含项目规则,及第一点提到的Rules,以及各种代码所以,比如这里提到设计文档,检查清单等,都是用于加速AI的代码分析和上下文检索。如果从实现目的看,设计文档和检查清单,都是为了让agent更全面了解当前项目进度和下一步计划,那文件不一定要保存在Cursor目录下。在此之前,我们的一般实践是记录在RedmiMD文件中,每次调整都及时更新这些RedmiMD文件即可,和放在点Cursor斜杠目录下实现的效果都是一样的。8.如果代码错误,就自己写。Cursor从编辑中学习比从解释中学习更快。我个人认为这一点和第五点代码硬修复有点类似。有时候Cursor会在某个问题上反复打转,这时候建议自己动手去做一些代码调整。你的编码内容会成为Cursor自我学习的上下文,相当于成为一种示例,这样Cursor会更清楚自己接下来要做什么。不过这一点对于零编程基础的用户来说会比较难。所以我之前在知识星球都反复提到一个观点,如果你想在AI编程上走得更远,最好懂一点代码知识。你不需要先掌握某种编程语言再入门AI编程,而是在学习AI编程的过程中,在一个个具体的开发场景中,去补齐自己的编程知识。9. 使用聊天历史来迭代旧的提示,而不需要从头开始。之前有小爆童用户问我,AI输出一半时发现他思路跑歪了,这时候要不要stop并继续追加对话?还是不用stop直接进行新的提问,还是stop并重新编辑这个问题进行提问?我当时的回答是,可以继续让他跑下去,根据他的回答再二次追问,调整。在我看来,我们和Cursor或任何一个AI的每一次对话其实都是有用的,无论这次对话Cursor给到的回答是否满意。满意固然很好,不满意的话至少我们知道自己不满意的点在哪,这样下次对话就有了调整的方向。所有的聊天历史都可以成为我们优化提示词的上下文。10、有意选择模型。Remeda用于精确,Cloud用于广布。我之前分享过一篇文章,其中提到AI编程的一个常见使用误区,就是用一个AI模型解决所有事情。与之相对的,正确的使用方法应该是根据不同场景使用不同的模型。当然,每个人的编码体验可能有所差别,比如CJZ认为,使用CloudSonic 3.5进行编码,是的,对于执行代码来说它比3.7更好。使用GPT-O1或GPT-O3 mini-high调试复杂错误,使用Gemini Flash 2.0扫描整个代码库并更新文档,Ryo6认为模型是独一无二的,就像人类一样。Gemini 2.5高级软件工程师需要推动,Cloud 3.7过度思考者热衷于使用工具,需要驯服,Cloud 3.5全能高手依然如此。GPT 4.1或O3,开始意识到编程不仅仅是关于基准测试。我之前在知识星球也分享过类似的观点。Claude 3.7, Thinking, 适合做规划。Claude 3.7, 因为喜欢画蛇天族,适合脑补最佳实践的场景。Claude 3.5, 如果希望AI更好遵循指令,那它会更合适。11, 在新的或不熟悉的技术站中粘贴文档链接,让Cursor逐行解释所有错误和修复。要是放在以前,对于新的或不熟悉的技术站,粘贴文档链接确实是个不错的方法。它其实就是使用AdWeb的联网功能去读取相应的文档链接内容。获取这些最新的文档链接并不难。使用一个小工具,Context7就可以轻松搞定。当你在Context7上获取到最新文档链接后,就可以粘贴到Cursor中进行代码修复。当然,你也可以直接使用Context7 MCP,让Cursor直接调用最新的文档。两种方法都可以降低Cursor的编码换卷。后者的使用方法也很简单,就是在成功安装Context7 MCP后,每次在对话后面加入使用Context7。或者类似的表达,比如使用Context7获取文档即可。12、让大型项目整页索引并限制上下门范围以保持性能敏捷。Cursor有个Code-based indexing 代码库索引功能。由于索引是一个耗时且资源密集的过程,在处理大型项目时,如包含大量文件、数据或内容的系统,可能需要数小时甚至更久。所以会建议在夜间运行索引任务。这是因为夜间系统负载较低,用户活动较少,计算资源更充足,可以避免影响白天的工作效率。在Code-based indexing这里,是可以设置ignore files的。这样,Cursor在索引项目代码时就会忽略这些问题。这就是前面提到的通过限制上下文范围,减少计算资源的消耗,进而降低内存和CPU的使用,从而提高索引或查询的速度。Ryo Lu最后提到,结构和控制是胜利之道,Cursor 12种正确用法的介绍和实践解读就到这里了,希望对大家有启发。我们下期见!\"}","debug_url":"https://www.coze.cn/work_flow?execute_id=7501413548510953512&space_id=7395855037996204051&workflow_id=7501389927004717092&execute_mode=2","msg":"Success","token":0}
```
