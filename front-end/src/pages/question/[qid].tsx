import React, { useState, useEffect } from 'react';
import styles from './question.less';
import stylesCommon from '@/css/common.less';
import { SearchTop } from '@/component/SearchTop/SearchTop';
import * as Utility from '@/Utility/utils';
import { CheckIcon } from '@/component/checkIcon/checkIcon';
import { newsDefault } from '@/types/INews';
import { UserInfoDefault } from '@/types/IUserInfo';

const quote = {
  left: '//mat1.gtimg.com/www/coral/jiaozhen/imgs/title_quot_left.png',
  right: '//mat1.gtimg.com/www/coral/jiaozhen/imgs/title_quot_right.png',
};

const status={
  right:"//mat1.gtimg.com/www/coral/jiaozhen/imgs/marks/t-1.png",
  wrong:"//mat1.gtimg.com/www/coral/jiaozhen/imgs/marks/f-1.png"
}

export default (props: any) => {
  let { qid } = props.match.params;
  const [data, setData] = useState(newsDefault);
  const [user,setUser]=useState(UserInfoDefault);
  useEffect(()=>{
    Utility.OtherUtility.checkToken()
    Utility.NetworkUtility.getNewsByPID(qid)
      .then(res=>{setData(res);return res})
      .then(res=>{
        Utility.NetworkUtility.GetUserInfo(parseInt(res.uid))
          .then(res=>setUser(res.info.data))
      })

  },[])
  return (
    <div>
      <SearchTop isNav={true} display={true} />
      
      {/** 页面标题 */}
      
      <div className={styles.Titles}>
        <div className={styles.title}>{data.title}</div>
        <div className={stylesCommon.scFlexRow}>
        <div
          className={Utility.styleMerge([stylesCommon.centerBG,styles.quote])}
          style={{
            backgroundImage: `url(${quote.left})`,
          }}
        />
        </div>
        <div className={styles.subtitleOutside}>
          流传说法：<span className={styles.subtitle}>{data.subtitle}</span>
        </div>
        <div  className={stylesCommon.ecFlexRow}>
        <div
          className={Utility.styleMerge([stylesCommon.centerBG,styles.quote])}
          style={{
            backgroundImage: `url(${quote.right})`,
          }}
        />
        </div>
        <div
          className={Utility.styleMerge([stylesCommon.centerBG])}
          style={{
            width:"0.68rem",
            height:"0.8rem",
            backgroundImage: `url(${data.truth?status.right:status.wrong})`,
            position:"absolute",
            right:0,
            top:"0.08rem"
          }}
        />
      </div>
      
      {/** 页面内容 */}
      
      <div className={styles.content}>
          <div className={styles.check}>
            辟谣查验：<CheckIcon status={data.truth} type={0}/>
          </div>
          <div style={{fontSize:"0.17rem"}}>
            {data.content}
          </div>
          <div className={styles.checker}>
            查证者：<span className={styles.checkerName}>{user.userName}</span>
          </div>
          <div className={styles.infos}>
            <span style={{marginLeft:0}}>时间:{Utility.OtherUtility.TimeTranslate(data.thetime)}</span>
            <span style={{marginLeft:"0.2rem"}}>来源：{user.userName}</span> 
            <a style={{color:"black",marginLeft:"0.2rem"}} href={""}>相关链接</a>            
          </div>
      </div>
    </div>
  );
};
