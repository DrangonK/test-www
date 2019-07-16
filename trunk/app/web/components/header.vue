<template>
    <div class="wrap">
        <div class="top_cont">
            <div class="box top_box">
                <div class="top_left_content">
                    <span>证券代码：830969</span>
                    <span class="border_ele"> | </span>
                    <span class="zhiping_entrance">
                        <a href="http://zp.job5156.com" target="_blank">企业登录</a>
                    </span>
                    <span class="border_ele"> | </span>
                    <span class="app">
                        <a class="zt_app" :href="$store.state.domain+'/app'" target="_blank">
                            <i></i>手机APP</a>
                        <div class="app_qr_code">
                            <img width="112" height="112" alt="智通APP" :src="$store.state.domain+'/static/style/v4/images/qr_code_app.png'">
                            <p class="bottom-ad">
                                扫一扫，
                                <strong>下载APP</strong>
                            </p>
                        </div>
                    </span>
                    <span class="border_ele"> | </span>
                    <span class="kefu_hotline">客服热线：95105333</span>
                </div>
                <div class="top_right_content">
                    <div id="perInfo" class="per_msg_cont">
                        <div class="my_resume">
                            <span>
                                <router-link :to="{name:'Resume'}">我的简历</router-link>
                            </span>
                        </div>
                        <span class="border_ele"> | </span>
                        <div>
                            <span>
                                <router-link :to="{name:'Apply'}">投递记录</router-link>
                            </span>
                        </div>
                        <span class="border_ele"> | </span>
                        <div id="identification">
                            <router-link class="loginName" :to="{name:'Index'}">{{$store.state.userName}} </router-link>
                            <i class="trangle_down"></i>
                            <i class="trangle_up"></i>
                            <div id="user_msg">
                                <ul class="message_box">
                                    <li class="has_border">
                                        <router-link :to="{name:'Index'}">
                                            <span>个人中心</span>
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{name:'Invite'}">
                                            <span id="interview" class="fr numbs" v-if="$store.state.amount_invite>0">{{$store.state.amount_invite}}</span>
                                            <span>面试邀请</span>
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{name:'SeeMe'}">
                                            <span id="check" class="fr numbs" v-if="$store.state.amount_seeMe>0">{{$store.state.amount_seeMe}}</span>
                                            <span>谁看过我</span>
                                        </router-link>
                                    </li>
                                    <li class="has_border">
                                        <router-link :to="{name:'Message'}">
                                            <span id="letter" class="fr numbs" v-if="$store.state.amount_msg>0">{{$store.state.amount_msg}}</span>
                                            <span>站内消息</span>
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{name:'Privacy'}">账号设置</router-link>
                                    </li>
                                    <li @click="logOut">退出</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="nav_cont">
            <div class="box">
                <ul class="nav_right_content">
                    <li class="">
                        <a :href="$store.state.domain">首页</a>
                    </li>
                    <li class="">
                        <a :href="$store.state.domain+'/s/result/kt0/'">职位</a>
                    </li>
                    <!--   <li>
                        <a :href="$store.state.domain+'irc/'" target="_blank">招聘会+</a>
                    </li> -->
                    <li class="more_services">
                        招聘会专区
                        <i></i>
                        <ul class="more_services_list">
                            <li>
                                <a :href="$store.state.domain+'/irc/fair/lingxiu'" target="_blank">领秀直聘会</a>
                            </li>
                            <li>
                                <!-- <a href="${empty ircArea ? '/irc/' : fn:replace('/irc/fair/index/area$ircArea$_period0','$ircArea$',ircArea )}" target="_blank" style="display: inline">招聘会+</a> -->
                                <a :href="$store.state.domain+'/irc/'" target="_blank" style="display: inline">招聘会+</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="http://www.51shuobo.com" target="_blank">硕博人才网</a>
                    </li>
                    <li class="nav_search_cont">
                        <div class="nav_search_box">
                            <form id="searchForm" :action="$store.state.domain+'/s/result/kt0/'" method="post">
                                <input type="hidden" name="csrfKey" value="">
                                <div class="bar">
                                    <input name="keywordType" id="comType" data-sel="value" type="hidden" tabindex="-1" autocomplete="off" value="0">
                                    <div class="key">
                                        <input v-model="keywork" name="keyword" id="keyword" value="" maxlength="200" placeholder="请输入关键字/职位名/企业名" type="text">
                                    </div>
                                    <input style="display:none" id="id_searchCity" name="locationList" type="hidden" tabindex="-1" value="">
                                    <div class="btn" @click="goToSearchPage(keywork)">
                                        <a class="icon-zoom_yellow" data-act="search" data-st="s" title="搜索"></a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </li>
                </ul>
                <div class="nav_left_content">
                    <a class="zt_logo" :href="$store.state.domain" title="智通人才网">
                        智通人才网
                        <img :src="$store.state.domain+'/static/style/v4/images/zt_logo.png'" alt="智通人才网">
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { logOut } from '../api/index'

@Component({
  name: 'Header'
})
export default class Header extends Vue {
  public keywork: string = ''

  public getTime: number = new Date().getTime()
  public goToSearchPage(kw: string) {
    let href: string = ''

    if (kw) {
      if (kw.indexOf('~') !== -1) {
        kw = kw.replace(/~/gi, escape('~'))
      }
      kw = kw.replace(/[\/*%\\]/gi, '')

      href = this.$store.state.domain + '/s/result/kt0_kw-' + kw + '/'
    } else {
      href = this.$store.state.domain + '/s/result/kt0/'
    }
    window.location.href = href
  }
  // 退出登录
  public async logOut() {
    let res = await logOut()

    if (res.code === 200) {
      window.location.href = this.$store.state.domain + '/login/per'
    } else {
      this.$message.error(res.msg)
    }
  }
}
</script>
