import db from '../common/db'
import { fetch } from '../common/fetch'

enum ztData {
    OTHERDATA = 'otherData',
    HOTCITY = 'hotCity',
    SITE = 'siteList',
    JOBTYPE = 'jobType',
    INDUSTEY = 'industry',
    SKILL = 'skill'
}
async function getData(url: string, key: string) {
    const lastModified: ZtData = db.get('lastModified').value()
    let headers = {}
    // @ts-ignore
    if (lastModified && lastModified[key]) {
        headers = {
            // @ts-ignore
            'If-Modified-Since': lastModified[key]
        }
    }
    const response = await fetch<any>(url, {}, {
        headers,
        method: 'get'
    })
    /*   console.log('持久存储数据 == ' + key + '    response.status==' )
      console.log(response) */
    // 304 时response 会获取不到 ,暂时这样处理
    if (response.status === 200) {
        const lastModifiedRes = response.headers['last-modified']
        let data = response.data.data
        db.set(`lastModified.${key}`, lastModifiedRes).write()
        if (ztData.OTHERDATA === key) {
            db.set(`ztData.${key}`, data).write()
            return data
        } else if (ztData.HOTCITY === key) {
            db.set(`ztData.${key}`, data.siteList).write()
            return data.siteList
        } else if (ztData.SITE === key) {
            const cityList = (data.cityList as Site[]).map((city) => {
                // @ts-ignore
                if (city.child.length === 0) {
                    // @ts-ignore
                    city.child = null
                }
                return city
            })
            db.set(`ztData.${key}`, data.cityList).write()
            return data.cityList
        } else if (ztData.JOBTYPE === key) {
            db.set(`ztData.${key}`, data.jobList).write()
            return data.jobList
        } else if (ztData.INDUSTEY === key) {
            db.set(`ztData.${key}`, data).write()
            return data
        } else if (ztData.SKILL === key) {
            db.set(`ztData.${key}`, data.skillList).write()
            return data.skillList
        }
    } else if (!response.status || response.status === 304) {
        return db.get(`ztData.${key}`).value()
    }
}
// 其他数据
export const getOtherData: Promise<OtherData> = getData('/dictionary/otherData', ztData.OTHERDATA)

// 热门城市
export const getHotCity: Promise<Site[]> = getData('/dictionary/hotCity', ztData.HOTCITY)
// 地区数据
export const getSiteList: Promise<Site[]> = getData('/dictionary/city', ztData.SITE)
// 获取职位类别字典
export const getJobTypeList: Promise<JobType[]> = getData('/dictionary/jobNew', ztData.JOBTYPE)
// 行业字典 - 获取
export const getIndustryList: Promise<Industry[]> = getData('/dictionary/industry', ztData.INDUSTEY)
// 技能字典 - 获取
export const getSkillList: Promise<skill[]> = getData('/dictionary/skill', ztData.SKILL)

// 求职状态
export const jobState: jobState[] = [
    {
        state: 0,
        name: '目前正在找工作'
    },
    {
        state: 3,
        name: '在职，有好的机会再考虑'
    },
    {
        state: 4,
        name: '我暂时不想找工作'
    }
]
