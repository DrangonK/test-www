<template>
    <div class="resume_item" id="accessory">
        <ItemHeader v-on:add-item="createItem" :page="page" :showBtnEdit="info.length>0 && info[0].id"
                    :type="'accessory'" :isEdit="editNum!=-1"></ItemHeader>
        <div class="content">
            <div v-for="(item,index) in info" :key="index" class="info"
                 :class="{isEdit:page==='resume'&&editNum==index}">
                <el-form v-if="page==='resume'&&editNum==index" :model="form.form" class="item_edit accessory_edit"
                         :rules="form.rules" ref="form" label-position="right" label-width="98px">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item prop="uploadName" label="附件名称">
                                <el-input v-model="form.form.uploadName" :maxlength="20"
                                          placeholder="请输入附件名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col class="upload" :span="12">
                            <div class="btn_upload" @click="visible=true">
                                上传附件
                                <!-- <input @change="uploadFile" type="file" name="file" accept="image/gif, image/jpeg, image/jpg, image/png"> -->
                            </div>
                            <div class="upload_list">
                                <el-form-item prop="fileName" class="hidden">
                                    <input v-model="form.form.fileName" type="hidden">
                                </el-form-item>
                                <template v-if="form.form.fileName">
                                    {{form.form.fileName}}
                                    <i @click="uploadRemove" class="el-icon-close" title="删除"></i>
                                </template>
                                <template v-else-if="!isFirstTime">
                                    <div class="err_msg">
                                        <span>您忘了添加附件</span>
                                    </div>
                                </template>
                            </div>
                        </el-col>
                    </el-row>
                    <el-form-item label="附件描述">
                        <TextArea :value.sync="form.form.description" :totalCount="200" :rows="6"
                                  :placeholder="'请输入附件描述'"></TextArea>
                    </el-form-item>
                    <el-form-item label="链接地址" prop="opusPath">
                        <el-input v-model="form.form.opusPath" :maxlength="200"
                                  placeholder="请输入作品链接地址以http://开头"></el-input>
                    </el-form-item>
                    <FormBtn @save="saveItem" @cancel="cancelEdit2" :length="2" :isCreateItem="isCreateItem"
                             @deleteItem="deleteItem(form.form.id)"></FormBtn>
                </el-form>
                <div v-if="page==='resume'&&index!=editNum" class="border_ele"></div>
                <div class="item_min" v-if="index!=editNum">
                    <div class="item_name">
                        <BtnEdit v-if="page==='resume'" v-on:edit-item="editItem(item,index)"></BtnEdit>
                        <span>{{item.uploadName}}</span>&#12288;
                        <a class="color_orange" :href="item.uploadImageUrl" target="_blank">查看附件</a>
                    </div>
                    <div class="item_content" v-if="item.description">
                        <pre>{{item.description}}</pre>
                    </div>
                    <p class="link_text" v-if="item.opusPath">{{item.opusPath}}</p>
                </div>
            </div>
        </div>
        <el-dialog class="upload_box" title="上传附件" width="365px" :visible.sync="visible" :close-on-click-modal="false"
                   :close-on-press-escape="false">
            <div class="btn_upload">
                选择作品文件
                <input ref="uploadFile" @change="uploadFile" type="file" name="file"
                       accept="image/gif, image/jpeg, image/jpg, image/png">
            </div>
            <p>支持jpg、gif、png格式图片，需小于1M</p>
        </el-dialog>
    </div>
</template>

<script lang='ts'>
    import {Component, Prop, Mixins} from "vue-property-decorator";
    import {ItemMixin} from "../mixins/resume";
    import _ from "lodash";
    import BtnEdit from "../../components/button/btn_edit.vue";
    import FormBtn from "../../components/button/btn_formBtn.vue";
    import TextArea from "../../components/resume/textarea.vue";
    import ItemHeader from "./item-header.vue";

    import {
        getAccessory as getInfo,
        modifyAccessory,
        createAccessory,
        deleteAccessory,
        uploadFile
    } from "../../api/resume";

    @Component({
        name: "ItemAccessory",
        components: {
            BtnEdit,
            FormBtn,
            TextArea,
            ItemHeader
        }
    })
    export default class ItemAccessory extends Mixins(ItemMixin) {
        @Prop()
        // @ts-ignore
        public isAddModule: boolean; //用于判断是否点击了添加模块

        public emptyData: accessory = {
            id: null,
            uploadName: "",
            opusPath: "",
            description: "",
            uploadPath: "",
            fileName: ""
        };
        public info: accessory[] = [];
        public form: accessoryForm = {
            form: _.cloneDeep(this.emptyData),
            rules: {
                uploadName: {required: true, message: "必填"},
                fileName: {required: true, message: "必填"},
                opusPath: {type: "url", message: "请输入合法的网站"}
            }
        };
        public isFirstTime: boolean = true; //记录刚打开form 表单
        public visible: boolean = false;

        created() {
            if (this.isAddModule) {
                this.createItem();
            }
        }

        public async getInfo(resId: number) {
            let res: any = await getInfo(resId);
            if (res.code === 200) {
                this.info = res.data.accessoryInfo || [];
            }
        }

        public saveItem() {
            //@ts-ignore
            this.$refs.form[0].validate(async (valid: boolean) => {
                if (valid) {
                    let res: any = {};
                    let data: any = {
                        id: this.form.form.id,
                        uploadName: this.form.form.uploadName,
                        opusPath: this.form.form.opusPath,
                        description: this.form.form.description,
                        uploadPath: this.form.form.uploadPath,
                        fileName: this.form.form.fileName
                    };
                    if (this.isCreateItem) {
                        res = await createAccessory(
                            data,
                            this.$store.state.resumeId
                        );
                    } else {
                        res = await modifyAccessory(
                            data,
                            this.$store.state.resumeId
                        );
                    }
                    this.save(res);
                }
            });
            this.isFirstTime = false;
        }

        // 取消编辑
        public cancelEdit2() {
            // 如果是点击了底部的【添加模块】
            // if (this.isAddModule) {
            //   this.isAddModule = false
            //   this.$emit('update:isAddModule', this.isAddModule)
            // }
            this.cancelEdit();
            this.isFirstTime = true;
        }

        // 删除 item
        public async deleteItem(eduId: number) {
            let promise = deleteAccessory(this.$store.state.resumeId, eduId);
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
            let res: any = await uploadFile("per_attachment", param);

            if (res.code === 200) {
                this.form.form.uploadPath = res.data.path;
                this.form.form.fileName = res.data.filename;
                this.visible = false;
            } else {
                this.$message.error(res.msg);
            }
            // @ts-ignore
            this.$refs.form[0].validateField("fileName");
        }

        // 移除
        public uploadRemove() {
            this.form.form.fileName = "";
            this.form.form.uploadPath = "";
            this.isFirstTime = false;
        }
    }
</script>
