import DButils from 'mysql'
import { IStatus, StatusDefault, statusFucntion } from '../types/IStatus'
import * as ConfUtility from './ConfUtils'
import { OtherUtility } from './utils'
const DBConf={
    host:     ConfUtility.host,
    user:     ConfUtility.user,
    password: ConfUtility.pass,
    database: ConfUtility.name,
    port:     ConfUtility.port
}
const pool=DButils.createPool(DBConf)


const Conf={
    database:"norumor",
    table:{
        information:"information",
        problem:"problem",
        answer:"answer"
    }
}
const SQL={
    getHotNews:
        `Select * from ${Conf.database}.${Conf.table.information} order by corcern desc limit 1`,
    getAllNews:
        (from:number,size:number)=>
        `Select * from ${Conf.database}.${Conf.table.information} order by thetime desc limit ${from},${size}`,
}

const myQuery=(sql:string,values?:any) => {
    let status:IStatus=StatusDefault;
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
//查询所有数据
const myQueryAll=(sql:string,values?:any) => {
    let status:IStatus=StatusDefault;
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
//单独测试
const myQuery2=(sql:string,values?:any) => {
    let status:IStatus=StatusDefault;
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

// //findQuestionbyPid
// let findQuestionbyPid = function (value:any) {
//     let _sql = "SELECT * FROM problem where (pid)=(?)";
//     return query(_sql,value)
// }

// //findQuestionbyDate
// let findQuestionbyDate = function (value:any) {
//     let _sql = "SELECT * FROM problem where (time)=(?)";
//     return query(_sql,value)
// }

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
    return myQueryAll(sql)
}

// //findNewsbyPid
// let findNewsbyPid = function (value:any) {
//     let _sql = "SELECT * FROM information where (pid)=(?)";
//     return query(_sql,value)
// }

//findMostConcerned
export const findMostConcerned = ()=>{
    let sql =SQL.getHotNews; 
    return myQuery(sql)
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