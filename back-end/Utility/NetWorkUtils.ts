/**
 * 这里是接口相关的函数
 * 主要函数形式请写成：
 * export const XXX = (req,res)=>{}
 * 的形式
 * 这里的req是前端发过来的请求，res主要只用res.send(jsonObject)来处理
 * 主要是业务层的工作
 */
export const apiIndex=(req:{},res:{send:({})=>void})=>{
    //这里需要调用持久层的函数
    res.send({result:"API:example"})
}