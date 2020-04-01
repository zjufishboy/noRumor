interface IQuestion {
    /**
     * 谣言的标题
     */
    title: string,
    /**
     * 谣言的时间
     */
    time:  string,
    /**
     * 谣言的内容
     */
    content:string,
    /**
     * 谣言的用户标记
     */
    userToken:string
}

export default IQuestion;