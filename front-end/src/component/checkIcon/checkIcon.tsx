import React, { useState } from 'react';
import styles from './checkIcon.less';
import stylesCommon from '@/css/common.less';
import { SearchTop } from '@/component/SearchTop/SearchTop';
import INewsDetails from '@/types/INewDetails';
import * as Utility from '@/Utility/utils';

export const CheckIcon=(props:{status:boolean,type:number})=>{
    const {status,type}=props;
    const typeWord=[["谣言"],["实情"]]
    return (
        <span className={styles.outside}>
            <span className={status?styles.statusT:styles.statusF}>
                {status?"真":"假"}
            </span>
            <span className={status?styles.typeT:styles.typeF}>
                {typeWord[status?1:0][type]}
            </span>
        </span>
    )
}