import React, { useEffect } from 'react';
import * as Utility from '@/Utility/utils';
const getQueryVariable = (
    v: string
) => {
    let query = window.location.search.substring(
        1
    );
    let vars = query.split("&");
    for (
        let i = 0;
        i < vars.length;
        i++
    ) {
        let pair = vars[i].split("=");
        if (pair[0] === v) {
            return pair[1];
        }
    }
    return "";
};
const getCode = () => getQueryVariable("code")
export default () => {
    useEffect(() => {
        let code = getCode();
        console.log(code)
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