<template>
    <div>
        <el-select v-if="maxs===3" v-model="optionsIdList" :popper-append-to-body="true" @visible-change="showBox" @change="change" :placeholder="placeholder" ref="select" multiple>
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
        </el-select>
        <div v-else-if="maxs===1&&type==='job'">
            <i @click="showBox" class="el-icon-arrow-down"></i>
        </div>
        <el-dialog ref="modal" @close="close" :title="title+` (最多选择${maxs}个)`" class="select-container" :visible.sync="visible" width="850px" :close-on-click-modal="false" :modal-append-to-body="true">
            <div v-if="type === 'job'" class="el-dialog__title" slot="title">
                {{ title+` (最多选择${maxs}个)`}}
                <el-input class="keyWord" v-model="keyWord" clearable placeholder="请输入关键字"></el-input>
            </div>
            <div class="selected-box">
                <div class="text-label">
                    <template>
                        已选择职位类别：
                    </template>
                </div>
                <div class="selected-content">
                    <el-tag v-for="(tag,index) in selectedItemList" :key='index' :closable='true' :disable-transitions='true' type="info" @close='delValueByIndex(tag)'>
                        {{tag.name}}
                    </el-tag>
                </div>
            </div>
            <div class="detail-box" v-if="!keyWord">
                <div class="left-side">
                    <ul>
                        <li :data-code="item.id" :class="{selected:activeItem.indexOf(item.id)!=-1,active:leftIndex==index,hasChild:item.hasChild===1}" @click="showMidSide(item,index)" v-for="(item,index) in jobTypeList" :key="index">{{item.name}}</li>
                    </ul>
                </div>
                <div class="mid-side" v-if="midItemList.length>0">
                    <ul>
                        <template v-for="(item,index) in midItemList">
                            <li v-if="item.hasChild===1" class="hasChild" :class="{selected:activeItem.indexOf(item.id)!=-1,active:midIndex==index}" @click="showRightSide(item,index)" :key="index">
                                <span>{{item.name}}</span>
                            </li>
                            <li :data-code="item.id" v-else :key="index" @click="handleItem(item)" :class="{selected:selectedIdList.indexOf(item.id)!=-1}">
                                <span>{{item.name}}</span>
                            </li>
                        </template>
                    </ul>
                </div>
                <div class="right-side" v-if="rightItemList.length>0">
                    <ul>
                        <li @click="handleItem(item)" :class="{selected: selectedIdList.indexOf(item.id)!=-1}" v-for="(item,index) in rightItemList" :key="index">
                            <span>{{item.name}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="search-box" v-else>
                <template v-if="sreachList.length>0">
                    <p>搜索结果：</p>
                    <ul id="sear-list" v-if="sreachList.length>0">
                        <li @click="handleItem(item)" :class="{selected: selectedIdList.indexOf(item.id)!=-1}" v-for="(item,index) of sreachList" :key="index">{{item.name}}</li>
                    </ul>
                </template>
                <div class="no-data" v-else>
                    <i class="icon-empty_02"></i>
                    <p>暂无筛选结果</p>
                </div>
            </div>
            <!--<div class="select-footer">
                <el-button @click="cancel()" round size="small">取消</el-button>
                <el-button @click="confirm()" type="primary" round size="small">确定</el-button>
            </div>-->
            <div class="button_box text-center ">
                <button class="custom_btn selected" type="button" @click="confirm()">确定</button>
            </div>
        </el-dialog>
    </div>
</template>

<script lang='ts'>
import _ from "lodash";
import { getJobTypeList } from "../../api/dictionary";
import { getAreaType, getSiteByIds, getJsonByIds } from "../../common/common";
import { Component, Vue, Prop, Model, Watch } from "vue-property-decorator";

@Component({
    name: "JobSelector",
    components: {}
})
export default class JobSelector extends Vue {
    // @ts-ignore -- 留着以后区分area和job
    @Prop({
        type: String,
        default: "job"
    })
    public type;
    // @ts-ignore
    @Prop({
        type: String,
        default: "请选择期望地区"
    })
    public placeholder;
    // @ts-ignore --从父组件获取值
    @Prop({
        type: Array,
        default: []
    })
    public value;
    @Prop({
        type: Number,
        default: 3
    })
    // @ts-ignore
    public maxs: number;

    public selectedIdList: number[] = _.cloneDeep(this.value); // 选中的id集合
    public selectedItemList: JobType[] = []; // 选中的item集合
    public jobTypeList: JobType[] = []; // 一级列表 --职位字典
    public midItemList: JobType[] = []; // 二级列表
    public rightItemList: JobType[] = []; //三级列表
    public sreachList: JobType[] = []; // 搜索结果列表
    public activeItem: number[] = []; // 需要高亮(id)的项目
    public leftIndex: number = -1; // 展开项
    public midIndex: number = -1; // 展开项
    public title = this.type === "job" ? "请选择职位" : "请选择地区";
    public visible: boolean = false;
    public keyWord: string = "";
    public options: any[] = [];
    public optionsIdList: number[] = this.value; //
    public isClickConfirm: boolean = false; // 是否点击[确定按钮]关闭弹窗

    async created() {
        this.jobTypeList = await getJobTypeList;
        this.setOptions();
        if (!Array.isArray(this.value)) {
            this.value = [];
        }
    }

    @Watch("visible")
    async watchVisible(val: boolean) {
        if (val) {
            // 对ID去重选择
            this.selectedIdList = _.cloneDeep(
                Array.from(new Set(this.optionsIdList))
            );
            this.selectedItemList = await getJsonByIds(
                this.selectedIdList,
                this.jobTypeList
            );
            this.watchselectedIdList();
        }
    }

    // 显示二级列表
    public showMidSide(leftItem: JobType, index: number) {
        this.leftIndex = index;
        this.midIndex = -1;
        this.rightItemList = [];
        this.midItemList = _.cloneDeep(leftItem.child);
        this.showRightSide(this.midItemList[0], 0);
    }
    // 显示三级列表
    public showRightSide(midItem: JobType, index: number) {
        this.midIndex = index;
        this.rightItemList = _.cloneDeep(midItem.child);
        let id = Number(midItem.id.toString().slice(0, 2) + "000000");
        this.leftIndex = this.jobTypeList.findIndex((item: JobType) => {
            return item.id === id;
        });
    }
    // 选择/去选
    public handleItem(item: JobType) {
        let i = this.selectedIdList.indexOf(item.id);
        let i2 = this.selectedItemList.findIndex((item2: JobType) => {
            return item2.id == item.id;
        });

        if (this.maxs !== 1) {
            if (i != -1) {
                this.selectedIdList.splice(i, 1);
                this.selectedItemList.splice(i2, 1);
            } else if (this.selectedIdList.length < this.maxs) {
                this.selectedIdList.push(item.id);
                this.selectedItemList.push(item);
            } else {
                this.$message({
                    message: `最多只能选择${this.maxs}项`,
                    type: "error"
                });
            }
        } else {
            this.selectedIdList = [item.id];
            this.selectedItemList = [item];
        }
    }
    // idList-> itemList
    public async setOptions() {
        if (this.type === "job") {
            this.options = getJsonByIds<JobType>(
                this.optionsIdList.concat(),
                this.jobTypeList
            );
        } else if (this.type === "area") {
            this.options = await getSiteByIds(this.optionsIdList.concat());
        }
    }
    public showBox() {
        this.visible = true;
        if (this.maxs === 1) {
            this.selectedIdList = [];
        }
        if (this.$refs.select) {
            // @ts-ignore
            this.$refs.select.blur();
        }
    }
    public close() {
        if (!this.isClickConfirm) {
            this.cancel();
        } else {
            this.isClickConfirm = false;
        }
        this.leftIndex = -1;
        this.midIndex = -1;
    }
    // 确定 选择
    public confirm() {
        this.options = _.cloneDeep(this.selectedItemList);
        this.optionsIdList = _.cloneDeep(this.selectedIdList);
        this.isClickConfirm = true;
        this.visible = false;
        this.change();
    }
    // 取消 选择
    public cancel() {
        this.visible = false;
    }

    public change() {
        // 将值返回给父组件
        if (this.maxs === 1) {
            let customPos: string = "";
            if (this.selectedItemList.length > 0) {
                customPos = this.selectedItemList[0].name;
            }
            this.$emit("change", {
                jobName: customPos,
                value: this.optionsIdList
            });
        } else {
            this.$emit("change", this.optionsIdList);
        }
    }
    public delValueByIndex(tag: JobType) {
        this.selectedIdList.splice(this.selectedIdList.indexOf(tag.id), 1);
        this.selectedItemList.splice(this.selectedItemList.indexOf(tag), 1);
    }
    @Watch("selectedIdList")
    watchselectedIdList() {
        let arr: number[] = [];
        for (let id of this.selectedIdList) {
            let id1 = Number(id.toString().slice(0, 2) + "000000");
            let id2 = Number(id.toString().slice(0, 4) + "0000");
            arr.push(id1, id2);
        }

        // this.activeItem = arr;
        this.activeItem = Array.from(new Set(arr));
        // 清除高亮效果
        if (this.selectedIdList.length === 0) {
            this.leftIndex = -1;
            this.midIndex = -1;
        }
    }
    @Watch("keyWord")
    watchkeyWord() {
        // sreachList
        let temp: JobType[] = [];
        if (!this.keyWord) {
            this.sreachList = [];
            return;
        }
        for (const leftItem of _.cloneDeep(this.jobTypeList)) {
            if (leftItem.hasChild === 0) {
                break;
            }
            for (const midItem of leftItem.child) {
                var reg = new RegExp(this.keyWord, "i");
                if (midItem.hasChild === 1) {
                    for (const rightItem of midItem.child) {
                        if (reg.test(rightItem.name)) {
                            temp.push(rightItem);
                        }
                    }
                } else {
                    if (reg.test(midItem.name)) {
                        temp.push(midItem);
                    }
                }
            }
        }
        this.sreachList = temp;
    }
}
</script>
<style lang="scss" scoped>
@import "../../style/job-selector.scss";
</style>
