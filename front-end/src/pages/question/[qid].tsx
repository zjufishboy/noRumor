import React from 'react';
import styles from './index.less';

export default (props:any) => {
  let {qid}=props.match.params
  return (
    <div>
      <h1 className={styles.title}>Page question:{qid}</h1>
    </div>
  );
}
