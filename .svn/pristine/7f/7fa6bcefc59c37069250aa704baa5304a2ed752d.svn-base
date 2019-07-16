<template>
    <div class="main_box">
        <div class="title_min">
            已收藏
            <span class="color_orange">{{totalCount}}</span> 个职位
        </div>
        <div class="content">
            <ul class="pos_list" v-if="totalCount>0">
                <li v-for="(item,index) in data" :key="index">
                    <div class="pos_item">
                        <img class="com_logo" :src="item.logoUrl||$store.state.domain+'/static/style/v4/images/default_com.jpg'" />
                        <i v-if="item.posStatus===0" class="icon-overdue"></i>
                        <div v-if="item.isFavorite" @click="deleteFavorite(item.posId,index)" class="custom_btn_m">取消收藏</div>
                        <div v-else @click="favorite(item.posId,index)" class="custom_btn_m selected">收藏</div>
                        <div class="line_1">
                            <span>{{item.creTimeStr}}</span>
                            <p class="col_0">
                                <a class="pos_name" :href="$store.state.domain+'/jobs/'+item.posNum" target="_blank" :title="item.posName">{{item.posName}}</a>
                                <span>{{item.salaryStr}}</span>
                            </p>
                        </div>
                        <div class="line_2">
                            {{formatStr([item.comName,item.reqDegreeStr,item.workYearStr,item.jobLocationStr])}}
                        </div>
                        <div v-if="item.taoLabels && item.taoLabels.length>0" class="line_3">
                            <span v-for="(taoLabel,i) in taoLabels(item.taoLabels)" :key="i">{{taoLabel}}</span>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="no_data" v-else>
                <i class="icon-empty_collect"></i>
                <p>您还没有收藏任何职位</p>
                <p>
                    <a :href="$store.state.domain+'/s/result/kt0/'" class="custom_btn_m">去找职位</a>
                </p>
            </div>
            <div v-if="totalCount>0" class="page_cont">
                <el-pagination @current-change="changePage" :total="totalCount" :page-size="5" :pager-count="5" layout="prev, pager, next"></el-pagination>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { getFavoriteList, favorite, deleteFavorite } from '../api/index'
import { formatStr } from '../common/common'

@Component({
  name: 'Position'
})
export default class Position extends Vue {
  public totalCount: number = 0
  public data: object[] = []

  created() {
    this.getFavoriteList(1)
  }
  public async getFavoriteList(pn: number) {
    let res: any = await getFavoriteList(pn)

    if (res.code === 200) {
      res.data.favoriteList.forEach((item: object) => {
        Object.assign(item, { isFavorite: true })
      })

      this.data = res.data.favoriteList
      this.totalCount = res.data.totalCount
    } else if (!(res.code == 400 && !res.data)) {
      // (res.code == 400 && !res.data) -> 没有收藏职位，并未报错--后端要求特殊处理
      this.$message.error(res.msg)
    }
  }
  public async deleteFavorite(posId: number, index: number) {
    let res = await deleteFavorite(posId)

    if (res.code === 200) {
      // @ts-ignore
      this.data[index].isFavorite = false
    } else {
      this.$message.error(res.msg)
    }
  }
  public async favorite(posId: number, index: number) {
    let res = await favorite({ posId: posId, fromPerCenterRecommend: false })

    if (res.code === 200) {
      // @ts-ignore
      this.data[index].isFavorite = true
    } else {
      this.$message.error(res.msg)
    }
  }
  public changePage(pn: number) {
    this.getFavoriteList(pn)
  }
  // 限制企业亮点的个数为5个
  public taoLabels(taoLabels: Array<string>): Array<string> {
    taoLabels.length > 5 && (taoLabels.length = 5)
    return taoLabels
  }
  public formatStr(arr: Array<string>): string {
    return formatStr(arr)
  }
}
</script>

<style lang='scss' scoped>
@import '../style/favorite.scss';
</style>
