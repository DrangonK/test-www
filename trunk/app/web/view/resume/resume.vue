<template>
    <div class="resume_cont" ref="resumeCont" data-page="resume">
        <RightSide v-if="resume.resumeDetail" @save="getResume" :resume="resume" :isDefault="getCurrentResume.default"></RightSide>
        <div class="resume_box">
            <div class="resume_header">
                <div class="line_1">
                    <div class="select_resume">
                        <el-dropdown trigger="click" @command="switchResume">
                            <div class="el-dropdown-link resumeName">
                                <span>{{getCurrentResume.default?'(默认)':''}}{{getCurrentResume.resumeName}}</span>
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="(resume,i) in perResumeList" :key="i" :command="i">
                                    {{resume.default?'(默认)':''}}{{resume.resumeName}}
                                </el-dropdown-item>
                                <el-dropdown-item command="-1" v-if="perResumeList.length<5">新增简历+</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <div class="handle_resume">
                        <a @click="setDefaultResume" v-show="!getCurrentResume.default">设为默认</a>
                        <span v-show="!getCurrentResume.default">｜</span>
                        <a @click="renameResume('rename')">重命名</a>
                        <span>｜</span>
                        <a @click="deleteResume">删除</a>
                        <span class="open_setting">
                            <i class="icon-eye_02"></i>
                            <router-link :to="{name:'Privacy'}">公开设置</router-link>
                        </span>
                    </div>
                    <!--   <a @click="$router.go(-1)" class="back">
                        <i class="icon-back_01"></i>
                        <span>返回</span>
                    </a> -->

                </div>
                <div class="photo">
                    <img :src="$store.state.photoPath">
                    <div class="mask" @click="isShowUploadBox=true">
                        <i class="icon-camera"></i>
                    </div>
                    <UploadImage @save="getResume" @hideUploadBox="isShowUploadBox=false" :visible="isShowUploadBox"></UploadImage>
                </div>
            </div>
            <div class="resume_content">
                <ItemBasic @save="getResume" :id="id" v-if="id"></ItemBasic>
                <ItemIntent @save="getResume" :id="id"></ItemIntent>
                <ItemEducation @save="getResume" :id="id"></ItemEducation>
                <ItemWork @save="getResume" :id="id"></ItemWork>
                <ItemProject @save="getResume" :id="id"></ItemProject>
                <itemPerEvaluation @save="getResume" :id="id"></itemPerEvaluation>
                <ItemSkill @save="getResume" :id="id"></ItemSkill>
                <ItemTrain @save="getResume" :id="id" :isAddModule.sync="isAddModule.train" v-if="trainInfoVoList.length!==0 || isAddModule.train"></ItemTrain>
                <ItemCertificate @save="getResume" :id="id" :isAddModule.sync="isAddModule.certificate" v-if="certificateInfoVoList.length!==0 || isAddModule.certificate"></ItemCertificate>
                <ItemAccessory @save="getResume" :id="id" :isAddModule.sync="isAddModule.accessory" v-if="accessoryInfoVoList.length!==0 || isAddModule.accessory"></ItemAccessory>
                <div class="resume_item" id="module" v-if="isShowModule">
                    <div class="header">
                        <i class="icon-per_add"></i>
                        <span>添加模块</span>
                    </div>
                    <div class="content">
                        <div class="empty_module">
                            <ul>
                                <li @click="addModule('train')" v-if="trainInfoVoList.length===0&&!isAddModule.train">
                                    <i class="icon-add_04 nav_item" data-href="#train"></i>培训经历
                                </li>
                                <li @click="addModule('certificate')" v-if="certificateInfoVoList.length===0&!isAddModule.certificate">
                                    <i class="icon-add_04 nav_item" data-href="#certificate"></i>证书奖项
                                </li>
                                <li @click="addModule('accessory')" v-if="accessoryInfoVoList.length===0&!isAddModule.accessory">
                                    <i class="icon-add_04 nav_item" data-href="#accessory"></i>作品附件
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import {
  getResumeList,
  getResume,
  renameResume,
  setDetaultResume,
  addResume,
  deleteResume
} from '../../api/resume';

import UploadImage from '../../components/uploadImage.vue';
import RightSide from '../../components/resume/right_side.vue';
import ItemBasic from '../../components/resume/item-basic.vue';
import ItemIntent from '../../components/resume/item-intent.vue';
import ItemEducation from '../../components/resume/item-education.vue';
import ItemWork from '../../components/resume/item-work.vue';
import ItemProject from '../../components/resume/item-project.vue';
import itemPerEvaluation from '../../components/resume/item-per-evaluation.vue';
import ItemSkill from '../../components/resume/item-skill.vue';
import ItemTrain from '../../components/resume/item-train.vue';
import ItemCertificate from '../../components/resume/item-certificate.vue';
import ItemAccessory from '../../components/resume/item-accessory.vue';

const leaveTips = (to: any, from: any, next: any) => {
  let item_edit = document.getElementsByClassName('item_edit');
  if (to.name === 'Resume' && to.hash) next();
  if (item_edit.length > 0) {
    let answer = window.confirm('部分内容还没保存，是否继续？');
    if (answer) {
      next();
    } else {
      next(false);
    }
    /* this.$confirm('部分内容还没保存，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            next()
          })
          .catch(() => {}) */
  } else {
    next();
  }
};

@Component({
  name: 'Resume',
  components: {
    UploadImage,
    RightSide, // 右侧栏
    ItemBasic, //基本信息
    ItemIntent, //求职意向
    ItemEducation, //教育经历
    ItemWork, //工作经验
    ItemProject, //项目经历
    itemPerEvaluation, //个人评价
    ItemSkill, //技能特长
    ItemTrain, //培训经历
    ItemAccessory, //作品附件
    ItemCertificate //证书
  },
  beforeRouteLeave(to, from, next) {
    leaveTips(to, from, next);
  }
})
export default class Resume extends Vue {
  @Prop()
  // @ts-ignore  简历ID
  public id: number;

  public isShowUploadBox: boolean = false;

  public perResumeList: perResumeList[] = []; //简历列表
  // @ts-ignore
  public resume: resume = {}; //整份简历的信息
  public basicInfoVo: basicInfo = {}; // 基本信息
  public trainInfoVoList: trainInfo[] = []; //培训经历
  public accessoryInfoVoList: accessory[] = []; // 作品附件
  public certificateInfoVoList: certificateInfo[] = []; //证书

  //用于判断是否点击了【添加模块】
  public isAddModule: isAddModule = {
    train: false,
    certificate: false,
    accessory: false
  };

  // 判断过长 -- 用于是否显示底部的添加模块
  get isShowModule(): boolean {
    let is: boolean =
      (this.trainInfoVoList.length === 0 && !this.isAddModule.train) ||
      (this.certificateInfoVoList.length == 0 &&
        !this.isAddModule.certificate) ||
      (this.accessoryInfoVoList.length === 0 && !this.isAddModule.accessory);
    return is;
  }

  created() {
    if (this.id) {
      this.getResume(this.id);
      this.getResumeList('getList');
    } else {
      this.getResumeList('getResume');
    }
    window.onbeforeunload = function() {
      let item_edit = document.getElementsByClassName('item_edit');
      if (item_edit.length > 0) {
        return '部分内容还没保存，是否继续？';
      }
    };
  }
  // 00--获取简历列表
  public async getResumeList(type: 'getList' | 'getResume' | 'del') {
    let res: any = await getResumeList();

    if (res.code === 200) {
      !this.id && (this.id = res.data.defaultId);

      if(this.$route.query.test=='log-test'){
           // @ts-ignore
        this.$log(null, null, res);
      }
      try {
        if (!this.id) {
          // @ts-ignore
          this.$log(null, null, res);
        }
      } catch (error) {
        console.error('日志：简历id', error);
      }
      // @ts-ignore  设置当前简历
      res.data.perResumeList.forEach((resume: perResumeList, i: number) => {
        let isCurrent: boolean = false;
        if (type === 'getList') {
          isCurrent = resume.id == this.id ? true : false;
        } else {
          isCurrent = resume.default ? true : false;
        }
        Object.assign(resume, { isCurrent: isCurrent });
      });
      this.perResumeList = res.data.perResumeList;

      // 获取默认简历的信息
      if (type !== 'getList') {
        this.getResume(res.data.defaultId);
      }
      // 删除简历跳到默认简历
      if (type === 'del') {
        this.$router.replace('/per/resume/' + res.data.defaultId);
      }
    }
  }
  // 01--获取当前简历的 --完整信息
  // 只要修改了表单，都可能会影响到简历的完整度，所以只要操作了表单都重新获取整份简历信息
  public async getResume(resumeId?: number) {
    if (!resumeId) {
      resumeId = this.$store.state.resumeId; //获取对应的简历ID
    }

    let res: any = await getResume(<number>resumeId);

    if (res.code === 200) {
      this.resume = res.data;
      this.basicInfoVo = res.data.resumeDetail.basicInfoVo;
      this.trainInfoVoList = res.data.resumeDetail.trainInfoVoList;
      this.accessoryInfoVoList = res.data.resumeDetail.accessoryInfoVoList;
      this.certificateInfoVoList = res.data.resumeDetail.certificateInfoVoList;

      // @ts-ignore
      this.$store.commit('saveResume', res.data.resumeDetail);
    } else {
      this.$message.error(res.msg);
    }
  }

  // 获取默认简历
  get getDefaultResume(): perResumeList {
    return (
      this.perResumeList.find(resume => {
        return resume.default;
      }) || this.perResumeList[0]
    );
  }
  // 获取当前简历
  get getCurrentResume(): perResumeList {
    let currentResume: perResumeList = {
      id: 0, // 简历Id
      resumeName: '',
      default: false,
      isCurrent: false,
      pass: 0
    };

    this.perResumeList.forEach((resume: perResumeList, i) => {
      if (resume.isCurrent) {
        currentResume = resume;
      }
    });
    // 没有当前简历，则返回默认简历
    if (Object.keys(currentResume).length === 0) {
      return this.getDefaultResume;
    } else {
      return currentResume;
    }
  }
  // 切换简历
  public switchResume(command: number) {
    if (command >= 0) {
      let item_edit = document.getElementsByClassName('item_edit');
      if (
        item_edit.length > 0 &&
        !window.confirm('部分内容还没保存，是否继续？')
      ) {
        return false;
      }
      this.perResumeList.forEach((resume: perResumeList, i) => {
        if (command !== i) {
          resume.isCurrent = false;
        } else {
          resume.isCurrent = true;
        }
      });

      // @ts-ignore
      this.$router.replace({
        name: 'Resume',
        params: { id: this.getCurrentResume.id }
      });
      this.getResume(this.getCurrentResume.id);
    } else {
      this.renameResume('add');
    }
  }
  // type=='rename' 重命名当前简历; type=='add' 新增一份简历
  public renameResume(type: string): void {
    this.$prompt('', type === 'rename' ? '简历重命名' : '新增简历', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      roundButton: true,
      inputPlaceholder:
        type === 'rename' ? '请输入简历名称' : '请输入新增简历名称',
      inputValue: type === 'rename' ? this.getCurrentResume.resumeName : '',
      callback: async (action, instance) => {
        // instance: MessageBox 实例，可以通过它访问实例上的属性和方法
        if (!instance.inputValue) return;
        if (action === 'confirm') {
          if (type === 'rename') {
            // 修改简历名称---发送请求
            let res = await renameResume(
              this.getCurrentResume.id,
              instance.inputValue
            );
            if (res.code === 200) {
              this.getCurrentResume.resumeName = instance.inputValue;
              this.$message.success('修改成功!');
            } else {
              this.$message.error(res.msg);
            }
          } else if (type === 'add') {
            let res: any = await addResume(0, {
              resumeName: instance.inputValue
            });
            if (res.code === 200) {
              await this.getResumeList('getList');
              this.switchResume(this.perResumeList.length - 1);
              this.$message.success('添加成功!');
            } else {
              this.$message.error(res.msg);
            }
          }
        }
      },
      inputValidator: val => {
        if (!val) {
          return '请输入您的新简历名称。';
        }
        let length: number = 0;
        for (let i = 0; i < val.length; i++) {
          length = length + (val.charCodeAt(i) > 128 ? 1 : 0.5); // 一个中文字算一,两个英文字算一
        }
        if (Math.ceil(length) < 4) {
          return '简历名称不能少于4个中文字。';
        }
        if (Math.ceil(length) > 20) {
          return '简历名称最多20个中文字。';
        }

        let isRepeatName: string = '';
        this.perResumeList.forEach((resume, i) => {
          if (!resume.isCurrent && resume.resumeName === val) {
            isRepeatName = '此简历名称存在，不能重复。';
            return;
          }
        });
        if (isRepeatName) {
          return isRepeatName;
        }
        return true;
      }
    });
  }
  // 删除简历
  public deleteResume(): void {
    if (this.getCurrentResume.default) {
      this.$alert(
        `对不起，【${this.getCurrentResume.resumeName}】为默认简历，不能删除！`,
        '删除简历提示',
        {
          roundButton: true,
          type: 'error'
        }
      );
    } else {
      this.$confirm(
        `删除后不可恢复，确定删除【${this.getCurrentResume.resumeName}】吗？`,
        '温馨提示',
        {
          roundButton: true,
          callback: async action => {
            if (action === 'confirm') {
              let res = await deleteResume(this.$store.state.resumeId);

              if (res.code === 200) {
                // this.getResume(this.getDefaultResume.id)
                this.getResumeList('del');
                this.$message.success('删除成功!');
              } else {
                this.$message.error(res.msg);
              }
              /*  this.perResumeList.splice(
                this.perResumeList.indexOf(this.getCurrentResume),
                1
              ) */
            }
          }
        }
      );
    }
  }
  // 设置当前简历为默认简历
  public setDefaultResume(): void {
      // 未完善的简历无法被设置为默认
      if(!this.getCurrentResume.pass){
          this.$alert('无法设为默认，请先完善当前简历。','温馨提示',{
              type:'warning'
          });
        return
      }
    let html = `只有默认简历才能被HR搜索到，建议设置个人优势突出的简历为默认简历。您确定把<span class="color_orange">【${
      this.getCurrentResume.resumeName
    }】</span>设置为默认简历吗？`;
    this.$confirm(html, '设置默认简历', {
      roundButton: true,
      dangerouslyUseHTMLString: true,
      callback: async action => {
        if (action === 'confirm') {
          let res = await setDetaultResume(this.getCurrentResume.id);
          if (res.code === 200) {
            let resume = this.perResumeList.find(resume => {
              return resume.default;
            });
            // @ts-ignore
            resume.default = false;
            this.getCurrentResume.default = true;
            this.$message.success('设置成功!');
          } else {
            this.$message.error(res.msg);
          }
        }
      }
    });
  }
  // 点击添加模块
  public addModule(str: 'train' | 'certificate' | 'accessory') {
    this.isAddModule[str] = true;
    // this.$nextTick(() => {
    //   location.href = '#' + str
    // })
  }
}
</script>
<style lang='scss' scoped>
@import '../../style/resume/resume.scss';
</style>
