import * as Storage from './storageUtility';
import { ConfUtility } from './utils';

/**
 * 获取一批新闻
 */
export const getAllNews = async () => {
  return await fetch(ConfUtility.getPathAllNews())
    .then(res => res.json())
    .then(res => res.news);
};

/**
 * 获取热搜新闻：展示在首页
 */
export const getHotNews = async () => {
  return await fetch(ConfUtility.getPathHotNews())
    .then(res => res.json())
    .then(res => res.hotSearchWord);
};

/**
 * 获取热门提问
 */
export const getHotQuestion = async () => {
  return await fetch(ConfUtility.getPathHotQuestion())
    .then(res => res.json())
    .then(res => res.question);
};

/**
 * 获取最新提问
 */
export const getNewQuestion = async () => {
  return await fetch(ConfUtility.getPathNewQuestion())
    .then(res => res.json())
    .then(res => res.question);
};

/**
 * 获取我的提问
 */
export const getMyQuestion = async () => {
  return await fetch(ConfUtility.getPathMyQuestion())
    .then(res => res.json())
    .then(res => res.question);
};

/**
 * 获取热搜：搜索页面
 */
export const getHotSearch = async () => {
  return await fetch(ConfUtility.getPathHotSearch())
    .then(res => res.json())
    .then(res => res.hotSearch);
};

/**
 * todo:登录
 */
export const login = (callback: Function) => {
  const url = ConfUtility.getLoginUrl();
  window.location.href=url;
};
