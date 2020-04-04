import React, { useState, useEffect } from 'react';
import INews from '@/types/INews';
import styles from './Avatar.less';
import stylesCommon from '@/css/common.less';
import * as Utility from '@/Utility/utils';

const ImageUrl = {
    unlogin: 'http://img.fishstar.xyz/norumor/%E7%99%BB%E9%99%86.png',
    login: 'http://q2.qlogo.cn/headimg_dl?dst_uin=1647075274&spec=100',
};


export const Avatars = (props: {}) => {
    const [user,setUser]=useState(Utility.DefaultState);
    const [isfirst,setFirst]=useState(true)
    useEffect(()=>{
        if(isfirst){
            setFirst(false);
            let userData=Utility.getState();
            setUser(userData)
        }
    },[user])
    const handleClick=()=>{
        Utility.login(()=>{setUser(Utility.getState())})
    }
    return (
        <div
            className={Utility.styleMerge([styles.Avatars, stylesCommon.scFlexRow])}
            onClick={handleClick}
        >
            <div
                className={Utility.styleMerge([styles.Avatar, stylesCommon.centerBG])}
                style={{ backgroundImage: `url(${user.avatar})` }}
            />
            <div style={{ marginLeft: 10 }}>{user.isLogin?`${user.userName}，欢迎向我们提问`:"点击登录，向我们提问"}</div>
        </div>
    );
};
