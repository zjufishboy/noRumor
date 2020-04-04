import * as Storage from './storageUtility'

/**
 * 获取一批新闻
 */
export const getAllNews=async()=>{
    return await fetch("/api/allNews").then(res=>res.json()).then(res=>res.news);
}

/**
 * 获取热搜新闻：展示在首页
 */
export const getHotNews=async()=>{
    return await fetch("/api/hotNews").then(res=>res.json()).then(res=>res.hotSearchWord);
}

/**
 * 获取热门提问：展示在首页
 */
export const getHotQuestion=async()=>{
    return await fetch("/api/hotQuestion").then(res=>res.json()).then(res=>res.question);
}

/**
 * 获取最新提问：展示在首页
 */
export const getNewQuestion=async()=>{
    return await fetch("/api/newQuestion").then(res=>res.json()).then(res=>res.question);
}

/**
 * 获取我的提问：展示在首页
 */
export const getMyQuestion=async()=>{
    return await fetch("/api/myQuestion").then(res=>res.json()).then(res=>res.question);
}




/**
 * 登录
 */
export const login=(callback:Function)=>{
    let newState:Storage.UserInfo={
        isLogin:true,
        avatar:'http://q2.qlogo.cn/headimg_dl?dst_uin=1647075274&spec=100',
        token:"this is a example token",
        userName:"游鱼星"
    }
    Storage.setState(newState)
    callback()
}
