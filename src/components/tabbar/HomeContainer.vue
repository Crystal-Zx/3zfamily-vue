<template>
  <div class="app-home">
    <div class="main" :style="`height:${height}px;`">
      <!-- 1.轮播图 -->
      <swiper :imgList="imgList"></swiper>
      <!-- 2.主内容 -->
      <p class="title">为您挑选<span class="mui-icon mui-icon-forward"></span></p>
      <div class="com_box" v-for="com in bgImgList" :key="com.cid">
        <!-- 公司名称 -->
        <div class="cname_box" :data-cname="com.cname" :style="`background-image:url(${com.bg_img})`" @click="toCom(com.cid)"></div>
        <!-- 公司所属案例：卡片视图 -->
        <div class="com_case">
          <div class="case_box" v-for="(item,i) in caseList" :key="i" v-if="item.cid==com.cid" @click="toCase(item.case_id)">
            <img :src="item.case_img" class="case_img" />
            <p class="case_info" v-html="`${item.type}/${item.deco_style}/${item.area}m&sup2;`"></p>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import Swiper from '../sub/Swiper.vue';
export default {
  data(){
    return {
      imgList:[],     // 轮播图片列表
      bgImgList:[],   // 首页推荐公司背景图列表
      caseList:[],    // 首页推荐公司的案例图列表
      height: 0
    }
  },
  methods:{
    // 获取首页轮播图图片
    getImage(){
      var url = "/com/getCarousel";
      this.axios.get(url).then(result=>{
        for(var img of result.data){
          img.img_url = "http://127.0.0.1:3000/" + img.img_url;
        }
        this.imgList = result.data;
      })
    },
    // 获取首页推荐公司背景图
    getBgImg(){
      var url = "/com/getBgImg";
      this.axios.get(url).then(result=>{
        for(var img of result.data){
          img.bg_img = "http://127.0.0.1:3000/" + img.bg_img;
        }
        this.bgImgList = result.data;
      })
    },
    // 获取首页推荐公司的案例图列表
    getCase(){
      var url = "/com/getCase";
      this.axios.get(url).then(result=>{
        for(var img of result.data){
          img.case_img = "http://127.0.0.1:3000/" + img.case_img;
        }
        this.caseList = result.data;
      })
    },
    // 跳转到对应公司主页
    toCom(e){
      this.$router.push(`/com/${e}`);
    },
    toCase(e){
      this.$router.push(`/case/${e}`);
    },
    // 获取案例图片高宽
    // getWD(){
    //   this.$nextTick(()=>{
    //     this.imgWidth = this.$refs.elem.clientWidth;
    //     this.imgHeight = this.$refs.elem.clientHeight;
    //     console.log(this.$refs.elem.clientWidth);
    //     console.log(this.$refs.elem.clientHeight);
    //   })
    // }
  },
  created(){
    this.height = window.innerHeight - 95;
    this.getImage();
    this.getBgImg();
    this.getCase();
  },
  components:{
    "swiper": Swiper
  }
}
</script>

<style lang="scss" scoped>
  $gray: #555;
  $theme: #F2753F;
  // 主内容区：楼层标题样式
  .app-home .main{
    overflow-y: auto;
  }
  .app-home .title{
    height: 30px;
    font-size: 18px;
    color: $theme;
    // background: white;
    padding: 0 5px;
    margin: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  // 右箭头样式 
  // .app-home .arrow{
  //   align-items: center;
  // }
  // .app-home .arrow::after{
  //   content: "";
  //   width: 8px;
  //   height: 8px;
  //   border-top: 2px solid $gray;
  //   border-right: 2px solid $gray;
  //   transform: rotate(45deg);
  //   margin-left: 5px;
  // }
  // 主内容区：公司名称框
  .app-home .com_box .cname_box{
    height: 120px;
    background-size: 100%;
    background-position: 0 -110px;
    color: white;
    font-size: 30px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  // 主内容区：公司名称框 添加半透明蒙版
  .app-home .com_box .cname_box::after{
    content: attr(data-cname);
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;left: 0;
    width: 100%;height: 120px;
    background-color: rgba(0,0,0,.5);
    // opacity: .6; //使用opacity会使得文字也变得透明
  }
  // 公司所属案例框
  .app-home .com_box .com_case{
    padding: 10px 10px 0 0;
  }
  // 单个案例框
  .app-home .com_box .com_case .case_box{
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0 0 0px 10px;
    width: 50%;
    height: 50%;
  }
  // 案例图片
  .app-home .com_box .com_case .case_box .case_img{
    width: 100%;
    height: 100%;
  }
  // 案例详情
  .app-home .com_box .com_case .case_info{
    margin: 0;padding: 5px 0;
    font-size: 16px;
    color: $gray;
  }
  // 案例详情左边装饰符
  .app-home .com_box .com_case .case_info::before{
    content: "|";
    font-size: 16px;
    font-weight: 800;
    color: $gray;
    padding-right: 5px;
  }
  // 为案例图片添加上下横条纹半透明遮罩
</style>
