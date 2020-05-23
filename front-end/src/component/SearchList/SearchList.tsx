import React, { useState, useEffect } from 'react';
import {INews} from '@/types/INews';
import styles from './SearchList.less';
import stylesCommon from '@/css/common.less';
import * as Utility from '@/Utility/utils';
import { history, Link } from 'umi';
import { ISearchResultItem } from '@/types/ISearch';

export const SearchList = (props:{word:string}) => {
  const [data, setData] = useState([]);
  const coverHotSearch = (hotSearch: INews,key:number) => (
    <div className={styles.SearchListItem} key={key}>
      <Link to={`/question/${hotSearch.pid}`} style={{ color: 'black' }}>
        {hotSearch.title}
      </Link>
    </div>
  );
  useEffect(() => {
    if(props.word===''){
      Utility.NetworkUtility.getHotSearch().then(res => setData(res));
    }
    else{
      setData([])
      Utility.NetworkUtility.getSearchResult(props.word).then(res => setData(res));
    }
    console.log(props.word);
  }, [props.word]);
  return (
    <div className={Utility.styleMerge([styles.SearchList,stylesCommon.ccFlexColumn])}>
      {props.word===''&&<div className={styles.Head}>大家都在搜：</div>}
      {data.length===0&&<div className={styles.HeadCenter}>搜索中</div>}
      <div className={styles.hotSearchList}>
      {data.map(coverHotSearch)}
      </div>
    </div>
  );
};
