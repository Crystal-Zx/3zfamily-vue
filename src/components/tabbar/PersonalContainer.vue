<template>
  <div class="app-personal" :style="`height:${height}px;`">
    <!-- 1.用户头像和用户名 -->
    <div class="base_info_box">
      <img class="user_avatar" :src="userInfo.avatar" v-if="userInfo.uid !== undefined"/>
      <div class="base_info">
        <span class="user_name" v-text="userInfo.uname"></span>
        <p class="user_tel">
          <span class="mui-icon iconfont icon-phone"></span>
          <span v-text="userInfo.phone"></span>
        </p>
      </div>
    </div>
    <!-- 2.基本设置 -->
    <ul class="base_setting">
      <li @click="toPath('/message')">
        <div>
          <span class="mui-icon mui-icon-email"></span>
          <span>我的消息</span>
        </div>
        <span class="mui-icon mui-icon-arrowright"></span>
      </li>
      <li @click="toPath('/collection')">
        <div>
          <span class="mui-icon iconfont icon-collect"></span>
          <span>我的收藏</span>
        </div>
        <span class="mui-icon mui-icon-arrowright"></span>
      </li>
      <li @click="toPath('/order')">
        <div>
          <span class="mui-icon mui-icon-phone"></span>
          <span>我的预约</span>
        </div>
        <span class="mui-icon mui-icon-arrowright"></span>
      </li>
      <li @click="toPath('/artical')">
        <div>
          <span class="mui-icon mui-icon-compose"></span>
          <span>我的发表</span>
        </div>
        <span class="mui-icon mui-icon-arrowright"></span>
      </li>
    </ul>
    <ul class="base_setting">
      <li @click="toPath('/scan')">
        <div>
          <span class="mui-icon iconfont icon-scan"></span>
          <span>扫一扫</span>
        </div>
        <span class="mui-icon mui-icon-arrowright"></span>
      </li>
      <li @click="toPath('/gujia')">
        <div>
          <span class="mui-icon iconfont icon-gujia"></span>
          <span>房产估价</span>
        </div>
        <span class="mui-icon mui-icon-arrowright"></span>
      </li>
      <li @click="toPath('/setting')">
        <div>
          <span class="mui-icon iconfont icon-setting"></span>
          <span>设置</span>
        </div>
        <span class="mui-icon mui-icon-arrowright"></span>
      </li>
    </ul>
    <div class="logout" @click="toLogout()">
      <span class="mui-icon iconfont icon-trash"></span>
      <span>退出登录</span>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      hight: 0,
      userInfo: []
    }
  },
  inject: ['reload'],
  methods:{
    // 获取用户基本信息
    getUserInfo(){
      var uid = sessionStorage.uid;
      var url = '/user/getUserInfo';
      this.axios.get(url,{
        params:{
          uid
        }
      }).then(result=>{
        if(!result.data.avatar){
          result.data.avatar = "http://127.0.0.1:3000/img/avatar/default.jpg";
        }else{
          result.data.avatar = "http://127.0.0.1:3000/" + result.data.avatar;
        }
        this.userInfo = result.data;
        console.log(this.userInfo);
      })
    },
    // 退出登录
    toLogout(){
      // 将user置为null，以清空vuex的state值和sessionStorage值
      this.$store.dispatch('setUser',null);
      // 注销成功提示
      this.$toast({
        message: '退出登录成功！',
        iconClass: 'mui-icon iconfont icon-congratulation'
      })
      this.$router.push('/');
    },
    // 路由跳转
    toPath(path){
      if(path == '/setting')
        this.$router.push(path);
      else{
        this.$toast({
          message: '抱歉，该功能暂未开通！',
          iconClass: 'mui-icon iconfont icon-err'
        })
      }
    }
  },
  created(){
    this.height = window.innerHeight - 95;
    this.getUserInfo();
  }
}
</script>

<style lang="scss" scoped>
  $bg_gray: #F5F5F5;
  $red: #C00000;
  $theme: #F2753F;
  .app-personal{
    overflow-y: auto;
  }
  .app-personal .base_info_box{
    display: flex;
    padding: 10px 30px;
    background: #fff;
    .base_info{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .user_tel{
        font-family: 'SimHei';
        font-weight: bold;
        font-size: 18px;
        color: $theme;
        position: relative;
        top: 25px;
        span:first-child{
          font-size: 16px;
        }
      }
    }
  }
  .app-personal .user_avatar{
    width: 90px;height: 90px;
    border-radius: 50%;
    border: 1px solid #777;
    margin-right: 20px;
  }
  .app-personal .user_name{
    font-family: 'SimHei';
    font-weight: bold;
    font-size: 20px;
    position: relative;
    top: 10px;
  }
  // 基本设置框样式
  .app-personal .base_setting{
    list-style: none;
    background: white;
    padding: 0;
    font-size: 16px;
    li{
      display: flex;
      align-items: center;
      margin: 0 10px;
      padding: 10px 0;
      border-bottom: 1px dotted #999;;
      justify-content: space-between;
    }
    li:last-child{
      border: 0;
    }
    li span:nth-child(1){
      // width: 24px;height: 24px;
      font-size: 24px;
      padding-right: 5px;
    }
  }
  .app-personal .logout{
    background: white;
    padding: 10px;
    color: $red;
  }
  // .app-personal .base_setting{
  //   li{
  //     display: flex;  
  //   }
  //   li span:nth-child(3){
  //     justify-self: flex-end;
  //   }
  // } 
</style>
