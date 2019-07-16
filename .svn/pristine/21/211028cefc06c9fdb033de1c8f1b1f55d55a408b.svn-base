<template>
    <div class="container">
        <!-- 个人中心各个页面 -->
        <div class="box">
            <LeftSide></LeftSide>
            <div class="right_box">
                <template v-if="getRouteType!='resume'">
                    <NavBar></NavBar>
                    <div class="main_cont">
                        <transition name="el-fade-in-linear">
                            <router-view></router-view>
                        </transition>
                    </div>
                </template>
                <!-- 编辑简历 -->
                <router-view v-else></router-view>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Cookies from 'js-cookie';

    import {getNoticeAmount} from '../api/index';
    import {getBasicInfo, getResumeList} from '../api/resume';

    import LeftSide from '../components/left_side.vue';
    import NavBar from '../components/nav_bar.vue';
    import {checkLogin} from '../api/index'

    @Component({
        name: 'PerCenter',
        components: {
            LeftSide,
            NavBar
        }
    })
    export default class PerCenter extends Vue {
        get getRouteType(): string {
            return this.$route.meta.type;
        }

        created() {
            // 判断是否能有cookies && 个人中心
            if (!Cookies.get('per') && location.pathname.startsWith('/per')) {
                location.href = process.env.VUE_APP_DOMAIN + '/login/per';
            }
            this.checkLogin();
            this.getNoticeAmount();
            // this.getResumeList();
        }

        mounted() {
            this.fixed();
            this.toItem();
        }

        public async checkLogin() {
            let token: string = Cookies.get('per') || ''
            let res: any = await checkLogin(token)
            let data: checkLoginInfo = res.data
            if (res.code === 200) {
                if (!data.isMobileActivated) {
                    this.$store.commit('verifyMobile', {
                        isMobileActivated: data.isMobileActivated,
                        mobile: data.mobile || ''
                    })
                } else {
                    this.getResumeList();
                }
            }
        }

        public async getNoticeAmount() {
            let res: any = await getNoticeAmount();
            if (res.code === 200) {
                // @ts-ignore
                this.$store.commit('saveNoticeAmount', {
                    amount_invite: res.data.inviteUnreadCount,
                    amount_seeMe: res.data.viewUnreadCount,
                    amount_msg: res.data.msgUnreadCount
                });
            }
        }
        public async getResumeList() {
            let res: any = await getResumeList();

            if (res.code === 200) {
                let res2: any = await getBasicInfo(res.data.defaultId);

                if (res2.code === 200) {
                    let fileName = res2.data.basicInfo.fileName;
                    let filePath = res2.data.basicInfo.filePath;
                    let photoPath: string = '';

                    if (res2.data.basicInfo.photoUrl) {
                        photoPath = res2.data.basicInfo.photoUrl;
                    } else {
                        photoPath = `/public/images/${
                            res2.data.basicInfo.gender === 1 ? 'boy' : 'girl'
                            }.jpg`;
                    }
                    // @ts-ignore
                    this.$store.commit('saveBasicInfo', {
                        userName: res2.data.basicInfo.userName,
                        photoPath: photoPath
                    });
                }
            } else if (res.code === 400 && res.url === 'post:/per/resume') {
                window.location.href =
                    process.env.VUE_APP_DOMAIN + '/per/new/step1?t=' + new Date().getTime();
            }
        }

        // 固定左右侧边栏栏
        public fixed(): void {
            window.addEventListener('scroll', () => {
                let leftSide = document.querySelector('.left_box'); // 左侧
                let rightSide = document.querySelector('.right_side_box'); // 右侧
                let title_wrap = document.querySelector('.title_wrap'); // 推荐职位的标题
                let scrollTop =
                    document.documentElement.scrollTop || document.body.scrollTop;
                let r_top = 0;
                let title_top = 0;

                if (title_wrap) {
                    title_top = title_wrap.getBoundingClientRect().top;
                }

                if (rightSide) {
                    let resume_info = rightSide.querySelector('.resume_info');
                    if (resume_info) {
                        // @ts-ignore
                        r_top = resume_info.offsetHeight + 170;
                    }
                    r_top = r_top || 318;
                }

                fixed(leftSide, scrollTop >= 150);
                fixed(title_wrap, title_top <= 0);
                fixed(rightSide, scrollTop >= r_top);
                this.elevator();
            });

            function fixed(ele: Element | null, judge: boolean) {
                if (ele) {
                    if (judge) {
                        if (!ele.classList.contains('fixed')) {
                            ele.classList.add('fixed');
                        }
                    } else if (ele.classList.contains('fixed')) {
                        ele.classList.remove('fixed');
                    }
                }
            }
        }

        // 电梯楼层效果
        public elevator() {
            let resumeItemList = document.getElementsByClassName('resume_item');
            let navList = document.querySelectorAll('.resume_nav_content li');

            if (resumeItemList.length > 0 && navList.length > 0) {
                for (let resumeItem of resumeItemList) {
                    var top = resumeItem.getBoundingClientRect().top;
                    var bottom = resumeItem.getBoundingClientRect().bottom;
                    if (top < 45 && bottom > 0) {
                        //   this.$router.replace(this.$route.path + '#' + resumeItem.id)
                        for (let li of navList) {
                            const a = li.querySelector('.nav_item') as any;
                            let href = a.getAttribute('data-href');
                            if (a && href === '#' + resumeItem.id) {
                                li.classList.add('active'); //HTML5新增,IE9不支持
                                //   li.setAttribute('class', 'active')
                            } else {
                                li.classList.remove('active');
                                //   li.setAttribute('class', '')
                                //   this.$router.replace(this.$route.path)
                            }
                        }
                        break; //提前跳出循环
                    }
                }
            }
        }

        // 跳到item顶部
        public toItem() {
            document.addEventListener('click', e => {
                let target: any = e.target;
                let parentNode = target.parentNode;
                /* if (
                  parentNode.classList.contains('btn_edit') ||
                  parentNode.classList.contains('btn_add')
                ) {
                  while (parentNode.className !== 'resume_item') {
                    parentNode = parentNode.parentNode
                  }
                  // let id = parentNode.id
                  // window.location.hash = '#' + id //相同hash 不响应
                  let scrollTop =
                    document.documentElement.scrollTop || document.body.scrollTop
                  let h = parentNode.getBoundingClientRect().top
                  document.body.scrollTop = document.documentElement.scrollTop =
                    scrollTop + h
                } else  */

                if (
                    target.classList.contains('nav_item') ||
                    parentNode.classList.contains('nav_item')
                ) {
                    let selector: string =
                        target.getAttribute('data-href') ||
                        parentNode.getAttribute('data-href');

                    if (selector) {
                        setTimeout(() => {
                            let element = document.querySelector(selector) as Element;
                            if (element) {
                                if (selector === '#basic') {
                                    window.scrollTo(0, 150);
                                } else {
                                    let top = element.getBoundingClientRect().top;
                                    let scrollTop =
                                        document.documentElement.scrollTop || document.body.scrollTop;
                                    window.scrollTo(0, top + scrollTop - 45);
                                }

                                setTimeout(() => {
                                    let navList = document.querySelectorAll(
                                        '.resume_nav_content li'
                                    );
                                    for (let li of navList) {
                                        li.classList.remove('active');
                                        // contains 不知道会不会有兼容性问题
                                        if (li.contains(target)) {
                                            li.classList.add('active');
                                        }
                                    }
                                }, 0);
                            }
                        }, 0);
                    }
                }
            });
        }
    }
</script>
<style lang='scss' scoped>
    /* @media screen and (max-width: 1250px) {
      .box {
        width: 1100px;
      }
      .right_box {
        margin-left: 190px;
      }
    } */
</style>
