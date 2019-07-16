declare interface resume {
    isBasicComplete?: boolean
    isEducationComplete?: boolean
    isIntentInComplete?: boolean
    isResumeComplete?: boolean
    isWorkComplete?: boolean
    resumeDetail: {
        freDate: string //简历刷新时间
        perfectNum: number //完整度
        id: number // 当前简历的id
        intentInfoVo?: intentInfo
        basicInfoVo: basicInfo
        freshness: string//简历新鲜度
    }
}


// 接口名称: 简历基础信息 - 创建简历并新
declare interface createResumeData {
    userName: string
    gender: string
    birthday: number
    location: number
    email: string
    jobyearType: number
    nation: string //民族
    stature: number
    political: number
    marriage: number
    hometown: number
    jobState: number
    nowSalary: number
}


// 导出简历文件后缀
declare type exportSuffix = 'WORD' | 'HTML'

// 简历列表
declare interface perResumeList {
    id: number, // 简历Id
    resumeName: string,
    default: boolean,
    isCurrent: boolean
    pass: number // -12:被后台用户删除,-11:被用户自己删除, -10:自杀式简历，不让登录，-9：封锁,-3：审核不合格，-1：未开通(待审核），0:未完善，1：暂时开通 10：已开通
}

declare interface refreshResume {
    jobState?: string // 求职状态
    location?: string //现居地
    jobyearType?: string | number //工作年限类型
}

// 基本信息
declare interface basicInfo {
    userName?: string   //--必填
    gender?: number // 1:男  2：女  --必填
    age?: number | string
    jobyearType?: number | string    //--必填
    jobyearTypeStr?: string
    location?: number | string //先居住地 id --必填
    locationStr?: string //先居住地
    hometown?: number | string //籍贯、户口 id
    hometownStr?: string //籍贯、户口
    politicalStr?: string // 政治面貌
    nowSalary?: string
    nowSalaryStr?: string
    mobile?: number | string //--必填
    email?: string  //--必填
    jobState?: string //求职状态 //--必填
    jobStateStr?: string //求职状态 //--必填
    birthday?: number | string //初始日期 --必填
    marriage?: number | string //婚姻状况id
    marriageStr?: number | string //婚姻状况
    nation?: number | string //民族
    stature?: number | string //身高
    photoUrl?: string // 头像
    mobileActivation?: number // 0:未验证手机 1：已验证手机
}

// 基本信息 --表单
declare interface basicForm {
    state: {
        isEdit: boolean
    }
    form: basicInfo
    rules: object
}

// 求职意向
declare interface intentInfo {
    id?: number // 简历id
    jobCodeList: number[] // 期望职位的id列表
    jobCodeStr: string // 期望职位--选择
    jobName: string    // 期望职位--自定义职位
    jobLocationList: number[] // 期望地区的id列表
    jobLocationStr: string // 期望地区
    jobTypeArr: number[] // 工作类型id列表
    jobTypeStr: string // 工作类型
    salary: number | string // 期望月薪 id
    checkindate: number | string // 到岗时间 id
    checkindateStr: string // 到岗时间
    keywords?: string // 个人亮点
    professionSkill?: string // 自我评价
    modifyType?: number // 更新模块类型：0、全修改，1、只修改求职意向， 2、只修改自我描述及亮点
    jobState?: string //求职状态 //--必填
    jobStateStr?: string //求职状态 //--必填
}

// 求职意向 --表单
declare interface intentForm {
    form: intentInfo
    rules: object
}


declare interface educationInfo {
    id: number // 教育经历id
    schoolName: string
    degree: number | null // 学历id
    degreeStr: string //学历
    speciality: string  // 专业
    begin: string
    end: string
    specialityDescription: string // 专业描述
    associationActivity: string // 在校经历
}

// 教育经历 --表单
declare interface educationForm {
    form: educationInfo
    rules: object
}

// 工作经历
declare interface workInfo {
    id?: number
    comName: string    // 企业名称
    begin: string  //开始日期
    end: string    // 结束日期
    jobName: string    // 职位名称
    section: string    // 部门
    comCalling: number | string    // 行业id
    comCallingStr: string // 行业
    industry?: number[] //自己添加的行业，用于级联选择器
    comTypeStr: string // 企业性质
    comScaleStr: string // 公司规模
    description: string // 工作描述
    leftreason: string //离职原因
}

// 工作经历 --表单
declare interface workForm {
    form: workInfo
    rules: object
}

// 项目经历
declare interface projectInfo {
    id: number //项目经历id
    projectName: string    // 项目名称
    begin: string  //开始日期
    end: string    // 结束日期
    proDescribe: string    // 项目描述
    dutyDescribe: string    // 责任描述
}

// 项目经历 --表单
declare interface projectForm {
    form: projectInfo
    rules: object
}

// 个人评价
declare interface perEvaluationInfo {
    keywordsList: string[]
    keywords: string    // 个人亮点
    professionSkill: string  //自我评价
    modifyType?: number // 更新模块类型：0、全修改，1、只修改求职意向， 2、只修改自我描述及亮点
}

// 个人评价 --表单
declare interface perEvaluationForm {
    form: perEvaluationInfo
    rules: object
}

// 技能特长
declare interface skillInfo {
    id: number //项目经历id
    level: number    // 掌握程度
    levelStr: string    // 掌握程度
    duration: string  //使用时长
    name: string    // 技能名称
    allName: string[]    //级联选择器，选择全称
}

// 技能特长 --表单
declare interface skillForm {
    form: skillInfo
    rules: object
}

// 技能水平
declare interface skillLevel {
    id: number
    name: string
}

// 培训经历
declare interface trainInfo {
    id: number //项目id
    trainCourse: string    //培训课程
    begin: string  //开始日期
    end: string    // 结束日期
    trainSchoolName: string    // 培训机构
    courseDescription: string  // 描述
}

// 培训经历 --表单
declare interface trainForm {
    form: trainInfo
    rules: object
}

// 作品附件
declare interface accessory {
    id: number | null //项目id
    uploadName: string //作品名称
    opusPath: string  //作品链接
    description: string // 作品描述
    uploadPath: string // 附件文件路径 例如：2018-10
    fileName: string  // 附件文件名
}

// 作品附件 --表单
declare interface accessoryForm {
    form: accessory
    rules: object
}

// 证书
declare interface certificateInfo {
    id: number //项目id
    certificateFileName: string //上传的附件的名称  例如：dc5c71c4bbbd024db362f91381a57e24.jpg
    certificateName: string //证书名称 例如三级计算机证书
    grade: string  //补充说明，随便写
    certificatePath: string  //证书作品的路径  例如：2018-10
    acquireDate: string // 证书作品的时间 -时间戳
    fileList?: object[] //用于上传插件 [{name:certificateFileName}]
}

// 证书 --表单
declare interface certificateForm {
    form: certificateInfo
    rules: object
}

// 用于判断是否点击了 -添加模块,点击了->true。不能用于判断是否存在该模块
declare interface isAddModule {
    train: boolean
    certificate: boolean
    accessory: boolean
}


// 级联选择器的props 属性
declare interface props {
    children: string // 某个选项的子选项
    label: string   //选项的文案
    value: string   // 选项的值
    disabled?: string// 指定哪些选项的【值】为不可选
}









