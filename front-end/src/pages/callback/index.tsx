import React, { useEffect } from 'react';
import * as Utility from '@/Utility/utils';

const getCode = () => Utility.OtherUtility.getQueryVariable("code")
export default () => {
    useEffect(() => {
        let code = getCode();
        fetch("http://www.fishstar.xyz:4004/", {
        headers: {
            'Content-Type': 'application/json'
          },
          method: "POST",
          mode: 'cors',
          body: JSON.stringify({
            code:parseInt(code)
          }),})
        .then(res=>res.json())
        .then((res:{status:boolean,token?:string})=>{if(res.status&&res.token){
            Utility.setToken(res.token)
            window.location.href="http://localhost:8000/question"
        }
        else{
            console.log("error!");
        }
    })
    }, [])
    return (
        <div className="">
        </div>
    );
}