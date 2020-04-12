import express =require('express') ;
import cors=require("cors");
import bodyParser= require("body-parser");
import Utility = require("./Utility/utils");
//lib模块引入
const port = 4003;
const app = express();
//config配置

//utils工具函数
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.get("/", Utility.apiIndex);
//listen具体的接口配置
app.listen(port, () => console.log(`serverA start to listen on port[${port}]`));