import React from 'react';
import INews from '@/types/INews';
import styles from './Header.less';
import stylesCommon from '@/css/common.less';
import { HeaderSearch } from '../Search/Search';
import * as Utility from '@/Utility/utils'



export const Header=(props:{hotSearchWord:string})=>{
    let {hotSearchWord}=props;
    return (
        <div className={Utility.styleMerge([styles.noRumorHeader,stylesCommon.scFlexColumn,stylesCommon.centerBG])}>
            <div className={styles.noRumorHeaderTitle}>
                新型冠状病毒肺炎辟谣平台
            </div>
            <HeaderSearch news={hotSearchWord}/>
            <div className={styles.noRumorProject}>
                2019.SE.ZJU
            </div>
        </div>
    )
}