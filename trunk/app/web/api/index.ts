import fetch from '../common/fetch'
import qs from 'qs'

// 用户 - (token检验)登录
export const checkLogin = (token: string) => fetch('/session/per/token', {per: token}, 'post')

// 用户 - 退出登录
export const logOut = () => fetch('/session/per', {}, 'delete')

// 获取求职状态
export const getJobState = () => fetch('/per/jobState', {}, 'get')
// 修改求职状态
export const modifyJobState = (jobState: object) => fetch('/per/jobState', qs.stringify(jobState), {
    method: 'put',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})

// 消息数量 - 未读统计
export const getNoticeAmount = () => fetch('/per/noticeAmount', {}, 'get')


// 职位推荐 - 获取推荐
export const getRecommendPos = (data: object) => fetch('/per/pos/recommend', data, 'get')
// 职位投递 - 应聘
export const apply = (data: object) => fetch('/per/pos/apply', qs.stringify(data), {
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})
// 职位投递 - 列表记录
export const getApplyLog = (data: object) => fetch('/per/pos/apply', data, 'get')

// 消息列表 - 面试邀请
export const getInviteLog = (data: object) => fetch('/per/invite', data, 'get')
// 消息详情 - 面试邀请读取
export const getInviteDetail = (id: number, noNeedDetail: boolean) => fetch(`/per/invite/${id}`, {
    id: id,
    noNeedDetail: noNeedDetail
}, 'get')
// 消息列表 - 面试邀请 -删除记录
export const deleteInviteLog = (idStr: string) => fetch('/per/invite/' + idStr, {}, 'delete')

// 消息列表 - 谁看过我
export const getSeeMeLog = (pnData: object) => fetch('/per/seeme', pnData, 'get')
// 消息列表 - 关注企业
export const getCompany = (pnData: object) => fetch('/per/com/follow', pnData, 'get')
// 企业关注 - 关注
export const focusCompany = (data: object) => fetch('/per/com/follow', qs.stringify(data), {
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})
// 企业关注 - 取消关注
export const unFocusCompany = (followId: number) => fetch('/per/com/follow/' + followId, {}, 'DELETE')

// 消息列表 - 站内消息
export const getMessage = (msgData: object) => fetch('/per/msg/sys', msgData, 'get')
// 消息详情 - 站内消息读取
export const getMessageDetail = (msgId: number) => fetch('/per/msg/sys/' + msgId, {msgId: msgId}, 'get')
// 消息详情 - 站内消息删除
export const deleteMessageLog = (msgIdStr: string) => fetch('/per/msg/sys/' + msgIdStr, {}, 'DELETE')


// 收藏职位 - 获取列表
export const getFavoriteList = (pn: number) => fetch('/per/pos/favorite', {pn: pn}, 'get')
// 收藏职位 - 收藏
export const favorite = (data: object) => fetch('/per/pos/favorite', qs.stringify(data), {
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})
// 收藏职位 - 取消收藏
export const deleteFavorite = (posId: number) => fetch('/per/pos/favorite/' + posId, {posId: posId}, 'DELETE')


// 简历公开状态 - 获取
export const gePublicSetting = () => fetch('/per/publicSetting', {}, 'get')
// 简历公开状态 - 修改
export const setPublicSetting = (data: object) => fetch('/per/publicSetting', qs.stringify(data), {
    method: 'put',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})
// 向企业推荐 - 获取设置
export const getPermitRecommand = () => fetch('/per/permitRecommand', {}, 'get')
// 向企业推荐 - 修改设置
export const setPermitRecommand = (data: object) => fetch('/per/permitRecommand', qs.stringify(data), {
    method: 'put',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})
// 企业屏蔽 - 获取列表
export const getShieldList = () => fetch('/per/com/shield', {}, 'get')
// 企业屏蔽 - 新增屏蔽
export const addShieldList = (data: object) => fetch('/per/com/shield', qs.stringify(data), {
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})
// 企业屏蔽 - 删除
export const deleteShield = (comId: number) => fetch('/per/com/shield/' + comId, {filterComId: comId}, 'DELETE')
// 企业查询 - 关键字查询
export const searchCompany = (comKey: string) => fetch('/per/shield/search', {comKey: comKey}, 'get')


// 手机号 - 获取
export const getMobile = () => fetch('/per/binding/mobile', {}, 'get')
// 修改(验证)手机号 - 获取动态
export const getDynamicCode = (mobile: number) => fetch('/per/dynamic/mobileActivation', {mobile: mobile}, 'get')
// 修改(验证)手机号 - 提交验证
export const modifyMobile = (data: object) => fetch('/per/mobile', qs.stringify(data), {
    method: 'put',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})


// 密码 - 修改
export const modifyPwd = (data: object) => fetch('/per/password', qs.stringify(data), {
    method: 'put',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})
// 用户密码 - 是否有当前密码
export const judgeCurrentPwd = () => fetch('/per/password', {}, 'get')


// 第三方 -登录
export const thirdLogin = (type: string) => fetch(`/connect/login/${type}`, {}, 'get')
// 第三方 - 获取绑定信息
export const getConnectMsg = () => fetch('/connect/bindInfo', {}, 'get')
// 第三方 -解绑
export const unbindThridConnect = (connectId: number) => fetch(`/connect/unbind/${connectId}`, {}, 'delete')


// 求职助手
export const hrHelper = () => fetch('/per/hrChatbot/jobsNew', {}, 'get')
// export const hrHelper = {
//     posNum: 0,
//     unchattedPosNum: 10,
//     token: 'job5156.candidate.499521.1542269621248.d5ad1983',
//     url:
//         'https://chatbot.nadileaf.com/air/chat#job5156.candidate.499521.1542269621248.d5ad1983',
//     companyNum: 0
// }

// 意见反馈
export const feedback = (data: feedBack) => fetch('/per/feedback', qs.stringify(data), {
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})
















