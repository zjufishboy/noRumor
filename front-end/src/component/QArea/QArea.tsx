import React, {
  useState,
  useEffect,
  ChangeEvent,
  useRef,
  createRef,
} from 'react';
import styles from './QArea.less';
import stylesCommon from '@/css/common.less';
import * as Utility from '@/Utility/utils';
interface HTMLInputEvent<HTMLInputElement> extends FocusEvent {
  target: HTMLInputElement & EventTarget;
}

export const QArea = (props: {}) => {
  const [Focus, setFocus] = useState(false);
  const [Text, setText] = useState('');
  const content = createRef<HTMLTextAreaElement>();
  const handleFocus = () => {
    setFocus(!Focus);
  };
  const handleTextChange = () => {
    setFocus(!Focus);
    if (content.current != null) setText(content.current.value);
  };
  const handleClick=()=>{
    let uid=Utility.StorageUtility.getUserInfo().uid;
    if(uid<0){
      alert("请先登录");
    }
    else{
      Utility.NetworkUtility.PostNewQuestion(Text)
        .then(res=>{
          if(res.status){
            alert("提交成功")
          }
          else{
            alert("提交失败")
          }
        })
    }
  }
  return (
    <div style={{ width: '100%' }}>
      <textarea
        className={Utility.styleMerge([styles.QArea,stylesCommon.ccFlexRow])}
        placeholder={Focus ? '' : '点击输入问题'}
        onFocus={handleFocus}
        onChange={handleTextChange}
        onBlur={handleFocus}
        ref={content}
      />
      <div
        className={Utility.styleMerge([
          Text === '' ? styles.buttonDisabled : styles.buttonActive,
          stylesCommon.ccFlexRow,
        ])}
        onClick={Text === ''?undefined:handleClick}
      >
        提交问题
      </div>
    </div>
  );
};
