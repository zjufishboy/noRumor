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
            `SELECT * FROM ${Conf.database}.${Conf.table.information} order by corcern desc limit ${from},${size}`,
    createQuestion:
        (content:string,qid:number,thetime:Date,uid:string)=>
            `INSERT INTO ${Conf.database}.${Conf.table.problem}(content,qid,thetime,uid) VALUES(${content},${qid},${thetime},${uid})`,
    createNews:
        (pid:number,concern:number,content:string,thetime:Date,truth:string,uid:string,pic:string,title:string,subtitle:string)=>
            `INSERT INTO ${Conf.database}.${Conf.table.information}(pid,concern,content,thetime,truth,uid,pic,title,subtitle) VALUES(${pid},${concern},${content},${thetime},${thetime},${truth},${uid},${pic},${title},${subtitle})`,
    //createUser:
    //    (id:number,uid:number,title:string)=>
    //       `INSERT INTO ${Conf.database}.${Conf.table.user}(id,uid,title) VALUES(${id},${uid},${title})`,
    createReply:
        (content:string,pid:number,qid:number)=>
            `INSERT INTO ${Conf.database}.${Conf.table.answer}(content,pid,qid) VALUES(${content},${pid},${qid})`,
    getAll:
        (table:string)=>
            `SELECT * FROM ${Conf.database}.${table}`,
    getAttribute:
        (table:string,key:string)=>
            `SELECT ${key} FROM ${Conf.database}.${table}`,
    deleteAll:
        (table:string)=>
            `DELETE FROM ${Conf.database}.${table}`,
    deleteTuplebyNumber:
        (table:string,key:string,value:number)=>
            `DELETE FROM ${Conf.database}.${table}
            WHERE ${key}=${value}`,
    deleteTuplebyString:
        (table:string,key:string,value:string)=>
            `DELETE FROM ${Conf.database}.${table}
            WHERE ${key}=${value}`,
    deleteTuplebyDate:
        (table:string,key:string,value:Date)=>
            `DELETE FROM ${Conf.database}.${table}
            WHERE ${key}=${value}`,
    getNewsbyTitle:
        (title:string)=>
            `SELECT * FROM ${Conf.database}.${Conf.table.information}
             WHERE title like '%${title}%'
             OR subtitle like '%${title}%'`

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

//插入-连接池
const myInsert=(sql:string,values?:any) => {
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
                        status.detail="插入错误"
                        resolve(status)
                    }
                    else{
                            pool.releaseConnection(connection);
                            status.status=true;
                            status.detail="插入成功"
                            resolve(status)
                    }
                })
            }
        })
    })
}

//删除-连接池
const myDelete=(sql:string,values?:any) => {
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
                        status.detail="删除错误"
                        resolve(status)
                    }
                    else{
                        pool.releaseConnection(connection);
                        status.status=true;
                        status.detail="删除成功"
                        resolve(status)
                    }
                })
            }
        })
    })
}

//更新-连接池
const myUpdate=(sql:string,values?:any) => {
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
                        status.detail="更新错误"
                        resolve(status)
                    }
                    else{
                        pool.releaseConnection(connection);
                        status.status=true;
                        status.detail="更新成功"
                        resolve(status)
                    }
                })
            }
        })
    })
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
export const findNewsbyPID = function (pid:number) {
    let sql = SQL.getNewsbyPid(pid)
    //TODO:这里其实要先对数据进行一个corcern自增操作，用于表示被点击了
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


//TODO:管理功能：CRUD四种数据：user/information[news]/question/answer

//要求：最好能写的浓缩一点，归结一下公共代码，请不要写出同一套代码4*4=16个函数233333

//具体可以参考上面的query写一个myInsert函数。
//TODO:新建提问函数
export const createQuestion = function (content:string,qid:number,thetime:Date,uid:string) {
    let sql=SQL.createQuestion(content,qid,thetime,uid);
    return myInsert(sql);
}

//createUser
//export const createUser = function (id:number,uid:number,title:string) {
//    let sql=SQL.createUser(id,uid,title);
//    return myInsert(sql);
//}

//createNews
export const createNews = function (pid:number,concern:number,content:string,thetime:Date,truth:string,uid:string,pic:string,title:string,subtitle:string) {
    let sql=SQL.createNews(pid,concern,content,thetime,truth,uid,pic,title,subtitle);
    return myInsert(sql);
}

//createReply
export const createReply = function (content:string,pid:number,qid:number) {
    let sql=SQL.createReply(content,pid,qid);
    return myInsert(sql);
}

//getAll
export const getAll = function (table:string) {
    let sql=SQL.getAll(table);
    return myQueryAll(sql);
}

//getAttribute
export const getAttribute = function (table:string,key:string) {
    let sql=SQL.getAttribute(table,key);
    return myQueryAll(sql);
}

//deleteAll
export const deleteAll = function (table:string) {
    let sql=SQL.deleteAll(table);
    return myDelete(sql);
}

//deleteTuplebynumber
export const deleteTuplebyNumber = function (table:string,key:string,value:number) {
    let sql=SQL.deleteTuplebyNumber(table,key,value);
    return myDelete(sql);
}

//deleteTuplebystring
export const deleteTuplebyString = function (table:string,key:string,value:string) {
    let sql=SQL.deleteTuplebyString(table,key,value);
    return myDelete(sql);
}

//deleteTuplebydate
export const deleteTuplebyDate = function (table:string,key:string,value:Date) {
    let sql=SQL.deleteTuplebyDate(table,key,value);
    return myDelete(sql);
}

//getNewsbyTitle
export const getNewsbyTitle = function (title:string) {
    let sql=SQL.getNewsbyTitle(title);
    return myQuery(sql);
}

//Todo
//Update
