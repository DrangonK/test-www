/**
 * 路由
 */
declare interface Route {
    path?: string;
    params?: object;
    query?: object;
    name?: string;
    hash?: object;
    fullPath?: string;
    meta?: object;
}
/**
 * 接口返回的数据结构
 */
declare interface Res<T> {
    /**
     * 200 操作成功
     *  400 操作失败
     *  401 未认证（签名错误）
     *  402 操作失败及错误详情状态码
     *  404 接口不存在
     *  500 服务器内部错误
     */
    readonly code: number;
    data: T;
    readonly msg: string;
    readonly url?: string;
}
/**
 * 列表结构
 */
declare interface pagevo<T> {
    rows: T[]; // 每一行的对象
    index: number; //当前页码
    pagesize: number; //每页数量
    total: number; //总数量
    totalPages: number; //总页数
}

