import moment from 'moment'
import * as Utility from '@/Utility/utils'
import { UserInfoDefault } from '@/types/IUserInfo';
import { history } from 'umi';
import { message } from 'antd';
export const getQueryVariable = (v: string)=>{
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0;i < vars.length;i++) {
        let pair = vars[i].split("=");
        if (pair[0] === v) {
            return pair[1];
        }
    }
    return "";
};
export const TimeTranslate=(time:string)=>{
    return moment(time).format("YYYY-MM-DD HH:MM").toString()
}
export const checkToken=(isManage?:Boolean)=>{
    Utility.StorageUtility.storeLoad()
    let token=Utility.StorageUtility.getToken()
    Utility.NetworkUtility.AuthGetUserInfo(token)
    .then(res=>{
      if(res.status){
        Utility.StorageUtility.setUserInfo(res.info.data)
        if(isManage){
          Utility.NetworkUtility.checkUserTitle().then(
            res=>{
              if(!res.status){
                message.error("验证出错，无法使用本功能")
                history.replace("/")
              }
              else{
                if(res.data.title==="超级管理员"){
                  message.info("欢迎回到管理界面");
                }
                else{
                  message.error("验证出错，无法使用本功能")
                  history.replace("/")
                }
              }
            }
          )
        }
      }
      else{
        Utility.StorageUtility.setUserInfo(UserInfoDefault)
        if(isManage){
          Utility.NetworkUtility.login();
        }
      }
    });
}
export const logout=()=>{
    Utility.StorageUtility.storeLogOut()
    window.location.reload()
}