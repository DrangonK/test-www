<template>
    <div class="privacy_cont">
        <div class="main_box public_box">
            <div class="title_min">
                公开程度
            </div>
            <div class="public_content">
                <div class="items">
                    <span class="col_1">企业可搜到我</span>
                    <span class="col_2">（允许企业通过简历搜索，找到并联络我）</span>
                    <el-switch @change="setPublicSetting" v-model="publicSettings" :width='53' :active-value="0" :inactive-value="1">
                    </el-switch>
                </div>
                <div class="items">
                    <span class="col_1">向企业推荐我</span>
                    <span class="col_2">（当职位符合我意向时，向企业推荐我的简历）</span>
                    <el-switch @change="setPermitRecommand" v-model="resRecommend" :width='53' :active-value="1" :inactive-value="0">
                    </el-switch>
                </div>
            </div>
        </div>
        <div class="main_box hidden_com_box">
            <div class="title_min">
                <p @click="visible = true" class="addCom">
                    <i></i>
                    <span>添加屏蔽公司</span>
                </p>
                <span>屏蔽企业名单</span>
                <span class="color_orange"> {{totalCount}}</span>
            </div>
            <ul v-if="totalCount>0" class="com_list">
                <li v-for="(item,index) in filterComList" :key="index">
                    <span @click="deleteShield(item.id,index)">取消屏蔽</span>
                    <p>{{item.name}}</p>
                </li>
            </ul>
            <div v-else class="text-center">
                <br> 您没有屏蔽的企业
            </div>
        </div>
        <el-dialog @open="open" @close="close" class="shield_modal" :visible.sync="visible" width="460px" height="460px">
            <div class="el-dialog__title" slot="title">
                添加屏蔽企业
                <span style="font-size:14px">(共可屏蔽 10 家，你已屏蔽 {{totalCount}} 家)</span>
            </div>
            <el-input class="comKey" @click="visible = false" v-model="comKey" type="text" placeholder="输入希望屏蔽的企业名">
                <div @click="searchCompany" slot="append">
                    <i class="icon-zoom_white"></i>
                </div>
            </el-input>
            <div v-if="firstTime" class="text">
                <p>屏蔽企业说明</p>
                <div>
                    · 设置屏蔽的企业无法搜索到您，<br>· 搜索时尽量输入企业的全称。<br>· 若匹配到的企业超过10个,建议输入更具体的关键字
                </div>
            </div>
            <div v-else class="search_result">
                <p>
                    共找到{{totalResult>10?'10+':totalResult}}个结果
                    <span v-if="totalCount+selectedIdList.length>=10" class="fr color_red">已达到屏蔽最大值</span>
                </p>
                <ul>
                    <li v-for="item in comList" :key="item.id">
                        <label class="checked_item" :class="{checked: selectedIdList.indexOf(item.id)!=-1,hadFilter:hadFilter(item.id)}">
                            <i></i>
                            <input type="checkbox" :value="item.id" v-model="selectedIdList" :disabled="hadFilter(item.id)"/>
                            <span>{{item.name}}</span>
                        </label>
                    </li>
                </ul>
                <div>
                    <span @click="addShieldList" class="custom_btn_s fr selected">确定</span>
                    <p v-if="totalResult>10">若匹配到的公司太多,建议输入更具体的关键字。</p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Watch } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import keyEnter from '../../components/mixins/keyEnter'
import {
  gePublicSetting,
  setPublicSetting,
  getPermitRecommand,
  setPermitRecommand,
  getShieldList,
  addShieldList,
  deleteShield,
  searchCompany
} from '../../api/index'

@Component({
  name: 'Privacy'
})
// export default class Privacy extends Vue {
export default class Privacy extends mixins(keyEnter) {
  public publicSettings: number = 0 // 企业是否可以搜索到我
  public resRecommend: number = 0 //  向企业推荐我
  public filterComList: filterComList[] = [] // 已经屏蔽的企业列表
  public totalCount: number = 0 // 已经屏蔽的总数量
  public visible: boolean = false // 添加屏蔽的弹窗
  public firstTime: boolean = true // 打开弹窗，未搜索
  public selectedIdList: number[] = []
  public comList: object[] = [] // 搜索出来的企业列表
  public comKey: string = '' // 搜索的关键字
  public totalResult: number = 0 // 搜索结果页的总数

  created() {
    this.getData()
    this.getShieldList()
  }
  public async getData() {
    let res1: any = await gePublicSetting()
    let res2: any = await getPermitRecommand()

    if (res1.code === 200) {
      this.publicSettings = res1.data.publicSettings
    }
    if (res2.code === 200) {
      this.resRecommend = res2.data.permitRecommand
    }
  }
  public async getShieldList() {
    let res3: any = await getShieldList()
    if (res3.code === 200) {
      this.totalCount = res3.data.filterComList.length
      this.filterComList = res3.data.filterComList
    }
  }
  public async setPublicSetting(val: number) {
    let res = await setPublicSetting({ publicSettings: val })

    if (res.code === 200) {
      this.$message.success('设置成功!')
    } else {
      this.publicSettings = val === 1 ? 0 : 1
      this.$message.error(res.msg)
    }
  }
  public async setPermitRecommand(val: number) {
    let res = await setPermitRecommand({ resRecommend: val })

    if (res.code === 200) {
      this.$message.success('设置成功!')
    } else {
      this.resRecommend = val === 1 ? 0 : 1
      this.$message.error(res.msg)
    }
  }
  // 取消屏蔽企业
  public async deleteShield(comId: number, index: number) {
    let res = await deleteShield(comId)

    if (res.code === 200) {
      this.$message.success('已取消屏蔽!')
      this.getShieldList()
    } else {
      this.$message.error(res.msg)
    }
  }
  public async searchCompany() {
    if (!this.comKey) {
      this.$message.error('请输入屏蔽公司关键词')
      return
    }
    this.firstTime = false
    this.selectedIdList = []
    let res: any = await searchCompany(this.comKey)
    if (res.code === 200) {
      this.comList = res.data.comList
      res.data.sum > 10 && (this.comList.length = 10)
      this.totalResult = res.data.sum
    } else {
      this.$message.error(res.msg)
    }
  }
  @Watch('selectedIdList')
  limitLength() {
    if (this.selectedIdList.length + this.totalCount >= 10) {
      this.selectedIdList.length = 10 - this.totalCount
    }
  }
  // 添加屏蔽
  public async addShieldList() {
    let data: object[] = []

    this.comList.forEach((item: object) => {
      // @ts-ignore
      if (this.selectedIdList.includes(item.id)) {
        // @ts-ignore
        data.push({ id: item.id, name: item.name })
      }
    })

    if (this.selectedIdList.length === 0) {
      this.visible = false
      return
    }

    let res = await addShieldList({
    //   filterComId: encodeURIComponent(JSON.stringify(data))
      filterComId: JSON.stringify(data)
    })

    if (res.code === 200) {
      this.visible = false
      this.$message.success('添加成功')
      /*  this.filterComList.push(...data)
      this.totalCount += data.length */
      this.getShieldList()
    } else {
      this.$message.error(res.msg)
    }
  }
  public close() {
    this.selectedIdList = []
    this.firstTime = true
    this.comKey = ''
  }
  public open() {
    this.$nextTick(() => {
      this.keyEnter('.comKey input', this.searchCompany)
      /* document.querySelector('.comKey input').onkeydown = e => {
        if (e.keyCode === 13) {
          this.searchCompany()
        }
      } */
    })
  }
  // 判断是否已经被屏蔽
  public hadFilter(comId: number): boolean {
    let item = this.filterComList.findIndex((item: filterComList) => {
      return item.id === comId
    })

    return item !== -1
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/setting/privacy.scss';
</style>
