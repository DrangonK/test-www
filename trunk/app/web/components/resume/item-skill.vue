<template>
    <div class="resume_item" id="skill">
        <ItemHeader v-on:add-item="createItem" :page="page" :showBtnEdit="info.length>0 && info[0].id" :type="'skill'" :isEdit="editNum!=-1"></ItemHeader>
        <div class="content">
            <ItemEmpty v-if="info.length===0&&!isCreateItem" @create-item="createItem">展现一技之长，助您脱颖而出</ItemEmpty>
            <div v-else v-for="(item,index) in info" :key="index" class="info skill_info" :class="{isEdit:page==='resume'&&editNum==index}">
                <el-form v-if="page==='resume'&&editNum==index" class="item_edit education_edit" :model="form.form" :rules="form.rules" ref="form" label-position="right" label-width="98px">
                    <el-col :span="12">
                        <el-form-item label="技能名称" prop="name">
                            <el-input class="skill_field" v-model="form.form.name" placeholder="选择技能特长" suffix-icon="el-icon-arrow-down"></el-input>
                            <el-cascader style="opacity:0;"  v-model="form.form.allName" @change="selectSkill" :options="skillList" :props="props" :filterable="true" :clearable="false">
                            </el-cascader>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="掌握程度" prop="level">
                            <el-rate @change="change" v-model="form.form.level" show-text :max="4" :texts="texts"></el-rate>
                        </el-form-item>
                    </el-col>
                    <div class="clear-both"></div>
                    <FormBtn @save="saveItem" @cancel="cancelEdit" :length="2" :isCreateItem="isCreateItem" @deleteItem="deleteItem(form.form.id)"></FormBtn>
                </el-form>
                <div class="skill_item" v-if="index!==editNum">
                    <BtnEdit v-if="page==='resume'" v-on:edit-item="editItem(item,index)"></BtnEdit>
                    <span class="name">{{item.name}}</span>
                    <div class="progress">
                        <el-progress :percentage="item.level*25" color="#f6ab00" :stroke-width="7" :show-text="false"></el-progress>
                    </div>
                    <span class="level">{{item.levelStr}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Watch, Prop, Mixins } from 'vue-property-decorator'
import { ItemMixin } from '../mixins/resume'
import _ from 'lodash'
import { getSkillList } from '../../api/dictionary'
import BtnEdit from '../../components/button/btn_edit.vue'
import FormBtn from '../../components/button/btn_formBtn.vue'
import ItemEmpty from './item-empty.vue'
import ItemHeader from './item-header.vue'

import { getParentSiteById } from '../../common/common'
import {
  getSkillInfo as getInfo,
  modifySkillInfo,
  createSkillInfo,
  deleteSkillInfo
} from '../../api/resume'

@Component({
  name: 'ItemSkill',
  components: {
    ItemEmpty,
    BtnEdit,
    FormBtn,
    ItemHeader
  }
})
export default class ItemSkill extends Mixins(ItemMixin) {
  public texts: string[] = ['一般', '良好', '熟练', '精通']
  public skillList: skill[] = []
  public props: props = {
    children: 'chile',
    label: 'name',
    value: 'name'
  }

  public emptyData: skillInfo = {
    id: 0,
    level: 3,
    levelStr: '',
    duration: '',
    name: '',
    allName: []
  }
  public info: skillInfo[] = [_.cloneDeep(this.emptyData)]
  public form: skillForm = {
    form: _.cloneDeep(this.emptyData),
    rules: {
      name: { required: true, message: '必填' },
      level: { required: true, message: '必填' }
    }
  }
   public itemName: string = "skill"; // 调用mixins方法需要用到
  public created() {
    getSkillList.then(data => {
      this.skillList = data
    })
  }
  public async getInfo(resId: number) {
    let res: any = await getInfo(resId)
    if (res.code === 200) {
      this.info = res.data.skillInfo || []
      this.info.forEach((item: skillInfo) => {
        // 后端留下的坑 1->精通，4->一般
        Object.assign(item, { level: 5 - item.level })
      })
    }
  }
  public saveItem() {
    //@ts-ignore
    this.$refs.form[0].validate(async (valid: boolean) => {
      if (valid) {
        let res: any = {}
        let data: any = {
          id: this.form.form.id,
          name: this.form.form.name,
          level: 5 - this.form.form.level
        }
        if (this.isCreateItem) {
          res = await createSkillInfo(data, this.$store.state.resumeId)
        } else {
          res = await modifySkillInfo(data, this.$store.state.resumeId)
        }
        this.save(res)
      }
    })
  }

  // 删除 item
  public async deleteItem(eduId: number) {
    let promise = deleteSkillInfo(this.$store.state.resumeId, eduId)
    this.del(promise)
  }
  // 选择技能
  public selectSkill(skill: string[]) {
    let arr: string[] = skill.concat()
    this.form.form.name = arr[arr.length - 1]
  }
  // 点击星星
  public change() {
    //@ts-ignore
    this.$refs.form[0].validateField('level')
  }
}
</script>
