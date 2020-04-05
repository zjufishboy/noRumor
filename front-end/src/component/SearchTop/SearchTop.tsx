import React, { useEffect, useState, createRef } from 'react';
import INews from '@/types/INews';
import styles from './SearchTop.less';
import stylesCommon from '@/css/common.less';
import * as Utility from '@/Utility/utils';
import { history } from 'umi';

export const SearchTop = (props: { isNav: boolean,display?:boolean }) => {
  const [isShow, setIsShow] = useState(false);
  const [focus, setFocus] = useState(false);
  const [text,setText]=useState("");
  const search = createRef<HTMLInputElement>();
  const handleScroll = () => {
    if (window.scrollY > window.innerWidth * 0.4) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  };

  const listen = () => {
    window.addEventListener('scroll', handleScroll);
  };

  const cleanListen = () => {
    window.removeEventListener('scroll', handleScroll);
  };

  const handleFocus = () => {
    if (props.isNav) {
      history.push('/search');
    } else {
      setFocus(!focus);
    }
  };

  const handleBlur = () => {
    setFocus(!focus);
  };

  const handleCancel=()=>{
    if(props.isNav){
        history.push("/search")
    }
    else{
        history.goBack()
    }
  }
  const handleTextChange=()=>{
      if(search.current!=null)
        setText(search.current.value)
  }

  useEffect(() => {
    if(props.isNav&&!props.display){
        listen();
        return cleanListen;
    }
    else{
      setIsShow(true);
    }
  }, []);

  return (
    <div>
    <div
      className={Utility.styleMerge([styles.SearchTop, stylesCommon.ccFlexRow])}
      style={{ display: `${(!props.isNav)||isShow ? '' : 'none'}` }}
    >
      <div
        className={Utility.styleMerge([
          styles.SearchImage,
          stylesCommon.ccFlexRow,
        ])}
      >
        辟谣
      </div>
      <div
        className={Utility.styleMerge([
          styles.SearchContent,
          stylesCommon.ccFlexRow,
        ])}
      >
        <input
          className={styles.SearchInput}
          placeholder={focus?"":"输入关键词查一查"}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleTextChange}
          ref={search}
        />
      </div>
      <div
        className={Utility.styleMerge([
          styles.SearchCancel,
          stylesCommon.ccFlexRow,
        ])}
        onClick={handleCancel}
      >
        {text!==""||props.isNav?"搜索":"取消"}
      </div>
    </div>
    {props.isNav||<div className={styles.block}/>}
    </div>
  );
};
