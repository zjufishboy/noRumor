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
export const dao = require('mysql.js')
export const timeformat = require('silly-datetime')



export const getAllNews = (req:INews,res:any)=>{
    let NewsList
        try{
            NewsList = dao.findNewsAll('default')}
        catch(error){
            console.log("fatal error")
        }
        finally{
            if (NewsList.length==0||typeof(NewsList)=='undefined'){
                return res.send('No data received')
            }
            else{
                return res.send(NewsList)
            }
        }
    }


    export const getHotNews = (req:INews,res:any)=>{
        let NewsList
            try{
                NewsList = dao.findNewsAll('concern')}
            catch(error){
                console.log("fatal error")
            }
            finally{
                if (NewsList.length==0||typeof(NewsList)=='undefined'){
                    return res.send('No data received')
                }
                else{
                    return res.send(NewsList)
                }
            }
        }

    export const getLatestNews = (req:INews,res:any)=>{
        let NewsList
            try{
                NewsList = dao.findNewsAll('date')}
            catch(error){
                console.log("fatal error")
            }
            finally{
                if (NewsList.length==0||typeof(NewsList)=='undefined'){
                    return res.send('No data received')
                }
                else{
                    return res.send(NewsList)
                }
            }
        }
    

    export const findUsersQuestions = (req:IQuestion,res:any)=>{
        
        let User = req.userName
        let QuestionList =[]
        let MiddleList: IQuestion[] =[]
        if(User == null){
            return res.send('User doesnt exist!')
            //cant find user
        }
        else{
            QuestionList = dao.findQuestionsbyUid(User)
            if (QuestionList.length == 0){
                return res.send('No questions found!')
                //none question
            }
            else{
                let iter = 0
                for(iter=0;iter<QuestionList.length;iter++){
                    MiddleList[iter].userName = QuestionList[iter].userName
                    MiddleList[iter].time = QuestionList[iter].time
                    MiddleList[iter].content = QuestionList[iter].content
                }
                return res.send(MiddleList)
            }
        }
    }

    // question -> boolean
    export const ConsultQuestion = (req:IQuestion,res:any)=>{
        let CreateDone:boolean
        if (req == null){
            return res.send('Empty Question')
            // null request
        }
        else{
            let n_content = req.content
            let n_time = req.time
            let n_answer = "not answered"
            let n_uid_o = req.userName
            let n_uid_p = null
            let n_pid //
            CreateDone = dao.createNews(n_answer,n_content,n_pid,n_time,n_uid_o,n_uid_p)
            if (CreateDone==true){
                return res.send('Question Created')
            }
            else{
                return res.send('Creating failed')
                //creating failed
            }
            
        }
    }

