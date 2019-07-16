<template>
    <div class="main_box">
        <div class="title_min">
            修改登录密码
        </div>
        <div class="content">
            <el-form ref="form" :model="form" :rules="rules" :validate-on-rule-change="false">
                <p v-if="hasDefaultPwd">无密码的账号容易丢失，建议您设置密码！</p>
                <el-form-item v-else prop="oldPassword" style="padding-top:20px">
                    <el-input v-model="form.oldPassword" type="password" placeholder="请输入旧密码"></el-input>
                </el-form-item>
                <el-form-item prop="newPassword">
                    <el-input v-model="form.newPassword" type="password" maxlength="20" placeholder="请设置新密码"></el-input>
                </el-form-item>
                <el-form-item prop="newPassword1">
                    <el-input v-model="form.newPassword1" type="password" maxlength="20" placeholder="重复新密码确认"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="submit" type="primary">确认更改密码</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Watch } from 'vue-property-decorator'
import { modifyPwd, judgeCurrentPwd } from '../../api/index'

@Component({
  name: 'Password'
})
export default class Password extends Vue {
  public hasDefaultPwd: boolean = false // 判断是否有当前密码,第三方登录没有当前密码
  public form = {
    oldPassword: '',
    newPassword: '',
    newPassword1: '',
    pwdError: false // 用在验证的值需要放在表单里
  }
  public rules = {
    oldPassword: [
      { required: true, message: '当前密码不能为空!' },
      {
        validator: (rule: any, value: any, callback: any) => {
          if (this.form.pwdError) {
            callback(new Error('旧密码输入错误'))
          } else {
            callback()
          }
        }
      }
    ],
    newPassword: [
      { required: true, message: '新密码不能为空!' },
      {
        validator: (rule: any, value: any, callback: any) => {
          if (!/\s/g.test(value)) {
            callback()
          } else {
            callback(new Error('不能含有空格'))
          }
        }
      },
      {
        validator: (rule: any, value: any, callback: any) => {
          if (value.length >= 6 && value.length <= 20) {
            callback()
          } else {
            callback(new Error('新密码长度应为6~20！'))
          }
        }
      }
    ],
    newPassword1: [
      { required: true, message: '重复新密码不能为空!' },
      {
        validator: (rule: any, value: any, callback: any) => {
          if (this.form.newPassword === this.form.newPassword1) {
            callback()
          } else {
            callback(new Error('您两次输入的密码不一致'))
          }
        }
      }
    ]
  }

  @Watch('form.oldPassword')
  resetError() {
    this.form.pwdError = false
  }
  public async created() {
    // 判断是否存在当前密码
    let res: any = await judgeCurrentPwd()
    if (res.code === 200) {
      this.hasDefaultPwd = res.data.hasDefaultPwd
    }
  }
  mounted() {
    window.setTimeout(() => {
      // @ts-ignore
      this.$refs['form'].clearValidate()
    }, 100)
  }

  // 提交表单
  public async submit() {
    // @ts-ignore
    this.$refs['form'].validate(async (valid: boolean) => {
      if (valid) {
        let res: any = await modifyPwd(this.form)
        if (res.code === 200) {
          this.$confirm('密码修改成功,请牢记您的新密码!', {
            type: 'success',
            showCancelButton: false,
            confirmButtonText: '确定'
          })
          this.hasDefaultPwd = false
          // @ts-ignore
          this.$refs['form'].resetFields()
        } else if (
          res.code === 400 &&
          res.data &&
          res.data.oldPasswordFail === 1
        ) {
          this.form.pwdError = true
          // @ts-ignore
          this.$refs['form'].validateField('oldPassword')
        } else {
          this.$message.error(res.msg)
        }
      }
    })
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/setting/password.scss';
</style>
