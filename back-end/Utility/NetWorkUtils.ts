/**
 * 这里是接口相关的函数
 * 主要函数形式请写成：
 * export const XXX = (req,res)=>{}
 * 的形式
 * 这里的req是前端发过来的请求，res主要只用res.send(jsonObject)来处理
 * 主要是业务层的工作
 */

/**
 * 测试API
 * @param req 
 * @param res 
 */
export const apiIndex=(req:{},res:{send:({})=>void})=>{
    //这里需要调用持久层的函数
    res.send({result:"API:example"})
}

/**
 * 关于接口的使用，可以看到上面这个箭头函数的例子里，
 * 参数后面有一个对象来表示这个对象具体的内容，
 * 因为js是弱类型语言，而ts是强类型语言，
 * 我们在这种调用的时候需要写入接口来表示数据格式。
 * 具体的数据接口应该写到types文件夹下，
 * 并且保证前端和后端使用同一套接口
 */