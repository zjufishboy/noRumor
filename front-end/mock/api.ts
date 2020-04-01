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
  'GET /api/allNews': [
    {
      title: '视频：意大利情侣双双感染新冠肺炎，病房永别后去世',
      picture: '',
      time: '2020-04-01',
      status: 'false',
    },
    {
      title: '视频：意大利情侣双双感染新冠肺炎，病房永别后去世',
      picture: '',
      time: '2020-04-01',
      status: 'false',
    },
  ],
};
