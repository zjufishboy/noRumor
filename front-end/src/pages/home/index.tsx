import React, { useState, useEffect } from 'react';
import styles from './index.less';
import * as Utility from '@/Utility/utils';
import INews from '@/types/INews';
import { RumorNew } from '@/component/News/News';
import { Header } from '@/component/Header/Header';
import { ButtonBar } from '@/component/ButtonBar/ButtonBar';


export default () => {
  const [data,setData]=useState([])
  const [hotWord,setHotWord]=useState("")
  const UpdateData=()=>{
    Utility.getAllNews().then(newData=>setData(newData))
    Utility.getHotNews().then(hot=>setHotWord(hot))
  }
  const coverNews=(news:INews,key:number)=><RumorNew news={news} key={key}/>
  useEffect(UpdateData,[])
  
  return (
    <div className={styles.noRumorHome}>
      <Header hotSearchWord={hotWord}/>
      <ButtonBar />
      <div className={styles.noRumorHomeNews}>
        {data.map(coverNews)}
      </div>
    </div>
  );
}
