import React from 'react';
import INews from '@/types/INews';
import styles from './ButtonBar.less';
import stylesCommon from '@/css/common.less';
import * as Utility from '@/Utility/utils';
import {Link} from 'umi'

interface Button {
  icon: string;
  link: string;
  name: string;
}

const coverButtons = (Button: Button,key:number) => (
  <div className={styles.ButtonSingle} key={key}>
    <div className={Utility.styleMerge([styles.ButtonIconOutside,stylesCommon.ccFlexRow])}>
    <div
      className={Utility.styleMerge([stylesCommon.centerContaionBG, styles.ButtonIcon])}
      style={{backgroundImage:`url(${Button.icon})`}}
    />
    </div>
    <div className={Utility.styleMerge([styles.ButtonSingleText,stylesCommon.ccFlexRow])}>
        <Link to={Button.link} style={{color:"black"}}>{Button.name}</Link>
    </div>
  </div>
);
const ButtonInfo: Button[] = [
  {
    icon: '//mat1.gtimg.com/www/coral/jiaozhen/imgs/feiyan_topcell1.png',
    link: '',
    name: '提问较真',
  },
  {
    icon: '//mat1.gtimg.com/www/coral/jiaozhen/imgs/feiyan_topcell2.png',
    link: '',
    name: '疫情数据',
  },
  {
    icon: '//mat1.gtimg.com/www/coral/jiaozhen/imgs/feiyan_topcell3.png',
    link: '',
    name: '疫情调查',
  },
];
export const ButtonBar = (props:{}) => {
  return (
    <div
      className={Utility.styleMerge([styles.ButtonBar, stylesCommon.bcFlexRow])}
    >
      {ButtonInfo.map(coverButtons)}
    </div>
  );
};
