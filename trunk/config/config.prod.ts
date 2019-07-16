/**
 * 生产环境配置
 *
 * 最终生效的配置为 prod + default（前者覆盖后者）
 */
import { EggAppInfo } from 'egg'
import { DefaultConfig } from './config.default'
import { Constants } from './constants'

export default (app: EggAppInfo) => {
    const config: DefaultConfig = {}
    config.keys = app.name + '_1529032017838_4056'
    config.domain = Constants.MY_URL
    config.baseApi = Constants.BASE_API
    config.domain2='http://my.job5156.com'
    
    config.alinode = {
        appid: '77036',
        secret: 'f38a243f399e5565dfbb584890b2e6371ec01c36'
    }

    return config
}
