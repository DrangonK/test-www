import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import Cookies from 'js-cookie'
import './style/common.scss'    // 公共样式,头，尾，侧边栏，雪碧图
import {logPerBehavWeb} from './common/log-behavior'
import ElementUI from 'element-ui'
import './filter/date'
import {checkLogin} from './api/index'

Vue.use(ElementUI)
// Vue.config.productionTip = false;

router.beforeEach(async (to, from, next) => {
    if (to.name !== 'Preview') {
        document.title = to.meta.docTitle || '个人中心'
    }
    /*let token: string = Cookies.get('per') || ''
    let res: any = await checkLogin(token)
    let data: checkLoginInfo = res.data
    if (res.code === 200) {
        if (!data.isMobileActivated) {
            store.commit('verifyMobile', {
                isMobileActivated: data.isMobileActivated,
                mobile: data.mobile || ''
            })
        }
    }*/
    next()
})

Vue.prototype.$log = logPerBehavWeb
router.afterEach((to, from) => {
    let cmd = null
    if (to.query.test === 'log-test') {
        cmd = 'test-perbehavlog'
    }
    // @ts-ignore
    logPerBehavWeb(cmd, null, undefined, from.path)
})

const vm = new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app')


