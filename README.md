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