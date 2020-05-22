/**
 * 这里是接口相关的函数
 * 主要函数形式请写成：
 * export const XXX = (req,res)=>{}
 * 的形式
 * 这里的req是前端发过来的请求，res主要只用res.send(jsonObject)来处理
 * 主要是业务层的工作
 */
import express from 'express';
import cutter from 'nodejieba';
import * as DAO from './StorageUtils'
import { IStatus, StatusDefault, statusFucntion } from '../types/IStatus';
import { OtherUtility, StorageUtility, AuthUtility, NetWorkUtility } from './utils';
import { IQuestion, QuestionDefault, IReply, ReplyDefault } from '../types/IQuestion';
import { IObject } from '../types/IObject';
import {  } from ''
/**
 * 获取token
 */
export const getToken= (req:express.Request,res:express.Response)=>{
    let {authCode}=req.body;
    OtherUtility.myLog(`Token转发请求:${authCode}`)
    AuthUtility.AuthGetToken(authCode)
        .then((result:IStatus)=>{res.send(result)})         
}

/**
 * 获取自己的提问
 */
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

/*
获取最热提问
req: from to
res: IQuestion[]
*/
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

/*
获取首页新闻内容
参数：from,to
返回: INews[]
*/
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

/*
获取首页新闻内容
参数：from,to
返回: INews[]
*/
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
    
/*
获取最新提问内容
参数：from,to
返回: IProblem[]
*/
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

/*
提交问题
req: req.body:IQuetstion
res: (或者可以返回创建后的id)/Feedback
*/
export const ConsultQuestion = (req:express.Request,res:express.Response)=>{    
    //提交新问题
    let NewObject:IQuestion = req.body;
    if( NewObject.qid == 0 || NewObject.thetime == '' || NewObject.questionContent == '' || NewObject.uid == 0){
        OtherUtility.myLog(`提交失败<提交问题>[缺少属性]`);
        res.send("传入对象缺少属性");
    }
    const handleData:statusFucntion=(status:IStatus)=>{
        if(!status.status){
            OtherUtility.myLog(`提交失败<提交问题>[${status.detail}]`);
            res.send(status);
            return;
        }
        else{
            OtherUtility.myLog(`提交成功<提交问题>`);
            OtherUtility.myLog(`问题ID：${status.data?.qid}`);
            res.send(status);
            return;
        }
    }
    DAO.createQuestion(NewObject).then(handleData);
}

/*
搜索问题
req: from,size,(content)
res: ISearchResult/Feedback
*/
export const SearchQuestion = (req:express.Request,res:express.Response)=>{    
    let from=0,size=10;
    if(req.query.from){
        from=parseInt(req.query.from.toString())
    }
    if(req.query.size){
        size=parseInt(req.query.size.toString())
    }
    //提交新问题
    // /ront-end/otherutils.getQueryVariable
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    let Scontent:String = '';
    let Scontent_cut:String[] = []
    for (let i = 0;i < vars.length;i++) {
        let pair = vars[i].split("=");
        if (pair[0] === 'content') {
            Scontent = pair[1];
        }
    }
    Scontent_cut = cutter.cut(Scontent)
    if(Scontent_cut.length == 0){
        OtherUtility.myLog(`搜索失败<搜索问题>[参数获取失败]`);
        res.send("未获取到参数");
    }
    const handleData:statusFucntion=(status:IStatus)=>{
        if(!status.status){
            OtherUtility.myLog(`搜索失败<搜索问题>[${status.detail}]`);
            res.send(status);
            return;
        }
        else{
            OtherUtility.myLog(`搜索成功<搜索问题问题>`);
            OtherUtility.myLog(`问题ID：${status.data?.qid}`);
            res.send(status);
            return;
        }
    }
    DAO.findQuestionbyWordList(from,size,Scontent_cut).then(handleData);
}

/*
获取热搜
req: req
res: {content, id}/Feedback
*/
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



// 获取hotsearch关键词
// req: req
// res: {hotsearchword}/Feedback
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
// req: req
// res: "浙江大学2020软件工程课设-辟谣系统-后端"
export const welcome = (req:express.Request,res:express.Response)=>{
    res.send("浙江大学2020软件工程课设-辟谣系统-后端")
}
