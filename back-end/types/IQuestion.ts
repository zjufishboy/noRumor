//提问和回复的接口
export interface IReply{
    pid:number,
    qid:number,
    replyContent: string,
}
export interface IQuestion {
    uid: number,
    qid:number,
    thetime:  string,
    questionContent:string,
    reply?:IReply
}
export const QuestionDefault:IQuestion={
    uid:0,
    qid:0,
    thetime:"",
    questionContent:"",
}
export const ReplyDefault:IReply={
    pid:0,
    qid:0,
    replyContent:""
}