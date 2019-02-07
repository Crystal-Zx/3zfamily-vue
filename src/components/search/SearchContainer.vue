<template>
  <div class="app-search" :style="`height:${height}px`">
    <div class="com_box">
      <div class="com_title">
        <span class="mui-icon iconfont icon-details"></span>
        <span>公司</span>
      </div>
      <!-- 将匹配到的公司相关信息以列表形式(卡片组件)展示 -->
      <div class="com_content" v-if="comList.length != 0">
        <div class="mui-card" v-for="com in comList" :key="com.cid">
          <div class="mui-card-content">
            <router-link class="mui-card-content-inner com" :to="`/com/${com.cid}`">
              <img :src="com.cicon_url" class="com_cicon" />
              <div class="com_info">
                <p class="com_cname" v-text="com.cname"></p>
                <p class="com_case_info">
                  <span class="com_case_num" v-html="`案例数：${com.case_num}`"></span>
                  <span class="com_praise" v-html="`好评率：${com.praise}`"></span>
                </p>
                <div class="com_tel">
                  <span class="mui-icon mui-icon-phone"></span>
                  <span v-html="com.tel"></span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <!-- 若未找到对应信息，则进行提示 -->
      <div class="mui-card" v-else>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <err :errMsg="`抱歉，未找到相关公司信息`"></err>
          </div>
        </div>
      </div>
    </div>
    <div class="case_box">
      <div class="case_title">
        <span class="mui-icon iconfont icon-case"></span>
        <span>案例</span>
      </div>
      <!-- 将匹配到的公司案例相关信息以列表形式(卡片组件)展示 -->
      <div class="case_content" v-if="caseList.length != 0">
        <div class="mui-card" v-for="c in caseList" :key="c.case_id">
          <div class="mui-card-content">
            <router-link class="mui-card-content-inner case" :to="`/case/${c.case_id}`">
              <img :src="c.case_img" class="case_img" />
              <div class="case_info">
                <p class="case_name" v-text="c.case_name"></p>
                <p class="case_detail" v-html="`${c.type}/${c.deco_style}/${c.area}m&sup2;`"></p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <!-- 若未找到对应信息，则进行提示 -->
      <div class="mui-card" v-else>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <err :errMsg="`抱歉，未找到相关案例信息`"></err>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Err from '../sub/Error.vue';
export default {
  data(){
    return {
      height: 0,   // 屏幕高度
      comList: [],
      caseList: []
    }
  },
  props: ['kw'],
  methods:{
    getResult(){
      console.log(this.kw);
      console.log(!this.kw);
      var url = '/com/search';
      this.axios.get(url,{
        params: {
          kw: this.kw
        }
      }).then(result=>{
        this.comList = result.data.comList;
        this.caseList = result.data.caseList;
        // 处理图片路径
        if(this.comList.length != 0){
          for(var com of this.comList){
            com.cicon_url = 'http://127.0.0.1:3000/' + com.cicon_url;
          }
        }
        if(this.caseList.length != 0){
          for(var c of this.caseList){
            c.case_img = 'http://127.0.0.1:3000/' + c.case_img;
          }
          console.log(this.caseList);
        }
      })
    }
  },
  watch:{
    kw(){
      this.getResult()
    }
  },
  created(){
    this.height = window.innerHeight - 41;
    // 跳转到此页面时初始加载一次搜索结果
    this.getResult();
  },
  components:{
    "err": Err
  }
}
</script>

<style lang="scss" scoped>
  $theme_bg: #F3D7B5;
  $theme: #F2753F;
  $gray: #555;
  .app-search{
    background: $theme_bg;
    border-top: 1px solid white;
    overflow-y: auto;
  }
  .app-search .com_box,.case_box{
    // 搜索到的公司标题框
    .com_title,.case_title{
      display: flex;
      justify-content: flex-start;
      padding: 10px 0 0 10px;
      span:first-child{
        margin-right: 5px;
      }
      span{
        color: white;
        font-size: 19px;
        font-weight: bold;
        letter-spacing: 4px;
      }
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
    .case{
      display: flex;
      justify-content: flex-start;
      .case_img{
        height: 80px;
        margin-right: 15px;
      }
      .case_info{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        .case_name{
          color: $gray;
          font-size: 16px;
          font-weight: bold;
        }
        .case_detail{
          font-size: 14px;
          // color: 
        }
      }
    }
  }
</style>
