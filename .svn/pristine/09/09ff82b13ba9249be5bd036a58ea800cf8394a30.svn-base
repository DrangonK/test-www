<template>
    <el-checkbox-group v-model="select" class="check-area-list" @change="change">
        <p class="tit">热门地区</p>
        <el-row class="hot-city">
            <div v-for="(item, i) in hotCity" :key="i" class="col col-3" @mouseleave="leaveHotCity($event, i)">
                <div class="hasSub" :class="{'on':hotCityShow[i],selectChild:selectJudge1(item.id)}">
                    <template v-if="isEmpty(item.child)">
                        <el-checkbox :ref="`hotCity${item.id}`" :label="item.id" class="noText" :value="item"></el-checkbox>
                        <label class="text" :class="{cblue:selectJudge1(item.id)}" @click="showSubHotCity($event, i)">{{item.name}}</label>
                        <i class="el-icon-caret-bottom" @click="showSubHotCity($event, i)"></i>
                    </template>
                    <template v-else>
                        <el-checkbox :ref="`hotCity${item.id}`" :label='item.id' :value="item">{{item.name}}</el-checkbox>
                    </template>
                </div>
                <div class="subPost">
                    <el-row v-if="isEmpty(item.child) && hotCityShow[i]">
                        <el-col :span='4' v-for="(val) in item.child" :key="val.id">
                            <el-checkbox :ref="`hotCity${val.id}`" :label='val.id' :value="val">{{val.name}}</el-checkbox>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </el-row>
        <p class="tit tit1">省/市/直辖市：</p>
        <div class="area-list" v-for="letter of letterList" :key="letter">
            <div class="letter">{{letter}}</div>
            <el-row :gutter='10'>
                <div v-for="(item, i) in siteList" :key="i" v-if="filterLetter(item,letter)" class="col col-3" @mouseleave="leaveSiteList($event, i)">
                    <div class="hasSub" :class="{'on':siteListShow[i]}">
                        <template v-if="isEmpty(item.child)">
                            <el-checkbox :ref="`siteCity${item.id}`" :label='item.id' class="noText" :value="item"></el-checkbox>
                            <label class="text" :class="{cblue:selectJudge(item.id)}" @click="showSubSiteList($event, i)">{{item.name}}</label>
                            <i class="el-icon-caret-bottom" @click="showSubSiteList($event, i)"></i>
                        </template>
                        <template v-else>
                            <el-checkbox :ref="`siteCity${item.id}`" :label='item.id' :value="item">{{item.name}}</el-checkbox>
                        </template>
                    </div>
                    <div class="subPost">
                        <el-row v-if="isEmpty(item.child) && siteListShow[i]">
                            <div class="col col-3" v-for="(val,j) in item.child" :key="val.id" @mouseleave="leaveCol">
                                <div class="hasSub">
                                    <template v-if="val.child">
                                        <el-checkbox :ref="`siteCity${val.id}`" :label='val.id' class="noText" :value="val"></el-checkbox>
                                        <label class="text" :class="{cblue:selectJudge1(val.id)}" @click="showSub($event, j)">{{val.name}}</label>
                                        <i class="el-icon-caret-bottom"></i>
                                    </template>
                                    <template v-else>
                                        <el-checkbox :ref="`siteCity${val.id}`" :label='val.id' :value="val">{{val.name}}</el-checkbox>
                                    </template>
                                </div>
                                <div class="subPost" v-if="val.child">
                                    <el-row>
                                        <el-col :span='4' v-for="(v) in val.child" :key="v.id">
                                            <el-checkbox :ref="`siteCity${v.id}`" :label='v.id' :value="v">{{v.name}}</el-checkbox>
                                        </el-col>
                                    </el-row>
                                </div>

                            </div>
                        </el-row>
                    </div>
                </div>
            </el-row>
        </div>
    </el-checkbox-group>
</template>
<script lang="ts">
import { getHotCity, getSiteList } from '../../api/dictionary'
import { getAreaType, getSiteByIds } from '../../common/common'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component({
  name: 'CheckAreaList'
})
export default class CheckAreaList extends Vue {
  @Prop({
    type: Array
  })
  public value
  @Prop({
    type: Number,
    default: 3
  })
  public max
  public selectTemp: number[] = this.value
  public selectSite: Site[] = []
  public hotCity: Site[] = []
  public siteList: Site[] = []
  public letterList: string[] = ['A.B.C.F', 'G', 'H', 'J.L.N.Q', 'S', 'T.X.Y.Z']
  public hotCityShow: boolean[] = []
  public siteListShow: boolean[] = []

  public async mounted() {
    const getHotCity = this.getHotCity()
    const getSiteList = this.getSiteList()
    await getHotCity
    await getSiteList
    this.$nextTick(() => {
      this.updateSite()
    })
  }

  @Watch('value')
  public watchValue(val) {
    this.select = val
    this.updateSite()
  }
  // 更新
  public async updateSite(isChange?: boolean) {
    this.selectSite = await getSiteByIds(this.select)
    if (isChange) {
      this.$emit('change', this.selectTemp, this.selectSite)
    } else {
      this.$emit('updateTags', this.selectSite)
    }
  }
  // 获取热门城市
  public async getHotCity() {
    this.hotCity = await getHotCity
    this.hotCityShow = new Array(this.hotCity.length).fill(false)
  }
  // 获取城市
  public async getSiteList() {
    this.siteList = await getSiteList
    this.siteListShow = new Array(this.siteList.length).fill(false)
  }
  // 鼠标离开隐藏热门城市二级目录
  public leaveHotCity(e, i) {
    this.hotCityShow.splice(i, 1, false)
  }
  // 显示热门城市二级目录
  public showSubHotCity(e, i) {
    this.hotCityShow.splice(i, 1, true)
    let subPost = e.target.parentElement.nextElementSibling
    subPost.style.top =
      e.target.parentElement.offsetHeight +
      e.target.parentElement.offsetTop -
      1 +
      'px'
  }
  // 鼠标离开隐藏城市二级目录
  public leaveSiteList(e, i) {
    this.siteListShow.splice(i, 1, false)
  }
  // 显示城市二级目录
  public showSubSiteList(e, i) {
    this.siteListShow.splice(i, 1, true)
    this.subPosition(e)
    let subPost = e.target.parentElement.nextElementSibling
    // subPost.style.top = e.target.parentElement.offsetHeight + e.target.parentElement.offsetTop - 1 + 'px';
  }
  // 鼠标离开隐藏城市三级目录
  public leaveCol(e) {
    this.removeSubClass(e)
    e.target.firstChild.className = 'hasSub'
  }
  // 显示城市三级目录
  public showSub(e, i) {
    let subPost = e.target.parentElement.nextElementSibling
    subPost.style.top =
      e.target.parentElement.offsetHeight +
      e.target.parentElement.offsetTop -
      1 +
      'px'
    e.target.parentElement.className = 'hasSub on'
    this.addSubClass(e)
  }
  public addSubClass(e: MouseEvent) {
    const target: HTMLElement = <HTMLElement>e.target
    let subPost: HTMLElement = target.parentElement
    while (subPost && subPost.className.indexOf('subPost') === -1) {
      subPost = subPost.parentElement
    }
    subPost.classList.add('showSub')
  }
  public removeSubClass(e: MouseEvent) {
    const target: HTMLElement = <HTMLElement>e.target
    let subPost: HTMLElement = target.parentElement
    while (subPost && subPost.className.indexOf('subPost') === -1) {
      subPost = subPost.parentElement
    }
    subPost.className = 'subPost'
  }
  public subPosition(e: MouseEvent) {
    this.$nextTick(() => {
      document.getElementById
      const target: HTMLElement = <HTMLElement>e.target
      const parent: HTMLElement = <HTMLElement>target.parentElement
      const sub: HTMLElement = <HTMLElement>parent.nextElementSibling
      const box: HTMLElement = <HTMLElement>sub.firstChild
      let content: HTMLElement = null
      let areaList: HTMLElement = null
      let path: HTMLElement = target.parentElement
      while (path) {
        if (path.className.indexOf('content') !== -1) {
          content = path
        }
        if (path.className.indexOf('area-list') !== -1) {
          areaList = path
        }
        path = path.parentElement
      }
      if (
        content.offsetHeight <
        box.offsetHeight + areaList.offsetTop + parent.offsetHeight + 80
      ) {
        sub.style.top = parent.offsetTop - box.offsetHeight + 1 + 'px'
        parent.classList.add('bot')
      } else {
        sub.style.top = parent.offsetHeight + parent.offsetTop - 1 + 'px'
      }
    })
  }
  // 地区按字母分类
  public filterLetter(data, letter) {
    let reg = new RegExp(`^[${letter.replace('.', '')}]`)
    return reg.test(data.f)
  }
  // 判断是否空数组
  public isEmpty(arr) {
    if (Array.isArray(arr)) {
      return arr.length > 0 ? true : false
    }
    return false
  }
  // 选择二级目录一级目录显示颜色
  public selectJudge(id) {
    let reg = new RegExp(`^(${id.toString().replace(/\d{6}$/, '')})`)
    for (let select of this.select) {
      if (select && reg.test(select.toString())) {
        return true
      }
    }
    return false
  }
  // 选择三级目录二级目录显示颜色
  public selectJudge1(id) {
    let reg = new RegExp(`^(${id.toString().replace(/\d{4}$/, '')})`)
    for (let select of this.select) {
      if (select && reg.test(select.toString())) {
        return true
      }
    }
    return false
  }
  // change事件
  public change() {
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
}
</script>
<style lang="scss">
@import '../../style/box-selector.scss';
</style>
