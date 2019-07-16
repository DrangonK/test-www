<template>
    <div>
        <div class="resume_box" v-if="resumeDetail.id">
            <div class="preview" ref="preview">
                <PreviewHeader :info="resumeDetail.basicInfoVo"></PreviewHeader>
                <div class="resume_content">
                    <IntentItem v-if="resumeDetail.intentInfoVo.id" :id="id" :page="page"></IntentItem>
                    <ItemEducation v-if="resumeDetail.educationInfoVoList.length>0" :id="id" :page="page"></ItemEducation>
                    <ItemWork v-if="resumeDetail.workInfoVoList.length>0" :id="id" :page="page"></ItemWork>
                    <ItemProject v-if="resumeDetail.projectInfoVoList.length>0" :id="id" :page="page"></ItemProject>
                    <itemPerEvaluation v-if="resumeDetail.intentInfoVo.keywords||resumeDetail.intentInfoVo.professionSkill" :id="id" :page="page"></itemPerEvaluation>
                    <ItemSkill v-if="resumeDetail.skillVoList.length>0" :page="page" :id="id"></ItemSkill>
                    <ItemTrain v-if="resumeDetail.trainInfoVoList.length>0" :id="id" :page="page"></ItemTrain>
                    <ItemCertificate v-if="resumeDetail.certificateInfoVoList.length>0" :id="id" :page="page"></ItemCertificate>
                    <ItemAccessory v-if="resumeDetail.accessoryInfoVoList.length>0" :id="id" :page="page"></ItemAccessory>
                </div>
            </div>
            <div class="btn_cont">
                <div class="btn_box">
                    <a class="btn_export" @click="visible = true">导出简历</a>
                    <a class="btn_print" @click="printArea">打印简历</a>
                </div>
            </div>
        </div>
        <!-- <div class="float_cont fixed" ref="floatCont">
            <div class="float_box">
                <div class="box">
                    <a class="btn_print" @click="printArea">打印简历</a>
                    <a class="btn_export" @click="visible = true">导出简历</a>
                </div>
            </div>
        </div> -->
        <el-dialog title="导出简历" :visible.sync="visible" width="350px" id="export_modal">
            <div class="export_content">
                请选择导出格式：
                <label :class="{checked:exportType=='WORD'}">
                    <div>
                        <input type="radio" v-model="exportType" value="WORD" />
                    </div>
                    <span> word</span>
                </label>
                <label :class="{checked:exportType=='HTML'}">
                    <div>
                        <input type="radio" v-model="exportType" value="HTML" />
                    </div>
                    <span>html</span>
                </label>
            </div>
            <br>
            <div class="btn">
                <span @click="exportRes" class="custom_btn_m">确定</span>
            </div>
        </el-dialog>
    </div>
</template>

<script lang='ts'>
import { Vue, Component,Prop } from 'vue-property-decorator'
import PreviewHeader from '../../components/preview/item-preview-header.vue'
import ItemHeader from '../../components/resume/item-header.vue'
import IntentItem from '../../components/resume/item-intent.vue'
import ItemEducation from '../../components/resume/item-education.vue'
import ItemWork from '../../components/resume/item-work.vue'
import ItemProject from '../../components/resume/item-project.vue'
import itemPerEvaluation from '../../components/resume/item-per-evaluation.vue'
import ItemSkill from '../../components/resume/item-skill.vue'
import ItemTrain from '../../components/resume/item-train.vue'
import ItemCertificate from '../../components/resume/item-certificate.vue'
import ItemAccessory from '../../components/resume/item-accessory.vue'

import { getResume } from '../../api/resume'
import { printArea } from '../../common/printArea'

@Component({
  name: 'Preview',
  components: {
    PreviewHeader,
    ItemHeader,
    IntentItem,
    ItemEducation,
    ItemWork,
    ItemProject,
    itemPerEvaluation,
    ItemSkill,
    ItemTrain,
    ItemCertificate,
    ItemAccessory
  }
})
export default class Preview extends Vue {
  @Prop()
  // @ts-ignore  简历ID
  public id: number

  public page: string = 'preview'
  public resumeId: number = 0
  public resumeDetail: any = {}
  public visible: boolean = false
  public exportType: exportSuffix = 'WORD'

  created() {
    this.resumeId = Number(this.$route.params.id)
    this.getResume(this.resumeId)
  }
  // 01--获取当前简历的 --完整信息
  public async getResume(resumeId: number) {
    let res: any = await getResume(resumeId)

    if (res.code === 200) {
      this.resumeDetail = res.data.resumeDetail
      // 设置标题
      document.title = `${this.resumeDetail.basicInfoVo.userName}【${
        this.resumeDetail.resumeName
      }】`
    }
  }
  public printArea() {
    printArea(
      this.resumeDetail.basicInfoVo.userName,
      // @ts-ignore
      this.$refs.preview.outerHTML
    )
  }
  public async exportRes() {
    let src = `/api/per/resume/${this.resumeId}/export?exportFormat=${
      this.exportType
    }`
    this.visible = false
    window.open(src)
  }

  /*   updated() {
    this.fixed()
  }
  public fixed(): void {
    // @ts-ignore
    let element: HTMLElement = this.$refs.floatCont
    let className = element.className //保存原有class

    window.onscroll = function() {
      let top: number = element.getBoundingClientRect().top
      let height: number = element.offsetHeight
      let winHeight: number = document.documentElement.clientHeight

      if (top + height <= winHeight) {
        element.setAttribute('class', className + 'fixed')
      } else {
        element.setAttribute('class', className)
      }
    }
  } */
}
</script>

<style lang='scss' scoped>
@import '../../style/resume/resume.scss';
@import '../../style/resume/preview.scss';
</style>
