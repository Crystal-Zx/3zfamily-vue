<template>
  <div class="app-collect" :style="`height:${height}px`">
    <div class="mui-card" v-for="item in collectList" :key="item.cid">
      <div class="mui-card-content">
        <router-link class="mui-card-content-inner com" :to="`/com/${item.cid}`">
          <img :src="item.cicon_url" class="com_cicon" />
          <div class="com_info">
            <p class="com_cname" v-text="item.cname"></p>
            <p class="com_case_info">
              <span class="com_case_num" v-html="`案例数：${item.case_num}`"></span>
              <span class="com_praise" v-html="`好评率：${item.praise}`"></span>
            </p>
            <div class="com_tel">
              <span class="mui-icon mui-icon-phone"></span>
              <span v-html="item.tel"></span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      collectList: []
    }
  },
  methods:{
    getCollectList(){
      this.axios.get('/user/getCollectList',{
        params:{
          uid: this.$store.state.currentUser
        }
      }).then(result=>{
        // 转变图片路径
        var list = result.data.collectList;
        for(var p of list){
          p.cicon_url = 'http://127.0.0.1:3000/' + p.cicon_url;
        }
        this.collectList = list;
      })
    }
  },
  created(){
    // 设置滑动区域高度
    this.height = window.innerHeight - 95;
    this.getCollectList();
  }
}
</script>

<style lang="scss" scoped>
  $theme_bg: #F3D7B5;
  $theme: #F2753F;
  $gray: #555;
  .app-collect{
    background: $theme_bg;
    overflow-y: auto;
  }
  // 公司列表框
  .com,{
    display: flex;
    align-items: center;
    // 公司信息框（左侧图标）
    .com_cicon{
      width: 60px;
      height: 60px;
      margin-right: 15px;
    }
    // 公司信息框（右侧文字信息）
    .com_info{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      p{
        margin-bottom: 3px;
      }
      .com_cname{
        color: $gray;
        font-size: 16px;
        font-weight: bold;
      }
      .com_tel{
        color: $theme;
        font-size: 14px;
        span:first-child{
          font-size: 18px;
        }
      }
    }
  }
</style>
