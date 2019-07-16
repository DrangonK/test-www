import * as path from 'path'
import * as util from 'util'

export default () => {
  const skipExt = [ '.png', '.jpeg', '.jpg', '.ico', '.gif' ]
  return function*(next) {
    const start = new Date().getTime()

    yield* next

    // @ts-ignore
    const that: any = this

    const rs = Math.ceil(new Date().getTime() - start)

    that.set('X-Response-Time', rs)

    const ext = path.extname(that.url).toLocaleLowerCase()
    const isSkip = skipExt.indexOf(ext) !== -1 && that.status < 400

    if (!isSkip) {
      const ip = that.get('X-Real-IP') || that.ip
      const port = that.get('X-Real-Port')
      const protocol = that.protocol.toUpperCase()
      const method = that.method
      const url = that.url
      const status = that.status
      const length = that.length || '-'
      const referrer = that.get('referrer') || '-'
      const ua = that.get('user-agent') || '-'
      const serverTime = that.response.get('X-Server-Response-Time') || '-'
      const message = util.format('[access] %s:%s - %s %s %s/%s %s %s %s %s %s',
        ip, port, method, url, protocol, status, length, referrer, rs, serverTime, ua)
      that.logger.info(message)
    }
  }
}
