import React, { createRef, useState, useEffect } from 'react';
import styles from './index.less';
import * as Utility from '@/Utility/utils';
import { SearchTop } from '@/component/SearchTop/SearchTop';
import { SearchList } from '@/component/SearchList/SearchList';

export default () => {
  const [word,setWord]=useState("");
  const refWord=createRef<HTMLInputElement>();
  const updateWord=(w:string)=>{
    setWord(w);
  }
  useEffect(()=>{Utility.OtherUtility.checkToken()},[])
  return (
    <div className={styles.Search}>
      <SearchTop isNav={false} Ref={refWord} update={updateWord}/>
      <SearchList word={word}/>
    </div>
  );
}
