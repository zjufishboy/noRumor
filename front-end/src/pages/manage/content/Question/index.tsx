import React, { useState, createRef, useRef } from 'react';
import styles from './index.less';
import stylesCommon from '@/css/common.less';
import * as Utility from '@/Utility/utils';
import { styleMerge } from '@/Utility/utils';
import { QBar } from '@/component/Qbar/Qbar';
import { QuestionDefault, ReplyDefault } from '@/types/IQuestion';
import { message,Input,Button } from 'antd';
import { TimeTranslate } from '@/Utility/OtherUtils';

export const QuestionManage=()=>{
    const [data,setData]=useState(QuestionDefault)
    const chooseQuestion=(qid:number)=>{
        Utility.NetworkUtility.getQuestionByQID(qid)
        .then(res=>{setData(res);});
    }
    const updateData=()=>{
        Utility.NetworkUtility.updateQuestion(data.questionContent,data.qid)
            .then(res=>{
                if(!res.status){
                    message.error("修改失败")
                }
                else{
                    message.success("修改成功")
                }
            })
        console.log(data.reply)
        if(data.reply?.replyContent){
            if(data.reply.pid==0){
                Utility.NetworkUtility.createReply(data.reply?.replyContent||"",data.qid)
                            .then(res=>{
                                if(!res.status){
                                    message.error("回复失败")
                                }
                                else{
                                    message.success("回复成功")
                                }
                            })
            }
            else{
                Utility.NetworkUtility.updateReply(data.reply.replyContent,data.reply.pid)
                .then(
                    res=>{
                        if(!res.status){
                            message.success("修改回复失败")
                        }
                        else{
                            message.success("修改回复成功")
                        }
                    }
                )
            }
        }
        
        
    }

    return (
        <div className={styleMerge([styles.questionPage,stylesCommon.scFlexRow])}>
            <div className={styles.preview}>
                <QBar isPreview={true} clkfunct={chooseQuestion}/>
            </div>
            <div className={styleMerge([styles.Info,stylesCommon.ccFlexColumn])}>
                <div className={styleMerge([styles.infoContent,stylesCommon.scFlexColumn])}>
                    <Input.Search 
                        addonBefore={"问题"} 
                        enterButton="载入" 
                        onSearch={()=>{
                            if(data.qid>0){
                                chooseQuestion(data.qid);
                            }
                            else{
                                message.error("请输入正确的编号");
                            }
                        }}
                        value={data.qid===0?"":data.qid}
                        onChange={(e)=>{setData({...data,qid:parseInt(e.target.value||"0")})}}
                    />
                    <Input addonBefore={"用户"} value={data.uid}/>
                    <Input addonBefore={"时间"} value={data.thetime && TimeTranslate(data.thetime)}/>
                    <div className={stylesCommon.ccFlexRow} style={{width:"100%",backgroundColor:"white"}}>
                        内容
                    </div>
                    <Input.TextArea 
                        style={{resize: "none"}} 
                        value={data.questionContent}
                        onChange={(e)=>{setData({...data,questionContent:e.target.value})}}/>
                    <div className={stylesCommon.ccFlexRow} style={{width:"100%",backgroundColor:"white"}}>
                        回复
                    </div>
                    <Input.TextArea 
                        style={{resize: "none"}} 
                        value={data.reply?.replyContent}
                        onChange={(e)=>{
                            if(!data.reply){
                                data.reply={...ReplyDefault,qid:data.qid}
                            }
                            setData({...data,reply:{...data.reply,replyContent:e.target.value}})
                        }}
                    />
                    <Button style={{width:"100%"}} onClick={updateData}>修改</Button>
                </div>
            </div>
        </div>
    )
}