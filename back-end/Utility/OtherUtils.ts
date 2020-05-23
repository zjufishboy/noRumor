import { ConfUtility } from "./utils"
import { IObject } from "../types/IObject";
import { QuestionDefault, IQuestion, IReply, ReplyDefault } from "../types/IQuestion";
import { INews } from "../types/INews";
import { IUserInfo } from "../types/IUserInfo";
import { IUserAuth } from "../types/IUserAuth";

export const myLog=(data:any)=>{
    if(ConfUtility.env==="debug"){
        console.log(data)
    }
    else{
        
    }
}
export const mapData=(item:IObject)=>{
    let newQuestion:IQuestion={...QuestionDefault};
    newQuestion.uid=item.uid;
    newQuestion.questionContent=item.questionContent;
    newQuestion.thetime=item.thetime;
    newQuestion.qid=item.qid;
    let newReply:IReply={...ReplyDefault};
    newReply.replyContent=item.replyContent;
    newReply.pid=item.pid;
    newReply.qid=item.qid;
    newQuestion.reply=newReply;
    return newQuestion;
}
export const createNewQuestionObject=(content:string,uid:number)=>{
    let time=new Date().toISOString()

    let newQuestion:IQuestion={
        questionContent:content,
        uid:uid,
        qid:-1,
        thetime:time
    }
    return newQuestion;
}
export const createNewNewsObject=(content:string,uid:number,truth:boolean,pic:string,title:string,subtitle:string)=>{
    let time=new Date()
    let newNews:INews={
        pid:-1,
        uid:uid,
        concern:0,
        content:content,
        truth:truth,
        thetime:time.toISOString(),
        pic:pic,
        title,
        subtitle
    }
    return newNews;
}
export const createNewUserAuthObject=(title:string,uid:number)=>{
    let newUserAuth:IUserAuth={
        uid:uid,
        title,
        id:-1
    }
    return newUserAuth;
}
export const createNewReplyObject=(content:string,pid:number)=>{
    let newReply:IReply={
        replyContent:content,
        pid,
        qid:-1,
    }
    return newReply;
}