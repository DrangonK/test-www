<template>
    <div class="nav_bar_cont">
        <ul v-if="getRouteType=='index'">
            <li :class="getRouteName=='Index'?'selected':''">
                <router-link :to="{name:'Index'}">
                    我的主页
                    <i class="icon-hot"></i>
                </router-link>
            </li>
            <li :class="getRouteName=='Invite'?'selected':''">
                <router-link :to="{name:'Invite'}">
                    邀请面试
                    <span v-if="$store.state.amount_invite>0">{{$store.state.amount_invite}}</span>
                </router-link>
            </li>
            <li :class="getRouteName=='SeeMe'?'selected':''">
                <router-link :to="{name:'SeeMe'}">
                    谁看过我
                    <span v-if="$store.state.amount_seeMe>0">{{$store.state.amount_seeMe}}</span>
                </router-link>
            </li>
            <li :class="getRouteName=='Company'?'selected':''">
                <router-link :to="{name:'Company'}">
                    关注企业
                </router-link>
            </li>
            <li :class="getRouteName=='Message'?'selected':''">
                <router-link :to="{name:'Message'}">
                    站内消息
                    <span v-if="$store.state.amount_msg>0">{{$store.state.amount_msg}}</span>
                </router-link>
            </li>
        </ul>
        <ul v-else-if="getRouteType=='setting'">
            <li :class="getRouteName=='Privacy'?'selected':''">
                <router-link :to="{name:'Privacy'}">
                    公开设置
                </router-link>
            </li>
            <li :class="getRouteName=='Binding'?'selected':''">
                <router-link :to="{name:'Binding'}">
                    账号绑定
                </router-link>
            </li>
            <li :class="getRouteName=='Password'?'selected':''">
                <router-link :to="{name:'Password'}">
                    修改密码
                </router-link>
            </li>
            <!-- <li :class="getRouteName=='Subscribe'?'selected':''">
                <router-link :to="{name:'Subscribe'}">
                我的订阅
                </router-link>
            </li> -->
        </ul>
        <ul v-else-if="getRouteType=='favorite'">
            职位收藏
        </ul>
        <ul v-else-if="getRouteType=='apply'">
            投递记录
        </ul>
    </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
    name:'NavBar'
})
export default class NavBar extends Vue {
  get getRouteName(): string {
    return this.$route.name || ''
  }
  // 计算属性
  get getRouteType(): string {
    return this.$route.meta.type
  }
}
</script>
