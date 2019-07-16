<template>
    <div class="resumeView">
        <div class="btn-box">
            <el-button type="text" @click="visible = true"><i class="iconfont">&#xe645;</i>导出打印</el-button>
            <el-button type="text" @click="$router.go(-1)"><i class="iconfont">&#xe684;</i>返回编辑</el-button>
        </div>
        <div id="resume-info" class="resume-left">
            <div class="top">
                <div>
                    <div class="flex-fill">
                        <router-link :to="{name:'Index'}" class="logo">
                            <img src="/public/images/logo-hr.png">
                        </router-link>
<!--                        <p>简历编号：{{resumeVo.resumeNo}}<br>更新时间：{{resumeVo.freDate | format('YYYY-MM-DD')}}</p>-->
                        <p>简历编号：{{resumeVo.resumeNo}}</p>
                    </div>
                </div>
            </div>
            <div class="resume-info">
                <section class="userInfo">
                    <div class="portrait">
                        <img :src="imgSrc" />
                    </div>
                    <div class="info">
                        <p class="name">{{resumeVo.basicInfoVo.userName}}</p>
                        <p>
                            <!-- {{resumeVo.basicInfoVo.gender===1?'男':'女'}}<span class="cut">|</span>{{resumeVo.age}}<span class="cut" v-if="resumeVo.basicInfoVo.marriageStr">|</span>{{resumeVo.basicInfoVo.marriageStr}}<span class="cut" v-if="resumeVo.maxDegree.degreeStr">|</span>{{resumeVo.maxDegree.degreeStr}}<span class="cut" v-if="resumeVo.basicInfoVo.jobyearTypeStr">|</span>{{/年/.test(resumeVo.basicInfoVo.jobyearTypeStr) ? `${resumeVo.basicInfoVo.jobyearTypeStr}经验` : resumeVo.basicInfoVo.jobyearTypeStr}}<template v-if="resumeVo.basicInfoVo.locationStr"><span class="cut">|</span>现居{{resumeVo.basicInfoVo.locationStr}}</template> -->
                            {{
                            formatStr([
                            resumeVo.basicInfoVo.gender===1?'男':'女',
                            resumeVo.age,
                            resumeVo.basicInfoVo.marriageStr,
                            resumeVo.maxDegree?resumeVo.maxDegree.degreeStr:'',
                            /年/.test(resumeVo.basicInfoVo.jobyearTypeStr) ? `${resumeVo.basicInfoVo.jobyearTypeStr}经验`:resumeVo.basicInfoVo.jobyearTypeStr,
                            '现居'+resumeVo.basicInfoVo.locationStr
                            ])
                            }}
                        </p>
                        <p class="cgray">
                            <!--  <template v-if="resumeVo.basicInfoVo.stature">{{resumeVo.basicInfoVo.stature}}cm<span class="cut">|</span></template>
                            <template v-if="resumeVo.basicInfoVo.politicalStr">{{resumeVo.basicInfoVo.politicalStr}}<span class="cut">|</span></template>
                            <template v-if="resumeVo.basicInfoVo.nation">{{resumeVo.basicInfoVo.nation}}族<span class="cut">|</span></template>
                            <template v-if="resumeVo.basicInfoVo.hometownStr">户籍{{resumeVo.basicInfoVo.hometownStr}}<span class="cut">|</span></template> -->
                            {{
                            formatStr([
                            resumeVo.basicInfoVo.stature?resumeVo.basicInfoVo.stature+'cm':'',
                            resumeVo.basicInfoVo.politicalStr,
                            resumeVo.basicInfoVo.nation?resumeVo.basicInfoVo.nation+'族':'',
                            resumeVo.basicInfoVo.hometownStr?'户籍'+resumeVo.basicInfoVo.hometownStr:''
                            ])
                            }}
                        </p>
                        <el-row class="lightFont">
                            <el-col class="text-overflow" :span="10" :title="resumeVo.basicInfoVo.mobile"><i class="iconfont">&#xe62f;</i>{{resumeVo.basicInfoVo.mobile}}<template v-if="resumeVo.basicInfoVo.mobilePlace">（{{resumeVo.basicInfoVo.mobilePlace}}）</template></el-col>
                            <el-col class="text-overflow" :span="12" :title="resumeVo.basicInfoVo.email"><i class="iconfont">&#xe60e;</i>{{resumeVo.basicInfoVo.email}}</el-col>
                            <el-col class="text-overflow" :span="24" v-if="resumeVo.basicInfoVo.qq" :title="resumeVo.basicInfoVo.qq"><i class="iconfont">&#xe652;</i>{{resumeVo.basicInfoVo.qq}}</el-col>
                        </el-row>
                    </div>
                </section>
                <div class="infoBlock">
                    <section class="basic">
                        <div class="title">
                            <span class="cblue"><i class="iconfont">&#xe648;</i>求职意向</span>
                            <span>{{resumeVo.basicInfoVo.jobStateStr}}</span>
                        </div>
                        <div class="contact">
                            <p><span class="cgray">期望职位性质：</span>{{resumeVo.intentInfoVo.jobTypeStr}}</p>
                            <p><span class="cgray">期望从事职位：</span>{{resumeVo.intentInfoVo.jobNameStr}}</p>
                            <p><span class="cgray">期望职位薪资：</span>{{resumeVo.intentInfoVo.salaryStr}}</p>
                            <p><span class="cgray">期望工作地点：</span>{{resumeVo.intentInfoVo.jobLocationStr}}</p>
                            <p v-if="resumeVo.intentInfoVo.checkindateStr"><span class="cgray">预计到岗时间：</span>{{resumeVo.intentInfoVo.checkindateStr}}</p>
                        </div>
                    </section>
                    <section class="work" v-if="resumeVo.workInfoVoList.length">
                        <div class="title">
                            <span class="cblue"><i class="iconfont">&#xe624;</i>工作经历</span>
                        </div>
                        <div class="contact">
                            <div class="infoList" v-for="(workInfo,index) of resumeVo.workInfoVoList" :key="index">
                                <div class="titBar">
                                    <div>
                                        <i class="iconfont">&#xe643;</i>{{workInfo.comName}}&#12288;&#12288;&#12288;&#12288;{{workInfo.section}}
                                    </div>
                                    <div class="cgray">{{workInfo.begin}}~{{dateEnd(workInfo.end)}}<template v-if="workInfo.timeDiff">（{{workInfo.timeDiff}}）</template></div>
                                </div>
                                <p class="cgray4">{{workInfo.jobName}}</p>
                                <!-- <p class="cgray pb15">行业：{{workInfo.comCallingStr}}<span class="cut" v-if="workInfo.comTypeStr">|</span>{{workInfo.comTypeStr && `性质：${workInfo.comTypeStr}`}}<span class="cut" v-if="workInfo.comScaleStr">|</span>{{workInfo.comScaleStr && `规模：${workInfo.comScaleStr}`}}</p> -->
                                <p class="cgray pb15">
                                    {{formatStr([
                                        workInfo.comCallingStr?'行业：'+workInfo.comCallingStr:'',
                                        workInfo.comTypeStr?' 性质：'+workInfo.comTypeStr:'',
                                        workInfo.comScaleStr?' 规模：'+workInfo.comScaleStr:'',
                                    ])}}
                                </p>
                                <div class="pb15">
                                    <pre>{{workInfo.description}}</pre>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section class="experience" v-if="resumeVo.projectInfoVoList.length">
                        <div class="title">
                            <span class="cblue"><i class="iconfont">&#xe64d;</i>项目经历</span>
                        </div>
                        <div class="contact">
                            <div class="infoList" v-for="(projectInfo,index) of resumeVo.projectInfoVoList" :key="index">
                                <div class="titBar">
                                    <div>{{projectInfo.projectName}}</div>
                                    <div class="cgray">{{projectInfo.begin}}~{{dateEnd(projectInfo.end)}}<template v-if="projectInfo.timeDiff">（{{projectInfo.timeDiff}}）</template></div>
                                </div>
                                <p class="cgray">项目描述：</p>
                                <div class="pb15">
                                    <pre>{{projectInfo.proDescribe}}</pre>
                                </div>
                                <p class="cgray">你的职责：</p>
                                <div class="pb15">
                                    <pre>{{projectInfo.dutyDescribe}}</pre>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section class="education" v-if="resumeVo.educationInfoVoList.length">
                        <div class="title">
                            <span class="cblue"><i class="iconfont">&#xe646;</i>教育经历</span>
                        </div>
                        <div class="contact">
                            <div class="infoList" v-for="(educationInfo,index) of resumeVo.educationInfoVoList" :key="index">
                                <div class="titBar">
                                    <div>{{educationInfo.schoolName}}</div>
                                    <div class="cgray">{{educationInfo.begin}}~{{dateEnd(educationInfo.end)}}<template v-if="educationInfo.timeDiff">（{{educationInfo.timeDiff}}）</template></div>
                                </div>
                                <p class="pb15">{{educationInfo.degreeStr}}<span class="cut">|</span>{{educationInfo.speciality}}</p>
                                <template v-if="educationInfo.associationActivity">
                                     <p class="cgray">在校经历：</p>
                                    <div>
                                        <pre>{{educationInfo.associationActivity}}</pre>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </section>
                    <section class="train" v-if="resumeVo.trainInfoVoList.length">
                        <div class="title">
                            <span class="cblue"><i class="iconfont">&#xe647;</i>培训经历</span>
                        </div>
                        <div class="contact">
                            <div class="infoList" v-for="(trainInfo,index) of resumeVo.trainInfoVoList" :key="index">
                                <div class="titBar">
                                    <div>{{trainInfo.trainCourse}}</div>
                                    <div class="cgray">{{trainInfo.begin}}~{{dateEnd(trainInfo.end)}}<template v-if="trainInfo.timeDiff">（{{trainInfo.timeDiff}}）</template></div>
                                </div>
                                <!-- <p class="pb15">{{trainInfo.trainSchoolName}}<span class="cut">|</span>{{trainInfo.placeStr}}<span class="cut">|</span>{{trainInfo.certificate}}</p> -->
                                <p class="pb15">{{trainInfo.trainSchoolName}}</p>
                                <template v-if="trainInfo.courseDescription">
                                    <p class="cgray">详细描述：</p>
                                    <div>
                                        <pre>{{trainInfo.courseDescription}}</pre>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </section>
                    <section class="skills" v-if="resumeVo.skillVoList.length>0||resumeVo.languageInfoVoList.length>0">
                        <div class="title">
                            <span class="cblue"><i class="iconfont">&#xe644;</i>技能特长</span>
                        </div>
                        <div class="contact clearfix">
                            <template v-if="resumeVo.skillVoList.length>0">
                                <p v-for="(skill,index) of resumeVo.skillVoList" :key="index">
                                    {{skill.name}}<span class="cut">|</span>{{skill.levelStr}}
                                </p>
                            </template>
                            <template v-else>
                                <p v-for="(languageInfo,index) of resumeVo.languageInfoVoList" :key="index">
                                    {{languageInfo.skillStr}}<span class="cut">|</span>{{languageInfo.levelStr}}
                                </p>
                            </template>
                        </div>
                    </section>
                    <section class="certificate" v-if="resumeVo.certificateInfoVoList.length">
                        <div class="title">
                            <span class="cblue"><i class="iconfont">&#xe665;</i>证书奖项</span>
                        </div>
                        <div class="contact">
                            <div class="infoList" v-for="(certificateInfo,index) of resumeVo.certificateInfoVoList" :key="index">
                                <div class="titBar">
                                    <div>{{certificateInfo.certificateName}}</div>
                                    <div class="cgray">{{certificateInfo.acquireDateStr}}</div>
                                </div>
                                <p class="cgray" v-if="certificateInfo.grade">成绩：{{certificateInfo.grade}}</p>
                            </div>
                        </div>
                    </section>
                    <section class="evaluate" v-if="resumeVo.intentInfoVo.keywords || resumeVo.intentInfoVo.professionSkill">
                        <div class="title">
                            <span class="cblue"><i class="iconfont">&#xe650;</i>个人评价</span>
                        </div>
                        <div class="contact">
                            <div class="tags" v-if="resumeVo.intentInfoVo.keywords">
                                <span v-for="key of resumeVo.intentInfoVo.keywords.split(',')" :key="key">{{key}}</span>
                            </div>
                            <div>
                                <pre>{{resumeVo.intentInfoVo.professionSkill}}</pre>
                            </div>
                        </div>
                    </section>
                    <section class="enclosure" v-if="resumeVo.accessoryInfoVoList.length">
                        <div class="title">
                            <span class="cblue"><i class="iconfont">&#xe664;</i>作品附件</span>
                        </div>
                        <div class="contact">
                            <div class="infoList" v-for="(accessory,index) of resumeVo.accessoryInfoVoList" :key="index">
                                <div class="titBar pb15">
                                    <div><a :href="accessory.uploadImageUrl">{{accessory.uploadName}}</a></div>
                                    <div><a :href="accessory.opusPath">{{accessory.opusPath}}</a></div>
                                </div>
                                <div>
                                    <pre>{{accessory.description}}</pre>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
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
                <span @click="exportRes">确定</span>
            </div>
        </el-dialog>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import { getResume } from "../../api/resume";
import { formatStr } from "../../common/common";

@Component({
    name: "Preview",
    components: {}
})
export default class Preview extends Vue {
    @Prop()
    // @ts-ignore  简历ID
    public id: number;

    public resumeId: number = 0;
    public visible: boolean = false;
    public exportType: exportSuffix = "WORD";
    public resumeVo = {
        id: null,
        resumeNo: null,
        accountType: null,
        accountId: null,
        resumeName: null,
        resumeType: null,
        resumeId: null,
        resumeStyle: null,
        languageType: null,
        userLastEditBy: null,
        userLastEditDate: null,
        adminLastEditBy: null,
        adminLastEditDate: null,
        freDate: null,
        resumeGrade: null,
        passDate: null,
        comeFrom: null,
        havePhoto: null,
        pass: null,
        flag: null,
        readCount: null,
        resFormwork: null,
        perfectNum: null,
        perfectInfo: null,
        age: null,
        displayEnResume: null,
        maxDegree: {},
        intentInfoVo: {
            id: null,
            creDate: null,
            updDate: null,
            jobType: null,
            treatment: null,
            salary: null,
            negotiable: null,
            otherMandate: null,
            jobCode: null,
            jobName: null,
            jobLocation: null,
            checkindate: null,
            keywords: null,
            professionSkill: null,
            jobTypeArr: null,
            refreshDate: null,
            jobCustomList: null,
            jobCodeList: null,
            jobTypeStr: null,
            jobLocationList: null,
            checkindateStr: null,
            jobLocationStr: null,
            salaryStr: null,
            jobNameStr: null,
            jobCodeStr: null
        },
        languageInfoVoList: [],
        certificateInfoVoList: [],
        projectInfoVoList: [],
        accessoryInfoVoList: [],
        workInfoVoList: [],
        educationInfoVoList: [],
        trainInfoVoList: [],
        skillVoList: [],
        basicInfoVo: {
            id: null,
            accountType: null,
            account: null,
            loginCount: null,
            freDate: null,
            createDate: null,
            loginDate: null,
            publicSettings: null,
            filterComId: null,
            vipMember: null,
            refreshRemind: null,
            userName: null,
            gender: null,
            birthday: null,
            location: null,
            locationTown: null,
            email: null,
            cardType: null,
            cardNum: null,
            hometown: null,
            hometownTown: null,
            phone: null,
            mobile: null,
            nation: null,
            marriage: null,
            stature: null,
            weight: null,
            zipcode: null,
            mobileActivation: null,
            identification: null,
            mailActivation: null,
            homepage: null,
            qq: null,
            political: null,
            jobyearType: null,
            jobState: null,
            nowSalary: null,
            userNameEn: null,
            nationEn: null,
            fileName: null,
            filePath: null,
            resId: null,
            refreshDays: null,
            resRecommend: null,
            status: null,
            degree: null,
            defaultPerResumeVo: null,
            avatarImgUrl: ""
        },
        passStr: null
    };

    created() {
        this.resumeId = Number(this.$route.params.id);
        this.getResume(this.resumeId);
    }
    // 01--获取当前简历的 --完整信息
    public async getResume(resumeId: number) {
        let res: any = await getResume(resumeId);

        if (res.code === 200) {
            this.resumeVo = res.data.resumeDetail;
            // 设置标题
            document.title = `${this.resumeVo.basicInfoVo.userName}【${
                this.resumeVo.resumeName
            }】`;
        }
    }
    public async exportRes() {
        let src = `/api/per/resume/${this.resumeId}/export?exportFormat=${
            this.exportType
        }`;
        this.visible = false;
        window.open(src);
    }
    get imgSrc(): string {
        let src: string = "";
        if (this.resumeVo.basicInfoVo.photoUrl) {
            src = this.resumeVo.basicInfoVo.photoUrl;
        } else {
            src = `/public/images/${
                this.resumeVo.basicInfoVo.gender === 1 ? "boy" : "girl"
            }.jpg`;
        }
        return src;
    }
    public formatStr(arr: string[]): string {
        return formatStr(<Array<string>>arr);
    }
    // 判断时间（至今）
    public dateEnd(val: string) {
        if (val) {
            return val;
        } else {
            return "至今";
        }
    }
}
</script>

<style lang='scss' scoped>
@import "../../style/resume/preview.scss";
</style>
