import React, { useState, useEffect } from 'react';
import styles from './index.less';
import * as Utility from '@/Utility/utils';
import INews from '@/types/INews';
import { RumorNew } from '@/component/News/News';
import { Header } from '@/component/Header/Header';
import { ButtonBar } from '@/component/ButtonBar/ButtonBar';
import { SearchTop } from '@/component/SearchTop/SearchTop';
import { UserInfoDefault } from '@/types/IUserInfo';


export default () => {
  const [data,setData]=useState([])
  const [hotWord,setHotWord]=useState("")
  const UpdateData=()=>{
    Utility.NetworkUtility.getAllNews().then(newData=>setData(newData))
    Utility.NetworkUtility.getHotNews().then(hot=>setHotWord(hot))
    Utility.StorageUtility.storeLoad()
    let token=Utility.StorageUtility.getToken()
    Utility.NetworkUtility.AuthGetUserInfo(token)
    .then(res=>{
      if(res.status){
        Utility.StorageUtility.setUserInfo(res.info.data)
      }
      else{
        Utility.StorageUtility.setUserInfo(UserInfoDefault)
      }
    });
  }
  
  const coverNews=(news:INews,key:number)=><RumorNew news={news} key={key}/>
  useEffect(UpdateData,[])
  
  return (
    <div className={styles.noRumorHome}>
      <SearchTop isNav={true}/>
      <Header hotSearchWord={hotWord}/>
      <ButtonBar />
      <div className={styles.noRumorHomeNews}>
        {data.map(coverNews)}
      </div>
    </div>
  );
}
