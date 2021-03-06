import React, { useState, useEffect } from 'react';
import styles from './QBar.less';
import stylesCommon from '@/css/common.less';
import * as Utility from '@/Utility/utils';
import { IQuestion, IReply, QuestionDefault } from '@/types/IQuestion';
import { Link } from 'umi';
import { UserInfoDefault, IUserInfo } from '@/types/IUserInfo';

const fct = ['热门提问', '最新提问', '我的提问'];
const ReplyItem = (props:{reply: IReply}) => 
(
  <div className={styles.reply}>
    {"辟谣小浙"}:{props.reply.replyContent}
    {/* {reply. && (
      // <Link style={{ color: '#222' }} to={`/question/${reply.link}`}>
      //   {' '}
      //   查看详情>>>
      // </Link>
      <span onClick={()=>{window.location.href=`${reply.link}`}}>
        {' '}
        查看详情>>>
      </span>
    )} */}
  </div>
);
const QuestionItem = (props:{question: IQuestion,clkfct?:Function}) => {
  const [user,setUser]=useState(UserInfoDefault);
  const [question,setQuestion]=useState(QuestionDefault)
  const coverReply=(reply: IReply)=>(
    <ReplyItem reply={reply}/>
  )
  useEffect(()=>{
    setQuestion(props.question)
    Utility.NetworkUtility.GetUserInfo(props.question.uid).then(res=>{
      if(res.status){
        if(res.info.data){
          setUser(res.info.data)
        }
      }
    })
    
  },[])
  return (
    <div className={styles.question} onClick={()=>{props.clkfct && props.clkfct()}}>
      <div
        className={stylesCommon.scFlexRow}
        style={{ width: '100%', height: '0.25rem' }}
      >
        <div
          className={Utility.styleMerge([styles.avatar, stylesCommon.centerBG, stylesCommon.ccFlexRow])}
        >
          {user.userName[0]}
        </div>
        <div style={{ marginLeft: 10, fontSize: '0.14rem', color: '#808080' }}>
          {user.userName}
        </div>
      </div>
      <div className={styles.content}>{question.questionContent}</div>
      <div className={styles.time}>{Utility.OtherUtility.TimeTranslate(question.thetime)}</div>
      {question.reply && coverReply(question.reply)}
    </div>
  );
}
export const QBar = (props:{isPreview?:Boolean,clkfunct?:Function}) => {
  const [now, setNow] = useState(0);
  const [data, setData] = useState([]);
  const coverfct = (fct: string, key: number) => (
    <div
      className={stylesCommon.ccFlexRow}
      style={{ 
        width: '33%', 
        height: '100%', 
        borderBottom:`1px solid ${now!==key?'white':"black"}`,
        cursor:"pointer"
      }}
      onClick={() => {
        handleClickKey(key)
          .then(res => {setData([]);setData(res)})
          .then(() => {
            setNow(key);
          });
      }}
      key={key}
    >
      {fct}
    </div>
  );
  const handleClickKey = async (key: number) => {
    if (key == 0) {
      return await Utility.NetworkUtility.getHotQuestion();
    } 
    else if (key == 1) {
      return await Utility.NetworkUtility.getNewQuestion();
    } 
    else {
      let uid=Utility.StorageUtility.getUserInfo().uid;
      if(uid>=0){
        return await Utility.NetworkUtility.getMyQuestion();
      }
      else{
        Utility.NetworkUtility.login();
      }
    }
  };
  const coverQuestion=(question:IQuestion,key:number)=>(
    <QuestionItem 
      question={question} 
      key={`Q${key}`} 
      clkfct={()=>{
        props.clkfunct&&props.clkfunct(question.qid);
      }}/>
  )
  
  useEffect(() => {
    handleClickKey(0)
      .then(res => {
        setData(res)
      })
      .then(() => {
        setNow(0);
      });
  }, []);
  return (
    <div style={{ width: '100%' }}>
      <div
        className={Utility.styleMerge([
          styles.replyBar,
          stylesCommon.ccFlexRow,
        ])}
      >
        {(props.isPreview?fct.slice(0,2):fct).map(coverfct)}
      </div>
      <div>{data.map(coverQuestion)}</div>
    </div>
  );
};
