import React, { useEffect } from 'react';
import * as Utility from '@/Utility/utils';
import { history } from 'umi';

const getCode = () => Utility.OtherUtility.getQueryVariable("code")
export default () => {
    useEffect(() => {
        let authCode = getCode()
        fetch(Utility.ConfUtility.getTokenUrl(), {
        headers: {
            'Content-Type': 'application/json'
          },
          method: "POST",
          mode: 'cors',
          body: JSON.stringify({
            authCode
          }),})
        .then(res=>res.json())
        .then(res=>{
            let token=res.info.data.token;
            Utility.StorageUtility.setToken(token);
            history.replace('/');
        })
    }, [])
    return (
        <div className="">
        </div>
    );
}