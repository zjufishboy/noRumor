import { IUserInfo, UserInfoDefault } from './IUserInfo';

export interface IStoreForNoRumor{
    name:string,
    token:string,
    userInfo:IUserInfo
}
export const storeForNoRumorDefault:IStoreForNoRumor={
    name:"Norumor-辟谣平台",
    token:"",
    userInfo:UserInfoDefault
  }