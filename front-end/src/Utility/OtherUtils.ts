import moment from 'moment'
import * as Utility from '@/Utility/utils'
import { UserInfoDefault } from '@/types/IUserInfo';
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
export const checkToken=()=>{
    Utility.StorageUtility.storeLoad()
    let token=Utility.StorageUtility.getToken()
    Utility.NetworkUtility.AuthGetUserInfo(token)
    .then(res=>{
      if(res.status){
        Utility.StorageUtility.setUserInfo(res.info.data)
      }
      else{
        Utility.StorageUtility.setUserInfo(UserInfoDefault)
      }
    });
}
export const logout=()=>{
    Utility.StorageUtility.storeLogOut()
    window.location.reload()
}