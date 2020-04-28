import mockjs from 'mockjs';

export default {
  // 支持值为 Object 和 Array
  'GET /api/users': { users: [1, 2] },

  // GET 可忽略
  '/api/users/1': { id: 1 },

  // 支持自定义函数，API 参考 express@4
  // 'POST /callback': (req: any, res: any) => {
  //   // 添加跨域请求头
  //   res.setHeader('Access-Control-Allow-Origin', '*');
  //   res.end('ok');
  // },
  'GET /api/allNews': mockjs.mock({
    news: [
      {
        title: '组合用羟氯喹阿奇霉素和硫酸锌能有效治疗新冠肺炎 ',
        picture:
          'https://p.qpic.cn/jiaozhen/0/fedf2805ba54f963349bd51b4c716d7f/0?imageView2/2/w/150/h/90',
        time: '@DATETIME("yyyy-MM-dd")',
        status: 'false',
      },
      {
        title: '美国纽约殡葬公司员工累倒午睡，被同事误当尸体火化 ',
        picture:
          'https://p.qpic.cn/jiaozhen/0/db09f04cfe8ebeb55add88a437e14d8e/0?imageView2/2/w/150/h/90',
        time: '@DATETIME("yyyy-MM-dd")',
        status: 'false',
      },
      {
        title: '4月20日北京市朝阳区被列为疫情高风险地区 ',
        picture:
          'https://p.qpic.cn/jiaozhen/0/b99c3619f8a5a11d1b61f676caff0d47/0?imageView2/2/w/150/h/90',
        time: '@DATETIME("yyyy-MM-dd")',
        status: 'true',
      },
      {
        title: '美国纽约大量青壮年一发病就上呼吸机，是ADE导致 ',
        picture:
          'https://p.qpic.cn/jiaozhen/0/c531b3ad182cbfcf06f2961fea65e6ea/0?imageView2/2/w/150/h/90',
        time: '@DATETIME("yyyy-MM-dd")',
        status: 'false',
      },
      {
        title: '北京市教委确认幼升小以及小升初预计推迟至今年七月 ',
        picture:
          'https://p.qpic.cn/jiaozhen/0/bd388ad94f5e4b885f299ea0a4c147b5/0?imageView2/2/w/150/h/90',
        time: '@DATETIME("yyyy-MM-dd")',
        status: 'false',
      },
      {
        title: '北京西站出现大量白衣人，意味着北京疫情大爆发 ',
        picture:
          'https://p.qpic.cn/jiaozhen/0/e9a28f16668152b3d1ea4d3efd37c87f/0?imageView2/2/w/150/h/90',
        time: '@DATETIME("yyyy-MM-dd")',
        status: 'false',
      },
      {
        title: '有论文证明新冠病毒可以通过鞋底传播4米 ',
        picture:
          'https://p.qpic.cn/jiaozhen/0/dba88702fd96218e41938fd2e7a05388/0?imageView2/2/w/150/h/90',
        time: '@DATETIME("yyyy-MM-dd")',
        status: 'false',
      },
      {
        title: '比尔·盖茨利用新冠疫情控制人口，完成人类清除计划 ',
        picture:
          '//jiaozhen-70111.picnjc.qpic.cn/pTs1YwF288v5wTdb1zrvCb?imageView2/2/w/150/h/90',
        time: '@DATETIME("yyyy-MM-dd")',
        status: 'false',
      },
      {
        title: '美国基于唾液的新冠病毒检测方法准确率100% ',
        picture:
          '//jiaozhen-70111.picnjc.qpic.cn/mRHiVxWQ8tvtwKQEiEY95X?imageView2/2/w/150/h/90',
        time: '@DATETIME("yyyy-MM-dd")',
        status: 'false',
      },
      {
        title: '长期高浓度使用84消毒液，可能导致过敏性肺泡炎 ',
        picture:
          'https://p.qpic.cn/jiaozhen/0/3bfc18997f985ecf3361f08c0fbc47f8/0?imageView2/2/w/150/h/90',
        time: '@DATETIME("yyyy-MM-dd")',
        status: 'true',
      },
    ],
  }),
  'GET /api/hotNews': {
    hotSearchWord: '多地发生入室抢劫案，抢劫犯冒充防疫人员',
  },
  'GET /api/hotQuestion': mockjs.mock({
    question: [
      {
        userAvatar: 'http://q2.qlogo.cn/headimg_dl?dst_uin=1647075274&spec=100',
        userName: '@cname',
        time: '@DATETIME("yyyy-MM-dd")',
        content: '保定又有新病例了吗',
        reply: {
          userAvatar:
            'http://q2.qlogo.cn/headimg_dl?dst_uin=1647075274&spec=100',
          userName: '全民较真',
          content:
            '你好，《国务院客户端》截止4月18日18时部分地区疫情风险情况，将北京市朝阳区列为高风险地区。',
        },
      },
      {
        userAvatar: 'http://q2.qlogo.cn/headimg_dl?dst_uin=1647075274&spec=100',
        userName: '@cname',
        time: '@DATETIME("yyyy-MM-dd")',
        content: 'A型血容易感染新冠病毒是真的吗？',
        reply: {
          userAvatar:
            'http://q2.qlogo.cn/headimg_dl?dst_uin=1647075274&spec=100',
          userName: '全民较真',
          content:
            '目前已知的是，新型冠状病毒主要是通过飞沫传播和接触传播，还未发现蚊子传播新型冠状病毒的证据。推荐阅读这篇',
          link:
            'https://vp.fact.qq.com/article?id=c5ffa22df8e1f01bd9e8a0f778168310',
        },
      },
      {
        userAvatar: 'http://q2.qlogo.cn/headimg_dl?dst_uin=1647075274&spec=100',
        userName: '@cname',
        time: '@DATETIME("yyyy-MM-dd")',
        content: '开空调会加速新冠病毒传播',
        reply: {
          userAvatar:
            'http://q2.qlogo.cn/headimg_dl?dst_uin=1647075274&spec=100',
          userName: '全民较真',
          content:
            '是的！根据环球网信息，驻马店市高一、高二年级4月27日返校复学。',
        },
      },
      {
        userAvatar: 'http://q2.qlogo.cn/headimg_dl?dst_uin=1647075274&spec=100',
        userName: '@cname',
        time: '@DATETIME("yyyy-MM-dd")',
        content: '龙岗爱联社区昨天有确诊病例',
        reply: {
          userAvatar:
            'http://q2.qlogo.cn/headimg_dl?dst_uin=1647075274&spec=100',
          userName: '全民较真',
          content:
            '据中国新闻网消息，巴黎的非饮用水系统在4月19日检测出“微量”新冠病毒。巴黎市政部门管理的实验室在测试的27个采样点中的4个中发现了“微量”病毒，巴黎市政府随即暂停使用非饮用水系统。',
        },
      },
      {
        userAvatar: 'http://q2.qlogo.cn/headimg_dl?dst_uin=1647075274&spec=100',
        userName: '@cname',
        time: '@DATETIME("yyyy-MM-dd")',
        content: '中考有没有延迟',
        reply: {
          userAvatar:
            'http://q2.qlogo.cn/headimg_dl?dst_uin=1647075274&spec=100',
          userName: '全民较真',
          content:
            '是的~据新京报消息，京津冀健康状态于4月17日宣告互认。北京市已要求社区、村对河北、天津来京人员及从两地返京人员，在健康码状态无异常时不再要求隔离，正在隔离中的就地解除隔离。',
        },
      },
      {
        userAvatar: 'http://q2.qlogo.cn/headimg_dl?dst_uin=1647075274&spec=100',
        userName: '@cname',
        time: '@DATETIME("yyyy-MM-dd")',
        content: '京津冀来往是不是不用隔了了',
        reply: {
          userAvatar:
            'http://q2.qlogo.cn/headimg_dl?dst_uin=1647075274&spec=100',
          userName: '全民较真',
          content:
            '目前全国多省市针对体育中考及中考时间选择延期，具体时间安排建议多多关注各省市官方通知哦~',
        },
      },
      {
        userAvatar: 'http://q2.qlogo.cn/headimg_dl?dst_uin=1647075274&spec=100',
        userName: '@cname',
        time: '@DATETIME("yyyy-MM-dd")',
        content: '法国巴黎自来水中检测出新冠病毒是真的吗？',
        reply: {
          userAvatar:
            'http://q2.qlogo.cn/headimg_dl?dst_uin=1647075274&spec=100',
          userName: '全民较真',
          content:
            '据深圳市卫健委信息，20日当天深圳无新增确诊病例和无症状感染者。',
        },
      },
      {
        userAvatar: 'http://q2.qlogo.cn/headimg_dl?dst_uin=1647075274&spec=100',
        userName: '@cname',
        time: '@DATETIME("yyyy-MM-dd")',
        content: '驻马店市高一高二在4月27号开学是真的吗',
      },
      {
        userAvatar: 'http://q2.qlogo.cn/headimg_dl?dst_uin=1647075274&spec=100',
        userName: '@cname',
        time: '@DATETIME("yyyy-MM-dd")',
        content: '蚊子会传播新冠状病毒吗',
      },
      {
        userAvatar: 'http://q2.qlogo.cn/headimg_dl?dst_uin=1647075274&spec=100',
        userName: '@cname',
        time: '@DATETIME("yyyy-MM-dd")',
        content: '北京朝阳区被列为最高风险区是真的么？',
        reply: {
          userAvatar:
            'http://q2.qlogo.cn/headimg_dl?dst_uin=1647075274&spec=100',
          userName: '全民较真',
          content:
            '据河北省卫健委消息，4月20日0-24时，河北省无新增报告新型冠状病毒肺炎确诊病例。',
        },
      },
    ],
  }),
  'GET /api/newQuestion': mockjs.mock({
    question: [
      {
        userAvatar: 'http://q2.qlogo.cn/headimg_dl?dst_uin=1647075274&spec=100',
        userName: '@cname',
        time: '@DATETIME("yyyy-MM-dd")',
        content: '4月26日浙江大学能开学么',
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
        content: '听说浙江大学要开学？',
        reply: null,
      },
    ],
  }),
  'GET /api/hotSearch': mockjs.mock({
    hotSearch: [
      {
        title: '组合用羟氯喹阿奇霉素和硫酸锌能有效治疗新冠肺炎？',
        id: 72,
      },
      {
        title: '美国纽约殡葬公司员工累倒午睡，被同事误当尸体火化',
        id: 39,
      },
      {
        title: '4月20日北京市朝阳区被列为疫情高风险地区',
        id: 77,
      },
      {
        title: '美国纽约大量青壮年一发病就上呼吸机，是ADE导致',
        id: 98,
      },
      {
        title: '北京西站出现大量白衣人，意味着北京疫情大爆发',
        id: 95,
      },
      {
        title: '有论文证明新冠病毒可以通过鞋底传播4米',
        id: 96,
      },
      {
        title: '比尔·盖茨利用新冠疫情控制人口，完成人类清除计划',
        id: 48,
      },
      {
        title: '美国基于唾液的新冠病毒检测方法准确率100%',
        id: 87,
      },
      {
        title: '中国象棋已被印度申遗6次',
        id: 75,
      },
      {
        title: '特朗普请巫师到白宫施法以驱除新冠病毒',
        id: 29,
      },
      {
        title: '无症状感染者是新冠病毒后期的特征',
        id: 18,
      },
      {
        title: '氯喹和羟氯喹可以有效治疗新冠肺炎',
        id: 20,
      },
      {
        title: '北京市于4月12日官宣高三初三年级返校时间',
        id: 89,
      },
      {
        title: '贵州省通知高一高二、初一初二4月28日作开学准备',
        id: 39,
      },
      {
        title: '张文宏说武汉已经实现群体免疫',
        id: 85,
      },
      {
        title: '北京市于4月8日宣布高三年级4月27日开学',
        id: 71,
      },
      {
        title: '柳州奖励援鄂医疗队员每人一辆汽车',
        id: 42,
      },
      {
        title: '广东省各级各类学校于4月27日起分批返校',
        id: 84,
      },
      {
        title: '河北省高三4月23日开学，初三5月7日开学',
        id: 79,
      },
      {
        title: '上海高三年级、初三年级于4月27日返校开学',
        id: 18,
      },
      {
        title: '张文宏医生自曝收入和全家福',
        id: 40,
      },
    ],
  }),
};
