<template>
    <div class="main_box">
        <div class="title_min">
            你关注了
            <span class="color_orange">{{totalCount}}</span> 家企业
        </div>
        <div class="content">
            <ul class="pos_list" v-if="totalCount>0">
                <li v-for="(item,index) in data" :key="index">
                    <div class="pos_item">
                        <a :href="$store.state.domain+'/comp/'+item.comId" class="com_logo" target="_blank">
                            <img :src="item.logoPath||$store.state.domain+'/static/style/v4/images/default_com.jpg'" />
                        </a>
                        <div v-if="item.isFocus" @click="unFocusCompany(item.id,index)" class="custom_btn_m">取消关注</div>
                        <div v-else @click="focusCompany(item.comId,item.comName,index)" class="custom_btn_m selected">关注</div>
                        <div class="line_1">
                            <a :href="$store.state.domain+'/comp/zp-'+item.comId+'.html'" class="fr" target="_blank">
                                在招
                                <span class="color_orange">{{item.recruitPosCount}}</span>
                                个职位
                            </a>
                            <p class="col_0">
                                <a class="com_name col_0" :href="$store.state.domain+'/comp/'+item.comId" target="_blank" title="item.comName">{{item.comName}}</a>
                            </p>
                        </div>
                        <div class="line_2">
                            <span class="col_0">
                                {{formatStr([item.propertyStr,item.employeeNumberStr+'人',item.industry])}}
                            </span>
                        </div>
                        <div v-if="item.taoLabel&&item.taoLabel.length>0" class="line_3">
                            <span v-for="(tao,i) in item.taoLabel" :key="i">{{tao}}</span>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="no_data" v-else>
                <i class="icon-empty_02"></i>
                <p>您还没有关注任何企业</p>
            </div>
            <div v-if="totalCount>0" class="page_cont">
                <el-pagination @current-change="changePage" :total="totalCount" :pager-count="5" layout="prev, pager, next"></el-pagination>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { formatStr } from '../common/common'
import { getCompany, focusCompany, unFocusCompany } from '../api/index'

@Component({
  name: 'CollectCompany'
})
export default class CollectCompany extends Vue {
  public totalCount: number = 0
  public data: object[] = []

  created() {
    this.getCompany(1)
  }

  public async getCompany(pn: number = 1) {
    let res: any = await getCompany({ pn: pn })
    if (res.code === 200) {
      res.data.perFollowComList.forEach((item: object) => {
        Object.assign(item, { isFocus: true })
      })

      this.data = res.data.perFollowComList
      this.totalCount = res.data.totalCount
    }
  }
  public async focusCompany(comId: number, comName: string, index: number) {
    let res: any = await focusCompany({ comId: comId, comName: comName })

    if (res.code === 200) {
      // @ts-ignore
      this.data[index].isFocus = true
      // @ts-ignore
      this.data[index].id = res.data.followId
      this.$message({
        message: '关注成功!',
        type: 'success'
      })
      this.totalCount++
    } else {
      this.$message.error(res.msg)
    }
  }
  public async unFocusCompany(followId: number, index: number) {
    let res = await unFocusCompany(followId)

    if (res.code === 200) {
      // @ts-ignore
      this.data[index].isFocus = false
      this.$message({
        message: '取消关注成功!',
        type: 'success'
      })
      this.totalCount--
    } else {
      this.$message.error(res.msg)
    }
  }
  public changePage(pn: number) {
    this.getCompany(pn)
  }
  public formatStr(arr: Array<string>): string {
    return formatStr(arr)
  }
}
</script>

<style lang='scss' scoped>
@import '../style/company.scss';
</style>
