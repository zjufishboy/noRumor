import React, { useState, useEffect } from 'react';
import styles from './Avatar.less';
import stylesCommon from '@/css/common.less';
import * as Utility from '@/Utility/utils';
import { UserInfoDefault } from '@/types/IUserInfo';

const ImageUrl = {
    unlogin: 'http://img.fishstar.xyz/norumor/%E7%99%BB%E9%99%86.png',
    login: 'http://q2.qlogo.cn/headimg_dl?dst_uin=1647075274&spec=100',
};


export const Avatars = (props: {}) => {
    const [user,setUser]=useState(UserInfoDefault);
    const [isfirst,setFirst]=useState(true)
    useEffect(()=>{
        if(isfirst){
            setFirst(false);
            let userData=Utility.StorageUtility.getUserInfo();
            setUser(userData)
        }
    },[user])
    const handleClick=()=>{
        Utility.NetworkUtility.login();
    }
    return (
        <div
            className={Utility.styleMerge([styles.Avatars, stylesCommon.scFlexRow])}
            onClick={user.uid>=0?undefined:handleClick}
        >
            <div
                className={Utility.styleMerge([styles.Avatar, stylesCommon.centerBG,stylesCommon.ccFlexRow])}
            >
                {user.userName[0]}
            </div>
            <div style={{ marginLeft: 10 }}>{user.uid>=0?`${user.userName}，欢迎向我们提问`:"点击登录，向我们提问"}</div>
        </div>
    );
};
