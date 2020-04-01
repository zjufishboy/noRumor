export interface ISearchResultItem {
    /**
     * 谣言的标题
     */
    title: string,
    /**
     * 谣言的id
     */
    id:number
}
export interface ISearchResult {
    /**
     * 谣言的搜索返回数据
     */
    [index: number]: ISearchResultItem;
}