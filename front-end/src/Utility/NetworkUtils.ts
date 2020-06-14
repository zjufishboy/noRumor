import { ConfUtility, StorageUtility } from './utils';
import { IObject } from '@/types/IObject';
import { newsDefault, INews } from '@/types/INews';
import { QuestionDefault } from '@/types/IQuestion';

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
export const getAllNews = async (from:number=0,size:number=10) => {
  return await myGet(ConfUtility.getPathAllNews(from,size),{})
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
  return myPost(ConfUtility.operationUrl(0,1),{token,content}).then(res=>res.json())
}

/**
 * 获取用户信息
 */
export const GetUserInfo=async (uid:number)=>{
  const res = await myGet(ConfUtility.getPathUserInfo(uid), {});
  return await res.json();
}

/**
 * 获取相关新闻
 */
export const getSearchResult=async (word:string)=>{
  return myGet(ConfUtility.getPathSearchResult(word), {})
         .then(res=>res.json())
         .then(res => res.status?res.data:[]);;
}

/**
 * 获取提问信息
 */
export const getQuestionByQID= async (qid:number)=>{
  return myGet(ConfUtility.getQuestionByQID(qid),{})
    .then(res=>res.json())
    .then(res=>res.status?res.data:QuestionDefault)
}

/**
 * 更新提问
 */
export const updateQuestion =async (content:string,qid:number)=>{
  const token= StorageUtility.getToken()
  return myPost(ConfUtility.getPathUpdateQuestion(),{content,qid,token})
    .then(res=>res.json())
}

/**
 * 更新回复
 */
export const updateReply =async (content:string,pid:number)=>{
  const token= StorageUtility.getToken()
  return myPost(ConfUtility.getPathUpdateReply(),{content,pid,token})
    .then(res=>res.json())
}

/**
 * 更新用户
 */
export const updateUser =async (content:string,pid:number)=>{
  const token= StorageUtility.getToken()
  return myPost(ConfUtility.getPathUpdateuser(),{content,pid,token})
    .then(res=>res.json())
}

/**
 * 更新辟谣信息
 */
export const updateInfo =async (news:INews)=>{
  const token= StorageUtility.getToken()
  return myPost(ConfUtility.getPathUpdateInfo(),{...news,token})
    .then(res=>res.json())
}

/**
 * 新建回复
 */
export const createReply =async (content:string,qid:number)=>{
  const token= StorageUtility.getToken()
  return myPost(ConfUtility.getPathCreateReply(),{content,qid,token})
    .then(res=>res.json())
}

/**
 * 新建辟谣信息
 */
export const createInfo =async (news:INews)=>{
  const token= StorageUtility.getToken()
  return myPost(ConfUtility.getPathCreateInfo(),{...news,token})
    .then(res=>res.json())
}

/**
 * 核对用户权限
 */
export const checkUserTitle= async ()=>{
  const token=StorageUtility.getToken();
  return myPost(ConfUtility.getPathCheckTitle(),{token})
    .then(res=>res.json())
}