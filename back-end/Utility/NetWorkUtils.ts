import express from 'express';
import nodejieba from 'nodejieba';
import * as DAO from './StorageUtils'
import { IStatus, StatusDefault, statusFucntion } from '../types/IStatus';
import { OtherUtility, StorageUtility, AuthUtility, NetWorkUtility } from './utils';
import { IQuestion, QuestionDefault, IReply, ReplyDefault } from '../types/IQuestion';
import { IObject } from '../types/IObject';

//获取token
export const getToken= (req:express.Request,res:express.Response)=>{
    let {authCode}=req.body;
    OtherUtility.myLog(`Token转发请求:${authCode}`)
    AuthUtility.AuthGetToken(authCode)
        .then((result:IStatus)=>{res.send(result)})         
}

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
        let result4Question=await DAO.findQuestionbyUID(from,size,uid);
        if(!result4Question.status){
            OtherUtility.myLog(`查询错误<我的提问>[${result4Question.detail}]`);
            res.send(result4Question);
            return;
        }
        else{
            OtherUtility.myLog(`查询成功<我的提问>`);
            OtherUtility.myLog(`新闻数目：${result4Question.data?.length}`);
            if(result4Question.data?.length!=undefined){//检测是否是数组
                let data=await Promise.all(result4Question.data.map(mapReply));
                result4Question.data=data;
                res.send(result4Question);
            }
            else{
                OtherUtility.myLog(`格式错误<我的提问>[非数组]`);
                res.send(result4Question);
            }
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
    const from=req.query.from?parseInt(req.query.from.toString()):0;
    const size=req.query.size?parseInt(req.query.size.toString()):10;
    console.log(from,size);
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
//获取具体提问内容
export const getQuestionByQID = async(req:express.Request,res:express.Response)=>{
    const qid=parseInt(req.params.qid);
    let result4Question=await DAO.findQuestionByQID(qid);
    if(!result4Question.status){
        OtherUtility.myLog(`查询错误<ID提问>[${result4Question.detail}]`);
        res.send(result4Question);
        return;
    }
    else{
        OtherUtility.myLog(`查询成功<ID提问>`);
        if(result4Question.data){
            let data:any=await mapReply(result4Question.data);
            result4Question.data=data;
            res.send(result4Question);
        }
        else{
            OtherUtility.myLog(`数据错误<ID提问>[成功但无数据]`);
            res.send(result4Question);
        }
        return;
    }
}
    
//获取最新提问内容
export const getNewQuestion = async(req:express.Request,res:express.Response)=>{
    const {from=0,size=10}=req.body;
    let result4Question=await DAO.findQuestionbyDate(from,size);
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
    addQuestion(req,res);
}

//搜索问题
export const SearchQuestion = (req:express.Request,res:express.Response)=>{    
    let from:number=0,size:number=10,word:string="";
    if(req.query.from){
        from=parseInt(req.query.from.toString())
    }
    if(req.query.size){
        size=parseInt(req.query.size.toString())
    }
    if(req.params.word){
        word=req.params.word.toString()
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
export const addNews=async(req:express.Request,res:express.Response)=>{
    const {content,token,truth,pic,title,subtitle}=req.body
    OtherUtility.myLog(`查验Token:${token}`)
    let res4UI= await AuthUtility.AuthGetUserInfo(token)
    if(!res4UI.status){
        OtherUtility.myLog(`查验失败[token无效]`)
        res.send(res4UI);
        return;
    }
    else{
        let uid=parseInt(res4UI.info.data.ID)
        let result4User=await StorageUtility.findUserAuthByUID(uid);
        if(result4User.status){
            OtherUtility.myLog(`[用户${uid}][认证用户][专家发布新闻信息]`)
            let newNews=OtherUtility.createNewNewsObject(content,uid,truth,pic,title,subtitle)
            let result=await StorageUtility.createNews(newNews);
            if(!result.status){
                OtherUtility.myLog(`插入错误<新闻>[${result.detail}]`)
                res.send(result);
                return;
            }
            else{
                OtherUtility.myLog(`插入成功<新闻>`)
                res.send(result);
                return;
            }
        }
        else{
            OtherUtility.myLog(`权限无效[用户${uid}非认证用户]`)
            result4User.detail="无权限";
            res.send(result4User);
            return;
        }
    } 
}
export const addQuestion=async(req:express.Request,res:express.Response)=>{
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
        OtherUtility.myLog(newQuestion)
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
export const addReply=async(req:express.Request,res:express.Response)=>{
    const {content,token,qid}=req.body
    OtherUtility.myLog(`查验Token:${token}`)
    let res4UI= await AuthUtility.AuthGetUserInfo(token)
    if(!res4UI.status){
        OtherUtility.myLog(`查验失败[token无效]`)
        res.send(res4UI);
        return;
    }
    else{
        let uid=parseInt(res4UI.info.data.ID)
        let result4User=await StorageUtility.findUserAuthByUID(uid);
        if(result4User.status){
            OtherUtility.myLog(`[用户${uid}][认证用户]`)
            if(result4User.data?.title==="超级管理员"){
                OtherUtility.myLog(`[用户${uid}][认证用户][超管有权修改]`)
                let newReply=OtherUtility.createNewReplyObject(content,qid);
                newReply.qid=qid;
                let result=await StorageUtility.createReply(newReply,qid);
                if(result.status){
                    OtherUtility.myLog(`插入成功<回复>`);
                }
                else{
                    OtherUtility.myLog(`插入错误<回复>[${result.detail}]`);
                }
                res.send(result);
                return;
            }
            else{
                OtherUtility.myLog(`[用户${uid}][认证用户][无权回复]`)
                result4User.status=false;
                result4User.detail='无权限';
                res.send(result4User);
                return;
            }
        }
        else{
            OtherUtility.myLog(`权限无效[用户${uid}非认证用户]`)
            result4User.detail="无权限";
            res.send(result4User);
            return;
        }
    } 
}
export const addUserAuth=async(req:express.Request,res:express.Response)=>{
    const {title,token,uid}=req.body
    OtherUtility.myLog(`查验Token:${token}`)
    let res4UI= await AuthUtility.AuthGetUserInfo(token)
    if(!res4UI.status){
        OtherUtility.myLog(`查验失败[token无效]`)
        res.send(res4UI);
        return;
    }
    else{
        let uid=parseInt(res4UI.info.data.ID)
        let result4User=await StorageUtility.findUserAuthByUID(uid);
        if(result4User.status){
            OtherUtility.myLog(`[用户${uid}][认证用户]`)
            if(result4User.data?.title==="超级管理员"){
                OtherUtility.myLog(`[用户${uid}][认证用户][超管有权添加专家]`)
                let newUserAuth=OtherUtility.createNewUserAuthObject(title,uid)
                let result=await StorageUtility.createUserAuth(newUserAuth,title)
                if(result.status){
                    OtherUtility.myLog(`插入成功<专家认证>`);
                }
                else{
                    OtherUtility.myLog(`插入错误<专家认证>[${result.detail}]`);
                }
                res.send(result);
                return;
            }
            else{
                OtherUtility.myLog(`[用户${uid}][认证用户][无权添加专家]`)
                result4User.status=false;
                result4User.detail='无权限';
                res.send(result4User);
                return;
            }
        }
        else{
            OtherUtility.myLog(`权限无效[用户${uid}非认证用户]`)
            result4User.detail="无权限";
            res.send(result4User);
            return;
        }
    } 
}
export const updateNews=async(req:express.Request,res:express.Response)=>{
    const {content,token,truth,pic,title,subtitle,pid}=req.body
    OtherUtility.myLog(`查验Token:${token}`)
    let res4UI= await AuthUtility.AuthGetUserInfo(token)
    if(!res4UI.status){
        OtherUtility.myLog(`查验失败[token无效]`)
        res.send(res4UI);
        return;
    }
    else{
        let uid=parseInt(res4UI.info.data.ID)
        let result4User=await StorageUtility.findUserAuthByUID(uid);
        if(result4User.status){
            OtherUtility.myLog(`[用户${uid}][认证用户][${result4User.data?.title}]`)
            let result4News=await StorageUtility.findNewsbyPID(pid);
            if(result4User.data?.title==="超级管理员"||result4News.data?.uid===uid){
                //超级管理员可以修改他人发布的新闻，但是专家只能修改自己的。
                let newNews=OtherUtility.createNewNewsObject(content,uid,truth,pic,title,subtitle)
                newNews.pid=pid;
                newNews.uid=uid;
                let result=await StorageUtility.updateNews(newNews)
                if(!result.status){
                    OtherUtility.myLog(`修改错误<新闻>[${result.detail}]`)
                    res.send(result);
                    return;
                }
                else{
                    OtherUtility.myLog(`修改成功<新闻>`)
                    res.send(result);
                    return;
                }
            }
            else{
                OtherUtility.myLog(`权限无效[认证用户${uid}无修改权限]`)
                result4User.detail="无权限";
                res.send(result4User);
                return;
            }
        }
        else{
            OtherUtility.myLog(`权限无效[用户${uid}非认证用户]`)
            result4User.detail="无权限";
            res.send(result4User);
            return;
        }
    } 
}
export const updateQuestion=async(req:express.Request,res:express.Response)=>{
    const {content,token,qid}=req.body
    OtherUtility.myLog(`查验Token:${token}`)
    let res4UI= await AuthUtility.AuthGetUserInfo(token)
    if(!res4UI.status){
        OtherUtility.myLog(`查验失败[token无效]`)
        res.send(res4UI);
        return;
    }
    else{
        let uid=parseInt(res4UI.info.data.ID)
        let result4User=await StorageUtility.findUserAuthByUID(uid);
        if(result4User.status){
            OtherUtility.myLog(`[用户${uid}][认证用户]`)
            if(result4User.data?.title==="超级管理员"){
                OtherUtility.myLog(`[用户${uid}][认证用户][超管有权修改]`)
                let newQuestion=OtherUtility.createNewQuestionObject(content,uid);
                newQuestion.qid=qid;
                let result=await StorageUtility.updateQuestion(newQuestion)
                if(result.status){
                    OtherUtility.myLog(`修改成功<回复>`);
                }
                else{
                    OtherUtility.myLog(`修改错误<回复>[${result.detail}]`);
                }
                res.send(result);
                return;
            }
            else{
                OtherUtility.myLog(`[用户${uid}][认证用户][无权回复]`)
                result4User.status=false;
                result4User.detail='无权限';
                res.send(result4User);
                return;
            }
        }
        else{
            OtherUtility.myLog(`权限无效[用户${uid}非认证用户]`)
            result4User.detail="无权限";
            res.send(result4User);
            return;
        }
    } 

}
export const updateReply=async(req:express.Request,res:express.Response)=>{
    const {content,token,pid}=req.body
    OtherUtility.myLog(`查验Token:${token}`)
    let res4UI= await AuthUtility.AuthGetUserInfo(token)
    if(!res4UI.status){
        OtherUtility.myLog(`查验失败[token无效]`)
        res.send(res4UI);
        return;
    }
    else{
        let uid=parseInt(res4UI.info.data.ID)
        let result4User=await StorageUtility.findUserAuthByUID(uid);
        if(result4User.status){
            OtherUtility.myLog(`[用户${uid}][认证用户]`)
            if(result4User.data?.title==="超级管理员"){
                OtherUtility.myLog(`[用户${uid}][认证用户][超管有权修改]`)
                let newReply=OtherUtility.createNewReplyObject(content,pid)
                newReply.pid=pid;
                let result=await StorageUtility.updateReply(newReply)
                if(result.status){
                    OtherUtility.myLog(`修改成功<回复>`);
                }
                else{
                    OtherUtility.myLog(`修改错误<回复>[${result.detail}]`);
                }
                res.send(result);
                return;
            }
            else{
                OtherUtility.myLog(`[用户${uid}][认证用户][无权回复]`)
                result4User.status=false;
                result4User.detail='无权限';
                res.send(result4User);
                return;
            }
        }
        else{
            OtherUtility.myLog(`权限无效[用户${uid}非认证用户]`)
            result4User.detail="无权限";
            res.send(result4User);
            return;
        }
    } 
}
export const updateUserAuth=async(req:express.Request,res:express.Response)=>{
    const {title,token,uidTarget}=req.body
    OtherUtility.myLog(`查验Token:${token}`)
    let res4UI= await AuthUtility.AuthGetUserInfo(token)
    if(!res4UI.status){
        OtherUtility.myLog(`查验失败[token无效]`)
        res.send(res4UI);
        return;
    }
    else{
        let uid=parseInt(res4UI.info.data.ID)
        let result4User=await StorageUtility.findUserAuthByUID(uid);
        if(result4User.status){
            OtherUtility.myLog(`[用户${uid}][认证用户]`)
            if(result4User.data?.title==="超级管理员"){
                OtherUtility.myLog(`[用户${uid}][认证用户][超管有权修改]`)
                let newUserAuth=OtherUtility.createNewUserAuthObject(title,uidTarget)
                let result=await StorageUtility.updateUserAuth(newUserAuth,title)
                if(result.status){
                    OtherUtility.myLog(`修改成功<认证>`);
                }
                else{
                    OtherUtility.myLog(`修改错误<认证>[${result.detail}]`);
                }
                res.send(result);
                return;
            }
            else{
                OtherUtility.myLog(`[用户${uid}][认证用户][无权回复]`)
                result4User.status=false;
                result4User.detail='无权限';
                res.send(result4User);
                return;
            }
        }
        else{
            OtherUtility.myLog(`权限无效[用户${uid}非认证用户]`)
            result4User.detail="无权限";
            res.send(result4User);
            return;
        }
    } 

}
export const deleteNews=async(req:express.Request,res:express.Response)=>{
    const {pid,token,}=req.body
    OtherUtility.myLog(`查验Token:${token}`)
    let res4UI= await AuthUtility.AuthGetUserInfo(token)
    if(!res4UI.status){
        OtherUtility.myLog(`查验失败[token无效]`)
        res.send(res4UI);
        return;
    }
    else{
        let uid=parseInt(res4UI.info.data.ID)
        let result4User=await StorageUtility.findUserAuthByUID(uid);
        if(result4User.status){
            OtherUtility.myLog(`[用户${uid}][认证用户]`)
            if(result4User.data?.title==="超级管理员"){
                OtherUtility.myLog(`[用户${uid}][认证用户][超管有权删除]`)
                let result=await StorageUtility.deleteNews(pid)
                if(result.status){
                    OtherUtility.myLog(`删除成功<新闻>`);
                }
                else{
                    OtherUtility.myLog(`删除错误<新闻>[${result.detail}]`);
                }
                res.send(result);
                return;
            }
            else{
                OtherUtility.myLog(`[用户${uid}][认证用户][无权删除]`)
                result4User.status=false;
                result4User.detail='无权限';
                res.send(result4User);
                return;
            }
        }
        else{
            OtherUtility.myLog(`权限无效[用户${uid}非认证用户]`)
            result4User.detail="无权限";
            res.send(result4User);
            return;
        }
    } 
}
export const deleteQuestion=async(req:express.Request,res:express.Response)=>{
    const {qid,token,}=req.body
    OtherUtility.myLog(`查验Token:${token}`)
    let res4UI= await AuthUtility.AuthGetUserInfo(token)
    if(!res4UI.status){
        OtherUtility.myLog(`查验失败[token无效]`)
        res.send(res4UI);
        return;
    }
    else{
        let uid=parseInt(res4UI.info.data.ID)
        let result4User=await StorageUtility.findUserAuthByUID(uid);
        if(result4User.status){
            OtherUtility.myLog(`[用户${uid}][认证用户]`)
            if(result4User.data?.title==="超级管理员"){
                OtherUtility.myLog(`[用户${uid}][认证用户][超管有权删除]`)
                let result=await StorageUtility.deleteQuestion(qid)
                if(result.status){
                    OtherUtility.myLog(`删除成功<提问>`);
                }
                else{
                    OtherUtility.myLog(`删除错误<提问>[${result.detail}]`);
                }
                res.send(result);
                return;
            }
            else{
                OtherUtility.myLog(`[用户${uid}][认证用户][无权删除]`)
                result4User.status=false;
                result4User.detail='无权限';
                res.send(result4User);
                return;
            }
        }
        else{
            OtherUtility.myLog(`权限无效[用户${uid}非认证用户]`)
            result4User.detail="无权限";
            res.send(result4User);
            return;
        }
    } 
}
export const deleteReply=async(req:express.Request,res:express.Response)=>{
    const {pid,token,}=req.body
    OtherUtility.myLog(`查验Token:${token}`)
    let res4UI= await AuthUtility.AuthGetUserInfo(token)
    if(!res4UI.status){
        OtherUtility.myLog(`查验失败[token无效]`)
        res.send(res4UI);
        return;
    }
    else{
        let uid=parseInt(res4UI.info.data.ID)
        let result4User=await StorageUtility.findUserAuthByUID(uid);
        if(result4User.status){
            OtherUtility.myLog(`[用户${uid}][认证用户]`)
            if(result4User.data?.title==="超级管理员"){
                OtherUtility.myLog(`[用户${uid}][认证用户][超管有权删除]`)
                let result=await StorageUtility.deleteReply(pid)
                if(result.status){
                    OtherUtility.myLog(`删除成功<回复>`);
                }
                else{
                    OtherUtility.myLog(`删除错误<回复>[${result.detail}]`);
                }
                res.send(result);
                return;
            }
            else{
                OtherUtility.myLog(`[用户${uid}][认证用户][无权回复]`)
                result4User.status=false;
                result4User.detail='无权限';
                res.send(result4User);
                return;
            }
        }
        else{
            OtherUtility.myLog(`权限无效[用户${uid}非认证用户]`)
            result4User.detail="无权限";
            res.send(result4User);
            return;
        }
    } 
}
export const deleteUserAuth=async(req:express.Request,res:express.Response)=>{
    const {id,token,}=req.body
    OtherUtility.myLog(`查验Token:${token}`)
    let res4UI= await AuthUtility.AuthGetUserInfo(token)
    if(!res4UI.status){
        OtherUtility.myLog(`查验失败[token无效]`)
        res.send(res4UI);
        return;
    }
    else{
        let uid=parseInt(res4UI.info.data.ID)
        let result4User=await StorageUtility.findUserAuthByUID(uid);
        if(result4User.status){
            OtherUtility.myLog(`[用户${uid}][认证用户]`)
            if(result4User.data?.title==="超级管理员"){
                OtherUtility.myLog(`[用户${uid}][认证用户][超管有权删除]`)
                let result=await StorageUtility.deleteUserAuth(id);
                if(result.status){
                    OtherUtility.myLog(`删除成功<新闻>`);
                }
                else{
                    OtherUtility.myLog(`删除错误<新闻>[${result.detail}]`);
                }
                res.send(result);
                return;
            }
            else{
                OtherUtility.myLog(`[用户${uid}][认证用户][无权回复]`)
                result4User.status=false;
                result4User.detail='无权限';
                res.send(result4User);
                return;
            }
        }
        else{
            OtherUtility.myLog(`权限无效[用户${uid}非认证用户]`)
            result4User.detail="无权限";
            res.send(result4User);
            return;
        }
    } 
}

export const CRUDResources=(req:express.Request,res:express.Response)=>{
    let functions=[
        [
            addNews,
            addQuestion,
            addUserAuth,
            addReply
        ],
        [
            deleteNews,
            deleteQuestion,
            deleteUserAuth,
            deleteReply
        ],
        [
            updateNews,
            updateQuestion,
            updateUserAuth,
            updateReply
        ],
    ]
    let {option,resource}=req.params;
    let optionNumber=0,resNumber=0;
    switch(option){
        case "create":optionNumber=1;break;
        case "delete":optionNumber=2;break;
        case "update":optionNumber=3;break;
        //case "select":optionNumber=4;break;
        default      :optionNumber=0;break;        
    }
    switch(resource){
        case "news"    :resNumber=1;break;
        case "question":resNumber=2;break;
        case "userAuth":resNumber=3;break;
        case "reply":resNumber=4;break;
        default        :resNumber=0;break;        
    }
    if(optionNumber===0||resNumber===0){
        let status:IStatus={status:false,detail:"操作或资源请求错误"}
        res.send(status)
    }
    else{
        OtherUtility.myLog(`操作:${option};资源:${resource}`);
        functions[optionNumber-1][resNumber-1](req,res);
        return;
    }
}
export const checkUserTitle=async(req:express.Request,res:express.Response)=>{
    const {token}=req.body;
    let res4UI= await AuthUtility.AuthGetUserInfo(token);
    if(!res4UI.status){
        OtherUtility.myLog(`查验失败[token无效]`)
        res.send(res4UI);
        return;
    }
    else{
        let uid=parseInt(res4UI.info.data.ID)
        let result4User=await StorageUtility.findUserAuthByUID(uid);
        if(result4User.status){
            OtherUtility.myLog(`[用户${uid}][认证用户]`)
            if(result4User.data?.title==="超级管理员"){
                res.send(result4User);
                return;
            }
            else{
                OtherUtility.myLog(`[用户${uid}][认证用户][无权回复]`)
                result4User.status=false;
                result4User.detail='无权限';
                res.send(result4User);
                return;
            }
        }
        else{
            OtherUtility.myLog(`权限无效[用户${uid}非认证用户]`)
            result4User.detail="无权限";
            res.send(result4User);
            return;
        }
    }
}