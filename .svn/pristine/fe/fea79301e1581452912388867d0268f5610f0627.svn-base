import { Service } from 'egg'

/**
 * Test Service
 */
export default class Resume extends Service {
    // 个人端的接口
    public async getResumeInfoPer(resumeId: string, data?: any) {
        const { ctx } = this
        if (ctx.header.cookie) {
            try {
                // return await ctx.curl(`${this.config.domain + this.config.baseApi}/com/resume/${resumeId}`, {
                return await ctx.curl(`${this.config.domain + this.config.baseApi}/per/resume/${resumeId}`, {
                    data,
                    dataType: 'json',
                    headers: {
                        posTypeNewFlag:'true',
                        Accept: 'application/json',
                        AppType: 'pc',
                        // Cookie: 'per=32975ee8f1df1d1d4c4f0ecb50933f80',
                        Cookie: ctx.header.cookie
                    },
                    method: 'GET',
                    timeout: 3000
                })
            } catch (e) {
                this.logger.error(e)
                return {
                    data: {
                        code: 400,
                        msg: '获取简历数据超时'
                    }
                }
            }
        } else {
            return {
                data: {
                    code: 400,
                    msg: '没有cookie'
                }
            }
        }
    }
}
