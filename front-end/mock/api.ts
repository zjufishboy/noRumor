import mockjs from 'mockjs';

export default {
  // 支持值为 Object 和 Array
  'GET /api/users': { users: [1, 2] },

  // GET 可忽略
  '/api/users/1': { id: 1 },

  // 支持自定义函数，API 参考 express@4
  'POST /api/users/create': (req: any, res: any) => {
    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end('ok');
  },
  'GET /api/allNews': mockjs.mock({
    'news|100': [
      {
        title: '视频：意大利情侣双双感染新冠肺炎，病房永别后去世',
        picture:
          'https://p.qpic.cn/jiaozhen/0/43860d4629208125453d34eef7d0d8ee/0?imageView2/2/w/150/h/90',
        time: '@DATETIME("yyyy-MM-dd")',
        'status|1': true,
      },
    ],
  }),
  'GET /api/hotNews': {
    hotSearchWord: '多地发生入室抢劫案，抢劫犯冒充防疫人员',
  },
  'GET /api/hotQuestion': mockjs.mock({
    'question|1-100': [
      {
        userAvatar: 'http://q2.qlogo.cn/headimg_dl?dst_uin=1647075274&spec=100',
        userName: '@cname',
        time: '@DATETIME("yyyy-MM-dd")',
        content: '测试谣言',
        reply: mockjs.Random.boolean(1,0,true)
          ? mockjs.mock({
              userAvatar:
                'http://q2.qlogo.cn/headimg_dl?dst_uin=1647075274&spec=100',
              userName: '全民较真',
              content: '据美国疾病控制和预防中心的报告，此前在加利福尼亚，夏威夷和新泽西州有四人死亡，很可能是在吃了韩国新鸿食品公司（Sun Hong Foods，Inc.）分销的金针菇。这些金针菇可能被李斯特菌污染。感兴趣可以看看这一篇',
              link: mockjs.Random.boolean(1,0,true)?mockjs.Random.natural(1,100):null,
            })
          : null,
      },
    ],
  }),
  'GET /api/newQuestion': mockjs.mock({
    'question|1-100': [
      {
        userAvatar: 'http://q2.qlogo.cn/headimg_dl?dst_uin=1647075274&spec=100',
        userName: '@cname',
        time: '@DATETIME("yyyy-MM-dd")',
        content: '测试谣言',
        reply: null,
      },
    ],
  }),
  'GET /api/myQuestion': mockjs.mock({
    'question|1-10': [
      {
        userAvatar: 'http://q2.qlogo.cn/headimg_dl?dst_uin=1647075274&spec=100',
        userName: '游鱼星',
        time: '@DATETIME("yyyy-MM-dd")',
        content: '测试谣言',
        reply: null,
      },
    ],
  }),
};
