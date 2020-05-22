import { ConfUtility } from "./utils"
import { IObject } from "../types/IObject";
import { QuestionDefault, IQuestion, IReply, ReplyDefault } from "../types/IQuestion";

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