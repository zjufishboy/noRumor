import React from 'react';
import INews from '@/types/INews';
import styles from './News.less';
import stylesCommon from '@/css/common.less';
import * as Utility from '@/Utility/utils';
export const RumorNew = (props: { news: INews }) => {
  let { news } = props;
  return (
    <div
      className={Utility.styleMerge([
        styles.rumorNewsItem,
        stylesCommon.scFlexRow,
      ])}
    >
      <div
        className={Utility.styleMerge([
          styles.newsText,
          stylesCommon.csFlexColumn,
        ])}
      >
        <div style={{fontWeight:400}}>{news.title}</div>
        <div style={{color:"#828282"}}>{news.time}</div>
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
          style={{ backgroundImage: `url(${news.picture})` }}
        ></div>
      </div>
    </div>
  );
};
