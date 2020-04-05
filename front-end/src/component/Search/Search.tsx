import React from 'react';
import INews from '@/types/INews';
import styles from './Search.less';
import stylesCommon from '@/css/common.less';
import * as Utility from '@/Utility/utils';
import { history } from 'umi';

export const HeaderSearch = (props: { news: string }) => {
  let { news } = props;

  const handleClick=()=>{
      history.push("/search")
  }
  return (
    <div
      className={Utility.styleMerge([
        styles.HeaderSearch,
        stylesCommon.scFlexRow,
      ])}
      onClick={handleClick}
    >
      <div
        className={Utility.styleMerge([
          styles.SearchInput,
          stylesCommon.wordHidden,
          stylesCommon.scFlexRow,
        ])}
      >
        <span
          className={Utility.styleMerge([
            stylesCommon.wordHidden,
            styles.SearchContent,
          ])}
        >
          {news}
        </span>
      </div>
      <div
        className={Utility.styleMerge([
          styles.SearchButton,
          stylesCommon.ccFlexRow,
        ])}
      >
        搜索
      </div>
    </div>
  );
};
