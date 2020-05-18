import express =require('express') ;
import cors=require("cors");
import bodyParser= require("body-parser");
import Utility = require("./Utility/utils");
import { getAllNews, getHotNews, ConsultQuestion, findUsersQuestions } from './Utility/utils';
//lib模块引入
const port = 4003;      // 监听端口
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

app.get('/api/news', (req, res)=>{
  res.json(getAllNews(req.body,res)) 
})
app.get('/api/hot', (req, res)=>{
  res.json(getHotNews(req.body,res)) 
})
app.post('/api/consult', (req, res)=>{
  res.json(ConsultQuestion(req.body,res)) 
})
app.get('/api/question/:User', (req,res)=>{
  res.json(findUsersQuestions(req.User,res))
})
// app.get("/hot", Utility.getHotNews);
// app.get("/consult", Utility.ConsultQuestion);
// app.get("/question/me", Utility.findUsersQuestions);
//listen具体的接口配置
app.listen(port, () => console.log(`serverA start to listen on port[${port}]`));

