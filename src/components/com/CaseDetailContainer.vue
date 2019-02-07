<template>
  <div class="app-case">
    <!-- 该案例所属设计师信息 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="designer_box">
            <img class="d_photo" :src="deDetail.photo">
            <div class="d_info">
              <p class="d_name" v-text="deDetail.dname"></p>
              <p class="d_rank" v-text="deDetail.rank"></p>
              <p class="d_quali">
                <span class="d_years" v-text="`${deDetail.years}年经验`"></span>
                <span class="d_case_num" v-text="`${deDetail.d_case_num}套方案`"></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 该案例所属房产信息 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="hs_title">
            <span class="mui-icon iconfont icon-houseInfo"></span>
            <span>房屋信息</span>
          </div>
          <ul class="hs_content" v-if="hsDetail.length != 0">
            <li v-html="`户型：${hsDetail.type}`"></li>
            <li v-html="`风格：${hsDetail.deco_style}`"></li>
            <li v-html="`面积：${hsDetail.area}m&sup2;`"></li>
            <li v-html="`造价：${hsDetail.cost}`"></li>
            <li v-html="`装修方式：${hsDetail.deco_way}`"></li>
            <li v-html="`装修工期：${hsDetail.deco_time}`"></li>
            <li v-html="`位置：${hsDetail.location}`"></li>
          </ul>
          <err :err-msg="`该案例暂无房产信息喔~`" v-else></err>
        </div>
      </div>
    </div>
    <!-- 该案例图片 -->
    <div class="mui-card" v-for="(cp,i) in cpList" v-if="cp!=null">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="cp_title">
            <span class="mui-icon iconfont" :class="`icon-${i.split('_')[0]}`"></span>
            <span v-if="i.split('_')[0]=='bedroom'">卧室</span>
            <span v-else-if="i.split('_')[0]=='living'">客厅</span>
            <span v-else-if="i.split('_')[0]=='res'">餐厅</span>
            <span v-else-if="i.split('_')[0]=='toilet'">卫生间</span>
            <span v-else>厨房</span>
          </div>
          <div class="cp_content">
            <img :src="cp">
          </div>
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
      cpList: [],
      hsDetail: [],
      deDetail: []
    }
  },
  props: ['case_id'],
  methods:{
    getCaseDetail(){
      var url = "/com/getCaseDetail";
      this.axios.get(url,{
        params:{
          case_id: this.case_id
        }
      }).then(result=>{
        this.hsDetail = result.data.hsDetail;
        this.cpList = result.data.cpList;
        for(var cp in this.cpList){
          if(this.cpList[cp]){
            this.cpList[cp] = 'http://127.0.0.1:3000/' + this.cpList[cp];
          }
        }
      })
    },
    getDesigner(){
      var url = "/com/getDesigner";
      this.axios.get(url,{
        params:{
          case_id: this.case_id
        }
      }).then(result=>{
        this.deDetail = result.data[0];
        this.deDetail.photo = 'http://127.0.0.1:3000/' + this.deDetail.photo;
      })
    }
  },
  created(){
    this.getCaseDetail();
    this.getDesigner();
  },
  components:{
    "err": Err
  }
}
</script>

<style lang="scss" scoped>
  $pink: #EC7E90;
  $font: #8f8f94;
  // 设计师信息框
  .app-case .mui-card .designer_box{
    display: flex;
    .d_photo{
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-right: 20px;
    }
    .d_info{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      .d_name{
        font-size: 19px;
        font-weight: bold;
        color: $pink;
      }
      .d_quali{
        margin: 0;
        span{
          margin-right: 5px;
        }
      }
    }
  }
  // 房产信息标题框
  .app-case .mui-card .hs_title{
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
  // 房产信息框
  .app-case .mui-card .hs_content{
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    list-style: none;
    li{
      display: flex;
      justify-content: flex-start;
      width: 33%;
      color: $font;
    }
  }
  .app-case .mui-card .cp_title{
    color: $pink;
    font-size: 18px;
    margin: 0 0 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 2px;
    span:first-child{
      margin-right: 5px;
    }
  }
  // 案例图片框
  .app-case .mui-card .cp_content{
    img{
      width: 100%;
    }
  }
</style>
