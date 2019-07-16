import { Controller } from 'egg'
const _ = require('lodash')

export default class HomeController extends Controller {
    /**
     * resumeId  简历Id
     */
    public async exportPer() {
        const { ctx } = this
        const resumeId: string = _.get(ctx, 'params.resumeId', '')
        const result = await ctx.service.resume.getResumeInfoPer(resumeId)

        if (result.data.code === 200) {
            // const data = result.data.data.resumeDetail
            // data.domain = this.config.domain
            // data.domain = 'http://my.job5156.com'
            // await ctx.render('export/export-per.njk', data)
            const data={
                resumeViewVo:{
                    cnVo:result.data.data.resumeDetail
                },
                domain:this.config.domain2
            };
            
            await ctx.render('export/export-per.njk', data)
        } else {
            ctx.set(result.headers)
            ctx.status = result.data.code
            ctx.body = result.data
            this.logger.error(result.data)
        }

    }
}
