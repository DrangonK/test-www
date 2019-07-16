<template>
    <div v-if="showNovice&&visible" class="modal_cont" :class="'step'+step">
        <i class="mask_layer"></i>
        <div class="modal_box" ref="modal_box">
            <img :src="`/public/images/novice/index${step}.png`" />
            <a href="javascript:;" @click="prev" class="prev"></a>
            <a href="javascript:;" @click="next" class="next"></a>
        </div>
        <div class="quit" v-if="step==1">
            <img class="esc" src="/public/images/novice/novice.png" />
            <img @click="select=!select" class="select" :src="`/public/images/novice/novice_${select?'yes':'no'}.png`" />
        </div>
    </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component({
  name: 'NovicePage'
})
export default class NovicePage extends Vue {
  public visible: boolean = true
  public step: number = 1
  public select: boolean = false


  @Watch('visible')
  watchVisible(val: boolean) {
    if (!val) {
      if (this.select) {
        localStorage.setItem('novice', '1')
      }
    }
  }
  public mounted() {
    document.addEventListener('keyup', e => {
      let currKey = 0
      currKey = e.keyCode || e.which || e.charCode
      if (currKey == 27) {
        // this.quitNovice()
        this.visible = false
      }
    })
    let novice: any = localStorage.getItem('novice')
    if (novice == 1) {
      this.visible = false
    }
  }
  get showNovice(): boolean {
    return this.$route.name === 'Index'
  }
  public prev() {
    this.step--
  }
  public next() {
    if (this.step >= 6) {
      this.visible = false
    } else {
      this.step++
    }

    if(this.step==4||this.step==6){
        let tip_box = document.querySelector('.tip_box')
        if(tip_box){
            // @ts-ignore
            this.$refs.modal_box.classList.add('hasBlock')

        }
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../style/novice';
</style>
