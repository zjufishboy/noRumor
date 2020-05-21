import { ConfUtility } from "./utils";
import { IObject } from '../types/IObject'
import fetch from 'node-fetch'
export const myFetch = (way:"POST"|"GET",url: string, data?: IObject) => {
    if(way=="GET"){
        return fetch(url)
    }
    else{
        return fetch(url,
            {
                method:way,
                body:JSON.stringify(data),
                headers: { 
                    'Content-Type': 'application/json' 
                }
            }
        )
    }
}
export const myGet=(url:string,data:IObject)=>{
    const params=[]
    for(let key in data){
        params.push(`${key}=${data[key]}`)
    }
    let realUrl=`${url}${params.length===0?"":"?"}${params.join("&")}`
    return myFetch("GET",realUrl)
}
export const myPost=(url:string,data:IObject)=>{
    return myFetch("POST",url,data)
}

export const AuthGetToken=async(authCode:string)=>{
    let {client_secret,client_ID}=ConfUtility.clientConf;
    return myGet(ConfUtility.getTokenUrl(),{authCode,client_secret,client_ID}).then(res=>res.json())
}
export const AuthGetUserInfo=async(token:string)=>{
    return myPost(ConfUtility.getUserInfoUrl(),{token}).then(res=>res.json())
}