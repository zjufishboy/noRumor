import React from 'react';
import styles from './index.less';
import stylesCommon from '@/css/common.less';
import * as Utility from '@/Utility/utils';
export default ()=>{
    return (
        <div className={Utility.styleMerge([styles.managePage,stylesCommon.ccFlexColumn])}>
            管理页面
        </div>
    )
}