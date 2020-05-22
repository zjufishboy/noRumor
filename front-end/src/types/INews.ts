export interface INews {
    pid:number,
    concern:number,
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
    thetime:"",
    truth:false,
    uid:-1,
    pic:"",
    title:"",
    subtitle:""
}