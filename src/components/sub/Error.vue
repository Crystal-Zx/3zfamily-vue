<template>
  <!-- <div class="app-err"> -->
    <div class="app-err case_err">
      <span class="mui-icon iconfont icon-err"></span>
      <span>{{errMsg}}</span>
    </div>
  <!-- </div> -->
</template>

<script>
export default {
  data(){
    return {
      
    }
  },
  props: ["errMsg"]   //从父组件接受错误信息并显示
}
</script>

<style>
  /* 若该公司暂无案例信息 显示出错信息 */
  .case_err{
    padding: 10px 0;
    font-size: 16px;
    color: #8f8f94;
  }
</style>
