<template>
    <div class="main_box">
        <div class="title_min">
            当前已绑定手机：
        </div>
        <div class="content">
            <div class="item">
                <div class="btn" @click="visible = true">{{mobileActivation?'修改':'验证'}}</div>
                <i class="icon-mobile_03"></i>
                <span>{{form.mobile}}</span>
            </div>
            <p>绑定账号后可使用以下方式快速登录</p>
            <!--  <div class="item">
                 <a class="btn" href="http://www.job5156.com/connect/weixin/login">绑定</a>
                <i class="icon-wx_01"></i>
                <span>微信：未绑定</span>
            </div> -->
            <div class="item">
                <a class="btn unbingding" v-if="qq.id" @click="unbind(qq.id)">解绑</a>
                <a class="btn" v-else @click="bingding('qq')">绑定</a>
                <i class="icon-qq_01"></i>
                <span>QQ：{{qq.id?qq.openName:'未绑定'}}</span>
            </div>
            <div class="item">
                <a class="btn unbingding" v-if="weibo.id" @click="unbind(weibo.id)">解绑</a>
                <a class="btn" v-else @click="bingding('weibo')">绑定</a>
                <i class="icon-sina_01"></i>
                <span>微博：{{weibo.id?weibo.openName:'未绑定'}}</span>
            </div>
        </div>
        <ModifyMobile v-if="visible" @submit="form.mobile=$event" @closeModal="visible=false"></ModifyMobile>
    </div>
</template>

<script lang='ts'>
    import {Vue, Component} from 'vue-property-decorator'
    import {
        getMobile,
        thirdLogin,
        getConnectMsg,
        unbindThridConnect
    } from '../../api/index'
    import {isMobile} from '../../common/validate'
    import ModifyMobile from '../../components/modify_mobile.vue'

    @Component({
        name: 'Binding',
        components: {
            ModifyMobile
        }
    })
    export default class Binding extends Vue {
        public visible: boolean = false
        public qq = {}
        public weibo = {}
        public mobileActivation: number = 0 //0:未验证手机 1：已验证手机

        public form = {
            mobile: 0
        }
        public rules = {
            mobile: [
                {required: true, message: '手机号不能为空'},
                {validator: isMobile}
            ]
        }

        public async created() {
            let res: any = await getMobile()
            this.getConnectMsg()
            if (res.code === 200) {
                this.form.mobile = res.data.mobile
                this.mobileActivation = res.data.mobileActivation
            }
        }

        public async getConnectMsg() {
            let res: any = await getConnectMsg()
            if (res.code === 200) {
                this.qq = res.data.qq || {}
                this.weibo = res.data.weibo || {}
            }
        }

        public async bingding(type: string) {
            let res = await thirdLogin(type);
            if (res.code === 200) {
                window.location.href = res.url as string;
            } else {
                this.$message.error(res.msg)
            }
        }

        public async unbind(connectId: number) {
            const res = await unbindThridConnect(connectId);
            if (res.code === 200) {
                window.location.href = res.url as string;
            } else {
                this.$message.error(res.msg)
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../style/setting/binding.scss';
</style>
