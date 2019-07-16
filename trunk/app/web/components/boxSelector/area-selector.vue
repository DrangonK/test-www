<template>
  <div>
    <el-select v-model="intentForm.form.jobLocationList" :popper-append-to-body="true" @visible-change="showBox" @change="change"  :placeholder="placeholder" ref="select" multiple>
      <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
      </el-option>
    </el-select>
    <el-dialog ref="modal" @close="close" @closed="closed" @open="open" title="请选择地区" class="selector_box" :visible.sync="showSelectorBox" width="770px" :modal-append-to-body="true" @mousedown="mousedown($event)">
      <div id="js_selectedBox" class="selectedCont clear-both">
        <div class="tip">
          <template v-if="type === 'area'">
            已选择地区
          </template>
          <template v-else>
            已选择职位类别
          </template>
        </div>
        <div class="selectedA">
          <el-tag v-for="(tag,index) in tags" :key='index' :closable='true' :disable-transitions='true' type="info" @close='delValueByIndex(index)'>
            {{tag.name}}
          </el-tag>
        </div>
        <div class="btnArea">
          <el-button :plain='true' round size="small" @click="clear">清除</el-button>
        </div>
      </div>
      <div class="clear-both"></div>
      <CheckAreaList :value="value" :max="maxs" @change="change"  @updateTags="updateTags"></CheckAreaList>
      <div class="button_box">
        <button class="custom_btn selected" type="button" @click="close">确定</button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
// import Vue from 'vue'
// import Component from 'vue-class-component'
import { intentForm } from '../../api/resume'
import CheckAreaList from './check-area-list.vue'
import { getAreaType, getSiteByIds } from '../../common/common'
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator'

@Component({
  components: {
    CheckAreaList
  }
})
export default class AreaSelector extends Vue {
  public intentForm = intentForm
  public showSelectorBox: boolean = false
  public placeholder: string = '请选择地区'
  public translateX: number = 0
  public translateY: number = 0
  public translate: string = 'translate(0,0)'
  public drag: boolean = true
  public el = null
  public value: number[] = []
  public tags: Site[] = []
  public maxs: number = 3
  public type: string = 'area'
  public options = []

  @Watch('value')
  public watchValue() {
    const temp = []
    this.selected = []
    new Set(this.value).forEach(v => {
      if (temp.length < 4) {
        temp.push(v)
      }
    })
    this.selected = temp
    this.setOptions()
  }
  created() {
    this.setOptions()
    this.value = intentForm.form.jobLocationList
  }

  public async setOptions() {
    if (this.type === 'area') {
      this.options = await getSiteByIds(this.value.concat())
    } /* else if (this.type === 'pos') {
      const jobTypeList = await getJobTypeList
      this.options = getJsonByIds<JobType>(this.value.concat(), jobTypeList)
    } */
  }
  public showBox() {
    this.showSelectorBox = true
    this.$refs.select.blur()
  }
  public close() {
    this.showSelectorBox = false
    this.drag = true
    this.intentForm.form.jobLocationList = this.value
  }
  public closed() {
    this.translateX = 0
    this.translateY = 0
    let dialog = document.querySelector('.selector_box .el-dialog')
    dialog.style.transform = `translate(0,0)`
  }
  public setTranslate(x: number = 0, y: number = 0): void {
    let dialog = document.querySelector('.selector_box .el-dialog')
    dialog.style.transform = `translate(${x}px,${y}px)`
  }
  public open() {
    let header = document.querySelector('.selector_box .el-dialog__header')
    let dialog = document.querySelector('.selector_box .el-dialog')

    header.onmousedown = () => {
      this.drag = false
    }
    header.onmouseleave = () => {
      this.drag = true
    }
    header.onmouseup = () => {
      this.drag = true
    }
    header.onmousemove = e => {
      if (this.drag) return
      // let modal: HTMLElement = <HTMLElement>this.$refs.modal
      let modal = dialog
      let mHeight = modal.offsetHeight / 2
      let mWidth = modal.offsetWidth / 2
      let wHeight = window.innerHeight / 2
      let wWidth = window.innerWidth / 2
      let left = wWidth - mWidth
      let top = wHeight - mHeight
      let translateX = Math.abs(this.translateX)
      let translateY = Math.abs(this.translateY)
      if (this.translateX > 0) {
        left -= 42
      }
      if (this.translateY < 0) {
        top -= 47
      }
      if (
        left > translateX ||
        (e.movementX > 0 && this.translateX < 0) ||
        (e.movementX < 0 && this.translateX > 0)
      ) {
        this.translateX += e.movementX
      } else {
        if (e.movementX > 0) {
          this.translateX = left
        } else if (e.movementX < 0) {
          this.translateX = -left
        }
      }

      if (
        top > translateY ||
        (e.movementY > 0 && this.translateY < 0) ||
        (e.movementY < 0 && this.translateY > 0)
      ) {
        this.translateY += e.movementY
      } else {
        if (e.movementY > 0) {
          this.translateY = top
        } else if (e.movementY < 0) {
          this.translateY = -top
        }
      }

      this.setTranslate(this.translateX, this.translateY)
    }
  }

  public change(select, selectSite) {
    this.value = select
    this.tags = selectSite
  }
  public updateTags(selectSite) {
    this.tags = selectSite
  }
  public delValueByIndex(index) {
    this.value.splice(index, 1)
    this.tags.splice(index, 1)
  }
  public clear() {
    this.value.splice(0, this.maxs)
    this.tags.splice(0, this.maxs)
  }
}
</script>

<style lang='scss'>
.el-dialog__header {
  cursor: move;
}
.button_box {
  text-align: center;
  margin: 20px 0 10px;
}
</style>
