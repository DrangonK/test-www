<template>
    <div class="main_box">
        <div v-if="totalCount>0" v-show="!isEidt" class="title_min">
            <BtnEdit2 @edit-item="isEidt=true" class="color_666"></BtnEdit2>
            共接收
            <span class="color_orange">{{totalCount}}</span> 份消息
        </div>
        <div v-if="totalCount>0" v-show="isEidt" class="title_min">
            <BtnCancel class="fr" @cancel-item="isEidt=false"></BtnCancel>
            <BtnDelete class="fr" @delete-item="deleteItem"></BtnDelete>
            <p class="checked_all" @click="checkedAll" :class="{checked:isCheckedAll}">
                <i></i>
                <span>全选</span>
            </p>
        </div>
        <div v-if="totalCount==0" class="title_min">
            共收到 {{totalCount}} 个邀请
        </div>
        <div class="content">
            <ul v-if="totalCount>0" class="pos_list" :class="isEidt?'edit':''">
                <li v-for="(item,index) in data" :key="index">
                    <label class="checked_item" :class="{checked: selectedIdList.indexOf(item.id)>-1}">
                        <input type="checkbox" :value="item.id" v-model="selectedIdList" />
                    </label>
                    <div class="pos_item">
                        <span class="com_logo" :class="{'has_see':item.isRead==1,sys:item.comeFrom=='SYS'}">
                            <img v-if="item.comeFrom=='COM'" :src="item.logoUrl||$store.state.domain+'/static/style/v4/images/default_com.jpg'" />
                            <img v-else src="/public/images/default_msg.png" />
                        </span>
                        <span @click="getMessageDetail(item.id)" class="custom_btn_m">查看详情</span>
                        <div class="line_1">
                            {{item.title}}
                        </div>
                        <div class="line_2">
                            <span>{{item.briefDescription}}</span>
                        </div>
                        <div class="line_3">
                            <i class="icon-clock"></i>
                            <span>{{item.creTimeStr}}</span>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="no_data" v-else>
                <i class="icon-empty_01"></i>
                <p>暂无新的站内消息</p>
            </div>
            <div v-if="totalCount>0" class="page_cont">
                <el-pagination @current-change="changePage" :total="totalCount" :pager-count="5" layout="prev, pager, next"></el-pagination>
            </div>
            <el-dialog :title="detailData.title" :visible.sync="visible" width="466px">
                <div v-loading="loading" v-if="!isFailure">
                    <div class="detail_msg" v-html="detailData.content">
                    </div>
                </div>
                <div v-else><br>{{failureMsg}}<br/><br/></div>
            </el-dialog>
        </div>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Watch } from 'vue-property-decorator'
import { getMessage, getMessageDetail, deleteMessageLog } from '../api/index'
import BtnEdit2 from '../components/button/btn_edit_02.vue'
import BtnDelete from '../components/button/btn_delete.vue'
import BtnCancel from '../components/button/btn_cancel.vue'

@Component({
  name: 'Message',
  components: {
    BtnEdit2,
    BtnDelete,
    BtnCancel
  }
})
export default class Message extends Vue {
  public isEidt: boolean = false
  public totalCount: number = 10
  public data: object = {} // 消息记录列表
  public allIdList: number[] = [] // 列表全部的 id
  public selectedIdList: number[] = [] // 被选中的消息
  public isCheckedAll: boolean = false

  public visible: boolean = false
  public loading: boolean = false
  public isFailure: boolean = false
  public failureMsg: string = ''
  public detailData: object = {}

  created() {
    this.getMessage(1)
  }
  // 切换页码
  public changePage(pn: number) {
    this.getMessage(pn)
  }
  // comeFrom 站内消息类型（默认返回所有）SYS:系统消息、COM:企业消息
  // date：不知道什么来的
  public async getMessage(pn: number, comeFrom?: string, date?: string) {
    let res: any = await getMessage({ pn: pn, comeFrom: comeFrom, date: date })

    if (res.code === 200) {
      this.data = res.data.msgList
      this.totalCount = res.data.totalCount || 0
      this.allIdList = []

      // @ts-ignore
      this.data.forEach(item => {
        this.allIdList.push(item.id)
      })
      this.selectedIdList = []
    }
  }
  // 获取消息详情
  public async getMessageDetail(msgId: number) {
    this.loading = true
    let res: any = await getMessageDetail(msgId)

    // @ts-ignore  站内消息减一
    let item = this.data.find(item => {
      return item.id === msgId
    })
    if (item.isRead !== 1) {
      this.$store.commit('decreaseNoticeAmount', { type: 'msg' })
      item.isRead = 1
    }

    this.loading = false
    this.visible = true
    if (res.code === 200) {
      this.detailData = res.data.siteMessage
    } else {
      this.isFailure = true
      this.failureMsg = res.msg || '获取失败，请稍后重试...'
    }
  }

  public checkedAll() {
    if (!this.isCheckedAll) {
      this.selectedIdList = this.allIdList
      this.isCheckedAll = true
    } else {
      this.selectedIdList = []
      this.isCheckedAll = false
    }
  }
  @Watch('selectedIdList')
  checkedOne() {
    if (this.selectedIdList.length === this.allIdList.length) {
      this.isCheckedAll = true
    } else {
      this.isCheckedAll = false
    }
  }
  public async deleteItem() {
    if (this.selectedIdList.length === 0) {
      this.$message.error('至少需要选择一个删除项！')
      return
    }

    let res = await deleteMessageLog(String(this.selectedIdList))
    if (res.code === 200) {
      this.getMessage(1)
      this.$message.success('操作成功!')
    } else {
      this.$message.error(res.msg)
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../style/message.scss';
</style>
