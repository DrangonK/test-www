<template>
    <div class="resume_item" id="basic">
        <ItemHeader :showBtnEdit="false" :type="'basic'" :isEdit="form.state.isEdit"></ItemHeader>
        <div class="content">
            <div v-if="form.state.isEdit" class="info">
                <el-form :model="form.form" class="item_edit basic_edit" :rules="form.rules" ref="form" label-position="right" label-width="98px">
                    <el-row style="overflow:hidden">
                        <el-col :span="12">
                            <el-form-item label="姓名" prop="userName">
                                <el-input v-model="form.form.userName" minlength="2" placeholder="请输入姓名"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="性别" prop="gender" class="per_radio_border">
                                <el-radio-group v-model="form.form.gender">
                                    <el-radio class="width-100" :label="1" border>男</el-radio>
                                    <el-radio class="width-100" :label="2" border>女</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="出生日期" prop="birthday">
                                <label>
                                    <el-date-picker type="month" v-model="form.form.birthday" :picker-options="optionsBegin" format="yyyy-MM" value-format="timestamp" placeholder="请选择年月" prefix-icon="none" :clearable="false"></el-date-picker>
                                    <i class="icon-date"></i>
                                </label>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="现居地" prop="location">
                                <el-cascader v-model="form.form.locationId" @change="selectAddr(form.form.locationId,'location')" :options="cityList" :props="props" separator="-" :filterable="true" placeholder="请选择现居地">
                                </el-cascader>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="工作年限" prop="jobyearType">
                                <el-select v-model="form.form.jobyearType" placeholder="请选择工作年限">
                                    <el-option v-for="(item,index) in workyearList" :value="item.id" :label="item.name" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="12">
                            <el-form-item label="求职状态" prop="jobState">
                                <el-select v-model="form.form.jobState" placeholder="请选择求职状态">
                                    <el-option v-for="item in jobState" :label="item.name" :value="item.state" :key="item.state"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col> -->
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="手机号码" prop="mobile">
                                <el-col :span="19">
                                    <el-input v-model="form.form.mobile" disabled=""></el-input>
                                </el-col>
                                <el-col class="center_ele color_blue" :span="5">
                                    <a @click="visible=true">{{form.form.mobileActivation===0?'验证':'修改'}}</a>
                                </el-col>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="常用邮箱" prop="email">
                                <el-autocomplete class="inline-input" :fetch-suggestions="querySearch" v-model="form.form.email" :trigger-on-focus="false" placeholder="请输入邮箱" style="width:100%;"></el-autocomplete>
                                <!-- <el-input v-model="form.form.email" placeholder="请输入邮箱"></el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="目前月薪" prop="nowSalary">
                                <el-select v-model="form.form.nowSalary" placeholder="请选择月薪">
                                    <el-option v-if="item.id>0" v-for="(item,index) in salaryCom" :label="trsfSalary(item.id)" :value="item.id" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="婚姻状况" prop="marriage">
                                <el-radio-group v-model="form.form.marriage" class="per_radio_border">
                                    <el-radio class="width-65" v-for="item in marriageStatus" :label="item.id" border :key="item.id">{{item.name}}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="政治面貌" prop="political">
                                <el-select v-model="form.form.political" placeholder="请选择政治面貌">
                                    <el-option v-for="(item,index) in politics" :value="item.id" :label="item.name" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="籍贯">
                                <el-cascader v-model="form.form.hometownId" @change="selectAddr(form.form.hometownId,'hometown')" :options="household" :props="props" separator="-" :filterable="true" placeholder="请选择现居地">
                                </el-cascader>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="民族" prop="nation">
                                <el-select v-model="form.form.nation" placeholder="请选择民族">
                                    <el-option v-for="(item,index) in nation" :label="item.name+'族'" :value="item.name" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="身高" prop="stature">
                                <el-col :span="19">
                                    <el-input v-model.number="form.form.stature" placeholder="请输入三位数"></el-input>
                                </el-col>
                                <el-col class="center_ele" :span="5">CM</el-col>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <FormBtn :isCreateItem="true" @save="saveItem" @cancel="cancelEdit"></FormBtn>
                </el-form>
            </div>
            <div v-else class="simple_msg">
                <div>
                    <div class="line_1">
                        <BtnEdit v-on:edit-item="editItem"></BtnEdit>
                        <span class="user_name">
                            {{info.userName}}
                            <i v-if="info.gender == 1" class="icon-gender_male_02"></i>
                            <i v-else class="icon-gender_female_01"></i>
                        </span>
                    </div>
                    <div class="item">
                        {{formatStr2()}}
                    </div>
                    <div class="item">
                        {{formatStr([info.hometownStr?info.hometownStr+'籍贯':'',info.politicalStr,trsfSalary(info.nowSalary)])}}
                    </div>
                    <div class="item">
                        <p v-if="info.mobile">
                            <i class="icon-mobile_02"></i>
                            <span>{{info.mobile}}</span>
                        </p>
                        <p v-if="info.email">
                            <i class="icon-envelope_03"></i>
                            <span>{{info.email}}</span>
                        </p>
                        <!-- <p>
                            <i class="icon-shape_04"></i>
                            <span>{{info.jobStateStr}}</span>
                        </p> -->
                    </div>
                </div>
            </div>
            <ModifyMobile v-if="visible" @submit="modifyMobile" @closeModal="visible=false"></ModifyMobile>
        </div>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import _ from "lodash";
import BtnEdit from "../button/btn_edit.vue";
import BtnAdd from "../button/btn_add.vue";
import FormBtn from "../../components/button/btn_formBtn.vue";
import ItemHeader from "./item-header.vue";
import ModifyMobile from "../modify_mobile.vue";
import {
    getParentSiteById,
    trsforJobyearType,
    formatStr,
    trsfSalary
} from "../../common/common";
// import { getOtherData, getSiteList, jobState } from '../../api/dictionary'
import { getOtherData, getSiteList } from "../../api/dictionary";
import { getBasicInfo, modifyBasicInfo } from "../../api/resume";
import { fuzzyMatchEmail } from "../../api/lenovo";

@Component({
    name: "ItemBasic",
    components: {
        BtnEdit,
        BtnAdd,
        FormBtn,
        ItemHeader,
        ModifyMobile
    }
})
export default class ItemBasic extends Vue {
    @Prop()
    // @ts-ignore
    public id: number;

    public visible: boolean = false; //修改手机号码的弹出框
    // 出生日期的选项 年龄：16~65 basicInfoVo
    public optionsBegin = {
        disabledDate: (time: Date) => {
            return (
                time > this.trsfDate("y", -16) || time < this.trsfDate("y", -65)
            );
        }
    };
    public emptyData: basicInfo = {
        userName: "",
        gender: 1,
        age: "",
        jobyearType: "",
        jobyearTypeStr: "",
        location: "",
        locationStr: "",
        hometown: "",
        hometownStr: "",
        politicalStr: "",
        nowSalary: "",
        nowSalaryStr: "",
        mobile: "",
        email: "",
        // jobState: '',
        // jobStateStr: '',
        birthday: "",
        marriage: "",
        nation: "",
        stature: "",
        mobileActivation: 0
    };
    public info: basicInfo = _.cloneDeep(this.emptyData);
    // 基本信息表单
    public form: basicForm = {
        state: {
            isEdit: false
        },
        form: {},
        rules: {
            userName: [
                { required: true, message: "必填" },
                { min: 2, max: 10, message: "姓名应在2-10字符以内" }
            ],
            gender: { required: true, message: "必填" },
            birthday: { required: true, message: "必填" },
            location: { required: true, message: "必填" },
            jobyearType: { required: true, message: "必填" },
            //   jobState: { required: true, message: '必填' },
            mobile: { required: true, message: "必填" },
            email: [
                { required: true, message: "必填" },
                { max: 35, message: "不能超过35字" },
                { type: "email", message: "请输入正确格式的邮箱地址" }
            ],
            stature: [
                {
                    validator: (rule: any, value: any, callback: any) => {
                        if (value) {
                            if (!/^\d*$/.test(value)) {
                                callback(new Error("请输入数字"));
                            } else if (value > 250) {
                                callback(
                                    new Error("请输入一个最大为 250 的值")
                                );
                            } else {
                                callback();
                            }
                        } else {
                            callback();
                        }
                    }
                }
            ]
        }
    };
    public workyearList: OtherDataStructure[] | undefined = []; //工作年限的列表
    public cityList: Site[] = []; // 城市列表
    public household: Site[] = []; // 籍贯
    public props = {
        children: "child",
        label: "name",
        value: "id"
    };
    public politics: OtherDataStructure[] | undefined = []; //政治面貌
    public marriageStatus: OtherDataStructure[] | undefined = []; //婚姻状况
    public salaryCom: OtherDataStructure[] | undefined = []; //婚姻状况
    public nation: OtherDataStructure[] | undefined = []; //婚姻状况
    //   public jobState = jobState

    @Watch("id")
    watchId(id: number) {
        this.cancelEdit();
        this.getInfo();
    }
    created() {
        this.getInfo();
    }
    public async getInfo() {
        if (!this.id) return;
        let res: any = await getBasicInfo(this.id);
        if (res.code === 200) {
            this.info = res.data.basicInfo;
        }
    }

    public editItem(): void {
        //城市： 14080200 => [14000000, 14080000, 14080200]  --用于级联选择地区
        Object.assign(this.info, {
            locationId: getParentSiteById(this.info.location as number),
            hometownId: getParentSiteById(this.info.hometown as number)
        });

        this.form.state.isEdit = true;
        this.form.form = _.cloneDeep(this.info);

        getOtherData.then(data => {
            this.workyearList = data.workyear;
            this.politics = data.politics;
            this.marriageStatus = data.marriageStatus;
            this.salaryCom = data.salaryCom;
            this.nation = data.nation;
        });
        getSiteList.then(sitelist => {
            this.cityList = sitelist;

            // 户籍过滤镇区
            for (const area of _.cloneDeep(sitelist)) {
                // @ts-ignore
                if (area.child) {
                    for (const city of area.child) {
                        if (city.child) {
                            delete city.child;
                        }
                    }
                }

                this.household.push(area);
            }
        });
    }

    public saveItem(): void {
        //@ts-ignore
        this.$refs.form.validate(async (valid: boolean) => {
            if (valid) {
                let res = await modifyBasicInfo(this.form.form);

                if (res.code === 200) {
                    this.$emit("save");
                    this.form.state.isEdit = false;
                    // @ts-ignore 保存用户名字
                    this.$store.commit("saveBasicInfo", {
                        userName: this.form.form.userName
                        // jobStateStr: this.jobStateStr(this.form.form.jobState || '')
                    });
                    this.form.form = _.cloneDeep(this.emptyData);
                    this.getInfo();
                    this.$message.success("保存成功!");
                } else {
                    this.$message.error(res.msg);
                }
            }
        });
    }
    // 取消编辑
    public cancelEdit(): void {
        this.form.state.isEdit = false;
        // 取消编辑,还原表单数据
        this.form.form = _.cloneDeep(this.emptyData);
    }
    public modifyMobile(mobile: number) {
        this.info.mobile = mobile;
        this.form.form.mobile = mobile;
    }
    // 选择地址
    public selectAddr(value: number[], type: string): void {
        if (type === "location") {
            this.form.form.location = value[value.length - 1];
        }
        if (type === "hometown") {
            this.form.form.hometown = value[value.length - 1];
        }
    }
    // 转换工作年限
    public trsforJobyearType(
        jobyearType: number,
        jobyearTypeStr: string
    ): string {
        return trsforJobyearType(jobyearType, jobyearTypeStr);
    }
    public formatStr2(): string {
        let jobyearType = this.trsforJobyearType(
            <number>this.info.jobyearType,
            this.info.jobyearTypeStr + ""
        );
        let arr = [
            this.info.age ? this.info.age + "岁" : "",
            this.info.stature ? this.info.stature + "cm" : "",
            this.info.marriageStr,
            jobyearType,
            this.info.nation ? this.info.nation + "族" : "",
            "现居" + this.info.locationStr
        ];
        return formatStr(<Array<string>>arr);
    }
    // 转换职位的要求  =>高中 | 不限 | 东莞-长安镇
    public formatStr(arr: Array<string>): string {
        return formatStr(arr);
    }
    // 转换薪资
    public trsfSalary(salaryId: number): string {
        if (!salaryId || salaryId <= 0) return "";
        return trsfSalary(salaryId);
    }
    // 将时间转换格式为：2018-3-6   trsfDate('y', -65),
    public trsfDate(type: string, num: number): Date {
        let date = new Date();
        let d: Date = new Date();

        if (type === "y") {
            d = new Date(date.setFullYear(date.getFullYear() + num));
            return d;
        } else if (type === "m") {
            d = new Date(date.setFullYear(date.getFullYear() + num));
            return d;
        } else {
            return date;
        }
    }
    //   // 0->目前正在找工作
    //   public jobStateStr(state: number | string): string {
    //     if (!state) return ''
    //     // @ts-ignore
    //     let str: string = this.jobState.find((item: jobState) => {
    //       return item.state === state
    //     }).name
    //     return str
    //   }
    // 搜索联想
    public async querySearch(qs: string, cb: Function) {
        let arr: object[] = [];

        if (qs) {
            // @ts-ignore
            this.$refs.form.clearValidate("email");
            let res: any = await fuzzyMatchEmail(qs);
            if (
                res.data &&
                res.data.emailList &&
                res.data.emailList.length > 0
            ) {
                res.data.emailList.forEach((item: string) => {
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
