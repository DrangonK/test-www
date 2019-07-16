// 消息数量
declare interface NoticeAmount {
    amount_invite: number
    amount_seeMe: number
    amount_msg: number
}

//简历公开状态
declare interface publicSetting {
    publicSettings: number
    isLocationDetail: boolean
    isShowRefreshRes: string
}

// 求职助手
declare interface hrData {
    hrChatbotEnabled: boolean // 是否开启求职助手，由后端开关控制
    hrChatbotEnv: string // 开发的环境
    posNum: number
    unchattedPosNum: number  // 未聊天的信息
    token: string
    url: string
    companyNum: number
}

// 求职状态
declare interface jobState {
    state: number
    name: string
}

// 推荐职位列表
declare interface recommendPosList {
    contactPerson: string
    salaryStr2: string
    posType: string
    negotiableFlag: string
    posId: number
    reqWorkYearStr: string
    freDate: number
    freDateStr: string
    taolabels: string[]
    hasApply: boolean   // 是否已投递
    hasRead: boolean    // 是否已读
    hasCount: boolean    // 是否被记数
    comId: number
    urgent: number
    posNum: number
    posName: string
    acceptResumeType: number
    reqDegreeStr: string
    fromPerCenterRecommend: boolean
    logoUrl: string
    salaryStr: string
    workLocationStrNew: string
    comName: string
    workLocationStr: string
    smallLogoUrl: string
    salary_type: number
    defeatRate: number
}


// 左侧栏的 +1 提示语
declare interface tipObj {
    type: string
    num: number
}

declare interface filterComList {
    id: number
    name: string
}

// 意见反馈
declare interface feedBack {
    feedbackPhone: string    //用户手机号
    feedbackText: string //用户反馈内容
    email: string
    url?: string    // 反馈路径
    type?: number    // 反馈类型
    subject?: string     // 主题
    comUserId?: number   //企业用户id、举报必须传
    comId?: number
    starLevel?: number,
    name?: string    // 反馈人
}

declare interface checkLoginInfo {
    isEducationComplete: boolean // 是否完善教育经历，true-是。
    isIntentInComplete: boolean // 是否完善求职意向，true-是。
    isWorkComplete: boolean  // 是否完善工作经历，true-是。
    token: string
    email: string
    isMobileActivated: boolean // 是否手机已验证，true-是。
    perUserId: number // 用户Id
    isBasicComplete: boolean // 是否完善基本信息，true-是。
    loginType: number  // 登录类型，101：密码登录，102：动态码登录，103：token登录。
    perUserName: string
    mobile: string
}








