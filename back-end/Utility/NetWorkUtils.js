const express = require('express')
const dao = require('DButils')
/*
获取热搜问题
req: req
res: IQuestion[] / Feedback
*/
let getHotQuestion = (req,res)=>{
    const data = req.body
    let Ls = []
    let Ms = []
    let Feedback={
        status:"default"
    }

    if(req==null){
        Feedback.status="No Request Received"
        return res.json(Feedback)
    }

    dao.getAllNews('date').then(results=>{
        Ls = results
    },err=>{
        Feedback.status="Getting Data Failed"
        return res.json(Feedback)
    })
    if (Ls.length == 0){
        Feedback.status="No Questions Found"
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
                reply:Ls[iter].reply}
                
                Ms.push(temp)}
        if(Ms.length==0){
            Feedback.status="Push Filed"
            return res.json(Feedback)}
        
        return res.json(Ms)
        }
    }

/*
获取最新问题
req: req.body:date
res: IQuestion[] / Feedback
*/
let getNewQuestion = (req,res)=>{
    const data = req.body
    let Ls=[]
    let Ms=[]
    let Feedback={
        status:"default"}
    if(req==null){
        Feedback.status="No Request"
        return res.json(Feedback)
    }
    dao.getAllNews('date').then((results)=>{
        Ls = results
    },(err)=>{
        Feedback.status="Getting Data Failed"
        return res.json(Feedback)
    })
    if (Ls.length == 0){
        Feedback.status="No Questions Found"
        return res.json(Feedback)}
        //none question}
    else{
        for(let iter=0;iter<Ls.length;iter++){
            let temp = {
            // userAvatar:Ls[0].userAvatar
            userName:Ls[iter].userName,
            //needed?
            time:Ls[iter].time,
            content:Ls[iter].content,
            reply:Ls[iter].reply}
            
            Ms.push(temp)}
        if(Ms.length==0){
            Feedback.status="Push Failed"
            return res.json(Feedback)}
        return res.json(Ms)
        }
    }
/*
获取最新谣言内容
req: req.body:date
res: INews[] / Feedback
*/
let getAllNews = (req,res)=>{
    const data = req.body
    let Ls=[]
    let Ms=[]
    let Feedback={
        status:"default"}
    if(req==null){
        Feedback.status="No Request"
        return res.json(Feedback)
    }
    if(req.body=null){
        Feedback.status = "No Data Received"
        return res.json(Feedback)
    }
    if(data.date==null){
        Feedback.status = "Date Missing"
        return res.json(Feedback)
    }else{
        dao.getAllNews('date').then(results=>{
            Ls = results
        },err=>{
            Feedback.status="Getting Data Failed"
            return res.json(Feedback)
        })
        if (Ls.length == 0){
            Feedback.status="No News Found"
            return res.json(Feedback)}
            //none question}
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
                status:Ls[iter].truth}
                Ms.push(temp)
            }
            if(Ms.length==0){
                Feedback.status="Push Failed"
                return res.json(Feedback)
            }
            return res.json(Ms)
            }
        }
    }
    
/*
获取最新谣言内容
req: req.body:userName
res: IQuestion[] / Feedback
*/
let findUsersQuestions = (req,res)=>{
    const data = req.body
    let Ls=[]
    //QuestionList
    let Ms=[]
    //tempList
    let Feedback={
        status:"default"}
    if(req==null){
        Feedback.status="No Request"
        return res.json(Feedback)}
    if(data.Username == null){
        Feedback.status="Empty User"
        return res.json(Feedback)}
        //cant find user }
    else{
        dao.findQuestionsbyUid(data.userName).then(results=>{
            Ls = results
        },err=>{
            Feedback.status="Getting Failed"
            return res.json(Feedback)
        })
        if (Ls.length == 0){
            Feedback.status="No Question Found"
            return res.json(Feedback)}
            //none question
        else{
            for(let iter=0;iter<Ls.length;iter++){
                let temp = {
                    // userAvatar:Ls[0].userAvatar
                    userName:Ls[iter].userName,
                    //needed?
                    time:Ls[iter].time,
                    content:Ls[iter].content,
                    reply:Ls[iter].reply}
                Ms.push(temp)
                }
            if(Ms.length==0){
                Feedback.status="Push Failed"
                return res.json(Feedback)}
                
                return res.json(Ms)
            }
        }
    }
/*
提交问题
req: req.body:IQuetstion
res: (或者可以返回创建后的id)/Feedback
*/
let ConsultQuestion = (req,res)=>{    
    let CreateSuccess = false
    let NewQue = {
        n_userAvatar: "",
        n_userName: "",
        n_time: "",
        n_content:"",
        n_reply:{ } }
    let Feedback ={
        status:"default"}
            //反馈信息
    if(req==null){
        Feedback.status="No Request"
        return res.json(Feedback)}
    
    if(req.body=null){
    Feedback.status = "No Data Received"
    return res.json(Feedback)}
    
    const data = req.body
        //请求中拿出body数据

    if(!data.userAvatar||!data.userName||!data.time||!data.content){
        Feedback.status = "Attributes Missing"
        return res.json(Feedback)}
        //某一项缺失}
        
    NewQue.n_userAvatar = data.userAvatar
    NewQue.n_userName = data.userName
    NewQue.n_time = data.time
    NewQue.n_content = data.content
        
    if(!data.reply){
             //未回复
        let rep = {
        r_userAvatar:"",
        r_userName:"",
        r_content:"Haven't Got Reply"}
        // CreateSuccess = dao.createNews(rep,NewQue.n_content,n.pid,NewQue.n_time,n.uid_o,n.uid_p)
        dao.createNews(rep,NewQue.n_content,NewQue.n_time,NewQue.n_userName).then(results=>{
            Feedback.status = "Create Done"
            return res.json(Feedback) 
        },err=>{
            Feedback.status = "Create Failed"
            return res.json(Feedback) 
        })
    }
    else{
        let rep = {
        r_userAvatar:data.reply.userAvatar,
        r_userName:data.reply.userName,
        r_content:data.reply.content}
                
        dao.createNews(rep,NewQue.n_content,NewQue.n_time,NewQue.n_userName).then(results=>{
            Feedback.status = "Create Done"
            return res.json(Feedback) 
        },err=>{
            Feedback.status = "Create Failed"
            return res.json(Feedback) 
        })
    }
}

/*
获取热搜
req: req
res: {content, id}/Feedback
*/
let getHotSearch = (req,res)=>{
    let Ms=[]
    let Fs=[]
    let Feedback ={
        status:"default"}
            //反馈信息
    if(req==null){
        Feedback.status="No Request"
        return res.json(Feedback)}
    
    dao.getAllNews('cocern').then(results=>{
        Ms = results
    },err=>{
        Feedback.status="Getting Data Failed"
        return res.json(Feedback)
    })
    for(let iter = 0; iter<Ms.length; iter++){
        if(Ms[iter]==null||Ms[iter].title==null||Ms[iter].id==null){
            Feedback.status="Getting Data Failed"
            return res.json(Feedback)
        }
        let temp = {
            title: Ms[iter].title,
            id: Ms[iter].id
        }
        Fs.push(temp)
    }
    if(Fs.length==0){
        Feedback.status="Empty Fs"
        return res.json(Feedback)
    }
    return res.json(Fs)
}
/*
获取hotsearch关键词
req: req
res: {hotsearchword}/Feedback
*/
let getHotNews = (req,res)=>{
    let Ms=[]
    let Fs=[]
    let Feedback ={
        status:"default"}
            //反馈信息
    if(req==null){
        Feedback.status="No Request"
        return res.json(Feedback)}
    
    if(req.body=null){
    Feedback.status = "No Data Received"
    return res.json(Feedback)}
    
    dao.getAllNews('cocern').then(results=>{
        Ms = results
    },err=>{
        Feedback.status="Getting Data Failed"
        return res.json(Feedback)
    })
    for(let iter = 0; iter<Ms.length; iter++){
        if(Ms[iter].title==null||Ms[iter].id==null){
            Feedback.status="Getting Data Failed"
            return res.json(Feedback)
        }
        let temp = {
            title: Ms[iter].title,
        }
        Fs.push(temp)
    }
    if(Fs.length==0){
        Feedback.status="Empty Fs"
        return res.json(Feedback)
    }
    return res.json(Fs)
}

module.exports = {
    getAllNews,
    getHotNews,
    getHotQuestion,
    getHotSearch,
    getNewQuestion,
    findUsersQuestions,
    ConsultQuestion
}