<template>
  <div class="app-found">
    <!-- <h1>this is found page!</h1> -->
    <div class="rank_way_box">
      <span class="rank_way" :class="isSelected=='case_num' ? 'rank_active':''" @click="loadPage('case_num')">案例<i class="mui-icon mui-icon-arrowthindown"></i></span>
      <span class="rank_way" :class="isSelected=='praise' ? 'rank_active':''" @click="loadPage('praise')">好评<i class="mui-icon mui-icon-arrowthindown"></i></span>
    </div>
    <!-- MUI图文列表 -->
    <!-- 区域滚动父容器 -->
    <div id="pullrefresh" class="mui-scroll-wrapper" :style="`height:${height}px`">
      <!-- 区域滚动子容器 -->
      <div class="mui-scroll">
        <!-- 真实要显示的DOM内容 -->
        <ul class="mui-table-view">
          <li class="mui-table-view-cell" v-for="item in comList" @click="toCom(item.cid)">
            <img class="com_icon" :src="item.cicon_url">
            <div class="com_info">
              <p class="com_cname" v-html="item.cname"></p>
              <p class="com_case_info">
                <span class="com_case_num" v-html="`案例数：${item.case_num}`"></span>
                <span class="com_praise" v-html="`好评率：${item.praise}`"></span>
              </p>
              <div class="com_tel">
                <span class="mui-icon mui-icon-phone"></span>
                <span v-html="item.tel"></span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      comList: [],
      isSelected: "",
      height: 0
    }
  },
  methods:{
    loadPage(e){
      var rankWay = e;
      // 切换选中样式
      this.isSelected = rankWay;
      // 获取对应数据
      var url = "/com/getCom";
      this.axios.get(url,{
        params:{
          rankWay
        }
      }).then(result=>{
        for(var img of result.data){
          img.cicon_url = "http://127.0.0.1:3000/" + img.cicon_url;
        }
        this.comList = result.data;
      })
    },
    addMore(){
      // 待之后完善此功能
    },
    toCom(e){
      var cid = e;
      this.$router.push(`/com/${cid}`);
    }
  },
  mounted(){
    // 设置滑动区域高度
    this.height = window.innerHeight - 130;
    this.loadPage('case_num');
  }
}
</script>

<style lang="scss" scoped>
  $bg_gray: #F5F5F5;
  // $theme: #F2753F;
  $theme_bg: #F3D7B5;
  // $green: #0EAF63;
  // $pink: #EC7E90;
  $tel: #FF5A00;
  $gray: #555;
  // 公司列表排序选择框
  .app-found .rank_way_box{
    background: $theme_bg;
    font-size: 14px;
    color: $gray;
    display: flex;
    justify-content: flex-start;
    padding-left: 5px;
  }
  .app-found .rank_way_box .rank_way{
    padding: 5px;
  }
  // 滚动区域父容器
  .app-found .mui-scroll-wrapper{
    top: 76px;
    overflow-y: auto;

  }
  // 滚动区域子容器
  .app-found .mui-scroll-wrapper .mui-scroll{
    height: 100%;
    margin-bottom: 55px;
  }
  // 滚动区域子容器
  .app-found .mui-scroll-wrapper .mui-scroll .mui-table-view-cell{
    display: flex;
  }
  // 公司图标样式
  .app-found .mui-scroll-wrapper .mui-scroll .mui-table-view-cell .com_icon{
    width: 70px;
    height: 70px;
    margin-right: 20px;
  }
  // 公司信息框
  .app-found .mui-scroll-wrapper .mui-scroll .mui-table-view-cell .com_info{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  // 公司名称
  .app-found .mui-scroll-wrapper .mui-scroll .mui-table-view-cell .com_info .com_cname{
    font-size: 20px;
    font-family: 'SimHei';
    font-weight: bold;
    color: $gray;
    align-self: flex-start;
    padding: 5px 0;
  }
  // 公司案例数及好评率
  .app-found .mui-scroll-wrapper .mui-scroll .mui-table-view-cell .com_info .com_case_info{
    font-size: 14px;
    // color: $gray;
    padding-bottom: 5px;
  }
  .app-found .mui-scroll-wrapper .mui-scroll .mui-table-view-cell .com_info .com_tel{
    font-size: 16px;
    align-self: flex-start;
    color: $tel;
  }
  .app-found .rank_active{
    color: white;
  }
</style>
