
import { IQuestion } from "../types/IQuestion";
/**
 * 这里是接口相关的函数
 * 主要函数形式请写成：
 * export const XXX = (req,res)=>{}
 * 的形式
 * 这里的req是前端发过来的请求，res主要只用res.send(jsonObject)来处理
 * 主要是业务层的工作
 */
export const request = require('request')
export const express = require('express')
export const dao = require('mysql.js')
export const timeformat = require('silly-datetime')
export const formidable = require("formidable");

const a = express();


export const getAllNews = (req:{},res:any)=>{
        let NewsList = dao.findNewsAll('default')
        if (NewsList.length==0){
            return res.send('-1')
        }
        else{
            return res.send(NewsList)
        }
    }


    export const getHotNews = (req:any,res:any)=>{
        let HotList = dao.findNewsAll('cocern')
        if (HotList==null){
            return res.send('-1')
        }
        else{
            return res.send(HotList)   
        }
    }
    export const getLatestNews = (req:any,res:any)=>{
        let NewsList = dao.findNewsAll('date')
        if (NewsList.length == 0){
            return res.send('-1')
        }
            return res.send(NewsList)   
        }
    

    export const findUsersQuestions = (req:any,res:any)=>{
        
        let User = req.body.userName
        if(User == null){
            return res.send('-1')
            //cant find user
        }
        else{
            let QuestionList = dao.findQuestionsbyUid(User)
            if (QuestionList = null){
                return res.send('-2')
                //none question
            }
            else{
                return res.send(QuestionList)
            }
        }
    }

    // question -> boolean
    export const ConsultQuestion = (req:any,res:any)=>{
        let NewQ = new dao()
        if (req == null){
            return res.send('-1')
            // null request
        }
        else{
            let n_content = req.content
            let n_time = req.time
            let n_answer = "not answered"
            let n_uid_o = req.userName
            let n_uid_p = null
            let n_pid //
            let CreateDone = NewQ.createNews(n_answer,n_content,n_pid,n_time,n_uid_o,n_uid_p)
            if (CreateDone==true){
                return res.send('1')
            }
            else{
                return res.send('-2')
                //creating failed
            }
            
        }
    }

/*
    example:
                userAvatar: 'http://q2.qlogo.cn/headimg_dl?dst_uin=1647075274&spec=100',
                userName: '@cname',
                time: '@DATETIME("yyyy-MM-dd")',
                content: '保定又有新病例了吗',
                reply: {
                    userAvatar: 'http://q2.qlogo.cn/headimg_dl?dst_uin=1647075274&spec=100',
                    userName: '全民较真',
                    content: '你好，《国务院客户端》截止4月18日18时部分地区疫情风险情况，将北京市朝阳区列为高风险地区。',
                },
*/ 

/*               
                title: '组合用羟氯喹阿奇霉素和硫酸锌能有效治疗新冠肺炎 ',
                picture: 'https://p.qpic.cn/jiaozhen/0/fedf2805ba54f963349bd51b4c716d7f/0?imageView2/2/w/150/h/90',
                time: '@DATETIME("yyyy-MM-dd")',
                status: 'false',
                 */
// export const createNews =(req:{},res:JSON)=>{
//     dao.createNews(req,res)
//     res.send
// } 
// export const deleteNews =(req:{},res:JSON)=>{
//     dao.deleteNews(req,res)
// } 
// export const findNewsByUser =(req:{},res:JSON)=>{
//     dao.findNewsByUser(req,res)
// } 
// export const findNewsByDate =(req:{},res:JSON)=>{
//     dao.findNewsByDate(req,res)
// } 
// export const findQuestionsByUser=()=>{}
// export const findQuestionsByDate=()=>{}

// export const getAllNews=()=>{
//     dao.getAllNews()
// }
// export const getAllQuestions=()=>{}
// export const 
/**
 * 关于接口的使用，可以看到上面这个箭头函数的例子里，
 * 参数后面有一个对象来表示这个对象具体的内容，
 * 因为js是弱类型语言，而ts是强类型语言，
 * 我们在这种调用的时候需要写入接口来表示数据格式。
 * 具体的数据接口应该写到types文件夹下，
 * 并且保证前端和后端使用同一套接口
 */