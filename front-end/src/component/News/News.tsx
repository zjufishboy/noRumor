import React from 'react';
import {INews} from '@/types/INews';
import styles from './News.less';
import stylesCommon from '@/css/common.less';
import * as Utility from '@/Utility/utils';
import { history } from 'umi';
export const RumorNew = (props: { news: INews ,clkfunct?:Function}) => {
  let { news } = props;
  const handleClick=(pid:number)=>{
    history.push(`/question/${pid}`)
  }
  return (
    <div
      className={Utility.styleMerge([
        styles.rumorNewsItem,
        stylesCommon.scFlexRow,
      ])}
      style={{cursor:props.clkfunct && "pointer"}}
      onClick={()=>{
        if(props.clkfunct!==undefined){
          props.clkfunct(news.pid)
        }
        else{
          handleClick(news.pid);
        }
      }}
    >
      <div
        className={Utility.styleMerge([
          styles.newsText,
          stylesCommon.csFlexColumn,
        ])}
      >
        <div style={{fontWeight:400}}>({news.pid}){news.title}[{news.truth?"真":"假"}]</div>
        <div style={{color:"#828282"}}>{Utility.OtherUtility.TimeTranslate(news.thetime)}</div>
      </div>
      <div
        className={Utility.styleMerge([
          styles.newsPhotoOutside,
          stylesCommon.ccFlexColumn,
        ])}
      >
        <div
          className={Utility.styleMerge([
            stylesCommon.centerBG,
            styles.newsPhoto,
          ])}
          style={{ backgroundImage: `url(${news.pic})` }}
        ></div>
      </div>
    </div>
  );
};
