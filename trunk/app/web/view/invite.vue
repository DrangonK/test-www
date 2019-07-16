<template>
    <div class="main_box">
        <div v-if="totalCount>0" v-show="!isEidt" class="title_min">
            <BtnEdit2 @edit-item="isEidt=true" class="color_666"></BtnEdit2>
            共收到
            <span class="color_orange">{{totalCount}}</span> 个邀请
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
                <li v-for="(item,index) in perInviteList" :key="index" :class="{overdue:item.posStatus==0}">
                    <label class="checked_item" :class="{checked: selectedIdList.indexOf(item.id)>-1}">
                        <input type="checkbox" :value="item.id" v-model="selectedIdList" />
                    </label>
                    <div class="pos_item">
                        <!-- <div class="line_1">
                            <span class="fr">{{item.creTimeStr}}</span>
                            <i class="icon_01 icon-envelope_01"></i>
                            <span>邀请面试</span>
                            <template v-if="item.isRead==0">
                                &nbsp;
                                <i class="icon_02 icon-new"></i>
                            </template>
                        </div> -->
                        <div class="line_2">
                            <a class="com_name" :href="$store.state.domain+'/comp/'+item.comId" target="_blank" :title="item.comName">{{item.comName}}</a>
                            <a class="pos_name" :href="$store.state.domain+'/jobs/'+item.posNum" target="_blank" :title="item.posName">{{item.posName}}</a>
                            <template v-if="item.posStatus==1">
                                <i v-if="item.inviteType==1" class="icon-invite"></i>
                                <i v-else class="icon-attend"></i>
                            </template>
                            <span>{{item.salaryStr}}</span>
                        </div>
                        <div class="com_logo" :class="{new:item.isRead==0}">
                            <img :src="item.logoUrl||$store.state.domain+'/static/style/v4/images/default_com.jpg'" />
                        </div>
                        <i v-if="item.posStatus==0" class="icon-overdue"></i>
                        <div class="line_3">
                            <div>
                                时间：
                                <span v-html="formatTime(item.inviteTime)"></span>
                                <br>地点：{{item.inviteAddress}}
                            </div>
                            <span v-if="item.posStatus==1" @click="showDetail(item.id)" class="custom_btn_m">面试须知</span>
                            <span v-else class="custom_btn_m">面试须知</span>
                        </div>
                        <div class="line_4">
                            联系人：{{item.contactPerson}}&#12288;{{item.contactPhone}}
                        </div>
                    </div>
                </li>
            </ul>
            <div class="no_data" v-else>
                <i class="icon-empty_02"></i>
                <p>还没有收到面试邀请</p>
            </div>
            <div v-if="totalCount>0" class="page_cont">
                <el-pagination @current-change="changePage" :total="totalCount" :pager-count="5" layout="prev, pager, next"></el-pagination>
            </div>
            <InviteDetail :inviteId="inviteId" :visible.sync="inviteDialogVisible"></InviteDetail>
        </div>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Watch } from 'vue-property-decorator'
import { getInviteLog, deleteInviteLog } from '../api/index'
import InviteDetail from '../components/invite_detail.vue'
import { formatTime } from '../common/common'
import BtnEdit2 from '../components/button/btn_edit_02.vue'
import BtnDelete from '../components/button/btn_delete.vue'
import BtnCancel from '../components/button/btn_cancel.vue'

@Component({
  name: 'Invite',
  components: {
    InviteDetail,
    BtnEdit2,
    BtnDelete,
    BtnCancel
  }
})
export default class Invite extends Vue {
  public loading: boolean = false
  public totalCount: number = 0 // 总数
  public inviteDialogVisible: boolean = false
  public inviteId: number = 0 // 查看邀请详情的id
  public isEidt: boolean = false
  public perInviteList: object = {} // 面试记录列表
  public allIdList: number[] = [] // 列表全部的 id
  public selectedIdList: number[] = [] // 被选中的消息
  public isCheckedAll: boolean = false

  created() {
    this.getInviteLog(1)
  }
  // 切换页码
  public changePage(pn: number) {
    this.getInviteLog(pn)
  }
  // 获取投递记录
  public async getInviteLog(pn: number) {
    this.loading = true
    let res: any = await getInviteLog({ pn: pn })
    this.loading = false
    if (res.code === 200) {
      this.perInviteList = res.data.perInviteList
      this.totalCount = res.data.totalCount || 0
      this.allIdList = []

      // @ts-ignore
      this.perInviteList.forEach(item => {
        this.allIdList.push(item.id)
      })
      this.selectedIdList = []
    }
  }
  // 显示邀请详情
  public showDetail(inviteId: number) {
    this.inviteDialogVisible = true
    this.inviteId = inviteId

    // @ts-ignore   变成已读状态
    let item = this.perInviteList.find(item => {
      return item.id === inviteId
    })
    if (item.isRead !== 1) {
      item.isRead = 1
      this.$store.commit('decreaseNoticeAmount', { type: 'invite' })
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

    let res = await deleteInviteLog(String(this.selectedIdList))
    if (res.code === 200) {
      this.getInviteLog(1)
      this.$message.success('操作成功!')
    } else {
      this.$message.error(res.msg)
    }
  }
  // 格式化时间
  public formatTime(inviteTime: string): string {
      if(!inviteTime) return ''

      let t=new Date(inviteTime.replace('-','/')).getTime()
    return formatTime(t,1)
  }
}
</script>

<style lang='scss' scoped>
@import '../style/invite.scss';
</style>
