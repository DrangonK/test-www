<template>
    <div class="resume_item" id="intent">
        <ItemHeader v-on:edit-item="editItem2" :page="page" :info="info" :type="'intent'"
                    :isEdit="editNum!=-1"></ItemHeader>
        <div class="content overflow">
            <ItemEmpty v-if="!info.id&&!isCreateItem" @create-item="createItem">填写求职意向，让心仪职位主动来找你</ItemEmpty>
            <div v-else class="info intent_info">
                <el-form v-if="page==='resume'&&editNum==0" class="item_edit intent_edit" :model="form.form"
                         :rules="form.rules" ref="form" label-position="right" label-width="98px">
                    <el-form-item label="期望职位" prop="jobCodeList" ref="jobCodeList" :show-message="false"
                                  class="is-required">
                        <JobSelector @change="validjobName" v-model="form.form.jobCodeList" :type="'job'"
                                     placeholder="请选择期望职位"></JobSelector>
                    </el-form-item>
                    <el-col :span="12">
                        <el-form-item prop="jobName" ref="jobName">
                            <el-input @input="validjobCodeList('jobCodeList')" v-model="form.form.jobName"
                                      :maxlength="25" placeholder="请填写职位"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label-width="0">（可自定义职位，最多3个，空格隔开）</el-form-item>
                    </el-col>
                    <div class="clear-both"></div>
                    <el-form-item label="期望地区" prop="jobLocationList">
                        <BoxSelector @change="form.form.jobLocationList=$event"
                                     v-model="form.form.jobLocationList"></BoxSelector>
                    </el-form-item>
                    <el-form-item label="工作类型" class="job_type my_checkBox" prop="jobTypeArr">
                        <el-checkbox-group v-model="form.form.jobTypeArr">
                            <el-checkbox class="width-65" v-for="item in jobType2" :label="item.id" border
                                         :key="item.id">{{item.name}}
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-col :span="12">
                        <el-form-item label="期望月薪" prop="salary">
                            <el-select v-model="form.form.salary" placeholder="请选择月薪">
                                <el-option v-if="item.id>0" v-for="(item,index) in salaryCom"
                                           :label="trsfSalary(item.id)" :value="item.id" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="到岗时间" prop="checkindate">
                            <el-select v-model="form.form.checkindate" placeholder="请选择到岗时间">
                                <el-option v-for="(item,index) in workTime" :label="item.name" :value="item.id"
                                           :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <div class="clear-both"></div>
                    <FormBtn :isCreateItem="true" @save="saveItem" @cancel="cancelEdit"></FormBtn>
                </el-form>
                <template v-else>
                    <ul class="intent_info_list">
                        <li>
                            <span>期望职位</span>
                            {{info.jobNameStr}}
                        </li>
                        <li>
                            <span>期望地区</span>
                            {{info.jobLocationStr}}
                        </li>
                        <li>
                            <span>工作类型</span>
                            {{info.jobTypeStr}}
                        </li>
                        <li>
                            <span>期望月薪</span>
                            {{trsfSalary(info.salary)}}
                        </li>
                        <li v-if="info.checkindateStr">
                            <span>到岗时间</span>
                            {{info.checkindateStr}}
                        </li>
                    </ul>
                    <div class="training_cont" v-if="trainContent">
                        <div class="train_box">
                            <i class="icon-hand"></i>
                            <span @click="clickTrain" v-html="trainContent"></span>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
    import {Component, Prop, Mixins} from "vue-property-decorator";
    import {ItemMixin} from "../mixins/resume";
    import _ from "lodash";
    import BtnEdit from "../../components/button/btn_edit.vue";
    import FormBtn from "../../components/button/btn_formBtn.vue";
    import ItemEmpty from "./item-empty.vue";
    import BoxSelector from "../../components/boxSelector/box-selector.vue";
    import JobSelector from "../../components/boxSelector/job-selector.vue";
    import ItemHeader from "./item-header.vue";
    import {trsfSalary} from "../../common/common";
    import {getOtherData} from "../../api/dictionary";
    import {
        getIntentInfo as getInfo,
        modifyIntentInfo,
        createIntentInfo,
        trainRecommend
    } from "../../api/resume";
    import {strictEqual} from "assert";

    @Component({
        name: "IntentItem",
        components: {
            ItemEmpty,
            BtnEdit,
            FormBtn, //完成&&取消
            BoxSelector,
            ItemHeader,
            JobSelector
        }
    })
    export default class IntentItem extends Mixins(ItemMixin) {
        public salaryCom: OtherDataStructure[] | undefined = []; //期望月薪
        public workTime: OtherDataStructure[] | undefined = []; //工作年限
        public jobType2: OtherDataStructure[] | undefined = []; //工作类型

        public validatePos = (rule: any, value: any, callback: any) => {
            if (
                !this.form.form.jobName &&
                this.form.form.jobCodeList.length === 0
            ) {
                callback(new Error("期望职位必填一项"));
            } else if (this.form.form.jobName) {
                if (/[,，]+/gi.test(this.form.form.jobName)) {
                    callback(new Error("不能含有逗号"));
                } else if (customJobName(this.form.form.jobName)) {
                    callback(new Error("超过3个职位，请修改"));
                } else {
                    callback();
                }
            } else {
                callback();
            }

            function customJobName(s: string): boolean {
                if (s != null && s != "") {
                    s = s.replace(/(^\n+)|(\n+$)|(^\s*)|(\s*$)|(^　*)|(　*$)/g, "");
                }
                let str = s.replace(/(\s+)|(　+)/g, " ").split(" ");
                return str.length > 3;
            }
        };
        public emptyData: intentInfo = {
            id: this.$store.state.resumeId,
            jobCodeList: [], // 期望职位的id列表
            jobCodeStr: "", // 期望职位--选择
            jobName: "", // 期望职位--自定义职位
            jobLocationList: [], // 期望地区的id列表
            jobLocationStr: "", // 期望地区
            jobTypeArr: [], // 工作类型id列表
            jobTypeStr: "", // 工作类型
            salary: "", // 期望月薪 id
            checkindate: "", // 到岗时间 id
            checkindateStr: "" // 到岗时间
        };
        public info: intentInfo = _.cloneDeep(this.emptyData);
        public trainContent: string = '';

        public form: intentForm = {
            form: this.emptyData,
            rules: {
                jobCodeList: {validator: this.validatePos},
                jobName: {validator: this.validatePos},
                jobLocationList: {required: true, message: "必填"},
                jobTypeArr: {required: true, message: "必选"},
                salary: {required: true, message: "必填"}
            }
        };
        public module: string = "intentInfo";

        created() {
            getOtherData.then(data => {
                this.salaryCom = data.salaryCom;
                this.workTime = data.workTime;
                this.jobType2 = data.jobType2;
            });
        }

        public async trainRecommend() {
            let res: any = await trainRecommend();
            if (res.code === 200) {
                this.trainContent = res.data.trainRecommendMsg.content;
            }
        }
        // 点击了培训学院的url
        public clickTrain(e){
            let ele = e.target;
            if(ele.nodeName==='A'){
                let id=ele.getAttribute('data-id');
                let href=ele.getAttribute('href');
                // @ts-ignore
                this.$log('per:click:recommend:train:course', href, {courseCode:id});
            }
        }

        public async getInfo(resId: number) {
            let res: any = await getInfo(resId);
            if (res.code === 200) {
                this.info = res.data.intentInfo;
                this.info.jobName = this.info.jobName.replace(/[,，]/gi, " ");
                this.trainRecommend();
            }
        }

        public editItem2() {
            this.editItem(this.info, 0);
        }

        public saveItem() {
            // @ts-ignore
            this.$refs.form.validate(async (valid: boolean) => {
                if (valid) {
                    let jobName = "";
                    if (this.form.form.jobName) {
                        jobName = this.form.form.jobName.replace(/^\s+|\s+$/g, "");
                        if (jobName) {
                            jobName = jobName.replace(/\s+/g, ",");
                        }
                    }
                    let data = {
                        id: this.$store.state.resumeId,
                        salary: this.form.form.salary,
                        jobCode: String(this.form.form.jobCodeList),
                        jobLocation: String(this.form.form.jobLocationList),
                        jobTypeArr: this.form.form.jobTypeArr,
                        jobName: jobName,
                        checkindate: this.form.form.checkindate,
                        modifyType: 1
                    };
                    let res: any = {};
                    if (this.isCreateItem) {
                        res = await createIntentInfo(data);
                    } else {
                        res = await modifyIntentInfo(data);
                    }
                    this.save(res);
                }
            });
        }

        // 改变期望职位 -> 验证自定义职位
        public validjobName(jobCodeList: number[]) {
            // @ts-ignore
            this.form.form.jobCodeList = jobCodeList;
            // @ts-ignore
            this.$refs.form.validateField("jobName");
        }

        // 改变自定义职位 -> 验证期望职位
        public validjobCodeList(jobCodeList: string) {
            // @ts-ignore
            this.$refs.form.validateField(jobCodeList);
        }

        // 转换薪资
        public trsfSalary(salaryId: number): string {
            if (salaryId <= 0) return "";
            return trsfSalary(salaryId);
        }
    }
</script>
