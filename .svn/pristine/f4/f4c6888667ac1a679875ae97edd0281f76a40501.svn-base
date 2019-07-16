<template>
    <div class="resume_item" id="education">
        <ItemHeader v-on:add-item="createItem" :page="page" :showBtnEdit="info.length>0 && info[0].id" :type="'edu'" :isEdit="editNum!=-1"></ItemHeader>
        <div class="content">
            <ItemEmpty v-if="info.length===0&&!isCreateItem" @create-item="createItem">教育经历最能体现你的学习能力哦！</ItemEmpty>
            <div v-else v-for="(item,index) in info" :key="index" class="info" :class="{isEdit:page==='resume'&&editNum==index}">
                <el-form v-if="page==='resume'&&editNum==index" class="item_edit" :model="form.form" :rules="form.rules" ref="form" label-position="right" label-width="98px">
                    <el-form-item label="院校名称" prop="schoolName">
                        <el-autocomplete class="inline-input" :fetch-suggestions="querySchool" v-model="form.form.schoolName" :maxlength="25" :trigger-on-focus="false" placeholder="例如：华南理工大学" style="width:100%"></el-autocomplete>
                    </el-form-item>
                    <el-col :span="12">
                        <el-form-item label="取得学历" prop="degree">
                            <el-select v-model="form.form.degree" @change="changeDegree" placeholder="选择学历">
                                <el-option v-for="item in degree" :label="item.name" :value="item.id" :key="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="专业名称" prop="speciality" :class="{'is-required':form.form.degree>2}">
                            <el-autocomplete class="inline-input" :fetch-suggestions="querySpeciality" v-model="form.form.speciality" :disabled="form.form.degree<3" :maxlength="25" :trigger-on-focus="false" placeholder="例如：视觉传达设计方向" style="width:100%"></el-autocomplete>
                        </el-form-item>
                    </el-col>
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
                        <el-form-item label-width="0">
                            <label>
                                <el-date-picker v-model="form.form.end" :picker-options="optionsEnd" format="yyyy-MM" value-format="yyyy-MM" type="month" placeholder="结束日期" prefix-icon="none" :clearable="false"></el-date-picker>
                                <i class="icon-date"></i>
                            </label>
                        </el-form-item>
                    </el-col>
                    <div class="clear-both"></div>
                    <el-form-item label="在校经历">
                        <TextArea :value.sync="form.form.associationActivity" :totalCount="1500" :rows="6" :placeholder="'可填写：在校期间参加过什么培训，学了什么技能，获得什么荣誉'"></TextArea>
                    </el-form-item>
                    <FormBtn @save="saveItem" @cancel="cancelEdit" :length="info.length" :isCreateItem="isCreateItem" @deleteItem="deleteItem(form.form.id)"></FormBtn>
                </el-form>
                <div v-if="page==='resume'&&index!==editNum" class="border_ele"></div>
                <div class="item_min" v-if="index!==editNum">
                    <div class="item_name">
                        <BtnEdit v-if="page==='resume'" v-on:edit-item="editItem(item,index)"></BtnEdit>
                        <span>{{item.schoolName}}</span>
                    </div>
                    <div class="item_msg">
                        <div>
                            <span class="fr">{{item.begin}}~{{item.end?item.end:'至今'}}</span>
                            <span>{{item.degreeStr}}</span>
                            <span>{{item.speciality?' ｜ '+item.speciality:''}}</span>
                        </div>
                    </div>
                    <div class="item_content" v-if="item.associationActivity">
                        <pre>{{item.associationActivity}}</pre>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { Component, Prop, Mixins } from "vue-property-decorator";
import { LimitDate, ItemMixin } from "../mixins/resume";
import _ from "lodash";
import BtnEdit from "../../components/button/btn_edit.vue";
import FormBtn from "../../components/button/btn_formBtn.vue";
import TextArea from "../../components/resume/textarea.vue";
import ItemEmpty from "./item-empty.vue";
import ItemHeader from "./item-header.vue";

import { getOtherData } from "../../api/dictionary";
import { fuzzyMatchSchool, fuzzyMatchSpecialty } from "../../api/lenovo";
import {
    getEducationInfo as getInfo,
    modifyEducationInfo,
    createEducationInfo,
    deleteEducationInfo
} from "../../api/resume";

@Component({
    name: "ItemEducation",
    components: {
        ItemEmpty,
        BtnEdit,
        FormBtn,
        TextArea,
        ItemHeader
    }
})
export default class ItemEducation extends Mixins(LimitDate, ItemMixin) {
    public degree: OtherDataStructure[] | undefined = []; //学历
    public emptyData: educationInfo = {
        id: 0,
        schoolName: "",
        degree: null,
        degreeStr: "",
        speciality: "",
        begin: "",
        end: "",
        specialityDescription: "",
        associationActivity: "",
    };
    public info: educationInfo[] = [_.cloneDeep(this.emptyData)];
    public form: educationForm = {
        form: _.cloneDeep(this.emptyData),
        rules: {
            schoolName: { required: true, message: "必填" },
            degree: { required: true, message: "必填" },
            begin: { required: true, message: "开始日期必填" },
            speciality: {
                validator: (rule: any, value: any, callback: any) => {
                    if (<number>this.form.form.degree > 2 && !value) {
                        callback(new Error("必填"));
                    } else {
                        callback();
                    }
                }
            }
        }
    };

    created() {
        getOtherData.then(data => {
            this.degree = data.degree;
        });
    }
    public async getInfo(resId: number) {
        let res: any = await getInfo(resId);
        if (res.code === 200) {
            this.info = res.data.educationInfo || [];
        }
    }

    public saveItem() {
        //@ts-ignore
        this.$refs.form[0].validate(async (valid: boolean) => {
            if (valid) {
                let res: any = {};
                if (this.isCreateItem) {
                    res = await createEducationInfo(
                        this.form.form,
                        this.$store.state.resumeId
                    );
                } else {
                    res = await modifyEducationInfo(
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
        let promise = deleteEducationInfo(this.$store.state.resumeId, eduId);
        this.del(promise);
    }
    public changeDegree(val: any) {
        if (!val || val <= 2) {
            this.form.form.speciality = "";
            // @ts-ignore
            this.$refs.form[0].clearValidate("speciality");
        }
    }
    // 搜索联想
    public async querySchool(qs: string, cb: Function) {
        let arr: object[] = [];

        if (qs) {
            let res: any = await fuzzyMatchSchool(qs);
            if (
                res.data &&
                res.data.schoolList &&
                res.data.schoolList.length > 0
            ) {
                res.data.schoolList.forEach((item: string) => {
                    arr.push({ value: item.replace(/^\s+|\s+$/gi, "") });
                });
                cb(arr);
            } else {
                cb([]);
            }
        } else {
            // 匹配不到就返回
            cb([]);
        }
    }
    // 搜索联想
    public async querySpeciality(qs: string, cb: Function) {
        let arr: object[] = [];

        if (qs) {
            let res: any = await fuzzyMatchSpecialty(qs);
            if (
                res.data &&
                res.data.specialtyList &&
                res.data.specialtyList.length > 0
            ) {
                res.data.specialtyList.forEach((item: string) => {
                    arr.push({ value: item.replace(/^\s+|\s+$/gi, "") });
                });
                cb(arr);
            } else {
                cb([]);
            }
        } else {
            // 匹配不到就返回
            cb([]);
        }
    }
}
</script>
