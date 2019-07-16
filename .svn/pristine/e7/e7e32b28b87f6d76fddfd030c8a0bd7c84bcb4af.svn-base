<template>
    <div class="side_cont">
        <ul class="side_content">
            <li class="kefu_consult">
                <div class="text">
                    <br>在线客服
                </div>
                <div @click="kefu53" class="box_53kf">
                    客服为您解答
                    <p id="iframe_cont"></p>
                </div>
            </li>
            <li @click="visible=true" class="feedback">
                <div class="text">
                    <br>意见反馈
                </div>
            </li>
            <li class="zt_app">
                <div class="text">
                    <br>智通APP
                </div>
                <div class="qrCode">
                    <p>扫码下载智通APP</p>
                    <img :src="$store.state.domain+'/static/style/v4/images/qr_code_app.png'" width="100" height="100" alt="智通APP">
                </div>
                <i class="icons"></i>
            </li>
            <li class="to_top" ref="toTop">
                <div class="text">
                    <br>回顶部
                </div>
            </li>
        </ul>
        <el-dialog id="jFeedbackBox" :visible.sync="visible" :append-to-body="true" title="意见反馈" top="10vh" width="520px">
            <el-form :model="form" :rules="rules" ref="form" label-position="right" label-width="84px">
                <el-form-item label="类型：" class="feedback_type">
                    <el-radio-group @change="changeType" v-model="form.type" class="per_radio">
                        <el-radio :label="1">建议</el-radio>
                        <el-radio :label="2">纠错</el-radio>
                        <el-radio :label="3">投诉</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="主题：" prop="subject" class="feedback_subject">
                    <el-radio-group v-model="form.subject" class="per_radio_border">
                        <template v-if="form.type===1">
                            <el-radio label="网站功能建议" border>网站功能建议</el-radio>
                            <el-radio label="招聘会建议" border>招聘会建议</el-radio>
                            <el-radio label="其他建议" border>其他建议</el-radio>
                        </template>
                        <template v-else-if="form.type===2">
                            <el-radio label="电话打不通" border>电话打不通</el-radio>
                            <el-radio label="长期无人接听" border>长期无人接听</el-radio>
                            <el-radio label="电话号码不对" border>电话号码不对</el-radio>
                            <el-radio label="信息有误" border>信息有误</el-radio>
                        </template>
                        <template v-else-if="form.type===3">
                            <el-radio label="虚假信息" border>虚假信息</el-radio>
                            <el-radio label="非法行为" border>非法行为</el-radio>
                        </template>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="内容：" prop="feedbackText">
                    <!-- <el-input v-model="form.feedbackText" type="textarea" placeholder="留下您宝贵的意见，谢谢！"></el-input> -->
                    <TextArea :value.sync="form.feedbackText" :rows="3" :totalCount="500" :placeholder="'留下您宝贵的意见，谢谢！'"></TextArea>
                </el-form-item>
                <el-form-item label="评分：" prop="starLevel" class="feedback_rate">
                    <el-rate v-model="form.starLevel" show-text :texts="texts"></el-rate>
                </el-form-item>
                <el-form-item label="反馈人：" prop="name">
                    <el-input v-model="form.name" maxlength="20" placeholder="留下您的姓名，方便我们联系您！"></el-input>
                </el-form-item>
                <el-form-item label="邮箱：" prop="email">
                    <el-input v-model="form.email" placeholder="留下您的邮箱，方便我们联系您！"></el-input>
                </el-form-item>
                <el-form-item label="手机：" prop="feedbackPhone">
                    <el-input v-model="form.feedbackPhone" maxlength="11" placeholder="留下您的手机，方便我们联系您！"></el-input>
                </el-form-item>
                <div>
                    <button @click="submit" type="button" class="custom_btn block">确定</button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script lang='ts'>
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import TextArea from './resume/textarea.vue'
    import {feedback} from '../api//index'
    import {isMobile} from '../common/validate'
    import {getBasicInfo} from '../api/resume'

    @Component({
        name: 'Side',
        components: {
            TextArea
        }
    })
    export default class Side extends Vue {
        public texts: string[] = [
            '1分很不满意',
            '2分不满意',
            '3分一般',
            '4分满意',
            '5分非常满意'
        ]
        public visible: boolean = false
        public form: feedBack = {
            feedbackPhone: '',
            feedbackText: '',
            email: '',
            url: '',
            type: 1,
            subject: '网站功能建议',
            starLevel: 4,
            name: ''
        }
        public rules = {
            subject: {required: true, message: '必填'},
            feedbackText: {required: true, message: '请填写您宝贵的反馈内容！'},
            starLevel: {required: true, message: '必填'},
            name: [
                {required: true, message: '请留下您的姓名！'},
                {max: 40, message: '不能超过40字'}
            ],
            email: [
                {required: true, message: '请填写您的邮箱！'},
                {type: 'email', message: '邮箱地址格式不对！'}
            ],
            feedbackPhone: [
                {required: false, message: '请填写您的邮箱！'},
                {validator: isMobile}
            ]
        }

        public async created() {
            let res: any = await getBasicInfo(this.$store.state.resumeId)

            if (res.code === 200) {
                let data = res.data.basicInfo
                this.form.name = data.userName
                this.form.email = data.email
                this.form.feedbackPhone = data.mobile
            }
        }

        mounted() {
            this.toTop()
        }

        public toTop(): void {
            let timer: any = null
            let bSys = true
            // let toTop = document.querySelector('.to_top')
            let toTop = this.$refs.toTop

            window.onscroll = function () {
                if (!bSys) {
                    clearInterval(timer)
                }
                bSys = false
            }
            // @ts-ignore
            toTop.onclick = function () {
                clearInterval(timer)
                timer = setInterval(function () {
                    let scollTop =
                        document.documentElement.scrollTop || document.body.scrollTop
                    let iSpeed = Math.floor(-scollTop / 8)
                    if (scollTop === 0) {
                        clearInterval(timer)
                    }
                    document.body.scrollTop = document.documentElement.scrollTop =
                        scollTop + iSpeed
                    bSys = true
                }, 1000 / 60)
            }
        }

        public kefu53() {
            window.open(
                'https://tb.53kf.com/code/client/9007928/1',
                'kefu',
                'height=600, width=800, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no'
            )
        }

        public changeType(value: number) {
            if (value == 1) {
                this.form.subject = '网站功能建议'
            } else if (value === 2) {
                this.form.subject = '电话打不通'
            } else if (value === 3) {
                this.form.subject = '虚假信息'
            }
        }

        public async submit() {
            // @ts-ignore
            this.$refs.form.validate(async (valid: boolean) => {
                if (valid) {
                    this.form.url = this.$store.state.domain + this.$route.path
                    let res: any = await feedback(this.form)

                    if (res.code === 200) {
                        this.visible = false
                        // this.refs.form.resetFields()
                        this.$message.success('谢谢您的反馈意见！')
                    } else {
                        this.$message.error(res.msg)
                    }
                }
            })
        }
    }
</script>

<style lang='scss' scoped>
    #jFeedbackBox {
        /deep/ .el-dialog__body {
            padding: 0 52px 52px 26px;
        }

        // 反馈类型
        .feedback_type {
            margin: 8px 0 0;

            /deep/ .el-radio + .el-radio {
                margin: 0 0 0 10px;
            }
        }

        //主题
        .feedback_subject {
            margin-bottom: 14px;
        }

        // 评分
        .feedback_rate {
            margin: -12px 0 5px;

            /deep/ .el-rate {
                //   margin-top: 8px;
                .el-rate__text {
                    margin-left: 18px;
                }

                .el-rate__icon {
                    font-size: 22px;
                }
            }
        }
    }

    .el-radio-group {
        display: block;
        position: relative;
        // ie10必须设置高度height才可以居中
        //   min-height: 40px;
        //   flex-wrap: wrap;
    }

    .per_radio {
        top: 12px;
    }

    .per_radio_border {
        top: 10px;
    }

    .per_radio_border {
        .el-radio {
            height: 26px;
            line-height: 24px;
            margin: 0 10px 3px 0 !important;
        }
    }
</style>
