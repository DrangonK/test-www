<template>
    <div>
        <el-input v-model="value" type="textarea" :maxlength='totalCount' :placeholder="placeholder" :rows="rows"></el-input>
        <div class="counter">
            <span class="color_orange">{{count}}</span>
            <i>/{{totalCount}}</i>
        </div>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Watch, Prop } from 'vue-property-decorator'

@Component({
  name: 'TextArea'
})
export default class TextArea extends Vue {
  @Prop({
    type: Number,
    default: 6
  })
  //@ts-ignore
  public rows: number //行数
  @Prop({
    type: String
  })
  //@ts-ignore
  public placeholder: string
  @Prop({
    type: String
  })
  //@ts-ignore
  public value: string //当前的文字
  @Prop({
    type: Number,
    default: 200
  })
  //@ts-ignore
  public totalCount: number //总数

  public count: number = 0 //当前字数

  @Watch('value')
  countLength() {
    let len = this.value.length

    if (len > this.totalCount) {
      this.value = this.value.substring(0, this.totalCount)
    } else {
      this.count = len
    }
    this.$emit('update:value', this.value)
  }
  created() {
    this.countLength()
  }
}
</script>

<style lang='scss' scoped>
// @import '../../style/variable';
//计数器
.counter {
  position: absolute;
  right: 15px;
  bottom: 3px;
  line-height: normal;
  background: #fff;
  color: #909399;
}
</style>
