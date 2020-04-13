//这里是新闻详情的具体信息
interface INewsDetails {
    /**
     * 谣言的标题
     */
    title: string,
    /**
     * 谣言的时间
     */
    time:  string,
    /**
     * 谣言的封面
     */
    picture: string,
    /**
     * 谣言的状态
     */
    status: boolean,
    /**
     * 谣言的具体说法
     */
    subtitle:string,
    /**
     * 谣言的来源
     */
    source:string,
    /**
     * 谣言的确认者
     */
    experts:string,
    /**
     * 谣言的相关辟谣内容
     */
    details:string,
    /**
     * 谣言的相关链接
     */
    links:string,
}

export default INewsDetails;