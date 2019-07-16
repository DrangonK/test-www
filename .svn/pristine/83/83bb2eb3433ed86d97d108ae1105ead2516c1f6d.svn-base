<template>
    <div class="header">
        <template v-if="page==='resume'">
            <template v-if="showBtn">
                <template v-if="btnEdit">
                    <BtnEdit v-on:edit-item="$emit('edit-item')" v-if="!isEdit"></BtnEdit>
                </template>
                <template v-else-if="!isEdit">
                    <BtnAdd v-on:add-item="$emit('add-item')"></BtnAdd>
                </template>
            </template>
        </template>

        <template v-if="type==='basic'&&isEdit">
             <i class="icon-user_01"></i>
            <span>基本信息</span>
        </template>
        <template v-if="type==='intent'">
            <i class="icon-per_target" style="margin-right:6px"></i>
            <span>求职意向</span>
        </template>
        <template v-else-if="type==='edu'">
            <i class="icon-per_edu"></i>
            <span>教育经历</span>
        </template>
        <template v-else-if="type==='work'">
            <i class="icon-per_works"></i>
            <span>工作经验</span>
        </template>
        <template v-else-if="type==='project'">
            <i class="icon-per_items"></i>
            <span>项目经历</span>
        </template>
        <template v-else-if="type==='evaluation'">
            <i class="icon-per_evaluation"></i>
            <span>个人评价</span>
        </template>
        <template v-else-if="type==='skill'">
            <i class="icon-per_skill"></i>
            <span>技能特长</span>
        </template>
        <template v-else-if="type==='train'">
            <i class="icon-per_train"></i>
            <span>培训经历</span>
        </template>
        <template v-else-if="type==='certificate'">
            <i class="icon-per_book"></i>
            <span>证书奖项</span>
        </template>
        <template v-else-if="type==='accessory'">
            <i class="icon-per_add"></i>
            <span>作品附件</span>
        </template>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Watch, Prop } from 'vue-property-decorator'
import BtnEdit from '../../components/button/btn_edit.vue'
import BtnAdd from '../../components/button/btn_add.vue'

@Component({
  name: 'ItemHeader',
  components: {
    BtnEdit,
    BtnAdd
  }
})
export default class ItemHeader extends Vue {
  @Prop({
    type: String
  })
  // @ts-ignore
  public type: string //项目的类型

  @Prop({
    type: Boolean,
    default: true
  })
  // @ts-ignore
  public isEdit: boolean // 判断项目是否处于编辑状态

  @Prop({
    type: String,
    default: 'resume'
  })
  // @ts-ignore
  public page: string //预览页|简历页

  @Prop({})
   // @ts-ignore
  public showBtnEdit: boolean

  @Prop()
  // @ts-ignore
  public info: any
  // 判断头部是【编辑】||【添加】
  get btnEdit(): boolean {
    // 求职意向
    let intent = this.type == 'intent' && this.info.id
    // 个人评价
    let evaluation =
      this.type == 'evaluation' &&
      (this.info.keywords || this.info.professionSkill)
    let is = intent || evaluation
    return is
  }
  // 判断头部是否显示按钮
  get showBtn(): boolean {
    let is: boolean = false
    if (this.type == 'intent') {
      is = !!this.info.id
    } else if (this.type == 'evaluation') {
      is = this.info.keywords || this.info.professionSkill
    } else {
      is = this.showBtnEdit
    }
    return is
  }
}
</script>
