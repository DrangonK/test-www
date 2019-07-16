<template>
    <a class="btn_add" @click="addItem">
        <i></i>
        <span>添加</span>
    </a>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'BtnAdd'
})
export default class BtnAdd extends Vue {
  public addItem() {
    this.$emit('add-item')
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/variable.scss';
@import '../../style/icon.scss';
.btn_add {
  float: right;
  span {
    font-size: 14px;
    color: $color_main;
  }
  i {
    margin-right: 5px;
    @extend %middle;
    @include sprite($add_05);
  }
  &.disabled {
    cursor: default;
    span {
      color: #b6b6b6;
    }
    i {
      @include sprite($add_03);
    }
  }
}
</style>
