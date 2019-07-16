<template>
    <div>
        <el-select v-model="optionsIdList" :popper-append-to-body="true" @visible-change="showBox" @change="change" :placeholder="placeholder" ref="select" multiple>
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
        </el-select>
        <el-dialog ref="modal" :title="title+` (最多选择${maxs}个)`" class="selectBox" :visible.sync="visible" width="770px" :close-on-click-modal="false" :modal-append-to-body="true" @mousedown="mousedown($event)">
            <div id="js_selectedBox" class="selectedCont clear-both">
                <div class="tip">
                    已选地区
                </div>
                <div class="selectedA">
                    <el-tag v-for="(tag,index) in selectedItemList" :key='index' :closable='true' :disable-transitions='true' type="info" @close='delValueByIndex(tag)'>
                        {{tag.name}}
                    </el-tag>
                </div>
                <div class="btnArea">
                    <el-button :plain='true' round size="small" @click="clear">清除</el-button>
                </div>
            </div>
            <div class="clear-both"></div>
            <el-checkbox-group v-model="select" class="check-area-list" :max="maxs" @change="watchSelect">
                <p class="tit">热门地区</p>
                <el-row class="hot-city">
                    <div v-for="(item, i) in hotCity" :key="i" class="col col-3" @mouseleave="leaveHotCity($event, i)">
                        <div class="hasSub" :class="{'on':hotCityShow[i],selectChild:selectJudge1(item.id)}">
                            <template v-if="isEmpty(item.child)">
                                <el-checkbox :ref="`hotCity${item.id}`" :label="item.id" class="noText" :value="item"></el-checkbox>
                                <label class="text" :class="{cblue:selectJudge1(item.id)}" @click="showSubHotCity($event, i)">{{item.name}}</label>
                                <i class="el-icon-caret-bottom" @click="showSubHotCity($event, i)"></i>
                            </template>
                            <template v-else>
                                <el-checkbox :ref="`hotCity${item.id}`" :label='item.id' :value="item">{{item.name}}</el-checkbox>
                            </template>
                        </div>
                        <div class="subPost">
                            <el-row v-if="isEmpty(item.child) && hotCityShow[i]">
                                <el-col :span='4' v-for="(val) in item.child" :key="val.id">
                                    <el-checkbox :ref="`hotCity${val.id}`" :label='val.id' :value="val">{{val.name}}</el-checkbox>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </el-row>
                <p class="tit tit1">省/市/直辖市：</p>
                <div class="area-list" v-for="letter of letterList" :key="letter">
                    <div class="letter">{{letter}}</div>
                    <el-row :gutter='10'>
                        <div v-for="(item, i) in siteList" :key="i" v-if="filterLetter(item,letter)" class="col col-3" @mouseleave="leaveSiteList($event, i)">
                            <div class="hasSub" :class="{'on':siteListShow[i]}">
                                <template v-if="isEmpty(item.child)">
                                    <el-checkbox :ref="`siteCity${item.id}`" :label='item.id' class="noText" :value="item"></el-checkbox>
                                    <label class="text" :class="{cblue:selectJudge(item.id)}" @click="showSubSiteList($event, i)">{{item.name}}</label>
                                    <i class="el-icon-caret-bottom" @click="showSubSiteList($event, i)"></i>
                                </template>
                                <template v-else>
                                    <el-checkbox :ref="`siteCity${item.id}`" :label='item.id' :value="item">{{item.name}}</el-checkbox>
                                </template>
                            </div>
                            <div class="subPost">
                                <el-row v-if="isEmpty(item.child) && siteListShow[i]">
                                    <div class="col col-3 secondChild" v-for="(val,j) in item.child" :key="val.id" @mouseleave="leaveCol">
                                        <div class="hasSub">
                                            <template v-if="val.child">
                                                <el-checkbox :ref="`siteCity${val.id}`" :label='val.id' class="noText" :value="val"></el-checkbox>
                                                <label class="text" :class="{cblue:selectJudge1(val.id)}" @click="showSub($event, j)">{{val.name}}</label>
                                                <i class="el-icon-caret-bottom" @click="showSub($event, j)"></i>
                                            </template>
                                            <template v-else>
                                                <el-checkbox :ref="`siteCity${val.id}`" :label='val.id' :value="val">{{val.name}}</el-checkbox>
                                            </template>
                                        </div>
                                        <div class="subPost" v-if="val.child">
                                            <el-row>
                                                <el-col :span='4' v-for="(v) in val.child" :key="v.id">
                                                    <el-checkbox :ref="`siteCity${v.id}`" :label='v.id' :value="v">{{v.name}}</el-checkbox>
                                                </el-col>
                                            </el-row>
                                        </div>

                                    </div>
                                </el-row>
                            </div>
                        </div>
                    </el-row>
                </div>
            </el-checkbox-group>
            <div class="button_box">
                <button class="custom_btn selected" type="button" @click="confirm()">确定</button>
            </div>
        </el-dialog>
    </div>
</template>
<script lang="ts">
import _ from "lodash";
import { getHotCity, getSiteList } from "../../api/dictionary";
import { getAreaType, getSiteByIds } from "../../common/common";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({
    name: "BoxSelector"
})
export default class BoxSelector extends Vue {
    @Prop({
        type: Array,
        default: []
    })
    // @ts-ignore
    public value;
    @Prop({
        type: Number,
        default: 3
    })
    // @ts-ignore
    public maxs: number;
    public visible: boolean = false;
    public placeholder: string = "请选择期望地区";
    public title: string = "请选择地区";
    public options: any[] = [];
    public optionsIdList: number[] = this.value; //
    public select: number[] = _.cloneDeep(this.value); // 选中的id集合
    public selectedItemList: Site[] = []; // 选中的item集合

    public hotCity: Site[] = []; // 地区字典
    public siteList: Site[] = [];
    public letterList: string[] = [
        "A.B.C.F",
        "G",
        "H",
        "J.L.N.Q",
        "S",
        "T.X.Y.Z"
    ];
    public hotCityShow: boolean[] = [];
    public siteListShow: boolean[] = [];

    async created() {
        this.setOptions();
        if (!Array.isArray(this.value)) {
            this.value = [];
        }
    }
    public async mounted() {
        const getHotCity = this.getHotCity();
        const getSiteList = this.getSiteList();
        await getHotCity;
        await getSiteList;
    }
    @Watch("visible")
    async watchVisible(val: boolean) {
        if (val) {
            // 对ID去重选择
            this.select = _.cloneDeep(Array.from(new Set(this.optionsIdList)));
            this.selectedItemList = await getSiteByIds(
                this.optionsIdList.concat()
            );
        }
    }

    // 获取热门城市
    public async getHotCity() {
        this.hotCity = await getHotCity;
        this.hotCityShow = new Array(this.hotCity.length).fill(false);
    }
    // 获取城市
    public async getSiteList() {
        this.siteList = await getSiteList;
        this.siteListShow = new Array(this.siteList.length).fill(false);
    }
    // 鼠标离开隐藏热门城市二级目录
    public leaveHotCity(e, i) {
        this.hotCityShow.splice(i, 1, false);
    }
    // 显示热门城市二级目录
    public showSubHotCity(e, i) {
        this.hotCityShow.splice(i, 1, true);
        let subPost = e.target.parentElement.nextElementSibling;
        subPost.style.top =
            e.target.parentElement.offsetHeight +
            e.target.parentElement.offsetTop -
            1 +
            "px";
    }
    // 鼠标离开隐藏城市二级目录
    public leaveSiteList(e, i) {
        this.siteListShow.splice(i, 1, false);
    }
    // 显示城市二级目录
    public showSubSiteList(e, i) {
        this.siteListShow.splice(i, 1, true);
        this.subPosition(e);
        let subPost = e.target.parentElement.nextElementSibling;
        // subPost.style.top = e.target.parentElement.offsetHeight + e.target.parentElement.offsetTop - 1 + 'px';
    }
    // 鼠标离开隐藏城市三级目录
    public leaveCol(e) {
        this.removeSubClass(e);
        e.target.firstChild.className = "hasSub";
    }
    // 显示城市三级目录
    public showSub(e, i) {
        let subPost = e.target.parentElement.nextElementSibling;
        subPost.style.top =
            e.target.parentElement.offsetHeight +
            e.target.parentElement.offsetTop -
            1 +
            "px";
        e.target.parentElement.className = "hasSub on";
        this.addSubClass(e);
    }
    public addSubClass(e: MouseEvent) {
        const target: HTMLElement = <HTMLElement>e.target;
        let subPost: HTMLElement = target.parentElement;
        while (subPost && subPost.className.indexOf("subPost") === -1) {
            subPost = subPost.parentElement;
        }
        subPost.classList.add("showSub");
    }
    public removeSubClass(e: MouseEvent) {
        const target: HTMLElement = <HTMLElement>e.target;
        let subPost: HTMLElement = target.parentElement;
        while (subPost && subPost.className.indexOf("subPost") === -1) {
            subPost = subPost.parentElement;
        }
        subPost.className = "subPost";
    }
    public subPosition(e: MouseEvent) {
        this.$nextTick(() => {
            document.getElementById;
            const target: HTMLElement = <HTMLElement>e.target;
            const parent: HTMLElement = <HTMLElement>target.parentElement;
            const sub: HTMLElement = <HTMLElement>parent.nextElementSibling;
            const box: HTMLElement = <HTMLElement>sub.firstChild;
            let content: HTMLElement = null;
            let areaList: HTMLElement = null;
            let path: HTMLElement = target.parentElement;
            while (path) {
                if (path.className.indexOf("content") !== -1) {
                    content = path;
                }
                if (path.className.indexOf("area-list") !== -1) {
                    areaList = path;
                }
                path = path.parentElement;
            }
            if (
                content.offsetHeight <
                box.offsetHeight + areaList.offsetTop + parent.offsetHeight + 80
            ) {
                sub.style.top = parent.offsetTop - box.offsetHeight + 1 + "px";
                parent.classList.add("bot");
            } else {
                sub.style.top =
                    parent.offsetHeight + parent.offsetTop - 1 + "px";
            }
        });
    }
    // 地区按字母分类
    public filterLetter(data, letter) {
        let reg = new RegExp(`^[${letter.replace(".", "")}]`);
        return reg.test(data.f);
    }
    // 判断是否空数组
    public isEmpty(arr) {
        if (Array.isArray(arr)) {
            return arr.length > 0 ? true : false;
        }
        return false;
    }
    // 选择二级目录一级目录显示颜色
    public selectJudge(id) {
        let reg = new RegExp(`^(${id.toString().replace(/\d{6}$/, "")})`);
        for (let select of this.select) {
            if (select && reg.test(select.toString())) {
                return true;
            }
        }
        return false;
    }
    // 选择三级目录二级目录显示颜色
    public selectJudge1(id) {
        let reg = new RegExp(`^(${id.toString().replace(/\d{4}$/, "")})`);
        for (let select of this.select) {
            if (select && reg.test(select.toString())) {
                return true;
            }
        }
        return false;
    }
    // 监听多选框的变化
    // @Watch("select")
    public async watchSelect(val: number[]) {
        let select: number[] = val.slice();
        let last = select.pop();
        if (select.length > 0) {
            // 父项（一级）
            if (getAreaType(last) === 1) {
                // 判断子项是否被选，有则删除
                const n =
                    parseInt(last.toString().substr(2, 2), 10) > 0 ? 4 : 2;
                select = select.filter((sel, i) => {
                    if (
                        sel.toString().substr(0, n) ===
                        last.toString().substr(0, n)
                    ) {
                        return false;
                    }
                    return true;
                });
            } else if (getAreaType(last) === 2) {
                // 子项：（二级）
                // 判断父项或者子项是否被选，有则删除
                select = select.filter((sel, i) => {
                    const id = last.toString();
                    if (
                        parseInt(
                            id.toString().substr(0, 2) +
                                (id.length == 4 ? "00" : "000000"),
                            10
                        ) === sel ||
                        parseInt(sel.toString().substr(0, 4) + "0000", 10) ===
                            last
                    ) {
                        return false;
                    }
                    return true;
                });
            } else if (getAreaType(last) === 3) {
                // 子项：（三级）
                // 判断父项是否被选，有则删除
                select = select.filter((sel, i) => {
                    const id = last.toString();
                    if (
                        parseInt(
                            id.toString().substr(0, 2) +
                                (id.length == 4 ? "00" : "000000"),
                            10
                        ) === sel ||
                        parseInt(id.toString().substr(0, 4) + "0000", 10) ===
                            sel
                    ) {
                        return false;
                    }
                    return true;
                });
            }
        }
        if (last && select.length < this.maxs) {
            select.push(last);
        }
        this.select = select;
        this.selectedItemList = await getSiteByIds(select.concat());
    }

    // idList-> itemList
    public async setOptions() {
        this.options = await getSiteByIds(this.optionsIdList.concat());
    }
    public showBox() {
        this.visible = true;
        // @ts-ignore
        this.$refs.select.blur();
    }
    // 确定 选择
    public confirm() {
        this.options = _.cloneDeep(this.selectedItemList);
        this.optionsIdList = _.cloneDeep(this.select);
        this.visible = false;
        this.change();
    }
    // 返回数据给父组件
    public change() {
        this.$emit("change", this.optionsIdList);
    }
    public delValueByIndex(tag: Site) {
        this.select.splice(this.select.indexOf(tag.id), 1);
        this.selectedItemList.splice(this.selectedItemList.indexOf(tag), 1);
    }
    public clear() {
        this.select = [];
        this.selectedItemList = [];
    }
}
</script>
<style lang="scss">
@import "../../style/box-selector.scss";
</style>
