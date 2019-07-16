<template>
    <el-checkbox-group v-model="select" class="check-area-list" :class="{'check-pos-list': !!keyWord}" @change="change">
        <div class="area-list">
            <el-row :gutter='10' v-if="!keyWord">
                <div v-for="(item, i) in jobTypeList" :key="i" class="col col-6" @mouseleave="leaveSiteList($event, i)">
                    <div class="hasSub" :class="{'on':jobTypeShow[i],selectChild:selectJudge(item.id)}">
                        <template v-if="isEmpty(item.child)">
                            <el-checkbox :ref="`jobType${item.id}`" :label='item.id' class="noText" :value="item" :class="{'radio':max==1}"></el-checkbox>
                            <label class="text" :class="{cblue:selectJudge(item.id)}" @click="showSubSiteList($event, i)" :title="item.name">{{item.name}}</label>
                            <i class="el-icon-caret-bottom" @click="showSubSiteList($event, i)"></i>
                        </template>
                        <template v-else>
                            <el-checkbox :ref="`jobType${item.id}`" :label='item.id' :value="item" :class="{'radio':max==1}">{{item.name}}</el-checkbox>
                        </template>
                    </div>
                    <div class="subPost">
                        <el-row v-if="isEmpty(item.child) && jobTypeShow[i]">
                            <div class="col col-8 text-overflow" v-for="(val) in item.child" :key="val.id">
                                <div class="hasSub">
                                    <el-checkbox :ref="`jobType${val.id}`" :label='val.id' :value="val" :class="{'radio':max==1}">{{val.name}}</el-checkbox>
                                </div>
                            </div>
                        </el-row>
                    </div>
                </div>
            </el-row>
            <template v-else>
                <el-row :gutter='10' class="sreachList" v-for="(item, i) in sreachList" :key="i">
                    <div class="col col-6">
                        <el-checkbox class=" text-overflow" :ref="`jobType${item.id}`" :label='item.id' :value="item" :title="item.name">{{item.name}}</el-checkbox>
                    </div>
                    <el-row class="col col-18" v-if="isEmpty(item.child)">
                        <div class="col col-6 text-overflow" v-for="(val) in item.child" :key="val.id">
                            <div class="hasSub">
                                <el-checkbox :ref="`jobType${val.id}`" :label='val.id' :value="val" :title="val.name">{{val.name}}</el-checkbox>
                            </div>
                        </div>
                    </el-row>
                </el-row>
            </template>
        </div>
    </el-checkbox-group>
</template>
<script lang="ts">
import _ from 'lodash'
import { getJobTypeList } from '../../api/dictionary'
import { getAreaType, getJsonByIds } from '../../common/common'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
//  import { setTimeout } from 'timers'
@Component({
  name: 'CheckAreaList'
})
export default class CheckAreaList extends Vue {
  // @ts-ignore
  @Prop({
    type: Array,
    default:[]
  })
  public value
  // @ts-ignore
  @Prop({
    type: Number,
    default: 3
  })
  public max
  // @ts-ignore
  @Prop({
    type: String,
    default: ''
  })
  public keyWord

  public selectTemp: number[] = this.value
  public selectSite: JobType[] = []
  public jobTypeList: JobType[] = []
  public sreachList: JobType[] = []
  public jobTypeShow: boolean[] = []

  public async mounted() {
    const getSiteList = await this.getJobType()
    await getSiteList
    this.$nextTick(() => {
      this.updateSite(false,true)
    })
  }

  @Watch('value')
  public watchValue(val: any) {
    this.select = val
    this.updateSite()
  }
  @Watch('keyWord')
  public watchKeyWord() {
    this.sreach()
  }
  // 更新
  public async updateSite(isChange?: boolean,isMounted:boolean = false) {
    this.selectSite = await getJsonByIds(this.select, this.jobTypeList)
    if (isChange) {
      this.$emit('change', this.selectTemp, this.selectSite)
    } else {
      this.$emit('updateTags', this.selectSite,isMounted)
      //   console.log(this.selectSite)
    }
  }
  // 获取职位类别字典
  public async getJobType() {
    this.jobTypeList = await getJobTypeList
    this.jobTypeShow = new Array(this.jobTypeList.length).fill(false)
  }
  // 鼠标离开隐藏城市二级目录
  public leaveSiteList(e, i) {
    this.jobTypeShow.splice(i, 1, false)
  }
  // 显示城市二级目录
  public showSubSiteList(e, i) {
    this.jobTypeShow.splice(i, 1, true)
    let subPost = e.target.parentElement.nextElementSibling
    this.subPosition(e)
    //  subPost.style.top = e.target.parentElement.offsetHeight + e.target.parentElement.offsetTop - 1 + 'px';
  }

  public subPosition(e: MouseEvent) {
    this.$nextTick(() => {
      document.getElementById
      const target: HTMLElement = <HTMLElement>e.target
      const parent: HTMLElement = <HTMLElement>target.parentElement
      const sub: HTMLElement = <HTMLElement>parent.nextElementSibling
      const box: HTMLElement = <HTMLElement>sub.firstChild
      let content: HTMLElement = target.parentElement

      while (content && content.className.indexOf('el-dialog__body') === -1) {
        content = content.parentElement
      }
      if (
        content.offsetHeight <
        box.offsetHeight + parent.offsetTop + parent.offsetHeight + 80
      ) {
        sub.style.top = parent.offsetTop - box.offsetHeight + 1 + 'px'
        parent.classList.add('bot')
      } else {
        sub.style.top = parent.offsetHeight + parent.offsetTop - 1 + 'px'
      }
    })
  }
  // 判断是否空数组
  public isEmpty(arr: any[]) {
    if (Array.isArray(arr)) {
      return arr.length > 0 ? true : false
    }
    return false
  }
  // 选择二级目录一级目录显示颜色
  public selectJudge(id: number) {
    let reg = new RegExp(`^(${id.toString().replace(/\d{2}$/, '')})`)
    for (let select of this.select) {
      if (select && reg.test(select.toString())) {
        return true
      }
    }
    return false
  }
  // change事件
  public change(v) {
    this.updateSite(true)
  }
  //
  public set select(val) {
    let select: number[] = val.slice()
    let last = select.pop()
    if (select.length > 0) {
      // 父项（一级）
      if (getAreaType(last) === 1) {
        // 判断子项是否被选，有则删除
        const n = parseInt(last.toString().substr(2, 2), 10) > 0 ? 4 : 2
        select = select.filter((sel, i) => {
          if (sel.toString().substr(0, n) === last.toString().substr(0, n)) {
            return false
          }
          return true
        })
      } else if (getAreaType(last) === 2) {
        // 子项：（二级）
        // 判断父项或者子项是否被选，有则删除
        select = select.filter((sel, i) => {
          const id = last.toString()
          if (
            parseInt(
              id.toString().substr(0, 2) + (id.length == 4 ? '00' : '000000'),
              10
            ) === sel ||
            parseInt(sel.toString().substr(0, 4) + '0000', 10) === last
          ) {
            return false
          }
          return true
        })
      } else if (getAreaType(last) === 3) {
        // 子项：（三级）
        // 判断父项是否被选，有则删除
        select = select.filter((sel, i) => {
          const id = last.toString()
          if (
            parseInt(
              id.toString().substr(0, 2) + (id.length == 4 ? '00' : '000000'),
              10
            ) === sel ||
            parseInt(id.toString().substr(0, 4) + '0000', 10) === sel
          ) {
            return false
          }
          return true
        })
      }
    }
    if (last && select.length < this.max) {
      select.push(last)
    }
    this.selectTemp = select
  }
  public get select() {
    return this.selectTemp
  }
  public sreach() {
    const temp = []
    for (const posType of _.cloneDeep(this.jobTypeList)) {
      const child = []
      for (const pos of posType.child) {
        if (pos.name.indexOf(this.keyWord) !== -1) {
          child.push(pos)
        }
      }
      posType.child = child
      if (posType.name.indexOf(this.keyWord) !== -1 || child.length > 0) {
        temp.push(posType)
      }
    }
    this.sreachList = temp
  }
}
</script>
<style lang="scss">
@import '../../style/box-selector.scss';
</style>

