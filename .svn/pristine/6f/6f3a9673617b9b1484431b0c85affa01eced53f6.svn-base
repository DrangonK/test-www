<template>
    <div class="right_side_cont">
        <div class="right_side_box" ref="rightSideBox">
            <div class="resume_info">
                <div class="resume_type">
                    <span class="zh_cn active">中文简历</span>
                    <span @click="noEnResume" class="en ">英文简历</span>
                </div>
                <div v-if="isDefault" class="info">
                    <div class="text">
                        <a @click="refresh" class="fr">刷新简历</a>
                        <p>
                            简历新鲜度：
                            <span class="color_orange">{{resume.resumeDetail.freshness*100}}%</span>
                        </p>
                    </div>
                    <el-progress :percentage="resume.resumeDetail.freshness*100" :color="resume.resumeDetail.freshness>0.5?'#f6ab00':'#ff5657'" :show-text="false"></el-progress>
                    <p class="refresh_time">
                        上次刷新：
                        <span v-if="resume.resumeDetail" v-html="formatTime(resume.resumeDetail.intentInfoVo.refreshDate)"></span>
                    </p>
                </div>
                <div v-else class="info">
                    <div class="table_cell">
                        <i class="icon-alert_01"></i>
                        当前编辑简历非默认刷新<br>仅对默认简历生效
                    </div>
                </div>
            </div>
            <div class="resume_nav_box">
                <div class="info">
                    <div class="text">
                        <router-link class="fr" :to="{name:'Preview',params:{id:resume.resumeDetail.id}}">预览打印</router-link>
                        <p>
                            简历完整度：
                            <span class="color_orange">{{resume.resumeDetail.perfectNum}}%</span>
                        </p>
                    </div>
                    <el-progress :percentage="resume.resumeDetail.perfectNum" :color="resume.resumeDetail.perfectNum>60?'#f6ab00':'#ff5657'" :show-text="false"></el-progress>
                </div>
                <div class="resume_nav_content">
                    <div class="border_ele"></div>
                    <ul>
                        <li class="active">
                            <!-- <a href="#basic">
                                <div>
                                    <div class="table_cell">
                                        <span v-if="!resume.isBasicComplete">未完善</span>
                                    </div>
                                </div>
                                <span>基本信息</span>
                            </a> -->
                            <div>
                                <div class="table_cell">
                                    <a class="text nav_item" data-href="#basic" v-if="!resume.isBasicComplete">未完善</a>
                                </div>
                            </div>
                            <!-- <router-link :to="{hash:'#basic'}" replace>基本信息</router-link> -->
                            <a class="nav_item" data-href="#basic">基本信息</a>
                        </li>
                        <li>
                            <!-- <a href="#intent">
                                <div>
                                    <div class="table_cell">
                                        <span v-if="!resume.isIntentInComplete">未完善</span>
                                    </div>
                                </div>
                                <span>求职意向</span>
                            </a> -->
                            <div>
                                <div class="table_cell">
                                    <a class="text nav_item" data-href="#intent" v-if="!resume.isIntentInComplete">未完善</a>
                                </div>
                            </div>
                            <!-- <router-link :to="{hash:'#intent'}" replace>求职意向</router-link> -->
                            <a class="nav_item" data-href="#intent">求职意向</a>
                        </li>
                        <li>
                            <!-- <a href="#education">
                                <div>
                                    <div class="table_cell">
                                        <span v-if="!resume.isEducationComplete">未完善</span>
                                    </div>
                                </div>
                                <span>教育经历</span>
                            </a> -->
                            <div>
                                <div class="table_cell">
                                    <a class="text nav_item" data-href="#education" v-if="!resume.isEducationComplete">未完善</a>
                                </div>
                            </div>
                            <!-- <router-link :to="{hash:'#education'}" replace>教育经历</router-link> -->
                            <a class="nav_item" data-href="#education">教育经历</a>
                        </li>
                        <li>
                            <!-- <a href="#work">
                                 <div>
                                    <div class="table_cell">
                                        <span v-if="!resume.isWorkComplete">未完善</span>
                                    </div>
                                </div>
                                 <span>工作经验</span>
                             </a> -->
                            <div>
                                <div class="table_cell">
                                    <a class="text nav_item" data-href="#work" v-if="!resume.isWorkComplete">未完善</a>
                                </div>
                            </div>
                            <!-- <router-link :to="{hash:'#work'}" replace>工作经验</router-link> -->
                            <a class="nav_item" data-href="#work">工作经验</a>
                        </li>
                        <li>
                            <!-- <a href="#project">
                                 <div>
                                    <div class="table_cell">
                                        <i v-if="resume.resumeDetail.projectInfoVoList.length==0" class="icon-alert_02"></i>
                                    </div>
                                </div>
                                 <span>项目经历</span>
                             </a> -->
                            <div>
                                <div class="table_cell">
                                    <a data-href="#project" v-if="resume.resumeDetail.projectInfoVoList.length==0" class="nav_item icon-alert_02"></a>
                                </div>
                            </div>
                            <!-- <router-link :to="{hash:'#project'}" replace>项目经历</router-link> -->
                            <a class="nav_item" data-href="#project">项目经历</a>
                        </li>
                        <li>
                            <!-- <a href="#per_evaluation">
                                 <div>
                                    <div class="table_cell">
                                        <i v-if="!resume.resumeDetail.intentInfoVo.keywords||!resume.resumeDetail.intentInfoVo.professionSkill" class="icon-alert_02"></i>
                                    </div>
                                </div>
                                 <span>个人评价</span>
                             </a> -->
                            <div>
                                <div class="table_cell">
                                    <a data-href="#per_evaluation" v-if="!resume.resumeDetail.intentInfoVo.keywords||!resume.resumeDetail.intentInfoVo.professionSkill" class="nav_item icon-alert_02"></a>
                                </div>
                            </div>
                            <!-- <router-link :to="{hash:'#per_evaluation'}" replace>个人评价</router-link> -->
                            <a class="nav_item" data-href="#per_evaluation">个人评价</a>
                        </li>
                        <li>
                            <!-- <a href="#skill">
                                 <div>
                                    <div class="table_cell">
                                        <i v-if="resume.resumeDetail.skillVoList.length==0" class="icon-alert_02"></i>
                                    </div>
                                </div>
                                 <span>技能特长</span>
                             </a> -->
                            <div>
                                <div class="table_cell">
                                    <a data-href="#skill" v-if="resume.resumeDetail.skillVoList.length==0" class="nav_item icon-alert_02"></a>
                                </div>
                            </div>
                            <!-- <router-link :to="{hash:'#skill'}" replace>技能特长</router-link> -->
                            <a class="nav_item" data-href="#skill">技能特长</a>
                        </li>
                        <li v-if="resume.resumeDetail.trainInfoVoList.length!==0">
                            <a class="nav_item" :data-href="resume.resumeDetail.trainInfoVoList.length==0?'#module':'#train'">
                                <span>培训经历</span>
                            </a>
                        </li>
                        <li v-if="resume.resumeDetail.certificateInfoVoList.length!==0">
                            <a class="nav_item" :data-href="resume.resumeDetail.certificateInfoVoList.length==0?'#module':'#certificate'">
                                <span>证书奖项</span>
                            </a>
                        </li>
                        <li v-if="resume.resumeDetail.accessoryInfoVoList.length!==0">
                            <a class="nav_item" :data-href="resume.resumeDetail.accessoryInfoVoList.length==0?'#module':'#accessory'">
                                <span>作品附件</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <el-dialog title="刷新简历" class="refresh_box" :visible.sync="visible" :lock-scroll="false" width="400px">
                <div class="text">
                    刷新将提升【默认简历】被企业搜索到的概率，<br>请确保如下内容真实可信
                </div>
                <el-form label-position="right" label-width="84px">
                    <el-form-item label="手机号码">
                        <div>
                            &#12288;{{basicForm.mobile}}
                        </div>
                    </el-form-item>
                    <el-form-item label="求职状态">
                        <el-select v-model="basicForm.jobState" placeholder="请选择求职状态">
                            <el-option v-for="item in jobState" :label="item.name" :value="item.state" :key="item.state"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="现居地">
                        <el-cascader v-model="basicForm.locationId" :options="cityList" :props="props" @change="selectAddr" separator="-" :filterable="true" placeholder="请选择现居地">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="工作年限">
                        <el-select v-model="basicForm.jobyearType" placeholder="请选择工作年限">
                            <el-option v-for="(item,index) in workyearList" :value="item.id" :label="item.name" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <div>
                        <button @click="submit" type="button" class="custom_btn block">立即刷新简历</button>
                    </div>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator'
import { formatTime, getParentSiteById } from '../../common/common'
import { getOtherData, getSiteList, jobState } from '../../api/dictionary'
import { refreshResume } from '../../api/resume'

@Component({
  name: 'RightSide'
})
export default class RightSide extends Vue {
  @Prop()
  // @ts-ignore
  public isDefault: boolean
  @Prop()
  // @ts-ignore
  public resume: resume
  public basicForm: basicInfo = {}
  public jobState = jobState

  public visible: boolean = false
  public workyearList: OtherDataStructure[] | undefined = [] //工作年限的列表
  public cityList: Site[] = [] // 城市列表
  public props = {
    children: 'child',
    label: 'name',
    value: 'id'
  }
  public resumeFreshness: number = 25

  created() {
    getOtherData.then(data => {
      this.workyearList = data.workyear
    })
    getSiteList.then(data => {
      this.cityList = data
    })
    this.basicForm = this.resume.resumeDetail.basicInfoVo
    //城市： 14080200 => [14000000, 14080000, 14080200]
    Object.assign(this.basicForm, {
      locationId: getParentSiteById(this.basicForm.location as number)
    })
    if(this.$route.hash==='#refreshRes'){
        this.visible = true
    }
  }
  public noEnResume(): void {
    /*  this.$alert('新版暂不支持英文简历操作。', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      showCancelButton: false,
      showConfirmButton: false,
      closeOnPressEscape: true
    }) */
    this.$message.error('新版暂不支持英文简历操作。')
  }
  public selectAddr(value: number[]): void {
    let arr: number[] = value.concat()
    this.basicForm.location = arr[arr.length - 1]
  }
  public refresh() {
    this.visible = true
    /* if (this.isDefault) {
      this.visible = true
    } else {
      this.$confirm('刷新仅针对默认简历，是否将本简历设为默认？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        roundButton: true,
        lockScroll: false
      }).then(() => {
        this.visible = true
      })
    } */
  }
  public async submit() {
    // @ts-ignore
    let data: refreshResume = {
      jobState: this.basicForm.jobState,
      location: this.basicForm.location,
      jobyearType: this.basicForm.jobyearType
    }
    let res = await refreshResume(data, this.resume.resumeDetail.id)

    if (res.code === 200) {
      this.$emit('save')
      this.visible = false
      this.$message({
        // showClose: true,
        message: `刷新简历成功`,
        type: 'success'
      })
    } else {
      this.$message({
        showClose: true,
        message: res.msg,
        type: 'error'
      })
    }
  }
  public formatTime(value: string) {
    return formatTime(value, 3)
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/resume/right_side.scss';
</style>
