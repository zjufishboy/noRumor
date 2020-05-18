# noRumor

this is project of 2020.se.zju

这是2020春夏软件工程课设-辟谣平台，仿制腾讯较真平台

## 工作说明

请各自在各自的业务branch下工作，相互之间基本都是解耦的，需要合并时可以pull request到各自的branch。

指路：

- 业务层：调用持久层的函数，返回整合后的数据，主要编辑`./back-end/Utility/NetWorkUtils.ts`和`/back-end/index.ts`;
- 持久层：和数据库交互，提供源数据，主要编辑`./back-end/Utility/DButils.ts`;
- 视图层：前端，主要都在`front-end`下面；

注意：`/back-end/Utility/utils`不要动，这里是负责转发两个后端模块的所有模块用的。所有的后端函数会在这里被整合成一个模块，在`index.ts`被整体调用。

## 工作进展
  
  # NetWorkUtils
    已完成:
    
      首页_最新消息 /api/news
      首页_查询最多话题 /api/hot
      查询页_查询最多话题列表 /api/hotSearchList
      咨询页_用户提交问题 /api/consult
      咨询页_最新提问 /api/question/new
      咨询页_最热提问 /api/question/hot
      咨询页_我的提问 /api/question/me
      
    未完成：
    
      查询页_查询后具体消息 /api/searchResult (待整合)
      咨询页_登陆系统 (待整合)
      公告页_? 
    
   # index.js 除待整合功能已完成
   
## 备注
  ts文件不熟悉，总出错，暂时先上传js文件
      

      
