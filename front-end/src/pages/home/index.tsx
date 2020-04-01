import React, { useState, useEffect } from 'react';
import styles from './index.less';
import * as Utility from '@/Utility/utils';
import INews from '@/types/INews';
import { RumorNew } from '@/component/News/News';


export default () => {
  const [data,setData]=useState([])
  const UpdateData=()=>{
    Utility.getAllNews().then(newData=>setData(newData))
  }
  const coverNews=(news:INews)=><RumorNew news={news}/>
  useEffect(UpdateData,[])
  
  return (
    <div className={styles.noRumorHome}>
      {/* <h1 className={styles.title}>Page home</h1> */}
      <div>
        this is a head
      </div>
      <div>
        this is a button bar
      </div>
      <div>
        this is the news
        {data.map(coverNews)}
      </div>
    </div>
  );
}
