import * as Storage from './storageUtility';

/**
 * 获取一批新闻
 */
export const NewWorkConf={
  url:'api.fishstar.xyz/noRumorTest',
  protocol:"http",
  envLevel:1
}
export const URL=`${NewWorkConf.protocol}://${NewWorkConf.envLevel===1?NewWorkConf.url:"localhost"}`
export const getAllNews = async () => {
  return await fetch(`${URL}/allNews`)
    .then(res => res.json())
    .then(res => res.news);
};

/**
 * 获取热搜新闻：展示在首页
 */
export const getHotNews = async () => {
  return await fetch(`${URL}/hotNews`)
    .then(res => res.json())
    .then(res => res.hotSearchWord);
};

/**
 * 获取热门提问
 */
export const getHotQuestion = async () => {
  return await fetch(`${URL}/hotQuestion`)
    .then(res => res.json())
    .then(res => res.question);
};

/**
 * 获取最新提问
 */
export const getNewQuestion = async () => {
  return await fetch(`${URL}/newQuestion`)
    .then(res => res.json())
    .then(res => res.question);
};

/**
 * 获取我的提问
 */
export const getMyQuestion = async () => {
  return await fetch(`${URL}/myQuestion`)
    .then(res => res.json())
    .then(res => res.question);
};

/**
 * 获取热搜：搜索页面
 */
export const getHotSearch = async () => {
  return await fetch(`${URL}/hotSearch`)
    .then(res => res.json())
    .then(res => res.hotSearch);
};

/**
 * todo:登录
 */
export const login = (callback: Function) => {
  const info = {
    response_type: 'code', //返回模式：code
    client_id: 0, //Appid
    redirect_uri: 'http://localhost:8000', //重定向uri
    scope: 'read', //申请权限
  };
  const url = `http://account.fishstar.xyz?response_type=${info.response_type}&client_ID=${info.client_id}&redirect_uri=${info.redirect_uri}&scope=${info.scope}`;
  window.location.href=url;
};
