var DButils = require('mysql');
var pool=DButils.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'rumor',
    port: 3306
})

let query=function (sql,values) {
    return new Promise((resolve, reject) =>{
        pool.getConnection(function (err,connection) {
            if(err) {
                resolve(err)
            }
            else{
                connection.query(sql,values,(err,rows)=>{
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
        }
    )
}

//CreateQuestion
let CreateQuestion = function(value){
    let _sql = "INSERT INTO problem(answer,content,pid,time,uid_o,uid_p) VALUES(?,?,?,?,?,?)";
    return query(_sql,value)
}

//DeleteQuestion
let DeleteQuestion = function (value) {
    let _sql = "DELETE FROM problem WHERE (pid)=(?)";
    return query(_sql,value)
}

//findQuestionbyUid
let findQuestionbyUid = function (value) {
    let _sql = "SELECT * FROM problem WHERE (uid_o)=(?)";
    return query(_sql,value)
}

//findQuestionAll
let findQuestionAll = function (value) {
    let key=value.toString();
    let _sql = "SELECT * FROM problem order by "+key+" DESC";
    return query(_sql)
}

//findQuestionbyPid
let findQuestionbyPid = function (value) {
    let _sql = "SELECT * FROM problem where (pid)=(?)";
    return query(_sql,value)
}

//findQuestionbyDate
let findQuestionbyDate = function (value) {
    let _sql = "SELECT * FROM problem where (time)=(?)";
    return query(_sql,value)
}

//findQuestionbybyContent
let findQuestionbyContent = function (value) {
    let _sql = "SELECT * FROM problem where (content)=(?)";
    return query(_sql,value)
}
//CreateNotice
let CreateNotice = function(value){
    let _sql = "INSERT INTO notice(content,gid,time,uid) VALUES(?,?,?,?)";
    return query(_sql,value)
}
//DeleteNotice
let DeleteNotice = function(value){
    let _sql = "DELETE FROM notice where (gid)=(?)";
    return query(_sql,value)
}
//findNoticeAll
let findNoticeAll = function (value) {
    let key=value.toString();
    let _sql = "SELECT * FROM notice order by "+key+" DESC";
    return query(_sql)
}

//findNoticebyGid
let findNoticebyGid = function (value) {
    let _sql = "SELECT * FROM notice where (gid)=(?)";
    return query(_sql,value)
}

//findNoticebyContent
let findNoticebyContent = function (value) {
    let _sql = "SELECT * FROM notice where (content)=(?)";
    return query(_sql,value)
}

//CreateNews
let CreateNews = function (value) {
    let _sql = "INSERT INTO information(concern,content,pid,time,truth,uid) VALUES(?,?,?,?,?,?)";
    return query(_sql,value)
}

//DeleteNews
let DeleteNews = function (value) {
    let _sql = "DELETE FROM information where (pid)=(?)";
    return query(_sql,value)
}

//findNewsbyUid
let findNewsbyUid = function (value) {
    let _sql = "SELECT * FROM information where (uid)=(?)";
    return query(_sql,value)
}

//findNewsAll
let findNewsAll = function (value) {
    let key=value.toString();
    let _sql = "SELECT * FROM information order by "+key+" DESC";
    return query(_sql)
}

//findNewsbyPid
let findNewsbyPid = function (value) {
    let _sql = "SELECT * FROM information where (pid)=(?)";
    return query(_sql,value)
}

//findMostConcerned
let findMostConcerned = function () {
    let _sql = "SELECT * FROM information order by concern desc limit 1";
    return query(_sql)
}

//findNewsbyDate
let findNewsbyDate = function (value) {
    let _sql = "SELECT * FROM information where (time)=(?)";
    return query(_sql,value)
}

//findNewsbyContent
let findNewsbyContent = function (value) {
    let _sql = "SELECT * FROM information where (content)=(?)";
    return query(_sql,value)
}

//CreateUser
let CreateUser = function (value) {
    let _sql = "INSERT INTO user(uid,grade,password) VALUES(?,?,?)";
    return query(_sql,value)
}

//DeleteUser
let DeleteUser = function (value) {
    let _sql = "DELETE FROM user where uid=(?)";
    return query(_sql,value)
}

//ChangeGrade
let ChangeGrade = function(value){
    let _sql = "UPDATE user set grade=(?) where uid=(?)";
    return query(_sql,value)
}

//ChangePw
let ChangePw = function(value){
    let _sql = "UPDATE user set password=(?) where uid=(?)";
    return query(_sql,value)
}


module.exports={
    query,
    CreateNews,
    ChangeGrade,
    ChangePw,
    CreateQuestion,
    CreateUser,
    findMostConcerned,
    findNewsAll,
    findNewsbyContent,
    findNewsbyDate,
    findNewsbyPid,
    findNewsbyUid,
    findNoticeAll,
    findNoticebyGid,
    findQuestionbyContent,
    findQuestionbyDate,
    findQuestionbyPid,
    findQuestionbyUid,
    findQuestionAll,
    DeleteNews,
    DeleteQuestion,
    DeleteUser,
    findNoticebyContent,
    CreateNotice,
    DeleteNotice
}