//功能性设置
export const env:string="debug";
export const apiUrl=["http://localhost:4003/rumor","http://api.fishstar.xyz/noRumorTest"]
export const thisUrl=["http://localhost:8000","http://norumor.fishstar.xyz"]
export const pathAllNews="/allNews"
export const pathHotNews="/hotNews"
export const pathHotSearch="/hotSearch"
export const pathHotQuestion="/hotQuestion"
export const pathNewQuestion="/newQuestion"
export const pathMyQuestion="/myQuestion"
export const pathNews="/News"

export const getPathAllNews     =()=>`${apiUrl[env==="debug"?0:1]}${pathAllNews}`
export const getPathHotNews     =()=>`${apiUrl[env==="debug"?0:1]}${pathHotNews}`
export const getPathHotSearch   =()=>`${apiUrl[env==="debug"?0:1]}${pathHotSearch}`
export const getPathHotQuestion =()=>`${apiUrl[env==="debug"?0:1]}${pathHotQuestion}`
export const getPathNewQuestion =()=>`${apiUrl[env==="debug"?0:1]}${pathNewQuestion}`
export const getPathMyQuestion  =()=>`${apiUrl[env==="debug"?0:1]}${pathMyQuestion}`
export const getNewsByPID       =(pid:number)=>`${apiUrl[env==="debug"?0:1]}${pathNews}/${pid}`

//登录相关
export const fishAccountUrl=["http://localhost:4001","http://account.fishstar.xyz"];
export const AppInfo={
    response_type: 'code',                  //返回模式：code
    client_id: 2,                           //AppID
    redirect_uri: thisUrl[env==="debug"?0:1],  //重定向uri
    scope: 'read',                          //申请权限
}
export const getLoginUrl=()=>`http://account.fishstar.xyz?response_type=${AppInfo.response_type}&client_ID=${AppInfo.client_id}&redirect_uri=${AppInfo.redirect_uri}&scope=${AppInfo.scope}`
//其他后端配置
export const tokenUrl=["http://localhost:4003/rumor/token","http://api.fishstar.xyz/noRumorTest/token"]
export const getTokenUrl=()=>tokenUrl[env==='debug'?0:1]

export const getUserInfoUrl=()=>'http://api.fishstar.xyz/account/userInfo'