import { defineConfig } from 'umi';

export default defineConfig({
  routes: [
    {
      path: '/',
      component: '@/pages/home/index',
      exact: true,
      title: '谣言粉碎机',
    },
    {
      path: '/home',
      component: '@/pages/home/index',
      exact: true,
      title: '谣言粉碎机',
    },
    {
      path: '/question',
      component: '@/pages/question/index',
      exact: true,
      title: '谣言粉碎机',
    },
    {
      path: '/search',
      component: '@/pages/search/index',
      exact: true,
      title: '谣言粉碎机',
    },
    {
      path: '/question/:qid',
      component: '@/pages/question/[qid]',
      exact: true,
      title: '谣言粉碎机',
    },
    {
      path: '/callback',
      component: '@/pages/callback/index',
      exact: true,
      title: '登陆',
    },
    {
      path: '/manage',
      component: '@/pages/manage/index',
      exact: true,
      title: '管理谣言',
    },
  ],
});
