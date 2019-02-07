<template>
  <div class="app-header">
    <img class="logo" src="../../assets/3zf_logo.png" alt="">
    <div class="search">
      <input type="text" v-model="kw" @keyup.13="toSearch()" placeholder="请输入公司名称或案例风格">
      <span class="mui-icon mui-icon-search" @click="toSearch()"></span>
    </div>
  </div>
</template>

<script>
  export default {
    data:function(){
      return {
        kw: ''  //关键词搜索
        // city: "成都"
      }
    },
    inject: ['reload'],
    methods:{
      toSearch(){
        if(!this.kw){
          this.toast({
            message: '请输入关键词！',
            iconClass: 'mui-icon iconfont icon-err'
          })
        }
        else{
          var path = this.$route.path.split('/')[1];
          this.$router.push(`/search/${this.kw}`);
        } 
      }
    } 
  }
</script>

<style lang="scss" scoped>
  $theme_bg: #F3D7B5;
  .app-header{
    margin: 0;
    padding: 8px 5px;
    background: $theme_bg;
    display: flex;
    justify-content: space-between;
    // align-items: center;
  }
  .app-header .logo{
    height: 25px;
  }
  .app-header .search{
    width: 70%;
    height: 25px;
    display: flex;
    justify-content: flex-end;
  }
  .app-header .search input{
    width: 80%;
    height: 100%;
    margin-right: 5px;
    font-size: 14px;
  }
  .app-header .search span{
    height: 100%;
    display: inline-block;
  }
</style>
