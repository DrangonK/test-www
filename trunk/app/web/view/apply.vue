<template>
    <div class="main_box">
        <div class="title_min">
            <div class="invite_state">
                <el-dropdown @command="switchType" trigger="click">
                    <span class="el-dropdown-link">
                        {{currentType.name}}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu class="state_menu" slot="dropdown">
                        <el-dropdown-item v-for="item in inviteState" :command="item.type" :key="item.type">{{item.name}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <span>
                对应的投递数：
                <span class="color_orange">{{typeTotalCount}}</span>
            </span>
        </div>
        <!-- <div class="content" v-loading.fullscreen="loading"> -->
        <div class="content">
            <ul v-if="typeTotalCount>0" class="pos_list">
                <li v-for="(item,index) in applyList" :key="index">
                    <div class="pos_item">
                        <div class="step_cont">
                            <template v-if="item.posFlag==1">
                                <div class="step_box" :class="{finish:item.type!=3}">
                                    <div class="text">已投递</div>
                                    <div class="step_block">
                                        <div class="dot">
                                            <i></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="step_box" :class="{finish:item.type==1||item.type==2}">
                                    <div class="text">已查看</div>
                                    <div class="step_block">
                                        <p class="line"></p>
                                        <div class="dot">
                                            <i></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="step_box" :class="{finish:item.type==2,invited:item.type==2}">
                                    <div v-if="item.type==2" @click="showDetail(item.perInviteLogId)" class="text">邀面试</div>
                                    <div v-else-if="item.type==3" class="text">不合适</div>
                                    <div v-else class="text">待沟通</div>
                                    <div class="step_block">
                                        <p class="line"></p>
                                        <div class="dot">
                                            <i></i>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <i v-else class="icon-overdue"></i>
                        </div>
                        <a class="com_logo cursor-default">
                            <img :src="item.logoUrl||$store.state.domain+'/static/style/v4/images/default_com.jpg'" />
                        </a>
                        <div class="line_1">
                            <a :href="$store.state.domain+'/jobs/'+item.posNum" target="_blank">{{item.posName}}</a>
                            <span>{{item.salaryStr}}</span>
                        </div>
                        <div class="line_2">
                            <a :href="$store.state.domain+'/comp/'+item.comId" target="_blank">{{item.comName}}</a>
                        </div>
                        <div class="line_3">
                            <span v-html="'投递于：'+formatTime(item.creTime)"></span>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="no_data" v-else>
                <i class="icon-empty_02"></i>
                <p>暂无记录</p>
            </div>
            <div v-if="typeTotalCount>0" class="page_cont">
                <el-pagination @current-change="changePage" :total="typeTotalCount" :page-size="10" :pager-count="5" :current-page.sync="currentPage" layout="prev, pager, next"></el-pagination>
            </div>
            <InviteDetail :inviteId="inviteId" :visible.sync="inviteDialogVisible"></InviteDetail>
        </div>
    </div>
</template>

<script lang='ts'>
import _ from 'lodash'
import Vue from 'vue'
import Component from 'vue-class-component'
import { getApplyLog } from '../api/index'
import { formatTime } from '../common/common'
import InviteDetail from '../components/invite_detail.vue'

@Component({
  name: 'Apply',
  components: { InviteDetail }
})
export default class Apply extends Vue {
  public loading: boolean = false
  public inviteState = [
    {
      type: -1,
      name: '全部状态',
      isCurrent: true
    },
    {
      type: 1,
      name: '已查看',
      isCurrent: false
    },
    {
      type: 2,
      name: '邀面试',
      isCurrent: false
    },
    {
      type: 3,
      name: '不合适',
      isCurrent: false
    }
  ]
  public typeTotalCount: number = 0 // 某类型(已查看)的下总数
  public currentPage: number = 1
  public inviteDialogVisible: boolean = false
  public inviteId: number = 0
  public applyList: object = {}

  created() {
    this.getApplyLog(1, -1)
  }
  // 计算当前被选择的类型
  get currentType(): object {
    return (
      this.inviteState.find(item => {
        return item.isCurrent
      }) || this.inviteState[0]
    )
  }
  // 切换状态
  public switchType(type: number) {
    this.getApplyLog(1, type, true)
    // 设置当前选择的类型，插件问题，需手动切换
    this.inviteState.forEach(item => {
      if (item.type === type) {
        item.isCurrent = true
      } else {
        item.isCurrent = false
      }
    })
  }
  // 获取投递记录
  public async getApplyLog(pn: number, type: number, isChangeType?: boolean) {
    this.loading = true
    let res: any = await getApplyLog({
      pn: pn,
      type: type
    })
    this.loading = false
    if (res.code === 200) {
      this.applyList = res.data.applyList
      this.typeTotalCount = res.data.typeTotalCount
      if (isChangeType) {
        this.currentPage = 1
      }
    } else {
      this.$message.error(res.msg)
    }
  }
  // 点击【邀面试】
  public showDetail(inviteId: number) {
    this.inviteDialogVisible = true
    this.inviteId = inviteId
  }
  public changePage(pn: number) {
    // @ts-ignore
    let type = this.currentType.type
    this.getApplyLog(pn, type)
  }
  public formatTime(value: number | string): string {
    return formatTime(value)
  }
}
</script>

<style lang='scss' scoped>
@import '../style/apply.scss';
</style>
