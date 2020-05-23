import React, { createRef, useState } from 'react';
import styles from './index.less';
import { SearchTop } from '@/component/SearchTop/SearchTop';
import { SearchList } from '@/component/SearchList/SearchList';

export default () => {
  const [word,setWord]=useState("");
  const refWord=createRef<HTMLInputElement>();
  const updateWord=(w:string)=>{
    setWord(w);
  }
  return (
    <div className={styles.Search}>
      <SearchTop isNav={false} Ref={refWord} update={updateWord}/>
      <SearchList word={word}/>
    </div>
  );
}
