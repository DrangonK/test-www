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
  config.domain = Constants.MY_SZTEST_URL
  config.baseApi = Constants.BASE_API
  config.domain2=Constants.EYAS_SZTEST_URL

  /*config.alinode = {
    appid: '76328',
    secret: 'e21aca1a0d5a8e831d64c4602651fcdb5f9f4ae5',
  };*/

  return config
}
