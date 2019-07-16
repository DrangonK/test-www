<template>
    <div @click="createItem" class="no_data">
        <i></i>
        <span>
            <slot></slot>
        </span>
    </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'ItemEmpty'
})
export default class ItemEmpty extends Vue {
  public createItem() {
    this.$emit('create-item')
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/variable.scss';
@import '../../style/icon.scss';

.no_data {
  line-height: 60px;
  font-size: 14px;
  color: #909399;
  text-align: center;
  background: $color_bg_body;
  margin: 22px 0 0;
  cursor: pointer;

  &:hover {
    color: $color_main;

    i {
      @include sprite($add_05);
    }
  }
  &.disabled {
    cursor: default;
    &:hover {
      color: #909399;
      i {
        @include sprite($add_03);
      }
    }
  }
  i {
    margin-right: 5px;
    @include sprite($add_03);
  }
  i,
  span {
    @extend %middle;
  }
}
</style>
