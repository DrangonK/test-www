import {
    getIndustryList,
    getSiteList,
    getSkillList
} from '../api/dictionary'
import Cookies from 'js-cookie'
import datajson from './data'

// 创建UUID
export const createUuid = () => {
    const s = []
    const hexDigits = '0123456789abcdef'
    for (let i = 0; i < 32; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4'  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    const uuid = s.join('')
    return uuid
}
export const setUuid = () => {
    let uuid: string = Cookies.get('uuid')
    if (!uuid) {
        uuid = createUuid()
        Cookies.set('uuid', uuid, { domain: 'job5156.com' })
    }
}
/**
 * 根据ID获取List对应Id的json
 * @param ids
 * @param list
 */
export const getJsonByIds = <T>(ids: number[], list: T[]) => {
    return getJsonByValues(ids, 'id', list)
}
/**
 * 根据ID获取List对应Id的json
 * @param values
 * @param key
 * @param list
 */
export const getJsonByValues = <T>(values: any[], key: string, list: T[]) => {
    const set = new Set(values)
    const temp: T[] = []

    function loopSite(arr) {
        for (const site of arr) {
            if (temp.length === values.length) {
                return
            }
            if (set.has(site[key])) {
                temp.push(site)
            }
            const child = site.child || site.chile
            if (Array.isArray(child) && child.length > 0) {
                loopSite(child)
            }
        }
    }
    loopSite(list)
    return temp
}
// 根据地区ID获取地区Json
export const getSiteByIds = async (ids: number[]) => {
    const siteList = await getSiteList
    return getJsonByIds<Site>(ids, siteList)
}

// 地区ID类型判断
// 0为非法；1为省；2为市；3为区；4为点
export const getAreaType = (id) => {
    if (id === null || id === '' || id === 0) {
        return 0
    }
    id = id.toString()
    // 省
    if (parseInt(id.substr(2), 10) === 0) {
        return 1
    }
    // 市
    if (id.length === 4) {
        return 2
    }
    if (parseInt(id.substr(4), 10) === 0) {
        return 2
    }
    // 区
    if (parseInt(id.substr(6), 10) === 0) {
        return 3
    }
    // 点
    if (parseInt(id.substr(6), 10) > 0) {
        return 4
    }
}

// 根据地区ID获取父类ID   14080200 => [14000000, 14080000, 14080200]
export const getParentSiteById = (id: number) => {
    const idStr = id + ''

    if (getAreaType(id) === 1) {
        return [id]
    }

    const province = parseInt(idStr.replace(/\d{6}$/, '000000'), 10)
    if (getAreaType(id) === 2) {
        return [province, id]
    }

    const city = parseInt(idStr.replace(/\d{4}$/, '0000'), 10)
    if (getAreaType(id) === 3) {
        return [province, city, id]
    }
    return []
}

// 切割电话的区号 电话 转接号
export const getContactPhone = (contactPhone: string) => {
    let areaCode = ''
    let phone = ''
    let extNo = ''
    if (contactPhone) {
        const arr: string[] = contactPhone.split('-')
        if (arr.length === 1) {
            phone = arr[0]
        } else if (arr.length === 2) {
            areaCode = arr[0]
            phone = arr[1]
        } else if (arr.length === 3) {
            areaCode = arr[0]
            phone = arr[1]
            extNo = arr[2]
        }
    }
    return {
        areaCode,
        extNo,
        phone,
    }
}

// 获取行业父类ID
export const getParentIndustryById = async (id: number) => {
    const industryList = await getIndustryList
    console.log(industryList)
    for (const industryArr of industryList) {
        for (const industry of industryArr.chile) {
            if (industry.id === id) {
                return industryArr.id
            }
        }
    }
    return null
}
// 返回获取行业数组 14080200 => [14000000, 14080000, 14080200]
export const getParentIndustryByIds = async (id: number) => {
    const industryList = await getIndustryList
    for (const industryArr of industryList) {
        for (const industry of industryArr.chile) {
            if (industry.id === id) {
                return [industryArr.id, id]
            }
        }
    }
    return null
}

// 技能特长,获取父子数组:[ "办公/企业管理", "Word" ]
export const getSkillArr = async (name: string) => {
    var arr: string[] = [];
    let skillList: skill[] = []
    await getSkillList.then(data => {
        skillList = data
    });

    for (let parent of skillList) {
        let chile = parent.chile;
        let i = chile.findIndex((item: skill) => {
            return item.name === name;
        })
        if (i !== -1) {
            arr = [parent.name, name];
            break;
        }
    }
    return arr;
}

// 将大小数值交换
export const exchange = (from: number, to: number) => {
    if (from && to) {
        const max = Math.max(from, to)
        const min = Math.min(from, to)
        return { from: min, to: max }
    }
    return { from, to }
}

export const postcall = (url: string, params: object, type: string = 'post') => {
    const tempform = document.createElement('form')
    tempform.action = url
    tempform.method = type
    tempform.style.display = 'none'
    tempform.target = '_blank'

    for (const [key, value] of Object.entries(params)) {
        const opt = document.createElement('input')
        opt.name = key
        opt.value = value
        tempform.appendChild(opt)
    }

    const opt = document.createElement('input')
    opt.type = 'submit'
    tempform.appendChild(opt)
    document.body.appendChild(tempform)
    tempform.submit()
    document.body.removeChild(tempform)
}

export const alipay = (params: any) => {
    postcall(`https://mapi.alipay.com/gateway.do?_input_charset=${params._input_charset}`, params)
}

export const kf53 = () => {
    window.open('https://tb.53kf.com/code/client/9007928/1', 'kefu', 'height=600, width=800, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')
}

/**
 * 将时间戳转为需要的格式
 * type==1: 1537262277000 => 2018-09-18    17:13
 * type==2: 1537262277000 => 2018-09-18
 * type==3: 1537262277000 => 2018-09-18 17:13:04
 * type==4: 1537262277000 => 2018-09
 * @param value 时间戳: 1537262277000
 */
export const formatTime = (value: number | string, type = 1): string => {
    value = Number(value)
    // @ts-ignore
    if (!value) return
    let str = ''
    let d = new Date(value)
    function fill(num: number): string {
        if (num < 10) {
            return '0' + num
        }
        return '' + num
    }

    str += d.getFullYear() + '-' + fill((d.getMonth() + 1)) + '-' + fill(d.getDate())

    if (type === 1) {
        str += '&#12288;&#12288;' + fill(d.getHours()) + ':' + fill(d.getMinutes())
    } else if (type === 3) {
        str += '&#12288;' + fill(d.getHours()) + ':' + fill(d.getMinutes()) + ':' + fill(d.getSeconds())
    } else if (type === 4) {
        str = d.getFullYear() + '-' + fill((d.getMonth() + 1))
    }
    return str
}

// 转换职位的要求  =>高中 | 不限 | 东莞-长安镇
export const formatStr = function (arr: Array<string | number>): string {
    let array: Array<string | number> = []

    arr.forEach((item) => {
        if (item) {
            array.push(item)
        }
    })
    return array.join(' | ')
}
// 将一个对象转为 key=val&ke2=val2 用于拼接再URL上  等同于插件：qs.stringify(data)
/* export const objToQueryStr = function (data: object): string {
    let queryStr: string = ''

    for (let [key, val] of Object.entries(data)) {
        queryStr += `${key}=${val}&`
    }
    return queryStr.slice(0, -1)
} */

/* export const toFormData = function (data: object): FormData {
    let formData = new FormData()
    for (let [key, val] of Object.entries(data)) {
        formData.append(key,val)
    }
    return formData
}
 */


// 转换工作年限
export const trsforJobyearType = function (jobyearType: number, jobyearTypeStr: string): string {
    let str: string = ''

    if (!jobyearType) {
        str = jobyearTypeStr + '经验'
    } else {
        if (jobyearType < 1) {
            str = jobyearTypeStr
        } else if (jobyearType <= 10) {
            str = jobyearType + '年工作经验'
        } else {
            str = '10年以上经验'
        }

    }
    return str
}

// 转换薪资 2 => 1500-1999元/月
export const trsfSalary = function (salaryId: number): string {
    if (!salaryId) {
        return ''
    }
    // @ts-ignore
    return datajson.salaryCom.find((item: object) => {
        // @ts-ignore
        return item.id === salaryId
    }).name
}


if (!("classList" in document.documentElement)) {
    Object.defineProperty(HTMLElement.prototype, 'classList', {
        get: function () {
            let self = this
            function update(fn: Function) {
                return function (value: string) {
                    let classes = self.className.split(/\s+/g)
                    let index = classes.indexOf(value)

                    fn(classes, index, value)
                    self.className = classes.join(" ")
                }
            }

            return {
                add: update(function (classes: any, index: any, value: any) {
                    if (!~index) { classes.push(value) }
                }),

                remove: update(function (classes: any, index: any) {
                    if (~index) {
                        classes.splice(index, 1)
                    }
                }),

                toggle: update(function (classes: any, index: any, value: any) {
                    if (~index) {
                        classes.splice(index, 1)
                    } else { classes.push(value) }
                }),

                contains: function (value: string) {
                    return !!~self.className.split(/\s+/g).indexOf(value)
                },

                item: function (i: any) {
                    return self.className.split(/\s+/g)[i] || null
                }
            }
        }
    })
}

