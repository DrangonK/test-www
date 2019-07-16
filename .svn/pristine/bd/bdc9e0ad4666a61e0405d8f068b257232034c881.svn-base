import { EggAppInfo } from 'egg'
import * as ip from 'ip'
import * as path from 'path'
import { DefaultConfig } from './config.default'
import { Constants } from './constants'

export default (app: EggAppInfo) => {
    const config: DefaultConfig = {}

    config.static = {
        maxAge: 0 // maxAge 缓存，默认 1 年
    }

    config.logview = {
        dir: path.join(app.baseDir, 'logs')
    }

    config.development = {
        ignoreDirs: ['app/web', 'public', 'config'], // 指定过滤的目录（包括子目录）
        watchDirs: ['build'] // 指定监视的目录（包括子目录），当目录下的文件变化的时候自动重载应用，路径从项目根目录开始写
    }

    const localIP = ip.address()
    const domainWhiteList = [];
    [7001, 9000, 9001].forEach((port) => {
        // @ts-ignore
        domainWhiteList.push(`http://localhost:${port}`)
        // @ts-ignore
        domainWhiteList.push(`http://127.0.0.1:${port}`)
        // @ts-ignore
        domainWhiteList.push(`http://${localIP}:${port}`)
    })
    config.security = { domainWhiteList }

    /*config.cluster = {
      listen: {
        hostname: '127.0.0.1',
        port: 80,
      },
    };*/

    config.domain = Constants.MY_SZTEST_URL
    config.baseApi = Constants.BASE_API
    config.domain2=Constants.EYAS_LOCAL_URL

    return config
}
