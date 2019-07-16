<template>
    <div class="resume_item" id="train">
        <ItemHeader v-on:add-item="createItem" :page="page" :showBtnEdit="info.length>0 && info[0].id" :type="'train'" :isEdit="editNum!=-1"></ItemHeader>
        <div class="content">
            <div v-for="(item,index) in info" :key="index" class="info" :class="{isEdit:page==='resume'&&editNum==index}">
                <el-form v-if="page==='resume'&&editNum==index" :model="form.form" class="item_edit" :rules="form.rules" ref="form" label-position="right" label-width="98px">
                    <el-form-item label="培训课程" prop="trainCourse">
                        <el-input v-model="form.form.trainCourse" :maxlength="20" placeholder="请填写项目名称"></el-input>
                    </el-form-item>
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
                    <el-form-item label="培训机构" prop="trainSchoolName">
                        <el-input v-model="form.form.trainSchoolName" rows="6" :maxlength="20" placeholder="请填写培训机构"></el-input>
                    </el-form-item>
                    <el-form-item label="详细描述">
                        <TextArea :value.sync="form.form.courseDescription" :totalCount="1500" :rows="6" :placeholder="'请详细描述您的项目内容。不少于10字，不超过1500字。'"></TextArea>
                    </el-form-item>
                    <FormBtn @save="saveItem" @cancel="cancelEdit2" :length="2" :isCreateItem="isCreateItem" @deleteItem="deleteItem(form.form.id)"></FormBtn>
                </el-form>
                <div v-if="page==='resume'&&index!==editNum" class="border_ele"></div>
                <div class="item_min" v-if="index!==editNum">
                    <div class="item_name">
                        <BtnEdit v-if="page==='resume'" v-on:edit-item="editItem(item,index)"></BtnEdit>
                        <span>{{item.trainCourse}}</span>
                    </div>
                    <div class="item_msg">
                        <div>
                            <span class="fr">{{item.begin}}~{{item.end?item.end:'至今'}}</span>
                            <span>{{item.trainSchoolName}}</span>&#12288;&#12288;&#12288;
                        </div>
                    </div>
                    <div class="item_content" v-if="item.courseDescription">
                        <pre>{{item.courseDescription}}</pre>
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
import ItemHeader from "./item-header.vue";

import {
    getTrainInfo as getInfo,
    modifyTrainInfo,
    createTrainInfo,
    deleteTrainInfo
} from "../../api/resume";

@Component({
    name: "ItemTrain",
    components: {
        FormBtn,
        BtnEdit,
        TextArea,
        ItemHeader
    }
})
export default class ItemTrain extends Mixins(LimitDate, ItemMixin) {
    @Prop()
    // @ts-ignore
    public isAddModule: boolean; //用于判断是否点击了底部的添加模块

    public emptyData: trainInfo = {
        id: 0,
        trainCourse: "",
        begin: "",
        end: "",
        trainSchoolName: "",
        courseDescription: ""
    };
    public info: trainInfo[] = [];
    public form: trainForm = {
        form: _.cloneDeep(this.emptyData),
        rules: {
            trainCourse: { required: true, message: "必填" },
            begin: { required: true, message: "开始日期必填" },
            trainSchoolName: { required: true, message: "必填" }
        }
    };

    created() {
        if (this.isAddModule) {
            this.createItem();
        }
    }
    public async getInfo(resId: number) {
        let res: any = await getInfo(resId);
        if (res.code === 200) {
            this.info = res.data.trainInfo || [];
        }
    }
    public saveItem(): void {
        //@ts-ignore
        this.$refs.form[0].validate(async (valid: boolean) => {
            if (valid) {
                let res: any = {};
                if (this.isCreateItem) {
                    res = await createTrainInfo(
                        this.form.form,
                        this.$store.state.resumeId
                    );
                } else {
                    res = await modifyTrainInfo(
                        this.form.form,
                        this.$store.state.resumeId
                    );
                }

                this.save(res);
            }
        });
    }
    // 取消编辑
    public cancelEdit2() {
        // 如果是点击了底部的【添加模块】
        if (this.isAddModule) {
            this.isAddModule = false;
            this.$emit("update:isAddModule", this.isAddModule);
        }
        this.cancelEdit();
    }
    // 删除 item
    public async deleteItem(eduId: number) {
        let promise = deleteTrainInfo(this.$store.state.resumeId, eduId);
        this.del(promise, true);
    }
}
</script>
