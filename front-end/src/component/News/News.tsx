import React from 'react';
import INews from '@/types/INews';
import styles from './News.less';
import stylesCommon from '@/css/common.less';

export const RumorNew=(props:{news:INews})=>{
    let {news}=props;
    return <div className={styles.rumorNewsItem+stylesCommon.ccFlexRow}>
        {news.title}
    </div>;
}