import { ConfUtility } from "./utils"

export const myLog=(data:any)=>{
    if(ConfUtility.env==="debug"){
        console.log(data)
    }
    else{
        
    }
}