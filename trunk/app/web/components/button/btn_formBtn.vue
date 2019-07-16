<template>
    <el-form-item>
        <el-col v-if="length>1&&!isCreateItem" class="fr" :span="3">
            <a @click="$emit('deleteItem')" class="color_red">删除本条</a>
        </el-col>
        <el-button type="primary" @click="$emit('save')" class="save">完成</el-button>
        <el-button type="text" @click="cancelEdit">取消</el-button>
    </el-form-item>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'FormBtn'
})
export default class FormBtn extends Vue {
  @Prop({
    default: 0
  })
  // @ts-ignore 教育经历、工作经验删到最后一条不可再删除
  public length: number
  @Prop({
    default: false
  })
  // @ts-ignore    基本信息和求职意向写死为true,不显示该按钮
  public isCreateItem: boolean

  public cancelEdit() {
    this.$emit('cancel')
  }
}
</script>
