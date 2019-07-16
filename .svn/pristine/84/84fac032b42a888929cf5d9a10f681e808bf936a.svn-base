<template>
    <el-dialog @close="$emit('closeModal')" :visible.sync="visible" :title="mobileActivation?'手机号码修改':'手机号码验证'" width="428px">
        <el-form ref="form" :model="form" :rules="rules" class="modify_mobile">
            <p class="text" v-if="mobileActivation">
              更改后，使用新号码进行登录
              <br>当前绑定手机号：{{mobile.slice(0,3)+'****'+mobile.slice(-4)}}
            </p>
            <p class="text" v-else>验证后，可用该手机进行登录</p>
            <el-form-item prop="mobile">
                <el-input @change="watchMobile" v-model="form.mobile" placeholder="手机号" maxlength="11"></el-input>
                <div @click="getDynamicCode(form.mobile)" :class="{disabled:disabled}" class="btn_getCode">{{btnStr}}</div>
            </el-form-item>
            <!-- <el-form-item class="img_capcha">
                    <el-col :span="17">
                        <el-input v-model="form.captcha" placeholder="请输入图片验证码"></el-input>
                    </el-col>
                    <el-col :span="6" :push="1">
                        <img :src="imgCapchaSrc">
                    </el-col>
                </el-form-item> -->
            <el-form-item prop="validCode">
                <el-input v-model="form.validCode" maxlength="6" placeholder="验证码"></el-input>
            </el-form-item>
            <button @click="submit(form.mobile,form.validCode)" type="button" class="custom_btn block">{{btnStr2}}</button>
        </el-form>
    </el-dialog>
</template>

<script lang='ts'>
import { Vue, Component, Watch } from 'vue-property-decorator'
import { getMobile, getDynamicCode, modifyMobile } from '../api/index'
import { isMobile } from '../common/validate'

@Component({
  name: 'ModifyMobile'
})
export default class ModifyMobile extends Vue {
  public visible: boolean = true
  public disabled: boolean = true // 获取短信验证码按钮是否可点击
  public times: number = 60 // 倒计时60s
  public btnStr: string = '获取验证码' // 获取短信验证码的文案
  public isWaitting: boolean = false // 用于防止多次点击提交按钮
  public isCountDown: boolean = false // 使用正在倒数
  public btnStr2: string = '确认验证手机号' // 提交按钮的文案
  public mobileActivation: number = 0 //0:未验证手机 1：已验证手机
  public mobile: number|string = ''
  public form = {
    mobile: '',
    validCode: ''
  }
  public rules = {
    mobile: [
      { required: true, message: '手机号不能为空',trigger: 'blur' },
      { validator: isMobile }
    ],
    validCode: [{ required: true, message: '短信验证码输入错误' }]
  }
  created() {
    this.getMobile()
  }

  @Watch('form.mobile')
  watchMobile() {
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
  public openModal() {
    this.visible = true
    this.$nextTick(() => {
      this.watchMobile()
    })
  }
  // 获取手机号码
  public async getMobile() {
    let res:any = await getMobile()

    if (res.code === 200) {
      this.form.mobile = res.data.mobileActivation?'':res.data.mobile;
      this.mobileActivation = res.data.mobileActivation
      this.mobile = res.data.mobile
      this.btnStr2 = res.data.mobileActivation?'确认更改手机号':'确认验证手机号'
    }
    // @ts-ignore
    // this.$refs['form'].validateField('mobile')
  }
    // 获取短信验证码
  public getDynamicCode(mobile: number) {
    if(this.isCountDown) return
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

          let res = await modifyMobile({ mobile: mobile, validCode: validCode })

          this.isWaitting = false
          if (res.code === 200) {
            this.visible = false
            this.$message.success('修改成功!')
            this.btnStr2 = '确认验证手机号'
            this.$emit('submit',mobile)
          } else {
            this.$message.error(res.msg)
            this.btnStr2 = '重新提交'
          }
        }
      }
    })
  }
  // 倒计时
  public countDown() {
    this.btnStr = '动态码已发送'
    let timer = setInterval(() => {
      this.btnStr = this.times + 'S重新获取'
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

<style lang='scss' scoped>
@import '../style/setting/binding.scss';
</style>

