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