import _ from 'lodash'
const tel = /^((\+?[0-9]{2,4}\-[0-9]{3,4}\-)|([0-9]{3,4}\-))?([0-9]{7,8})(\-[0-9]+)?$/
const mobile = /^(1\d{10})$/
const url = /^((https?|ftp|news):\/\/)?([a-z]([a-z0-9\-]*[\.。])+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|ltd|asia|vip|top|art|club)|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&]*)?)?(#[a-z][a-z0-9_]*)?$/i

// 电话号码验证（包括手机）
export const isTel = (rule, value, callback) => {
    if (!value || tel.test(value) || mobile.test(value)) {
        callback()
    } else {
        callback(new Error('请输入正确的电话号码'))
    }
}
// 电话号码验证（针对固定电话）
export const isPhone = (rule, value, callback) => {
    if (!value || tel.test(value)) {
        callback()
    } else {
        callback(new Error('请输入正确的电话号码'))
    }
}
// 手机号码验证
export const isMobile = (rule, value, callback) => {
    if (!value || mobile.test(value)) {
        callback()
    } else {
        callback(new Error('手机号格式不正确'))
    }
}
// 验证区号
export const areaCode = (rule, value, callback) => {
    if (!value || /^[0-9]{3,4}$/.test(value)) {
        callback()
    } else {
        callback(new Error('请输入正确的区号'))
    }
}

// 分机号检测
export const extNo = (rule, value, callback) => {
    if (!value || /^[0-9]{0,6}$/.test(value)) {
        callback()
    } else {
        callback(new Error('请输入正确的分机号'))
    }
}

// 整数检测
export const isInt = (rule, value, callback) => {
    if (!value || _.isInteger(value)) {
        callback()
    } else {
        callback(new Error('请输入整数'))
    }
}

// url检测
export const url3 = (rule, value, callback) => {
    if (!value || url.test(value)) {
        callback()
    } else {
        callback(new Error('请输入合法的网址'))
    }
}

// 企业登录名
export const comUserName = (rule, value, callback) => {
    if (!value || /^(?=\w*[a-zA-Z]+\w*)\w{6,20}$/.test(value)) {
        callback()
    } else {
        callback(new Error('用户名必须由6~20个字母、数字或下划线组成'))
    }
}
// 不能单独字母、数字、符号
export const password = (rule, value, callback) => {
    if (!value || /^(?=.*[a-zA-Z0-9].*)(?=.*[a-zA-Z\W].*)(?=.*[0-9\W].*).{6,20}$/.test(value)) {
        callback()
    } else {
        callback(new Error('密码必须由字母、数字、符号中至少两种字符组成'))
    }
}
// 不能单独字母、数字、符号 加*过滤
export const password1 = (rule, value, callback) => {
    if (!value || value === '******' || /^(?=.*[a-zA-Z0-9].*)(?=.*[a-zA-Z\W].*)(?=.*[0-9\W].*).{6,20}$/.test(value)) {
        callback()
    } else {
        callback(new Error('密码必须由字母、数字、符号中至少两种字符组成'))
    }
}

// 匹配中文
export const chinese = (rule, value, callback) => {
    if (!value || /^[\u4e00-\u9fa5]+$/.test(value)) {
        callback()
    } else {
        callback(new Error('简称必须由1~6个中文字组成'))
    }
}
// 匹配中文和英文
export const chineseEnglish = (rule, value, callback) => {
    if (!value || /^[a-zA-Z\u4e00-\u9fa5]+$/.test(value)) {
        callback()
    } else {
        callback(new Error('简称必须由1~6个中文字组成'))
    }
}
// 匹配年龄16~60
export const validateAge = (rule, value, callback) => {
    if (!value && value !== 0) {
        callback()
        return
    }
    value = Number(value)
    if (Number.isInteger(value) && value >= 16 && value <= 60) {
        callback()
    } else {
        callback(new Error('请输入16~60的数值'))
    }
}
