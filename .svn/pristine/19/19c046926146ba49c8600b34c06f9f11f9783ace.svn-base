import Vue from 'vue'
import Router from 'vue-router'

const PerCenter = () => import('../view/PerCenter.vue')
const Index = () => import('../view/index.vue')
const Invite = () => import('../view/invite.vue')
const Apply = () => import('../view/apply.vue')
const SeeMe = () => import('../view/see_me.vue')
const Company = () => import('../view/company.vue')
const Message = () => import('../view/message.vue')
const Resume = () => import('../view/resume/resume.vue')
const Preview = () => import('../view/resume/preview.vue')
const Favorite = () => import('../view/favorite.vue')
const Privacy = () => import('../view/setting/privacy.vue')
const Binding = () => import('../view/setting/binding.vue')
const Password = () => import('../view/setting/password.vue')
const Subscribe = () => import('../view/setting/subscribe.vue')

Vue.use(Router)

export default new Router({
    mode: 'history'/* ,
    scrollBehavior(to, from, savedPosition) {
        // 跳到锚点
        if (to.hash) {
            return {
                selector: to.hash
            }
        }
    } */,
    // base: __dirname,
    routes: [
        {
            path: '/per',
            // name: 'PerCenter',
            component: PerCenter,
            children: [
                {
                    path: '',
                    name: 'Index',
                    component: Index,
                    meta: {
                        docTitle: '我的主页',
                        type: 'index'
                    }
                },
                {
                    path: 'job/invite',
                    name: 'Invite',
                    component: Invite,
                    meta: {
                        docTitle: '主页动态_邀请面试',
                        type: 'index'
                    }
                },
                {
                    path: 'job/view',
                    name: 'SeeMe',
                    component: SeeMe,
                    meta: {
                        docTitle: '主页动态_谁看过我',
                        type: 'index'
                    }
                },
                {
                    path: 'company',
                    name: 'Company',
                    component: Company,
                    meta: {
                        docTitle: '主页动态_关注企业',
                        type: 'index'
                    }
                },
                {
                    path: 'message',
                    name: 'Message',
                    component: Message,
                    meta: {
                        docTitle: '主页动态_站内消息',
                        type: 'index'
                    }
                },
                {
                    path: 'job/apply',
                    name: 'Apply',
                    component: Apply,
                    meta: {
                        docTitle: '投递记录',
                        type: 'apply'
                    }
                },
                {
                    path: 'job/favorite',
                    name: 'Favorite',
                    component: Favorite,
                    meta: {
                        docTitle: '设置_职位收藏',
                        type: 'favorite'
                    }
                },
                {
                    path: 'setting/privacy',
                    name: 'Privacy',
                    component: Privacy,
                    meta: {
                        docTitle: '设置_公开设置',
                        type: 'setting'
                    }
                },
                {
                    path: 'setting/bingding',
                    name: 'Binding',
                    component: Binding,
                    meta: {
                        docTitle: '设置_账号绑定',
                        type: 'setting'
                    }
                },
                {
                    path: 'setting/password',
                    name: 'Password',
                    component: Password,
                    meta: {
                        docTitle: '设置_修改密码',
                        type: 'setting'
                    }
                },
                {
                    path: 'setting/subscribe',
                    name: 'Subscribe',
                    component: Subscribe,
                    meta: {
                        docTitle: '设置_订阅',
                        type: 'setting'
                    }
                },
                {
                    path: 'resume/:id(\\d+)?',
                    name: 'Resume',
                    component: Resume,
                    props: true,
                    meta: {
                        docTitle: '我的简历',
                        type: 'resume'
                    }
                }
            ]
        },
        {
            path: '/per/resume/:id(\\d+)/preview',
            name: 'Preview',
            component: Preview,
            props: true,
            meta: {
                docTitle: '简历预览',
                type: 'preview'
            }
        },
        {
            path: '*',
            beforeEnter: (to, from, next) => {
                // 一般都是404
                if (to.path.startsWith('/per')) {
                    window.location.href = process.env.VUE_APP_DOMAIN + '/404'
                } else {
                    window.location.href = process.env.VUE_APP_DOMAIN + to.path
                }
            }
        }
    ]
})
