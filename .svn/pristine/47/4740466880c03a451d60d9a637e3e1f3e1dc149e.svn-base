<template>
    <div class="resume_item" id="certificate">
        <ItemHeader v-on:add-item="createItem" :page="page" :showBtnEdit="info.length>0 && info[0].id" :type="'certificate'" :isEdit="editNum!=-1"></ItemHeader>
        <div class="content">
            <div v-for="(item,index) in info" :key="index" class="info" :class="{isEdit:page==='resume'&&editNum==index}">
                <el-form v-if="page==='resume'&&editNum==index" class="item_edit accessory_edit" :model="form.form" :rules="form.rules" ref="form" label-position="right" label-width="98px">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item prop="certificateName" label="证书名称">
                                <el-autocomplete class="inline-input" :fetch-suggestions="queryCertificate" v-model="form.form.certificateName" :maxlength="25" :trigger-on-focus="false" placeholder="请输入证书名称" style="width:100%"></el-autocomplete>
                            </el-form-item>
                        </el-col>
                        <el-col class="upload" :span="12">
                            <div class="btn_upload" @click="visible=true">
                                上传证书
                                <!-- <input @change="uploadFile" type="file" name="file" accept="image/gif, image/jpeg, image/jpg, image/png"> -->
                            </div>
                            <div class="upload_list">
                                <template v-if="form.form.certificateFileName">
                                    {{form.form.certificateFileName}}
                                    <i @click="uploadRemove" class="el-icon-close" title="删除"></i>
                                </template>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item prop="acquireDate" label="取得时间">
                                <label>
                                    <el-date-picker v-model="form.form.acquireDate" :picker-options="optionsBegin" format="yyyy-MM" value-format="yyyy-MM" type="month" placeholder="请选择获得时间" :clear-icon="false" style="width: 100%;" prefix-icon="none"></el-date-picker>
                                    <i class="icon-date"></i>
                                </label>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="补充说明">
                                <el-input v-model="form.form.grade" :maxlength="15" placeholder="成绩等级/颁发机构"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <FormBtn @save="saveItem" @cancel="cancelEdit2" :length="2" :isCreateItem="isCreateItem" @deleteItem="deleteItem(form.form.id)"></FormBtn>
                </el-form>
                <div v-if="page==='resume'&&index!==editNum" class="border_ele"></div>
                <div class="item_min" v-if="index!==editNum">
                    <div class="item_name">
                        <BtnEdit v-if="page==='resume'" v-on:edit-item="editItem(item,index)"></BtnEdit>
                        <span>{{item.certificateName}}</span>&#12288;
                        <a v-if="item.uploadImageUrl" class="color_orange" :href="item.uploadImageUrl" target="_blank">查看附件</a>
                    </div>
                    <div class="item_msg">
                        <div>
                            <span>{{item.grade}}</span>
                            <span class="fr">{{item.acquireDateStr}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog class="upload_box" title="上传证书" width="365px" :visible.sync="visible" :close-on-click-modal="false" :close-on-press-escape="false">
            <div class="btn_upload">
                选择证书文件
                <input ref="uploadFile" @change="uploadFile" type="file" name="file" accept="image/gif, image/jpeg, image/jpg, image/png">
            </div>
            <p>支持jpg、gif、png格式图片，需小于1M</p>
        </el-dialog>
    </div>
</template>

<script lang='ts'>
import { Component, Watch, Prop, Mixins } from "vue-property-decorator";
import { ItemMixin } from "../mixins/resume";
import _ from "lodash";
import BtnEdit from "../../components/button/btn_edit.vue";
import FormBtn from "../../components/button/btn_formBtn.vue";
import ItemHeader from "./item-header.vue";
import { formatTime } from "../../common//common";
import { fuzzyMatchCertificate } from "../../api/lenovo";

import {
    getCertificate as getInfo,
    modifyCertificate,
    createCertificate,
    deleteCertificate,
    uploadFile
} from "../../api/resume";

@Component({
    name: "ItemCertificate",
    components: {
        FormBtn,
        BtnEdit,
        ItemHeader
    }
})
export default class ItemCertificate extends Mixins(ItemMixin) {
    @Prop()
    // @ts-ignore
    public isAddModule: boolean; //用于判断是否点击了添加模块

    public optionsBegin = {
        disabledDate: (time: Date) => {
            return time > new Date();
        }
    };
    public emptyData: certificateInfo = {
        id: 0,
        certificateFileName: "",
        certificateName: "",
        grade: "",
        certificatePath: "",
        acquireDate: ""
    };
    public info: certificateInfo[] = [];
    public form: certificateForm = {
        form: _.cloneDeep(this.emptyData),
        rules: {
            certificateName: { required: true, message: "必填" },
            acquireDate: { required: true, message: "必填" }
        }
    };
    public visible: boolean = false;

    created() {
        if (this.isAddModule) {
            this.createItem();
        }
    }
    public async getInfo(resId: number) {
        let res: any = await getInfo(resId);
        if (res.code === 200) {
            this.info = res.data.certificateInfo || [];
            this.formatObj();
        }
    }
    //   @Watch('info')
    //   formatInfo() {
    //     this.formatObj()
    //   }

    public saveItem() {
        //@ts-ignore
        this.$refs.form[0].validate(async (valid: boolean) => {
            if (valid) {
                let res: any = {};
                let data: any = {
                    id: this.form.form.id,
                    certificateFileName: this.form.form.certificateFileName,
                    certificateName: this.form.form.certificateName,
                    grade: this.form.form.grade,
                    certificatePath: this.form.form.certificatePath,
                    acquireDate: this.form.form.acquireDate
                };
                if (this.isCreateItem) {
                    res = await createCertificate(
                        data,
                        this.$store.state.resumeId
                    );
                } else {
                    res = await modifyCertificate(
                        data,
                        this.$store.state.resumeId
                    );
                }
                this.save(res);
            }
        });
    }
    // 取消编辑
    public cancelEdit2(): void {
        // 如果是点击了底部的【添加模块】
        // if (this.isAddModule) {
        //   this.isAddModule = false
        //   this.$emit('update:isAddModule', this.isAddModule)
        // }
        this.cancelEdit();
    }
    // 删除 item
    public async deleteItem(eduId: number) {
        let promise = deleteCertificate(this.$store.state.resumeId, eduId);
        this.del(promise, true);
    }
    // 上传附件
    public async uploadFile(e: any) {
        let file: any = e.target.files[0];
        let size = file.size;
        if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/i.test(file.name)) {
            this.$alert("支持jpg、gif、png格式图片，需小于1M", "提示", {
                confirmButtonText: "确定",
                type: "error"
            });
            // @ts-ignore
            this.$refs['uploadFile'].value = "";
            return false;
        } else if (size > 1024 * 1024) {
            this.$alert("图片不能超过1M", "提示", {
                confirmButtonText: "确定",
                type: "error"
            });
            // @ts-ignore
            this.$refs['uploadFile'].value = "";
            return false;
        }
        let param = new FormData();
        param.append("file", file);
        let res: any = await uploadFile("per_certification", param);

        if (res.code === 200) {
            this.form.form.certificatePath = res.data.path;
            this.form.form.certificateFileName = res.data.filename;
            this.visible = false;
        } else {
            this.$message.error(res.msg);
        }
    }
    // 移除
    public uploadRemove() {
        this.form.form.certificateFileName = "";
        this.form.form.certificatePath = "";
    }
    public formatObj() {
        this.info.forEach(item => {
            // @ts-ignore
            item.acquireDate = formatTime(item.acquireDate, 4);
        });
    }
    // 搜索联想
    public async queryCertificate(qs: string, cb: Function) {
        let arr: object[] = [];

        if (qs) {
            let res: any = await fuzzyMatchCertificate(qs);
            if (
                res.data &&
                res.data.certificateList &&
                res.data.certificateList.length > 0
            ) {
                res.data.certificateList.forEach((item: string) => {
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
