import React, { useState, useEffect } from 'react';
import styles from './QBar.less';
import stylesCommon from '@/css/common.less';
import * as Utility from '@/Utility/utils';
import { IQuestion, IReply } from '@/types/IQuestion';
import { Link } from 'umi';

const fct = ['热门提问', '最新提问', '我的提问'];

export const QBar = () => {
  const [now, setNow] = useState(0);
  const [data, setData] = useState([]);
  const coverfct = (fct: string, key: number) => (
    <div
      className={stylesCommon.ccFlexRow}
      style={{ width: '33%', height: '100%' }}
      onClick={() => {
        handleClickKey(key)
          .then(res => setData(res))
          .then(() => {
            setNow(key);
          });
      }}
      key={key}
    >
      {fct}
    </div>
  );
  const handleClickKey = async (key: number) => {
    if (key == 0) {
      return await Utility.NetworkUtility.getHotQuestion();
    } else if (key == 1) {
      return await Utility.NetworkUtility.getNewQuestion();
    } else return await Utility.NetworkUtility.getMyQuestion();
  };
  const coverReply = (reply: IReply) => (
    <div className={styles.reply}>
      {"辟谣小浙"}:{reply.replyContent}
      {/* {reply. && (
        // <Link style={{ color: '#222' }} to={`/question/${reply.link}`}>
        //   {' '}
        //   查看详情>>>
        // </Link>
        <span onClick={()=>{window.location.href=`${reply.link}`}}>
          {' '}
          查看详情>>>
        </span>
      )} */}
    </div>
  );
  const coverQuestion = (question: IQuestion, key: number) => (
    <div className={styles.question} key={`Question${key}`}>
      <div
        className={stylesCommon.scFlexRow}
        style={{ width: '100%', height: '0.25rem' }}
      >
        <div
          className={Utility.styleMerge([styles.avatar, stylesCommon.centerBG])}
          style={{ backgroundImage: `url(${""})` }}
        />
        <div style={{ marginLeft: 10, fontSize: '0.14rem', color: '#808080' }}>
          {question.uid}
        </div>
      </div>
      <div className={styles.content}>{question.questionContent}</div>
      <div className={styles.time}>{question.thetime}</div>
      {question.reply && coverReply(question.reply)}
    </div>
  );
  useEffect(() => {
    handleClickKey(0)
      .then(res => setData(res))
      .then(() => {
        setNow(0);
      });
  }, []);
  return (
    <div style={{ width: '100%' }}>
      <div
        className={Utility.styleMerge([
          styles.replyBar,
          stylesCommon.ccFlexRow,
        ])}
      >
        {fct.map(coverfct)}
      </div>
      <div
        className={styles.hotBottom}
        style={{
          marginLeft: `${now * 33 + 11.5}%`,
          marginRight: `${(2 - now) * 33 + 11.5}%`,
        }}
      />
      <div>{data.map(coverQuestion)}</div>
    </div>
  );
};
