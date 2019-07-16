<template>
    <div class="resume_item" id="project">
        <ItemHeader v-on:add-item="createItem" :page="page" :showBtnEdit="info.length>0 && info[0].id" :type="'project'" :isEdit="editNum!=-1"></ItemHeader>
        <div class="content">
            <ItemEmpty v-if="info.length===0&&!isCreateItem" @create-item="createItem">项目经历反映你的专业技能水平，提高简历竞争力</ItemEmpty>
            <div v-else v-for="(item,index) in info" :key="index" class="info" :class="{isEdit:page==='resume'&&editNum==index}">
                <el-form v-if="page==='resume'&&editNum==index" class="item_edit" :model="form.form" :rules="form.rules" ref="form" label-position="right" label-width="98px">
                    <el-form-item label="项目名称" prop="projectName">
                        <el-input v-model="form.form.projectName" :maxlength="25" placeholder="请填写项目名称"></el-input>
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
                    <el-form-item label="项目描述" prop="proDescribe">
                        <TextArea :value.sync="form.form.proDescribe" :totalCount="1500" :rows="6" :placeholder="'请详细描述您的项目内容。不少于10字，不超过1500字。'"></TextArea>
                    </el-form-item>
                    <el-form-item label="你的职责" prop="dutyDescribe">
                        <TextArea :value.sync="form.form.dutyDescribe" :totalCount="500" :rows="6" :placeholder="'请详细描述您在项目中担当的角色和责任。不少于10字，不超过500字。'"></TextArea>
                    </el-form-item>
                    <FormBtn @save="saveItem" @cancel="cancelEdit" :length="2" :isCreateItem="isCreateItem" @deleteItem="deleteItem(form.form.id)"></FormBtn>
                </el-form>
                <div v-if="page==='resume'&&index!==editNum" class="border_ele"></div>
                <div class="item_min" v-if="index!==editNum">
                    <div class="item_name">
                        <BtnEdit v-if="page==='resume'" v-on:edit-item="editItem(item,index)"></BtnEdit>
                        <span>{{item.projectName}}</span>&#12288;&#12288;&#12288;
                        <span class="time">{{item.begin}}~{{item.end?item.end:'至今'}}</span>
                    </div>
                    <div class="item_content">
                        <pre>{{item.proDescribe}}</pre>
                        <pre class="ellipsis_2">{{item.dutyDescribe}}</pre>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Mixins } from "vue-property-decorator";
import { LimitDate, ItemMixin } from "../mixins/resume";
import _ from "lodash";
import BtnEdit from "../../components/button/btn_edit.vue";
import FormBtn from "../../components/button/btn_formBtn.vue";
import TextArea from "../../components/resume/textarea.vue";
import ItemEmpty from "./item-empty.vue";
import ItemHeader from "./item-header.vue";

import {
    getProjectInfo as getInfo,
    modifyProjectInfo,
    createProjectInfo,
    deleteProjectInfo
} from "../../api/resume";

@Component({
    name: "ItemProject",
    components: {
        ItemEmpty,
        BtnEdit,
        FormBtn,
        TextArea,
        ItemHeader
    }
})
export default class ItemProject extends Mixins(LimitDate, ItemMixin) {
    public emptyData: projectInfo = {
        id: 0,
        projectName: "",
        begin: "",
        end: "",
        proDescribe: "",
        dutyDescribe: ""
    };
    public info: projectInfo[] = [_.cloneDeep(this.emptyData)];
    public form: projectForm = {
        form: _.cloneDeep(this.emptyData),
        rules: {
            projectName: { required: true, message: "必填" },
            begin: { required: true, message: "开始日期必填" },
            proDescribe: [
                { required: true, message: "必填" },
                { min: 10, message: "不得少于10字" },
                { max: 1500, message: "不得超过1500字" }
            ],
            dutyDescribe: [
                { required: true, message: "必填" },
                { min: 10, message: "不得少于10字" },
                { max: 500, message: "不得超过500字" }
            ]
        }
    };
    public async getInfo(resId: number) {
        let res: any = await getInfo(resId);
        if (res.code === 200) {
            this.info = res.data.projectInfo || [];
        }
    }
    public saveItem(): void {
        //@ts-ignore
        this.$refs.form[0].validate(async (valid: boolean) => {
            if (valid) {
                let res: any = {};
                if (this.isCreateItem) {
                    res = await createProjectInfo(
                        this.form.form,
                        this.$store.state.resumeId
                    );
                } else {
                    res = await modifyProjectInfo(
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
        let promise = deleteProjectInfo(this.$store.state.resumeId, eduId);
        this.del(promise);
    }
}
</script>
