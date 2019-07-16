<template>
    <a class="btn_cancel" @click="$emit('cancel-item')">
        <i></i>
        <span>取消</span>
    </a>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'BtnCancel'
})
export default class BtnCancel extends Vue {}
</script>

<style lang='scss' scoped>
@import '../../style/variable.scss';
@import '../../style/icon.scss';
.btn_cancel {
  margin-left: 10px;
  &:hover {
    span {
      color: $color_main;
    }
    i {
      @include sprite($cancel_01);
    }
  }
  span {
    font-size: 14px;
    color: #666;
    margin-left: 5px;
    @extend %middle;
  }
  i {
    @include sprite($cancel);
    @extend %middle;
  }
}
</style>
