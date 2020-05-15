import INews, { } from "../types/INews";
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
export const dao = require('./mysql.js')
export const timeformat = require('silly-datetime')



// export const getAllNews = (req:INews,res:any)=>{
//     let NewsList
//         try{
//             NewsList = dao.findNewsAll('default')}
//         catch(error){
//             console.log("fatal error")
//         }
//         finally{
//             if (NewsList.length==0||typeof(NewsList)=='undefined'){
//                 return res.send('No data received')
//             }
//             else{
//                 return res.send(NewsList)
//             }
//         }
//     }


export const getHotQuestion = (req:any,res:any)=>{
    const data = req.body
    let Ls = []
    let Ms = []
    let Feedback={
        status:"default"
    }
    if(req==null){
        Feedback.status="No request"
        return res.json(Feedback)
    }
        Ls = dao.getAllQuestions("concern")
        if (Ls.length == 0){
            Feedback.status="No Questions found"
            return res.json(Feedback)
            //none question
        }
        else{
            for(let iter=0;iter<Ls.length;iter++){
                let temp = {
                    // userAvatar:Ls[0].userAvatar
                    userName:Ls[iter].userName,
                        //needed?
                    time:Ls[iter].time,
                    content:Ls[iter].content,
                    reply:Ls[iter].reply
                }
                Ms.push(temp)
            }
            if(Ms.length==0){
                Feedback.status="Push failed"
                return res.json(Feedback)
            }
            return res.json(Ms)
        }
    }
    export const getNewQuestion = (req:any,res:any)=>{
        const data = req.body
        let Ls = []
        let Ms = []
        let Feedback={
            status:"default"
        }
        if(req==null){
            Feedback.status="No request"
            return res.json(Feedback)
        }
            Ls = dao.getAllQuestions("date")
            if (Ls.length == 0){
                Feedback.status="No Questions found"
                return res.json(Feedback)
                //none question
            }
            else{
                for(let iter=0;iter<Ls.length;iter++){
                    let temp = {
                        // userAvatar:Ls[0].userAvatar
                        userName:Ls[iter].userName,
                            //needed?
                        time:Ls[iter].time,
                        content:Ls[iter].content,
                        reply:Ls[iter].reply
                    }
                    Ms.push(temp)
                }
                if(Ms.length==0){
                    Feedback.status="Push failed"
                    return res.json(Feedback)
                }
                return res.json(Ms)
            }
        }

    export const getAllNews = (req:any,res:any)=>{
        const data = req.body
        let Ls = []
        let Ms = []
        let Feedback={
            status:"default"
        }
        if(req==null){
            Feedback.status="No request"
            return res.json(Feedback)
        }
        if(req.body=null){
            Feedback.status = "No data received"
            return res.json(Feedback)
        }
        if(data.date==null){
            Feedback.status = "Date missing"
            return res.json(Feedback)
        }else{
            Ls = dao.getAllNews("date")
            if (Ls.length == 0){
                Feedback.status="No News found"
                return res.json(Feedback)
                //none question
            }
            else{
                for(let iter=0;iter<Ls.length;iter++){
                    let temp = {
                        // userAvatar:Ls[0].userAvatar
                        title:Ls[iter].content,
                        //needed?
                        pic:Ls[iter].pic,
                        //数据库内无pic属性，是保存成文件？暂时这么写
                        content:Ls[iter].content,
                        //不获取发布者吗？
                        status:Ls[iter].truth
                    }
                    Ms.push(temp)
                }
                if(Ms.length==0){
                    Feedback.status="Push failed"
                    return res.json(Feedback)
                }
                return res.json(Ms)
            }
            }
        }
    

    export const findUsersQuestions = (req:any,res:any)=>{
        const data = req.body
        let Ls = [ ]
        //QuestionList
        let Ms = [ ]
        //tempList
        let Feedback={
            status:"default"
        }
        if(req==null){
            Feedback.status="No request"
            return res.json(Feedback)
        }
        if(req.body=null){
            Feedback.status = "No data received"
            return res.json(Feedback)
        }
        if(data.userName == null){
            Feedback.status="Empty user"
            return res.json(Feedback)
            //cant find user
        }
        else{
            Ls = dao.findQuestionsbyUid(data.userName)
            if (Ls.length == 0){
                Feedback.status="No Question found"
                return res.json(Feedback)
                //none question
            }
            else{
                for(let iter=0;iter<Ls.length;iter++){
                    let temp = {
                        // userAvatar:Ls[0].userAvatar
                        userName:Ls[iter].userName,
                        //needed?
                        time:Ls[iter].time,
                        content:Ls[iter].content,
                        reply:Ls[iter].reply
                    }
                    Ms.push(temp)
                }
                if(Ms.length==0){
                    Feedback.status="Push failed"
                    return res.json(Feedback)
                }
                return res.json(Ms)
            }
        }
    }

    export const ConsultQuestion = (req:any,res:any)=>{
            
        let CreateSuccess = false
        let NewQue = {
                n_userAvatar: "",
                n_userName: "",
                n_time: "",
                n_content:"",
                n_reply:{ }
            }
            let Feedback ={
                status:"default"
            }
            //反馈信息
            if(req==null){
                Feedback.status="no request"
                return res.json(Feedback)
            }
            if(req.body=null){
                Feedback.status = "No data received"
                return res.json(Feedback)
            }
            const data = req.body
            //请求中拿出body数据

            if(!data.userAvatar||!data.userName||!data.time||!data.content){
                Feedback.status = "attributes missing"
                return res.json(Feedback)
                //某一项缺失
            }
            NewQue.n_userAvatar = data.userAvatar
            NewQue.n_userName = data.userName
            NewQue.n_time = data.time
            NewQue.n_content = data.content

            if(!data.reply){
                //未回复
                let rep = {
                    r_userAvatar:"",
                    r_userName:"",
                    r_content:"haven't got reply"
                }
                // CreateSuccess = dao.createNews(rep,NewQue.n_content,n.pid,NewQue.n_time,n.uid_o,n.uid_p)
                CreateSuccess = dao.createNews(rep,NewQue.n_content,NewQue.n_time,NewQue.n_userName)
                // 
            }else{
                let rep = {
                    r_userAvatar:data.reply.userAvatar,
                    r_userName:data.reply.userName,
                    r_content:data.reply.content
                }
                CreateSuccess = dao.createNews(rep,NewQue.n_content,NewQue.n_time,NewQue.n_userName)

            }
            if (!CreateSuccess){
                Feedback.status = "Create Failed"
                return res.json(Feedback)
            }
            Feedback.status = "Create Success"
            return res.json(Feedback)
    }

