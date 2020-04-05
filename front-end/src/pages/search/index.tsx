import React from 'react';
import styles from './index.less';
import { SearchTop } from '@/component/SearchTop/SearchTop';
import { SearchList } from '@/component/SearchList/SearchList';

export default () => {
  return (
    <div className={styles.Search}>
      <SearchTop isNav={false}/>
      <SearchList/>
    </div>
  );
}
