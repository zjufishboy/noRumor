import React, { useEffect } from 'react';
import styles from './index.less';
import * as Utility from '@/Utility/utils';
import { Avatars } from '@/component/Avatar/Avatar';
import { QArea } from '@/component/QArea/QArea';
import { QBar } from '@/component/Qbar/Qbar';

export default () => {
  useEffect(()=>{Utility.OtherUtility.checkToken()},[])
  return (
    <div style={{backgroundColor:"#efefef"}}>
      <div className={styles.questionBar}>
        <Avatars/>
        <QArea/>
      </div>
      <QBar/>
    </div>
  );
}
