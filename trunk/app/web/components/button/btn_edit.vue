<template>
    <a class="btn_edit" @click="editItem">
        <i></i>
        <span>编辑</span>
    </a>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'BtnEdit'
})
export default class BtnEdit extends Vue {
  public editItem() {
    this.$emit('edit-item')
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/variable.scss';
@import '../../style/icon.scss';
.btn_edit {
  float: right;
  line-height: normal;
  &.color_666 {
    span {
      color: #666;
    }
  }
  span {
    font-size: 14px;
    color: $color_main;
    @extend %middle;
  }
  i {
    margin-right: 5px;
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
