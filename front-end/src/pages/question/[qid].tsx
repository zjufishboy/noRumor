import React, { useState } from 'react';
import styles from './question.less';
import stylesCommon from '@/css/common.less';
import { SearchTop } from '@/component/SearchTop/SearchTop';
import INewsDetails from '@/types/INewDetails';
import * as Utility from '@/Utility/utils';
import { CheckIcon } from '@/component/checkIcon/checkIcon';
const DefaultNewsDetails: INewsDetails = {
  title: '意大利警察当街把65岁以上的老年人都抓了关起来',
  time: '2020-02-08',
  picture: '',
  status: false,
  subtitle: '意大利不许老人上街，上街就抓。是真的吗？——来自用户@綦宜丰的提问。',
  source: '较真团队',
  experts: '浙大较真',
  details:"此事并不是发生在现在的意大利。首先，视频中的人说的并不是意大利语；其次，视频中警察穿的防弹背心上有“polis”的标志，而意大利语中警察并不是“polis”而是“polizia”；此外，视频中没有人戴口罩，现在的疫情形势下，意大利街上几乎已经看不到没戴口罩的人了。",
  links: '',
};
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
  const [data, setData] = useState(DefaultNewsDetails);

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
            backgroundImage: `url(${data.status?status.right:status.wrong})`,
            position:"absolute",
            right:0,
            top:"0.08rem"
          }}
        />
      </div>
      
      {/** 页面内容 */}
      
      <div className={styles.content}>
          <div className={styles.check}>
            辟谣查验：<CheckIcon status={data.status} type={0}/>
          </div>
          <div style={{fontSize:"0.17rem"}}>
            {data.details}
          </div>
          <div className={styles.checker}>
            查证者：<span className={styles.checkerName}>{data.experts}</span>
          </div>
          <div className={styles.infos}>
            <span style={{marginLeft:0}}>时间:{data.time}</span>
            <span style={{marginLeft:"0.2rem"}}>来源：{data.source}</span> 
            <a style={{color:"black",marginLeft:"0.2rem"}} href={data.links}>相关链接</a>            
          </div>
      </div>
    </div>
  );
};
