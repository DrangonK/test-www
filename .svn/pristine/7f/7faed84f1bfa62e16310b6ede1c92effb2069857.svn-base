<template>
    <div class="suggest_pos_cont">
        <div v-if="showTips==0" class="tip_box">
            <p>
                <span class="loginName">{{$store.state.userName}}</span>，您的简历处于隐藏状态。</p>
            <i @click='showTips=-1' class="icon-close_gary_01"></i>
            <div class="tip_content">
                <i class="icon-resume_02"></i>
                <div>
                    开放简历才能让HR主动找你，增加机会。
                    <br>如暂不求职，请无视本条消息。
                </div>
            </div>
            <router-link :to="{name:'Privacy'}">公开设置</router-link>
        </div>
        <div v-else-if="showTips==1" class="tip_box">
            <p>
                <span class="loginName">{{$store.state.userName}}</span>，您的所在地可以填写更精准。</p>
            <i @click='showTips=-1' class="icon-close_gary_01"></i>
            <div class="tip_content">
                <i class="icon-addr_02"></i>
                <div>
                    精准填写，能够提升推荐职位精准度。
                    <br>企业HR更青睐现居地精准的简历。
                </div>
            </div>
            <router-link :to="{name:'Resume',query:{editItem:'basic'}}">立即处理</router-link>
        </div>
        <div v-else-if="showTips==2" class="tip_box">
            <p>
                <span class="loginName">{{$store.state.userName}}</span>，您今天还没有刷新简历。</p>
            <i @click='showTips=-1' class="icon-close_gary_01"></i>
            <div class="tip_content">
                <i class="icon-resume_03"></i>
                <div>
                    刷新简历可以更容易被企业发现
                    <br>如已找到工作，请修改求职状态，避免打扰。
                </div>
            </div>
            <router-link :to="{name:'Resume',hash:'#refreshRes'}">刷新简历</router-link>
        </div>
        <div class="main_box">
            <div class="title_wrap">
                <div class="title_min">
                    <transition name="el-fade-in-linear">
                        <p v-if="counterClick>2" @click="refresh">
                            <i class="icon-horn"></i>
                            推荐列表有更新！
                        </p>
                    </transition>
                    推荐职位
                </div>
            </div>
            <div class="content" ref="posList">
                <ul class="pos_list" v-if="recommendPosList.length>0">
                    <!-- <li class="title_guess">
                        以下职位您可能有兴趣
                    </li> -->
                    <li @click="increaseClick(index,$event.target)" v-for="(item,index) in recommendPosList" :data-id="item.posId" :key="index">
                        <div>
                            <!-- <a class="com_logo" :href="$store.state.domain+'/comp/'+item.comId" target="_blank">
                                <img :src="item.logoUrl || $store.state.domain+'/static/style/v4/images/default_com.jpg'" :title="item.comName">
                            </a> -->
                            <div class="com_logo" :href="$store.state.domain+'/comp/'+item.comId" target="_blank">
                                <img :src="item.logoUrl || $store.state.domain+'/static/style/v4/images/default_com.jpg'" :title="item.comName">
                                <span v-if="!item.hasApply" data-act="apply" @click="getResumeList(item.posId,index)">立即投递</span>
                                <span v-else class="disabled" data-act="apply">已投递</span>
                            </div>
                            <div class="line_1">
                                <div class="col_0 pos_main_msg">
                                    <div @mouseenter="showBox($event.currentTarget)" @mouseleave="hideBox($event.currentTarget)" class="pos_main_content">
                                        <p>
                                            <a class="pos_name" :href="`${$store.state.domain}/${item.address.cityNameEn}/job_${item.posNum}?fromPerCenterRecommend=true`" :title="item.posName" target="_blank">
                                                {{item.posName}}
                                            </a>
                                            <i v-if="item.urgent==1" class="icon-urgent_job"></i>
                                        </p>
                                        <span>{{item.salaryStr}}</span>
                                    </div>
                                    <div @mouseenter="keepBox" @mouseleave="hideBox($event.currentTarget)" class="pos_detail_msg">
                                        <div class="header">
                                            <div class="fr">
                                                <div class="table_cell">
                                                    <!-- <a class="link" :href="$store.state.domain+'/'+item.address.cityNameEn+'/job_'+item.posNum" target="_blank">查看详情</a> -->
                                                    <span v-if="item.isFavorite" @click="deleteFavorite(item.posId,index)" class="no_bg" data-act="apply">取消收藏</span>
                                                    <span v-else @click="favorite(item.posId,index)" class="no_bg" data-act="apply">收藏</span>
                                                    <span v-if="!item.hasApply" data-act="apply" @click="getResumeList(item.posId,index)">立即投递</span>
                                                    <span v-else class="disabled" data-act="apply">已投递</span>
                                                </div>
                                            </div>
                                            <div class="left table_cell">
                                                <a class="pos_name" :href="$store.state.domain+'/'+item.address.cityNameEn+'/job_'+item.posNum" target="_blank" :title="item.posName">{{item.posName}}</a>
                                                <br>
                                                <a class="com_name" :href="$store.state.domain+'/comp/'+item.comId" target="_blank" :title="item.comName">{{item.comName}}</a>
                                            </div>
                                        </div>
                                        <div class="body">
                                            <p>职位描述</p>
                                            <pre>{{item.description}}</pre>
                                            <a class="pos_name" :href="`${$store.state.domain}/${item.address.cityNameEn}/job_${item.posNum}?fromPerCenterRecommend=true`" target="_blank">查看职位详情</a>
                                        </div>
                                    </div>
                                </div>
                                <a class="com_name" :href="$store.state.domain+'/comp/'+item.comId" :title="item.comName" target="_blank">{{item.comName}}</a>
                            </div>
                            <div class="line_2">
                                <div class="col_0">
                                    {{formatStr([item.reqDegreeStr,trsforJobyearType(item.reqWorkYear,item.reqWorkYearStr),item.workLocationStr])}}
                                </div>
                                <span>{{item.industryStr||''}}</span>
                            </div>
                            <div class="line_3">
                                <div v-if="item.taolabels&&item.taolabels.length>0" class="col_0">
                                    <span v-for="(taoLabel,i) in item.taolabels" :key="i">{{taoLabel}}</span>
                                </div>
                                <span>{{item.freDateStr}}刷新</span>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="no_data" v-else>
                    <i class="icon-empty_02"></i>
                    <p>
                        新的推荐还没出炉
                        <br>
                        <span class="color_909399">拒绝等待，主动出击！</span>
                    </p>
                    <p>
                        <a :href="$store.state.domain+'/s/result/kt0/'" class="custom_btn_m">搜一下</a>
                    </p>
                </div>
                <template v-if="recommendPosList.length>0">
                    <el-button v-if="returnNum>=10" @click="getRecommendPos(false)" :loading="isLoading" class="load_more">加载更多结果</el-button>
                    <!-- <div v-if="returnNum>=10" @click="getRecommendPos(true)" class="load_more">加载更多结果</div> -->
                    <div v-else class="no_more">
                        <span>暂无更多推荐结果，建议
                            <a class="color_orange" :href="$store.state.domain+'/s/result/kt0/'">搜索职位</a>
                        </span>
                    </div>
                </template>
            </div>
            <el-dialog :visible.sync="visible" title="我要应聘" width="306px">
                <div class="selectResume">
                    <p class="top">选择投递的简历：</p>
                    <el-select v-model="resumeId" size="small">
                        <el-option v-for="(item,index) in perResumeList" :key="index" :label="item.resumeName" :value="item.id"></el-option>
                    </el-select>
                    <p class="bottom">简历完整度：{{perfectNum}}%</p>
                    <el-button @click="apply()" :loading="loading" round size="mini" type="primary" class="fr">确定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { formatStr, trsforJobyearType } from '../common/common'
import {
  getRecommendPos,
  apply,
  gePublicSetting,
  favorite,
  deleteFavorite
} from '../api/index'
import { getResumeList } from '../api/resume'
import { clearTimeout } from 'timers'

@Component({
  name: 'Index'
})
export default class Index extends Vue {
  // showTips==0 公开设置  showTips==1 精确填写地区   showTips==2 刷新简历
  public showTips: number = -1
  public recommendPosList: recommendPosList[] = []
  public returnNum: number = 0 // 【当前请求】是否有返回数据
  public perResumeList: object[] = []
  public resumeId: number = 0
  public posId: number = 0
  public visible: boolean = false // 应聘弹窗的显示
  public loading: boolean = false
  public times: number = 500 // 500ms 时间
  public timer: any = null // 定时器
  public counterClick: number = 0 // 记录点击的次数 每两次触发一次小喇叭
  public pageNo: number = 1 // 页码
  public clickIndex: number = 0 // 用于记录点击申请职位 li 的 index
  public isLoading: boolean = false

  created() {
    this.getRecommendPos(false)
    this.gePublicSetting()
  }
  mounted() {
    let timer: any = null
    window.addEventListener('scroll', () => {
      if (this.returnNum < 10 || this.isLoading) return
      window.clearTimeout(timer)
      timer = setTimeout(() => {
        let scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop
        let posList = this.$refs.posList as Element
        if (!posList) return
        let diff = posList.getBoundingClientRect().bottom - window.innerHeight

        if (diff < 100 && (this.pageNo - 1) % 3 !== 0) {
          this.getRecommendPos(false)
        }
      }, 20)
    })
  }
  public showBox(element: HTMLElement): void {
    // @ts-ignore
    let posDetailMsg: HTMLElement = element.parentElement.querySelector(
      '.pos_detail_msg'
    )
    // 隐藏所有的弹窗
    let boxList = document.querySelectorAll('.pos_detail_msg')
    for (let box of boxList) {
      // @ts-ignore
      box.style.display = 'none'
    }

    // 必须加上 window
    window.clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      posDetailMsg.style.display = 'block'
      // 设置定位方式
      let height: number = posDetailMsg.offsetHeight
      let winHeight: number = document.documentElement.clientHeight
      let top = element.getBoundingClientRect().top
      let diff: number = height + top - winHeight - 23 // 差值

      if (diff > 0) {
        posDetailMsg.style.top = -diff + 'px'
      } else {
        posDetailMsg.style.top = '0'
      }
    }, this.times)
  }
  public hideBox(element: HTMLElement) {
    // @ts-ignore
    let posDetailMsg: HTMLElement = element.parentElement.querySelector(
      '.pos_detail_msg'
    )

    window.clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      posDetailMsg.style.display = 'none'
    }, this.times)
  }
  public keepBox() {
    // 不能写在html里面
    window.clearTimeout(this.timer)
  }

  // 获取简历公开状态
  public async gePublicSetting() {
    let res: any = await gePublicSetting()
    if (res.code === 200) {
      if (res.data.publicSettings !== 0) {
        this.showTips = 0
      } else if (!res.data.isLocationDetail) {
        this.showTips = 1
      } else if (!res.data.isShowRefreshRes) {
        this.showTips = 2
      }
    } else {
      this.showTips == -1
    }
  }

  // 职位推荐 - 获取推荐  replace:是否替换数据
  public async getRecommendPos(replace: boolean = false) {
    this.isLoading = true
    let res: any = await getRecommendPos({ flush: replace, pn: this.pageNo })

    if (res.code === 200) {
      if (res.data.posList && res.data.posList.length > 0) {
        res.data.posList.forEach((item: object) => {
          Object.assign(item, { hasCount: false })
        })
        if (!replace) {
          // @ts-ignore
          this.recommendPosList.push(...res.data.posList)
        } else {
          this.recommendPosList = res.data.posList
        }
        this.returnNum = res.data.posList.length
      } else {
        // 没有返回结果
        if (replace) {
          this.recommendPosList = []
        }
        this.returnNum = 0
      }

      this.pageNo += 1
    } else {
      this.returnNum = 0
      this.$message.error(res.msg)
    }
    this.isLoading = false
  }
  // 转换职位的要求  =>高中 | 不限 | 东莞-长安镇
  public formatStr(arr: Array<string>): string {
    return formatStr(arr)
  }
  // 转换工作年限
  public trsforJobyearType(
    jobyearType: number,
    jobyearTypeStr: string
  ): string {
    return trsforJobyearType(jobyearType, jobyearTypeStr)
  }

  // 投递职位
  public async apply() {
    if (!this.posId || !this.resumeId) {
      this.$message.error('职位不存在或者简历不存在!')
    }
    this.loading = true
    let data = {
      posId: this.posId,
      resumeId: this.resumeId, // 缺少字段
      confirm: false,
      fromPerCenterRecommend: true
    }
    let res = await apply(data)

    this.loading = false
    if (res.code === 200) {
      this.visible = false
      this.$message.success('投递成功!')

      // @ts-ignore
      this.recommendPosList.find((item: object) => {
        // @ts-ignore
        return item.posId === this.posId
      }).hasApply = true
      this.increaseClick(this.clickIndex)
      this.$store.commit('hadlerLeftTips', { type: 'apply', num: 1 })
    } else {
      this.$message.error(res.msg)
    }
  }
  // 获取简历列表
  public async getResumeList(posId: number, index: number) {
    let res: any = await getResumeList()

    if (res.code === 200) {
      this.posId = posId
      this.resumeId = res.data.defaultId
      this.perResumeList = res.data.perResumeList
      if (this.perResumeList.length === 1) {
        this.apply()
      } else if (this.perResumeList.length > 1) {
        this.visible = true
      }
      this.clickIndex = index
    } else {
      this.$message.error(res.msg)
    }
  }
  // 选择简历 ->改变完整度
  get perfectNum(): number {
    if (this.perResumeList.length > 0) {
      return (
        // @ts-ignore
        this.perResumeList.find(item => {
          // @ts-ignore
          return item.id === this.resumeId
          // @ts-ignore
        }).perfectNum || 0
      )
    } else {
      return 0
    }
  }
  // 取消收藏职位
  public async deleteFavorite(posId: number, index: number) {
    let res = await deleteFavorite(posId)

    if (res.code === 200) {
      // @ts-ignore
      this.recommendPosList[index].isFavorite = false
      this.$store.commit('hadlerLeftTips', { type: 'favorite', num: -1 })
    } else {
      this.$message.error(res.msg)
    }
  }
  // 收藏职位
  public async favorite(posId: number, index: number) {
    let res = await favorite({ posId: posId, fromPerCenterRecommend: true })

    if (res.code === 200) {
      // @ts-ignore
      this.recommendPosList[index].isFavorite = true
      this.increaseClick(index)
      this.$store.commit('hadlerLeftTips', { type: 'favorite', num: 1 })
    } else {
      this.$message.error(res.msg)
    }
  }
  // 点击【推荐职位列表有更新】按钮
  public refresh() {
    this.counterClick = 0
    this.pageNo = 1
    this.getRecommendPos(true)
    // window.scrollTo(0,0)
    // @ts-ignore
    document.querySelector('.to_top').click()
  }
  // 增加点击次数
  public increaseClick(index: number, element?: HTMLElement) {
    // 如果已被计数过
    if (this.recommendPosList[index].hasCount) return

    if (!element || (element && element.classList.contains('pos_name'))) {
      this.recommendPosList[index].hasCount = true
      this.counterClick += 1
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../style/index.scss';
</style>
