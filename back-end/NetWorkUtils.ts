import express from 'express';
import nodejieba from 'nodejieba';
import * as DAO from './StorageUtils'
import { IStatus, StatusDefault, statusFucntion } from '../types/IStatus';
import { OtherUtility, StorageUtility, AuthUtility, NetWorkUtility } from './utils';
import { IQuestion, QuestionDefault, IReply, ReplyDefault } from '../types/IQuestion';
import { IObject } from '../types/IObject';
import { INews } from '../types/INews';
import { IUserInfo } from '../types/IUserInfo';

//获取token
export const getToken= (req:express.Request,res:express.Response)=>{
    let {authCode}=req.body;
    OtherUtility.myLog(`Token转发请求:${authCode}`)
    AuthUtility.AuthGetToken(authCode)
        .then((result:IStatus)=>{res.send(result)})         
}

//获取自己的提问
export const getMyQuestion= async(req:express.Request,res:express.Response)=>{
    let {token,from=0,size=10}=req.body;
    OtherUtility.myLog(`查验Token:${token}`)
    let res4UI= await AuthUtility.AuthGetUserInfo(token)
    if(!res4UI.status){
        OtherUtility.myLog(`查验失败[token无效]`)
        res.send(res4UI);
        return;
    }
    else{
        let uid=parseInt(res4UI.info.data.ID)
        OtherUtility.myLog(`用户ID:${uid}`)
        let res4Question=await StorageUtility.findQuestionbyUID(from,size,uid);
        if(!res4Question.status){
            OtherUtility.myLog(`查询错误<我的提问>[${res4Question.detail}]`)
            res.send(res4Question);
            return;
        }
        else{
            OtherUtility.myLog(`查询成功<我的提问>`)
            OtherUtility.myLog(`新闻数目：${res4Question.data?.length}`)
            let data=res4Question.data?.map(OtherUtility.mapData);
            res4Question.data=data;
            res.send(res4Question);
            return;
        }
    }
}

//获取最热提问
export const getHotQuestion = (req:express.Request,res:express.Response)=>{
    const {from=0,size=10}=req.body;
    
    const handleData:statusFucntion=(status:IStatus)=>{
        if(!status.status){
            OtherUtility.myLog(`查询错误<最热提问>[${status.detail}]`)
            res.send(status);
            return;
        }
        else{
            OtherUtility.myLog(`查询成功<最热提问>`)
            OtherUtility.myLog(`新闻数目：${status.data?.length}`)
            let data=status.data?.map(OtherUtility.mapData);
            status.data=data;
            res.send(status);
            return;
        }
    }
    DAO.findQuestionWithReply(from,size)
        .then(handleData);
}

//获取首页新闻内容
export const getAllNews = (req:express.Request,res:express.Response)=>{
    const {from=0,size=10}=req.body;
    const handleData:statusFucntion=(status:IStatus)=>{
        if(!status.status){
            OtherUtility.myLog(`查询错误<首页新闻>[${status.detail}]`)
            res.send(status);
            return;
        }
        else{
            OtherUtility.myLog(`查询成功<首页新闻>`)
            OtherUtility.myLog(`新闻数目：${status.data?.length}`)
            res.send(status);
            return;
        }
    }
    DAO.findAllNews(from,size)
        .then(handleData)
}

//获取具体新闻内容
export const getNewsByPID = (req:express.Request,res:express.Response)=>{
    const pid=parseInt(req.params.pid);
    const handleData:statusFucntion=(status:IStatus)=>{
        if(!status.status){
            OtherUtility.myLog(`查询错误<新闻${pid}>[${status.detail}]`)
            res.send(status);
            return;
        }
        else{
            OtherUtility.myLog(`查询成功<新闻${pid}>`)
            OtherUtility.myLog(`新闻标题：${status.data?.title}`)
            res.send(status);
            return;
        }
    }
    DAO.findNewsbyPID(pid)
        .then(handleData)
}
    
//获取最新提问内容
export const getNewQuestion = async(req:express.Request,res:express.Response)=>{
    const {from=0,size=10}=req.body;
    let result4Question=await DAO.findQuestionbyDate(from,size);
    //回复映射Promise
    const mapReply=(item:IObject)=>new Promise(async(rsv,rjt)=>{
        let result4reply=await StorageUtility.findReplybyQuestion(item.qid)
        if(result4reply.status){
            item.reply=result4reply.data;
            rsv(item);
        }
        else{
            rsv(item);
        }
    })
    if(!result4Question.status){
        OtherUtility.myLog(`查询错误<最新提问>[${result4Question.detail}]`);
        res.send(result4Question);
        return;
    }
    else{
        OtherUtility.myLog(`查询成功<最新提问>`);
        OtherUtility.myLog(`新闻数目：${result4Question.data?.length}`);
        if(result4Question.data?.length!=undefined){//检测是否是数组
            let data=await Promise.all(result4Question.data.map(mapReply));
            result4Question.data=data;
            res.send(result4Question);
        }
        else{
            OtherUtility.myLog(`格式错误<最新提问>[非数组]`);
            res.send(result4Question);
        }
        return;
    }
}

//新建问题
export const ConsultQuestion = async(req:express.Request,res:express.Response)=>{    
    //提交新问题
    const {content,token}=req.body
    OtherUtility.myLog(`查验Token:${token}`)
    let res4UI= await AuthUtility.AuthGetUserInfo(token)
    if(!res4UI.status){
        OtherUtility.myLog(`查验失败[token无效]`)
        res.send(res4UI);
        return;
    }
    else{
        let uid=parseInt(res4UI.info.data.ID)
        OtherUtility.myLog(`用户ID:${uid}`)
        let newQuestion=OtherUtility.createNewQuestionObject(content,uid);
        let res4Question=await StorageUtility.createQuestion(newQuestion);
        if(!res4Question.status){
            OtherUtility.myLog(`插入错误<提问>[${res4Question.detail}]`)
            res.send(res4Question);
            return;
        }
        else{
            OtherUtility.myLog(`插入成功<提问>`)
            res.send(res4Question);
            return;
        }
    }
}

//////   删除操作  ////////////////////
export const deleteFunction = (mode:string,ids:number,req:express.Request,res:express.Response)=>{
    const handleData:statusFucntion=(status:IStatus)=>{
        if(!status.status){
            OtherUtility.myLog(`删除失败${ids}[${status.detail}]`)
            res.send(status);
            return;
        }
        else{
            OtherUtility.myLog(`删除成功${ids}[${status.detail}]`)
            res.send(status);
            return;
        }
    }
    if(mode=="Question"){DAO.deleteQuestion(ids).then(handleData)}
    if(mode=="News"){DAO.deleteNews(ids).then(handleData)}
    if(mode=="Reply"){DAO.deleteReply(ids).then(handleData)}
    if(mode=="User"){DAO.deleteUserAuth(ids).then(handleData)}
}


export const deleteUsernbyId = (req:express.Request,res:express.Response)=>{
    const id=parseInt(req.params.id);
    deleteFunction("User",id,res,req)
}
export const deleteQuestionbyQid = (req:express.Request,res:express.Response)=>{
    const qid=parseInt(req.params.qid);
    deleteFunction("Question",qid,res,req)
}
export const deleteReplybyPid = (req:express.Request,res:express.Response)=>{
    const pid=parseInt(req.params.pid);
    deleteFunction("Reply",pid,res,req)
}
export const deleteNewsbyPid = (req:express.Request,res:express.Response)=>{
    const pid=parseInt(req.params.pid);
    deleteFunction("News",pid,res,req)
}
/////////////////////////////////////


///////  更新操作  ///////////////////
export const updateFunction = (mode:string,para:any ,req:express.Request,res:express.Response)=>{
    const handleData:statusFucntion=(status:IStatus)=>{
        if(!status.status){
            OtherUtility.myLog(`更新失败[${status.detail}]`)
            res.send(status);
            return;
        }
        else{
            OtherUtility.myLog(`更新成功[${status.detail}]`)
            res.send(status);
            return;
        }
    }
    if(mode=="Question"){DAO.updateQuestion(para).then(handleData)}
    if(mode=="News"){DAO.updateNews(para).then(handleData)}
    if(mode=="Reply"){DAO.updateReply(para).then(handleData)}
    if(mode=="User"){DAO.updateUserAuth(para.user,para.title).then(handleData)}
}

export const UpdateUser = (req:express.Request,res:express.Response)=>{
    const uuser:IUserInfo=req.params.user
    const utitle:string=req.params.title;
    const UObeject = {
        user:uuser,
        title:utitle
    }
    updateFunction("User",UObeject,res,req)
}
export const UpdateQuestion = (req:express.Request,res:express.Response)=>{
    const {uid,qid,thetime,questionContent}=req.params;
    let NewQuestion:IQuestion = {
        uid:uid,
        qid:qid,
        thetime:thetime,
        questionContent:questionContent,
    }
    updateFunction("Question",NewQuestion,res,req)
}
export const UpdateReply = (req:express.Request,res:express.Response)=>{
    const {pid,qid,replyContent}=req.params;
    let NewReply:IReply = {
        pid:pid,
        qid:qid,
        replyContent:replyContent
    }
    updateFunction("Reply",NewReply,res,req)
}
export const UpdateNews = (req:express.Request,res:express.Response)=>{
    const {pid,concern,content,thetime,truth,uid,pic,title,subtitle}=req.params;
    let NewNews:INews = {
        pid:pid,
        concern:concern,
        content:content,
        thetime:thetime,
        truth:truth,
        uid:uid,
        pic:pic,
        title:title,
        subtitle:subtitle
    }
    updateFunction("News",NewNews,res,req)
}
//////////////////////////////////////

//////   创建操作    /////////////////
export const createFunction = (mode:string,para:any ,req:express.Request,res:express.Response)=>{
    const handleData:statusFucntion=(status:IStatus)=>{
        if(!status.status){
            OtherUtility.myLog(`创建失败[${status.detail}]`)
            res.send(status);
            return;
        }
        else{
            OtherUtility.myLog(`创建成功[${status.detail}]`)
            res.send(status);
            return;
        }
    }
    if(mode=="Question"){DAO.createQuestion(para).then(handleData)}
    if(mode=="News"){DAO.createNews(para).then(handleData)}
    if(mode=="Reply"){DAO.createReply(para.rep,para.To).then(handleData)}
    if(mode=="User"){DAO.createUserAuth(para.user,para.title).then(handleData)}
}

export const createUser = (req:express.Request,res:express.Response)=>{
    const uuser:IUserInfo=req.params.user
    const utitle:string=req.params.title;
    const UObeject = {
        user:uuser,
        title:utitle
    }
    createFunction("User",UObeject,res,req)
}
export const createQuestion = (req:express.Request,res:express.Response)=>{
    const {uid,qid,thetime,questionContent}=req.params;
    let NewQuestion:IQuestion = {
        uid:uid,
        qid:qid,
        thetime:thetime,
        questionContent:questionContent,
    }
    createFunction("Question",NewQuestion,res,req)
}
export const createReply = (req:express.Request,res:express.Response)=>{
    const {pid,qid,replyContent,to}=req.params;
    let NewReply:{
        Rep:IReply,
        To:number
    }
    NewReply.Rep = {
        pid:pid,
        qid:qid,
        replyContent:replyContent
    }
    NewReply.To = to
    createFunction("Reply",NewReply,res,req)
}
export const createNews = (req:express.Request,res:express.Response)=>{
    const {pid,concern,content,thetime,truth,uid,pic,title,subtitle}=req.params;
    let NewNews:INews = {
        pid:pid,
        concern:concern,
        content:content,
        thetime:thetime,
        truth:truth,
        uid:uid,
        pic:pic,
        title:title,
        subtitle:subtitle
    }
    createFunction("News",NewNews,res,req)
}

/////////////////////////


//搜索问题
export const SearchQuestion = (req:express.Request,res:express.Response)=>{    
    let from:number=0,size:number=10,word:string="";
    if(req.query.from){
        from=parseInt(req.query.from.toString())
    }
    if(req.query.size){
        size=parseInt(req.query.size.toString())
    }
    if(req.query.word){
        word=req.query.word.toString()
    }

    let keywords=nodejieba.cut(word);
    if(keywords.length == 0){
        let status:IStatus={status:false,detail:"分割结果错误或参数错误"}
        OtherUtility.myLog(`搜索失败<搜索问题>[${status.detail}]`);
        res.send(status);
        return;
    }
    const handleData:statusFucntion=(status:IStatus)=>{
        if(!status.status){
            OtherUtility.myLog(`搜索失败<搜索问题>[${status.detail}]`);
            res.send(status);
            return;
        }
        else{
            OtherUtility.myLog(`搜索成功<搜索问题>`);
            OtherUtility.myLog(`问题数量：${status.data?.length}`);
            res.send(status);
            return;
        }
    }
    DAO.findNewsByTitle(keywords,from,size)
        .then(handleData)
}

//获取热搜
export const getHotSearch = (req:express.Request,res:express.Response)=>{
    let from=0,size=10;
    if(req.query.from){
        from=parseInt(req.query.from.toString())
    }
    if(req.query.size){
        size=parseInt(req.query.size.toString())
    }
    const handleData:statusFucntion=(status:IStatus)=>{
        if(!status.status){
            OtherUtility.myLog(`查询错误<热搜列表>[${status.detail}]`)
            res.send(status);
            return;
        }
        else{
            OtherUtility.myLog(`查询成功<热搜列表>`)
            OtherUtility.myLog(`热搜词：${status.data?.length}`)
            res.send(status);
            return;
        }
    }
    DAO.findNewsByConcerned(from,size)
        .then(handleData)
}

//获取hotsearch关键词
export const getHotNews = (req:express.Request,res:express.Response)=>{
    const handleData:statusFucntion=(status:IStatus)=>{
        if(!status.status){
            OtherUtility.myLog(`查询错误<获取热搜>[${status.detail}]`)
            res.send(status);
            return;
        }
        else{
            OtherUtility.myLog(`查询成功<获取热搜>`)
            OtherUtility.myLog(`热搜词：${status.data?.title}`)
            res.send(status);
            return;
        }
    }
    DAO.findMostConcerned()
        .then(handleData)
}

// 欢迎页面
export const welcome = (req:express.Request,res:express.Response)=>{
    res.send("浙江大学2020软件工程课设-辟谣系统-后端")
}

//TODO:CUD四种资源的接口。