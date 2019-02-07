<template>
  <div class="app">
    <!-- 1.顶部导航栏 -->
    <myHeader v-show="$route.meta.headerShow==undefined||$route.meta.headerShow"></myHeader>
    <!-- 2.内容区 -->
    <router-view v-if="isRouterAlive"></router-view>
    <!-- 3.底部导航栏 -->
    <mt-tabbar v-model="selected" fixed v-show="$route.meta.navShow==undefined||$route.meta.navShow">
      <mt-tab-item id="/home">
        <!-- <img slot="icon" src=""> -->
        <span class="mui-icon mui-icon-home"></span>
        <span class="tab_name">首页</span>
      </mt-tab-item>
      <mt-tab-item id="/found">
        <!-- <img slot="icon" src=""> -->
        <span class="mui-icon mui-icon-minus"></span>
        <span class="tab_name">发现</span>
      </mt-tab-item>
      <mt-tab-item id="/order">
        <!-- <img slot="icon" src=""> -->
        <span class="mui-icon mui-icon-star"></span>
        <span class="tab_name">预约</span>
      </mt-tab-item>
      <mt-tab-item id="/personal">
        <!-- <img slot="icon" src=""> -->
        <span class="mui-icon mui-icon-person"></span>
        <span class="tab_name">我的</span>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import myHeader from './components/sub/Header.vue';
export default {
  name: 'App',
  components:{
    "myHeader": myHeader
  },
  data(){
    return {
      selected: this.$route.path,
      isRouterAlive: true
    }
  },
  provide(){
    return {
      reload: this.reload
    }
  }, 
  watch: {
    selected: function (val) {
      // click后打印出当前mt-tab-item的id
      // console.log(val);    // val是当前点击的item的id值
      this.$router.push(val);
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function(){
        this.isRouterAlive = true;
      })
    }
  },
  created(){
    // 页面加载后从sessionStorage保存数据到vuex
    var sessionID = sessionStorage.getItem('sessionID');
    var uid = sessionStorage.getItem('uid');
    if(sessionID && uid){
      this.$store.dispatch('setSessionID',sessionID);
      this.$store.dispatch('setUser',uid);
    }
    // 页面刷新时先保存vuex中的数据到sessionStorage
    window.addEventListener("beforeunload",()=>{ 
      sessionStorage.setItem('uid',this.$store.state.currentUser);
      sessionStorage.setItem('sessionID',this.$store.state.sessionID);
    })
    // console.log(this.$store.state);
    // console.log(sessionStorage);
  }
}
</script>

<style lang="scss" scoped>
  $bg_gray: #F5F5F5;
  $theme: #F2753F;
  $gray: #555;
  html,body,.app{
    height: 100%; 
  }
  .app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /* margin-top: 60px; */
  }
  body{
    margin: 0;
    padding: 0;
    // margin-bottom: 55px;
    background: #fff;
  }
  // 主内容区添加下内补丁，使tabbar不遮挡主内容
  .app div:nth-child(2){
    height: 100%;
    // padding-bottom: 55px;
  }
  // tabbar的item添加上下内补丁
  .app .mint-tabbar{
    background: $bg_gray;
  }
  .app .mint-tabbar{
    .mint-tab-item{
      padding: 15px 0;
      // 导航栏图标颜色
      .mint-tab-item-label .mui-icon{
        color: $gray;
      }
    }
    .mint-tab-item.is-selected{
      background: $bg_gray;
      .mint-tab-item-label span{
        color: $theme;
      }
    }
  }
  // 导航栏文字样式
  .app .mint-tabbar .mint-tab-item .mint-tab-item-label .tab_name{
    color: $gray;
    font-size: 16px;
  }
</style>
