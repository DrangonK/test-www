import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'
import * as fs from 'fs'
import * as path from 'path'

export type DefaultConfig = PowerPartial<EggAppConfig & BizConfig>

export interface BizConfig {
  sourceUrl: string
}

export default (app: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig> & BizConfig

  config.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(app.baseDir, 'app/public/favicon.ico'))
  }

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.njk': 'nunjucks'
    }
  }

  config.vuessr = {
    layout: path.join(app.baseDir, 'app/web/view/layout.html')
  }

  config.logger = {
    consoleLevel: 'DEBUG',
    dir: path.join(app.baseDir, 'logs')
  }

  config.static = {
    dir: path.join(app.baseDir, 'app/public'),
    prefix: '/public/'
  }

  config.security = {
    csrf: false
  }

  config.keys = app.name + '_1529032017838_4056'

  config.middleware = [
    'access',
    'cleanCache'
  ]

  return config
}
