<template>
    <a class="btn_edit" @click="$emit('edit-item')">
        <i></i>
        <span>编辑</span>
    </a>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'BtnEdit2'
})
export default class BtnEdit2 extends Vue {}
</script>

<style lang='scss' scoped>
@import '../../style/variable.scss';
@import '../../style/icon.scss';
.btn_edit {
  float: right;
  span {
    font-size: 14px;
    color: $color_main;
    margin-left: 5px;
    @extend %middle;
  }
  i {
    @include sprite($edit_02);
    @extend %middle;
  }
  &.disabled {
    cursor: default;
    span {
      color: #b6b6b6;
      @extend %middle;
    }
    i {
      @include sprite($edit_01);
      @extend %middle;
    }
  }
}
</style>
