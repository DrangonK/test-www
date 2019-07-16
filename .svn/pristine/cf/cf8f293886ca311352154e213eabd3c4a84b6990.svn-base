import axios from 'axios';
import _ from 'lodash';
import qs from 'qs';
import Vue from 'vue';

class Perbehavlog {
    /**
     * 记录用户行为日志
     * @param cmd cmd的定义见PerBehavConstants.java,如果为null，则后台会根据toUrl来自动判断
     * @param toUrl 行为的请求地址，如果为null，则使用当前页面地址
     * @param data json对象，记录行为的参数，如id，修改的内容等，参数名自定义（建议统一用小写，方便查找）
     */
    public static async logPerBehavWeb(cmd: string | null, toUrl: string | null, data?: any, referrer?: string) {
        let fu = '';
        let tu = '';
        let cd = '';
        let op = '';

        if (toUrl && toUrl.indexOf('http') !== -1) {
            tu = encodeURIComponent(toUrl);
        } else {
            tu = toUrl ? encodeURIComponent(location.protocol + '//' + (toUrl.charAt(0) === '/' ? '' : '/' ) + location.hostname + toUrl) : encodeURIComponent(window.location.href);
        }
        fu = toUrl ? encodeURIComponent(window.location.href) : referrer ? encodeURIComponent(referrer) : encodeURIComponent(document.referrer);

        try {
            if (window.opener != null) {
                op = encodeURIComponent(window.opener.document.location);
            }
        } catch (e) {
            console.warn(e);
        }
        if (Perbehavlog.getNotNullStr(fu) === '' && Perbehavlog.getNotNullStr(op) !== '') {
            fu = op;
        }

        fu = encodeURIComponent(fu);
        tu = encodeURIComponent(tu);
        cd = Perbehavlog.getUserDetail();

        const par = 'tu=' + tu + '&fu=' + fu + '&cd=' + cd;
        // const url = process.env.VUE_APP_DOMAIN + '/perbehavlog?' + par;
        const url = '/log/behavior?' + par;
        data = data === undefined ? {} : data;
        if (cmd) {
            _.set(data, 'cmd', cmd);
        }
        _.set(data, 'accessType', 'web');
        // data = qs.stringify(data);
        try {
            await axios(url, {
                params: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                },
                method: 'get',
                timeout: 0,
            });
        } catch (e) {
            // console.log(e);
        }
    }

    public static getNotNullStr(s: string) {
        if (s === null || s === '') {
            return '';
        }
        return s;
    }
    public static getUserDetail() {
        let s = '';
        s += 'OS:' + Perbehavlog.getOS() + ',BS:' + Perbehavlog.getBrowser() + ',DPI:' + screen.width + 'x' + screen.height + ','
            + 'TZ:' + (0 - new Date().getTimezoneOffset() / 60) + ',' + 'BL:' + Perbehavlog.getBrowserLanguage() + ','
            + 'ALEXA:' + Perbehavlog.isInstallAlexa();
        return s;
    }

    public static getOS() {
        const sUserAgent = navigator.userAgent;
        const isWin = (navigator.platform === 'Win32') || (navigator.platform === 'Windows');
        const isMac = (navigator.platform === 'Mac68K') || (navigator.platform === 'MacPPC') || (navigator.platform === 'Macintosh');
        if (isMac) {
            return 'Mac';
        }
        const isUnix = (navigator.platform === 'X11') && !isWin && !isMac;
        if (isUnix) {
            return 'Unix';
        }
        const isLinux = sUserAgent.indexOf('Linux') !== -1;
        if (isLinux) {
            return 'Linux';
        }
        if (isWin) {
            const isWin95 = sUserAgent.indexOf('Win95') > -1 || sUserAgent.indexOf('Windows 95') > -1;
            if (isWin95) {return 'Win95'; }
            const isWin98 = sUserAgent.indexOf('Win98') > -1 || sUserAgent.indexOf('Windows 98') > -1;
            if (isWin98) {return 'Win98'; }
            const isWinME = sUserAgent.indexOf('Windows 9x 4.90') > -1 || sUserAgent.indexOf('Windows ME') > -1;
            if (isWinME) {return 'WinME'; }
            const isWin2K = sUserAgent.indexOf('Windows NT 5.0') > -1 || sUserAgent.indexOf('Windows 2000') > -1;
            if (isWin2K) {return 'Win2000'; }
            const isWinXP = sUserAgent.indexOf('Windows NT 5.1') > -1 || sUserAgent.indexOf('Windows XP') > -1;
            if (isWinXP) {return 'WinXP'; }
            const isWin2003 = sUserAgent.indexOf('Windows NT 5.2') > -1 || sUserAgent.indexOf('Windows 2003') > -1;
            if (isWin2003) {return 'Win2003'; }
            const isWinVista = sUserAgent.indexOf('Windows NT 6.0') > -1 || sUserAgent.indexOf('Windows Vista') > -1;
            if (isWinVista) {return 'WinVista'; }
            const isWin7 = sUserAgent.indexOf('Windows NT 6.1') > -1;
            if (isWin7) {return 'Win7'; }
            const isWinNT4 = sUserAgent.indexOf('WinNT') >= -1 || sUserAgent.indexOf('WindowsNT') >= -1 || sUserAgent.indexOf('WinNT4.0') >= -1 || sUserAgent.indexOf('Windows NT 4.0') && (!isWinME && !isWin2K && !isWinXP);
            if (isWinNT4) {return 'WinNT4'; }
        }
        return 'None';
    }

    public static getBrowser() {
        const ua = navigator.userAgent.toLowerCase();
        let s;
        let version = '';
        (s = ua.match(/msie ([\d.]+)/)) ? version = 'IE ' + s[1] :
            (s = ua.match(/firefox\/([\d.]+)/)) ? version = 'Firefox ' + s[1] :
                (s = ua.match(/chrome\/([\d.]+)/)) ? version = 'Chrome ' + s[1] :
                    (s = ua.match(/opera.([\d.]+)/)) ? version = 'Opera ' + s[1] :
                        (s = ua.match(/version\/([\d.]+).*safari/)) ? version = 'Safari ' + s[1] : 'Safari 0';
        if (version === '') {version = 'None'; }
        return version;
    }

    public static getBrowserLanguage() {
        let language = '';
        if (navigator.appName === 'Netscape') {
            language = navigator.language;
        } else {
            // @ts-ignore
            language = navigator.browserLanguage;
        }
        return language;
    }

    public static isInstallAlexa() {
        const ua = navigator.userAgent.toLowerCase();
        if (ua.match(/alexa toolbar/)) {
            return 1;
        } else {
            return 0;
        }
    }
}

// Vue.prototype.$log = Perbehavlog.logPerBehavWeb;
// export const logPerBehavWeb = Vue.prototype.$log;
export const logPerBehavWeb = Perbehavlog.logPerBehavWeb;
