//这里是首页新闻的接口
interface INews {
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
}

export default INews;