//提问和回复的接口
export interface IReply{
    /**
     * 用户名
     */
    userName: string,
    /**
     * 回复内容
     */
    content: string,
    /**
     * 证据的链接
     */
    link: number|null,
}
export interface IQuestion {
    /**
     * 提问的uid
     */
    uid: number,
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
    reply:IReply|null
}
