interface NoticeAmountType {
    type: string
}

interface UserInfo {
    userName?: string
    photoPath?: string
    jobStateStr?: string
}

export default {
    // 保存消息
    saveNoticeAmount: (state: any, noticeAmount: NoticeAmount) => {
        state.amount_invite = noticeAmount.amount_invite
        state.amount_seeMe = noticeAmount.amount_seeMe
        state.amount_msg = noticeAmount.amount_msg
    },
    // 对消息减一
    decreaseNoticeAmount: (state: any, data: NoticeAmountType) => {
        state['amount_' + data.type] -= 1
    },
    // 保存姓名，头像
    saveBasicInfo: (state: any, userInfo: UserInfo) => {
        if (userInfo.userName) {
            state.userName = userInfo.userName
        }
        if (userInfo.photoPath) {
            state.photoPath = userInfo.photoPath
        }
        if (userInfo.jobStateStr) {
            state.jobStateStr = userInfo.jobStateStr
        }
    },
    // 切换简历时获取整份简历的信息,然后需要哪个数据，就保存哪个数据
    saveResume: (state: any, resumeDetail: any) => {
        state.resumeId = resumeDetail.id
    },
    // 操作左侧栏的提示语
    hadlerLeftTips: (state: any, tipObj: tipObj) => {
        if (tipObj.type === 'favorite') {
            state.favoriteTips = tipObj.num
            setTimeout(() => {
                state.favoriteTips = 0
            }, 1000)
        } else if (tipObj.type === 'apply') {
            state.applyTips = tipObj.num
            setTimeout(() => {
                state.applyTips = 0
            }, 1000)
        }
    },
    // 验收号码的弹窗
    verifyMobile: (state: any, data: any) => {
        state.isMobileActivated = data.isMobileActivated
        state.mobile = data.mobile
    }
}







