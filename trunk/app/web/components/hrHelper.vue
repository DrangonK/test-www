<template>
    <div v-if="hrData.hrChatbotEnabled" class="hr_helper" data-env="dev">
        <span v-if="hrData.unchattedPosNum>0" class="hr_msg_num">{{hrData.unchattedPosNum}}</span>
        <i @click="talkToHr" class="icon-hr_helper" ref="btnShow"></i>
        <el-dialog :visible.sync="visible" title="温馨提示" width="350px" append-to-body :close-on-press-escape="false" :close-on-click-modal="false" :lock-scroll="false">
            <div class="helper_content">
                <i class="icon-hr"></i>
                <p>在线面试能让企业HR更了解你，<br>直面邀请率提升
                    <span class="color_orange">100%</span>
                </p>
                <a class="btn_contact" @click="initHr">马上面试</a>
            </div>
        </el-dialog>
    </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import _ from 'lodash';
import Cookies from 'js-cookie';
import { hrHelper } from '../api/index';

@Component({
  name: 'HrHelper'
})
export default class HrHelper extends Vue {
  public visible: boolean = false;
  public hrData: hrData = {
    hrChatbotEnabled: false,
    hrChatbotEnv: 'dev',
    posNum: 0,
    unchattedPosNum: 0,
    token: '',
    url: '',
    companyNum: 0
  };

  created() {
    this.hrHelper();
  }
  public async hrHelper() {
    let res: any = await hrHelper();
    if (res.code === 200) {
      this.hrData = res.data;

      if (this.hrData && _.isEmpty(this.hrData)) return;

      let hr = document.getElementById('hr_helper');
      if (!hr) {
        hr = document.createElement('script');
        hr.id = 'hr_helper';
        // @ts-ignore
        hr.src =
          `http://cdn.mesoor.com/inject/chatbot-07211333.js?t=` +
          new Date().getTime();

        document.body.appendChild(hr);
        hr.onload = () => {
          if (this.$route.query.hr === '1') {
            setTimeout(() => {
              //   this.initHr();
              // @ts-ignore
              this.$refs.btnShow.click();
              // 给时间js执行，再初始化--应该是这样子的
            }, 300);
          }
        };
      }
    }
  }
  public talkToHr() {
    if (Cookies.get('hrTips') !== '1') {
      this.visible = true;
      Cookies.set('hrTips', '1');
    } else {
      this.initHr();
    }
  }
  // 初始化【求职助手】
  public initHr() {
    this.visible = false;
    // @ts-ignore
    chatbot.init(this.hrData.token, { environment: this.hrData.hrChatbotEnv });
  }
}
</script>

<style lang='scss' scoped>
@import '../style/variable';

$top: -40;
.hr_helper {
  position: absolute;
  top: $top + px;
  left: -50px;
  cursor: pointer;

  //   @media screen and (max-width: 1250px) {
  //     right: -60px;
  //   }

  animation: hr_helper 1.8s linear infinite;

  .hr_msg_num {
    position: absolute;
    top: 9px;
    left: 82px;
    height: 18px;
    line-height: 18px;
    font-size: 14px;
    color: #fff;
    padding: 0 5px;
    background: $color_red;
    border-radius: 10px;
  }

  > i {
    display: block;
  }
}

@keyframes hr_helper {
  0% {
    top: $top + px;
  }

  50% {
    top: ($top + 4) + px;
  }

  100% {
    top: $top + px;
  }
}
.el-dialog__body {
  text-align: center;
}
.helper_content {
  padding-bottom: 10px;
  font-size: 16px;
  text-align: center;
  > i {
    display: block;
    margin: 0 auto;
  }
  > p {
    line-height: 26px;
    color: #000;
    margin: 0 0 20px;
  }
  > a {
    display: inline-block;
    width: 130px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    border-radius: 20px;
    background: $color_main;
    &:hover {
      background: $color_bg_hover;
    }
  }
}
</style>
