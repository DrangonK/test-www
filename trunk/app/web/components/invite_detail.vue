<template>
    <el-dialog @open="open" @closed="$emit('update:visible', visible)" title="邀请详情" :visible.sync="visible" width="466px" class="invite_detail">
        <div v-loading="loading" v-if="!isFailure">
            <div class="header">
                <span class="salary">{{data.salaryStr}}</span>
                <span class="pos_name">{{data.posName}}</span>
            </div>
            <dl>
                <dt>面试时间：</dt>
                <dd>{{data.inviteTime}}</dd>
            </dl>
            <dl>
                <dt>面试地点：</dt>
                <dd>{{data.inviteAddress}}</dd>
            </dl>
            <template v-if="data.inviteType ===1">
                <dl>
                    <dt>联系人：</dt>
                    <dd>{{data.contactPerson}}</dd>
                </dl>
                <dl>
                    <dt>固定电话：</dt>
                    <dd>{{data.contactPhone||'对方未提供'}}</dd>
                </dl>
                <dl>
                    <dt>手机号：</dt>
                    <dd>{{data.contactMobil||'对方未提供'}}</dd>
                </dl>
                <p class="line"></p>
                <dl>
                    <dt>企业名称：</dt>
                    <dd>{{data.comName}}</dd>
                </dl>
                <dl>
                    <dt>乘车路线：</dt>
                    <dd>{{data.busLine||'抱歉！路线未提供，请按照面试地址自行查找或通过电话向企业咨询'}}</dd>
                </dl>
            </template>
            <template v-else>
                <dl>
                    <dt>会场名：</dt>
                    <dd>{{data.prodName}}</dd>
                </dl>
                <p class="line"></p>
                <dl>
                    <dt>参会企业：</dt>
                    <dd>{{data.comName}}</dd>
                </dl>
                <dl>
                    <dt>展位号：</dt>
                    <dd>{{data.stallno}}</dd>
                </dl>
            </template>
            <dl>
                <dt>面试须知：</dt>
                <dd>{{data.interviewGuide}}</dd>
            </dl>
        </div>
        <div v-else><br>{{failureMsg}}<br></div>
    </el-dialog>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator'
import _ from 'lodash'
import { getInviteDetail } from '../api/index'

@Component({
  name: 'InviteDetail'
})
export default class InviteDetail extends Vue {
  // @ts-ignore
  @Prop({
    type: Boolean,
    default: false
  })
  public visible
  // @ts-ignore
  @Prop({
    type: Number
  })
  public inviteId
  public data: object = {}
  public loading: boolean = false
  public isFailure: boolean = false
  public failureMsg: string = ''

  public async open() {
    this.loading = true
    let res = await getInviteDetail(this.inviteId, false)
    this.loading = false
    if (res.code === 200 && !_.isEmpty(res.data)) {
      this.data = res.data
      this.isFailure = false
    } else {
      this.isFailure = true
      this.failureMsg = res.msg || '获取失败，请稍后重试...'
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../style/variable';

.invite_detail {
  /deep/ .el-dialog__body {
    padding-bottom: 32px;
  }
  .header {
    font-size: 18px;
    margin-bottom: 7px;
    .salary {
      float: right;
      color: $color_main;
    }

    .pos_name {
      max-width: 50%;
      color: $color_blue;
      @extend %text-overflow;
    }
  }

  .line {
    height: 1px;
    background: #ebeef5;
    margin: 10px 0;
  }

  dl {
    line-height: 28px;
    font-size: 14px;

    dt {
      display: inline-block;
      vertical-align: top;
      width: 70px;
      color: #909399;
      text-align: right;
    }

    dd {
      display: inline-block;
      width: 350px;
      color: #333;
    }
  }
}
</style>
