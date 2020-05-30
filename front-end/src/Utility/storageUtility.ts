import { IStoreForNoRumor, storeForNoRumorDefault } from '@/types/IStoreForNoRumor'
import { IUserInfo, UserInfoDefault } from '@/types/IUserInfo'


export const storeForQuestion:IStoreForNoRumor={...storeForNoRumorDefault,userInfo:{...UserInfoDefault}}

export const storeLoad=()=>{
  let storeStr=window.localStorage.getItem("NoRumor")
  if(!storeStr){
     storeSave()
  }
  else{
      const {name,token,userInfo}=JSON.parse(storeStr)
      storeForQuestion.name=name;
      storeForQuestion.token=token;
      storeForQuestion.userInfo=userInfo
  }
}
export const storeSave=()=>{
  window.localStorage.setItem("NoRumor",JSON.stringify(storeForQuestion))
}
export const storeLogOut=()=>{
  window.localStorage.setItem("NoRumor",JSON.stringify(storeForNoRumorDefault))
}
export const getStore=()=>{
  return storeForQuestion;
}
export const getUserInfo=()=>{
  storeLoad()
  return storeForQuestion.userInfo;
}
export const setUserInfo=(userInfo:any)=>{
  const {userName="",ID=-1,signature="默认签名"}=userInfo
  storeForQuestion.userInfo={userName,uid:ID,signature};
  storeSave();
}
export const setToken=(token:string)=>{
  
  storeForQuestion.token=token;
  storeSave()
}
export const getToken=()=>{
  storeLoad()
  return storeForQuestion.token;
}

export const setUserName=(userName:string)=>{
  storeForQuestion.userInfo.userName=userName;
  storeSave()
}
export const getUserName=()=>storeForQuestion.userInfo.userName