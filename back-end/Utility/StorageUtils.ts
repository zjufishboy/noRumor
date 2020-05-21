import DButils from 'mysql'
import { IStatus, StatusDefault, statusFucntion } from '../types/IStatus'
import * as ConfUtility from './ConfUtils'
import { OtherUtility } from './utils'
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
        answer:"answer"
    }
}
//SQL语句
const SQL={
    getHotNews:
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
        (from:number,size:number,uid:number)=>
        `SELECT * 
        FROM ${Conf.database}.${Conf.table.problem},${Conf.database}.${Conf.table.answer} 
        WHERE ${Conf.database}.${Conf.table.problem}.qid=${Conf.database}.${Conf.table.answer}.qid 
        AND ${Conf.database}.${Conf.table.problem}.qid=${uid}
        order by thetime desc 
        limit ${from},${size}`,
    getNewsbyPid:
        (pid:number)=>
        `SELECT * FROM ${Conf.database}.${Conf.table.information} WHERE pid=${pid}`,
    getNewsByConcerned:
        (from:number,size:number)=>
        `SELECT * FROM ${Conf.database}.${Conf.table.information} order by corcern desc limit ${from},${size}`
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

//查询-单独连接模式
//TODO:后期删掉，无用，测试用
const myQuery2=(sql:string,values?:any) => {
    let status:IStatus={...StatusDefault};
    return new Promise((resolve:statusFucntion, reject) =>{
        const db=DButils.createConnection(DBConf)
        if(!db){
            status.status=false;
            status.detail="连接错误"
            resolve(status)
        }
        else{
            db.query(sql,values,(err,rows)=>{
                if(err){
                    status.status=false;
                    status.detail="查询错误"
                    console.log(sql)
                   resolve(status)
                }
                else{
                    if(rows.length==0){
                        status.status=false;
                        status.detail="查无数据"
                        resolve(status)
                    }
                    else{
                        db.end()
                        status.status=true;
                        status.data=rows[0];
                        status.detail="查询成功"
                        resolve(status)
                    }
                }
            })
        }
    })
}


// //CreateQuestion
// //新建提问
// let CreateQuestion = function(value:any){
//     let _sql = "INSERT INTO problem(answer,content,pid,time,uid_o,uid_p) VALUES(?,?,?,?,?,?)";
//     return query(_sql,value)
// }

// //DeleteQuestion
// //删除提问
// let DeleteQuestion = function (value:any) {
//     let _sql = "DELETE FROM problem WHERE (pid)=(?)";
//     return query(_sql,value)
// }

// //findQuestionbyUid
// let findQuestionbyUid = function (value:any) {
//     let _sql = "SELECT * FROM problem WHERE (uid_o)=(?)";
//     return query(_sql,value)
// }

// //findQuestionAll
// let findQuestionAll = function () {
//     let _sql = "SELECT * FROM problem";
//     return query(_sql)
// }

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

// //findQuestionbybyContent
// let findQuestionbyContent = function (value:any) {
//     let _sql = "SELECT * FROM problem where (content)=(?)";
//     return query(_sql,value)
// }

// //findNoticeAll
// let findNoticeAll = function () {
//     let _sql = "SELECT * FROM notice";
//     return query(_sql)
// }

// //findNoticebyGid
// let findNoticebyGid = function (value:any) {
//     let _sql = "SELECT * FROM notice where (gid)=(?)";
//     return query(_sql,value)
// }

// //findNoticebyContent
// let findNoticebyContent = function (value:any) {
//     let _sql = "SELECT * FROM notice where (content)=(?)";
//     return query(_sql,value)
// }

// //CreateNews
// let CreateNews = function (value:any) {
//     let _sql = "INSERT INTO information(concern,content,pid,time,truth,uid) VALUES(?,?,?,?,?,?)";
//     return query(_sql,value)
// }

// //DeleteNews
// let DeleteNews = function (value:any) {
//     let _sql = "DELETE FROM information where (pid)=(?)";
//     return query(_sql,value)
// }

// //findNewsbyUid
// let findNewsbyUid = function (value:any) {
//     let _sql = "SELECT * FROM information where (uid)=(?)";
//     return query(_sql,value)
// }

//findAllNews
export const findAllNews = function (from:number,size:number) {
    let sql = SQL.getAllNews(from,size);
    return myQueryAll(sql);
}

//findNewsbyPid
export const findNewsbyPID = function (pid:number) {
    let sql = SQL.getNewsbyPid(pid)
    return myQuery(sql)
}

//findMostConcerned
export const findMostConcerned = ()=>{
    let sql =SQL.getHotNews; 
    return myQuery(sql);
}

//findNewsByConcerned
export const findNewsByConcerned = (from:number,size:number)=>{
    let sql =SQL.getNewsByConcerned(from,size); 
    return myQueryAll(sql);
}

// //findNewsbyDate
// let findNewsbyDate = function (value:any) {
//     let _sql = "SELECT * FROM information where (time)=(?)";
//     return query(_sql,value)
// }

// //findNewsbyContent
// let findNewsbyContent = function (value:any) {
//     let _sql = "SELECT * FROM information where (content)=(?)";
//     return query(_sql,value)
// }

// //CreateUser
// let CreateUser = function (value:any) {
//     let _sql = "INSERT INTO user(uid,grade,password) VALUES(?,?,?,?,?,?)";
//     return query(_sql,value)
// }

// //DeleteUser
// let DeleteUser = function (value:any) {
//     let _sql = "DELETE FROM user where uid=(?)";
//     return query(_sql,value)
// }

// //ChangeGrade
// let ChangeGrade = function(value:any){
//     let _sql = "UPDATE user set grade=(?) where uid=(?)";
//     return query(_sql,value)
// }

// //ChangePw
// let ChangePw = function(value:any){
//     let _sql = "UPDATE user set password=(?) where uid=(?)";
//     return query(_sql,value)
// }