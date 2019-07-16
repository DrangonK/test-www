<template>
    <div class="resume_item" id="work">
        <ItemHeader v-on:add-item="createItem" :page="page" :showBtnEdit="info.length>0 && info[0].id" :type="'work'" :isEdit="editNum!=-1"></ItemHeader>
        <div class="content">
            <ItemEmpty v-if="info.length===0&&!isCreateItem" @create-item="createItem">工作经历最能体现你的学习能力哦！</ItemEmpty>
            <div v-else v-for="(item,index) in info" :key="index" class="info" :class="{isEdit:page==='resume'&&editNum==index}">
                <el-form v-if="page==='resume'&&editNum==index" class="item_edit" :model="form.form" :rules="form.rules" ref="form" label-position="right" label-width="98px">
                    <el-form-item label="公司名称" prop="comName">
                        <el-input v-model="form.form.comName" :maxlength="50" placeholder="请输入公司名称" clear-icon="el-icon-circle-close"></el-input>
                    </el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item prop="begin" label="起止时间">
                                <label>
                                    <el-date-picker v-model="form.form.begin" :picker-options="optionsBegin" format="yyyy-MM" value-format="yyyy-MM" type="month" placeholder="开始日期" prefix-icon="none" :clearable="false"></el-date-picker>
                                    <i class="icon-date"></i>
                                </label>
                            </el-form-item>
                        </el-col>
                        <el-col class="center_ele" :span="1">~</el-col>
                        <el-col :span="8">
                            <el-form-item prop="date2" label-width="0">
                                <label>
                                    <el-date-picker v-model="form.form.end" :picker-options="optionsEnd" format="yyyy-MM" value-format="yyyy-MM" type="month" placeholder="结束日期" prefix-icon="none" :clearable="false"></el-date-picker>
                                    <i class="icon-date"></i>
                                </label>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="规模" class="comScale my_checkBox" prop="comScale">
                        <el-radio-group v-model="form.form.comScale" class="per_radio_border">
                            <el-radio class="width-80" v-for="item in comScale" :label="item.id" :key="item.id" border>{{item.name}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="行业">
                                <el-cascader v-model="form.form.industry" @change="selectAddr(form.form.industry,'location')" :options="industry" :props="props"  separator="-" :filterable="true" placeholder="请选择行业">
                                </el-cascader>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="性质" prop="comType">
                                <el-select v-model="form.form.comType" placeholder="请选择单位性质">
                                    <el-option v-for="item in comType" :label="item.name" :value="item.id" :key="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="职位名称" prop="jobName">
                        <el-input v-model="form.form.jobName" :maxlength="25" placeholder="请输入职位或点击图标选择">
                            <JobSelector id="clickable_icon" slot="suffix" @change="changeJobName" v-model="form.form.jobNameArr" :maxs="1" :type="'job'"></JobSelector>
                        </el-input>
                    </el-form-item>
                    <el-col :span="12">
                        <el-form-item label="部门">
                            <el-input v-model="form.form.section" :maxlength="15" placeholder="输入部门"></el-input>
                        </el-form-item>
                    </el-col>
                    <div class="clear-both"></div>
                    <el-form-item label="工作描述" prop="description">
                        <TextArea :value.sync="form.form.description" :totalCount="1500" :rows="6" :placeholder="'请填写工作描述'"></TextArea>
                    </el-form-item>
                    <el-form-item label="离职原因">
                        <el-input v-model="form.form.leftreason" :maxlength="25" placeholder="请输入离职原因"></el-input>
                    </el-form-item>
                    <FormBtn @save="saveItem" @cancel="cancelEdit" :length="info.length" :isCreateItem="isCreateItem" @deleteItem="deleteItem(form.form.id)"></FormBtn>
                </el-form>
                <div v-if="page==='resume'&&index!==editNum" class="border_ele"></div>
                <div class="item_min" v-if="index!==editNum">
                    <div class="item_name">
                        <BtnEdit v-if="page==='resume'" v-on:edit-item="editItem(item,index)"></BtnEdit>
                        <span>{{item.comName}}</span>
                    </div>
                    <div class="item_msg">
                        <div>
                            <span class="fr">{{item.begin}}~{{item.end?item.end:'至今'}}</span>
                            <span v-if="item.jobName">{{item.jobName}}</span>&#12288;&#12288;&#12288;
                            <span v-if="item.section">{{item.section}}</span>
                        </div>
                        <div v-html="formatStr(item.comCallingStr,item.comTypeStr,item.comScaleStr)">
                        </div>
                    </div>
                    <div class="item_content">
                        <pre>{{item.description}}</pre>
                    </div>
                    <div class="leave_reason" v-if="item.leftreason">
                        离职原因：{{item.leftreason}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Watch, Prop, Mixins } from "vue-property-decorator";
import _ from "lodash";
import { LimitDate, ItemMixin } from "../mixins/resume";
import BtnEdit from "../../components/button/btn_edit.vue";
import FormBtn from "../../components/button/btn_formBtn.vue";
import ItemEmpty from "./item-empty.vue";
import TextArea from "../../components/resume/textarea.vue";
import JobSelector from "../../components/boxSelector/job-selector.vue";
import ItemHeader from "./item-header.vue";
import {
    trsfSalary,
    formatStr,
    getParentIndustryByIds
} from "../../common/common";
import {
    getOtherData,
    getIndustryList,
    getJobTypeList
} from "../../api/dictionary";
import {
    getWorkInfo as getInfo,
    modifyWorkInfo,
    createWorkInfo,
    deleteWorkInfo
} from "../../api/resume";

@Component({
    name: "ItemWork",
    components: {
        ItemEmpty,
        BtnEdit,
        FormBtn,
        TextArea,
        ItemHeader,
        JobSelector
    }
})
export default class ItemWork extends Mixins(LimitDate, ItemMixin) {
    public comScale: OtherDataStructure[] | undefined = []; // 公司规模
    public industry: Industry[] | undefined = []; // 行业
    public comType: OtherDataStructure[] | undefined = []; // 公司性质
    public props = {
        children: "chile",
        label: "name",
        value: "id"
    };
    public emptyData: workInfo = {
        comName: "",
        begin: "",
        end: "",
        jobName: "",
        section: "",
        comCalling: "",
        comCallingStr: "",
        industry: [],
        comTypeStr: "",
        comScaleStr: "",
        description: "",
        leftreason: ""
    };
    public info: workInfo[] = [_.cloneDeep(this.emptyData)];
    public form: workForm = {
        form: _.cloneDeep(this.emptyData),
        rules: {
            comName: { required: true, message: "必填" },
            begin: { required: true, message: "开始日期必填" },
            jobName: { required: true, message: "必填" },
            description: [
                { required: true, message: "必填" },
                { min: 10, message: "不能少于 10 个字" },
                { max: 1500, message: "您输入的字数超过1500个中文字" }
            ]
        }
    };
    public itemName: string = "work"; // 调用mixins方法需要用到

    created() {
        getOtherData.then(data => {
            this.comScale = data.comScale;
            this.comType = data.comType;
        });
        getIndustryList.then(data => {
            this.industry = data;
        });
    }
    public async getInfo(resId: number) {
        let res: any = await getInfo(resId);
        if (res.code === 200) {
            this.info = res.data.workInfo || [];
        }
    }
    public saveItem(): void {
        //@ts-ignore
        this.$refs.form[0].validate(async (valid: boolean) => {
            if (valid) {
                let res: any = {};
                if (this.isCreateItem) {
                    res = await createWorkInfo(
                        this.form.form,
                        this.$store.state.resumeId
                    );
                } else {
                    res = await modifyWorkInfo(
                        this.form.form,
                        this.$store.state.resumeId
                    );
                }
                this.save(res);
            }
        });
    }
    // 删除 item
    public async deleteItem(eduId: number) {
        let promise = deleteWorkInfo(this.$store.state.resumeId, eduId);
        this.del(promise);
    }
    // 选择行业
    public selectAddr(value: number[], type: string): void {
        if (type === "location") {
            this.form.form.comCalling = value[value.length - 1];
        }
    }
    public changeJobName(data: any) {
        this.form.form.jobName = data.jobName;
        // @ts-ignore
        this.form.form.jobNameArr = data.value;
    }
    public formatStr(
        comCallingStr: string,
        comTypeStr: string,
        comScaleStr: string
    ): string {
        let arr: string[] = [
            comCallingStr ? `行业：${comCallingStr}&nbsp;&nbsp;` : "",
            comTypeStr ? `&nbsp;&nbsp;性质：${comTypeStr}&nbsp;&nbsp;` : "",
            comScaleStr ? `&nbsp;&nbsp;规模：${comScaleStr}&nbsp;&nbsp;` : ""
        ];
        return formatStr(arr);
    }
}
</script>
