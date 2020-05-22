import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import * as Utility  from "./Utility/utils";
//lib模块引入

const port = 4003;      // 监听端口
const app = express();  
const prefix="/rumor";
//config配置

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
//预设配置

app.use(bodyParser.json());
app.get(`${prefix}/`,Utility.NetWorkUtility.welcome);
app.get(`${prefix}/hotNews`,Utility.NetWorkUtility.getHotNews);
app.get(`${prefix}/allNews`,Utility.NetWorkUtility.getAllNews);
app.get(`${prefix}/News/:pid`,Utility.NetWorkUtility.getNewsByPID);
app.get(`${prefix}/newQuestion`,Utility.NetWorkUtility.getNewQuestion);
app.get(`${prefix}/hotQuestion`,Utility.NetWorkUtility.getHotQuestion);
app.post(`${prefix}/myQuestion`,Utility.NetWorkUtility.getMyQuestion);
app.post(`${prefix}/token`,Utility.NetWorkUtility.getToken);
app.get(`${prefix}/hotSearch`,Utility.NetWorkUtility.getHotSearch);

//listen具体的接口配置

app.listen(port, () => console.log(`server[norumor] start to listen on port[${port}]`));
//开始监听