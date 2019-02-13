<template>
  <div class="app-com">
    <!-- 公司基本信息 -->
    <div class="mui-card">
      <div class="mui-card-header mui-card-media" :style="`height:40vw;background-image:url(${comDetails.bg_img})`"></div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="com_info">
            <div class="cicon_box">
              <img :src="comDetails.cicon_url">
            </div>
            <div class="info_box">
              <p class="com_name" v-text="comDetails.cname"></p>
              <i class="com_collect mui-icon iconfont icon-collect" :class="isCollected == true ? 'active':''" @click="toCollect()"></i>
              <p class="com_data">
                <span class="case_num" v-text="`案例数：${comDetails.case_num}`"></span><b class="divide">|</b>
                <span class="praise" v-text="`好评率：${comDetails.praise}`"></span>
              </p>
              <p class="tel_box">
                <span class="tel" v-text="`TEL：${comDetails.tel}`"></span>
                <span class="mui-icon iconfont icon-order" :class="isOrder == true ? 'active':''" @click="toOrder()"></span>
              </p>
              <p class="addr_box">
                <span class="addr" v-text="`地址：${comDetails.address}`"></span>
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <!-- 公司服务概况 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="service_title">
            <span class="mui-icon iconfont icon-details"></span>
            <span>公司服务概况</span>
          </div>
          <div class="service_content">
            <p class="sc_bsTime">
              <span>营业时间：</span>
              <span v-text="comDetails.bs_time"></span>
            </p>
            <p class="sc_priceRange">
              <span>承接价位：</span>
              <span v-text="comDetails.price_range"></span>
            </p>
            <p class="sc_serviceRange" style="align-self:flex-start;">
              <span>服务范围：</span>
              <span v-text="comDetails.service_range"></span>
            </p>
            <p class="sc_specStyle">
              <span>专长风格：</span>
              <span v-text="comDetails.spec_style"></span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 公司案例展示 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="case_title">
            <span class="mui-icon iconfont icon-case"></span>
            <span>公司案例展示</span>
          </div>
          <div class="case_content" v-if="caseList.length!=0">
            <div class="case_box" v-for="item in caseList" :key="item.case_id" @click="toCase(item.case_id)">
              <img :src="item.case_img" class="case_img" />
              <p class="case_info" v-html="`${item.type}/${item.deco_style}/${item.area}m&sup2;`"></p>
            </div>
          </div>
          <err :errMsg="`啊哦，该公司暂无案例哦`" v-else></err>
        </div>
      </div>
    </div>
    <!-- 公司设计师 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="designer_title">
            <span class="mui-icon iconfont icon-group"></span>
            <span>设计团队</span>
          </div>
          <div class="designer_content" v-if="designerList.length!=0">
            <div class="designer_box" v-for="d in designerList" :key="d.did">
              <img :src="d.photo" class="d_photo">
              <p class="d_position" v-text="d.rank"></p>
              <p>
                <span class="years" v-text="`${d.years}年经验`"></span>
                <span class="cases" v-text="`${d.d_case_num}套案例`"></span>
              </p>
            </div>
          </div>
          <err :errMsg="`啊哦，暂无设计师信息哦`" v-else></err>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Err from '../sub/Error.vue'
export default {
  data(){
    return {
      isCollected: false,
      isOrder: false,
      comDetails: [],
      caseList: [],
      designerList: []
    }
  },
  props: ["cid"],
  methods:{
    getCom(){
      var url = '/com/getComDetail';
      this.axios.get(url,{
        params: {
          cid : this.cid   //传入公司编号
        }
      }).then(result=>{
        var com = result.data;
        com.bg_img = "http://127.0.0.1:3000/" + com.bg_img;
        com.cicon_url = "http://127.0.0.1:3000/" + com.cicon_url;
        this.comDetails = result.data;
      })
    },
    getDesigner(){
      var url = '/com/getDesigner';
      this.axios.get(url,{
        params:{
          cid: this.cid
        }
      }).then(result=>{
        for(var d of result.data){
          d.photo = 'http://127.0.0.1:3000/' + d.photo;
        }
        this.designerList = result.data;
      })
    },
    getCase(){
      var url = '/com/getCase';
      this.axios.get(url,{
        params:{
          cid: this.cid    // 传入公司编号获取对应案例数据
        }
      }).then(result=>{
        for(var img of result.data){
          img.case_img = "http://127.0.0.1:3000/" + img.case_img;
        }
        this.caseList = result.data;
      })
    },
    toCollect(){
      // this.isCollected = !this.isCollected;
      var msg = this.isCollected ? '确定将此公司从收藏列表删除？':'确定将此公司加入收藏列表？';
      this.$confirm(msg)
      .then((action)=>{
        if(action === 'confirm'){
          this.axios.get('/user/collect',{
            params:{ cid:this.cid,uid: this.$store.state.currentUser}
          }).then(result=>{
            // 收藏成功
            if(result.data.code == 1){
              this.isCollected = true;
              this.$toast({
                message: result.data.msg,
                iconClass: 'mui-icon iconfont icon-congratulation'
              })
            }else if(result.data.code == 2){
              this.isCollected = false;
              this.$toast({
                message: result.data.msg,
                iconClass: 'mui-icon iconfont icon-congratulation'
              })
            }else{
              this.$toast({
                message: result.data.msg,
                iconClass: 'mui-icon iconfont icon-err'
              })
            }
          }) 
        }
      }).catch(err=>{
        if(err === 'cancel'){
          return;
        }
      })
    },
    toOrder(){
      this.isOrder = !this.isOrder;
    },
    toCase(e){
      var case_id = e;
      var url = `/case/${case_id}`;
      this.$router.push(url);
    },
    getCollected(){
      this.axios.get('/user/isCollected',{
        params:{
          cid: this.cid,
          uid: this.$store.state.currentUser
        }
      }).then(result=>{
        if(result.data.code){
          this.isCollected = true;
        }else{
          this.isCollected = false;
        }
      })
    }
  },
  created(){
    this.getCom();
    this.getDesigner();
    this.getCase();
    this.getCollected();
  },
  components:{
    "err": Err
  }
}
</script>

<style lang="scss" scoped>
  $pink: #EC7E90;
  $gray: #777;
  $lightgray: #bbb;
  // 将最外层容器设为可竖直滑动
  .app-com{
    overflow-y: auto;
  }
  .app-com .mui-card .com_info{
    height: 200px;
  }
  // 公司图标框
  .app-com .mui-card .com_info .cicon_box{
    width: fit-content;
    height: 90px;
    display: inline-block;
    position: relative;
    top: -65px;
    img{
      width: 80px;
      height: 80px;
      // padding: 5px;
      border: 2px solid $lightgray;
      margin: 5px;
    }
  }
  // 公司信息框
  .app-com .mui-card .com_info .info_box{
    // height: 160px;
    position: relative;
    top: -50px;
    .com_collect{
      position: absolute;
      top: 0;
      right: 0;
    }
    .com_name{
      font-size: 22px;
      font-family: 'SimHei';
      font-weight: bold;
      color: $pink;
    }
    p:first-child{
      padding-bottom: 10px;
    }
    p:not(:first-child){
      font-size: 16px;
    }
  }
  // 竖直分割块
  .app-com .divide{
    padding: 0 5px;
  }
  // 点击突出颜色
  .app-com .active{
    color: $pink;
  }
  // 各栏标题
  .app-com .mui-card .service_title,.designer_title,.case_title{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: $pink;
    font-size: 18px;
    margin-bottom: 10px;
    span:first-child{
      padding-right: 5px;
    }
  }
  // 公司服务概况内容
  .app-com .mui-card .service_content{
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    p{
      font-size: 16px;
    }
    p span:first-child{
      color: $gray;
    }
  }
  // 设计团队内容
  .app-com .mui-card .designer_content{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .designer_box{
      width: 30%;
      margin-right: 8px;
      img{
        width: 100%;
        border-radius: 50%;
      }
      .d_position{
        color: $gray;
        font-size: 15px;
        font-weight: bold;
        margin-bottom: 0;
      }
    }
  }
  // 公司案例内容样式
  .app-com .mui-card .case_content{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .case_box{
      width: 48%;
      display: flex;
      flex-direction: column;
      .case_img{
        width: 100%;
      }
      .case_info{
        padding-top: 3px;
        align-self: flex-start;
      }
      // 案例详情左边装饰符
      .case_info::before{
        content: "|";
        font-size: 16px;
        font-weight: 800;
        color: $gray;
        padding-right: 5px;
      }
    }
    
  }
  // 若该公司暂无案例信息 显示出错信息
  // .app-com .mui-card .case_err{
  //   padding: 10px 0;
  //   font-size: 16px;
  //   color: #8f8f94;
  // }
</style>
