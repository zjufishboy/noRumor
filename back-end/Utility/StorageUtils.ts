import DButils from 'mysql'
import { IStatus, StatusDefault, statusFucntion } from '../types/IStatus'
import * as ConfUtility from './ConfUtils'
import { IQuestion, IReply } from '../types/IQuestion'
import {INews} from '../types/INews'
import { IUserInfo } from '../types/IUserInfo'
import { OtherUtility } from './utils'
import { IUserAuth } from '../types/IUserAuth'
//DB设置
const DBConf={
    host:     ConfUtility.host,
    user:     ConfUtility.user,
    password: ConfUtility.pass,
    database: ConfUtility.name,
    port:     ConfUtility.port
}
//DB连接池
const pool=DButils.createPool(DBConf)
//数据库配置
const Conf={
    database:"norumor",
    table:{
        information:"information",
        problem:"problem",
        answer:"answer",
        user:"user"
    }
}
//SQL语句
const SQL={
    //获取信息Retrieve
    getHotNews:
        ()=>
        `Select * from ${Conf.database}.${Conf.table.information} order by corcern desc limit 1`,
    getAllNews:
        (from:number,size:number)=>
        `Select * from ${Conf.database}.${Conf.table.information} order by thetime desc limit ${from},${size}`,
    getNewQuestion:
        (from:number,size:number)=>
        `SELECT * FROM ${Conf.database}.${Conf.table.problem}     order by thetime desc limit ${from},${size}`,
    getReplybyQuestion:
        (qid:number)=>
        `SELECT * FROM ${Conf.database}.${Conf.table.answer}      WHERE qid = ${qid}`,
    getQuestionWithReply:
        (from:number,size:number)=>
        `SELECT * 
        FROM ${Conf.database}.${Conf.table.problem},${Conf.database}.${Conf.table.answer} 
        WHERE ${Conf.database}.${Conf.table.problem}.qid=${Conf.database}.${Conf.table.answer}.qid 
        order by thetime desc 
        limit ${from},${size}`,
    getQuestionByUID:
        (from:number,size:number,uid:number)=>`
        SELECT * FROM ${Conf.database}.${Conf.table.problem}  
        WHERE uid=${uid} 
        order by thetime desc limit ${from},${size}`,
    getNewsbyPid:
        (pid:number)=>
        `SELECT * FROM ${Conf.database}.${Conf.table.information} WHERE pid=${pid}`,
    getNewsByConcerned:
        (from:number,size:number)=>
        `SELECT * FROM ${Conf.database}.${Conf.table.information} order by corcern desc limit ${from},${size}`,
    getNewsByTitle:
        (keywords:string[],from:number,size:number)=>`
        SELECT * FROM ${Conf.database}.${Conf.table.information}
        WHERE title REGEXP '${keywords.join('|')}'
        order by corcern desc , thetime desc 
        limit ${from},${size}`,
    getUserAuthByUID:
        (uid:number)=>
        `SELECT * FROM ${Conf.database}.${Conf.table.user} WHERE uid=${uid}`,
    
    //新建Create
    createQuestion:
        (question:IQuestion)=>
        `INSERT INTO ${Conf.database}.${Conf.table.problem}(questionContent,qid,thetime,uid) 
        VALUES('${question.questionContent}',${"NULL"},'${question.thetime}',${question.uid})`,
    createNews:
        (news:INews)=>
        `INSERT INTO ${Conf.database}.${Conf.table.information}(pid,concern,content,thetime,truth,uid,pic,title,subtitle) 
        VALUES(${"NULL"},${0},${news.content},${news.thetime},${news.truth?"TRUE":"FALSE"},
               ${news.pic},${news.uid},${news.title},${news.subtitle})`,
    createReply:
        (reply:IReply,to:number)=>
        `INSERT INTO ${Conf.database}.${Conf.table.answer}(replyContent,pid,qid) 
        VALUES(${reply.replyContent},${"NULL"},${reply.qid})`,
    createUserAuth:
        (user:IUserAuth,title:string)=>
        `INSERT INTO ${Conf.database}.${Conf.table.user}(id,uid,title) 
        VALUES(${"NULL"},${user.uid},${title})`,
    //更新Update
    updateQuestion:
        (question:IQuestion)=>
        `UPDATE ${Conf.database}.${Conf.table.problem} 
        SET questionContent=${question.questionContent} , thetime=${question.thetime} , uid=${question.uid} 
        WHERE qid=${question.qid}`,
    updateNews:
        (news:INews)=>
        `UPDATE ${Conf.database}.${Conf.table.information} 
        SET concern=${news.concern},content=${news.content},thetime=${news.thetime},
            truth=${news.truth?"TRUE":"FALSE"},uid=${news.uid},pic=${news.pic},title=${news.title},subtitle=${news.subtitle}
        WHERE pid=${news.pid}`,
    updateReply://不给修改外键，不然这操作有点窒息，没必要把一个问题的回复移动到另一个问题
        (reply:IReply)=>
        `UPDATE ${Conf.database}.${Conf.table.answer} 
        SET replyContent=${reply.replyContent}
        WHERE pid=${reply.pid}`,
    updateUserAuth:
        (uid:number,title:string)=>
        `UPDATE ${Conf.database}.${Conf.table.user} 
        SET title=${title}
        WHERE uid=${uid}`,
    //删除Delete
    deleteQuestion:
        (qid:number)=>
        `DELETE FROM ${Conf.database}.${Conf.table.problem} WHERE qid=${qid}`,
    deleteNews:
        (pid:number)=>
        `DELETE FROM ${Conf.database}.${Conf.table.information} WHERE pid=${pid}`,
    deleteReply:
        (pid:number)=>
        `DELETE FROM ${Conf.database}.${Conf.table.answer} WHERE pid=${pid}`,
    deleteUserAuth:
        (id:number)=>
        `DELETE FROM ${Conf.database}.${Conf.table.user} WHERE id=${id}`,
    //其他
    clickCorcern:
        (pid:number)=>
        `UPDATE ${Conf.database}.${Conf.table.information} 
        SET corcern = concern+1
        WHERE pid=${pid}`,

}
//查询-连接池模式
const myQuery=(sql:string,values?:any) => {
    let status:IStatus={...StatusDefault};
    return new Promise((resolve:statusFucntion, reject) =>{
        pool.getConnection((err,connection)=>{
            if(err){
                status.status=false;
                status.detail="连接错误"
                resolve(status)
            }
            else{
                connection.query(sql,values,(err,rows)=>{
                    if(err){
                        status.status=false;
                        status.detail="查询错误"
                        resolve(status)
                    }
                    else{
                        if(rows.length==0){
                            status.status=false;
                            status.detail="查无数据"
                            resolve(status)
                        }
                        else{
                            pool.releaseConnection(connection);
                            status.status=true;
                            status.data=rows[0];
                            status.detail="查询成功"
                            resolve(status)
                        }
                    }
                })
            }
        })
    })
}

//查询-连接池-返回数组数据
const myQueryAll=(sql:string,values?:any) => {
    let status:IStatus={...StatusDefault};
    return new Promise((resolve:statusFucntion, reject) =>{
        pool.getConnection((err,connection)=>{
            if(err){
                status.status=false;
                status.detail="连接错误"
                resolve(status)
            }
            else{
                connection.query(sql,values,(err,rows)=>{
                    if(err){
                        status.status=false;
                        status.detail="查询错误"
                        resolve(status)
                    }
                    else{
                        if(rows.length==0){
                            status.status=false;
                            status.detail="查无数据"
                            resolve(status)
                        }
                        else{
                            pool.releaseConnection(connection);
                            status.status=true;
                            status.data=rows;
                            status.detail="查询成功"
                            resolve(status)
                        }
                    }
                })
            }
        })
    })
}
//插入
const myQueryInsert=(sql:string) => {
    let status:IStatus={...StatusDefault};
    return new Promise((resolve:statusFucntion, reject) =>{
        pool.getConnection((err,connection)=>{
            if(err){
                status.status=false;
                status.detail="连接错误"
                resolve(status)
            }
            else{
                connection.query(sql,(err,rows)=>{
                    if(err){
                        status.status=false;
                        status.detail="插入错误";
                        resolve(status);
                    }
                    else{
                        status.status=true;
                        status.detail="插入成功";
                        resolve(status);
                    }
                })
            }
        })
    })
}

//CreateQuestion
//新建提问
export const createQuestion = function(question:IQuestion){
    let sql = SQL.createQuestion(question);
    return myQueryInsert(sql)
}

//DeleteQuestion
//删除提问
export const deleteQuestion = function (qid:number) {
    let sql = SQL.deleteQuestion(qid);
    return myQuery(sql)
}

//UpdateQuestion
//修改提问
export const updateQuestion = function (question:IQuestion) {
    let sql = SQL.updateQuestion(question);
    return myQuery(sql)
}

//CreateNews
//新建新闻
export const createNews = function(news:INews){
    let sql = SQL.createNews(news);
    return myQueryInsert(sql)
}

//DeleteNews
//删除新闻
export const deleteNews = function (pid:number) {
    let sql = SQL.deleteNews(pid);
    return myQuery(sql)
}

//UpdateNews
//修改新闻
export const updateNews = function (news:INews) {
    let sql = SQL.updateNews(news);
    return myQuery(sql)
}

//CreatReply
//新建回复
export const createReply = function(reply:IReply,to:number){
    let sql = SQL.createReply(reply,to);
    return myQueryInsert(sql)
}

//DeleteReply
//删除回复
export const deleteReply = function (pid:number) {
    let sql = SQL.deleteReply(pid);
    return myQuery(sql)
}

//UpdateReply
//修改回复
export const updateReply = function (reply:IReply) {
    let sql = SQL.updateReply(reply);
    return myQuery(sql)
}

//CreatUserAuth
//新建认证
export const createUserAuth = function(user:IUserAuth,title:string){
    let sql = SQL.createUserAuth(user,title);
    return myQueryInsert(sql)
}

//DeleteUserAuth
//删除认证
export const deleteUserAuth = function (id:number) {
    let sql = SQL.deleteUserAuth(id);
    return myQuery(sql)
}

//UpdateReply
//修改回复
export const updateUserAuth = function (user:IUserAuth,title:string) {
    let sql = SQL.updateUserAuth(user.uid,title);
    return myQuery(sql)
}


//findQuestionbyUID
export const findQuestionbyUID = function (from:number,size:number,uid:number) {
    let sql = SQL.getQuestionByUID(from,size,uid) ;
    return myQueryAll(sql);
}

//findQuestionbyDate
export const findQuestionbyDate = function(from:number,size:number) {
    let sql = SQL.getNewQuestion(from,size);
    return myQueryAll(sql);
}

//findReplybyQuestion
export const findReplybyQuestion = function(qid:number) {
    let sql = SQL.getReplybyQuestion(qid);
    return myQuery(sql);
}

//findQuestionWithReply
export const findQuestionWithReply = function(from:number,size:number) {
    let sql = SQL.getQuestionWithReply(from,size);
    return myQueryAll(sql);
}

//findAllNews
export const findAllNews = function (from:number,size:number) {
    let sql = SQL.getAllNews(from,size);
    return myQueryAll(sql);
}

//findNewsbyPid
export const findNewsbyPID = async(pid:number)=>{
    let sql = SQL.getNewsbyPid(pid);
    //TODO:这里其实要先对数据进行一个corcern自增操作，用于表示被点击了
    let res4Clic:IStatus=await clickCorcern(pid);
    if(!res4Clic.status){
        return new Promise((rsv:statusFucntion,rjt)=>{
            res4Clic.detail="点击自增出错"
            rsv(res4Clic);
        })
    }
    else{
        return myQuery(sql);
    }
    
}

//点击量自增
export const clickCorcern=function(pid:number){
    let sql=SQL.clickCorcern(pid);
    return myQuery(sql);
}

//findMostConcerned
export const findMostConcerned = ()=>{
    let sql =SQL.getHotNews(); 
    return myQuery(sql);
}

//findNewsByConcerned
export const findNewsByConcerned = (from:number,size:number)=>{
    let sql =SQL.getNewsByConcerned(from,size); 
    return myQueryAll(sql);
}

//findNewsByTitle
export const findNewsByTitle = (keywords:string[],from:number,size:number)=>{
    let sql =SQL.getNewsByTitle(keywords,from,size); 
    return myQueryAll(sql);
}

export const findUserAuthByUID=(uid:number)=>{
    let sql=SQL.getUserAuthByUID(uid);
    return myQuery(sql);
}