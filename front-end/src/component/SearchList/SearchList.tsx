import React, { useState, useEffect } from 'react';
import INews from '@/types/INews';
import styles from './SearchList.less';
import stylesCommon from '@/css/common.less';
import * as Utility from '@/Utility/utils';
import { history, Link } from 'umi';
import { ISearchResultItem } from '@/types/ISearch';

export const SearchList = () => {
  const [data, setData] = useState([]);
  const coverHotSearch = (hotSearch: ISearchResultItem) => (
    <div className={styles.SearchListItem}>
      <Link to={`/question/${hotSearch.id}`} style={{ color: 'black' }}>
        {hotSearch.title}
      </Link>
    </div>
  );
  useEffect(() => {
    Utility.getHotSearch().then(res => setData(res));
  }, []);
  return (
    <div className={Utility.styleMerge([styles.SearchList,stylesCommon.ccFlexColumn])}>
      <div className={styles.Head}>大家都在搜：</div>
      <div className={styles.hotSearchList}>
      {data.map(coverHotSearch)}
      </div>
    </div>
  );
};
