import { Controller } from 'egg'
export default class AppController extends Controller {
    public async index() {
        try {
            // 旧版本浏览器渲染的页面
            const { verNum, verStr } = this.ctx.helper.getBrowser()
            // this.logger.error('浏览器版本' + verNum + verStr)
            if (verStr === 'ie' && verNum < 10) {
                await this.ctx.render('compatible/index.html')
                return
            }
        } catch (e) {
            this.logger.error(e)
        }

        await this.ctx.render('index.html')
    }
}
