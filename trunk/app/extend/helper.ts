const _  = require('lodash')
const formatReqParams = (ctx) => {
    const { data, method, url } = ctx
    let { headers, protocol } = ctx
    const hasProtocol = /(http|s):\/\//

    protocol = (hasProtocol.test(url)) ? url.split(':')[0] : protocol
    headers = Object.assign({}, headers)

    return { data, url, method, protocol, headers, dataType: 'json' }
}

export default {
    async fetch() {
        // @ts-ignore
        const that: any = this
        const { ctx } = that
        const reqParams = Object.assign(
            {},
            formatReqParams(ctx)
        )
        if (reqParams.method.toUpperCase() !== 'GET') {
            reqParams.data = ctx.request.body
        }

        delete reqParams.headers.host
        try {
            that.logger.info(that.config.domain + ctx.url.replace(/^(\/api)/, ''))
            const result = await ctx.curl(that.config.domain + ctx.url.replace(/^(\/api)/, ''), reqParams)
            const { data, headers } = result
            ctx.set(headers)
            return data
        } catch (e) {
            that.logger.error(e)
            return {
                code: 400,
                msg: '获取简历数据超时'
            }
        }
    },
    getBrowser(getVersion?: string) {
        // @ts-ignore
        const that: any = this
        const { ctx } = that
        const uaStr = ctx.headers['user-agent'].toLowerCase()
        let matchStr
        let ieTridents
        let trident
        let browserChiType
        if (uaStr.indexOf('trident') > -1) {
            let ieAerRv
            ieAerRv = (matchStr = uaStr.match(/msie ([\d.]+)/)) ? _.nth(matchStr, 1) :
                (matchStr = uaStr.match(/rv:([\d.]+)/)) ? _.nth(matchStr, 1) : 0

            ieTridents = { 'trident/7.0': 11, 'trident/6.0': 10, 'trident/5.0': 9, 'trident/4.0': 8 }
            matchStr = uaStr.match(/(trident\/[\d.]+|edge\/[\d.]+)/)
            trident = matchStr ? _.nth(matchStr, 1) : undefined
            browserChiType = (ieTridents[trident] || ieAerRv) > 0 ? 'ie' : undefined
        } else {
            // 判断 windows edge 浏览器
            // match_str[1]: 返回浏览器及版本号,如: "edge/13.10586"
            // match_str[1]: 返回版本号,如: "edge"
            // 若要返回 "edge" 请把下行的 "ie" 换成 "edge"。 注意引号及冒号是英文状态下输入的
            browserChiType = (matchStr = uaStr.match(/edge\/([\d.]+)/)) ? 'ie' :
                // 判断firefox 浏览器
                (matchStr = uaStr.match(/firefox\/([\d.]+)/)) ? 'firefox' :
                    // 判断chrome 浏览器
                    (matchStr = uaStr.match(/chrome\/([\d.]+)/)) ? 'chrome' :
                        // 判断opera 浏览器
                        (matchStr = uaStr.match(/opera.([\d.]+)/)) ? 'opera' :
                            // 判断safari 浏览器
                            (matchStr = uaStr.match(/version\/([\d.]+).*safari/)) ? 'safari' : undefined
        }

        const verNum = trident && ieTridents[trident] ? ieTridents[trident] : _.nth(matchStr, 1)
        const verStr = (getVersion !== undefined) ? browserChiType + '/' + verNum : browserChiType

        return { verNum, verStr }
    }
}
