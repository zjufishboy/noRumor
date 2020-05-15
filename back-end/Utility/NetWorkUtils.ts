
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
        if (HotList.length==0){
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

