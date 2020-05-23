import { ConfUtility, StorageUtility } from './utils';
import { IObject } from '@/types/IObject';
import { newsDefault } from '@/types/INews';

export const myFetch = (way:"POST"|"GET",url: string, data?: IObject) => {
  let requestInit:RequestInit = {
      headers: {
          "Content-Type":"application/json",
      },
      method: way,
      mode: "cors",
      body: data?JSON.stringify(data):null
  }
  return fetch(url,requestInit)
}

export const myPost=(url:string,data:IObject)=>{
  return myFetch("POST",url,data)
}
export const myGet=(url:string,data:IObject)=>{
  const params=[]
  for(let key in data){
      params.push(`${key}=${data[key]}`)
  }
  let realUrl=`${url}${params.length===0?"":"?"}${params.join("&")}`
  return myFetch("GET",realUrl)
}

/**
 * 获取首页新闻
 */
export const getAllNews = async () => {
  return await myGet(ConfUtility.getPathAllNews(),{})
    .then(res => res.json())
    .then(res => res.status?res.data:[]);
};

export const getNewsByPID=async(pid:number)=>{
  return await myGet(ConfUtility.getNewsByPID(pid),{})
    .then(res => res.json())
    .then(res => res.status?res.data:newsDefault);
}

/**
 * 获取热搜新闻：展示在首页
 */
export const getHotNews = async () => {
  return await myGet(ConfUtility.getPathHotNews(),{})
    .then(res => res.json())
    .then(res => res.status?res.data.title:newsDefault);
};

/**
 * 获取热门提问
 */
export const getHotQuestion = async () => {
  return await myGet(ConfUtility.getPathHotQuestion(),{})
    .then(res => res.json())
    .then(res => res.status?res.data:[]);
};

/**
 * 获取最新提问
 */
export const getNewQuestion = async () => {
  return await myGet(ConfUtility.getPathNewQuestion(),{})
    .then(res => res.json())
    .then(res => res.status?res.data:[]);
};

/**
 * 获取我的提问
 */
export const getMyQuestion = async () => {
  let token=StorageUtility.getToken()
  return await myPost(ConfUtility.getPathMyQuestion(),{token})
    .then(res => res.json())
    .then(res => res.status?res.data:[]);
};

/**
 * 获取热搜：搜索页面
 * TODO:还没写
 */
export const getHotSearch = async () => {
  return await myGet(ConfUtility.getPathHotSearch(),{})
    .then(res => res.json())
    .then(res => res.status?res.data:[]);
};

/**
 * 跳转登录
 */
export const login = () => {
  const url = ConfUtility.getLoginUrl();
  window.location.href=url;
};

/**
 * 获取用户信息
 */
export const AuthGetUserInfo=async(token:string)=>{
  return myPost(ConfUtility.getUserInfoUrl(),{token}).then(res=>res.json())
}

/**
 * 提出新问题
 */
export const PostNewQuestion=async(content:string)=>{
  let token=StorageUtility.getToken()
  console.log(ConfUtility.operationUrl(0,1))
  return myPost(ConfUtility.operationUrl(0,1),{token,content}).then(res=>res.json())
}
