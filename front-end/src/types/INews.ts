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
    /**
     * 谣言的编号
     */
    id: boolean
}

export default INews;