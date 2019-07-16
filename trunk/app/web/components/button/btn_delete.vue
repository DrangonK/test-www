<template>
    <a class="btn_delete" @click="$emit('delete-item')">
        <i></i>
        <span>删除</span>
    </a>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'BtnDelete'
})
export default class BtnDelete extends Vue {}
</script>

<style lang='scss' scoped>
@import '../../style/variable.scss';
@import '../../style/icon.scss';
.btn_delete {
  &:hover {
    span {
      color: $color_main;
    }
    i {
      @include sprite($delete_01);
    }
  }
  span {
    font-size: 14px;
    color: #666;
    margin-left:5px;
    @extend %middle;
  }
  i {
    @include sprite($delete);
    @extend %middle;
  }
}
</style>
