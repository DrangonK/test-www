<template>
    <transition name="el-fade-in-linear">
        <div id="verify_mobile" v-if="visible">
            <div class="form_box">
<!--                <i @click="closeModel" class="icon-close_btn_03"></i>-->
                <img src="/public/images/verify_phone.png">
                <div class="form_content">
                    <p>为保障您的信息安全，需验证手机号完成操作</p>
                    <el-form ref="form" :model="form" :rules="rules">
                        <el-form-item prop="mobile">
                            <el-input v-model="form.mobile" maxlength="11" placeholder="请输入手机号"></el-input>
                            <div @click="getDynamicCode(form.mobile)" :class="{disabled:disabled}" class="btn_getCode">
                                {{btnStr}}
                            </div>
                        </el-form-item>
                        <el-form-item prop="validCode">
                            <el-input v-model="form.validCode" maxlength="6" placeholder="请输入短信验证码"></el-input>
                        </el-form-item>
                        <button @click="submit(form.mobile,form.validCode)" type="button" class="custom_btn selected">
                            {{btnStr2}}
                        </button>
                    </el-form>
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
    import {Vue, Component, Watch} from 'vue-property-decorator'
    import {isMobile} from '../common/validate'
    import {getDynamicCode, modifyMobile} from '../api/index'

    @Component({
        name: 'VerifyMobile'
    })
    export default class VerifyMobile extends Vue {
        public disabled: boolean = true // 获取短信验证码按钮是否可点击
        public times: number = 60 // 倒计时60s
        public btnStr: string = '获取动态码' // 获取短信验证码的文案
        public isWaitting: boolean = false // 用于防止多次点击提交按钮
        public isCountDown: boolean = false // 使用正在倒数
        public btnStr2: string = '立即验证' // 提交按钮的文案

        public form = {
            mobile: '',
            validCode: ''
        }
        public rules = {
            mobile: [
                {required: true, message: '手机号不能为空', trigger: 'blur'},
                {validator: isMobile}
            ],
            validCode: [
                {required: true, message: '短信验证码输入错误', trigger: 'blur'},
                {max: 6, message: '请输入6位数字动态码', trigger: 'blur'},
                {min: 6, message: '请输入6位数字动态码', trigger: 'blur'},
            ]
        }

        @Watch('form.mobile')
        public watchMobile() {
            if (this.$refs['form']) {
                // @ts-ignore
                this.$refs['form'].validateField('mobile', errorMsg => {
                    if (errorMsg) {
                        this.disabled = true
                    } else {
                        this.disabled = false
                    }
                })
            }
        }

        @Watch('visible')
        watchVisible(visible: boolean) {
            if (visible) {
                this.$nextTick(() => {
                    this.form.mobile = this.$store.state.mobile || ''
                })
            }
        }

        get visible() {
            return !this.$store.state.isMobileActivated && this.$route.name;
        }

        public closeModel() {
            this.$store.commit('verifyMobile', {
                isMobileActivated: true
            })
        }

        // 获取短信验证码
        public getDynamicCode(mobile: number) {
            if (this.isCountDown) return
            // @ts-ignore
            this.$refs['form'].validateField('mobile', async (errorMsg: string) => {
                if (!errorMsg) {
                    this.isCountDown = true;
                    let res = await getDynamicCode(mobile)
                    if (res.code === 200) {
                        this.countDown()
                    } else {
                        this.$message.error(res.msg)
                        this.isCountDown = false;
                    }
                }
            })
        }

        public submit(mobile: number, validCode: number) {
            // @ts-ignore
            this.$refs['form'].validate(async (valid: boolean) => {
                if (valid) {
                    if (!this.isWaitting) {
                        this.btnStr2 = '提交中'
                        this.isWaitting = true

                        let res = await modifyMobile({mobile: mobile, validCode: validCode})

                        this.isWaitting = false
                        if (res.code === 200) {
                            this.closeModel();
                            this.$message.success('验证成功!')
                            this.btnStr2 = '立即验证'
                            this.$emit('submit', mobile)
                            window.location.reload();
                        } else {
                            this.$message.error(res.msg)
                            this.btnStr2 = '重新验证'
                        }
                    }
                }
            })
        }

        // 倒计时
        public countDown() {
            this.btnStr = '动态码已发送'
            let timer = setInterval(() => {
                this.btnStr = '重新获取' + this.times + 's';
                if (this.times <= 0) {
                    clearInterval(timer)
                    this.btnStr = '重新获取'
                    this.times = 60
                    this.isCountDown = false;
                }
                this.times--
            }, 1000)
        }
    }
</script>

<style scoped lang="scss">
    #verify_mobile {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;

        .form_box {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 480px;
            border: 15px solid rgba(0, 0, 0, .3);
            background: 0 0;
            margin: 0 auto;
            @at-root .form_content {
                padding: 0.1px 65px 50px;
                background: #fff;
                > p {
                    font-size: 16px;
                    color: #666;
                    margin: 23px 0 12px;
                }
            }
        }
    }

    .custom_btn {
        width: 100%;
        height: 50px;
    }

    /deep/ .el-input__inner {
        height: 50px;
        line-height: 50px;
    }

    .icon-close_btn_03 {
        position: absolute;
        top: -40px;
        right: -26px;
        opacity: 0.8;
        cursor: pointer;

        &:hover {
            opacity: 1;

        }
    }
</style>