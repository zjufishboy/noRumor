import React, { useState, useEffect, useRef, createRef } from 'react';
import styles from './index.less';
import stylesCommon from '@/css/common.less';
import * as Utility from '@/Utility/utils';
import { styleMerge } from '@/Utility/utils';
import { QBar } from '@/component/Qbar/Qbar';
import { QuestionDefault } from '@/types/IQuestion';
import { message } from 'antd';
import { INews, newsDefault } from '@/types/INews';
import { RumorNew } from '@/component/News/News';
import { Input,Button } from 'antd';

export const RumorInfo=()=>{
    const [data,setData]=useState([] as INews[])
    const [preview,setPreview]=useState({...newsDefault})
    const [page,setPage]=useState(0);

    const updateRumor=()=>{
        Utility.NetworkUtility.updateInfo(preview)
            .then(res=>{
                if(!res.status){
                    message.error("修改新闻失败");
                }
                else{
                    message.success("修改新闻成功");
                }
            })
    }
    const createRumor=()=>{
        Utility.NetworkUtility.createInfo(preview)
            .then(res=>{
                if(!res.status){
                    message.error("创建新闻失败");
                }
                else{
                    message.success("创建新闻成功");
                }
            })
    }

    const lastPage=()=>{
        if(page>0){
            Utility.NetworkUtility.getAllNews((page-1)*10,10).then(newData=>{
                setData(newData);
                setPage(page-1);
            });
        }
        else{
            message.info("到头了")
        }
    }
    const nextPage=()=>{
        Utility.NetworkUtility.getAllNews((page+1)*10,10).then(newData=>{
            if(newData.length>0){
                setData(newData);
                setPage(page+1);
            }
            else{
                message.info("到头啦")
            }
        });
    }

    useEffect(()=>{
        Utility.NetworkUtility.getAllNews().then(newData=>{
            setData(newData);
            if(newData.length>0){
                setPreview(newData[0]);
            }
        });
    },[])
    const chooseRumorInfo=(id:number)=>{
        Utility.NetworkUtility.getNewsByPID(id).then(res=>{
            setPreview(res);
        })
    }
    const coverNews=(news:INews,key:number)=>
        <RumorNew news={news} key={key} clkfunct={chooseRumorInfo}/>
    const NewsPreView=(news:INews)=>
        <RumorNew news={news} clkfunct={()=>{}}/>
    return (
        <div className={styleMerge([styles.rumorPage,stylesCommon.scFlexRow])}>
            <div className={styleMerge([styles.preview,stylesCommon.scFlexColumn])}>
                <div style={{width:"100%",height:"calc(100% - 1.2rem)",overflowY:"scroll"}} className={styleMerge([stylesCommon.scFlexColumn])}>
                    {data.map(coverNews)}
                </div>
                <div className={stylesCommon.bcFlexRow} style={{width:"100%",backgroundColor:"white"}}>
                <span onClick={lastPage} style={{cursor:"pointer"}}>上一页</span> 预览<span onClick={nextPage} style={{cursor:"pointer"}}>下一页</span>
                </div>
                {NewsPreView(preview)}
            </div>
            <div className={styleMerge([styles.Info,stylesCommon.ccFlexColumn])}>
                <div className={styleMerge([styles.infoContent,stylesCommon.scFlexColumn])}>
                    <Input.Search 
                        addonBefore={"编号"} 
                        value={preview.pid>0?preview.pid:""}  
                        onChange={(e)=>{setPreview({...preview,pid:parseInt(e.target.value||"0")})}}
                        enterButton={"载入"}/>
                    <Input addonBefore={"用户"} value={preview.uid}/>
                    <div className={stylesCommon.ccFlexRow} style={{width:"100%",backgroundColor:"white"}}>
                        标题
                    </div>
                    <Input.TextArea 
                        style={{resize:"none"}}
                        value={preview.title}
                        onChange={e=>{
                            let str=e.target.value
                            if(str.length>25)
                                str=str.substring(0,25);
                            setPreview({...preview,title:str})
                        }}
                    />
                    <div className={stylesCommon.ccFlexRow} style={{width:"100%",backgroundColor:"white"}}>
                        副标题
                    </div>
                    <Input.TextArea
                        style={{resize:"none"}}
                        value={preview.subtitle}
                        onChange={e=>{
                            setPreview({...preview,subtitle:e.target.value})
                        }}
                    />
                    <div className={stylesCommon.ccFlexRow} style={{width:"100%",backgroundColor:"white"}}>
                        正文
                    </div>
                    <Input.TextArea
                        style={{resize:"none"}}
                        value={preview.content}
                        onChange={e=>{
                            setPreview({...preview,content:e.target.value})
                        }}
                    />
                    <Input addonBefore={"真伪"}
                        value={preview.truth?"真":"假"}
                        onChange={e=>{
                            setPreview({...preview,truth:e.target.value==="真"?true:false})
                        }}
                    />
                    <Input addonBefore={"热度"}
                        value={preview.corcern>=0?preview.corcern:""}
                        onChange={e=>{
                            setPreview({...preview,corcern:parseInt(e.target.value||"0")})
                        }}
                    />
                    <Input addonBefore={"时间"}
                        value={preview.thetime}
                    />
                    <Input addonBefore={"图片"}
                        value={preview.pic}
                        onChange={e=>{
                            setPreview({...preview,pic:e.target.value})
                        }}
                    />
                    <Button.Group style={{width:"100%"}}>
                        <Button style={{width:"50%"}} onClick={updateRumor}>修改</Button>
                        <Button style={{width:"50%"}} onClick={createRumor}>新建</Button>
                    </Button.Group>
                </div>
            </div>
        </div>
    )
}