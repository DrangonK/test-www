<template>
    <div class="left_cont">
        <div class="left_box" ref="leftBox">
            <div class="photo_content">
                <span class="photo" v-if="getRouteType==='resume'">
                    <img :src="$store.state.photoPath" />
                </span>
                <router-link v-else class="photo" :to="{name:'Resume'}">
                    <img :src="$store.state.photoPath" />
                </router-link>
            </div>
            <p class="loginName">{{$store.state.userName}}</p>
            <div ref="jobStateCont" class="job_state">
                <el-select @change="modifyJobState(jobState)" v-model="jobState">
                    <el-option v-for="item in jobStateList" :label="item.name" :value="item.state" :key="item.state" class="jobState-item"></el-option>
                </el-select>
                <i class="icon-arrow_down_yellow"></i>
                <!-- {{$store.state.jobStateStr}} -->
            </div>
            <ul class="left_nav">
                <li :class="getRouteType==='index'?'selected':''">
                    <router-link :to="{name:'Index'}">
                        <div>
                            <i class="default icon-home_default"></i>
                            <i class="hover icon-home_hover"></i>
                        </div>
                        <span>主页动态</span>
                    </router-link>
                </li>
                <li :class="getRouteType==='resume'?'selected':''">
                    <router-link :to="{name:'Resume'}">
                        <div>
                            <i class="default icon-resume_default"></i>
                            <i class="hover icon-resume_hover"></i>
                        </div>
                        <span>我的简历</span>
                    </router-link>
                </li>
                <li :class="getRouteType==='apply'?'selected':''">
                    <router-link :to="{name:'Apply'}">
                        <div>
                            <i class="default icon-apply_default"></i>
                            <i class="hover icon-apply_hover"></i>
                        </div>
                        <span>投递记录</span>
                        <transition name="el-fade-in-linear">
                            <i v-if="$store.state.applyTips>0" class="badge add">+1</i>
                        </transition>
                    </router-link>
                </li>
                <li :class="getRouteType==='favorite'?'selected':''">
                    <router-link :to="{name:'Favorite'}">
                        <div>
                            <i class="default icon-collect_default"></i>
                            <i class="hover icon-collect_hover"></i>
                        </div>
                        <span>职位收藏</span>
                        <transition name="el-fade-in-linear">
                            <i v-if="$store.state.favoriteTips===1" class="badge add">+1</i>
                            <i v-else-if="$store.state.favoriteTips==-1" class="badge minus">-1</i>
                        </transition>
                    </router-link>
                </li>
                <li :class="getRouteType==='setting'?'selected':''">
                    <router-link :to="{name:'Privacy'}">
                        <div>
                            <i class="default icon-gear_default"></i>
                            <i class="hover icon-gear_hover"></i>
                        </div>
                        <span>设置</span>
                    </router-link>
                </li>
            </ul>
            <HrHelper v-if="$route.name=='Index'"></HrHelper>
        </div>
    </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import HrHelper from './hrHelper.vue'
import { getJobState, modifyJobState } from '../api/index'
import { jobState } from '../api/dictionary'

@Component({
  name: 'LeftSide',
  components:{
      HrHelper
  }
})
export default class LeftSide extends Vue {
  public userName: string = ''
  public userPhoto: string = '' // 图片路径

  public jobState: number = 0
  public jobStateList: jobState[] = jobState

  // 计算属性
  get getRouteType(): string {
    return this.$route.meta.type
  }

  created() {
    this.getJobState()
  }
  public async getJobState() {
    let res: any = await getJobState()

    if (res.code === 200) {
      this.jobState = res.data.jobState
    }
  }
  get jobStateStr(): string {
    // @ts-ignore
    let str: string = this.jobStateList.find((item: jobState) => {
      return item.state === this.jobState
    }).name
    return str
  }
  public async modifyJobState(jobState: string) {
    let res = await modifyJobState({ jobState: String(jobState) })

    if (res.code === 200) {
      this.$message({
        message: '修改成功！',
        type: 'success'
      })
      this.$store.commit('saveBasicInfo', { jobStateStr: this.jobStateStr })
    } else {
      this.getJobState()
      this.$message.error('修改失败！请稍后重试')
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../style/left_side.scss';
</style>
