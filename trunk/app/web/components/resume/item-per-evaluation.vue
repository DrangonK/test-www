<template>
    <div class="resume_item" id="per_evaluation">
        <ItemHeader v-on:edit-item="editItem2" :page="page" :info="info" :type="'evaluation'" :isEdit="editNum!=-1"></ItemHeader>
        <div class="content">
            <ItemEmpty v-if="!info.keywords&&!info.professionSkill&&!isCreateItem" @create-item="createItem2">简要描述你的职业优势，让企业HR快速了解你</ItemEmpty>
            <div v-else class="info per_evaluation-info" :class="{isEdit:page==='resume'&&editNum==0}">
                <el-form v-if="page==='resume'&&editNum==0" class="item_edit per_evaluation_edit" :model="form.form" :rules="form.rules" ref="form" label-position="right" label-width="98px">
                    <el-form-item class="selected" label="我的亮点" prop="keywordsList">
                        <el-tag class="custom_btn_s2" @close="removeTag(tag)" v-for="(tag,index) in form.form.keywordsList" :key="index" closable :hit="true">
                            {{tag}}
                        </el-tag>
                    </el-form-item>
                    <el-form-item v-if="showPointList" class="all_keyword_list">
                        <div class="line_1">
                            <i @click="showPointList = false" class="icon-close_yellow_02"></i>
                            <b>{{pointList[currentIndex].cate}}</b>
                            <span @click="changeKeyWord">
                                <i class="icon-change"></i>换一换
                            </span>
                        </div>
                        <div class="keywordList">
                            <label v-for="(point,i) in pointList[currentIndex].list " class="custom_btn_s2" :class="{'disabled':form.form.keywordsList&&form.form.keywordsList.indexOf(point)<0}" :key="i">
                                {{point}}
                                <input type="checkbox" :value="point" v-model="form.form.keywordsList" />
                            </label>
                        </div>
                        <div class="custom_keyword">
                            <span>自定义</span>
                            <el-input v-model="kewords" :maxlength="8" placeholder="自定义亮点"></el-input>
                            <div @click="addKeyWord(kewords)" class="add">
                                <i></i>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="自我评价" prop="professionSkill">
                        <TextArea :value.sync="form.form.professionSkill" :totalCount="1500" :rows="6" :placeholder="'请简明扼要地说明您掌握的技能或者专长，您最大的优势是什么。不少于10字，不超过1500字。'"></TextArea>
                    </el-form-item>
                    <FormBtn @save="saveItem" :length="0" @cancel="cancelEdit"></FormBtn>
                </el-form>
                <template v-else>
                    <div v-if="info.keywordsList&&info.keywordsList.length>0">
                        <span>我的亮点</span>
                        <ul class="keywordList">
                            <li class="custom_btn_s2 default" v-for="(item,index) in info.keywordsList" :key="index">{{item}}</li>
                        </ul>
                    </div>
                    <div>
                        <span>自我评价</span>
                        <pre class="text">{{info.professionSkill}}</pre>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { Component, Watch, Prop, Mixins } from 'vue-property-decorator'
import { ItemMixin } from '../mixins/resume'
import _ from 'lodash'
import FormBtn from '../../components/button/btn_formBtn.vue'
import TextArea from '../../components/resume/textarea.vue'
import ItemEmpty from './item-empty.vue'
import pointList from '../../common/point'
import ItemHeader from './item-header.vue'

import { getIntentInfo as getInfo, modifyIntentInfo } from '../../api/resume'

@Component({
  name: 'itemPerEvaluation',
  components: {
    ItemEmpty,
    FormBtn,
    TextArea,
    ItemHeader
  }
})
export default class itemPerEvaluation extends Mixins(ItemMixin) {
  public pointList: object[] = pointList //亮点列表
  public currentIndex: number = 0 //记录 当前pointList 的index
  public showPointList: boolean = true
  public emptyData: perEvaluationInfo = {
    keywordsList: [],
    keywords: '',
    professionSkill: ''
  }
  public info: perEvaluationInfo = _.cloneDeep(this.emptyData)
  public form: perEvaluationForm = {
    form: _.cloneDeep(this.emptyData),
    rules: {
      keywordsList: { required: true, message: '必填' },
      keywords: { required: true, message: '必填' },
      professionSkill: [
        { required: true, message: '必填' },
        { min: 10, message: '不能少于 10 个字' },
        { max: 1500, message: '不得超过1500字' },
      ]
    }
  }
  public kewords: string = ''
  //   public itemName: string = 'evaluation'

//   @Watch('info')
//   formatInfo() {
//     let kw = this.info.keywords.split(',')

//     _.assign(this.info, {
//       keywordsList: kw
//     })
//   }
  public async getInfo(resId: number) {
    let res: any = await getInfo(resId)
    if (res.code === 200) {
      this.info = res.data.intentInfo
      let kw = this.info.keywords.split(',')

      _.assign(this.info, {
        keywordsList: kw
      })
    }
  }
  public createItem2() {
    this.createItem()
    this.showPointList = true
  }
  public editItem2() {
    this.editItem(this.info, 0)
    this.showPointList = true
  }
  public saveItem(): void {
    //@ts-ignore
    this.$refs.form.validate(async (valid: boolean) => {
      if (valid) {
        let data = {
          id: this.$store.state.resumeId,
          keywords: String(this.form.form.keywordsList || ''),
          professionSkill: this.form.form.professionSkill,
          modifyType: 2
        }
        let res = await modifyIntentInfo(<intentInfo>data)
        this.save(res)
      }
    })
  }
  public removeTag(tag: string) {
    this.form.form.keywordsList.splice(
      this.form.form.keywordsList.indexOf(tag),
      1
    )
  }
  // 判断亮点是否为空
  @Watch('form.form.keywordsList')
  watchKeywordsList() {
    if (this.form.form.keywordsList && this.$refs.form) {
      // @ts-ignore
      this.$refs.form.validate('keywordsList')
      if (this.form.form.keywordsList.length > 10) {
        this.$message.error('最多贴10个亮点。')
        this.form.form.keywordsList.length = 10
      }
    }
  }
  // 自定义亮点
  public addKeyWord(kw: string) {
    if (!kw) return
    if (
      this.form.form.keywordsList &&
      this.form.form.keywordsList.indexOf(kw) !== -1
    ) {
      this.$message.error('已经有该亮点了')
      return
    }
    this.form.form.keywordsList.push(kw)
    this.kewords = ''
  }
  // 换一换 亮点
  public changeKeyWord() {
    this.currentIndex++
    this.currentIndex > this.pointList.length - 1 && (this.currentIndex = 0)
  }
}
</script>
