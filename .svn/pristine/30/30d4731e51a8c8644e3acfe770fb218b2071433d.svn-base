<template>
    <div class="main_box">
        <div class="title_min">
            <span class="fr">近两个月内被查看次数：{{viewTwoMonthCount}}次</span>
            <span class="color_orange">{{totalCount}}</span> 家企业查看了我
        </div>
        <div class="content">
            <ul class="pos_list" v-if="totalCount>0">
                <li v-for="(item,index) in data" :key="index">
                    <div class="pos_item">
                        <a :href="$store.state.domain+'/comp/'+item.comId" class="com_logo" :class="{'has_see': item.isRead===1}">
                            <img :src="item.logoUrl||$store.state.domain+'/static/style/v4/images/default_com.jpg'" />
                        </a>
                        <div class="line_1">
                            <span class="time">{{item.creTimeStr}}</span>
                            <p class="col_0">
                                <a class="com_name" :href="$store.state.domain+'/comp/'+item.comId" target="_blank" :title="item.comName">{{item.comName}}</a>
                                <el-tooltip class="see_me" v-if="item.lookStatus ===1" content="成功率较高，建议主动投递职位或留意通知" placement="right-start" effect="light" :offset="-8">
                                    <i class="icon-eye_05"></i>
                                </el-tooltip>
                            </p>
                            <span v-if="item.posRecruitingRecommend&&item.posRecruitingRecommend.length>0" class="text">可能适合您：</span>
                        </div>
                        <div class="line_2">
                            <span class="col_0">
                                {{formatStr([item.propertyStr,item.employeeNumberStr?item.employeeNumberStr+'人':'',item.industryStr])}}
                            </span>
                            <a v-for="(jobItem,i) in item.posRecruitingRecommend" :key="i" class="pos_name" :href="$store.state.domain+'/jobs/'+jobItem.posNo" target="_blank" :title="jobItem.posName">
                                {{jobItem.posName}}
                            </a>
                        </div>
                        <div class="line_3">
                            <p>
                                <i class="icon-shape_01"></i>
                                <span>{{item.comeFrom}}</span>
                            </p>
                            <!-- <p v-if="item.lookStatus ===1">
                                <i class="icon-eye_01"></i>
                                <span>已查看联系方式</span>
                            </p> -->
                        </div>
                    </div>
                </li>
            </ul>
            <div class="no_data" v-else>
                <i class="icon-empty_03"></i>
                <p>暂无被查看记录</p>
            </div>
            <div v-if="totalCount>0" class="page_cont">
                <el-pagination @current-change="changePage" :total="totalCount" :pager-count="5" :loading="true" layout="prev, pager, next"></el-pagination>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { formatStr } from '../common/common'
import { getSeeMeLog, getNoticeAmount } from '../api/index'

@Component({
  name: 'SeeMe'
})
export default class SeeMe extends Vue {
  public viewTwoMonthCount: number = 0
  public totalCount: number = 0
  public data: object = {}
  created() {
    this.getSeeMeLog(1)
  }

  public async getSeeMeLog(pn: number) {
    let res: any = await getSeeMeLog({ pn: pn })

    if (res.code === 200) {
      this.data = res.data.briefItems
      this.totalCount = res.data.totalCount
      this.viewTwoMonthCount = res.data.viewTwoMonthCount || 0
      // 坑--循环的调用该接口,以改变 导航栏上的数字提示
      let res2: any = await getNoticeAmount()
      if (res2.code === 200) {
        this.$store.commit('saveNoticeAmount', {
          amount_invite: res2.data.inviteUnreadCount,
          amount_seeMe: res2.data.viewUnreadCount,
          amount_msg: res2.data.msgUnreadCount
        })
      }
    }
  }
  public changePage(pn: number) {
    this.getSeeMeLog(pn)
  }
  public formatStr(arr: Array<string>): string {
    return formatStr(arr)
  }
}
</script>

<style lang='scss' scoped>
@import '../style/see_me.scss';
</style>
