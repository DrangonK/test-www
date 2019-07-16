<template>
    <div id="app">
        <Header v-if="getRouteType!='preview'"></Header>
        <router-view></router-view>
        <Side></Side>
        <Footer></Footer>
        <NovicePage></NovicePage>
        <VerifyMobile></VerifyMobile>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import Header from './components/header.vue'
    import Footer from './components/footer.vue'
    import Side from './components/side.vue'
    import NovicePage from './components/novice.vue'
    import VerifyMobile from './components/veriify_mobile.vue'

    @Component({
        name: 'App',
        components: {
            Side, // 右侧边栏
            Header,
            Footer,
            NovicePage, //个人中心的新手指引教程
            VerifyMobile // 验收手机号码的弹窗
        }
    })
    export default class App extends Vue {
        get getRouteType(): string {
            return this.$route.meta.type
        }
    }
</script>
