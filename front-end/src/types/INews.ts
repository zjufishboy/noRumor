export interface INews {
    pid:number,
    corcern:number,
    content:string,
    thetime:string,
    truth:boolean,
    uid:number,
    pic:string,
    title:string,
    subtitle:string
}

export const newsDefault:INews={
    pid:-1,
    concern:-1,
    content:"",
    thetime:"2020-02-02 10:10:10",
    truth:false,
    uid:-1,
    pic:"",
    title:"",
    subtitle:""
}