const express = require("express");
const bodyParser = require("body-parser");
const ut = require("./Utility/NetWorkUtils.js");
//lib模块引入
var port = 4003; // 监听端口
const app = express()
//config配置
//utils工具函数
app.use(bodyParser.urlencoded({
    extended: false
}));
// app.use(express.static('./'))
app.use(bodyParser.json());
//listen具体的接口配置
console.log("listeing");
app.listen(port, function () { return console.log("serverA start to listen on port[" + port + "]"); });
app.get('/api/news',ut.getAllNew);
app.get('/api/hot', ut.getHotSearch);
app.get('/api/hotSearchList', ut.getHotSearch);
// app.get('/api/notice.....) 公告系统
// app.get('/api/searchResult',)
//log and register system
// app.post('/api/consult',(req,res)=>{
//     ut.ConsultQuestion(req,res)
// });
app.post('/api/consult',ut.ConsultQuestion)
app.get('/api/question/hot', ut.getHotQuestion);
app.get('/api/question/new', ut.getNewQuestion);
app.get('/api/question/me/:Username', (req,res)=>{
    ut.findUsersQuestions(req,Username,res)
});
