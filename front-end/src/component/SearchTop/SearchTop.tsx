import React, { useEffect, useState, createRef, RefObject } from 'react';
import styles from './SearchTop.less';
import stylesCommon from '@/css/common.less';
import * as Utility from '@/Utility/utils';
import { history } from 'umi';

export const SearchTop = (props: { isNav: boolean,display?:boolean,Ref?: RefObject<HTMLInputElement>,update?:(w:string)=>void }) => {
  const [isShow, setIsShow] = useState(false);
  const [focus, setFocus] = useState(false);
  const [text,setText]=useState("");
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
      if(props.Ref?.current!=null)
        setText(props.Ref?.current.value)
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

  const handleSearch=()=>{
    if(props.update)
      props.update(text);
  }

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
          ref={props.Ref}
        />
      </div>
      <div
        className={Utility.styleMerge([
          styles.SearchCancel,
          stylesCommon.ccFlexRow,
        ])}
        onClick={text!==""?handleSearch:handleCancel}
      >
        {text!==""||props.isNav?"搜索":"取消"}
      </div>
    </div>
    {props.isNav||<div className={styles.block}/>}
    </div>
  );
};
