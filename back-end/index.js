const express = require('express');
const ut = require('./Utility/NetWorkUtilsNew')
const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('./'));
app.use(express.json({}));

app.get('/api/news',ut.getAllNews)
// getHotSearch返回[{title, id},.....]
app.get('/api/hot',ut.getHotSearch)
// getHotSearchList返回[{title}]
app.get('/api/hotSearchList',ut.getHotSearchList)
// app.get('/api/notice.....) 公告系统 待整合
// app.get('/api/searchResult',) 待整合
//log and register system 待整合
app.post('/api/consult', ut.ConsultQuestion)
app.get('/api/question/hot', ut.getHotQuestion)
app.get('/api/question/new', ut.getNewQuestion)
app.get('/api/question/me/:username', ut.findUsersQuestions)
