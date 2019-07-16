/**
 *  用于编辑简历信息
 */

import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import _ from 'lodash'
import { getParentIndustryByIds, getSkillArr } from '../../common/common'

// 限制开始和结束日期
@Component({})
export class LimitDate extends Vue {
    public form: any = {
        form: { end: '', begin: '' }
    }
    public optionsBegin = {
        /*  disabledDate: (time: Date) => {
             return time > new Date() || time > new Date(this.form.form.end)
         } */
    }
    public optionsEnd = {
        /*  disabledDate: (time: Date) => {
             return time < new Date(this.form.form.begin) || time > new Date()
         } */
    }
    @Watch('form.form')
    changeForm() {
        this.optionsBegin = {
            disabledDate: (time: Date) => {
                return time > new Date() || time > new Date(this.form.form.end)
            }
        }
        this.optionsEnd = {
            disabledDate: (time: Date) => {
                return time < new Date(this.form.form.begin) || time > new Date()
            }
        }
    }
}

// 切换简历或者页面=>取消编辑
@Component({})
export class ItemMixin extends Vue {
    @Prop()
    // @ts-ignore  简历ID
    public id: number

    @Prop({
        type: String,
        default: 'resume'
    })
    // @ts-ignore   简历页|预览页
    public page: 'resume' | 'preview'

    @Prop()
    // @ts-ignore
    public isAddModule: boolean //用于判断是否点击了添加模块

    public itemName: string = '' // 项目的名称
    public isCreateItem: boolean = false // 是否点击了添加按钮
    public editNum: number = -1 // 正在编辑的项, ==-1:没有编辑，==-2:点击添加按钮

    public emptyData: any = []
    public info: any
    public form = {
        form: {}
    }

    // 解决【bug-12572】
    // @Watch('info')
    // watchInfo(info: any) {
    //     if (Array.isArray(info) && info.length === 0) {
    //         info.push(_.cloneDeep(this.emptyData))
    //     }
    // }
    @Watch('id')
    watchId(id: number) {
        this.cancelEdit()
        if (id) {
            this.getInfo(id)
        }
        // console.log('监听简历id==='+this.id)

    }
    created() {
        if (!this.isAddModule && this.id) {
            // console.log('创建简历id==='+this.id)
            this.getInfo(this.id)
        }
    }
    public async getInfo(resId: number) { }

    /* mounted() {
        this.$nextTick(() => {
            let editItem = this.$route.query.editItem
            if (editItem) {
                let btn = document.querySelector('#' + editItem + ' .btn_edit') as HTMLElement
                btn && btn.click()
                let btn2 = document.querySelector(`[data-href="#${editItem}"]`) as HTMLElement
                btn2 && btn2.click()
            }
        })
    } */
    public createItem() {
        this.isCreateItem = true
        this.form.form = _.cloneDeep(this.emptyData)
        // 个人评价和求职意向 info==obj,其他项 info==array
        Array.isArray(this.info) && this.info.unshift(this.emptyData)
        this.editNum = 0
    }
    public async editItem(info: any, index: number = -1) {
        switch (this.itemName) {
            case 'work':
                await getParentIndustryByIds(info.comCalling as number).then(
                    data => {
                        Object.assign(info, {
                            industry: data,
                            jobNameArr: [] // 用于选择职位弹窗
                        })
                    }
                )
                break
            case 'skill':
                await getSkillArr(info.name).then(arr => {
                    Object.assign(info, {
                        // allName:[ "办公/企业管理", "Word" ],
                        allName: arr,
                    })
                })
                break;
            default:
                break
        }

        // 传参数也需要clone
        this.form.form = _.cloneDeep(info)
        // 点击完添加 再点击编辑
        if (this.isCreateItem) {
            this.info.shift()
            this.isCreateItem = false
            this.editNum = index - 1
        } else {
            this.editNum = index
        }
    }
    public save(res: any) {
        if (res.code === 200) {
            this.editNum = -1
            this.isCreateItem = false
            this.form.form = _.cloneDeep(this.emptyData)
            this.getInfo(this.id)
            this.$emit('save')
            this.$message.success('保存成功!')
        } else {
            this.$message.error(res.msg)
        }
    }
    // 取消编辑
    public cancelEdit() {
        this.editNum = -1
        // 点击完添加 再点击取消
        if (this.isCreateItem) {
            Array.isArray(this.info) && this.info.shift()
            this.isCreateItem = false
            // 点击了底部的添加模块
            if (this.isAddModule) {
                this.isAddModule = false
                this.$emit('update:isAddModule', this.isAddModule)
            }
        }
        // 取消编辑,还原表单数据
        this.form.form = _.cloneDeep(this.emptyData)
    }
    public del(promise: any, isAddModule: boolean = false) {
        promise.then(
            (data: any) => {
                if (data.code === 200) {
                    this.$emit('save')
                    this.editNum = -1
                    this.getInfo(this.id)
                    this.$message.success('操作成功!')
                    if (isAddModule && this.info.length === 1) {
                        this.isAddModule = false
                        this.$emit('update:isAddModule', this.isAddModule)
                    }
                } else {
                    this.$message.error(data.msg)
                }
            },
            (error: any) => {
                this.$message.error('服务器繁忙!')
            }
        )
    }
}
