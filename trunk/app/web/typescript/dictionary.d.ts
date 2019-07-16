/**
 * 其他类别字典
 */
declare interface OtherDataStructure {
    id?: number; //性别提交的ID
    name?: string; //名称
    en?: string; //英文名
}
declare interface OtherData {
    sex?: OtherDataStructure[]; //; //性别
    creType?: OtherDataStructure[]; //; //证件类型
    jobStatus?: OtherDataStructure[]; //; //工作状态
    marriageStatus?: OtherDataStructure[]; //; //婚姻状况
    currPay?: OtherDataStructure[]; //; //目前月薪
    salary?: OtherDataStructure[]; //期望薪资
    salaryCom?: OtherDataStructure[]; //企业薪资待遇
    payOther?: OtherDataStructure[]; //待遇
    politics?: OtherDataStructure[]; //政治面貌
    registerFund?: OtherDataStructure[]; //注册资金
    jobType?: OtherDataStructure[]; //前端显示使用工作类型
    jobType2?: OtherDataStructure[]; //前端提交后端使用工作类型
    workTime?: OtherDataStructure[]; //到岗时间
    language?: OtherDataStructure[]; //语言级别
    nation?: OtherDataStructure[]; //民族
    timeLevel?: OtherDataStructure[]; //发布时间的显示
    degree?: OtherDataStructure[]; //学历要求 (个人)
    degree2?: OtherDataStructure[]; //学历要求（职位）
    workyear?: OtherDataStructure[]; //工作年限
    comType?: OtherDataStructure[]; //单位性质
    comScale?: OtherDataStructure[]; //单位规模
    industry?: OtherDataStructure[]; //行业类别
    tagJobs?: OtherDataStructure[]; //淘职标签
    cert?: OtherDataStructure[]; //证书技能
}
/**
 * 地区
 */
declare interface Site {
    id?: number;  //城市代码（镇区的前四位与市区的前四位相同）
    name?: string;  //城市名称
    s?: string;  //英文名称
    en?: string;  //缩写
    f?: string;  //区号
    a?: string;  //纬度
    lng?: string;  //经度
    lat?: string;  //地区级别
    hasChild?: string;  //是否有下属城市
    child?: Site[];  //下属城市
}
/**
 * 地区
 */
declare interface SiteList {
    siteList?: Site[];
    cityList?: Site[];
}
/**
 * 职位类别
 *
 * @interface JobType
 */
declare interface JobType {
    py: string; //职位拼音
    name: string; //职位类别名
    hasChild?: number; //是否有下级职位
    en: string; //职位英文
    id: number; //职位类别ID,用于提交时使用
    st: string; //类型
    child: JobType[];  //下级职位
    active?:boolean // 是否选中
}
declare interface JobTypeList {
    jobList?: JobType[];
}
/**
 * 行业类别
 *
 * @interface Industry
 */
declare interface Industry {
    id: number;  //行业ID
    name: string;  //行业名称
    en: string;  //行业英文名称
    parentId: number;  //行业父类ID
    chile: Industry[];
}
/**
 * 技能特长
 *
 * @interface skill
 */
declare interface skill {
    id: number;  //技能ID
    name: string;  //技能名称
    chile: skill[];  //下属城市
}

declare interface ZtData {
    otherData: string;
    hotCity: string;
    siteList: string;
    jobType: string;
    industry: string;
    skill: string // 技能特长
}
